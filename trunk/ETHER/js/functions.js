
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

// Allowed content types and extensions.
var allowedTypes = {
  'image/png':       'png',
  'image/jpeg':      'jpg',
  'image/gif':       'gif'
};

var allowedExtensions = []; // Array of allowed extensions.
var contentTypes      = {}; // Reverse lookup of allowedTypes.

for(ct in allowedTypes){
  allowedExtensions[allowedExtensions.length] = allowedTypes[ct];
  contentTypes[allowedTypes[ct]] = ct;
}

var testType = new RegExp('(\/uploads\/[0-9]+\.('+allowedExtensions.join('|')+'))$');

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
    $('#loadingUpload').hide();
    $('#erreurUpload').hide();
    $('#erreurType').hide();
    $('#tailleMaxDepassee').hide();
    participants = liste_participants;
    maCle = participants.length - 1;
    majParticipants();
    $('#moi').text('Vous etes connecte en tant que : ' + moi.prenom + ' ' + moi.nom + ' ' + ((moi.estAnimateur) ? '(animateur)' : ''));
  });
  
  socket.on('connexion nouveau participant', function(participant){
    participants.push(participant);
    majParticipants();
  });
  
  socket.on('deconnexion participant', function(cle){
    participants[cle] = null;
    majParticipants();
  });
  
  function majParticipants(){
    $('option').remove();
    $('select[name="participants"]').each(function(index){
      for(cle in participants){
        if(cle != maCle && participants[cle] != null){
          $(this).append(
            $("<option></option>").attr("value",cle).text(
              participants[cle].prenom + ' ' +
              participants[cle].nom +
              ((participants[cle].estAnimateur == true)? ' (animateur)' : '')
            )
          );
        }
      }
    });
  }
  
  $('#add_msg_input').on('click',function(){
    $('#inputs').append(
      '<input name="input" type="text"/><br/>'
    );
  });
  
  $('#remove_msg_input').on('click',function(){
    if($('input[name="input"]').length>1){
      $('input[name="input"]').last().next().remove();
      $('input[name="input"]').last().remove();
    }
  });
  
  $('#add_participant_input').on('click',function(){
    $('select[name="participants"]:first-child').clone().appendTo('#selection_participants');
  });
  
  $('#remove_participant_input').on('click',function(){
    if($('select[name="participants"]').length>1){
      $('select[name="participants"]').last().remove();
    }
  });
  
  $('#msg').on('focus',function(){
    $('#erreur_msg').hide();
  });
  
  function envoi(cles_destinataires){
    var msgs = new Array();
    $('input[name="input"]').each(function(index){
      if($(this).val() != ''){
        var type = (testType.test($(this).val()) ? 'image' : 'texte');
        var msg_id = Math.floor(Math.random()*1000001);
        var m = new msg(type, msg_id, $(this).val());
        msgs.push(m);
      }
      else{
        $('#erreur_msg').show();
        return false;
      }
    });
    socket.emit('envoi', msgs, cles_destinataires);
    return true;
  }
  
  $('#envoi').on('click',function(){
    var dest = new Array();
    $('select[name="participants"]').each(function(index){
      dest.push($(this).val());
    });
    envoi(dest);
  });
  
  $('#envoi_animateurs').on('click',function(){
    var dest = new Array();
    dest.push(ANIMATEURS);
    envoi(dest);
  });
  
  $('#envoi_tous').on('click',function(){
    var dest = new Array();
    dest.push(TOUS);
    envoi(dest);
  });
  
  $('#envoi_non_animateurs').on('click',function(){
    var dest = new Array();
    dest.push(NON_ANIMATEURS);
    envoi(dest);
  });
  
  socket.on('envoi reussi', function(msg_ids, cles_destinataires){
    var str = "envoi des messages ";
    for(var i in msg_ids){
      str += msg_ids[i] + ((i == msg_ids.length - 1) ? '' : ' ,');
    }
    str += " à destination de ";
    for(var j in cles_destinataires){
      str += participants[cles_destinataires[j]].prenom + ' '
              + participants[cles_destinataires[j]].nom + ((j == cles_destinataires.length - 1) ? '' : ' ,');
    }
    str += " réussi";
    console.log(str);
    $('#msg_bien_envoye').text(str);
    $('#msg_bien_envoye').show();
  });
  
  socket.on('envoi echoue', function(msg_ids, cles_destinataires){
    var str = "envoi des messages ";
    for(var i in msg_ids){
      str += msg_ids[i] + ((i == msg_ids.length - 1) ? '' : ' ,');
    }
    str += " à destination de ";
    for(var j in cles_destinataires){
      str += participants[cles_destinataires[j]].prenom + ' '
              + participants[cles_destinataires[j]].nom + ((j == cles_destinataires.length - 1) ? '' : ' ,');
    }
    str += " échoué";
    console.log(str);
    $('#erreur_msg').text(str);
    $('#erreur_msg').show();
  });
  
  function getNom(url){
    var debut = url.length - 1,
        fin = url.length - 1;
    
    while(url.charAt(fin) != '.' && fin >= 0){
      fin--;
    }
    debut = fin;
    while(url.charAt(debut) != '/' && debut >= 0){
      debut--;
    }
    return url.substr(debut + 1, fin - debut - 1);
  }
  
  socket.on('reception', function(m, cle_emetteur){
    var p = participants[cle_emetteur];
    if(m.type == 'texte'){
      $('#texte').append(
        '<p id="' + m.id + '">Message ' + m.id + ' de ' +
        p.prenom + ' ' +
        p.nom + ((p.estAnimateur) ? ' (animateur) ' : ' ') +
        '(cle = ' + cle +
        ') : ' + m.contenu +'</p>'
      );
      socket.emit('resultat reception',m.id, cle_emetteur, true);
    }
    else if(m.type == 'image'){
      $('#image').append(
        '<p id="' + m.id + '">Message ' + m.id + ' de ' +
        p.prenom + ' ' +
        p.nom + ((p.estAnimateur) ? ' (animateur) ' : ' ') +
        '(cle = ' + cle +
        ') : <a id="image' + getNom(m.contenu) + '" href="' + m.contenu + '" target="_blank">' + m.contenu + '</a></p>'
      );
      socket.emit('resultat reception',m.id, cle_emetteur, true);
    }
    else{
      socket.emit('resultat reception',m.id, cle_emetteur, false);
    }
  });
  
  $('#msg').on('focus',function(){
    $('#msg_bien_envoye').hide();
  });
  
  function handleUploads(files, tailleMax){
    for (var i = 0; i < files.length; i++) {
	console.log(files[i]);
      var reader = new FileReader();
      reader.onloadstart = function(){
        $('#loadingUpload').show();
      };
      reader.onloadend = function(){
        $('#loadingUpload').hide();
      };
      reader.onerror = function(){
        console.log("Erreur dans le chargement de l'image " + i);
        $('#erreurUpload').text("Erreur dans le chargement de l'image " + i);
        $('#erreurUpload').show();
      };
      reader.onload = function(d){
        console.log('image ' + i + ' correctement uploadee');
        socket.emit('upload', d.target.result);
      };
      if(files[i].size < tailleMax){
        reader.readAsDataURL(files[i]);
      }
      else{
        console.log("image " + i + " de taille " + files[i].size + " trop importante (taille max = " + tailleMax + ")");
        $('#tailleMaxDepassee').text("image " + i + " de taille " + files[i].size + " trop importante (taille max = " + tailleMax + ")");
        $('#tailleMaxDepassee').show();
      }
    }
  }
  
  $('#fileupload').on({
    click: function(){
      $('#erreurUpload').hide();
      $('#erreurType').hide();
      $('#tailleMaxDepassee').hide();
    },
    change: function() {
      handleUploads(this.files, 2000000);
    }
  });
  
  socket.on('upload reussi', function(chemin, num){
    $('#image').append(
      '<a id="image' + num + '" href="' + '/' + chemin + '" target="_blank">' + '<img src="' + '/' + chemin + '"/>' + '</a><br/>'
    );
  });
  
  socket.on('upload echoue', function(){
    $('#erreurType').show();
  });
});
