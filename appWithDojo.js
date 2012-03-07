
var fs = require('fs'),
    express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

	io.configure('production', function(){
		io.enable('browser client minification');
		io.set('transports', [
		  'websocket'
		, 'flashsocket'
		, 'htmlfile'
		, 'xhr-polling'
		, 'jsonp-polling'
		]);
	});

	io.configure('development', function(){
		io.set('transports', ['xhr-polling']);
	});
	
var MDP = "ether";

var TOUS = -1,
    ANIMATEURS = -2,
    NON_ANIMATEURS = -3;

function participant(prenom, nom, estAnimateur, socketID){
  this.prenom = prenom;
  this.nom = nom;
  this.estAnimateur = estAnimateur;
  this.socketID = socketID;
}

function msg(type, id, contenu){
  this.type = type;
  this.id = id;
  this.contenu = contenu;
}

function trim(str){
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

var participants = new Array();
participants[TOUS] = new participant('tous', '', undefined, undefined);
participants[ANIMATEURS] = new participant('animateurs', '', true, undefined);
participants[NON_ANIMATEURS] = new participant('non animateurs', '', false, undefined);

// Allowed content types and extensions.
var allowedTypes = {
  'image/png':       'png',
  'image/jpeg':      'jpg',
  'image/gif':       'gif',
  'image/bmp':       'bmp'
};

var allowedExtensions = []; // Array of allowed extensions.
var contentTypes      = {}; // Reverse lookup of allowedTypes.

for(ct in allowedTypes){
  allowedExtensions[allowedExtensions.length] = allowedTypes[ct];
  contentTypes[allowedTypes[ct]] = ct;
}

// RegExp to test for valid files (only the ones in allowedTypes).
// Files must be in a subdirectory so users can't access the javascript files for nodejs.
//var validFile = new RegExp('^\/[a-z]+\/[0-9a-z\-]+\.('+allowedExtensions.join('|')+')$');
var testType = new RegExp('(\/uploads\/[0-9]+\.('+allowedExtensions.join('|')+'))$');
var nomValide = /^[a-zA-Z0-9]+$/;
var extValide = new RegExp('('+allowedExtensions.join('|')+')$');

app.use("/dojo-release-1.7.1", express.static(__dirname + '/dojo-release-1.7.1'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/uploads", express.static(__dirname + '/uploads'));
app.listen(490);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/uploads/:nom.:ext', function(req, res){
  var nom = req.params.nom,
      ext = req.params.ext;
  if (nomValide.test(nom)){
    if(extValide.test(ext)){
      var chemin = nom + '.' + ext;
      console.log('tentative d\'ouverture de ' + chemin);
      fs.readFile(__dirname + '/uploads/' + chemin, function(err, data) {
        if (err) {
          res.send('Le fichier n\'existe pas sur le serveur', 404);
        } else {
          res.contentType(ext);
          res.end(data);
        }
      });
    }
    else{
      res.send('L\'extension du fichier précisée est invalide', 404);
    }
  }
  else{
     res.send('Le nom du fichier précisé est invalide', 404);
  }
});

io.sockets.on('connection', function (socket) {
  console.log('nouvelle connexion : socket id = ' + socket.id);
  
  var maCle = undefined;
  function login_unique(participant){
    for(i in participants){
      if(participants[i] != null && participants[i].prenom == trim(participant.prenom) && participants[i].nom == trim(participant.nom)){
        return false;
      }
    }
    return true;
  }
  
  socket.on('identification', function(participant, mdpEntre){
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
      if(login_unique(participant)){
        if(!participant.estAnimateur || (participant.estAnimateur && trim(mdpEntre) == MDP)){
          participant.socketID = socket.id;
          participant.prenom = trim(participant.prenom);
          participant.nom = trim(participant.nom);
          participants.push(participant);
          maCle = participants.length - 1;
          socket.emit('identification reussie', participants, maCle);
          socket.broadcast.emit('connexion nouveau participant', participant, maCle);
          console.log(
            'identification reussie pour ' + participant.prenom + ' ' + participant.nom +
            ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
            ' animateur avec le socket id = ' + socket.id +
            ' et dont la cle vaut ' + maCle
          );      
        }
        else{
          socket.emit('identification echouee', 'faux mdpEntre');
          console.log(
            'identification erronee pour ' + participant.prenom + ' ' + participant.nom +
            ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
            ' animateur avec le socket id = ' + socket.id + ' cause = mauvais mot de passe'
          );  
        }
      }
      else{
        socket.emit('identification echouee', 'login deja pris');
        console.log(
            'identification erronee pour ' + participant.prenom + ' ' + participant.nom +
            ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
            ' animateur avec le socket id = ' + socket.id + ' cause = login deja pris'
          ); 
      }
    }
    else{
      socket.emit('identification echouee', succes);
      console.log(
        'identification erronee pour ' + participant.prenom + ' ' + participant.nom +
        ' qui ' + ((participant.estAnimateur) ? 'est' : "n'est pas") +
        ' animateur avec le socket id = ' + socket.id + ' cause = ' + succes
      ); 
    }
  });
  
  socket.on('envoi', function(msgs, cles){
    var m = new msg('text', -1, ''),
        msg_ids_ok = new Array(),
        msg_ids_echoues = new Array(),
        cles_ok = new Array(),
        cles_echoues = new Array();
    for(var i in cles){
      cle = cles[i];
      if(cle != ''){
        cles_ok.push(cle);
        for(var j in msgs){
          m = msgs[j];
          if(m.contenu != ''){
            m.type = (testType.test(m.contenu) ? 'image' : 'texte');
            if(i < 1){
              msg_ids_ok.push(m.id);
            }
            switch(cle){
              case TOUS:
                socket.broadcast.emit('reception', m, maCle);
                console.log(
                  "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
                  '"' + " à tous de la part de " +
                  participants[maCle].prenom + ' ' + participants[maCle].nom
                );
                break;
              
              case ANIMATEURS:
                for(k in  participants){
                  if(participants[k].estAnimateur && k != maCle){
                    io.sockets.socket(participants[k].socketID).emit('reception', m, maCle);
                  }
                }
                console.log(
                  "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
                  '"' + " à tous les animateurs de la part de " +
                  participants[maCle].prenom + ' ' + participants[maCle].nom
                );
                break;
              
              case NON_ANIMATEURS:
                for(k in  participants){
                  if(!participants[k].estAnimateur && k != maCle){
                    io.sockets.socket(participants[k].socketID).emit('reception', m, maCle);
                  }
                }
                console.log(
                  "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
                  '"' + " à tous les non animateurs de la part de " +
                  participants[maCle].prenom + ' ' + participants[maCle].nom
                );
                break;
              
              default: 
                io.sockets.socket(participants[cle].socketID).emit('reception', m, maCle);
                console.log(
                  "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
                  '"' + " à " + participants[cle].prenom + ' ' + participants[cle].nom + " de la part de " +
                  participants[maCle].prenom + ' ' + participants[maCle].nom
                );
            }
          }
          else{
            if(i < 1){
              msg_ids_echoues.push(m.id);
            }
          }
        }
      }
      else{
        cles_echoues.push(cle);
      }
    }
    if(msg_ids_ok.length > 0 && cles_ok.length > 0){
      socket.emit('envoi reussi', msg_ids_ok, cles_ok);
    }
    if(msg_ids_echoues.length > 0 && cles_echoues > 0){
      socket.emit('envoi echoue', msg_ids_echoues, cles_echoues);
    }
  });
  
  socket.on('resultat reception', function(id_message, cle_emetteur, succes){
    console.log("Le message " + id_message + " envoyé par " +
      participants[cle_emetteur].prenom + ' ' + participants[cle_emetteur].nom +
      ((succes) ? " a bien " : " n'a pas ") + "été reçu par " +
      participants[maCle].prenom + ' ' + participants[maCle].nom
    );
  });
  
  // data correspond au string en base 64 de l'image (et rien d'autre)
  function enregistrerImage(data, type){
    var extValide = true;
    console.log('l\'extension est ' + type);
    if (!allowedTypes[type]) {
      console.log('type invalide');
      extValide = false;
    }
    
    // Decode the base64 data to binary.
    binaryData = new Buffer(data, 'base64').toString('binary');    
    
    console.log('l\'extension du fichier ' + ((extValide) ? 'est' : 'n\'est pas') + ' valide');
    if(extValide){
      var files = fs.readdirSync(__dirname + '/uploads');
      var chemin = '/uploads/' + files.length + '.' + allowedTypes[type];
      var nom = __dirname + chemin;
      fs.writeFileSync(nom, binaryData, 'binary')
        return chemin;
    }    
  }
  
 socket.on('upload', function(nomOriginal, data){
    // data is an URL data scheme with base64 encoding (http://tools.ietf.org/html/rfc2397).
    console.log('image reçue : ' + data.substr(0,40));
    console.log('data length : ' + data.length);
    data = data.split(';base64,');
    
    var type = data[0].substr(5); // strip the data:
    
    // On enregistre l'image dans le dossier upload
    var chemin = enregistrerImage(data[1], type);
    console.log('resultat de l\'upload : ' + chemin);
    
    if(chemin == null){
      socket.emit('upload echoue');
    }
    else{
      // Send the filename to the client.
      socket.emit('upload reussi', nomOriginal, chemin);
    }
  });
   // lorsqu'on charge une 'session' on change le prénom/nom de l'utilisateur courant
  // de plus on informe les autres du changement
  socket.on('changement id', function(participant){
    console.log('changement id participant');
    console.log('ancien id ' + participants[maCle].prenom + ' ' + participants[maCle].nom);
    console.log('nouvel id ' + participant.prenom + ' ' + participant.nom);
    participants[maCle].prenom = participant.prenom;
    participants[maCle].nom = participant.nom;
    socket.broadcast.emit('changement id participant', participant, maCle);
  });
  
  // url de la forme '/uploads/3.jpg'
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
  
  // lorsqu'on sauve une session le serveur encode à la volée les images en base64 pour qu'elles soient sauvées comme string
  socket.on('data encode request', function(url) {
    // url est de la forme '/uploads/3.jpg'
    var ext = 'image/' + getExt(url);
    console.log(url);
    console.log(ext);
    fs.readFile(__dirname + url, 'base64', function (err, data) {
      if(err) {
		console.log("/!\\ ERREUR /!\\ :"+err);
		return null;
	  }
      console.log(data.substr(0,40));
      socket.emit('data encode response', data, ext);
    });
  });
  
  // lorsqu'on charge une session le serveur décode et enregistre à la volée les images à partir du string (base 64)
  socket.on('data decode request', function(t) {
    // la fonction d'enregistrement renvoie le chemin
    console.log('data decode request');
    var m = new msg(t[0], t[1], enregistrerImage(t[2], t[4]));
    socket.emit('data decode response', m, t[3]);
  });
  
  socket.on('disconnect', function() {
	    if(maCle!=undefined) {
			console.log("deconnexion du participant n°"+maCle);
			participants[maCle] = null;
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
			if(resteUtilisateurs){
			  socket.broadcast.emit('deconnexion participant', maCle);
			}
			else{
			  participants.splice(0,participants.length);
			  fs.readdir(__dirname + '/uploads', function(err, files){
				if(err) {
				  console.log("/!\\ ERREUR /!\\ :"+err);
				  return null;
				}
				for(i in files){
				  var nom = __dirname + '/uploads/' + files[i];
				  fs.unlinkSync(nom)
					console.log(nom + ' detruit');
				}
			  });
			}
		} else {
			console.log("Rupture de connection d'un participant pas encore connecté");
		}
	});
});
