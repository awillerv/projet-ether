/* ---------------------------------------------------------------------------------------------------------------------------
   --  on charge toutes les bibliothèques de Dojo nécessaires à ETHER, puis on exécute le callback lorsque tout est chargé  --	
   --------------------------------------------------------------------------------------------------------------------------- */

require(["dojo/parser", "dojo/on", "dojox/validate/web", "dojo/dom-construct", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-style", "dojo/dom-geometry", "dojo/query", "dojo/_base/unload", "dojo/_base/sniff", "ether/tap",
"dijit/Dialog", "dijit/ProgressBar", "dijit/form/ValidationTextBox", "dijit/form/RadioButton", "dijit/form/Form", 
"dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu", "dijit/MenuItem", "ether/MenuItem", "dijit/MenuSeparator", "dijit/PopupMenuItem", "dijit/CheckedMenuItem",
"dojox/form/Uploader", "dijit/form/Textarea", "dijit/form/FilteringSelect", "dojo/data/ItemFileReadStore", "dijit/ColorPalette",

"dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/dnd/Source", "dojo/_base/array",
"ether/PostIt", "ether/Cible","ether/CibleEnvoi", "ether/editeur","ether/DZContainer", "dojo/keys", "dojo/domReady!"], function(parser, on, validate, domConstruct, domAttr, domClass, domStyle, domGeom, query, unload, has, tap) {




/*
//test pour la détection du navigateur		
console.log("mozilla : "+has("mozilla"));
console.log("firefox : "+has("ff"));
console.log("opera : "+has("opera"));
console.log("mac : "+has("mac"));
console.log("chrome : "+has("chrome"));
console.log("safari : "+has("safari"));
console.log("ios : "+has("ios"));
console.log("android : "+has("android"));
console.log("webkit : "+has("webkit"));

var corbeille = new ether.Corbeille({ id: 'corbeille'});
corbeille.onDrop = function(droppable) {
	this.dernierSupprime = "droppable";
	dojo.destroy(droppable.node);
	this.onStopHover();
}
var postit1 = new ether.PostIt("postit_1",{}, corbeille);
var postit2 = new ether.PostIt("postit_2",{}, corbeille);

var listeCibles = new dojo.dnd.Source("applicationBottom");
var dernierNoeud = listeCibles.insertNodes(false, ["test1"]).node.lastChild;
domClass.add(dernierNoeud, "groupe1");
//new dojo.dnd.Source(dernierNoeud);
listeCibles.insertNodes(false, ["test2"]);
*/




/*
	ether.manager : un objet qui gère l'ensemble des drop-zones et des post-it. 
	
	méthodes :
	initialize(zonePI,zoneDZ) : à executer au moment de l'activation de l'interface 'post-it' (après le login, je l'ai mis ligne 643) : arguments : id de la zone où se créent les post-it, id de la zone où se créent les DZ (qui sont déplaçables, mais bon...)
								PROBLEMES : la position des cibles corbeille/tous/animateurs est complètement ratée, ça marchait pourtant bien sur ma page de test...
	createImagePostIt(imgpath): crée un post-it contenant l'image dont on donne l'adresse (URL) au centre de la zone post-it(à peu près...)
	createDZ(clientList) : crée une dropZone pour la liste des participants passée en paramètres. Normalement elle se place dans la zoneDZ, mais comme elle est déplacable et que ça fait automatiquement du "position:absolute", ça rend bizarre. A examiner. Reste aussi à rajouter une tooltip avec la liste des associés (dans le code, la variable TooltipText est prête). Plante si on lui passe des id de participants qui ne sont pas dans la variable globale "participants"
	deletePI(id): supprime le postIt dont on passe l'id (id du div : tous les post-its ont une id de la forme PIx, avec x un compteur)
	deleteDZ(id): supprime la DZ dont on passe l'id (quelle surprise!). Ceux-ci sont normalement de la forme (DZx, avec x un compteur).De plus, le div entourant la dropZone a la class DropZone. Notez que ce n'est pas le cas des DZ "constantes" (corbeille, tous, anims, nonanims) qui sont crées dans initialize(), non déplacable et non supprimable.
	deleteParticipant(id) : supprime le participant n°'id' de toutes les DZ qui lui sont associées. A un effet uniquement sur le manager, pas sur la variable globale "participants"
	receptionPostIt(idEmetteur, node) : pour la réception d'un postIt. Crée un post-it contenant le node, à proximité d'une DZ associée au participant idEmetteur.Le placement est un peu bizarre en ce moment, je ne sais pas compter, mais je corrigerai ça vite. 
	
	voir lignes 78,88,98 pour completer les codes afin de faire fonctionner les DZ spéciales, ainsi que ligne 32 du fichier dojo/ether/cibleEnvoi.js pour le cas général
*/
ether.manager={
	PIList :new Array(),		//liste des post-it;
	DZList :new Array(),	//liste des Dropzones
	DZId:0,
	DZGroupId:0,
	userMap :new Array(),		//un array pour associer à chaque participant la DZ à laquelle il est associé
	PICount:0,
	EditionEnCours :false,		//une seule zone d'édition de texte à la fois
	PIEdite :null, //le PI en cours d'édition, le cas échéant
	DZSpawnZone :null,	
	PISpawnZone : null,
	DZCorbeille:null,
	DZTous:null,
	DZAnim:null,
	DZBarCurrentDZ:new Array(),
	DZNonAnim:null,
	DZContainerList:null,
	DZBar:dojo.byId("DZBar"),
	participants:new Array(),
	
	
	initialize:function(postItArea,DZDefaultArea)		//initialisation: on passe en argument l'id de la zone où l'on peut spawner les conteneurs.
	{	
		this.PISpawnZone=dojo.byId(postItArea);	
		this.DZSpawnZone=dojo.byId(DZDefaultArea);
		var AreaPosition=dojo.position(this.PISpawnZone);
		this.DZCorbeille=new ether.cible(dojo.byId("corbeille"));
		this.DZCorbeille.onDrop=function(objet)
			{
				if(objet.isPostIt)
				{
					ether.manager.deletePI(dojo.attr(objet.node,"id"));
				}
			}
		this.DZTous=new ether.cible(dojo.byId("envoiATous"));
		this.DZTous.onDrop=function(objet)
			{
				if(objet.isPostIt)
				{
					sendPI(objet, [TOUS]);
				}
			}
		this.DZAnim=new ether.cible(dojo.byId("envoiAuxAnimateurs"));
		this.DZAnim.onDrop=function(objet)
			{
				if(objet.isPostIt)
				{
					sendPI(objet, [ANIMATEURS]);
				}
			}
		this.DZNonAnim=new ether.cible(dojo.byId("envoiAuxNonAnimateurs"));
		this.DZNonAnim.onDrop=function(objet)
			{
				if(objet.isPostIt)
				{
					sendPI(objet, [NON_ANIMATEURS]);
				}
			}
		
		
		
		var i=0;
		while(i<=this.participants.length)		//initialisation de l'usermap pour les participants présents au départ
		{
		
			this.userMap[i]=new Array();
				i++;
		}
		this.DZContainerList=new Array();
		//creation d'une liste de DZContainer...
		dojo.forEach(this.DZSpawnZone.children, function(item)
				{
					this.DZContainerList.push(ether.DZContainer(item,this.DZContainerList.length,this));
				},this);
		
	},
	
	createImagePostIt: function(imgpath, name)
	{
		var node=dojo.create("div",{id:"PI"+this.PICount,innerHTML:'<img class="contenuPI" src="'+ imgpath + '" alt="'+ name +'" onload="ether.manager.finalizeImagePostIt(this)"/>',style:{display:'none'}},this.PISpawnZone);
	},
	
	finalizeImagePostIt: function(image) {
		var node = image.parentNode;
		//recupération du centre
		marginBox=dojo.position(this.PISpawnZone);
		topx=marginBox.x+marginBox.w/2;
		topy=marginBox.y+marginBox.h/2;
		dojo.style(node, "display", "block");
		nodeMB = dojo.position(image);
		var hauteur = nodeMB.h;
		var largeur = nodeMB.w;
		var ratio = hauteur/largeur;
		if(nodeMB.h>250 || nodeMB.w>250) {
			if(nodeMB.h>nodeMB.w) {
				hauteur=250;
				largeur=Math.round(250/ratio);
			} else {
				hauteur=Math.round(250*ratio);
				largeur=250;
			}
		}
		dojo.style(node,{		//en particulier, on précise la position ici
				position:"absolute",
				left: topx-largeur/2+"px",
				top: topy-hauteur/2+"px",
					});
		dojo.style(image,{		//en particulier, on précise la position ici
				height: hauteur+"px",
				width: largeur+"px"
					});
		PI = ether.postIt("PI"+this.PICount,{},this);	//on transforme notre noeud en post-it
				this.PICount++;
				this.PIList.push(PI);
	},
	
	deletePI: function(id)	//id du PI à détruire.
	{

		//recherche de l'index du PI voulu
		var i=-1;
		var trouve=false;
		while(i<this.PIList.length&&!trouve)
		{
		i++;
		trouve=(dojo.attr(this.PIList[i].node,"id")==id);
		
		}
			dojo.destroy(this.PIList[i].node);
			this.PIList[i].supprimer();
			this.PIList.splice(i-1,1);
		
	
	},
	createDZ:function (clientList)
	{	
	
		var clientArray;
		if(clientList instanceof Array)
		{
		clientArray=clientList;
		}
		else 
		{
		clientArray=[clientList];
		}
		
		//on récupere le premier container libre.
		var i=0;
		while(!this.DZContainerList[i].isFree())
		{
		i++;
		}
		console.log(clientArray);
		dojo.create('div',{id:"DZ"+this.DZId,class:"DropZone"},this.DZContainerList[i].node)
		var DZ=ether.cibleEnvoi(this.DZContainerList[i].node.children[0],{},this.DZContainerList[i], clientArray,this);
		var k=0;
		
		while(k<clientArray.length)
		{
		if(this.userMap[clientArray[k]])
		{
		this.userMap[clientArray[k]].push("DZ"+this.DZId);
		}
		else
		{
		this.userMap[clientArray[k]]=new Array("DZ"+this.DZId);
		}
		k++;
		}
		
		this.DZList[this.DZId]=DZ;
		this.DZId++;
	},
	
	fusionDZ:function(DZ1,DZ2)		//toujours dans l'ordre dessus/dessous
	{
		if(DZ1.isCibleEnvoi&&DZ2.isCibleEnvoi)
		{
			var i=-1;						
			var j=-1;
			var k=-1;
			var trouve1=false;
			var trouve2=false;
			while((k<this.DZList.length-1))		//on recherche les deux éléments dans le tableau : &&!(trouve1&&trouve2)
			{
				k++;
			
			trouve1=(dojo.attr(this.DZList[k].node,"id")==DZ1);
			trouve2=(dojo.attr(this.DZList[k].node,"id")==DZ2);
		
			if(trouve1)
			{
				i=k;
			}
			if(trouve2)
			{
				j=k;
			}
			}
			
			while(DZ1.clientKeyList.length>0)
			{
				var n=DZ1.clientKeyList[0];
				DZ1.removeClient(n);
				DZ2.addClient(n);
				this.userMap[n].push(dojo.attr(DZ2.node,"id"));
			}
			DZ2.refreshNode();
			DZ1.container.DZ=null;
			this.deleteDZ(DZ1);
		
		}
	},
	
	prepareAndShowDZBar: function(DZContainer)		//prepare et affiche la barre des DZ individuelles du container passé en argument
	{	
		var nbDZ=0;
		if(DZContainer.DZ)
	{
		nbDZ=DZContainer.DZ.clientKeyList.length;
	}
		var MB=dojo.marginBox(DZContainer.node);
		var parentMB=dojo.marginBox(this.DZBar.parentNode);
		var proposedWidth=Math.min(100*nbDZ,parentMB.w);
		var proposedLeft=Math.max(0,MB.l-proposedWidth/2);
		
		dojo.style(this.DZBar,{left:proposedLeft+"px",width:proposedWidth+"px"});
		
		if(DZContainer.DZ)
		{	var node=dojo.create("div");
			var DZ=ether.cibleEnvoi(node,{},null,DZContainer.DZ.clientKeyList[0],this);
			dojo.place(node,this.DZBar,"last");
			this.DZBarCurrentDZ.push(DZ);
		}
	},
	
	
	deleteDZ:function(DZ) //suppression de la DZ n°X. id est de la forme "DZn" à priori
	{	
	//vérification : est-ce bien une DZ existante
	var id=dojo.attr(DZ.node,"id");
	{
	//étape 1 : mettre à jour le tableau userMap. Un parcours complet est requis
		var i=0;
		while(i<=this.userMap.length)
		{
			if(this.userMap[i])
			{
				aux=dojo.indexOf(this.userMap[i],id);
				if(aux!=-1)
				{
					this.userMap[i].splice(aux,1);
				}
			}
			i++;
		}
		
		//etape 2 : on supprime effectivement la DZ
		aux=dojo.indexOf(this.DZList,id);
		if(aux!=-1)
		{
			this.DZList.splice(aux,1);
		}
		dojo.destroy(dojo.byId(id));
	}
	},

	deleteParticipant: function(idParticipant)		//suppression de toutes les DZ associées...
	{
		//on le supprime de toutes les DZ auxquelles il est associé. D'abord on vérifie qu'il est effectivement associé à des DZ dans UserMap
		if(this.userMap[idParticipant])
		{
		var j=0;
		while(j<this.userMap[idParticipant].length)
		{	
			this.DZList[this.userMap[idParticipant][j]].removeClient(idParticipant);
			if(this.DZList[this.userMap[idParticipant][j]].clientKeyList.length<=0)
			{
				this.deleteDZ(this.DZList[this.userMap[idParticipant][j]]);
			}
			else
			{
				this.DZList[userMap[idParticipant][j]].refreshNode();
			////
			}
			
			j++;
		}
		delete(this.userMap[idParticipant]);
		}
	},
		
	receptionPostIt:function(objectString)		//creation de postIt à la réception. Problème du positionnement, il faudra regarder
	{		
			var objet=eval("(" + objectString + ")" );
			var ProtoPI=dojo.create('div',{innerHTML:objet.innerHTML, 
			id: 'PI'+this.PICount, style:{position:"absolute"}}, dojo.byId(this.PISpawnZone));
			dojo.attr(ProtoPI,"style",objet.style);
	
			if(objet.type=="postItGroup")
			{
			PI= ether.postItGroup(ProtoPI,{},this);	//on transforme notre noeud en post-it
				this.PICount++;
				this.PIList.push(PI);
			}
			else
			{
				if(objet.type=="postIt")
				{
					PI=ether.postIt(ProtoPI,{},this);	//on transforme notre noeud en post-it
					this.PICount++;
					this.PIList.push(PI);
				}
			}
	},
	
	fusionPI:function(PI1,PI2)		//fusionne deux postIt, repérés par leurs ID (ouPostItGroup). le premier est l'objet qui recoit le drop (au dessous)
	{
		var i=-1;						
		var j=-1;
		var k=-1;
		var trouve1=false;
		var trouve2=false;
		while((k<this.PIList.length-1))		//on recherche les deux éléments dans le tableau : &&!(trouve1&&trouve2)
		{
			k++;
			console.log(k);
		trouve1=(dojo.attr(this.PIList[k].node,"id")==PI1);
		trouve2=(dojo.attr(this.PIList[k].node,"id")==PI2);
		
			if(trouve1)
			{
				i=k;
			}
			if(trouve2)
			{
				j=k;
			}
		}
		if(this.PIList[i].isPostIt)		//l'element du dessous est un postItSimple : on crée un groupePostIt à la place, et on y ajoute l'objet droppe
		{
			

			this.PIList[i]=this.PIList[i].promote();
			
			console.log(this.PIList[j]);
			while(this.PIList[j].node.children.length>0)
			{	console.log(this.PIList[j].node.children[0]);
				this.PIList[i].addNode(this.PIList[j].node.children[0]);
			}
			
			dojo.destroy(this.PIList[j].node);
			this.PIList[j].supprimer();
			
			this.PIList.splice(j,1);
		}
		else					//l'element du dessous est un postItGroup
		{
			
			while(this.PIList[j].node.children.length!=0)
			{
				this.PIList[i].addNode(this.PIList[j].node.children[0]);
			}
			
			dojo.destroy(this.PIList[j].node);
			this.PIList[j].supprimer();
		
			this.PIList.splice(j,1);
		}
	},
	
	wrapAndRegisterPI:function(fragment)		//transforme un postItGroupFragment emancipé en post-it complet : rajout d'un wrapper et création d'un post-it
	{	
		var innerNode=fragment.node;
		var nodePosition=dojo.position(fragment.node);
		dojo.addClass(innerNode,"contenuPI");
		var containerPosition=dojo.position(this.PISpawnZone);
		fragment.disable();		//on coupe le comportement normal du fragment.
		var container= dojo.create('div',{
			id: 'PI'+this.PICount}, this.PISpawnZone);
		dojo.style(container,{ position:"absolute", top:nodePosition.y-containerPosition.y+"px",left:nodePosition.x-containerPosition.x+"px"});
		dojo.place(innerNode,container,"first");
		
		PI= ether.postIt(container,{},this,innerNode.tagName!="IMG");	//on transforme notre noeud en post-it
					this.PICount++;
					this.PIList.push(PI);
		
		
	},
	
	createPI: function(objet)		//creation de postIt à partir d'un JSON renvoyé par l'éditeur
	{
	var innerNode = dojo.create("div",{class:"contenuPI", innerHTML:objet.texte,style:{backgroundColor: objet.couleur, width: objet.largeur+"px", height: objet.hauteur+"px", position:"absolute"}});
	
	var node=dojo.create("div",{id:"PI"+this.PICount}, this.PISpawnZone);	//on crée un noeud de texte (avec l'id qui va bien PI0,PI1, etc...)
					dojo.style(node,{		//en particulier, on précise la position ici
					position:"absolute",
					left: objet.left - dojo.position(dojo.byId("applicationCenter")).x + "px",
					top: objet.top  - dojo.position(dojo.byId("applicationCenter")).y + "px",
					zIndex:10
			

									});
	dojo.place(innerNode,node,"first");
	PI= ether.postIt("PI"+this.PICount,{},this);	//on transforme notre noeud en post-it
				this.PICount++;
				this.PIList.push(PI);
	},
	
	sendPI: function(postIt, cles_destinataires) {
	//à faire = changer la structure de "message"
		if(postIt.isPostIt) {
			var msg_id = Math.floor(Math.random()*1000001);
			var m = new msg(msg_id, postIt.getContent());
			socket.emit('envoi', m, cles_destinataires);
			if(SUPPRESSION_POSTIT)
			{
				ether.manager.deletePI(dojo.attr(postIt.node,"id"));
			}
		}
	}
}
//**************


































	/* ------------------------------------------------------------
	   --  on initialise les varibles globales de l'application  --	
	   ------------------------------------------------------------ */

	//la taille maximale autorisée pour l'upload de photos : ici 1Mo
	var tailleMaxUpload = 1000000;
	
	//les clés des "participants globaux"
	var TOUS = -1,
		ANIMATEURS = -2,
		NON_ANIMATEURS = -3;
	
	//le tableau qui liste l'ensemble des participants connectés à ETHER
	ether.manager.participants[TOUS] = new participant('tous', '', undefined, undefined);
	ether.manager.participants[ANIMATEURS] = new participant('animateurs', '', true, undefined);
	ether.manager.participants[NON_ANIMATEURS] = new participant('non animateurs', '', false, undefined);
	
	//ma clé (inconnue pour l'instant) et le participant (vide pour l'instant) qui me représente
	var maCle = undefined;
	var moi = new participant('', '', false, 0);
	
	//la date (inconnue pour l'instant) d'une éventuelle sauvegarde de session en local
	var DATE_SAUVEGARDE = undefined;
	
	//le paramètre d'affichage des pop-up
	var POPUP = true;
	
	//le paramètre d'envoi des post-it : "copier" ou "deplacer"
	var SUPPRESSION_POSTIT = false;
	
	
	
	/* ----------------------------------------------------------
	   --  on définit les fonctions globales de l'application  --	
	   ---------------------------------------------------------- */
	   
	//cette fonction permet d'instancier un objet javascript "participant"
	function participant(prenom, nom, estAnimateur, socketID) {
		this.prenom = prenom;
		this.nom = nom;
		this.estAnimateur = estAnimateur;
		this.socketID = socketID;
	}

	//cette fonction permet d'instancier un objet javascript "message"
	function msg(type, id, contenu) {
		this.type = type;
		this.id = id;
		this.contenu = contenu;
	}
	
	//cette fonction effectue une transition entre le div "anciennePage" (qu'elle masque progressivement) et le div "nouvellePage" (qu'elle affiche à l'écran)
	function changementPage(anciennePage, nouvellePage) {
		dojo.fadeOut({
			node: anciennePage,
			duration: 1000,
			beforeBegin: function() {
				dojo.setStyle(dojo.byId(nouvellePage), { display: "", opacity: "0", filter: "alpha(opacity=0)" });
			},
			onEnd: function() {
				dojo.setStyle(dojo.byId(anciennePage), { display: "none" } );
				dojo.fadeIn({ node: nouvellePage, duration: 1000 }).play();
			}
		}).play();
	}
	
	//cette fonction actualise la liste des participants du widget FilteringSelect, et masque/affiche les dropzones globales
	function majParticipants() {
		var contientAnimateurs = false;
		var contientNonAnimateurs = false;
		var contientParticipants = false;
		var itemsParticipants = new Array();
		for(var i=0; i<ether.manager.participants.length; i++) {
			if(i!=maCle && ether.manager.participants[i]!=null) {
				contientParticipants = true;
				if(ether.manager.participants[i].estAnimateur)
					contientAnimateurs = true;
				else
					contientNonAnimateurs = true;
				itemsParticipants.push({ value: ''+i, name: ether.manager.participants[i].prenom+' '+ether.manager.participants[i].nom });
			}
		}
		if(contientParticipants) {
			dijit.byId("menuParametresATous").disabled = false;
			dijit.byId("menuParametresATous")._applyAttributes();
			if(dijit.byId("menuParametresATous").checked) {
				domStyle.set(dojo.byId('envoiATous'), "display", "block");
			}
		} else {
			domStyle.set(dojo.byId('envoiATous'), "display", "none");
			dijit.byId("menuParametresATous").disabled = true;
			dijit.byId("menuParametresATous")._applyAttributes();
		}
		if(moi.estAnimateur) {
			if(contientNonAnimateurs) {
				dijit.byId("menuParametresAuxNonAnimateurs").disabled = false;
				dijit.byId("menuParametresAuxNonAnimateurs")._applyAttributes();
				if(dijit.byId("menuParametresAuxNonAnimateurs").checked) {
					domStyle.set(dojo.byId('envoiAuxNonAnimateurs'), "display", "block");
				}
			} else {
				domStyle.set(dojo.byId('envoiAuxNonAnimateurs'), "display", "none");
				dijit.byId("menuParametresAuxNonAnimateurs").disabled = true;
				dijit.byId("menuParametresAuxNonAnimateurs")._applyAttributes();
			}
		} else {
			if(contientAnimateurs) {
				dijit.byId("menuParametresAuxAnimateurs").disabled = false;
				dijit.byId("menuParametresAuxAnimateurs")._applyAttributes();
				if(dijit.byId("menuParametresAuxAnimateurs").checked) {
					domStyle.set(dojo.byId('envoiAuxAnimateurs'), "display", "block");
				}
			} else {
				domStyle.set(dojo.byId('envoiAuxAnimateurs'), "display", "none");
				dijit.byId("menuParametresAuxAnimateurs").disabled = true;
				dijit.byId("menuParametresAuxAnimateurs")._applyAttributes();
			}
		}
		listeParticipants.clearOnClose = true;
		listeParticipants.data = { identifier: 'value', label: 'name', items: itemsParticipants };
		listeParticipants.close();
	}
	
	//cette fonction permet de créer des post-it et de les ajouter à l'application
	function ajouterMessage(message, id_emetteur) {
		//à remplacer par la fonction de David
	}
	
	//cette fonction prend en charge le "drag" d'objets depuis le bureau vers le navigateur
	function handleDragOver(evt) {
		if(evt.preventDefault) evt.preventDefault();
		if(evt.stopPropagation) evt.stopPropagation();
		//on précise ici qu'on veux "copier" l'objet dans le navigateur
		evt.dataTransfer.dropEffect = 'copy';
		return false;
	}
	
	//cette fonction prend en charge le "drop" d'objets depuis le bureau vers le navigateur
	function handleFileSelect(evt) {
		if(evt.preventDefault) evt.preventDefault();
		if(evt.stopPropagation) evt.stopPropagation();
		//une fois le(s) objet(s) lachés dans le navigateur, on regarde si il s'agit de fichier
		if(evt.dataTransfer.files) {
			//si c'est le cas, on les upload
			handleUploadFiles(evt.dataTransfer.files);
		}
		//une fois le(s) objet(s) lachés dans le navigateur, on regarde si il s'agit simplement d'un bout de texte
		if(evt.dataTransfer.types) {
			var types = evt.dataTransfer.types;
			//si c'est le cas, on crée les crée des post-its avec le texte dedans
			for(var i=0; i<types.length; i++) {
				if(evt.dataTransfer.types[i]=='text/plain') {
					//à compléter avec la fonction de david : il faut ici créer un post it avec le contenu : evt.dataTransfer.getData('text/plain')
				}
			}
		}
		return false;
	}
	
	function handleUploadFiles(files) {
		//pour chaque photo sélectionnées, on lui attribut un FileReader
		for (var i = 0; i < files.length; i++) {
			var reader = new FileReader();
			var nomUpload = files[i].name;
			var tailleUpload = files[i].size;
			//lorsque le FileReader commence à lire le fichier, on l'affiche dans une pop-up à l'écran
			reader.onloadstart = function() {
				if(POPUP)
					dijit.showTooltip('Lecture du fichier ' + nomUpload, 'uploadPhotos', ['below']);
			};
			//lorsque le FileReader a fini de lire le fichier, on l'affiche dans une pop-up à l'écran
			reader.onloadend = function() {
				if(POPUP)
					dijit.showTooltip('<img src="images/upload.gif" /> Upload du fichier...', 'uploadPhotos', ['below']);
			};
			//si une erreur s'est produite lors de la lecture, on l'affiche dans une pop-up à l'écran
			reader.onerror = function() {
				if(POPUP)
					dijit.showTooltip('Erreur lors de la lecture du fichier ' + nomUpload, 'uploadPhotos', ['below']);
			};
			//si la lecture du fichier s'est correctement réalisée, on envoie le fichier encodé au serveur
			reader.onload = function(d) {
				if(POPUP)
					dijit.showTooltip('Lecture de ' + nomUpload + 'réussie', 'uploadPhotos', ['below']);
				socket.emit('upload', nomUpload, d.target.result);
			};
			//si la taille du fichier est inférieure à la taille max, on démarre la lecture
			if(files[i].size < tailleMaxUpload) {
				reader.readAsDataURL(files[i]);
			//sinon on affiche une pop-up (pendant 2 secondes) pour prévenir l'utilisateur qu'il y a une taille max à ne pas dépasser
			} else {
				if(POPUP) {
					dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader le fichier ' + nomUpload + ' qui est trop volumineux (taille maximale acceptée : 1Mo)', 'uploadPhotos', ['below']);
					setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
				}
			}
		}
	}
	
	
	
	/* --------------------------------------------------------------------------------
	   --  on exécute les fonctions nécessaires à l'initialisation de l'application  --	
	   -------------------------------------------------------------------------------- */
	   
	//on se connecte de manière asynchrone au serveur (à l'aide de socket.io)
	var socket = io.connect(location.href);
	
	//on parse le HTML de la page afin de transformer toutes les balises HTML en widget Dijit
	parser.parse();
	
	//on ajoute notre super editeur de post-it au menu "Taper un texte" pour permettre à l'utilisateur d'écrire des post-its
	var editeurPI = new ether.editeur(dojo.byId("menuEcrirePostit"));
	
	//on affiche les couleurs par défaut de l'éditeur dans le menu "Paramètres / Couleurs des post-it"
	query(".couleur1").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", editeurPI.statics.couleur1); });
	query(".couleur2").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", editeurPI.statics.couleur2); });
	query(".couleur3").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", editeurPI.statics.couleur3); });
	query(".couleur4").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", editeurPI.statics.couleur4); });
	query(".couleur5").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", editeurPI.statics.couleur5); });
	
	//on ajoute les palettes de couleur pour pouvoir changer les couleurs de l'éditeur de post-it
	new dijit.ColorPalette({id: "palette1", onChange: function(color){ editeurPI.statics.couleur1 = color; query(".couleur1").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", color); }); } }, dojo.byId("palette1"));
	new dijit.ColorPalette({id: "palette2", onChange: function(color){ editeurPI.statics.couleur2 = color; query(".couleur2").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", color); }); } }, dojo.byId("palette2"));
	new dijit.ColorPalette({id: "palette3", onChange: function(color){ editeurPI.statics.couleur3 = color; query(".couleur3").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", color); }); } }, dojo.byId("palette3"));
	new dijit.ColorPalette({id: "palette4", onChange: function(color){ editeurPI.statics.couleur4 = color; query(".couleur4").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", color); }); } }, dojo.byId("palette4"));
	new dijit.ColorPalette({id: "palette5", onChange: function(color){ editeurPI.statics.couleur5 = color; query(".couleur5").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", color); }); } }, dojo.byId("palette5"));
	
	//et enfin on quitte la page "chargement" pour afficher à l'écran la page de connexion à ETHER
	changementPage("chargement", "connexion");
	
	//petit + : si le navigateur utilisé est Internet Explorer, on dit à l'utilisateur que c'est de la merde
	if(has("ie")) {
		dojo.byId("versionIE").innerHTML = ' '+has("ie");
		setTimeout("dijit.byId('alerteIE').show()", 1000);
	}
	
	//on teste la compatibilité du navigateur avec l'API localStorage pour savoir si on doit enlever (ou pas) le menu "chargement" et "sauvegarde"
	if(typeof(localStorage) == 'undefined' ) {
		dijit.byId('menuChargement').destroyRendering();
		dijit.byId('menuSauvegarde').destroyRendering();
		dijit.byId('menuSeparateur').destroyRendering();
	} else {
		if(localStorage.getItem('sauvegardeETHER')) {
			dijit.byId("menuChargement").disabled = false;
			dijit.byId("menuChargement")._applyAttributes();
			DATE_SAUVEGARDE = new Date(localStorage.getItem('sauvegardeETHER'));
		}
	}
	
	//on teste l'incompatibilité du navigateur avec le drag and drop de HTML5
	if(has('ie') || !('ondrop' in dojo.byId("application")))
		hide('infoDND');

	
	
	/* ------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur la page de connexion  --	
	   ------------------------------------------------------------------------------------------------ */
	   
	//lorsque l'utilisateur sélectionne "animateur", on lui affiche le champ "mot de passe"
	on(dijit.byId("animateur"), "click", function(event) {
		dojo.setStyle(dojo.byId("champMotDePasse"), { display: "" });
	});

	//lorsque l'utilisateur sélectionne "participant", on lui masque le champ "mot de passe"
	on(dijit.byId("participant"), "click", function(event) {
		dojo.setStyle(dojo.byId("champMotDePasse"), { display: "none" });
	});
	
	//lors de la validation du formulaire, on vérifie que le champ "motDePasse" a bien été rempli si le participant est un administrateur
	dijit.byId("motDePasse").validator = function() {
		return (dijit.byId("participant").get("value") || dijit.byId("motDePasse").get("value")!="");
	}
	
	//lors du click sur le "boutonConnexion" :
	on(dijit.byId("boutonConnexion"), "click", function(event) {
		//on vérifie que la connexion via socket.io est active
		if(socket && socket.socket.connected) {	
			if(event.type=="click" || (event.type=="keyup" && event.keyCode==dojo.keys.ENTER)) {
				//on vérifie que le formulaire est correctement rempli
				if(dijit.byId("formulaireConnexion").validate()) {
					//on récupère les informations entrées dans le formulaire
					var valeursEntrees = dijit.byId('formulaireConnexion').get('value');
					//on transforme le string estAnimateur en boolean pour satisfaire aux spécifications
					var estAnimateur = false;
					if(valeursEntrees.estAnimateur=="true")
						estAnimateur = true;
					//on met à jour le participant "moi"
					moi = new participant(valeursEntrees.prenom, valeursEntrees.nom, estAnimateur, 0);
					//on envoie une requête d'identification au serveur
					socket.emit('identification', moi, valeursEntrees.motDePasse);
				}
			}
		} else {
			dijit.byId('alerteConnexion').show();
		}
	});
	
	//si l'identification a échouée, on affiche à l'écran la cause de l'échec dans une pop-up
	socket.on('identification echouee', function(msgErreur) {
		switch(msgErreur){
			case 'faux mdpEntre':
				dijit.byId("motDePasse").focus();
				dijit.byId("motDePasse").displayMessage("Le mot de passe entré est incorrect");
				break;
				
			case 'prenom':
				dijit.byId("prenom").validate();
				dijit.byId("prenom").focus();
				dijit.byId("prenom").displayMessage("Ce champ est obligatoire");
				break;
			  
			case 'nom':
				dijit.byId("nom").validate();
				dijit.byId("nom").focus();
				dijit.byId("nom").displayMessage("Ce champ est obligatoire");
				break;
			  
			case 'mdpEntre':
				dijit.byId("motDePasse").validate();
				dijit.byId("motDePasse").focus();
				dijit.byId("motDePasse").displayMessage("Le mot de passe est obligatoire pour les animateurs");
				break;
			  
			case 'login deja pris':
				dijit.byId("prenom").focus();
				dijit.byId("prenom").displayMessage("\""+dijit.byId("prenom").get("value")+" "+dijit.byId("nom").get("value")+"\" est déjà connecté(e) à Ether");
				break;
		}
	});
	
	//si l'identification a réussi :
	socket.on('identification reussie', function(liste_participants, key){
		//on affiche le nom du participant dans le menu "ETHER" de l'application et on enlève du menu "Paramètres / Affichage" l'option qui ne lui correspond pas
		if(moi.estAnimateur) {
			dojo.byId("moi").innerHTML = moi.prenom+" "+moi.nom+"<br />(animateur)";
			dijit.byId('menuParametresAuxAnimateurs').destroyRendering();
		} else {
			dojo.byId("moi").innerHTML = moi.prenom+" "+moi.nom;
			dijit.byId('menuParametresAuxNonAnimateurs').destroyRendering();
		}
		//on met à jour sa clé
		maCle = key;
		//on met à jour la liste des participants (la variable javascript)
		ether.manager.participants = liste_participants;
		//on met à jour la liste des participants (le widget FilteringSelect)
		majParticipants();
		//on initialise le manager de post-it
		ether.manager.initialize(dojo.byId("applicationCenter"),dojo.byId("DZRow"));
		//on masque le formulaire de connexion pour afficher l'application à l'écran
		changementPage("connexion", "application");
		//on effectue un "resize" pour être sûr qu'elle prenne bien toute la page
		dijit.byId("application").resize();
		//et on prévoit d'effacer le message d'accueil
		setTimeout("dojo.fadeOut({ node: 'divBienvenue', duration: 1000, onEnd: function() { dojo.destroy('divBienvenue'); } }).play()", 6000);
		//petit + : si une sauvegarde existe, on en informe le participant (avec la date de la sauvegarde)
		if(DATE_SAUVEGARDE!=undefined && POPUP) {
			var message = 'Une sauvegarde datant du '+DATE_SAUVEGARDE.toLocaleDateString()+' (à '+DATE_SAUVEGARDE.toLocaleTimeString()+') a été identifée.<br />Vous pouvez la charger depuis le menu \"ETHER\" si vous le souhaitez.';
			setTimeout("dijit.showTooltip('"+message+"', 'menuETHER', ['below'])", 2500);
			setTimeout("dijit.hideTooltip('menuETHER')", 6500);
		}
	});
	
	
	
	/* ----------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "ETHER" de la barre de menu  --	
	   ---------------------------------------------------------------------------------------------------------------- */
	
	//lors du click sur "chargement", on va charger depuis le localStorage tous les post-it sauvegardés et les afficher à l'écran
	dijit.byId("menuChargement").onClick = function() {
	  // on commence par récupérer les identifiants du participant
	  var p = localStorage.getItem('id').split('|');
	  // on met à jour notre client
	  moi.prenom = p[0];
		moi.nom = p[1];
		moi.estAnimateur = p[2];
		dojo.byId("moi").innerHTML = moi.prenom+" "+moi.nom+((moi.estAnimateur) ? "<br />(animateur)" : '');
		// on indique aux autres clients de se mettre à jour
		socket.emit('changement id', moi);
	  // on va recréer les post its enregistrés et les ajouter dans la PIList
	  // on commence par vider la PIList actuelle
	  ether.manager.PIList.splice(0, ether.manager.PIList.length);
	  ether.manager.PICount = 0;
	  // on ajoute les pi/groupes pi à la volée
	  var PIlength = 0;
	  var PIIMGlength = 0;
	  var content = null;
	  var urls = null;
	  var img = null;
	  var imgsUniques = new Array();
	  var isUnique = true;
	  var cpt = 0;
	  var id = 0;
	  // on commence par calculer le nombre de pi/groupes pi
	  while(localStorage.getItem('PI' + PIlength) !== null){
	    PIlength++;
	  }
	  // on ajoute les pi/groupes pi du plus ancien enregistré au plus récent
	  for(var i = PIlength - 1 ; i >= 0 ; i--){
	    // on récupère le string
	    content = localStorage.getItem('PI' + i);
	    // on le transforme en JSON
	    content = JSON.parse(content);
	    // on recrée le post-it
	    ether.manager.receptionPostIt(content);
	    // on calcule le nombre d'images associées à notre pi/goupe pi
	    while(localStorage.getItem('PI' + i + 'IMG' + PIIMGlength)){
	      PIIMGlength++;
	    }
	    // on decode/enregistre les images et on remplace les anciennes urls de notre pi/groupe pi par les nouvelles
	    for(var j = 0 ; j < PIIMGlength ; j++){
	      // si le contenu de l'image est stocké ailleurs on va chercher cette valeur
	      if(localStorage.getItem('PI' + i + 'IMG' + j).split('|').length < 2){
	        img = localStorage.getItem(localStorage.getItem('PI' + i + 'IMG' + j));
	      }
	      else{
	        img = localStorage.getItem('PI' + i + 'IMG' + j);
	      }
	      // on vérifie si l'image courante est déjà décodée/enregistrée
	      cpt = 0;
	      isUnique = true;
	      while(cpt < imgsUniques.length && isUnique == true){
		      // imgsUniques[0] -> id dans localStorage ; imgsUniques[1] -> img
		      if(img == imgsUniques[cpt][1]){
		        isUnique = false;
		      }
		      else{
		        cpt++;
		      }
		    }
		    // si l'image n'a pas encore été décodée/enregistrée
		    if(isUnique){
		      imgsUniques.push(new Array(img));
		      socket.emit('data decode request', i, j, imgsUniques.length - 1, img.split('|'));
		    }
		    else{
		      urls = (dojo.query("img", ether.manager.PIList[i])).attr("src");
		      url = urls[j];
	        url.innerHTML = imgsUniques[cpt][1];
		    }
	    }
	  }
	  // lorsqu'une image a été décodée/enregistrée
	  socket.on('data decode response', function(i, j, cleUnique, chemin){
	    var urls = (dojo.query("img", ether.manager.PIList[i])).attr("src");
	    var url = urls[j];
	    url.innerHTML = chemin;
	    imgsUniques[cleUnique].push(chemin);
	  });
	};
	
	//lors du click sur "sauvegarde", on va stocker dans le localStorage tous les post-it présents à l'écran
	dijit.byId("menuSauvegarde").onClick = function() {
		// on commence par vider la base de données
		localStorage.clear();
		var d = new Date();
		localStorage.setItem('sauvegardeETHER', d.toString());
		// on enregistre l'identité de l'utilisateur
		var p = new Array(moi.prenom, moi.nom, moi.estAnimateur);
		// on utilise un try/catch au cas où on aurait plus de place
		try {
			localStorage.setItem('id', p.join('|'));
		} catch(e) {
			if(e == QUOTA_EXCEEDED_ERR) {
				alert("Impossible d'enregistrer la session car l'espace de sauvegarde est plein.");
			}
			console.log('erreur lors de l\'enregistrement de l\'ID');
		}
		// on va enregistrer les pi/groupes pi à la volée
		var content = null;
		var urls = new Array();
		var urlsUniques = new Array();
		var isUnique = true;
		var cpt = 0;
		var imgContenu = null;
		// on parcoure le tableau à l'envers pour sauver d'abord les pi/groupes pi les plus récents
		var reversePIList = ether.manager.PIList.reverse();
		dojo.forEach(reversePIList, function(pi, i){
		  // contenu du pi/groupe pi sous forme de JSON
		  content = pi.getContent();
		  // on transforme le JSON en string
		  content = JSON.stringify(content);
		  // on utilise un try/catch au cas où on aurait plus de place
		  try{
		    // on essaie d'enregistrer le pi/groupe pi
		    localStorage.setItem('PI' + i, content);
		    console.log('enregistrement du pi/groupe pi ' + i);
		  } catch(e) {
		    // si on a plus de place on informe l'utilisateur
			  if (e == QUOTA_EXCEEDED_ERR){
					alert(
					  'L\'espace de sauvegarde est plein. ' +
					  'Vos ' + (i + 1) + ' post-its les plus récents ont toutefois été enregistrés'
					);
				}
				console.log('erreur lors de l\'enregistrement du post-it ' + i);
		  }
		  // on stocke maintenant les images associés à ce pi/groupe pi
		  // on commence par récupérer les url
		  dojo.forEach(dojo.query("img", pi.node), function(image, index){
		    urls.push(dojo.attr(image, "src"));
		  });
		  console.log(urls);
		  dojo.forEach(urls, function(url, j){
		    // on vérifie si l'url courante a déjà été décodée/enregistrée
		    cpt = 0;
		    isUnique = true;
		    while(cpt < urlsUniques.length && isUnique == true){
		      // urlsUniques[0] -> id dans localStorage ; urlsUniques[1] -> url
		      if(url == urlsUniques[cpt][1]){
		        isUnique = false;
		      }
		      else{
		        cpt++;
		      }
		    }
		    // si l'url courante n'a pas encore été décodée / enregistrée
		    if(isUnique){
		      socket.emit('data encode request', url);
          socket.on('data encode response', function(data, ext){
            // on construit un tableau contenant l'image et l'extension
            imgContenu = new Array(data, ext);
            // on le transforme en string
            imgContenu = imgContenu.join('|');
            // on utilise un try/catch au cas où on aurait plus de place
            try{
              // on enregistre l'image avec une clé référençant le pi/groupe pi auquel appartient l'image
              localStorage.setItem('PI' + i + 'IMG' + j, imgContenu);
              console.log('image ' + j + ' du pi/groupe pi ' + i + ' enregistrée');
            }
            catch(e){
              if (e == QUOTA_EXCEEDED_ERR){
                alert(
					        'L\'espace de sauvegarde est plein. ' +
					        'Vos ' + (i + 1) + ' post-its les plus récents ont toutefois été enregistrés'
					      );
              }
              console.log('impossible d\'enregistrer l\'image ' + j + ' du pi/groupe pi ' + i);
            }
            // on rajoute l'url à la liste urlsUniques
            // urlsUniques[0] -> id dans localStorage ; urlsUniques[1] -> url
            urlsUniques.push(new Array('PI' + i + 'IMG' + j, url));
          });
        }
        else{
          // on utilise un try/catch au cas où on aurait plus de place
          try{
            // on enregistre une référence vers une autre entrée qui a la même image
            localStorage.setItem('PI' + i + 'IMG' + j, urlsUniques[cpt][0]);
            console.log('image ' + j + ' du pi/groupe pi ' + i + ' enregistrée');
          }
          catch(e){
            if (e == QUOTA_EXCEEDED_ERR){
              alert(
					      'L\'espace de sauvegarde est plein. ' +
					      'Vos ' + (i + 1) + ' post-its les plus récents ont toutefois été enregistrés'
					    );
            }
            console.log('impossible d\'enregistrer l\'image ' + j + ' du pi/groupe pi ' + i);
          }
        }
		  });
		});
	};
	
	//lors du click sur "déconnexion" :
	dijit.byId("menuDeconnexion").onClick = function() {
		//on demande confirmation
		if(confirm("Etes-vous sûr de vouloir vous déconnecter ?\n(Attention : toutes les données non sauvegardées seront perdues)")) {
			//on coupe la connexion avec le serveur (ça permet au serveur de prévenir tous les autres participants que l'on s'est déconnecté)
			socket.disconnect();
			//on masque l'application et on affiche la page de chargement initiale
			changementPage("application", "chargement");
			//après 2 secondes (le temps d'afficher complétement la page de chargement), on actualise la page pour réinitialiser complétement ETHER
			setTimeout("location.reload()", 2000);
		}
	}
	
	//lors que l'on ferme le navigateur, on prévient le serveur de notre déconnexion (pour pouvoir le signaler à tous les autres participants)
	unload.addOnUnload(window, function(){ socket.disconnect(); });
	
	
	
	/* -------------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Taper un texte" de la barre de menu  --	
	   ------------------------------------------------------------------------------------------------------------------------- */
	
		//on surchage la fonction "OK" de l'éditeur de post-it présent dans le menu
		dijit.byId("editeurOK_0").onClick = function() { 
			var textarea = dojo.byId("editeurTextarea_0");
			var texte = domAttr.get(textarea, 'value');
			if(texte!='') {
				var postitJSON = { texte: texte, couleur: domStyle.get(textarea, 'backgroundColor'), top: domGeom.position(textarea).y, left: domGeom.position(textarea).x, hauteur: domGeom.position(textarea).h, largeur: domGeom.position(textarea).w };
				ether.manager.createPI(postitJSON);
				domAttr.set(textarea, 'value', '');
				domStyle.set(textarea, 'backgroundColor', 'white');
				dijit.byId("menuTaperTexte")._onClick({ type:"custom", preventDefault:function(){}, stopPropagation:function(){} });
			}
		};
		
		//on surchage la fonction "Annuler" de l'éditeur de post-it présent dans le menu pour qu'on ne puisse pas le détruire
		dijit.byId("editeurAnnuler_0").onClick = function() { 
			domAttr.set(dojo.byId("editeurTextarea_0"),"value","");
			domStyle.set(dojo.byId("editeurTextarea_0"),"backgroundColor","white");
			dijit.byId("menuTaperTexte")._onClick({ type:"custom", preventDefault:function(){}, stopPropagation:function(){} });
		};
	
	
	
	/* -----------------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Uploader une photo" de la barre de menu  --	
	   ----------------------------------------------------------------------------------------------------------------------------- */
	
	//lorsqu'une (ou plusieurs) photos sont sélectionnées dans la fenêtre d'upload, on essaie de les encoder avec le FileReader et de les envoyer au serveur
	dijit.byId("uploadPhotos").onChange = function() {
		//on vérifie la compatibilité du navigateur avec l'upload multiple (en gros on élimine Internet Explorer)
		if(dijit.byId("uploadPhotos")._files) {
			handleUploadFiles(dijit.byId("uploadPhotos")._files);
		} else {
			if(POPUP) {
				dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader des photos car votre navigateur n\'est pas compatible', 'uploadPhotos', ['below']);
				setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
			}
		}
	};
	
	//si l'upload a échoué (parce que le fichier n'était pas une photo), on affiche une pop-up (pendant 2 secondes) pour en informer le participant
	socket.on('upload echoue', function() {
		if(POPUP) {
			dijit.showTooltip('<img src="images/erreur.png" /> Echec de l\'upload : le fichier n\'est pas une image ! (les extensions acceptées sont .png, .jpg et .gif)', 'uploadPhotos', ['below']);
			setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
		}
	});	
	
	//si l'upload a réussi, on ajoute la photo (dans un post-it) à l'application et on affiche (pendant 2 secondes) une pop-up de confirmation
	socket.on('upload reussi', function(nom, chemin) {
		if(POPUP) {
			dijit.showTooltip('<img src="images/ok.png" /> Upload de l\'image réussi !', 'uploadPhotos', ['below']);
			setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
		}
		ether.manager.createImagePostIt(chemin, nom);
	});
	
	
	
	/* ---------------------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Ajouter un participant" de la barre de menu  --	
	   --------------------------------------------------------------------------------------------------------------------------------- */
	
	//lors de la sélection d'un participant dans le FilteringSelect, on crée la dropzone qui lui correspond et on l'ajoute à l'application
	dijit.byId("selectionParticipants").onChange = function(value) {
		if(value!='') {
			
			ether.manager.createDZ(value);
		}
	}
	
	
	
	/* ---------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Paramètres" de la barre de menu  --	
	   --------------------------------------------------------------------------------------------------------------------- */
	
	//lors du click sur "Afficher la corbeille" :
	dijit.byId("menuParametresCorbeille").onChange = function(checked) {
		var display = "block";
		if(!checked)
			display = "none";
		domStyle.set(dojo.byId("corbeille"), "display", display);
	}
	
	//lors du click sur "Afficher l'envoi à tous" :
	dijit.byId("menuParametresATous").onChange = function(checked) {
		var display = "block";
		if(!checked)
			display = "none";
		domStyle.set(dojo.byId("envoiATous"), "display", display);
	}
	
	//lors du click sur "Afficher l'envoi aux animateurs" :
	dijit.byId("menuParametresAuxAnimateurs").onChange = function(checked) {
		var display = "block";
		if(!checked)
			display = "none";
		domStyle.set(dojo.byId("envoiAuxAnimateurs"), "display", display);
	}
	
	//lors du click sur "Afficher l'envoi aux participants" :
	dijit.byId("menuParametresAuxNonAnimateurs").onChange = function(checked) {
		var display = "block";
		if(!checked)
			display = "none";
		domStyle.set(dojo.byId("envoiAuxNonAnimateurs"), "display", display);
	}
	
	//lors du click sur "Autoriser les pop-up d'information" :
	dijit.byId("menuParametresPopup").onChange = function(checked) {
		POPUP = checked;
	}
	
	//lors du click sur "Supprimer les post-it lors de l'envoi" :
	dijit.byId("menuParametresSuppressionPostit").onChange = function(checked) {
		SUPPRESSION_POSTIT = checked;
	}
	
	
	/* --------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui concernent les autres participants  --	
	   -------------------------------------------------------------------------------------------- */
	
	//lors de la connexion d'un nouveau participant, on l'ajoute à la variable javascript et au widget FilteringSelect
	socket.on('connexion nouveau participant', function(participant, key) {
		ether.manager.participants[key] = participant;
		majParticipants();
		if(POPUP) {
			dijit.showTooltip('Connexion de ' + ether.manager.participants[key].prenom + ' ' +ether.manager.participants[key].nom, 'selectionParticipants', ['below']);
			setTimeout("dijit.hideTooltip('selectionParticipants')", 2000);
		}
	});
	
	//lors de la déconnexion d'un nouveau participant, on le retire de la variable javascript et du widget FilteringSelect
	socket.on('deconnexion participant', function(key) {
		if(POPUP) {
			dijit.showTooltip('Déconnexion de ' + ether.manager.participants[key].prenom + ' ' + ether.manager.participants[key].nom, 'selectionParticipants', ['below']);
			setTimeout("dijit.hideTooltip('selectionParticipants')", 2000);
		}
		ether.manager.participants[key] = null;
		ether.manager.deleteParticipant(key);
		majParticipants();
	});
	
	
	
	/* ------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui concernent l'échange de messages  --	
	   ------------------------------------------------------------------------------------------ */
	
	//lorsqu'un envoi de post-it a été correctement reçu par le serveur, on confirme à l'expéditeur en faisant devenir verte la dropzone associée à l'envoi
	socket.on('envoi reussi', function(msg_ids_ok, cles_ok) {
	
	});
	
	//si par contre il y a une erreur de transmission, on le précise à l'expéditeur en faisant devenir rouge la dropzone associée à l'envoi
	socket.on('envoi echoue', function(msg_ids_echoues, cles_echoues) {
	
	});
	
	//lorsqu'un post-it est reçu, on le recrée, puis on l'affiche sur l'écran à côté de la dropzone de l'emmeteur
	socket.on('reception', function(message, cle_emmeteur) {
		receptionPostIt(message.contenu);
	});
	
	
	
	/* ----------------------------------------------------------------------
	   --  on prend en compte le "double-tap" pour la création de post-it  --	
	   ---------------------------------------------------------------------- */
	
	//lorsqu'on double tap dans le corps de l'application, on crée un éditeur de post-it qui va nous permettre d'écrire du texte
	on(dojo.byId("applicationCenter"), tap.doubletap, function(event) {
		new ether.editeur(dojo.byId("applicationCenter"), event.target.tapX, event.target.tapY);
	});
	
	
	
	/* ----------------------------------------------------------------------------------------
	   --  on prend en compte le drag and drop d'objets depuis le bureau vers le navigateur  --	
	   ---------------------------------------------------------------------------------------- */
	
	//on prend en compte le "drag" des objets depuis le bureau partout au-dessus de l'application
	dojo.byId("application").addEventListener('dragover', handleDragOver, false);
	//on prend en compte le "drop" des objets depuis le bureau partout au-dessus de l'application
	dojo.byId("application").addEventListener('drop', handleFileSelect, false);
});



/* -----------------------------------------------------------------------------------------------------------------
   --  on déclare en global deux variables indispensables à l'instanciation du module dijit.form.FilteringSelect  --	
   ----------------------------------------------------------------------------------------------------------------- */
   
var dataParticipants = { identifier:'value', label:'name', items: [] };
var listeParticipants = new dojo.data.ItemFileReadStore({ data: dataParticipants });
