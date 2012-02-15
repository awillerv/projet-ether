
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

var TOUS = -1,
    ANIMATEURS = -2,
    NON_ANIMATEURS = -3;

$(window).load(function(){
  $('#application').hide();
  $('#erreur_prenom').hide();
  $('#erreur_nom').hide();
  $('#erreur_login_deja_pris').hide(); 
  $('#mdp').hide();
  $('#loading').hide();
  
  var moi = new participant('','',false,0);
  var maCle = 0;
  
  var socket = io.connect('http://localhost');
  
  $('#estAnimateur').on('click',function(){
      $('#mdp').show();
      $('#erreur_mdpEntre').hide();
  });
      
  $('#nestPasAnimateur').on('click',function(){
      $('#mdp').hide();
  });
  
  $('#prenom').on('focus',function(){
    $('#erreur_prenom').hide();
    $('#erreur_login_deja_pris').hide();
  });
  
  $('#nom').on('focus',function(){
    $('#erreur_nom').hide();
    $('#erreur_login_deja_pris').hide();
  });
  
  $('#mdpEntre').on('focus',function(){
    $('#erreur_mdpEntre').hide();
  });
  
  $('#identification_val').on('click',function(){
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
  
  socket.on('identification echouee', function(msgErreur){
    switch(msgErreur){
      case 'faux mdpEntre':
        $('#loading').hide();
        $('#erreur_mdpEntre').show();
        break;
        
      case 'prenom':
        $('#erreur_prenom').show();
        break;
      
      case 'nom':
        $('#erreur_nom').show();
        break;
      
      case 'mdpEntre':
        $('#erreur_mdpEntre').show();
        break;
      
      case 'login deja pris':
        $('#erreur_login_deja_pris').show();
        break;
    }
  });
  
  var participants = new Array();
  participants[TOUS] = new participant('tous', '', undefined, undefined);
  participants[ANIMATEURS] = new participant('animateurs', '', true, undefined);
  participants[NON_ANIMATEURS] = new participant('non animateurs', '', false, undefined);
  
  socket.on('identification reussie', function(liste_participants){
    $('#identification').hide();
    $('#application').show();
    $('#erreur_msg').hide();
    $('#msg_bien_envoye').hide();
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
  
  $('#add_msg_input').on('click',function(){
    $('#inputs').append(
      '<input name="input" type="text"/><br/>'
    );
  });
  
  $('#remove_msg_input').on('click',function(){
    if($('input[name=input]').length>1){
      $('input[name=input]').last().next().remove();
      $('input[name=input]').last().remove();
    }
  });
  
  $('#msg').on('focus',function(){
    $('#erreur_msg').hide();
  });
  
  function envoi(cle_destinataire){
    var msgs = new Array();
    $('input[name=input]').each(function(i){
      if($(this).val() != '' && cle_destinataire != ''){
        msg_id = Math.floor(Math.random()*1000001);
        var m = new msg('text', msg_id, $(this).val());
        msgs.push(m);
      }
      else{
        $('#erreur_msg').show();
        return false;
      }
    });
    socket.emit('envoi', msgs, cle_destinataire);
    return true;
  }
  
  $('#envoi').on('click',function(){
    envoi($('#participants').val());
  });
  
  $('#envoi_animateurs').on('click',function(){
    envoi(ANIMATEURS);
  });
  
  $('#envoi_tous').on('click',function(){
    envoi(TOUS);
  });
  
  $('#envoi_non_animateurs').on('click',function(){
    envoi(NON_ANIMATEURS);
  });
  
  socket.on('envoi reussi', function(id_message, cle_destinataire){
    console.log(
      "envoi du message " + id_message + " à destination de " +
      participants[cle_destinataire].prenom + ' ' + participants[cle_destinataire].nom +
      " réussi"
    );
    $('#msg_bien_envoye').text("Le message " + id_message + " a bien été envoyé");
    $('#msg_bien_envoye').show();
  });
  
  socket.on('envoi echoue', function(id_message, cle_destinataire){
    console.log(
      "envoi du message " + id_message + " à destination de " +
      participants[cle_destinataire].prenom + ' ' + participants[cle_destinataire].nom +
      " échoué"
    );
    $('#erreur_msg').show();
  });
  
  socket.on('reception', function(m, cle_emetteur){
    var p = participants[cle_emetteur];
    $('#reception').append(
      '<p id="' + m.id + '">Message ' + m.id + ' de ' +
      p.prenom + ' ' +
      p.nom + ((p.estAnimateur) ? ' (animateur) ' : ' ') +
      '(cle = ' + cle +
      ') : ' + m.contenu +'</p>'
    );
    socket.emit('reception client',m.id, cle_emetteur, true);
  });
  
  /*
  socket.on('reception serveur', function(id_message, cle_destinataire, succes){
    $('#msg_bien_envoye').text("Le message " + id_message + " a bien été envoyé");
    $('#msg_bien_envoye').show();
  });
  */
  
  $('#msg').on('focus',function(){
    $('#msg_bien_envoye').hide();
  });
});
