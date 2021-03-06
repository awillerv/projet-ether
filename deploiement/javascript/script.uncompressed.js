/* ---------------------------------------------------------------------------------------------------------------------------
   --  on charge toutes les bibliothèques de Dojo nécessaires à ETHER, puis on exécute le callback lorsque tout est chargé  --	
   --------------------------------------------------------------------------------------------------------------------------- */

require(["dojo/parser", "dojo/on", "dojox/validate/web", "dojo/dom-construct", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-style", "dojo/dom-geometry", "dojo/query", "dojo/_base/fx", "dojo/fx", "dojo/fx/easing", "dojo/_base/unload", "dojo/_base/sniff", "ether/tap",
"dijit/Dialog", "dijit/ProgressBar", "dijit/form/ValidationTextBox", "dijit/form/RadioButton", "dijit/form/Form", 
"dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu", "dijit/MenuItem", "ether/MenuItem", "dijit/MenuSeparator", "dijit/PopupMenuItem", "dijit/CheckedMenuItem",
"dojox/form/Uploader", "dijit/form/Textarea", "dijit/form/FilteringSelect", "dojo/data/ItemFileReadStore", "dijit/ColorPalette",
"dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/dnd/Source", "dojo/_base/array",
"ether/PostIt", "ether/Cible","ether/CibleEnvoi", "ether/editeur","ether/DZContainer", "dojo/keys", "dojo/domReady!"], function(parser, on, validate, domConstruct, domAttr, domClass, domStyle, domGeom, query, baseFx, fx, easing, unload, has, tap) {



/* --------------------------------------------------------------------------------------------------------------------------
   --  on définit une classe appelée ether.manager, qui est en charge de la gestion de l'ensemble des post-it et dropzone  --	
   -------------------------------------------------------------------------------------------------------------------------- */

ether.manager={

	/* -------------------------------------------------------------------------------------------------------------------------
	   --  toutes les variables globales de la classe, qui permettent la gestion en temps réel des post-its et des dropzones  --	
	   ------------------------------------------------------------------------------------------------------------------------- */
   
	//liste des post-it
	PIList :new Array(),
	//liste des Dropzones	
	DZList :new Array(),	
	DZId:0,
	DZGroupId:0,
	//un array pour associer à chaque participant la DZ à laquelle il est associé
	userMap :new Array(),
	PICount:0,
	DZSpawnZone :null,	
	PISpawnZone : null,
	DZCorbeille:null,
	DZTous:null,
	DZAnim:null,
	DZBarCurrentDZ:new Array(),
	DZBarCurrentContainer:null,
	DZNonAnim:null,
	DZContainerList:null,
	DZBar:dojo.byId("DZBar"),
	participants:new Array(),
	//le paramètre d'affichage des pop-up
	POPUP: true,
	//le paramètre d'envoi des post-it : "copier" ou "deplacer"
	SUPPRESSION_POSTIT: true,
	//un compteur de post its envoyés
	COMPTEUR: 0,
	//un compteur d'erreur de connections au serveur
	NB_ERREURS: 0,
	
	
	
	/* -------------------------------------------------------------------------------------------------------------------------------------------------
	   --  cette fonction permet d'instancier le manager et toutes ses variables. Elle est appelée lors de l'authentification réussie du participant  --	
	   ------------------------------------------------------------------------------------------------------------------------------------------------- */
	   
	initialize:function(postItArea, DZDefaultArea)
	{	
		//la zone dans laquelle seront créés les post-its
		this.PISpawnZone=dojo.byId(postItArea);
		//la zone dans laquelle seront créées les dropzones
		this.DZSpawnZone=dojo.byId(DZDefaultArea);

		//on définit ici la dropzone permanante "corbeille" 
		this.DZCorbeille=new ether.cible(dojo.byId("corbeille"),this);
		this.DZCorbeille.onDrop=function(objet) {
			this.onStopHover();
			if(objet.isPostIt) {
				this.dernierEnvoye = objet.getContent();
				this.manager.deletePI(objet);
				return true;
			}
			if(objet.isDZU) {
				this.manager.droppedDZU(objet);
				return true;
			}
			if(objet.isCibleEnvoi) {
				this.manager.deleteDZ(objet);
				return true;
			}
			return false;
		}
		dojo.connect(this.DZCorbeille.node, tap, this.DZCorbeille, function() {
			if(this.dernierEnvoye!=undefined) {
				var message = "Corbeille<br /><br/>Voulez-vous restaurer le dernier élément supprimé ?<br /><input id=\"boutonRestaurer\" value=\"oui\" type=\"button\"/> <input id=\"boutonNePasRestaurer\" value=\"non\" type=\"button\"/>";
				dijit.showTooltip(message, 'corbeille', ['below']);
				new dijit.form.Button({ label: "Oui", onClick: function() { dijit.byId("boutonRestaurer").destroy(); dijit.byId("boutonNePasRestaurer").destroy(); var corbeille = ether.manager.DZCorbeille; ether.manager.chargementPostIt(eval("(" + corbeille.dernierEnvoye + ")"), null); corbeille.dernierEnvoye=null; dijit.hideTooltip('corbeille'); } }, "boutonRestaurer");
				new dijit.form.Button({ label: "Non", onClick: function() { dijit.byId("boutonRestaurer").destroy(); dijit.byId("boutonNePasRestaurer").destroy(); dijit.hideTooltip('corbeille'); } }, "boutonNePasRestaurer");
			} else {
				dijit.showTooltip('Corbeille', 'corbeille', ['below']);
				setTimeout("dijit.hideTooltip('corbeille')", 2000);
			}
		});

		//on définit ici la dropzone permanante "envoi à tous"
		this.DZTous=new ether.cible(dojo.byId("envoiATous"),this);
		this.DZTous.onDrop=function(objet) {
			this.onStopHover();
			if(objet.isPostIt) {
				var resultat = this.manager.sendPI(objet, [TOUS]);
				if(resultat==undefined) {
					this.envoiEchoue();
				} else {
					this.dernierEnvoye = resultat;
				}
				return true;
			} else {
				return false;
			}
		}
		dojo.connect(this.DZTous.node, tap, function() {
			dijit.showTooltip('Envoi à tous', 'envoiATous', ['below']);
			setTimeout("dijit.hideTooltip('envoiATous')", 2000);
		});

		//on définit ici la dropzone permanante "envoi aux animateurs" 
		this.DZAnim=new ether.cible(dojo.byId("envoiAuxAnimateurs"),this);
		this.DZAnim.onDrop=function(objet) {
			this.onStopHover();
			if(objet.isPostIt) {
				var resultat = this.manager.sendPI(objet, [ANIMATEURS]);
				if(resultat==undefined) {
					this.envoiEchoue();
				} else {
					this.dernierEnvoye = resultat;
				}
				return true;
			} else {
				return false;
			}
		}
		dojo.connect(this.DZAnim.node, tap, function() {
			dijit.showTooltip('Envoi aux animateurs', 'envoiAuxAnimateurs', ['below']);
			setTimeout("dijit.hideTooltip('envoiAuxAnimateurs')", 2000);
		});
		
		//on définit ici la dropzone permanante "envoi aux non-animateurs"
		this.DZNonAnim=new ether.cible(dojo.byId("envoiAuxNonAnimateurs"),this);
		this.DZNonAnim.onDrop=function(objet) {
			this.onStopHover();
			if(objet.isPostIt) {
				var resultat = this.manager.sendPI(objet, [NON_ANIMATEURS]);
				if(resultat==undefined) {
					this.envoiEchoue();
				} else {
					this.dernierEnvoye = resultat;
				}
				return true;
			} else {
				return false;
			}
		}
		dojo.connect(this.DZNonAnim.node, tap, function() {
			dijit.showTooltip('Envoi aux participants (non animateurs)', 'envoiAuxNonAnimateurs', ['below']);
			setTimeout("dijit.hideTooltip('envoiAuxNonAnimateurs')", 2000);
		});
		
		//initialisation de l'usermap pour les participants présents au départ
		var i=0;
		while(i<=this.participants.length)		{
			this.userMap[i]=new Array();
			i++;
		}
		
		//creation d'une liste de DZContainer...
		this.DZContainerList=new Array();
		dojo.forEach(this.DZSpawnZone.children, function(item) {
			this.DZContainerList.push(ether.DZContainer(item,this.DZContainerList.length,this));
		},this);
		this.closeDZBar();
	},
	
	
	
	/* ---------------------------------------------------------------------------------------------------------
	   --  les deux premiers fonctions sont responsables de la gestion de la liste de participants connectés  --	
	   --------------------------------------------------------------------------------------------------------- */
	
	//si un participant se connecte, on lui crée un tableau de dropzone associées vide pour l'instant
	ajoutParticipant:function(idParticipant) {
		this.userMap[idParticipant]=new Array();
	},
	
	//si un participant se déconnecte, on supprime toutes les dropzones qui le concerne à l'écran
	deleteParticipant: function(idParticipant) {
		//d'abord on vérifie qu'il est effectivement associé à des DZ dans UserMap
		if(this.userMap[idParticipant]) {
			var j=0;
			while(j<this.userMap[idParticipant].length) {	
				this.userMap[idParticipant][j].removeClient(idParticipant);
				if(this.userMap[idParticipant][j].clientKeyList.length<=0) {
					this.deleteDZ(this.userMap[idParticipant][j]);
				} else {
					this.userMap[idParticipant][j].refreshNode();
				}
				j++;
			}
			delete(this.userMap[idParticipant]);
			delete(this.participants[idParticipant]);
		}
	},

	
	
	/* ---------------------------------------------------------------------------------------------------------------------------------------------
	   --  les fonctions suivantes assurent la gestion des dropzones, ainsi que de la barre (localisée en bas de l'application) qui les contient  --	
	   --------------------------------------------------------------------------------------------------------------------------------------------- */
	
	//lorsque l'utilisateur sélectionne un participant avec qui il souhaite communiquer
	createDZ: function(clientList) {	
		var clientArray;
		if(clientList instanceof Array) {
			clientArray=clientList;
		} else {
			clientArray=[clientList];
		}
		//on récupere le premier container libre.
		var i=0;
		while(!this.DZContainerList[i].isFree()) {
			i++;
		}
		dojo.create('div',{id:"DZ"+this.DZId,class:"DropZone"},this.DZContainerList[i].node);

		var DZ=ether.cibleEnvoi(this.DZContainerList[i].node.children[0],{},this.DZContainerList[i], clientArray,this);
		var k=0;
		while(k<clientArray.length) {
			if(this.userMap[clientArray[k]]) {
				this.userMap[clientArray[k]].push(DZ);
			}
			k++;
		}
		
		this.DZList[this.DZId]=DZ;
		this.DZId++;
	},
	
	//lorsque deux dropzones sont superposées
	fusionDZ: function(DZ1, DZ2) {
		if(DZ1.isCibleEnvoi&&DZ2.isCibleEnvoi) {
			var i=-1;						
			var j=-1;
			var k=-1;
			var trouve1=false;
			var trouve2=false;
			//on recherche les deux éléments dans le tableau : &&!(trouve1&&trouve2)
			while((k<this.DZList.length-1)) {
				k++;
				trouve1=(this.DZList[k]==DZ1);
				trouve2=(this.DZList[k]==DZ2);
				if(trouve1) {
					i=k;
				}
				if(trouve2) {
					j=k;
				}
			}
			while(DZ1.clientKeyList.length>0) {
				var n=DZ1.clientKeyList[0];
				DZ1.removeClient(n);
				DZ2.addClient(n);
				this.userMap[n].push(DZ2);
			}
			DZ2.refreshNode();
			DZ1.container.DZ=null;
			this.deleteDZ(DZ1);
		}
	},
	
	//lorsqu'une dropzone individuelle (qui se trouve dans la barre rétractable) est déplacée
	droppedDZU: function(DZU, Container) {
		var initContainer=DZU.container;
		initContainer.DZ.removeClient(DZU.client);
		aux=dojo.indexOf(this.userMap[DZU.client],initContainer.DZ);
		if(aux!=-1) {
			this.userMap[DZU.client].splice(aux,1);
		}	
		if(Container) {
			if(Container.DZ) {
				if(Container.DZ.addClient(DZU.client)) {
					this.userMap[DZU.client].push(Container.DZ);
				}
				Container.DZ.refreshNode();
			} else {	
				var DZ=ether.cibleEnvoi(dojo.create("div"),{},Container,DZU.client,this);
				MB=dojo.marginBox(Container.node);
				MBObjet=dojo.marginBox(DZ.node);
				this.userMap[DZU.client].push(Container.DZ);
			}
		}
		if(initContainer.DZ.clientKeyList.length<=0) {	
			this.deleteDZ(initContainer.DZ);
		} else {
			initContainer.DZ.refreshNode();
		}
		this.closeDZBar();
	},
	
	//prepare et affiche la barre des DZ individuelles du container passé en argument
	prepareAndShowDZBar: function(DZContainer, toggleDelete)
	{	
		var nbDZ = 0;
		for(var i=0; i<this.DZBar.children.length;i++) {
			dojo.destroy(this.DZBar.children[i]);
		}
		this.DZBarCurrentDZ = new Array();
		nbDZ = DZContainer.DZ.clientKeyList.length;
		var MB = dojo.position(DZContainer.node);
		var parentMB = dojo.marginBox(DZContainer.node.parentNode);
		var proposedWidth = Math.min(60*nbDZ, parentMB.w);
		var proposedLeft = Math.max(0, MB.x+MB.w/2-proposedWidth/2);
		this.DZBarCurrentContainer = DZContainer;
		dojo.style(this.DZBar, { left: proposedLeft+"px", width: proposedWidth+"px", float: "left"});
		dojo.fadeIn({ node:this.DZBar, duration:200 }).play();
		for(var i=0; i<DZContainer.DZ.clientKeyList.length;i++) {
			var node = dojo.create("div");
			var DZU = ether.DZUnitaire(node,{},DZContainer,DZContainer.DZ.clientKeyList[i],this);
			dojo.style(node, { float: "left" });
			dojo.place(node, this.DZBar);
			this.DZBarCurrentDZ.push(DZU);
		}
	},
	
	//masque cette barre réservée aux dropzones individuelles
	closeDZBar:function() {
		dojo.fadeOut({ node:this.DZBar, duration:400 }).play();
		for(var i=0; i<this.DZBar.children.length;i++) {
			dojo.destroy(this.DZBar.children[i]);
		}
		this.DZBarCurrentDZ=new Array();
		if(this.DZBarCurrentContainer) {
			this.DZBarCurrentContainer.open=false;
		}
		this.DZBarCurrentContainer=null;	
	},
	
	//supprime la DZ n°X
	deleteDZ:function(DZ) {	
		//vérification : est-ce bien une DZ existante ?
		var id=dojo.attr(DZ.node,"id");
		//étape 1 : mettre à jour le tableau userMap. Un parcours complet est requis
		var i=0;
		while(i<=this.userMap.length) {
			if(this.userMap[i]) {
				aux=dojo.indexOf(this.userMap[i],DZ);
				if(aux!=-1) {
					this.userMap[i].splice(aux,1);
				}
			}
			i++;
		}
		//etape 2 : on supprime effectivement la DZ
		aux=dojo.indexOf(this.DZList,DZ);
		if(aux!=-1) {
			dojo.destroy(this.DZList[aux].node);
			this.DZList[aux].supprimer();
			this.DZList.splice(aux,1);
		}
	},
	
	
	
	/* -------------------------------------------------------------------------------------------------------------------------
	   --  les fonctions suivantes assurent la gestion des post-its, groupe de post-it, post-its image, ainsi que leur envoi  --	
	   ------------------------------------------------------------------------------------------------------------------------- */
	
	//pour charger un post-it préalablement sauvegardé ou supprimé dans la corbeille
	chargementPostIt:function(objet, objetPred) {		
		var ProtoPI=dojo.create('div',{innerHTML:objet.innerHTML, 
		id: 'PI'+this.PICount, style:{position:"absolute"}}, dojo.byId(this.PISpawnZone));
		dojo.attr(ProtoPI,"style",objet.style);
		if(objet.type=="postIt") {
			var PI=ether.postIt(ProtoPI,{},this, objetPred);	//on transforme notre noeud en post-it
			this.PICount++;
			this.PIList.push(PI);
			if(objet.next) {
				PI.next=this.chargementPostIt(objet.next, PI);
			}
			return PI;
		}
	},
	
	//fonction appelée lorsqu'un post-it (texte ou image) nous est envoyé par un autre participant
	receptionPostIt:function(objet, cle_emetteur) {		
		var listeDZ = this.userMap[cle_emetteur];
		var ProtoPI=dojo.create('div',{innerHTML:objet.innerHTML, id: 'PI'+this.PICount, style:{position:"absolute"}}, dojo.byId(this.PISpawnZone));
		dojo.attr(ProtoPI,"style",objet.style);
		if(listeDZ.length > 0) {
			var k = -1;
			dojo.forEach(listeDZ, function(DZ, i) {
				if(listeDZ[i].clientKeyList.length == 1) {
					k = i;
				}
			});
			if(k == -1) {
			    k = listeDZ.length - 1;
			}
			listeDZ[k].reception();
			var MBDZselect = dojo.position(listeDZ[k].node);
			var MBapplicationCenterContainer = dojo.position(dojo.byId('applicationCenterContainer'));
			dojo.style(ProtoPI, { top: (MBapplicationCenterContainer.h - dojo.position(ProtoPI.children[0]).h - 5) + "px", left: MBDZselect.x+"px"});
			if(objet.type=="postIt") {
				PI=ether.postIt(ProtoPI,{},this, null);	//on transforme notre noeud en post-it
				this.PICount++;
				this.PIList.push(PI);
				if(objet.next) {
					PI.next=this.chargementPostIt(objet.next, PI);
				}
				PI.refreshNextPosition();	
			}
		} else {
			var MBselect = dojo.position(dojo.byId('selectionParticipants'));
			dojo.style(ProtoPI, { top: 5-dojo.position(ProtoPI.children[0]).h-10+"px", left: MBselect.x+"px"});
			fx.slideTo( { duration: 1000, node: ProtoPI, easing: easing.quadOut, top: 5, left: MBselect.x, onEnd: function() { 
				if(objet.type=="postIt") {
					PI=ether.postIt(ProtoPI,{},ether.manager, null);	//on transforme notre noeud en post-it
					ether.manager.PICount++;
					ether.manager.PIList.push(PI);
					if(objet.next) {
						PI.next=ether.manager.chargementPostIt(objet.next, PI);
					}
					PI.refreshNextPosition();	
				}
			} }).play();
		}
	},
	
	//fusionne deux postIt, repérés par leurs ID (ouPostItGroup). le premier est l'objet qui recoit le drop (au dessous)
	fusionPI:function(PI1,PI2) {
		var i=-1;						
		var j=-1;
		var k=-1;
		var trouve1=false;
		var trouve2=false;
		//on recherche les deux éléments dans le tableau : &&!(trouve1&&trouve2)
		while((k<this.PIList.length-1)) {
			k++;
			trouve1=(dojo.attr(this.PIList[k].node,"id")==PI1);
			trouve2=(dojo.attr(this.PIList[k].node,"id")==PI2);
			if(trouve1) {
				i=k;
			}
			if(trouve2) {
				j=k;
			}
		}
		//l'element du dessous est un postItSimple : on crée un groupePostIt à la place, et on y ajoute l'objet droppe
		if(this.PIList[i].isPostIt) {
			this.PIList[i]=this.PIList[i].promote();
			while(this.PIList[j].node.children.length>0) {
				this.PIList[i].addNode(this.PIList[j].node.children[0]);
			}
			dojo.destroy(this.PIList[j].node);
			this.PIList[j].supprimer();
			this.PIList.splice(j,1);
		} else { //sinon l'element du dessous est un postItGroup
			while(this.PIList[j].node.children.length!=0) {
				this.PIList[i].addNode(this.PIList[j].node.children[0]);
			}
			dojo.destroy(this.PIList[j].node);
			this.PIList[j].supprimer();
			this.PIList.splice(j,1);
		}
	},
	
	//creation de postIt à partir d'un JSON renvoyé par l'éditeur
	createPI: function(objet) {
		var innerNode = dojo.create("div", { class:"contenuPI", innerHTML:objet.texte, style: { backgroundColor: objet.couleur, width: objet.largeur+"px", height: objet.hauteur+"px", position:"absolute" } });
		//on crée un noeud de texte (avec l'id qui va bien PI0,PI1, etc...)
		var node=dojo.create("div",{id:"PI"+this.PICount}, this.PISpawnZone);
		dojo.style(node, { position:"absolute", left: objet.left - dojo.position(dojo.byId("applicationCenter")).x + "px", top: objet.top  - dojo.position(dojo.byId("applicationCenter")).y + "px" });
		dojo.place(innerNode,node,"first");
		//on transforme notre noeud en post-it
		PI = ether.postIt("PI"+this.PICount,{},this, null);
		this.PICount++;
		this.PIList.push(PI);
	},
	
	//une image vient d'être uploadée, on crée donc un noeud dans le DOM pour l'afficher et on lance son chargement
	createImagePostIt: function(imgpath, name, top, left) {
		var node=dojo.create("div", { id:"PI"+this.PICount, innerHTML:'<img class="contenuPI" src="'+ imgpath +'" alt="'+ name +'" onload="ether.manager.finalizeImagePostIt(this,'+top+','+left+')"/>', style: { display:'none', position: 'absolute' } }, this.PISpawnZone);
		this.PICount++;
	},
	
	//une fois le chargement de la photo terminé, on transforme ce noeud en post-it
	finalizeImagePostIt: function(image, topDefaut, leftDefaut) {
		//on récupère le parent de l'image, qui sera passé au constructeur du post-it
		var node = image.parentNode;
		//on supprime l'appel à la fonction finalize lors du chargement de l'image pour éviter un nouvel appel si l'image venait à être rechargée
		dojo.attr(image,"onload","");
		dojo.style(node, "display", "block");
		nodeMB = dojo.position(image);
		var hauteur = nodeMB.h;
		var largeur = nodeMB.w;
		//on stocke le ratio de l'image pour un redimentionnement qui ne la déforme pas
		var ratio = hauteur/largeur;
		//si l'image est trop grande, on limite sa taille à 250px pour ne pas se faire envahir
		if(nodeMB.h>250 || nodeMB.w>250) {
			if(nodeMB.h>nodeMB.w) {
				hauteur=250;
				largeur=Math.round(250/ratio);
			} else {
				hauteur=Math.round(250*ratio);
				largeur=250;
			}
		}
		//on applique la position et la taille calculée à notre noeud
		dojo.style(image, {	top: "0px", left: "0px", height: hauteur+"px", width: largeur+"px" });
		if(topDefaut==0 || leftDefaut==0) {
			marginBox=dojo.position(dojo.byId('uploadPhotos'));
			dojo.style(node, { left: marginBox.x+"px",	top: 5-hauteur-100+"px" });
			var id = dojo.attr(node, 'id')
			fx.slideTo( { duration: 1000, node: node, easing: easing.quadOut, top: 5, left: marginBox.x, onEnd: function() { 
				//on transforme notre noeud en post-it
				PI = ether.postIt(id, {}, ether.manager, null);	
				ether.manager.PIList.push(PI);
			} }).play();
		} else {
			marginBox=dojo.position(dojo.byId("applicationCenterContainer"));
			var newTop = topDefaut-marginBox.y-hauteur/2;
			if(newTop < 5)
				newTop = 5;
			if(newTop + hauteur > marginBox.h)
				newTop = marginBox.h-hauteur-5;
			var newLeft = leftDefaut-marginBox.x-largeur/2;
			if(newLeft < 5)
				newLeft = 5;
			if(newLeft + largeur > marginBox.w)
				newLeft = marginBox.w-largeur-5;
			dojo.style(node, { left: newLeft+"px",	top: newTop+"px" });
			//on transforme notre noeud en post-it
			PI = ether.postIt(dojo.attr(node, 'id'), {}, this, null);	
			this.PIList.push(PI);
		}
	},
	
	//supprime un noeud, à la fois du manager mais aussi du DOM
	deletePI: function(PI) {
		if(PI.next){this.deletePI(PI.next)};
		var aux=dojo.indexOf(this.PIList,PI);
		if(aux!=-1) {
			dojo.destroy(this.PIList[aux].node);
			this.PIList[aux].supprimer();
			this.PIList.splice(aux,1);
		}
	},
	
	//envoi un post-it qui a été laché sur une dropzone à son destinataire
	sendPI: function(objet, cles_destinataires) {
		//on vérifie qu'on est bien connecté au serveur, sinon on affiche un message d'erreur
		if(objet.isPostIt && socket && socket.socket.connected) {
			//on crée un ID unique pour pouvoir suivre notre message jusqu'au serveur
			var msg_id = MA_CLE + '_' + this.COMPTEUR;
			this.COMPTEUR++;
			//on transforme le post-it (ou le groupe de post-its) en JSON
			var m = new msg(msg_id, objet.getContent());
			//on fait appel à socket.io pour le transmettre au serveur
			socket.emit('envoi', m, cles_destinataires);
			//si les paramètres sont régler sur "suppression des post-its après envoi" alors on les supprime
			if(this.SUPPRESSION_POSTIT) {
				this.deletePI(objet);
			}
			return msg_id;
		} else {
			this.addError();
			return undefined;
		}
	},
	
	addError: function() {
		this.NB_ERREURS++;
		if(this.NB_ERREURS>3) {
			dijit.byId('alerteRuptureConnexion').show();
		}
	}
}



	/* ------------------------------------------------------------------------------------------------------------------
	   --  fin du manager, ici démarre le script "normal" par l'nitialisation des variables globales de l'application  --	
	   ------------------------------------------------------------------------------------------------------------------ */

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
	var MA_CLE = undefined;
	var moi = new participant('', '', false, 0);
	
	//la date (inconnue pour l'instant) d'une éventuelle sauvegarde de session en local
	var DATE_SAUVEGARDE = undefined;
	
	// Types acceptés pour les uploads
	var allowedTypes = {
		'image/png':       'png',
		'image/jpeg':      'jpg',
		'image/gif':       'gif',
		'image/bmp':       'bmp'
	};

	// Extensions acceptées pour les uploads
	var allowedExtensions = [];
	// tableau inverse de allowedTypes
	var contentTypes      = {};

	// construction des deux derniers tableaux
	for(ct in allowedTypes){
		allowedExtensions[allowedExtensions.length] = allowedTypes[ct];
		contentTypes[allowedTypes[ct]] = ct;
	}
		
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
	function msg(id, contenu) {
		this.id = id;
		this.contenu = contenu;
	}
	
	//cette fonction effectue une transition entre le div "anciennePage" (qu'elle masque progressivement) et le div "nouvellePage" (qu'elle affiche à l'écran)
	function changementPage(anciennePage, nouvellePage) {
		baseFx.fadeOut({
			node: anciennePage,
			duration: 1000,
			beforeBegin: function() {
				dojo.setStyle(dojo.byId(nouvellePage), { display: "", opacity: "0", filter: "alpha(opacity=0)" });
			},
			onEnd: function() {
				dojo.setStyle(dojo.byId(anciennePage), { display: "none" } );
				baseFx.fadeIn({ node: nouvellePage, duration: 1000 }).play();
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
			if(i!=MA_CLE && ether.manager.participants[i]!=null) {
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
			else{
			  domStyle.set(dojo.byId('envoiATous'), "display", "none");
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
				else{
			    domStyle.set(dojo.byId('envoiAuxNonAnimateurs'), "display", "none");
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
				else{
			    domStyle.set(dojo.byId('envoiAuxAnimateurs'), "display", "none");
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
			handleUploadFiles(evt.dataTransfer.files, evt.clientY, evt.clientX);
		}
		//une fois le(s) objet(s) lachés dans le navigateur, on regarde si il s'agit simplement d'un bout de texte
		if(evt.dataTransfer.types) {
			var types = evt.dataTransfer.types;
			//si c'est le cas, on crée les crée des post-its avec le texte dedans
			for(var i=0; i<types.length; i++) {
				if(evt.dataTransfer.types[i]=='text/plain') {
					new ether.editeur(dojo.byId("applicationCenter"), evt.clientX, evt.clientY, 53, 160, evt.dataTransfer.getData('text'));
				}
			}
		}
		return false;
	}
	
	function handleUploadFiles(files, top, left) {
		//on vérifie qu'on est bien connecté au serveur, sinon on affiche un message d'erreur
		if(socket && socket.socket.connected) {
			//pour chaque photo sélectionnées, on lui attribut un FileReader
			for (var i = 0; i < files.length; i++) {
				var reader = new FileReader();
				var nomUpload = files[i].name;
				var tailleUpload = files[i].size;
				//lorsque le FileReader commence à lire le fichier, on l'affiche dans une pop-up à l'écran
				reader.onloadstart = function() {
					if(ether.manager.POPUP)
						dijit.showTooltip('Lecture du fichier ' + nomUpload, 'uploadPhotos', ['below']);
				};
				//lorsque le FileReader a fini de lire le fichier, on l'affiche dans une pop-up à l'écran
				reader.onloadend = function() {
					if(ether.manager.POPUP)
						dijit.showTooltip('<img src="images/upload.gif" /> Upload du fichier...', 'uploadPhotos', ['below']);
				};
				//si une erreur s'est produite lors de la lecture, on l'affiche dans une pop-up à l'écran
				reader.onerror = function() {
					if(ether.manager.POPUP)
						dijit.showTooltip('Erreur lors de la lecture du fichier ' + nomUpload, 'uploadPhotos', ['below']);
				};
				//si la lecture du fichier s'est correctement réalisée, on envoie le fichier encodé au serveur
				reader.onload = function(d) {
					if(ether.manager.POPUP)
						dijit.showTooltip('Lecture de ' + nomUpload + 'réussie', 'uploadPhotos', ['below']);
					socket.emit('upload', nomUpload, d.target.result, top, left);
				};
				//si la taille du fichier est inférieure à la taille max, on démarre la lecture
				if(files[i].size < tailleMaxUpload) {
					reader.readAsDataURL(files[i]);
				//sinon on affiche une pop-up (pendant 2 secondes) pour prévenir l'utilisateur qu'il y a une taille max à ne pas dépasser
				} else {
					dojo.addClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur');
					setTimeout("dojo.removeClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur')", 2000);
					if(ether.manager.POPUP) {
						dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader le fichier ' + nomUpload + ' qui est trop volumineux (taille maximale acceptée : 1Mo)', 'uploadPhotos', ['below']);
						setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
					}
				}
			}
		} else {
			ether.manager.addError();
			dojo.addClass(dijit.byId('uploadPhotos').domNode, 'uploadPhotosErreur');
			setTimeout("dojo.removeClass(dijit.byId('uploadPhotos').domNode, 'uploadPhotosErreur')", 2000);
			if(ether.manager.POPUP) {
				dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader le fichier car vous n\'êtes plus connecté au serveur', 'uploadPhotos', ['below']);
				setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
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
	
	//lorsque l'utilisateur clique sur le bouton "ok" de la boite de dialogue "internet explorer"
	on(dijit.byId("boutonAlerteIE"), "click", function(event) {
		dijit.byId('alerteIE').hide(); 
	});
	
	//lorsque l'utilisateur clique sur le bouton "ok" de la boite de dialogue "impossible de se connecter"
	on(dijit.byId("boutonAlerteConnexion"), "click", function(event) {
		dijit.byId('alerteConnexion').hide();
	});
	
	//lors de la validation du formulaire, on vérifie que le champ "motDePasse" a bien été rempli si le participant est un administrateur
	dijit.byId("motDePasse").validator = function() {
		return (dijit.byId("participant").get("value") || dijit.byId("motDePasse").get("value")!="");
	}
	
	//lors du click sur le "boutonConnexion" :
	on(dijit.byId("boutonConnexion"), "click", function(event) {
		//on vérifie que la connexion via socket.io est active
		if(socket && socket.socket.connected) {	
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
		MA_CLE = key;
		//on met à jour la liste des participants (la variable javascript)
		ether.manager.participants = liste_participants;
		//on met à jour la liste des participants (le widget FilteringSelect)
		majParticipants();
		//on initialise le manager de post-it
		ether.manager.initialize(dojo.byId("applicationCenter"), dojo.byId("DZRow"));
		//on masque le formulaire de connexion pour afficher l'application à l'écran
		changementPage("connexion", "application");
		//on effectue un "resize" pour être sûr qu'elle prenne bien toute la page
		dijit.byId("application").resize();
		//et on prévoit d'effacer le message d'accueil
		setTimeout("dojo.fadeOut({ node: 'divBienvenue', duration: 1000, onEnd: function() { dojo.destroy('divBienvenue'); } }).play()", 6000);
		//petit + : si une sauvegarde existe, on en informe le participant (avec la date de la sauvegarde)
		if(DATE_SAUVEGARDE!=undefined && ether.manager.POPUP) {
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
		// on récupère les préférences de l'utilisateur
		// affichage Corbeille/Tous/Animateurs/NonAnimateurs
		if(p[2] == 'true'){
		  dijit.byId("menuParametresCorbeille").checked = true;
		  dijit.byId("menuParametresCorbeille")._applyAttributes();
		  dojo.style(dojo.byId('corbeille'), 'display', 'block');
	  }
	  else{
	    dijit.byId("menuParametresCorbeille").checked = false;
		  dijit.byId("menuParametresCorbeille")._applyAttributes();
		  dojo.style(dojo.byId('corbeille'), 'display', 'none');
	  }
		dijit.byId("menuParametresATous").checked = ((p[3] == 'true') ? true : false);
		dijit.byId("menuParametresATous")._applyAttributes();
		if(!moi.estAnimateur){
	    dijit.byId("menuParametresAuxAnimateurs").checked = ((p[4] == 'true') ? true : false);
	    dijit.byId("menuParametresAuxAnimateurs")._applyAttributes();
	  }
	  else{
	    dijit.byId("menuParametresAuxNonAnimateurs").checked = ((p[5] == 'true') ? true : false);
	    dijit.byId("menuParametresAuxNonAnimateurs")._applyAttributes();
	  }
	  //affichage de la barre de menu
	  if(p[6] == 'false'){
		dijit.byId("menuParametresBarreMenu").checked = false;
		dijit.byId("menuParametresBarreMenu")._applyAttributes();
	    domStyle.set(dojo.byId('afficherMenu1'), "display", "block");
		domStyle.set(dojo.byId('afficherMenu2'), "display", "block");
		domStyle.set(dojo.byId('applicationTop'), "display", "none");
		dijit.byId('application').resize();
	  } else {
		dijit.byId("menuParametresBarreMenu").checked = true;
		dijit.byId("menuParametresBarreMenu")._applyAttributes();
		domStyle.set(dojo.byId('afficherMenu1'), "display", "none");
		domStyle.set(dojo.byId('afficherMenu2'), "display", "none");
		domStyle.set(dojo.byId('applicationTop'), "display", "");
		dijit.byId('application').resize();
	  }
	  // affichage Popups
	  dijit.byId("menuParametresPopup").checked = ((p[7] == 'true') ? true : false);
	  dijit.byId("menuParametresPopup")._applyAttributes();
	  ether.manager.POPUP= ((p[7] == 'true') ? true : false);
	  // suppression ou non des pi
	  dijit.byId("menuParametresSuppressionPostit").checked = ((p[8] == 'true') ? true : false);
	  dijit.byId("menuParametresSuppressionPostit")._applyAttributes();
	  ether.manager.SUPPRESSION_POSTIT = ((p[8] == 'true') ? true : false);
	  // on met à jours les l'affichage du menu et les différents éléments concernés(corbeille, etc)
	  majParticipants();
	  // couleurs d'édition
	  //on affiche les couleurs par défaut de l'éditeur dans le menu "Paramètres / Couleurs des post-it"
	  query(".couleur1").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", p[9]); });
	  query(".couleur2").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", p[10]); });
	  query(".couleur3").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", p[11]); });
	  query(".couleur4").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", p[12]); });
	  query(".couleur5").forEach(function(node, index, arr) { domStyle.set(node, "backgroundColor", p[13]); });
	  // on remplace les couleurs dans l'éditeur
	  editeurPI.statics.couleur1 = p[9];
	  editeurPI.statics.couleur2 = p[10];
	  editeurPI.statics.couleur3 = p[11];
	  editeurPI.statics.couleur4 = p[12];
	  editeurPI.statics.couleur5 = p[13];
	  // on change le 'connecté en tant que' avec le nouvel id
		dojo.byId("moi").innerHTML = moi.prenom+" "+moi.nom+((moi.estAnimateur) ? "<br />(animateur)" : '');
		// on indique aux autres clients de se mettre à jour
		socket.emit('changement id', moi);
	  // on va recréer les post its enregistrés et les ajouter dans la PIList
	  // on commence par détruire tous les pi/groupes pi
	  while(ether.manager.PIList.length > 0){
	    ether.manager.deletePI(ether.manager.PIList[0]);
	  }
	  // puis on PICount à 0
	  ether.manager.PICount = 0;
	  ether.manager.COMPTEUR = 0;
	  ether.manager.NB_ERREURS = 0;
	  // on ajoute les pi/groupes pi à la volée
	  var PIlength = 0;
	  var PIIMGlength = 0;
	  var content = null;
	  var img = null;
	  var imgsUniques = new Array();
	  var isUnique = true;
	  var cpt = 0;
	  var id = 0;
	  var listePITeteId = new Array();
	  var key = 0;
	  var testRegExp = /^PI[0-9]+$/;
	  // on va retrouver la liste des id des PI de tête
	  while(key < localStorage.length){
	    if(testRegExp.test(localStorage.key(key))){
	      listePITeteId.push(localStorage.key(key));
	    }
	    key++;
	  }
	  // on ajoute les pi du plus ancien enregistré au plus récent
	  var reverseListePITeteId = listePITeteId.reverse();
	  for(var key2 in reverseListePITeteId){
	    // on récupère le string
	    content = localStorage.getItem(reverseListePITeteId[key2]);
	    // on le transforme en JSON
	    //content = JSON.parse(content);
	    // on recrée le post-it
	    ether.manager.chargementPostIt(eval("(" + content + ")"), null);
	  }
	  // notre PIList est maintenant complète, il n'y a plus qu'à décoder/enregistrer les images et les afficher
	  var k = 0;
	  var j = 0;
	  var temp = null;
	  dojo.forEach(ether.manager.PIList, function(pi, i){
	    // on vérifie si c'est un pi de tête
	    if(!pi.pred){
	      // on travaille alors récursivement sur lui et ses prédécesseurs
	      // on decode/enregistre l'image et on remplace l'ancienne url de notre pi par la nouvelle
	      // il faut aussi penser que les images sont enregistrées dans l'ordre inverse 
	      temp = pi;
	      j = 0;
	      while(temp){ 
	        // on affiche maintenant l'image éventuelle associé à ce pi
		      // on commence par vérifier l'existence d'une éventuelle url
		      // s'il s'agit bien d'une image et non d'un texte on encode celle-ci
		      if(domAttr.get(temp.node.children[0], 'src') != null){
		        // si le contenu de l'image est stocké ailleurs on va chercher cette valeur
	          if(localStorage.getItem(reverseListePITeteId[k] + 'IMG' + j).split('|').length < 2){
	            img = localStorage.getItem(localStorage.getItem(reverseListePITeteId[k] + 'IMG' + j));
	          }
	          else{
	            img = localStorage.getItem(reverseListePITeteId[k] + 'IMG' + j);
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
		          console.log(domAttr.get(temp.node, 'id'));
		          socket.emit('data decode request', domAttr.get(temp.node, 'id'), imgsUniques.length - 1, img.split('|'));
		        }
		        else{
		          // il faut bien penser que l'ordre dans PIList est inverse à celui de localStorage
		          domAttr.set(temp.node.children[0], 'src', imgsUniques[cpt][1]);
		        }
		        j++;
		      }
	        temp = temp.next;
	      }
	      k++;
	    }
	  });
	  // lorsqu'une image a été décodée/enregistrée
	  socket.on('data decode response', function(id_tempnode, cleUnique, chemin){
		  if(MA_CLE!=undefined) {
			  // il faut bien penser que l'ordre dans PIList est inverse à celui de localStorage
			  var tempnode = dojo.byId(id_tempnode);
			  console.log(tempnode);
			  domAttr.set(tempnode.children[0], 'src', chemin);
			  imgsUniques[cleUnique].push(chemin);
		  }
	  });
	};
	
	//lors du click sur "sauvegarde", on va stocker dans le localStorage tous les post-it présents à l'écran
	dijit.byId("menuSauvegarde").onClick = function() {
		// on commence par vider la base de données
		localStorage.clear();
		var d = new Date();
		localStorage.setItem('sauvegardeETHER', d.toString());
		// on enregistre l'identité de l'utilisateur
		var p = new Array(moi.prenom, moi.nom);
		// on va chercher les préférences dans le menu correspondant
		// affichage Corbeille/Tous/Animateurs/NonAnimateurs
		p.push(dijit.byId("menuParametresCorbeille").checked);
		p.push(dijit.byId("menuParametresATous").checked);
	    p.push(dijit.byId("menuParametresAuxAnimateurs").checked);
	    p.push(dijit.byId("menuParametresAuxNonAnimateurs").checked);
	    //affichage barre de menu
	    p.push(dijit.byId("menuParametresBarreMenu").checked);
	    // affichage Popups
	    p.push(dijit.byId("menuParametresPopup").checked);
	    // suppression ou non des pi
	    p.push(dijit.byId("menuParametresSuppressionPostit").checked);
	    // couleurs d'édition
	    p.push(editeurPI.statics.couleur1);
	    p.push(editeurPI.statics.couleur2);
	    p.push(editeurPI.statics.couleur3);
	    p.push(editeurPI.statics.couleur4);
	    p.push(editeurPI.statics.couleur5);
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
		var url = null;
		var urlsUniques = new Array();
		var isUnique = true;
		var cpt = 0;
		var imgContenu = null;
		var j = 0;
		var temp = null;
		// var srcRE = new RegExp('\/uploads\/[0-9]+\.('+allowedExtensions.join('|')+')', 'g');
		// on parcoure le tableau à l'envers pour sauver d'abord les pi/groupes pi les plus récents
		var reversePIList = ether.manager.PIList.reverse();
		dojo.forEach(reversePIList, function(pi, i){
		  // on vérifie s'il s'agit d'un pi en tête de groupe (auquel cas il contient toutes les infos
		  // des autres pi du groupe et on le sauvegarde)
		  if(!pi.pred){
		    // on enregistre maintenant le contenu du pi de tete
		    // contenu du pi/groupe pi sous forme de JSON "stringifié
		    content = pi.getContent();
		    // on met tous les src à '' car ceux ci ne seront plus bons au chargement
		    // console.log(content);
		    // content = content.replace(srcRE, '');
		    // console.log(content);	    
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
		    // en partant du pi de tête, on encode les images de tous les pi du groupes successivement
		    // et on les enregistre en les liant au numéro du post it de tete
		    j = 0;
		    temp = pi;
		    while(temp){
		      // on stocke maintenant l'image éventuelle associé à ce pi
		      // on commence par récupérer l'url
		      url = domAttr.get(temp.node.children[0], 'src');
		      console.log(url);
		      // s'il s'agit bien d'une image et non d'un texte on encode celle-ci
		      if(url != null){
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
		        console.log('isUnique vaut ' + isUnique);
		        // si l'url courante n'a pas encore été décodée / enregistrée
		        if(isUnique){
		          socket.emit('data encode request', i, j, url);
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
            // on passe à l'enregistrement de l'image suivante s'il y en a une
		        j++;
		      }
		      // on passe au pi suivant du groupe (s'il y en a un)
		      temp = temp.next;
		    }
		  }
		  if(ether.manager.POPUP) {
			dijit.showTooltip('<img src="images/ok.png" /> Session sauvegardée !', 'menuETHER', ['below']);
			setTimeout("dijit.hideTooltip('menuETHER')", 2000);
		  }
		});
		socket.on('data encode response', function(i, j, url, data, ext){
		  if(MA_CLE!=undefined) {
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
		  }
		});
	};
	
	//lors du click sur "déconnexion" :
	dijit.byId("menuDeconnexion").onClick = function() {
		//on demande confirmation
		dijit.byId('alerteDeconnexion').show();
	}
	
	//lorsque l'utilisateur clique sur le bouton "ok" de la boite de dialogue "etes vous sur de vous déconnecter"
	on(dijit.byId("boutonDeconnexionOK"), "click", function(event) {
		dijit.byId('alerteDeconnexion').hide();
		//on coupe la connexion avec le serveur (ça permet au serveur de prévenir tous les autres participants que l'on s'est déconnecté)
		socket.disconnect();
		//on masque l'application et on affiche la page de chargement initiale
		changementPage("application", "chargement");
		//après 2 secondes (le temps d'afficher complétement la page de chargement), on actualise la page pour réinitialiser complétement ETHER
		setTimeout("location.reload()", 2000);
	});
	
	//lorsque l'utilisateur clique sur le bouton "annuler" de la boite de dialogue "etes vous sur de vous déconnecter"
	on(dijit.byId("boutonDeconnexionAnnuler"), "click", function(event) {
		dijit.byId('alerteDeconnexion').hide();
	});
	
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
			handleUploadFiles(dijit.byId("uploadPhotos")._files, 0, 0);
		} else {
			dojo.addClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur');
			setTimeout("dojo.removeClass(dijit.byId('uploadPhotos').domNode,'uploadPhotosErreur')", 2000);
			if(ether.manager.POPUP) {
				dijit.showTooltip('<img src="images/erreur.png" /> Impossible d\'uploader des photos car votre navigateur n\'est pas compatible', 'uploadPhotos', ['below']);
				setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
			}
		}
	};
	
	//si l'upload a échoué (parce que le fichier n'était pas une photo), on affiche une pop-up (pendant 2 secondes) pour en informer le participant
	socket.on('upload echoue', function() {
		if(MA_CLE!=undefined) {
			if(ether.manager.POPUP) {
				dijit.showTooltip('<img src="images/erreur.png" /> Echec de l\'upload : le fichier n\'est pas une image ! (les extensions acceptées sont .png, .jpg et .gif)', 'uploadPhotos', ['below']);
				setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
			}
		}
	});	
	
	//si l'upload a réussi, on ajoute la photo (dans un post-it) à l'application et on affiche (pendant 2 secondes) une pop-up de confirmation
	socket.on('upload reussi', function(nom, chemin, top, left) {
		if(MA_CLE!=undefined) {
			if(ether.manager.POPUP) {
				dijit.showTooltip('<img src="images/ok.png" /> Upload de l\'image réussi !', 'uploadPhotos', ['below']);
				setTimeout("dijit.hideTooltip('uploadPhotos')", 2000);
			}
			ether.manager.createImagePostIt(chemin, nom, top, left);
		}
	});
	
	
	
	/* ---------------------------------------------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui se produisent sur l'onglet "Ajouter un participant" de la barre de menu  --	
	   --------------------------------------------------------------------------------------------------------------------------------- */
	
	//lors de la sélection d'un participant dans le FilteringSelect, on crée la dropzone qui lui correspond et on l'ajoute à l'application
	dijit.byId("selectionParticipants").onChange = function(value) {
		if(value!='') {
			ether.manager.createDZ(value);
			dijit.byId("selectionParticipants").set('value', '');
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
	
	//lors du click sur "Afficher la barre de menu" :
	dijit.byId("menuParametresBarreMenu").onChange = function(checked) {
		domStyle.set(dojo.byId('afficherMenu1'), "display", "block");
		domStyle.set(dojo.byId('afficherMenu2'), "display", "block");
		domStyle.set(dojo.byId('applicationTop'), "display", "none");
		dijit.byId('application').resize();
	}
	
	//lors du click sur "Autoriser les pop-up d'information" :
	dijit.byId("menuParametresPopup").onChange = function(checked) {
		ether.manager.POPUP = checked;
	}
	
	//lors du click sur "Supprimer les post-it lors de l'envoi" :
	dijit.byId("menuParametresSuppressionPostit").onChange = function(checked) {
		ether.manager.SUPPRESSION_POSTIT = checked;
	}
	
	
	
	/* ---------------------------------------------------------------------------------------------
	   --  on associe une fonction sur les flèches qui permettent de réafficher la barre de menu  --	
	   --------------------------------------------------------------------------------------------- */
	
	//lors du click sur la flèche de gauche :
	on(dojo.byId('afficherMenu1'), tap, function() {
		dijit.byId("menuParametresBarreMenu").checked = true;
		dijit.byId("menuParametresBarreMenu")._applyAttributes();
		domStyle.set(dojo.byId('afficherMenu1'), "display", "none");
		domStyle.set(dojo.byId('afficherMenu2'), "display", "none");
		domStyle.set(dojo.byId('applicationTop'), "display", "");
		dijit.byId('application').resize();
	});
	
	//lors du click sur la flèche de droite :
	on(dojo.byId('afficherMenu2'), tap, function() {
		dijit.byId("menuParametresBarreMenu").checked = true;
		dijit.byId("menuParametresBarreMenu")._applyAttributes();
		domStyle.set(dojo.byId('afficherMenu1'), "display", "none");
		domStyle.set(dojo.byId('afficherMenu2'), "display", "none");
		domStyle.set(dojo.byId('applicationTop'), "display", "");
		dijit.byId('application').resize();
	});
	
	
	
	/* --------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui concernent les autres participants  --	
	   -------------------------------------------------------------------------------------------- */
	
	//lors de la connexion d'un nouveau participant, on l'ajoute à la variable javascript et au widget FilteringSelect
	socket.on('connexion nouveau participant', function(participant, key) {
		if(MA_CLE!=undefined) {
			ether.manager.participants[key] = participant;
			ether.manager.ajoutParticipant(key);
			majParticipants();
			if(ether.manager.POPUP) {
				dijit.showTooltip('Connexion de ' + ether.manager.participants[key].prenom + ' ' +ether.manager.participants[key].nom, 'selectionParticipants', ['below']);
				setTimeout("dijit.hideTooltip('selectionParticipants')", 2000);
			}
		}
	});
	
	//lors de la déconnexion d'un nouveau participant, on le retire de la variable javascript et du widget FilteringSelect
	socket.on('deconnexion participant', function(key) {
		if(MA_CLE!=undefined) {
			if(ether.manager.POPUP) {
				dijit.showTooltip('Déconnexion de ' + ether.manager.participants[key].prenom + ' ' + ether.manager.participants[key].nom, 'selectionParticipants', ['below']);
				setTimeout("dijit.hideTooltip('selectionParticipants')", 2000);
			}
			ether.manager.deleteParticipant(key);
			majParticipants();
		}
	});
	
	
	
	/* ------------------------------------------------------------------------------------------
	   --  on associe une fonction à tous les évènements qui concernent l'échange de messages  --	
	   ------------------------------------------------------------------------------------------ */
	
	//lorsqu'un envoi de post-it a été correctement reçu par le serveur, on confirme à l'expéditeur en faisant devenir verte la dropzone associée à l'envoi
	socket.on('envoi reussi', function(msg_id) {
		if(MA_CLE!=undefined) {
			dojo.forEach(ether.manager.DZList.concat([ether.manager.DZCorbeille,ether.manager.DZTous,ether.manager.DZAnim,ether.manager.DZNonAnim]), function(item){
				if(item.dernierEnvoye==msg_id)
					item.envoiReussi();
			});
		}
	});
	
	//si par contre il y a une erreur de transmission, on le précise à l'expéditeur en faisant devenir rouge la dropzone associée à l'envoi
	socket.on('envoi echoue', function(msg_id) {
		if(MA_CLE!=undefined) {
			dojo.forEach(this.manager.DZList.concat([this.manager.DZCorbeille,this.manager.DZTous,this.manager.DZAnim,this.manager.DZNonAnim]), function(item){
				if(item.dernierEnvoye==msg_id)
					item.envoiEchoue();
			});
		}
	});
	
	//lorsqu'un post-it est reçu, on le recrée, puis on l'affiche sur l'écran à côté de la dropzone de l'emmeteur
	socket.on('reception', function(message, cle_emetteur) {
		if(MA_CLE==undefined) {
			socket.emit('resultat reception', message.id, cle_emetteur, false);
		} else {
			ether.manager.receptionPostIt(eval("(" + message.contenu + ")" ), cle_emetteur);
			socket.emit('resultat reception', message.id, cle_emetteur, true);
		}
	});
	
	
	
	/* ----------------------------------------------------------------------
	   --  on prend en compte le "double-tap" pour la création de post-it  --	
	   ---------------------------------------------------------------------- */
	
	//lorsqu'on double tap dans le corps de l'application, on crée un éditeur de post-it qui va nous permettre d'écrire du texte
	on(dojo.byId("applicationCenterContainer"), tap.doubletap, function(event) {
		new ether.editeur(dojo.byId("applicationCenter"), event.target.tapX, event.target.tapY);
	});
	
	
	
	/* ----------------------------------------------------------------------------------------
	   --  on prend en compte le drag and drop d'objets depuis le bureau vers le navigateur  --	
	   ---------------------------------------------------------------------------------------- */
	
	//on prend en compte le "drag" des objets depuis le bureau partout au-dessus de l'application
	dojo.byId("application").addEventListener('dragover', handleDragOver, false);
	//on prend en compte le "drop" des objets depuis le bureau partout au-dessus de l'application
	dojo.byId("application").addEventListener('drop', handleFileSelect, false);
	
	
	
	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------
	   --  en cas d'erreurs répétées, on suppose que l'on est déconnecté du serveur et l'on afficher une boite de diaogue à l'écran pour en informer l'utilisateur  --	
	   --------------------------------------------------------------------------------------------------------------------------------------------------------------- */
	
	//lorsque l'utilisateur clique sur le bouton "ok" de la boite de dialogue
	on(dijit.byId("boutonReconnexionOK"), "click", function(event) {
		dijit.byId('alerteRuptureConnexion').hide();
		//on coupe la connexion avec le serveur (ça permet au serveur de prévenir tous les autres participants que l'on s'est déconnecté)
		socket.disconnect();
		//on masque l'application et on affiche la page de chargement initiale
		changementPage("application", "chargement");
		//après 2 secondes (le temps d'afficher complétement la page de chargement), on actualise la page pour réinitialiser complétement ETHER
		setTimeout("location.reload()", 2000);
	});
	
	//lorsque l'utilisateur clique sur le bouton "annuler" de la boite de dialogue
	on(dijit.byId("boutonReconnexionAnnuler"), "click", function(event) {
		dijit.byId('alerteRuptureConnexion').hide();
	});
});



/* -----------------------------------------------------------------------------------------------------------------
   --  on déclare en global deux variables indispensables à l'instanciation du module dijit.form.FilteringSelect  --	
   ----------------------------------------------------------------------------------------------------------------- */
   
var dataParticipants = { identifier:'value', label:'name', items: [] };
var listeParticipants = new dojo.data.ItemFileReadStore({ data: dataParticipants });