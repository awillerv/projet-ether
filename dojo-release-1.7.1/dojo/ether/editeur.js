

require(['dojo/_base/declare', 'dojo/_base/connect', 'dojo/dom-construct', 'dojo/dom-geometry', 'dojo/dom-style', 'dojo/dom-attr', 'dojox/gesture/tap', 'dijit/form/Textarea', 'dijit/form/Button'], function(declare, connect, domConstruct, domGeom, domStyle, domAttr, tap, Textarea, Button)
{
	return declare("ether.editeur", null,
	{
	  statics: { counter: 0 },
	  
	  // couleur du post it à éditer
	  couleurFond: 'rgb(255,255,255)',
	  couleur1: 'rgb(255,255,255)',
	  couleur2: 'rgb(255,255,128)',
	  couleur3: 'rgb(166,238,187)',
	  couleur4: 'rgb(255,128,128)',
	  couleur5: 'rgb(153,217,234)',
	  // texte du post it à éditer
	  texte: '',
	  
	  /* ---------------------------- création d'un nouveau post it ---------------------------- */
	  constructor: function(node, x, y, h, w, couleurs){

		if(x==undefined)
			x=5;
		if(y==undefined)
			y=0;
		if(h==undefined)
			h=53;
		if(w==undefined)
			w=160;
	    if(couleurs!=undefined) {
			this.couleur1 = couleurs.couleur1;
			this.couleur2 = couleurs.couleur2;
			this.couleur3 = couleurs.couleur3;
			this.couleur4 = couleurs.couleur4;
			this.couleur5 = couleurs.couleur5;
		}
		
		var positionParent = domGeom.position(node);
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

		 // div principal
		if(domAttr.get(node,"id")=="menuEcrirePostit") {
			var div = domConstruct.create('div', { id: 'editeur'+this.statics.counter }, node);
		} else {
	   		var div = domConstruct.create('div', { id: 'editeur'+this.statics.counter, style: { position: 'absolute', left: leftCorner+'px', top: topCorner+'px' }}, node);
	    }
		
	    // div de chaque partie, les carrés de couleurs, la textarea puis les boutons 'ok' et 'annuler'
	    var divCouleurs = domConstruct.create('div', { }, div);
	    var divTextarea = domConstruct.create('div', { style: { clear: 'both' } }, div);
	    var divBoutons = domConstruct.create('div', { style: { textAlign: 'center' } }, div);
	    
	    /* ------- on peuple divCouleurs ------- */
	    var carre1 = domConstruct.create('div', { style: { backgroundColor: this.couleur1}, class: 'carreCouleur' }, divCouleurs);
	    var carre2 = domConstruct.create('div', { style: { backgroundColor: this.couleur2}, class: 'carreCouleur' }, divCouleurs);
	    var carre3 = domConstruct.create('div', { style: { backgroundColor: this.couleur3}, class: 'carreCouleur' }, divCouleurs);
	    var carre4 = domConstruct.create('div', { style: { backgroundColor: this.couleur4}, class: 'carreCouleur' }, divCouleurs);
		var carre5 = domConstruct.create('div', { style: { backgroundColor: this.couleur5}, class: 'carreCouleur' }, divCouleurs);
	    
	    /* ------- on peuple divTextarea ------- */
	    domConstruct.create('textarea', { id: 'editeurTextarea_'+this.statics.counter }, divTextarea);
		new Textarea({ name: 'editeurTextarea_'+this.statics.counter }, 'editeurTextarea_'+this.statics.counter);
		var textarea = dojo.byId('editeurTextarea_'+this.statics.counter);
		domStyle.set(textarea, { height: h+"px", width: w+"px", backgroundColor: this.couleurFond});
		textarea.focus();
	    
	    /* ------- on peuple divBoutons ------- */
	    domConstruct.create('input', { type: 'button', value: 'OK', id: 'editeurOK_'+this.statics.counter }, divBoutons);
		var boutonOK = new Button({ label: "OK", onClick: function() { 
			var texte = domAttr.get(textarea, 'value');
			if(texte!='') {
				//créer un post-it (en attendant, écriture en console des paramètres)
				console.log('texte :'+texte);
				console.log('couleur :'+domStyle.get(textarea, 'backgroundColor'));
				console.log('hauteur : '+domGeom.position(textarea).h);
			}
		} }, 'editeurOK_'+this.statics.counter);
	    domConstruct.create('input', { type: 'button', value: 'Annuler', id: 'editeurAnnuler_'+this.statics.counter }, divBoutons);
		var boutonAnnuler = new Button({ label: "Annuler", onClick: function(){ domConstruct.destroy(div); } }, 'editeurAnnuler_'+this.statics.counter);
	    
	    /* ------- on ajoute les événements/actions à divCouleurs------- */
	    connect.connect(carre1, tap, this, function(e){
	      this.couleurFond = this.couleur1;
		  domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
	    connect.connect(carre2, tap, this, function(e){
	      this.couleurFond = this.couleur2;
		  domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
	    connect.connect(carre3, tap, this, function(e){
	      this.couleurFond = this.couleur3;
		  domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
	    connect.connect(carre4, tap, this, function(e){
	      this.couleurFond = this.couleur4;
		  domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
		connect.connect(carre5, tap, this, function(e){
	      this.couleurFond = this.couleur5;
		  domStyle.set(textarea, 'backgroundColor', this.couleurFond);
	    });
		
		this.statics.counter = this.statics.counter+1;
	  }
	});

});
