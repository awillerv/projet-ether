

require(['dojo/_base/declare', 'ether/tap', 'dojo/dom-geometry','dojo/dnd/Moveable'], function(declare, tap)
{
	return declare("ether.cible", null, 
	{
		constructor: function(node,manager)
		{
			this.node = dojo.byId(node);
			this.manager=manager;
			this.dernierEnvoye = null;
			dojo.connect(this.node, tap.doubletap, this, this.onDoubleClick);
		},
		
		onHover : function(postit) 		//fonction qui est appelée lorsque un objet droppable est envoyé. On aura l'amabilité de lui passer ledit objet. Ne pas hésiter à le surcharger.
		{
			dojo.addClass(this.node,'cibleHover');		//c'est le plus simple pour le marquage graphique de la possibilité de drop, non?	
		},
		
		onStopHover : function(postit)
		{
			dojo.removeClass(this.node,'cibleHover');
		},
		
		onDrop : function(objet)		//le comportement en cas de drop d'un objet acceptable. Cette fonction a l'heur d'avoir accès à l'objet ainsi déposé, comme il se doit. Aucun comportement par défaut.
		{
			this.onStopHover();
			if(objet.isPostIt) {
				this.dernierEnvoye = objet.getContent();
			}
		},
		
		onDoubleClick : function(event)
		{
			event.stopPropagation();
		},
		
		contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
		{
			var position = dojo.position(this.node);
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
		},
		
		envoiReussi : function()
		{
			dojo.addClass(this.node,'cibleEnvoiReussi');
			var id = dojo.attr(this.node, 'id');
			setTimeout("dojo.removeClass(dojo.byId('"+id+"'), 'cibleEnvoiReussi')",2000);
		},
		
		envoiEchoue : function()
		{
			dojo.addClass(this.node,'cibleEnvoiEchoue');
			var id = dojo.attr(this.node, 'id');
			setTimeout("dojo.removeClass(dojo.byId('"+id+"'), 'cibleEnvoiEchoue')",2000);
			if(this.manager.POPUP) {
				dijit.showTooltip('<img src="images/erreur.png" /> Erreur lors de l\'envoi du post-it', id, ['above','below']);
				setTimeout("dijit.hideTooltip('"+id+"')", 2000);
			}
		}
	});
});