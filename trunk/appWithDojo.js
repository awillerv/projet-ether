
var fs = require('fs'),
    express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

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
  
  var maCle = 0;
  function login_unique(participant){
    for(i in participants){
      if(participants[i].prenom == trim(participant.prenom) && participants[i].nom == trim(participant.nom)){
        return false;
      }
    }
    return true;
  }
  
  socket.on('identification', function(participant, mdpEntre){
    var succes = true;
    if(participant.estAnimateur == 'true' && mdpEntre == ''){
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
        if(participant.estAnimateur == 'false' || (participant.estAnimateur == 'true' && trim(mdpEntre) == MDP)){
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
  
  socket.on('envoi', function(msgs, cle){
    var m = new msg('text', -1, '');
    for(i in msgs){
      m = msgs[i];
      if(m.contenu != '' && cle != ''){
        m.type = (testType.test(m.contenu) ? 'image' : 'texte');
        socket.emit('envoi reussi', m.id, cle);
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
            for(j in  participants){
              if(participants[j].estAnimateur && j != maCle){
                io.sockets.socket(participants[j].socketID).emit('reception', m, maCle);
              }
            }
            console.log(
              "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
              '"' + " à tous les animateurs de la part de " +
              participants[maCle].prenom + ' ' + participants[maCle].nom
            );
            break;
          
          case NON_ANIMATEURS:
            for(j in  participants){
              if(!participants[j].estAnimateur && j != maCle){
                io.sockets.socket(participants[j].socketID).emit('reception', m, maCle);
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
        }
      }
      else{
        socket.emit('envoi echoue', m.id, cle);
      }
    }
  });
  
  socket.on('resultat reception', function(id_message, cle_emetteur, succes){
    console.log("Le message " + id_message + " envoyé par " +
      participants[cle_emetteur].prenom + ' ' + participants[cle_emetteur].nom +
      ((succes) ? " a bien " : " n'a pas ") + "été reçu par " +
      participants[maCle].prenom + ' ' + participants[maCle].nom
    );
  });
  
  socket.on('upload', function(nomOriginal, data){
    // data is an URL data scheme with base64 encoding (http://tools.ietf.org/html/rfc2397).
    console.log('image reçue : ' + data.substr(0,40));
    data = data.split(';base64,');
    
    var type = data[0].substr(5); // strip the data:
    
    if (!allowedTypes[type]) {
      console.log('type invalide');
      socket.emit('upload echoue');
      return;
    }

    // Decode the base64 data to binary.
    data = new Buffer(data[1], 'base64').toString('binary');    
    
    // Get the number of files in the upload dir.
    fs.readdir(__dirname + '/uploads', function(err, files){
      if(err) throw err;
      // Create a new file with a number as name that is one higher then the current amount of files in the uploads directory.
      var nom = __dirname + '/uploads/' + files.length + '.' + allowedTypes[type];
	    var chemin = 'uploads/' + files.length + '.' + allowedTypes[type];
	  
      fs.writeFile(nom, data, 'binary', function(err){
        if(err) throw err;
        console.log(nom + ' uploade');

        // Send the filename to the client.
        socket.emit('upload reussi', chemin, files.length, nomOriginal);
      });
    });
  });
  
  socket.on('disconnect',function(){
	console.log("deconnexion du participant n°"+maCle);
    participants[maCle] = null;
    if(participants.length > 0){
      socket.broadcast.emit('deconnexion participant', maCle);
    }
    else{
      fs.readdir(__dirname + '/uploads', function(err, files){
        if(err) throw err;
        for(i in files){
          var nom = __dirname + '/uploads/' + files[i];
          fs.unlinkSync(nom)
            console.log(nom + ' detruit');
        }
      });
    }
  });
});
