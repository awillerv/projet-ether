require(["dojo/parser","dojo/on","dojox/validate/web","dojo/dom-construct","dojo/dom-attr","dojo/dom-class","dojo/dom-style","dojo/dom-geometry","dojo/query","dojo/_base/fx","dojo/fx","dojo/fx/easing","dojo/_base/unload","dojo/_base/sniff","ether/tap","dijit/Dialog","dijit/ProgressBar","dijit/form/ValidationTextBox","dijit/form/RadioButton","dijit/form/Form","dijit/MenuBar","dijit/PopupMenuBarItem","dijit/DropDownMenu","dijit/MenuItem","ether/MenuItem","dijit/MenuSeparator","dijit/PopupMenuItem","dijit/CheckedMenuItem","dojox/form/Uploader","dijit/form/Textarea","dijit/form/FilteringSelect","dojo/data/ItemFileReadStore","dijit/ColorPalette","dijit/layout/BorderContainer","dijit/layout/ContentPane","dojo/dnd/Source","dojo/_base/array","ether/PostIt","ether/Cible","ether/CibleEnvoi","ether/editeur","ether/DZContainer","dojo/keys","dojo/domReady!"],function(parser,on,validate,domConstruct,domAttr,domClass,domStyle,domGeom,query,baseFx,fx,easing,unload,has,tap){ether.manager={PIList:new Array(),DZList:new Array(),DZId:0,DZGroupId:0,userMap:new Array(),PICount:0,DZSpawnZone:null,PISpawnZone:null,DZCorbeille:null,DZTous:null,DZAnim:null,DZBarCurrentDZ:new Array(),DZBarCurrentContainer:null,DZNonAnim:null,DZContainerList:null,DZBar:dojo.byId("DZBar"),participants:new Array(),POPUP:true,SUPPRESSION_POSTIT:true,COMPTEUR:0,NB_ERREURS:0,initialize:function(postItArea,DZDefaultArea)
{this.PISpawnZone=dojo.byId(postItArea);this.DZSpawnZone=dojo.byId(DZDefaultArea);this.DZCorbeille=new ether.cible(dojo.byId("corbeille"),this);this.DZCorbeille.onDrop=function(objet){this.onStopHover();if(objet.isPostIt){this.dernierEnvoye=objet.getContent();this.manager.deletePI(objet);return true;}
if(objet.isDZU){this.manager.droppedDZU(objet);return true;}
if(objet.isCibleEnvoi){this.manager.deleteDZ(objet);return true;}
return false;}
dojo.connect(this.DZCorbeille.node,tap,this.DZCorbeille,function(){if(this.dernierEnvoye!=undefined){var message="Corbeille<br /><br/>Voulez-vous restaurer le dernier �l�ment supprim� ?<br /><input id=\"boutonRestaurer\" value=\"oui\" type=\"button\"/> <input id=\"boutonNePasRestaurer\" value=\"non\" type=\"button\"/>";dijit.showTooltip(message,'corbeille',['below']);new dijit.form.Button({label:"Oui",onClick:function(){dijit.byId("boutonRestaurer").destroy();dijit.byId("boutonNePasRestaurer").destroy();var corbeille=ether.manager.DZCorbeille;ether.manager.chargementPostIt(eval("("+corbeille.dernierEnvoye+")"),null);corbeille.dernierEnvoye=null;dijit.hideTooltip('corbeille');}},"boutonRestaurer");new dijit.form.Button({label:"Non",onClick:function(){dijit.byId("boutonRestaurer").destroy();dijit.byId("boutonNePasRestaurer").destroy();dijit.hideTooltip('corbeille');}},"boutonNePasRestaurer");}else{dijit.showTooltip('Corbeille','corbeille',['below']);setTimeout("dijit.hideTooltip('corbeille')",2000);}});this.DZTous=new ether.cible(dojo.byId("envoiATous"),this);this.DZTous.onDrop=function(objet){this.onStopHover();if(objet.isPostIt){var resultat=this.manager.sendPI(objet,[TOUS]);if(resultat==undefined){this.envoiEchoue();}else{this.dernierEnvoye=resultat;}
return true;}else{return false;}}
dojo.connect(this.DZTous.node,tap,function(){dijit.showTooltip('Envoi � tous','envoiATous',['below']);setTimeout("dijit.hideTooltip('envoiATous')",2000);});this.DZAnim=new ether.cible(dojo.byId("envoiAuxAnimateurs"),this);this.DZAnim.onDrop=function(objet){this.onStopHover();if(objet.isPostIt){var resultat=this.manager.sendPI(objet,[ANIMATEURS]);if(resultat==undefined){this.envoiEchoue();}else{this.dernierEnvoye=resultat;}
return true;}else{return false;}}
dojo.connect(this.DZAnim.node,tap,function(){dijit.showTooltip('Envoi aux animateurs','envoiAuxAnimateurs',['below']);setTimeout("dijit.hideTooltip('envoiAuxAnimateurs')",2000);});this.DZNonAnim=new ether.cible(dojo.byId("envoiAuxNonAnimateurs"),this);this.DZNonAnim.onDrop=function(objet){this.onStopHover();if(objet.isPostIt){var resultat=this.manager.sendPI(objet,[NON_ANIMATEURS]);if(resultat==undefined){this.envoiEchoue();}else{this.dernierEnvoye=resultat;}
return true;}else{return false;}}
dojo.connect(this.DZNonAnim.node,tap,function(){dijit.showTooltip('Envoi aux participants (non animateurs)','envoiAuxNonAnimateurs',['below']);setTimeout("dijit.hideTooltip('envoiAuxNonAnimateurs')",2000);});var i=0;while(i<=this.participants.length){this.userMap[i]=new Array();i++;}
this.DZContainerList=new Array();dojo.forEach(this.DZSpawnZone.children,function(item){this.DZContainerList.push(ether.DZContainer(item,this.DZContainerList.length,this));},this);this.closeDZBar();},ajoutParticipant:function(idParticipant){this.userMap[idParticipant]=new Array();},deleteParticipant:function(idParticipant){if(this.userMap[idParticipant]){var j=0;while(j<this.userMap[idParticipant].length){this.userMap[idParticipant][j].removeClient(idParticipant);if(this.userMap[idParticipant][j].clientKeyList.length<=0){this.deleteDZ(this.userMap[idParticipant][j]);}else{this.userMap[idParticipant][j].refreshNode();}
j++;}
delete(this.userMap[idParticipant]);delete(this.participants[idParticipant]);}},createDZ:function(clientList){var clientArray;if(clientList instanceof Array){clientArray=clientList;}else{clientArray=[clientList];}
var i=0;while(!this.DZContainerList[i].isFree()){i++;}
dojo.create('div',{id:"DZ"+this.DZId,class:"DropZone"},this.DZContainerList[i].node);var DZ=ether.cibleEnvoi(this.DZContainerList[i].node.children[0],{},this.DZContainerList[i],clientArray,this);var k=0;while(k<clientArray.length){if(this.userMap[clientArray[k]]){this.userMap[clientArray[k]].push(DZ);}
k++;}
this.DZList[this.DZId]=DZ;this.DZId++;},fusionDZ:function(DZ1,DZ2){if(DZ1.isCibleEnvoi&&DZ2.isCibleEnvoi){var i=-1;var j=-1;var k=-1;var trouve1=false;var trouve2=false;while((k<this.DZList.length-1)){k++;trouve1=(this.DZList[k]==DZ1);trouve2=(this.DZList[k]==DZ2);if(trouve1){i=k;}
if(trouve2){j=k;}}
while(DZ1.clientKeyList.length>0){var n=DZ1.clientKeyList[0];DZ1.removeClient(n);DZ2.addClient(n);this.userMap[n].push(DZ2);}
DZ2.refreshNode();DZ1.container.DZ=null;this.deleteDZ(DZ1);}},droppedDZU:function(DZU,Container){var initContainer=DZU.container;initContainer.DZ.removeClient(DZU.client);aux=dojo.indexOf(this.userMap[DZU.client],initContainer.DZ);if(aux!=-1){this.userMap[DZU.client].splice(aux,1);}
if(Container){if(Container.DZ){if(Container.DZ.addClient(DZU.client)){this.userMap[DZU.client].push(Container.DZ);}
Container.DZ.refreshNode();}else{var DZ=ether.cibleEnvoi(dojo.create("div"),{},Container,DZU.client,this);MB=dojo.marginBox(Container.node);MBObjet=dojo.marginBox(DZ.node);this.userMap[DZU.client].push(Container.DZ);}}
if(initContainer.DZ.clientKeyList.length<=0){this.deleteDZ(initContainer.DZ);}else{initContainer.DZ.refreshNode();}
this.closeDZBar();},prepareAndShowDZBar:function(DZContainer,toggleDelete)
{var nbDZ=0;for(var i=0;i<this.DZBar.children.length;i++){dojo.destroy(this.DZBar.children[i]);}
this.DZBarCurrentDZ=new Array();nbDZ=DZContainer.DZ.clientKeyList.length;var MB=dojo.position(DZContainer.node);var parentMB=dojo.marginBox(DZContainer.node.parentNode);var proposedWidth=Math.min(60*nbDZ,parentMB.w);var proposedLeft=Math.max(0,MB.x+MB.w/2-proposedWidth/2);this.DZBarCurrentContainer=DZContainer;dojo.style(this.DZBar,{left:proposedLeft+"px",width:proposedWidth+"px",float:"left"});dojo.fadeIn({node:this.DZBar,duration:200}).play();for(var i=0;i<DZContainer.DZ.clientKeyList.length;i++){var node=dojo.create("div");var DZU=ether.DZUnitaire(node,{},DZContainer,DZContainer.DZ.clientKeyList[i],this);dojo.style(node,{float:"left"});dojo.place(node,this.DZBar);this.DZBarCurrentDZ.push(DZU);}},closeDZBar:function(){dojo.fadeOut({node:this.DZBar,duration:400}).play();for(var i=0;i<this.DZBar.children.length;i++){dojo.destroy(this.DZBar.children[i]);}
this.DZBarCurrentDZ=new Array();if(this.DZBarCurrentContainer){this.DZBarCurrentContainer.open=false;}
this.DZBarCurrentContainer=null;},deleteDZ:function(DZ){var id=dojo.attr(DZ.node,"id");var i=0;while(i<=this.userMap.length){if(this.userMap[i]){aux=dojo.indexOf(this.userMap[i],DZ);if(aux!=-1){this.userMap[i].splice(aux,1);}}
i++;}
aux=dojo.indexOf(this.DZList,DZ);if(aux!=-1){dojo.destroy(this.DZList[aux].node);this.DZList[aux].supprimer();this.DZList.splice(aux,1);}},chargementPostIt:function(objet,objetPred){var ProtoPI=dojo.create('div',{innerHTML:objet.innerHTML,id:'PI'+this.PICount,style:{position:"absolute"}},dojo.byId(this.PISpawnZone));dojo.attr(ProtoPI,"style",objet.style);if(objet.type=="postIt"){var PI=ether.postIt(ProtoPI,{},this,objetPred);this.PICount++;this.PIList.push(PI);if(objet.next){PI.next=this.chargementPostIt(objet.next,PI);}
return PI;}},receptionPostIt:function(objet,cle_emetteur){var listeDZ=this.userMap[cle_emetteur];var ProtoPI=dojo.create('div',{innerHTML:objet.innerHTML,id:'PI'+this.PICount,style:{position:"absolute"}},dojo.byId(this.PISpawnZone));dojo.attr(ProtoPI,"style",objet.style);if(listeDZ.length>0){var k=-1;dojo.forEach(listeDZ,function(DZ,i){if(listeDZ[i].clientKeyList.length==1){k=i;}});if(k==-1){k=listeDZ.length-1;}
listeDZ[k].reception();var MBDZselect=dojo.position(listeDZ[k].node);var MBapplicationCenterContainer=dojo.position(dojo.byId('applicationCenterContainer'));dojo.style(ProtoPI,{top:(MBapplicationCenterContainer.h-dojo.position(ProtoPI.children[0]).h-5)+"px",left:MBDZselect.x+"px"});if(objet.type=="postIt"){PI=ether.postIt(ProtoPI,{},this,null);this.PICount++;this.PIList.push(PI);if(objet.next){PI.next=this.chargementPostIt(objet.next,PI);}
PI.refreshNextPosition();}}else{var MBselect=dojo.position(dojo.byId('selectionParticipants'));dojo.style(ProtoPI,{top:5-dojo.position(ProtoPI.children[0]).h-10+"px",left:MBselect.x+"px"});fx.slideTo({duration:1000,node:ProtoPI,easing:easing.quadOut,top:5,left:MBselect.x,onEnd:function(){if(objet.type=="postIt"){PI=ether.postIt(ProtoPI,{},ether.manager,null);ether.manager.PICount++;ether.manager.PIList.push(PI);if(objet.next){PI.next=ether.manager.chargementPostIt(objet.next,PI);}
PI.refreshNextPosition();}}}).play();}},fusionPI:function(PI1,PI2){var i=-1;var j=-1;var k=-1;var trouve1=false;var trouve2=false;while((k<this.PIList.length-1)){k++;trouve1=(dojo.attr(this.PIList[k].node,"id")==PI1);trouve2=(dojo.attr(this.PIList[k].node,"id")==PI2);if(trouve1){i=k;}
if(trouve2){j=k;}}
if(this.PIList[i].isPostIt){this.PIList[i]=this.PIList[i].promote();while(this.PIList[j].node.children.length>0){this.PIList[i].addNode(this.PIList[j].node.children[0]);}
dojo.destroy(this.PIList[j].node);this.PIList[j].supprimer();this.PIList.splice(j,1);}else{while(this.PIList[j].node.children.length!=0){this.PIList[i].addNode(this.PIList[j].node.children[0]);}
dojo.destroy(this.PIList[j].node);this.PIList[j].supprimer();this.PIList.splice(j,1);}},createPI:function(objet){var innerNode=dojo.create("div",{class:"contenuPI",innerHTML:objet.texte,style:{backgroundColor:objet.couleur,width:objet.largeur+"px",height:objet.hauteur+"px",position:"absolute"}});var node=dojo.create("div",{id:"PI"+this.PICount},this.PISpawnZone);dojo.style(node,{position:"absolute",left:objet.left-dojo.position(dojo.byId("applicationCenter")).x+"px",top:objet.top-dojo.position(dojo.byId("applicationCenter")).y+"px"});dojo.place(innerNode,node,"first");PI=ether.postIt("PI"+this.PICount,{},this,null);this.PICount++;this.PIList.push(PI);},createImagePostIt:function(imgpath,name,top,left){var node=dojo.create("div",{id:"PI"+this.PICount,innerHTML:'<img class="contenuPI" src="'+imgpath+'" alt="'+name+'" onload="ether.manager.finalizeImagePostIt(this,'+top+','+left+')"/>',style:{display:'none',position:'absolute'}},this.PISpawnZone);this.PICount++;},finalizeImagePostIt:function(image,topDefaut,leftDefaut){var node=image.parentNode;dojo.attr(image,"onload","");dojo.style(node,"display","block");nodeMB=dojo.position(image);var hauteur=nodeMB.h;var largeur=nodeMB.w;var ratio=hauteur/largeur;if(nodeMB.h>250||nodeMB.w>250){if(nodeMB.h>nodeMB.w){hauteur=250;largeur=Math.round(250/ratio);}else{hauteur=Math.round(250*ratio);largeur=250;}}
dojo.style(image,{top:"0px",left:"0px",height:hauteur+"px",width:largeur+"px"});if(topDefaut==0||leftDefaut==0){marginBox=dojo.position(dojo.byId('uploadPhotos'));dojo.style(node,{left:marginBox.x+"px",top:5-hauteur-100+"px"});var id=dojo.attr(node,'id')
fx.slideTo({duration:1000,node:node,easing:easing.quadOut,top:5,left:marginBox.x,onEnd:function(){PI=ether.postIt(id,{},ether.manager,null);ether.manager.PIList.push(PI);}}).play();}else{marginBox=dojo.position(dojo.byId("applicationCenterContainer"));var newTop=topDefaut-marginBox.y-hauteur/2;if(newTop<5)
newTop=5;if(newTop+hauteur>marginBox.h)
newTop=marginBox.h-hauteur-5;var newLeft=leftDefaut-marginBox.x-largeur/2;if(newLeft<5)
newLeft=5;if(newLeft+largeur>marginBox.w)
newLeft=marginBox.w-largeur-5;dojo.style(node,{left:newLeft+"px",top:newTop+"px"});PI=ether.postIt(dojo.attr(node,'id'),{},this,null);this.PIList.push(PI);}},deletePI:function(PI){if(PI.next){this.deletePI(PI.next)};var aux=dojo.indexOf(this.PIList,PI);if(aux!=-1){dojo.destroy(this.PIList[aux].node);this.PIList[aux].supprimer();this.PIList.splice(aux,1);}},sendPI:function(objet,cles_destinataires){if(objet.isPostIt&&socket&&socket.socket.connected){var msg_id=MA_CLE+'_'+this.COMPTEUR;this.COMPTEUR++;var m=new msg(msg_id,objet.getContent());socket.emit('envoi',m,cles_destinataires);if(this.SUPPRESSION_POSTIT){this.deletePI(objet);}
return msg_id;}else{this.addError();return undefined;}},addError:function(){this.NB_ERREURS++;if(this.NB_ERREURS>3){dijit.byId('alerteRuptureConnexion').show();}}}
var tailleMaxUpload=1000000;var TOUS=-1,ANIMATEURS=-2,NON_ANIMATEURS=-3;ether.manager.participants[TOUS]=new participant('tous','',undefined,undefined);ether.manager.participants[ANIMATEURS]=new participant('animateurs','',true,undefined);ether.manager.participants[NON_ANIMATEURS]=new participant('non animateurs','',false,undefined);var MA_CLE=undefined;var moi=new participant('','',false,0);var DATE_SAUVEGARDE=undefined;var allowedTypes={'image/png':'png','image/jpeg':'jpg','image/gif':'gif','image/bmp':'bmp'};var allowedExtensions=[];var contentTypes={};for(ct in allowedTypes){allowedExtensions[allowedExtensions.length]=allowedTypes[ct];contentTypes[allowedTypes[ct]]=ct;}
function participant(prenom,nom,estAnimateur,socketID){this.prenom=prenom;this.nom=nom;this.estAnimateur=estAnimateur;this.socketID=socketID;}
function msg(id,contenu){this.id=id;this.contenu=contenu;}
function changementPage(anciennePage,nouvellePage){baseFx.fadeOut({node:anciennePage,duration:1000,beforeBegin:function(){dojo.setStyle(dojo.byId(nouvellePage),{display:"",opacity:"0",filter:"alpha(opacity=0)"});},onEnd:function(){dojo.setStyle(dojo.byId(anciennePage),{display:"none"});baseFx.fadeIn({node:nouvellePage,duration:1000}).play();}}).play();}
function majParticipants(){var contientAnimateurs=false;var contientNonAnimateurs=false;var contientParticipants=false;var itemsParticipants=new Array();for(var i=0;i<ether.manager.participants.length;i++){if(i!=MA_CLE&&ether.manager.participants[i]!=null){contientParticipants=true;if(ether.manager.participants[i].estAnimateur)
contientAnimateurs=true;else
contientNonAnimateurs=true;itemsParticipants.push({value:''+i,name:ether.manager.participants[i].prenom+' '+ether.manager.participants[i].nom});}}
if(contientParticipants){dijit.byId("menuParametresATous").disabled=false;dijit.byId("menuParametresATous")._applyAttributes();if(dijit.byId("menuParametresATous").checked){domStyle.set(dojo.byId('envoiATous'),"display","block");}
else{domStyle.set(dojo.byId('envoiATous'),"display","none");}}else{domStyle.set(dojo.byId('envoiATous'),"display","none");dijit.byId("menuParametresATous").disabled=true;dijit.byId("menuParametresATous")._applyAttributes();}
if(moi.estAnimateur){if(contientNonAnimateurs){dijit.byId("menuParametresAuxNonAnimateurs").disabled=false;dijit.byId("menuParametresAuxNonAnimateurs")._applyAttributes();if(dijit.byId("menuParametresAuxNonAnimateurs").checked){domStyle.set(dojo.byId('envoiAuxNonAnimateurs'),"display","block");}
else{domStyle.set(dojo.byId('envoiAuxNonAnimateurs'),"display","none");}}else{domStyle.set(dojo.byId('envoiAuxNonAnimateurs'),"display","none");dijit.byId("menuParametresAuxNonAnimateurs").disabled=true;dijit.byId("menuParametresAuxNonAnimateurs")._applyAttributes();}}else{if(contientAnimateurs){dijit.byId("menuParametresAuxAnimateurs").disabled=false;dijit.byId("menuParametresAuxAnimateurs")._applyAttributes();if(dijit.byId("menuParametresAuxAnimateurs").checked){domStyle.set(dojo.byId('envoiAuxAnimateurs'),"display","block");}
else{domStyle.set(dojo.byId('envoiAuxAnimateurs'),"display","none");}}else{domStyle.set(dojo.byId('envoiAuxAnimateurs'),"display","none");dijit.byId("menuParametresAuxAnimateurs").disabled=true;dijit.byId("menuParametresAuxAnimateurs")._applyAttributes();}}
listeParticipants.clearOnClose=true;listeParticipants.data={identifier:'value',label:'name',items:itemsParticipants};listeParticipants.close();}
function handleDragOver(evt){if(evt.preventDefault)evt.preventDefault();if(evt.stopPropagation)evt.stopPropagation();evt.dataTransfer.dropEffect='copy';return false;}
function handleFileSelect(evt){if(evt.preventDefault)evt.preventDefault();if(evt.stopPropagation)evt.stopPropagation();if(evt.dataTransfer.files){handleUploadFiles(evt.dataTransfer.files,evt.clientY,evt.clientX);}
if(evt.dataTransfer.types){var types=evt.dataTransfer.types;for(var i=0;i<types.length;i++){if(evt.dataTransfer.types[i]=='text/plain'){new ether.editeur(dojo.byId("applicationCenter"),evt.clientX,evt.clientY,53,160,evt.dataTransfer.getData('text'));}}}
return false;}
function handleUploadFiles(files,top,left){if(socket&&socket.socket.connected){for(var i=0;i<files.length;i++){var reader=new FileReader();var nomUpload=files[i].name;var tailleUpload=files[i].size;reader.onloadstart=function(){if(ether.manager.POPUP)
dijit.showTooltip('Lecture du fichier '+nomUpload,'uploadPhotos',['below']);};reader.onloadend=function(){if(ether.manager.POPUP)
dijit.showTooltip('<img src="images/upload.gif" /> Upload du fichier...','uploadPhotos',['below']);};reader.onerror=function(){if(ether.manager.POPUP)
dijit.showTooltip('Erreur lors de la lecture du fichier '+nomUpload,'uploadPhotos',['below']);};reader.onload=function(d){if(ether.manager.POPUP)
dijit.showTooltip('Lecture de '+nomUpload+'r�ussie','uploadPhotos',['below']);socket.emit('upload',nomUpload,d.target.result,top,left);};if(files[i].size<tailleMaxUpload){reader.readAsDataURL(files[i]);}else{dojo.addClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur');setTimeout("dojo.removeClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur')",2000);if(ether.manager.POPUP){dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader le fichier '+nomUpload+' qui est trop volumineux (taille maximale accept�e : 1Mo)','uploadPhotos',['below']);setTimeout("dijit.hideTooltip('uploadPhotos')",2000);}}}}else{ether.manager.addError();dojo.addClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur');setTimeout("dojo.removeClass(dijit.byId('uploadPhotos').domNode, 'uploadPhotosErreur')",2000);if(ether.manager.POPUP){dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader le fichier car vous n\'�tes plus connect� au serveur','uploadPhotos',['below']);setTimeout("dijit.hideTooltip('uploadPhotos')",2000);}}}
var socket=io.connect(location.href);parser.parse();var editeurPI=new ether.editeur(dojo.byId("menuEcrirePostit"));query(".couleur1").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",editeurPI.statics.couleur1);});query(".couleur2").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",editeurPI.statics.couleur2);});query(".couleur3").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",editeurPI.statics.couleur3);});query(".couleur4").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",editeurPI.statics.couleur4);});query(".couleur5").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",editeurPI.statics.couleur5);});new dijit.ColorPalette({id:"palette1",onChange:function(color){editeurPI.statics.couleur1=color;query(".couleur1").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",color);});}},dojo.byId("palette1"));new dijit.ColorPalette({id:"palette2",onChange:function(color){editeurPI.statics.couleur2=color;query(".couleur2").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",color);});}},dojo.byId("palette2"));new dijit.ColorPalette({id:"palette3",onChange:function(color){editeurPI.statics.couleur3=color;query(".couleur3").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",color);});}},dojo.byId("palette3"));new dijit.ColorPalette({id:"palette4",onChange:function(color){editeurPI.statics.couleur4=color;query(".couleur4").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",color);});}},dojo.byId("palette4"));new dijit.ColorPalette({id:"palette5",onChange:function(color){editeurPI.statics.couleur5=color;query(".couleur5").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",color);});}},dojo.byId("palette5"));changementPage("chargement","connexion");if(has("ie")){dojo.byId("versionIE").innerHTML=' '+has("ie");setTimeout("dijit.byId('alerteIE').show()",1000);}
if(typeof(localStorage)=='undefined'){dijit.byId('menuChargement').destroyRendering();dijit.byId('menuSauvegarde').destroyRendering();dijit.byId('menuSeparateur').destroyRendering();}else{if(localStorage.getItem('sauvegardeETHER')){dijit.byId("menuChargement").disabled=false;dijit.byId("menuChargement")._applyAttributes();DATE_SAUVEGARDE=new Date(localStorage.getItem('sauvegardeETHER'));}}
if(has('ie')||!('ondrop'in dojo.byId("application")))
hide('infoDND');on(dijit.byId("animateur"),"click",function(event){dojo.setStyle(dojo.byId("champMotDePasse"),{display:""});});on(dijit.byId("participant"),"click",function(event){dojo.setStyle(dojo.byId("champMotDePasse"),{display:"none"});});on(dijit.byId("boutonAlerteIE"),"click",function(event){dijit.byId('alerteIE').hide();});on(dijit.byId("boutonAlerteConnexion"),"click",function(event){dijit.byId('alerteConnexion').hide();});dijit.byId("motDePasse").validator=function(){return(dijit.byId("participant").get("value")||dijit.byId("motDePasse").get("value")!="");}
on(dijit.byId("boutonConnexion"),"click",function(event){if(socket&&socket.socket.connected){if(dijit.byId("formulaireConnexion").validate()){var valeursEntrees=dijit.byId('formulaireConnexion').get('value');var estAnimateur=false;if(valeursEntrees.estAnimateur=="true")
estAnimateur=true;moi=new participant(valeursEntrees.prenom,valeursEntrees.nom,estAnimateur,0);socket.emit('identification',moi,valeursEntrees.motDePasse);}}else{dijit.byId('alerteConnexion').show();}});socket.on('identification echouee',function(msgErreur){switch(msgErreur){case'faux mdpEntre':dijit.byId("motDePasse").focus();dijit.byId("motDePasse").displayMessage("Le mot de passe entr� est incorrect");break;case'prenom':dijit.byId("prenom").validate();dijit.byId("prenom").focus();dijit.byId("prenom").displayMessage("Ce champ est obligatoire");break;case'nom':dijit.byId("nom").validate();dijit.byId("nom").focus();dijit.byId("nom").displayMessage("Ce champ est obligatoire");break;case'mdpEntre':dijit.byId("motDePasse").validate();dijit.byId("motDePasse").focus();dijit.byId("motDePasse").displayMessage("Le mot de passe est obligatoire pour les animateurs");break;case'login deja pris':dijit.byId("prenom").focus();dijit.byId("prenom").displayMessage("\""+dijit.byId("prenom").get("value")+" "+dijit.byId("nom").get("value")+"\" est d�j� connect�(e) � Ether");break;}});socket.on('identification reussie',function(liste_participants,key){if(moi.estAnimateur){dojo.byId("moi").innerHTML=moi.prenom+" "+moi.nom+"<br />(animateur)";dijit.byId('menuParametresAuxAnimateurs').destroyRendering();}else{dojo.byId("moi").innerHTML=moi.prenom+" "+moi.nom;dijit.byId('menuParametresAuxNonAnimateurs').destroyRendering();}
MA_CLE=key;ether.manager.participants=liste_participants;majParticipants();ether.manager.initialize(dojo.byId("applicationCenter"),dojo.byId("DZRow"));changementPage("connexion","application");dijit.byId("application").resize();setTimeout("dojo.fadeOut({ node: 'divBienvenue', duration: 1000, onEnd: function() { dojo.destroy('divBienvenue'); } }).play()",6000);if(DATE_SAUVEGARDE!=undefined&&ether.manager.POPUP){var message='Une sauvegarde datant du '+DATE_SAUVEGARDE.toLocaleDateString()+' (� '+DATE_SAUVEGARDE.toLocaleTimeString()+') a �t� identif�e.<br />Vous pouvez la charger depuis le menu \"ETHER\" si vous le souhaitez.';setTimeout("dijit.showTooltip('"+message+"', 'menuETHER', ['below'])",2500);setTimeout("dijit.hideTooltip('menuETHER')",6500);}});dijit.byId("menuChargement").onClick=function(){var p=localStorage.getItem('id').split('|');moi.prenom=p[0];moi.nom=p[1];if(p[2]=='true'){dijit.byId("menuParametresCorbeille").checked=true;dijit.byId("menuParametresCorbeille")._applyAttributes();dojo.style(dojo.byId('corbeille'),'display','block');}
else{dijit.byId("menuParametresCorbeille").checked=false;dijit.byId("menuParametresCorbeille")._applyAttributes();dojo.style(dojo.byId('corbeille'),'display','none');}
dijit.byId("menuParametresATous").checked=((p[3]=='true')?true:false);dijit.byId("menuParametresATous")._applyAttributes();if(!moi.estAnimateur){dijit.byId("menuParametresAuxAnimateurs").checked=((p[4]=='true')?true:false);dijit.byId("menuParametresAuxAnimateurs")._applyAttributes();}
else{dijit.byId("menuParametresAuxNonAnimateurs").checked=((p[5]=='true')?true:false);dijit.byId("menuParametresAuxNonAnimateurs")._applyAttributes();}
if(p[6]=='false'){dijit.byId("menuParametresBarreMenu").checked=false;dijit.byId("menuParametresBarreMenu")._applyAttributes();domStyle.set(dojo.byId('afficherMenu1'),"display","block");domStyle.set(dojo.byId('afficherMenu2'),"display","block");domStyle.set(dojo.byId('applicationTop'),"display","none");dijit.byId('application').resize();}else{dijit.byId("menuParametresBarreMenu").checked=true;dijit.byId("menuParametresBarreMenu")._applyAttributes();domStyle.set(dojo.byId('afficherMenu1'),"display","none");domStyle.set(dojo.byId('afficherMenu2'),"display","none");domStyle.set(dojo.byId('applicationTop'),"display","");dijit.byId('application').resize();}
dijit.byId("menuParametresPopup").checked=((p[7]=='true')?true:false);dijit.byId("menuParametresPopup")._applyAttributes();ether.manager.POPUP=((p[7]=='true')?true:false);dijit.byId("menuParametresSuppressionPostit").checked=((p[8]=='true')?true:false);dijit.byId("menuParametresSuppressionPostit")._applyAttributes();ether.manager.SUPPRESSION_POSTIT=((p[8]=='true')?true:false);majParticipants();query(".couleur1").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",p[9]);});query(".couleur2").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",p[10]);});query(".couleur3").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",p[11]);});query(".couleur4").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",p[12]);});query(".couleur5").forEach(function(node,index,arr){domStyle.set(node,"backgroundColor",p[13]);});editeurPI.statics.couleur1=p[9];editeurPI.statics.couleur2=p[10];editeurPI.statics.couleur3=p[11];editeurPI.statics.couleur4=p[12];editeurPI.statics.couleur5=p[13];dojo.byId("moi").innerHTML=moi.prenom+" "+moi.nom+((moi.estAnimateur)?"<br />(animateur)":'');socket.emit('changement id',moi);while(ether.manager.PIList.length>0){ether.manager.deletePI(ether.manager.PIList[0]);}
ether.manager.PICount=0;ether.manager.COMPTEUR=0;ether.manager.NB_ERREURS=0;var PIlength=0;var PIIMGlength=0;var content=null;var img=null;var imgsUniques=new Array();var isUnique=true;var cpt=0;var id=0;var listePITeteId=new Array();var key=0;var testRegExp=/^PI[0-9]+$/;while(key<localStorage.length){if(testRegExp.test(localStorage.key(key))){listePITeteId.push(localStorage.key(key));}
key++;}
var reverseListePITeteId=listePITeteId.reverse();for(var key2 in reverseListePITeteId){content=localStorage.getItem(reverseListePITeteId[key2]);ether.manager.chargementPostIt(eval("("+content+")"),null);}
var k=0;var j=0;var temp=null;dojo.forEach(ether.manager.PIList,function(pi,i){if(!pi.pred){temp=pi;j=0;while(temp){if(domAttr.get(temp.node.children[0],'src')!=null){if(localStorage.getItem(reverseListePITeteId[k]+'IMG'+j).split('|').length<2){img=localStorage.getItem(localStorage.getItem(reverseListePITeteId[k]+'IMG'+j));}
else{img=localStorage.getItem(reverseListePITeteId[k]+'IMG'+j);}
cpt=0;isUnique=true;while(cpt<imgsUniques.length&&isUnique==true){if(img==imgsUniques[cpt][1]){isUnique=false;}
else{cpt++;}}
if(isUnique){imgsUniques.push(new Array(img));console.log(domAttr.get(temp.node,'id'));socket.emit('data decode request',domAttr.get(temp.node,'id'),imgsUniques.length-1,img.split('|'));}
else{domAttr.set(temp.node.children[0],'src',imgsUniques[cpt][1]);}
j++;}
temp=temp.next;}
k++;}});socket.on('data decode response',function(id_tempnode,cleUnique,chemin){if(MA_CLE!=undefined){var tempnode=dojo.byId(id_tempnode);console.log(tempnode);domAttr.set(tempnode.children[0],'src',chemin);imgsUniques[cleUnique].push(chemin);}});};dijit.byId("menuSauvegarde").onClick=function(){localStorage.clear();var d=new Date();localStorage.setItem('sauvegardeETHER',d.toString());var p=new Array(moi.prenom,moi.nom);p.push(dijit.byId("menuParametresCorbeille").checked);p.push(dijit.byId("menuParametresATous").checked);p.push(dijit.byId("menuParametresAuxAnimateurs").checked);p.push(dijit.byId("menuParametresAuxNonAnimateurs").checked);p.push(dijit.byId("menuParametresBarreMenu").checked);p.push(dijit.byId("menuParametresPopup").checked);p.push(dijit.byId("menuParametresSuppressionPostit").checked);p.push(editeurPI.statics.couleur1);p.push(editeurPI.statics.couleur2);p.push(editeurPI.statics.couleur3);p.push(editeurPI.statics.couleur4);p.push(editeurPI.statics.couleur5);try{localStorage.setItem('id',p.join('|'));}catch(e){if(e==QUOTA_EXCEEDED_ERR){alert("Impossible d'enregistrer la session car l'espace de sauvegarde est plein.");}
console.log('erreur lors de l\'enregistrement de l\'ID');}
var content=null;var url=null;var urlsUniques=new Array();var isUnique=true;var cpt=0;var imgContenu=null;var j=0;var temp=null;var reversePIList=ether.manager.PIList.reverse();dojo.forEach(reversePIList,function(pi,i){if(!pi.pred){content=pi.getContent();try{localStorage.setItem('PI'+i,content);console.log('enregistrement du pi/groupe pi '+i);}catch(e){if(e==QUOTA_EXCEEDED_ERR){alert('L\'espace de sauvegarde est plein. '+'Vos '+(i+1)+' post-its les plus r�cents ont toutefois �t� enregistr�s');}
console.log('erreur lors de l\'enregistrement du post-it '+i);}
j=0;temp=pi;while(temp){url=domAttr.get(temp.node.children[0],'src');console.log(url);if(url!=null){cpt=0;isUnique=true;while(cpt<urlsUniques.length&&isUnique==true){if(url==urlsUniques[cpt][1]){isUnique=false;}
else{cpt++;}}
console.log('isUnique vaut '+isUnique);if(isUnique){socket.emit('data encode request',i,j,url);}
else{try{localStorage.setItem('PI'+i+'IMG'+j,urlsUniques[cpt][0]);console.log('image '+j+' du pi/groupe pi '+i+' enregistr�e');}
catch(e){if(e==QUOTA_EXCEEDED_ERR){alert('L\'espace de sauvegarde est plein. '+'Vos '+(i+1)+' post-its les plus r�cents ont toutefois �t� enregistr�s');}
console.log('impossible d\'enregistrer l\'image '+j+' du pi/groupe pi '+i);}}
j++;}
temp=temp.next;}}
if(ether.manager.POPUP){dijit.showTooltip('<img src="images/ok.png" /> Session sauvegard�e !','menuETHER',['below']);setTimeout("dijit.hideTooltip('menuETHER')",2000);}});socket.on('data encode response',function(i,j,url,data,ext){if(MA_CLE!=undefined){imgContenu=new Array(data,ext);imgContenu=imgContenu.join('|');try{localStorage.setItem('PI'+i+'IMG'+j,imgContenu);console.log('image '+j+' du pi/groupe pi '+i+' enregistr�e');}
catch(e){if(e==QUOTA_EXCEEDED_ERR){alert('L\'espace de sauvegarde est plein. '+'Vos '+(i+1)+' post-its les plus r�cents ont toutefois �t� enregistr�s');}
console.log('impossible d\'enregistrer l\'image '+j+' du pi/groupe pi '+i);}
urlsUniques.push(new Array('PI'+i+'IMG'+j,url));}});};dijit.byId("menuDeconnexion").onClick=function(){dijit.byId('alerteDeconnexion').show();}
on(dijit.byId("boutonDeconnexionOK"),"click",function(event){dijit.byId('alerteDeconnexion').hide();socket.disconnect();changementPage("application","chargement");setTimeout("location.reload()",2000);});on(dijit.byId("boutonDeconnexionAnnuler"),"click",function(event){dijit.byId('alerteDeconnexion').hide();});unload.addOnUnload(window,function(){socket.disconnect();});dijit.byId("editeurOK_0").onClick=function(){var textarea=dojo.byId("editeurTextarea_0");var texte=domAttr.get(textarea,'value');if(texte!=''){var postitJSON={texte:texte,couleur:domStyle.get(textarea,'backgroundColor'),top:domGeom.position(textarea).y,left:domGeom.position(textarea).x,hauteur:domGeom.position(textarea).h,largeur:domGeom.position(textarea).w};ether.manager.createPI(postitJSON);domAttr.set(textarea,'value','');domStyle.set(textarea,'backgroundColor','white');dijit.byId("menuTaperTexte")._onClick({type:"custom",preventDefault:function(){},stopPropagation:function(){}});}};dijit.byId("editeurAnnuler_0").onClick=function(){domAttr.set(dojo.byId("editeurTextarea_0"),"value","");domStyle.set(dojo.byId("editeurTextarea_0"),"backgroundColor","white");dijit.byId("menuTaperTexte")._onClick({type:"custom",preventDefault:function(){},stopPropagation:function(){}});};dijit.byId("uploadPhotos").onChange=function(){if(dijit.byId("uploadPhotos")._files){handleUploadFiles(dijit.byId("uploadPhotos")._files,0,0);}else{dojo.addClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur');setTimeout("dojo.removeClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur')",2000);if(ether.manager.POPUP){dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader des photos car votre navigateur n\'est pas compatible','uploadPhotos',['below']);setTimeout("dijit.hideTooltip('uploadPhotos')",2000);}}};socket.on('upload echoue',function(){if(MA_CLE!=undefined){if(ether.manager.POPUP){dijit.showTooltip('<img src="images/erreur.png" /> Echec de l\'upload : le fichier n\'est pas une image ! (les extensions accept�es sont .png, .jpg et .gif)','uploadPhotos',['below']);setTimeout("dijit.hideTooltip('uploadPhotos')",2000);}}});socket.on('upload reussi',function(nom,chemin,top,left){if(MA_CLE!=undefined){if(ether.manager.POPUP){dijit.showTooltip('<img src="images/ok.png" /> Upload de l\'image r�ussi !','uploadPhotos',['below']);setTimeout("dijit.hideTooltip('uploadPhotos')",2000);}
ether.manager.createImagePostIt(chemin,nom,top,left);}});dijit.byId("selectionParticipants").onChange=function(value){if(value!=''){ether.manager.createDZ(value);dijit.byId("selectionParticipants").set('value','');}}
dijit.byId("menuParametresCorbeille").onChange=function(checked){var display="block";if(!checked)
display="none";domStyle.set(dojo.byId("corbeille"),"display",display);}
dijit.byId("menuParametresATous").onChange=function(checked){var display="block";if(!checked)
display="none";domStyle.set(dojo.byId("envoiATous"),"display",display);}
dijit.byId("menuParametresAuxAnimateurs").onChange=function(checked){var display="block";if(!checked)
display="none";domStyle.set(dojo.byId("envoiAuxAnimateurs"),"display",display);}
dijit.byId("menuParametresAuxNonAnimateurs").onChange=function(checked){var display="block";if(!checked)
display="none";domStyle.set(dojo.byId("envoiAuxNonAnimateurs"),"display",display);}
dijit.byId("menuParametresBarreMenu").onChange=function(checked){domStyle.set(dojo.byId('afficherMenu1'),"display","block");domStyle.set(dojo.byId('afficherMenu2'),"display","block");domStyle.set(dojo.byId('applicationTop'),"display","none");dijit.byId('application').resize();}
dijit.byId("menuParametresPopup").onChange=function(checked){ether.manager.POPUP=checked;}
dijit.byId("menuParametresSuppressionPostit").onChange=function(checked){ether.manager.SUPPRESSION_POSTIT=checked;}
on(dojo.byId('afficherMenu1'),tap,function(){dijit.byId("menuParametresBarreMenu").checked=true;dijit.byId("menuParametresBarreMenu")._applyAttributes();domStyle.set(dojo.byId('afficherMenu1'),"display","none");domStyle.set(dojo.byId('afficherMenu2'),"display","none");domStyle.set(dojo.byId('applicationTop'),"display","");dijit.byId('application').resize();});on(dojo.byId('afficherMenu2'),tap,function(){dijit.byId("menuParametresBarreMenu").checked=true;dijit.byId("menuParametresBarreMenu")._applyAttributes();domStyle.set(dojo.byId('afficherMenu1'),"display","none");domStyle.set(dojo.byId('afficherMenu2'),"display","none");domStyle.set(dojo.byId('applicationTop'),"display","");dijit.byId('application').resize();});socket.on('connexion nouveau participant',function(participant,key){if(MA_CLE!=undefined){ether.manager.participants[key]=participant;ether.manager.ajoutParticipant(key);majParticipants();if(ether.manager.POPUP){dijit.showTooltip('Connexion de '+ether.manager.participants[key].prenom+' '+ether.manager.participants[key].nom,'selectionParticipants',['below']);setTimeout("dijit.hideTooltip('selectionParticipants')",2000);}}});socket.on('deconnexion participant',function(key){if(MA_CLE!=undefined){if(ether.manager.POPUP){dijit.showTooltip('D�connexion de '+ether.manager.participants[key].prenom+' '+ether.manager.participants[key].nom,'selectionParticipants',['below']);setTimeout("dijit.hideTooltip('selectionParticipants')",2000);}
ether.manager.deleteParticipant(key);majParticipants();}});socket.on('envoi reussi',function(msg_id){if(MA_CLE!=undefined){dojo.forEach(ether.manager.DZList.concat([ether.manager.DZCorbeille,ether.manager.DZTous,ether.manager.DZAnim,ether.manager.DZNonAnim]),function(item){if(item.dernierEnvoye==msg_id)
item.envoiReussi();});}});socket.on('envoi echoue',function(msg_id){if(MA_CLE!=undefined){dojo.forEach(this.manager.DZList.concat([this.manager.DZCorbeille,this.manager.DZTous,this.manager.DZAnim,this.manager.DZNonAnim]),function(item){if(item.dernierEnvoye==msg_id)
item.envoiEchoue();});}});socket.on('reception',function(message,cle_emetteur){if(MA_CLE==undefined){socket.emit('resultat reception',message.id,cle_emetteur,false);}else{ether.manager.receptionPostIt(eval("("+message.contenu+")"),cle_emetteur);socket.emit('resultat reception',message.id,cle_emetteur,true);}});on(dojo.byId("applicationCenterContainer"),tap.doubletap,function(event){new ether.editeur(dojo.byId("applicationCenter"),event.target.tapX,event.target.tapY);});dojo.byId("application").addEventListener('dragover',handleDragOver,false);dojo.byId("application").addEventListener('drop',handleFileSelect,false);on(dijit.byId("boutonReconnexionOK"),"click",function(event){dijit.byId('alerteRuptureConnexion').hide();socket.disconnect();changementPage("application","chargement");setTimeout("location.reload()",2000);});on(dijit.byId("boutonReconnexionAnnuler"),"click",function(event){dijit.byId('alerteRuptureConnexion').hide();});});var dataParticipants={identifier:'value',label:'name',items:[]};var listeParticipants=new dojo.data.ItemFileReadStore({data:dataParticipants});