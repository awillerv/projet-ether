
var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

app.listen(490);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var MDP = "ether"

var TOUS = -1,
    ANIMATEURS = -2,
    NON_ANIMATEURS = -3;

function participant(prenom, nom, estAnimateur, socketID){
  this.prenom = prenom;
  this.nom = nom;
  this.estAnimateur = estAnimateur;
  this.socketID = socketID;
}

function msg(type, id, contenu, participant){
  this.type = type;
  this.id = id;
  this.contenu = contenu;
}

function validation(participant, mdpEntre){
  if(participant.estAnimateur){
    if(mdpEntre != MDP){
      return false;
    }
  }
  return true;
}

var participants = new Array();
participants[TOUS] = new participant('tous', '', undefined, undefined);
participants[ANIMATEURS] = new participants('animateurs', '', true, undefined);
participants[NON_ANIMATEURS] = new participants('non animateurs', '', false, undefined);

io.sockets.on('connection', function (socket) {
  console.log('nouvelle connexion : socket id = ' + socket.id);
  
  var maCle = 0;
  
  socket.on('identification', function(participant, mdpEntre){
    var succes = true;
    if(participant.prenom == ''){
      succes = 'prenom';
    }
    if(participant.nom == ''){
      succes = 'nom';
    }
    if(participant.estAnimateur == true && mdpEntre == ''){
      succes = 'mdpEntre';
    }
    if(succes){
      if(validation(participant, mdpEntre)){
        participant.socketID = socket.id;
        participants.push(participant);
        maCle = participants.length - 1;
        socket.emit('identification reussie', participants);
        socket.broadcast.emit('connexion nouveau participant', participant);
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
          ' animateur avec le socket id = ' + socket.id
        );  
      }
    }
    else{
      socket.emit('identification echouee', succes);
    }
  });
  
  socket.on('disconnect',function(){
    participants.splice(maCle,1);
    socket.broadcast.emit('deconnexion participant', maCle);
  });
  
  socket.on('envoi', function(m, cle){
    if(m.contenu != '' && cle != ''){
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
          for(i in  participants){
            if(participants[i].estAnimateur && i != maCle){
              io.sockets.socket(participants[i].socketID).emit('reception', m, maCle);
            }
          }
          console.log(
            "envoi d'un message " + m.id + " de contenu " + '"' + m.contenu +
            '"' + " à tous les animateurs de la part de " +
            participants[maCle].prenom + ' ' + participants[maCle].nom
          );
          break;
        
        case NON_ANIMATEURS:
          for(i in  participants){
            if(!participants[i].estAnimateur && i != maCle){
              io.sockets.socket(participants[i].socketID).emit('reception', m, maCle);
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
  });
  
  socket.on('reception client', function(id_message, cle_emetteur, succes){
    //io.sockets.socket(participants[cle_emetteur].socketID).emit('reception serveur', id_message, maCle, succes);
    console.log("Le message " + id_message + " envoyé par " +
      participants[cle_emetteur].prenom + ' ' + participants[cle_emetteur].nom +
      ((succes) ? " a bien " : " n'a pas ") + "été reçu par " +
      participants[maCle].prenom + ' ' + participants[maCle].nom
    );
  });
});
