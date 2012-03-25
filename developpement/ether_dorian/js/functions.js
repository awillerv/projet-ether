
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
  
  var socket = io.connect(location.href);
  
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
  
  function remplirId(){
    $('#moi').text('Vous etes connecte en tant que : ' + moi.prenom + ' ' + moi.nom + ' ' + ((moi.estAnimateur) ? '(animateur)' : ''));
  }
  
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
    remplirId();
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
    console.log('maj des participants');
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
  
  function ajouterMessage(m, id_emetteur){
    switch(m.type){
      case 'texte':
        $('#texte').append(
          '<p id="' + m.id + '" class="texte">Message ' + m.id + ' de ' +
          '<span class="id_emetteur">' + id_emetteur + '</span>' +
          '(cle = ' + cle +
          ') : ' + m.contenu +'</p>'
        );
        return true;
        
      case 'image':
        console.log(m.contenu);
        $('#image').append(
          '<p id="' + m.id + '" class="image">Message ' + m.id + ' de ' +
          '<span class="id_emetteur">' + id_emetteur + '</span>' +
          '(cle = ' + cle +
          ') : ' + m.contenu + ' : ' +
          '<a id="image' + getNom(m.contenu) + '" href="' + m.contenu + '" target="_blank"><img src="' + m.contenu + '"/></a></p>'
        );
        return true;
        
      default:
        return false;
    }
  }
  
  socket.on('reception', function(m, cle_emetteur){
    var p = participants[cle_emetteur];
    var id_emetteur = p.prenom + ' ' + p.nom + ((p.estAnimateur) ? ' (animateur) ' : ' ');
    if(ajouterMessage(m, id_emetteur)){
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
	    // console.log(files[i]);
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
      handleUploads(this.files, 500000);
    }
  });
  
  socket.on('upload reussi', function(chemin){
    var id_emetteur = moi.prenom + ' ' + moi.nom + ((moi.estAnimateur) ? ' (animateur) ' : ' ');
    var m = new msg('image', Math.floor(Math.random()*1000001), chemin);
    ajouterMessage(m, id_emetteur);
  });
  
  socket.on('upload echoue', function(){
    $('#erreurType').show();
  });
  
  $('#saveSession').on('click',function(){
    // on vérifie que le localStorage est supporté
    if(typeof(localStorage) == 'undefined' ) {
      alert('Votre navigateur ne supporte pas l\'objet localStorage, du coup pas de sauvegarde de session!');
    }
    else{
      console.log('localStorage ok');
      
      // on commence par vider la base de données
      localStorage.clear();
      console.log('bdd vidée');
      
      // on commence par enregistrer l'identité de l'utilisateur
      var p = new Array('id', moi.prenom, moi.nom);
      // on utilise un try/catch au cas où on aurait plus de place
      try{
        localStorage.setItem('id', p.join('|'));
        console.log('id enregistré');
      }
      catch(e){
        if (e == QUOTA_EXCEEDED_ERR){
          alert('Plus de place pour stocker vos identifiants!');
        }
        console.log('impossible d\'enregistrer l\'id');
      }
        
      // on enregistre ensuite les messages texte du plus récent au plus ancien
      var m = new Array();
      $($('.texte').get().reverse()).each(function(index){
        // m = [type, message id, contenu, auteur id, extension]
        m = ['texte', $(this).attr('id'), $(this).text(), $(this).children('span').text(), 'txt'];
        // on utilise un try/catch au cas où on aurait plus de place
        try{
          // les infos pertinentes seront séparées par un | dans la string enregistrée
          localStorage.setItem('texte' + index, m.join('|'));
          console.log('texte ' + index + ' enregistré');
        }
        catch(e){
          if (e == QUOTA_EXCEEDED_ERR){
            alert(
            'Plus de place pour stocker vos messages (texte)! ' +
            'Vos ' + (index + 1) + ' textes les plus récents ont toutefois été enregistrés'
            );
          }
          console.log('impossible d\'enregistrer le texte ' + index);
        }
      });
      
      // on enregistre ensuite les messages image du plus récent au plus ancien
      $($('.image').get().reverse()).each(function(index, el){
        console.log($(this).children('a').attr('href') + ' requete envoyée');
        socket.emit('data encode request', $(this).children('a').attr('href'));
        socket.on('data encode response', function(data, ext){
          // m = [type, message id, contenu, auteur id, extension]
          m = ['image', $(el).attr('id'), data, $(el).children('span').text(), ext];
          // on utilise un try/catch au cas où on aurait plus de place
          try{
            // les infos pertinentes seront séparées par un | dans la string enregistrée
            localStorage.setItem('image' + index, m.join('|'));
            console.log('image ' + index + ' enregistrée');
          }
          catch(e){
            if (e == QUOTA_EXCEEDED_ERR){
              alert(
              'Plus de place pour stocker vos images! ' +
              'Vos ' + (index + 1) + ' images les plus récentes ont toutefois été enregistrées'
              );
            }
            console.log('impossible d\'enregistrer l\'image ' + index);
          }
        });
      });
    }
  });
  
  $('#loadSession').on('click',function(){
    // on vérifie que le localStorage est supporté
    if(typeof(localStorage) == 'undefined' ) {
      alert('Votre navigateur ne supporte pas l\'objet localStorage, du coup pas de chargement de session!');
    }
    else{
      //var data = new Array();
      console.log('localStorage ok');
      var t = new Array();
      for(var i = localStorage.length - 1 ; i >= 0 ; i--){
        // on transforme la string enregistrée en tableau, sachant que le séparateur est |
        t = localStorage.getItem(localStorage.key(i)).split('|');
        var m = new msg('texte', 0, '');
        // si c'est l'identité de l'utilisateur courant
        if(t[0] == 'id'){
          moi.prenom = t[1];
          moi.nom = t[2];
          console.log('id chargé');
        }
        // si c'est un des messages reçus par l'utilisateur courant
        else if(t[0] == 'texte'){
          m.type = t[0];
          m.id = t[1];
          m.contenu = t[2];
          console.log('message ' + i + ' chargé');
          ajouterMessage(m, t[3]);
        }
        else{
          // t[2] = data et t[4] = extension ('image/jpg' par exemple)
          console.log('l\'extension du fichier est : ' + t[4]);
          socket.emit('data decode request', t);
        }
      }
      
      socket.on('data decode response', function(m, id_emetteur){
        console.log('le chemin retrouvé est ' + m.contenu);
        ajouterMessage(m, id_emetteur);
      });
      
      // on change les infos en haut de la page
      remplirId();
            
      // on informe le serveur du changement d'identité
      socket.emit('changement id', moi); 
    }
  });
  
  socket.on('changement id participant', function(participant, cle){
    console.log('changement id participant');
    console.log('ancien id ' + participants[cle].prenom + ' ' + participants[cle].nom);
    console.log('nouvel id ' + participant.prenom + ' ' + participant.nom);
    participants[cle].prenom = participant.prenom;
    participants[cle].nom = participant.nom;
    majParticipants();
  });
});
