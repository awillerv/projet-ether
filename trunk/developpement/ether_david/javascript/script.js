/* ---------------------------------------------------------------------------------------------------------------------------
   --  on charge toutes les bibliothèques de Dojo nécessaires à ETHER, puis on exécute le callback lorsque tout est chargé  --	
   --------------------------------------------------------------------------------------------------------------------------- */

require(["dojo/parser", "dojo/on", "dojox/validate/web", "dojo/dom-construct", "dojo/_base/unload", "dojo/_base/sniff",
"dijit/Dialog", "dijit/ProgressBar", "dijit/form/ValidationTextBox", "dijit/form/RadioButton", "dijit/form/Form", 
"dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu", "dijit/MenuItem", "ether/MenuItem","ether/tap","ether/PostIt","ether/Cible","ether/CibleEnvoi", "dijit/MenuSeparator", "dijit/PopupMenuItem", "dijit/CheckedMenuItem",
"dojox/form/Uploader","dojox/gesture/tap", "dijit/form/Textarea", "dijit/form/FilteringSelect", "dojo/data/ItemFileReadStore",
"dijit/layout/BorderContainer", "dijit/layout/ContentPane",
"dojo/keys", "dojo/domReady!"], function(parser, on, validate, domConstruct, unload, has) {

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
*/
////*******

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
	DZDefaultParentId :"applicationBottom",	
	PISpawnZone : "",
	DZCorbeille:null,
	DZTous:null,
	DZAnim:null,
	DZNonAnim:null,
	
	
	initialize:function(postItArea,DZDefaultArea)		//initialisation: on passe en argument l'id de la zone où l'on peut spawner les conteneurs.
	{	
		this.PISpawnZone=dojo.byId(postItArea);	
		this.DZDefaultParentId=DZDefaultArea;
		var AreaPosition=dojo.position(dojo.byId(this.PISpawnZone));
		var CorbeilleNode=dojo.create("div", {innerHTML:'<img src="images/corbeille.png"/><br/><span>Corbeille</span>', style : {position:"absolute",left:AreaPosition.x+'px',top:AreaPosition.y+'px',textAlign:"center"}},this.PISpawnZone);
		this.DZCorbeille=new ether.cible(CorbeilleNode);
		this.DZCorbeille.onDrop=function(objet)
			{
				if(objet.isPostIt)
				{
					ether.manager.deletePI(dojo.attr(objet.node,"id"));
				}
			}
		var TousNode=dojo.create("div", {innerHTML:'<img src="images/envoiATous.png"/><br/><span>Envoyer &agrave; tous</span>', style : {position:"absolute",left:(AreaPosition.x+AreaPosition.w/2-50)+'px',top:AreaPosition.y+'px',textAlign:"center"}},this.PISpawnZone);
		this.DZTous=new ether.cible(TousNode);
		this.DZTous.onDrop=function(objet)
			{
				if(objet.isPostIt)
				{
					//ici, le code pour envoyer à tout le monde (le contenu à envoyer est donné par "objet.getContent()"
				}
			}
		var AnimNode=dojo.create("div", {innerHTML:'<img src="images/envoiAuxAnimateurs.png"/><br/><span>Envoyer aux animateurs</span>', style : {position:"absolute",left:(AreaPosition.x+AreaPosition.w-100)+'px',top:AreaPosition.y+'px',textAlign:"center"}},this.PISpawnZone);
		this.DZAnim=new ether.cible(AnimNode);
		this.DZAnim.onDrop=function(objet)
			{
				if(objet.isPostIt)
				{
					//ici, le code pour envoyer aux animateurs
				}
			}
		
		var NonAnimNode=dojo.create("div", {innerHTML:'<img src="images/envoiAuxAnimateurs.png"/><br/><span>Envoyer aux animateurs</span>', style : {display:"none",position:"absolute",left:(AreaPosition.x+AreaPosition.w-100)+'px',top:AreaPosition.y+'px',textAlign:"center"}},this.PISpawnZone);
		this.DZNonAnim=new ether.cible(NonAnimNode);
		this.DZNonAnim.onDrop=function(objet)
			{
				if(objet instanceof ether.PostIt)
				{
					//ici, le code pour envoyer aux non animateurs
				}
			}
		
		//console.log(this.PISpawnZone);
		
		var i=0;
		while(i<=participants.length)		//initialisation de l'usermap pour les participants présents au départ
		{
		
			this.userMap[i]=new Array();
				i++;
		}
		dojo.connect(this.PISpawnZone,dojox.gesture.tap.doubletap,this, function(e)
		{	if(!this.EditionEnCours)
		{	this.EditionEnCours=true;
			var AreaPosition=dojo.position(dojo.byId(this.PISpawnZone));
			posX=e.target.tapX-AreaPosition.x;
			posY=e.target.tapY-AreaPosition.y;
			var ZoneSaisie=dojo.create("div",{innerHTML:'<textarea id="zonesaisie" data-dojo-type="dijit.form.Textarea"></textarea>'},postItArea);
			dojo.style(ZoneSaisie,{
			position:"absolute",
				left: posX + "px",
				top: posY + "px"
					});
		
			document.getElementById("zonesaisie").focus();	
			dojo.connect(ZoneSaisie, dojox.gesture.tap, function(e)		//pour éviter la fermeture de la textarea si je reclique dessus, on intercepte l'event 
			{
				e.stopPropagation();
			});
			
			dojo.connect(ZoneSaisie, dojox.gesture.tap.doubletap, function(e)	//idem
			{
				e.stopPropagation();
			});
			
		}});
		//ici, on définit ce qui se passe quand on tap sur la zone libre: on supprime la textarea pour créer à la place le post-it adapté
		dojo.connect(this.PISpawnZone,dojox.gesture.tap, this,function(e)
		{
			var textarea=dojo.byId("zonesaisie");		//il n'y en a jamais qu'une normalement
			//rien à faire si le noeud n'existe pas encore ou qu'il est vide de texte
			if(textarea)
			{
			if((dojo.attr(textarea,"value"))!="")
				{
					var pos=dojo.position(textarea);		
					var node=dojo.create("div",{id:"PI"+this.PICount,innerHTML:'<div style="overflow:hidden">'+ dojo.attr(textarea,"value") + '</div>'},postItArea);	//on crée un noeud de texte (avec l'id qui va bien PI0,PI1, etc...)
					dojo.style(node,{		//en particulier, on précise la position ici
					position:"absolute",
					left: pos.x + "px",
					top: pos.y + "px",
					border:"solid",
					borderWidth:"1px"
									});
				
					dojo.destroy(dojo.byId("zonesaisie"));		//on détruit la textarea maintenant qu'on a récupéré toutes les infos nécessaires
				
					PI= ether.postIt(node,null,this,true);	//on transforme notre noeud en post-it Le dernier argument précise que le post-it est EDITABLE
		
					this.PICount++;
					this.PIList.push(PI);
					this.EditionEnCours=false;
				}
			else
				{
					dojo.destroy(dojo.byId("zonesaisie"));	
					this.EditionEnCours=false;
				}
			}
			if(this.PIEdite)
			{
				this.PIEdite.stopEdit();
			}
		
		});
		
	},
	
	createImagePostIt: function(imgpath)
	{
		//recupération du centre
		marginBox=dojo.position(this.PISpawnZone);
		topx=(marginBox.x+marginBox.w)/2;
		topy=(marginBox.y+marginBox.h)/2;
		var node=dojo.create("div",{id:"PI"+this.PICount,innerHTML:'<img width:"100%; height:100%" src="'+ imgpath + '"/>'},this.PISpawnZone);
		dojo.style(node,{		//en particulier, on précise la position ici
				position:"absolute",
				left: topx+ "px",
				top: topy + "px",
				border:"solid",
				borderWidth:"1px"
					});
		PI= ether.postIt("PI"+this.PICount,{},this);	//on transforme notre noeud en post-it
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
			this.PIList[i].supprimer();
			this.PIList.splice(i-1,1);
		
	
	},
	createDZ:function (clientList)
	{	var clientArray;
		if(clientList instanceof Array)
		{
		clientArray=clientList;
		}
		else 
		{
		clientArray=[clientList];
		}
		var imagepath;
		var descText;
		var TooltipText = null;
		if(clientArray.length==1){imagepath='images/participant.png'; descText = participants[clientArray[0]].prenom+' '+participants[clientArray[0]].nom}
		else { var i=0;
				descText=participants[clientArray[i]].prenom+' '+participants[clientArray[i]].nom;
				i++;
				while (descText.length<=25&&i<=clientArray.length)
				{
					descText=descText +', '+participants[clientArray[i]].prenom+' '+participants[clientArray[i]].nom;
					i++;
				}
				if(i<clientArray.length)
				{
					descText=descText+',...';
					var j=0;
					TooltipText=participants[clientArray[j]].prenom+' '+participants[clientArray[j]].nom;
					j++;
					while(j<clientArray.length)
					{
					TooltipText=TooltipText +','+participants[clientArray[j]].prenom+' '+participants[clientArray[j]].nom;
					j++;
					}
				}
		if(clientArray.length==2)
		{imagepath='images/groupe2.png';}
		else{imagepath='images/groupe3.png';}}
		
		var node=dojo.create("div",{innerHTML:'<img src="'+imagepath+'"/>'+'<br/> <span>'+descText+'</span>', 
		class: "DropZone",id: 'DZ'+this.DZId, style:{float:"left",textAlign:"center",border:"solid", borderWidth:"1px",width:"100px"}}, dojo.byId(this.DZDefaultParentId));
		if(TooltipText)
		{
		//new Tooltip({connectId:['DZ'+this.DZId], label : TooltipText}); voir comment faire marcher dijit.tooltip
		}
		var DZ=new ether.cibleEnvoi(node, clientArray);
		var k=0;
		
		while(k<clientArray.length)
		{
		if(this.userMap[clientArray[k]])
		{
		this.userMap[clientArray[k]].push(this.DZId);
		}
		else
		{
		this.userMap[clientArray[k]]=new Array(this.DZId);
		}
		k++;
		}
		
		this.DZList[this.DZId]=DZ;
		this.DZId++;
	},
	
	deleteDZ:function(id) //suppression de la DZ n°X. id est de la forme "DZn" à priori
	{	
	//vérification : est-ce bien une DZ existante
	node=dojo.byId(id);
	if(dojo.hasClass(node, "DropZone"))
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
				this.deleteDZ(dojo.attr(this.DZList[this.userMap[idParticipant][j]].node,"id"));
			}
			else
			{
			var clientArray= this.DZList[this.userMap[idParticipant][j]].clientKeyList;
			
			var imagepath;
			var descText;
			var TooltipText = null;
			if(clientArray.length==1){imagepath='images/participant.png'; descText = participants[clientArray[0]].prenom+' '+participants[clientArray[0]].nom}
			else { var i=0;
				descText=participants[clientArray[i]].prenom+' '+participants[clientArray[i]].nom;
				i++;
				while (descText.length<=25&&i<=clientArray.length)
				{
					descText=descText +', '+participants[clientArray[i]].prenom+' '+participants[clientArray[i]].nom;
					i++;
				}
				if(i<clientArray.length)
				{
					descText=descText+',...';
					var k=0;
					TooltipText=participants[clientArray[k]].prenom+' '+participants[clientArray[k]].nom;
					k++;
					while(k<clientArray.length)
					{
					TooltipText=TooltipText +','+participants[clientArray[j]].prenom+' '+participants[clientArray[j]].nom;
					k++;
					}
				}
			if(clientArray.length==2)
			{imagepath='images/groupe2.png';}
			else{imagepath='images/groupe3.png';}}
			
			////
			
			dojo.attr(this.DZList[this.userMap[idParticipant][j]].node, "innerHTML",'<img src="'+imagepath+'"/>'+'<br/> <span>'+descText+'</span>');
			////
			}
			
			j++;
		}
		delete(this.userMap[idParticipant]);
		}
	},
		
		
		//**********************
	receptionPostIt:function(idEmetteur, objectString)		//creation de postIt à la réception. Problème du positionnement, il faudra regarder
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
					PI=ether.postIt(ProtoPI,{},this,ProtoPI.children[0].tagName!="IMG");	//on transforme notre noeud en post-it
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
		console.log(i);
		console.log(j);
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
	
	//***********
	createPI: function(objet)		//creation de postIt à partir d'un JSON renvoyé par l'éditeur
{
	var innerHTML = dojo.create("div",{class:"contenuPI", innerHTML:objet.texte,style:{backgroundColor: objet.couleur, width:objet.largeur,height:objet.hauteur,position:"absolute"}});
	
	var node=dojo.create("div",{id:"PI"+this.PICount,innerHTML:innerHTML },postItArea);	//on crée un noeud de texte (avec l'id qui va bien PI0,PI1, etc...)
					dojo.style(node,{		//en particulier, on précise la position ici
					position:"absolute",
					left: objet.left + "px",
					top: objet.top + "px",

									});
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
	var participants = new Array();
	participants[TOUS] = new participant('tous', '', undefined, undefined);
	participants[ANIMATEURS] = new participant('animateurs', '', true, undefined);
	participants[NON_ANIMATEURS] = new participant('non animateurs', '', false, undefined);
	
	//ma clé (inconnue pour l'instant) et le participant (vide pour l'instant) qui me représente
	var maCle = undefined;
	var moi = new participant('', '', false, 0);
	
	//la date (inconnue pour l'instant) d'une éventuelle sauvegarde de session en local
	var dateSauvegarde = undefined;
	
	
	
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

	//cette fonction permet d'afficher un noeud du DOM dont la propriété css display vaut "none"
	function show(id) {
		dojo.setStyle(dojo.byId(id), { display: "" });
	}

	//cette fonction permet de masquer un noeud du DOM
	function hide(id) {
		dojo.setStyle(dojo.byId(id), { display: "none" });
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
	
	//cette fonction actualise la liste des participants du widget FilteringSelect
	function majParticipants() {
		var itemsParticipants = new Array();
		for(var i=0; i<participants.length; i++) {
			if(i!=maCle && participants[i]!=null) {
				itemsParticipants.push({ value: 'participant_'+i, name: participants[i].prenom+' '+participants[i].nom });
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
	
	
	
	/* --------------------------------------------------------------------------------
	   --  on exécute les fonctions nécessaires à l'initialisation de l'application  --	
	   -------------------------------------------------------------------------------- */
	   
	//on se connecte de manière asynchrone au serveur (à l'aide de socket.io)
	var socket = io.connect(location.href);
	
	//on parse le HTML de la page afin de transformer toutes les balises HTML en widget Dijit
	parser.parse();
	
	//on transforme à la main la balise "menuEcrirePostIt" en widget Textarea car le parser ne le fait malheureusement pas tout seul...
	new dijit.form.Textarea({ name: "menuEcrirePostit" }, "menuEcrirePostit");
	
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
			dateSauvegarde = new Date(localStorage.getItem('sauvegardeETHER'));
		}
	}

	
	
	/* ------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur la page de connexion  --	
	   ------------------------------------------------------------------------------------------------ */
	
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
			dijit.byId('menuParametresAuxParticipants').destroyRendering();
		}
		//on met à jour sa clé
		maCle = key;
		//on met à jour la liste des participants (la variable javascript)
		participants = liste_participants;
		//on met à jour la liste des participants (le widget FilteringSelect)
		majParticipants();
		//on masque le formulaire de connexion pour afficher l'application à l'écran
		changementPage("connexion", "application");
		//et on effectue un "resize" pour être sûr qu'elle prenne bien toute la page
		dijit.byId("applicationContainer").resize();
		//petit + : si une sauvegarde existe, on en informe le participant (avec la date de la sauvegarde)
		if(dateSauvegarde!=undefined) {
			var message = 'Une sauvegarde datant du '+dateSauvegarde.toLocaleDateString()+' (à '+dateSauvegarde.toLocaleTimeString()+') a été identifée.<br />Vous pouvez la charger depuis le menu \"ETHER\" si vous le souhaitez.';
			console.log(message)
			dijit.showTooltip('message', 'menuETHER', ['below']);
			setTimeout("dijit.hideTooltip('menuETHER')", 4000);
		}
		
		//On initialise le manager
		ether.manager.initialize('applicationCenter','applicationBottom');
	});
	
	
	
	/* ----------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "ETHER" de la barre de menu  --	
	   ---------------------------------------------------------------------------------------------------------------- */
	
	//lors du click sur "chargement", on va charger depuis le localStorage tous les post-it sauvegardés et les afficher à l'écran
	dijit.byId("menuChargement").onClick = function() {
		var t = new Array();
		for(var i = localStorage.length - 1 ; i >= 0 ; i--) {
			// on transforme la string enregistrée en tableau, sachant que le séparateur est |
			t = localStorage.getItem(localStorage.key(i)).split('|');
			var m = new msg('texte', 0, '');
			// si c'est l'identité de l'utilisateur courant
			if(t[0] == 'id') {
				if(t[1]!=moi.prenom || t[2]!=moi.nom || t[3]!=moi.estAnimateur) {
					//si la session chargée ne correspond pas au login actuel, on remplace la variable "moi"
					moi.prenom = t[1];
					moi.nom = t[2];
					moi.estAnimateur = t[3];
					//on actualise l'affichage
					if(moi.estAnimateur)
						dojo.byId("moi").innerHTML = moi.prenom+" "+moi.nom+"<br />(animateur)";
					else
						dojo.byId("moi").innerHTML = moi.prenom+" "+moi.nom;
					//et on informe le serveur du changement d'identité
					socket.emit('changement id', moi);
				}
			} else if(t[0] == 'texte') {
				//si c'est simplement un texte, on l'ajoute directement à l'interface utilisateur
				m.type = t[0];
				m.id = t[1];
				m.contenu = t[2];
				ajouterMessage(m, t[3]);
			} else {
				//si il s'agit d'une image (enregistrée en base 64), on l'envoie au serveur pour qu'il la stocke et la décode
				socket.emit('data decode request', t);
			}
		}
	};
	
	//lorsque le serveur a décodé une image, on l'affiche à l'écran dans un post-it
	socket.on('data decode response', function(message, id_emetteur){
		ajouterMessage(message, id_emetteur);
	});
	
	//lors du click sur "sauvegarde", on va stocker dans le localStorage tous les post-it présents à l'écran
	dijit.byId("menuSauvegarde").onClick = function() {
		// on commence par vider la base de données
		localStorage.clear();
		var d = new Date();
		localStorage.setItem('sauvegardeETHER', d.toString());
		// on enregistre l'identité de l'utilisateur
		var p = new Array('id', moi.prenom, moi.nom, moi.estAnimateur);
		// on utilise un try/catch au cas où on aurait plus de place
		try {
			localStorage.setItem('id', p.join('|'));
		} catch(e) {
			if(e == QUOTA_EXCEEDED_ERR) {
				alert("Impossible d'enregistrer la session car l'espace de sauvegarde est plein.");
			}
			console.log('erreur lors de l\'enregistrement de l\'ID');
		}
		/*
		// on enregistre ensuite les messages texte du plus récent au plus ancien
		var m = new Array();
		//
		//il faut ici remplacer la boucle par une itération sur le tableau de David
		//
		$($('.texte').get().reverse()).each(function(index){
			m = ['texte', $(this).attr('id'), $(this).text(), $(this).children('span').text(), 'txt'];
			// on utilise un try/catch au cas où on aurait plus de place
			try {
				// les infos pertinentes seront séparées par un | dans la string enregistrée
				localStorage.setItem('texte' + index, m.join('|'));
			} catch(e) {
				if (e == QUOTA_EXCEEDED_ERR){
					//
					//si possible remplacer par un message du style les Nième photos les plus anciennes ne seront pas sauvegardées
					//
					alert(
					'L\'espace de sauvegarde est plein. ' +
					'Vos ' + (index + 1) + ' textes les plus récents ont toutefois été enregistrés'
					);
				}
				console.log('erreur lors de l\'enregistrement du texte ' + index);
			}
		});
		  
		// on enregistre ensuite les messages image du plus récent au plus ancien
		$($('.image').get().reverse()).each(function(index, el) {
			//pour stocker l'image dans la base de données sous forme de string, on demande au serveur de l'encoder en base 64
			socket.emit('data encode request', $(this).children('a').attr('href'));
		});
		*/
	};
	
	//lorsque l'on reçoit une image encodée en base 64 par le serveur, on la sauvegarde en local
	socket.on('data encode response', function(data, ext) {
	/*
		m = ['image', $(el).attr('id'), data, $(el).children('span').text(), ext];
		// on utilise un try/catch au cas où on aurait plus de place
		try {
			// les infos pertinentes seront séparées par un | dans la string enregistrée
			localStorage.setItem('image' + index, m.join('|'));
		} catch(e) {
			if(e == QUOTA_EXCEEDED_ERR) {
				alert(
				'L\'espace de sauvegarde est plein. ' +
				'Vos ' + (index + 1) + ' images les plus récentes ont toutefois été enregistrées'
				);
			}
			console.log('erreur lors de l\'enregistrement de l\'image ' + index);
		}
	*/	
	});
	
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
	
	//lors du click sur "Ajouter à l'écran" :
	dijit.byId("menuAjouterPostit").onClick = function() {
		//on récupère le contenu du textaréa et on transforme les sauts de ligne en balise HTML
		var texte = dijit.byId("menuEcrirePostit").get('value').replace(/\n/g,'<br />\n');
		//on vérifie que le contenu n'est pas vide
		if(texte!='') {
			//on génère un post-it et on l'affiche à l'écran (à remplacer par la fonction de David)
			dijit.byId("menuEcrirePostit").set('value', '');
			domConstruct.create("div", { innerHTML: texte }, dojo.byId("applicationCenter"));
		}
	}
	
	
	
	/* -----------------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Uploader une photo" de la barre de menu  --	
	   ----------------------------------------------------------------------------------------------------------------------------- */
	
	//lorsqu'une (ou plusieurs) photos sont sélectionnées dans la fenêtre d'upload, on essaie de les encoder avec le FileReader et de les envoyer au serveur
	dijit.byId("uploadPhotos").onChange = function() {
		var files = dijit.byId("uploadPhotos")._files;
		//on vérifie la compatibilité du navigateur avec l'upload multiple (en gros on élimine Internet Explorer)
		if(files) {
			//pour chaque photo sélectionnées, on lui attribut un FileReader
			for (var i = 0; i < files.length; i++) {
				var reader = new FileReader();
				var nomUpload = files[i].name;
				var tailleUpload = files[i].size;
				//lorsque le FileReader commence à lire le fichier, on l'affiche dans une pop-up à l'écran
				reader.onloadstart = function() {
					dijit.showTooltip('Lecture du fichier ' + nomUpload, 'uploadPhotos', ['below']);
				};
				//lorsque le FileReader a fini de lire le fichier, on l'affiche dans une pop-up à l'écran
				reader.onloadend = function() {
					dijit.showTooltip('<img src="images/upload.gif" /> Upload du fichier...', 'uploadPhotos', ['below']);
				};
				//si une erreur s'est produite lors de la lecture, on l'affiche dans une pop-up à l'écran
				reader.onerror = function() {
					dijit.showTooltip('Erreur lors de la lecture du fichier ' + nomUpload, 'uploadPhotos', ['below']);
				};
				//si la lecture du fichier s'est correctement réalisée, on envoie le fichier encodé au serveur
				reader.onload = function(d) {
					dijit.showTooltip('Lecture de ' + nomUpload + 'réussie', 'uploadPhotos', ['below']);
					socket.emit('upload', nomUpload, d.target.result);
				};
				//si la taille du fichier est inférieure à la taille max, on démarre la lecture
				if(files[i].size < tailleMaxUpload) {
					reader.readAsDataURL(files[i]);
				//sinon on affiche une pop-up (pendant 2 secondes) pour prévenir l'utilisateur qu'il y a une taille max à ne pas dépasser
				} else {
					dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader le fichier ' + nomUpload + ' qui est trop volumineux (taille maximale acceptée : 1Mo)', 'uploadPhotos', ['below']);
					setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
				}
			}
		} else {
			dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader des photos car votre navigateur n\'est pas compatible', 'uploadPhotos', ['below']);
		}
	};
	
	//si l'upload a échoué (parce que le fichier n'était pas une photo), on affiche une pop-up (pendant 2 secondes) pour en informer le participant
	socket.on('upload echoue', function() {
		dijit.showTooltip('<img src="images/erreur.png" /> Echec de l\'upload : le fichier n\'est pas une image ! (les extensions acceptées sont .png, .jpg et .gif)', 'uploadPhotos', ['below']);
		setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
	});	
	
	//si l'upload a réussi, on ajoute la photo (dans un post-it) à l'application et on affiche (pendant 2 secondes) une pop-up de confirmation
	socket.on('upload reussi', function(nom, chemin) {
		dijit.showTooltip('<img src="images/ok.png" /> Upload de l\'image réussi !', 'uploadPhotos', ['below']);
		setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
		//à remplacer par la fonction de david
		domConstruct.create("img", { src: chemin, alt: nom }, dojo.byId("applicationCenter"));
	});
	
	
	
	/* ---------------------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Ajouter un participant" de la barre de menu  --	
	   --------------------------------------------------------------------------------------------------------------------------------- */
	
	//lors de la sélection d'un participant dans le FilteringSelect, on crée la dropzone qui lui correspond et on l'ajoute à l'application
	dijit.byId("selectionParticipants").onChange = function(value) {
		if(value!='') {
			//à compléter avec la fonction de david
		}
	}
	
	
	
	/* ---------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Paramètres" de la barre de menu  --	
	   --------------------------------------------------------------------------------------------------------------------- */
	
	//lors du click sur "Afficher la corbeille" :
	dijit.byId("menuParametresCorbeille").onClick = function() {
		//à faire : on affiche/masque la dropzone associée
	}
	
	//lors du click sur "Afficher l'envoi à tous" :
	dijit.byId("menuParametresATous").onClick = function() {
		//à faire : on affiche/masque la dropzone associée
	}
	
	//lors du click sur "Afficher l'envoi aux animateurs" :
	dijit.byId("menuParametresAuxAnimateurs").onClick = function() {
		//à faire : on affiche/masque la dropzone associée
	}
	
	//lors du click sur "Afficher l'envoi aux participants" :
	dijit.byId("menuParametresAuxParticipants").onClick = function() {
		//à faire : on affiche/masque la dropzone associée
	}
	
	
	
	/* --------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui concernent les autres participants  --	
	   -------------------------------------------------------------------------------------------- */
	
	//lors de la connexion d'un nouveau participant, on l'ajoute à la variable javascript et au widget FilteringSelect
	socket.on('connexion nouveau participant', function(participant, key) {
		participants[key] = participant;
		majParticipants();
	});
	
	//lors de la déconnexion d'un nouveau participant, on le retire de la variable javascript et du widget FilteringSelect
	socket.on('deconnexion participant', function(key) {
		participants[key] = null;
		majParticipants();
	});
	
	
	
	/* ------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui concernent l'échange de messages  --	
	   ------------------------------------------------------------------------------------------ */
	
	//lors de la connexion d'un nouveau participant, on l'ajoute à la variable javascript et au widget FilteringSelect
	socket.on('reception', function(message, cle_emmeteur) {
		//à completer avec la fonction de David
	});
});



/* -----------------------------------------------------------------------------------------------------------------
   --  on déclare en global deux variables indispensables à l'instanciation du module dijit.form.FilteringSelect  --	
   ----------------------------------------------------------------------------------------------------------------- */
   
var dataParticipants = { identifier:'value', label:'name', items: [] };
var listeParticipants = new dojo.data.ItemFileReadStore({ data: dataParticipants });