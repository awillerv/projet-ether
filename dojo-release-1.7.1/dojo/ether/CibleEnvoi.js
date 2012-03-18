require(['dojo/_base/declare','dojo/dom-geometry','dojo/dnd/Moveable'], function(declare)
{
	return declare("ether.cibleEnvoi", dojo.dnd.Moveable,
	{
		constructor: function(node,clientKeyList)
		{
			this.node = dojo.byId(node);
			if(clientKeyList instanceof Array)
			{
				this.clientKeyList=clientKeyList;
			}
			else
			{
				this.clientKeyList=new Array(clientKeyList);
			}
		},
		onHover : function(postit) 		//fonction qui est appel�e lorsque un objet droppable est envoy�. On aura l'amabilit� de lui passer ledit objet. Ne pas h�siter � le surcharger.
		{

			dojo.addClass(this.node,'cible-hover');		//c'est le plus simple pour le marquage graphique de la possibilit� de drop, non?
			
		},
		
		onStopHover : function(postit)
		{
			
			dojo.removeClass(this.node,'cible-hover');
		},
		
		onDrop : function(postit)		//le comportement en cas de drop d'un objet acceptable. Cette fonction a l'heur d'avoir acc�s � l'objet ainsi d�pos�, comme il se doit. On peut acc�der � la chaine � transmettre avec objet.getContent();
		{
			alert('drop d�tect�');
		},
		
		contient : function(posX, posY)		//teste si la position donn�e est contenue dans la surface de l'objet (pour d�tecter le hover, par exemple)
		{	var position= dojo.position(this.node);
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
			
		},
		
		addClient:function(clientKeyList)
		{
			var clientArray;
			if(clientKeyList instanceof Array)
			{
				clientArray=clientKeyList;
			}
			else
			{
				clientArray=new Array(clientKeyList);
			}
			
			var i=0;
			while (i<=clientArray.length)
			{
				if(dojo.indexOf(clientArray[i])!=-1)		//on �vite de cr�er des duplications...
				{
					this.clientKeyList.push(clientArray[i]);
				}
				i++;
			}		
		},
		removeClient:function(clientKeyList)
		{	
			var clientArray;
			if(clientKeyList instanceof Array)
			{
				clientArray=clientKeyList;
			}
			else
			{
				clientArray=new Array(clientKeyList);
			}
			var i=0;
			while(i<=clientArray.length)
			{	
				var aux=dojo.indexOf(this.clientKeyList,clientArray[i]);
				if(aux!=-1)
				{	
					this.clientKeyList.splice(aux,1);
				}
				i++;
			}
		}
		
	});
});