require(['dojo/_base/declare', 'dojo/_base/connect', 'dojo/dom-construct', 'dojo/dom-geometry', 'dojo/dom-style', 'dojo/dom-attr', 'dijit/form/Textarea', 'dijit/form/Button', 'ether/tap'], function(declare, connect, domConstruct, domGeom, domStyle, domAttr, Textarea, Button, tap)
{
	return declare("ether.editeur", null,
	{
	  statics: { counter: 0, couleur1: 'rgb(255,255,255)', couleur2: 'rgb(255,255,128)', couleur3: 'rgb(166,238,187)', couleur4: 'rgb(255,128,128)', couleur5: 'rgb(153,217,234)' },
	  
	  // couleur du post it à éditer
	  couleurFond: 'rgb(255,255,255)',
	  
	  /* ---------------------------- création d'un nouveau post it ---------------------------- */
	  constructor: function(node, x, y, h, w, ancienTexte){
		
		var edition = false;

		if(node.isPostIt) {
			edition = true;
			var postIt = node;
			node = dojo.byId("applicationCenter");
			var position = domGeom.position(postIt.node.children[0]);
			h = position.h;
			w = position.w;
			leftCorner = position.x-domGeom.position(node).x;
			topCorner = position.y-domGeom.position(node).y-30;
			if(w<160)
				leftCorner -= (160-w)/2;
			this.couleurFond = domStyle.get(postIt.node.children[0], 'backgroundColor');
			var ancienTexte = postIt.node.children[0].innerHTML.replace(/<br>/g,'\r\n');
		} else {
			if(x==undefined)
				x=5;
			if(y==undefined)
				y=0;
			if(h==undefined)
				h=53;
			if(w==undefined)
				w=160;
				
			var positionParent = domGeom.position(dojo.byId("applicationCenterContainer"));
			var leftCorner = x-positionParent.x-w/2;
			if(leftCorner<positionParent.x)
				leftCorner = 5;
			if(leftCorner+w>positionParent.x+positionParent.w)
				leftCorner = positionParent.w-w-5;
			var topCorner = y-positionParent.y-h/2-25;
			if(topCorner<positionParent.y)
				topCorner = 0;
			if(topCorner+h+70>positionParent.y+positionParent.h)
				topCorner = positionParent.h-h-70;
		}

		// div principal
	    if(domAttr.get(node,"id")=="menuEcrirePostit") {
		    var div = domConstruct.create('div', { id: 'editeur'+this.statics.counter }, node);
		  } else {
	      var div = domConstruct.create('div', { id: 'editeur'+this.statics.counter, style: { position: 'absolute', left: leftCorner+'px', top: topCorner+'px' }}, node);
	    }
		
	    // div de chaque partie, les carrés de couleurs, la textarea puis les boutons 'ok' et 'annuler'
	    var divCouleurs = domConstruct.create('div', { style: { margin: 'auto', width: '160px' } }, div);
	    var divTextarea = domConstruct.create('div', { style: { clear: 'both', margin: 'auto' } }, div);
	    var divBoutons = domConstruct.create('div', { style: { textAlign: 'center' } }, div);
	      
	    /* ------- on peuple divCouleurs ------- */
		var carre1 = domConstruct.create('div', { style: { backgroundColor: this.statics.couleur1}, class: 'carreCouleur couleur1' }, divCouleurs);
	    var carre2 = domConstruct.create('div', { style: { backgroundColor: this.statics.couleur2}, class: 'carreCouleur couleur2' }, divCouleurs);
	    var carre3 = domConstruct.create('div', { style: { backgroundColor: this.statics.couleur3}, class: 'carreCouleur couleur3' }, divCouleurs);
	    var carre4 = domConstruct.create('div', { style: { backgroundColor: this.statics.couleur4}, class: 'carreCouleur couleur4' }, divCouleurs);
		var carre5 = domConstruct.create('div', { style: { backgroundColor: this.statics.couleur5}, class: 'carreCouleur couleur5' }, divCouleurs);
	      
	    /* ------- on peuple divTextarea ------- */
	    domConstruct.create('textarea', { id: 'editeurTextarea_'+this.statics.counter }, divTextarea);
		new Textarea({ name: 'editeurTextarea_'+this.statics.counter, style: { fontFamily: 'arial', textAlign: 'center' } }, 'editeurTextarea_'+this.statics.counter);
		var textarea = dojo.byId('editeurTextarea_'+this.statics.counter);
		domStyle.set(textarea, { height: h+"px", width: w+"px", backgroundColor: this.couleurFond, padding: '0px', margin: 'auto'});
		domStyle.set(divTextarea, { width: w+"px" });
		textarea.focus();
		if(ancienTexte!=undefined) {
			textarea.value = ancienTexte;
			if(textarea.setSelectionRange) {
				var len = textarea.value.length * 2;
				textarea.setSelectionRange(len, len);
			} else
			textarea.value = textarea.value;
		}
	    
	    /* ------- on peuple divBoutons ------- */
	    domConstruct.create('input', { type: 'button', value: 'OK', id: 'editeurOK_'+this.statics.counter }, divBoutons);
		var boutonOK = new Button({ label: "OK", onClick: function() { 
			var texte = domAttr.get(textarea, 'value').replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
			if(texte!='') {
				if(edition) {
					postIt.node.children[0].innerHTML = texte;
					domStyle.set(postIt.node.children[0], { 'backgroundColor': domStyle.get(textarea, 'backgroundColor'), 'height': domGeom.position(textarea).h+'px', 'width': domGeom.position(textarea).w+'px' });
					domStyle.set(postIt.node, 'display', '');
					postIt.updatePositionResizeHandler();
					domStyle.set(postIt.resizeHandle.node, 'display', '');
				} else {
				//créer un post-it
					var postitJSON = { texte: texte, couleur: domStyle.get(textarea, 'backgroundColor'), top: domGeom.position(textarea).y, left: domGeom.position(textarea).x, hauteur: domGeom.position(textarea).h, largeur: domGeom.position(textarea).w };
					ether.manager.createPI(postitJSON);
				}
				domConstruct.destroy(div);
			}
		} }, 'editeurOK_'+this.statics.counter);
	    domConstruct.create('input', { type: 'button', value: 'Annuler', id: 'editeurAnnuler_'+this.statics.counter }, divBoutons);
		var boutonAnnuler = new Button({ label: "Annuler", onClick: function(){
			if(edition) {
				domStyle.set(postIt.node, "display", "");
				domStyle.set(postIt.resizeHandle.node, "display", "");
			}
			domConstruct.destroy(div);
		} }, 'editeurAnnuler_'+this.statics.counter);

	    /* ------- on ajoute les événements/actions à divCouleurs------- */
		connect.connect(div, tap.doubletap, this, function(e){
	      e.stopPropagation();
	    });
	    connect.connect(carre1, tap, this, function(e){
	      this.couleurFond = domStyle.get(carre1, 'backgroundColor');
		    domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
	    connect.connect(carre2, tap, this, function(e){
	      this.couleurFond = domStyle.get(carre2, 'backgroundColor');
		    domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
	    connect.connect(carre3, tap, this, function(e){
	      this.couleurFond = domStyle.get(carre3, 'backgroundColor');
		    domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
	    connect.connect(carre4, tap, this, function(e){
	      this.couleurFond = domStyle.get(carre4, 'backgroundColor');
		    domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
		  connect.connect(carre5, tap, this, function(e){
	      this.couleurFond = domStyle.get(carre5, 'backgroundColor');
		    domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
		
		this.statics.counter = this.statics.counter+1;
	  }
	});

});
