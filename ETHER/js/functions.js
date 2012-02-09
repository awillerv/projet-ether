
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

var TOUS = -1,
    ANIMATEURS = -2,
    NON_ANIMATEURS = -3;

$(window).load(function(){
  $('#application').hide();
  $('#erreur_prenom').hide();
  $('#erreur_nom').hide();  
  $('#mdp').hide();
  $('#loading').hide();
  
  var moi = new participant('','',false,0);
  var maCle = 0;
  
  var socket = io.connect('http://localhost');
  
  $('#estAnimateur').bind('click',function(){
      $('#mdp').show();
      $('#erreur_mdpEntre').hide();
  });
      
  $('#nestPasAnimateur').bind('click',function(){
      $('#mdp').hide();
  });
  
  $('#prenom').bind('focus',function(){
    $('#erreur_prenom').hide();
  });
  
  $('#nom').bind('focus',function(){
    $('#erreur_nom').hide();
  });
  
  $('#mdpEntre').bind('focus',function(){
    $('#erreur_mdpEntre').hide();
  });
  
  $('#identification_val').bind('click',function(){
    moi.prenom = $('#prenom').val();
    moi.nom = $('#nom').val();
    moi.estAnimateur = (($('input[name=estAnimateur]:checked', '#identification_form').val() == 'true') ? true : false);
    var mdpEntre = $('#mdpEntre').val();
    
    var envoi = true;
    if(moi.prenom == ''){
      envoi = false;
      $('#erreur_prenom').show();
    }
    if(moi.nom == ''){
      envoi = false;
      $('#erreur_nom').show();
    }
    if(moi.estAnimateur == true && mdpEntre == ''){
      envoi = false;
      $('#erreur_mdpEntre').show();
    }
    if(envoi){
      socket.emit('identification', moi, mdpEntre);
      $('#loading').show();
    }
  });
  
  socket.on('identification echouee', function(){
    $('#loading').hide();
    $('#erreur_mdpEntre').show();
  });
  
  var participants = new Array();
  
  socket.on('identification reussie', function(liste_participants){
    $('#identification').hide();
    $('#application').show();
    $('#erreur_msg').hide();
    $('#msg_bien_recu').hide();
    participants = liste_participants;
    maCle = participants.length - 1;
    majParticipants();
  });
  
  socket.on('connexion nouveau participant', function(participant){
    participants.push(participant);
    majParticipants();
  });
  
  socket.on('deconnexion participant', function(key){
    participants.splice(key,1);
    majParticipants();
  });
  
  function majParticipants(){
    $('option').remove();
    for(cle in participants){
      if(cle != maCle){
        $('#participants').append(
          $("<option></option>").attr("value",cle).text(
            participants[cle].prenom + ' ' +
            participants[cle].nom +
            ((participants[cle].estAnimateur == true)? ' (animateur)' : '')
          )
        );
      }
    }
  }
  
  $('#msg').bind('focus',function(){
    $('#erreur_msg').hide();
  });
  
  function envoi(contenu, cle_destinataire){
    if(contenu != '' && cle_destinataire != ''){
      msg_id = Math.floor(Math.random()*1000001);
      var m = new msg('text', msg_id, contenu);
      socket.emit('envoi', m, cle_destinataire);
    }
    else{
      $('#erreur_msg').show();
    }
  }
  
  $('#envoi').bind('click',function(){
    envoi($('#msg').val(), $('#participants').val());
  });
  
  $('#envoi_animateurs').bind('click',function(){
    envoi($('#msg').val(), ANIMATEURS);
  });
  
  $('#envoi_tous').bind('click',function(){
    envoi($('#msg').val(), TOUS);
  });
  
  $('#envoi_non_animateurs').bind('click',function(){
    envoi($('#msg').val(), NON_ANIMATEURS);
  });
  
  socket.on('reception', function(m, cle_emetteur){
    var p = participants[cle_emetteur];
    $('#reception').append(
      '<p>Message ' + m.id + ' de ' +
      p.prenom + ' ' +
      p.nom + ((p.estAnimateur) ? ' (animateur) ' : ' ') +
      '(cle = ' + cle +
      ') : ' + m.contenu +'</p>'
    );
    socket.emit('reception client',m, cle_emetteur, true);
  });
  
  socket.on('reception serveur', function(m, cle_destinataire, succes){
    if(succes){
      $('#msg_bien_recu').show();
    }
  });
  
  $('#msg').bind('focus',function(){
    $('#msg_bien_recu').hide();
  });
});
