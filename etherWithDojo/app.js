// on a besoin d'express et socket.io ainsi que du filesystem contenu dans node
var fs = require('fs'),
    express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

// on configure socket.io
	io.configure(function(){
		io.enable('browser client minification');
		io.set('transports', [
		  'websocket'
		, 'flashsocket'
		, 'htmlfile'
		, 'xhr-polling'
		, 'jsonp-polling'
		]);
	});

// mot de passe pour être animateur
var MDP = "ether";

// quelques constantes;
var TOUS = -1,
    ANIMATEURS = -2,
    NON_ANIMATEURS = -3;

// on définit les "classes" qu'on va utiliser
// prenom, nom -> string, estAnimateur -> booléen, socketID -> entier
function participant(prenom, nom, estAnimateur, socketID){
  this.prenom = prenom;
  this.nom = nom;
  this.estAnimateur = estAnimateur;
  this.socketID = socketID;
}

// id -> entier, contenu -> string
function msg(id, contenu){
  this.id = id;
  this.contenu = contenu;
}

// suppression des espaces, underscore etc dans les string
function trim(str){
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

// tableau contenant tous les participants, en plus du serveur chaque client a le même
var participants = new Array();
// les destinataires spéciaux correspondent à un participant factice
participants[TOUS] = new participant('tous', '', undefined, undefined);
participants[ANIMATEURS] = new participant('animateurs', '', true, undefined);
participants[NON_ANIMATEURS] = new participant('non animateurs', '', false, undefined);

// Types acceptés pour les uploads
var allowedTypes = {
  'image/png':       'png',
  'image/jpeg':      'jpg',
  'image/gif':       'gif',
  'image/bmp':       'bmp'
};

// Extensions acceptées pour les uploads
var allowedExtensions = [];
// tableau inverse de allowedTypes
var contentTypes      = {};

// construction des deux derniers tableaux
for(ct in allowedTypes){
  allowedExtensions[allowedExtensions.length] = allowedTypes[ct];
  contentTypes[allowedTypes[ct]] = ct;
}

// quelques expressions régulières
// on teste si l'url d'une image à servir est bien du type "/uploads/[un chiffre].[une extension autorisée]"
var testType = new RegExp('(\/uploads\/[0-9]+\.('+allowedExtensions.join('|')+'))$');
// on teste si le nom de la photo est uniquement constitué de lettres et/ou de chiffres
var nomValide = /^[a-zA-Z0-9]+$/;
// on teste si l'extension est acceptée
var extValide = new RegExp('('+allowedExtensions.join('|')+')$');

// on précise les dossiers qu'on va utiliser
app.use("/dojo-release-1.7.1", express.static(__dirname + '/../dojo-release-1.7.1'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/javascript", express.static(__dirname + '/javascript'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/uploads", express.static(__dirname + '/uploads'));
// le serveur écoute le port 490
app.listen(490);

// lorsqu'un client se connecte on lui sert index.html via http
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// lorsqu'un client désire visionner une image du serveur dans une page à part,
// on la lui sert via http
app.get('/uploads/:nom.:ext', function(req, res){
  // on récupère le nom et l'extension de l'image
  var nom = req.params.nom,
      ext = req.params.ext;
  // on teste le nom et l'extension
  if (nomValide.test(nom)){
    if(extValide.test(ext)){
      var chemin = nom + '.' + ext;
      console.log('tentative d\'ouverture de ' + chemin);
      // si tout va bien on lit l'image, ensuite on la renvoie via http
      fs.readFile(__dirname + '/uploads/' + chemin, function(err, data) {
        if (err) {
          res.send('Le fichier n\'existe pas sur le serveur', 404);
        } else {
          res.contentType(ext);
          res.end(data);
        }
      });
    }
    // si l'extension n'est pas prise en compte, on renvoie une erreur 404
    else{
      res.send('L\'extension du fichier précisée est invalide', 404);
    }
  }
  // si on ne trouve pas l'image, on renvoie une erreur 404
  else{
     res.send('Le nom du fichier précisé est invalide', 404);
  }
});

// lorsqu'un client se connecte
io.sockets.on('connection', function (socket) {
  // on gère ici une connexion donnée avec un socket.id donné
  console.log('nouvelle connexion : socket id = ' + socket.id);
  
  // on se définit une clé propre permettant d'accéder à notre participant dans participants
  var maCle = undefined;
  
  // teste si le login = prenom + espace + nom n'a pas déjà été pris dans la liste
  function login_unique(participant){
    for(i in participants){
      if(participants[i] != null && participants[i].prenom == trim(participant.prenom) && participants[i].nom == trim(participant.nom)){
        return false;
      }
    }
    return true;
  }
  
  // on vérifie si le client peut être identifié sous l'identité qu'il a proposé
  socket.on('identification', function(participant, mdpEntre){
    // succes vaudra true si tout s'est bien passé, sinon il contiendra un string indiquant l'erreur
    var succes = true;
    if(participant.estAnimateur && mdpEntre == ''){
      succes = 'mdpEntre';
    }
    if(participant.nom == ''){
      succes = 'nom';
    }
    if(participant.prenom == ''){
      succes = 'prenom';
    }
    if(succes == true){
      // on vérifie l'unicité du login
      if(login_unique(participant)){
        // si on est pas animateur ou si on est animateur et qu'on a le bon mot de passe tout va bien
        if(!participant.estAnimateur || (participant.estAnimateur && trim(mdpEntre) == MDP)){
          // on créé le participant et on l'ajoute au tableau participants
          participant.socketID = socket.id;
          participant.prenom = trim(participant.prenom);
          participant.nom = trim(participant.nom);
          participants.push(participant);
          maCle = participants.length - 1;
          // on renvoie tout le tableau des participants à notre client propre
          socket.emit('identification reussie', participants, maCle);
          // et on envoie juste notre participant aux autres clients pour qu'il mettent à jour leur tableau
          socket.broadcast.emit('connexion nouveau participant', participant, maCle);
          console.log(
            'identification reussie pour ' + participant.prenom + ' ' + participant.nom +
            ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
            ' animateur avec le socket id = ' + socket.id +
            ' et dont la cle vaut ' + maCle
          );      
        }
        // si le mot de passe n'est pas bon, en renvoie une erreur
        else{
          socket.emit('identification echouee', 'faux mdpEntre');
          console.log(
            'identification erronee pour ' + participant.prenom + ' ' + participant.nom +
            ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
            ' animateur avec le socket id = ' + socket.id + ' cause = mauvais mot de passe'
          );  
        }
      }
      // si le login est déjà pris
      else{
        socket.emit('identification echouee', 'login deja pris');
        console.log(
            'identification erronee pour ' + participant.prenom + ' ' + participant.nom +
            ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
            ' animateur avec le socket id = ' + socket.id + ' cause = login deja pris'
          ); 
      }
    }
    // s'il y a un problème trivial
    else{
      socket.emit('identification echouee', succes);
      console.log(
        'identification erronee pour ' + participant.prenom + ' ' + participant.nom +
        ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
        ' animateur avec le socket id = ' + socket.id + ' cause = ' + succes
      ); 
    }
  });
  
  // on définit une sorte de message "cache" qui contient le dernier message qu'on a tenté d'envoyer
  var msg_cache = new msg(-1, '');
  
  function envoi(m, cles){
    // on vérifie que le message est non vide
    var msgValide = true;
    if(m.contenu == ''){
      msgValide = false;
      socket.emit('envoi echoue', m.id, cle);
    }
    // on vérifie qu'il existe au moins une clé valide
    var uneCleValide = false;
    for(var k in cles){
      if(cles[k] != ''){
        uneCleValide = true;
      }
    }
    // on voit si on envoie le message ou pas
    if(msgValide && uneCleValide){
      // on informe le client que le message a bien été reçu et est bon
      socket.emit('envoi reussi', m.id);
      // on met le message actuel dans le cache s'il n'y est pas déjà
      if(msg_cache.id != m.id){
        msg_cache = m;
      }
      // on fait une boucle sur les clés
      for(var i in cles){
        switch(cles[i]){
          // si on s'adresse à tous
          case TOUS:
            // on broadcaste
            // on transmet notre clé pour pouvoir repérer l'émetteur
            socket.broadcast.emit('reception', m, maCle);
            console.log(
              "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
              '"' + " à tous de la part de " +
              participants[maCle].prenom + ' ' + participants[maCle].nom
            );
            break;
            
          // si on s'adresse à tous les animateurs
          case ANIMATEURS:
            // on fait une boucle sur les participants
            for(k in  participants){
              if(participants[k].estAnimateur && k != maCle){
                // on transmet notre clé pour pouvoir repérer l'émetteur
                io.sockets.socket(participants[k].socketID).emit('reception', m, maCle);
              }
            }
            console.log(
              "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
              '"' + " à tous les animateurs de la part de " +
              participants[maCle].prenom + ' ' + participants[maCle].nom
            );
            break;
                
          // si on s'adresse à tous les non-animateurs
          case NON_ANIMATEURS:
            // on fait une boucle sur les non-participants
            for(k in  participants){
              if(!participants[k].estAnimateur && k != maCle){
                // on transmet notre clé pour pouvoir repérer l'émetteur
                io.sockets.socket(participants[k].socketID).emit('reception', m, maCle);
              }
            }
            console.log(
              "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
              '"' + " à tous les non animateurs de la part de " +
              participants[maCle].prenom + ' ' + participants[maCle].nom
            );
            break;
                
          // sinon, on s'adresse à un destinataire particulier
          default:
            // on transmet notre clé pour pouvoir repérer l'émetteur
            io.sockets.socket(participants[cles[i]].socketID).emit('reception', m, maCle);
            console.log(
              "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
              '"' + " à " + participants[cles[i]].prenom + ' ' + participants[cles[i]].nom + " de la part de " +
              participants[maCle].prenom + ' ' + participants[maCle].nom
            );
        }
      }
    }
    else{
      // on informe le client que le message n'a pas bien été reçu et est mauvais
      socket.emit('envoi echoue', m.id);
    }
  }
  
  // lorsque le client nous envoie des messages (image ou texte) pour des destinataires
  // msgs et cles sont des tableaux de msg et d'entier
  socket.on('envoi', function(m, cles){
    envoi(m, cles);
  });
  
  // on met en place un compteur de tentatives d'envoi
  var cpt = 0;
  var nbrEnvoiLimite = 5;
  
  // lorsque notre client nous informe de la bonne réception (ou non) d'un envoi
  socket.on('resultat reception', function(id_message, cle_emetteur, succes){
    // on indique le succès ou non de l'opération
    console.log("Le message " + id_message + " envoyé par " +
      participants[cle_emetteur].prenom + ' ' + participants[cle_emetteur].nom +
      ((succes) ? " a bien " : " n'a pas ") + "été reçu par " +
      participants[maCle].prenom + ' ' + participants[maCle].nom
    );
    // si le message n'a pas bien été reçu on essaie de le renvoyer
    if(!succes){
      // si le message dans le cache est bien le même que celui qu'on doit renvoyer tout est ok
      if(msg_cache.id == m.id){
        if(cpt < nbrEnvoiLimite){
          cpt++;
          envoi(msg_cache, new Array(cle));
          console.log('tentative ' + cpt + ' de ré-envoi du message ' + m.id);
        }
        else{
          msg_cache = new msg(-1, '');
          cpt = 0;
          console.log('échec de toutes les tentatives (' + nbrEnvoiLimite +') de ré-envoi du message ' + m.id);
        }
      }
      else{
        console.log(
          'erreur de ré-envoi du message ' + m.id +
          ' car le message à envoyer n\'est plus en cache au bout de ' + cpt + ' tentatives'
        );
      }
    }
    else{
      msg_cache = new msg(0, '');
      cpt = 0;
    }
  });
  
  // on décode l'image du base 64 au binaire, pour pouvoir la sauvegarder dans uploads
  function enregistrerImage(data, type){
    var extValide = true;
    console.log('l\'extension est ' + type);
    
    // on teste le type ("image/png" par ex) de l'image
    if (!allowedTypes[type]) {
      console.log('type invalide');
      extValide = false;
    }
    
    // on décode le base 64 en binaire
    // data correspond au string en base 64 seul de l'image non au mime-type complet
    binaryData = new Buffer(data, 'base64').toString('binary');    
    
    console.log('l\'extension du fichier ' + ((extValide) ? 'est' : 'n\'est pas') + ' valide'); 
    // si l'extension est bonne
    if(extValide){
      // on va chercher les fichiers de /uploads de manière synchrone
      // çad les opérations suivantes attendent la bonne complétion de cette étape
      var files = fs.readdirSync(__dirname + '/uploads');
      // on donne un nom en fonction du nombre de fichiers
      var chemin = '/uploads/' + files.length + '.' + allowedTypes[type];
      var nom = __dirname + chemin;
      // on écrit l'image de manière synchrone puis on retourne le chemin (nom de la photo)
      fs.writeFileSync(nom, binaryData, 'binary')
        return chemin;
    }    
  }
  
  // lorsque l'utilisateur uploade une image au serveur
  socket.on('upload', function(nomOriginal, data){
    console.log('image reçue : ' + data.substr(0,40));
    console.log('data length : ' + data.length);
    // data est une URL data scheme avec un encodage en base64 (http://tools.ietf.org/html/rfc2397)
    // data = "data:image/png;base64,<string de l'image en base64>"
    data = data.split(';base64,');
    
    // on cherche le type de l'image = "image/png"
    var type = data[0].substr(5);
    
    // On enregistre l'image dans le dossier upload
    var chemin = enregistrerImage(data[1], type);
    console.log('resultat de l\'upload : ' + chemin);
    
    // si la sauvegarde ne s'est pas correctement effectuée
    if(chemin == null){
      socket.emit('upload echoue');
    }
    else{
      // On renvoie le chemin de l'image et le nom original
      socket.emit('upload reussi', nomOriginal, chemin);
    }
  });
  
  // changement de prénom/nom lors du chargement d'une "session" précédente
  socket.on('changement id', function(participant){
    console.log('changement id participant');
    console.log('ancien id ' + participants[maCle].prenom + ' ' + participants[maCle].nom);
    console.log('nouvel id ' + participant.prenom + ' ' + participant.nom);
    
    // on met à jour la liste du serveur...
    participants[maCle].prenom = participant.prenom;
    participants[maCle].nom = participant.nom;
    
    // et les listes des autres utilisateurs
    socket.broadcast.emit('changement id participant', participant, maCle);
  });
  
  // on retrouve l'extension à partir d'une
  // url relative de la forme '/uploads/3.jpg'
  function getExt(url){
    var ext = '',
        debut = url.length - 1,
        fin = url.length - 1;
    
    while(url.charAt(debut) != '.' && debut >= 0){
      debut--;
    }
    ext = url.substr(debut + 1, fin - debut);
    if(ext = 'jpg'){
      ext = 'jpeg';
    }
    return ext;
  }
  
  // lorsqu'on sauve une "session" le serveur encode et renvoie à la volée les images 
  // présentes sur celui-ci en base64 pour qu'elles soient sauvées comme string chez le client
  socket.on('data encode request', function(i, j, url){
    // url est de la forme '/uploads/3.jpg'
    var ext = 'image/' + getExt(url);
    console.log(url);
    console.log(ext);
    // on lit l'image
    fs.readFile(__dirname + url, 'base64', function (err, data){
      if(err){
		    console.log("/!\\ ERREUR /!\\ :"+err);
		    return null;
	    }
	    
	    // si tout s'est bien passé on la renvoie au client
      console.log(data.substr(0,40));
      socket.emit('data encode response', i, j, url, data, ext);
    });
  });
  
  // lorsqu'on charge une "session" le serveur décode et enregistre à la volée
  // les images précédemment sauvés localement chez notre client en string (base 64)
  socket.on('data decode request', function(i, j, cleUnique, img) {
    // la fonction d'enregistrement renvoie le chemin
    console.log('data decode request');
    var url = enregistrerImage(img[0], img[1]);
    socket.emit('data decode response', i, j, cleUnique, url);
  });
  
  // lorsque notre client se déconnecte
  socket.on('disconnect', function(){
    // si ma clé est bien définie
	  if(maCle!=undefined){
	  
			console.log("deconnexion du participant n°"+maCle);
			// on remplace mon participant par null plutôt que d'utiliser splice
			// car on ne veut pas modifier les clés des participants suivants
			participants[maCle] = null;
			
			// on vérifie s'il reste des utilisateurs connectés
			var resteUtilisateurs = false;
			var i = 0;
			while(i < participants.length && !resteUtilisateurs){
			  if(participants[i] != null){
				  resteUtilisateurs = true;
			  }
			  else{
				  i++;
			  }
			}
			
			// s'il en reste, on les informe de la déconnexion de notre client
			if(resteUtilisateurs){
			  socket.broadcast.emit('deconnexion participant', maCle);
			}
			// s'il n'y en a plus
			else{
			  // on vide la liste des participants (sauf TOUS, ANIMATEURS, NON_ANIMATEURS)
			  participants.splice(0,participants.length);
			  
			  // on efface toutes les images enregistrées
			  // on lit le fichier uploads
			  fs.readdir(__dirname + '/uploads', function(err, files){
				  if(err) {
				    console.log("/!\\ ERREUR /!\\ :"+err);
				    return null;
				  }
				  // on boucle sur les fichiers
				  for(i in files){
				    var nom = __dirname + '/uploads/' + files[i];
				    // on détruit de manière synchrone l'image
				    fs.unlinkSync(nom)
					  console.log(nom + ' detruit');
				  }
			  });
			}
		}
		// si ma clé n'est pas définie c'est que le client ne s'était pas encore identifié
		else{
			console.log("Rupture de connection d'un participant pas encore identifié");
		}
	});
});
