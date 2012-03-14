

require(['dojo/_base/declare', 'dojo/_base/connect', 'dojo/dom-construct', 'dojo/dom-geometry', 'dijit/form/Textarea', 'dijit/form/button'], function(declare)
{
	return declare("ether.editeur", null,
	{
	  // couleur du post it à éditer
	  couleur: '#FFFFFF',
	  // texte du post it à éditer
	  texte: '',
	  
	  /* ---------------------------- création d'un nouveau post it ---------------------------- */
	  constructor: function(node, x, y, h, w){
	    // div principal
	    var div = dojo.create('div', { style: { height: h, width: w, position: absolute, left: x, top: y}}, node);
	    
	    // div de chaque partie, les carrés de couleurs, la textarea puis les boutons 'ok' et 'annuler'
	    var divCouleurs = dojo.create('div', { style: { height: h/5, width: w, position: relative, left: 0, top: 0}}, div);
	    var divTextarea = dojo.create('div', { style: { height: 3*h/5, width: w, position: relative, left: 0, top: h/5}}, div);
	    var divBoutons = dojo.create('div', { style: { height: h/5, width: w, position: relative, left: 0, top: 4*h/5}}, div);
	    
	    /* ------- on peuple divCouleurs ------- */
	    // blanc
	    var blanc = dojo.create('div', { style: { height: h/5, width: w/4, position: relative, left: 0, top: 0, background-color: #FFFFFF}}, divCouleurs);
	    // rouge
	    var rouge = dojo.create('div', { style: { height: h/5, width: w/4, position: relative, left: w/4, top: 0, background-color: #FF0000}}, divCouleurs);
	    // vert
	    var vert = dojo.create('div', { style: { height: h/5, width: w/4, position: relative, left: 2*w/4, top: 0, background-color: #00CC00}}, divCouleurs);
	    // jaune
	    var jaune = dojo.create('div', { style: { height: h/5, width: w/4, position: relative, left: 3*w/4, top: 0, background-color: #FFFF00}}, divCouleurs);
	    
	    /* ------- on peuple divTextarea ------- */
	    var textarea = dojo.create('textarea', { style: { height: 3*h/5, width: w, position: relative, left: 0, top: 0}}, divTextarea);
	    
	    /* ------- on peuple divBoutons ------- */
	    var ok = dojo.create('input', { type: 'button', value: 'OK', style: { height: h/5, width: w/5, position: relative, left: w/5, top: 0}}, divBoutons);
	    var annuler = dojo.create('input', { type: 'button', value: 'Annuler', style: { height: h/5, width: w/5, position: relative, left: 3*w/5, top: 0}}, divBoutons);
	    
	    /* ------- on ajoute les événements/actions à divCouleurs------- */
	    // blanc
	    dojo.connect(blanc, dojox.gesture.tap, function(e){
	      couleur = '#FFFFFF';
	    });
	    // rouge
	    dojo.connect(rouge, dojox.gesture.tap, function(e){
	      couleur = '#FF0000';
	    });
	    // vert
	    dojo.connect(vert, dojox.gesture.tap, function(e){
	      couleur = '#00CC00';
	    });
	    // jaune
	    dojo.connect(jaune, dojox.gesture.tap, function(e){
	      couleur = '#FFFF00';
	    });
	    
	    /* ------- on ajoute les événements/actions à divBoutons------- */
	    dojo.connect(ok, dojox.gesture.tap, function(e){
	      texte = dojo.attr(textarea, 'innerHTML');
	    });
	    dojo.connect(annuler, dojox.gesture.tap, function(e){
	      this.destroy();
	    });
	  },
	  
	  /* ---------------------------- édition d'un post it existant ---------------------------- */
	  constructor: function(postit){
	    
	  },
	  
	  /* ---------------------------- getters et setters ---------------------------- */
	  getTexte: function(){
	    return this.texte;
	  },
	  getCouleur: function(){
	    return this.couleur;
	  },
	  setTexte: function(nvTexte){
	    this.texte = nvTexte;
	  },
	  setCouleur: function(nvCouleur){
	    this.couleur = nvCouleur;
	  },
	  
	  /* ---------------------------- destructeurs ---------------------------- */
	  destroy: function(){
	    dojo.destroy(this);
	  },
	});

});
