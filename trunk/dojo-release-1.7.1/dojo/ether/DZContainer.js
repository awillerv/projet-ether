define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll'],
	function(declare)
	{
		return declare("ether.DZContainer",null,
		{
			constructor: function(node,manager,DZ)
			{
				this.node=node;
				this.manager=manager;
				if(DZ)
				{
					this.DZ=DZ;		
				}
				return this;
			},
			
			contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
				{	var position= dojo.position(this.node);
					return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));	
				},
			onDrop:function(objet)
			{	dojo.removeClass(this.node,"hover");
				if(objet.isCibleEnvoi)
				{
					if(this.DZ)
					{
						this.manager.fusionDZ(objet,this.DZ);
					}
					else
					{
						this.DZ=objet;
						MB=dojo.marginBox(this.node);
						MBObjet=dojo.marginBox(objet.node);
						objet.container.DZ=null;
						objet.container=this;
						dojo.place(this.DZ.node,this.node,"first");
						dojo.style(this.DZ.node,{position:"absolute",left:MB.l+MB.w/2-MBObjet.w/2+"px",top:MB.t+MB.h/2-MBObjet.h/2+"px"});
					}
				}
			},
			
			onHover:function()
			{
				dojo.addClass(this.node,"hover");
			},
			onStopHover:function()
			{
				dojo.removeClass(this.node,"hover");
			},
			isFree:function()
			{
				return (!this.DZ)
			}
		});
});