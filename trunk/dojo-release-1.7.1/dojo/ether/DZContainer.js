define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll','ether/CibleEnvoi','ether/tap'],
	function(declare)
	{
	
		declare("ether.DZUnitaire",ether.cibleEnvoi,
		{
		constructor:function(node,params,container,clientKeyList,manager)
		{	
		}
		
		
		});
	
	
	
	
	
	
	
		return declare("ether.DZContainer",null,
		{
			constructor: function(node,position,manager,DZ)
			{	this.position=position;
				this.node=node;
				this.timestart=0;
				this.onDisplay=false;
				this.manager=manager;
				this.open=false;
				if(DZ)
				{
					this.DZ=DZ;		
				}
				dojo.connect(this.node,"dojox.gesture.doubletap",this, function(e)
				{	alert('yep');
					if(!this.open)
					{
						this.displayBar();
					}
					else
					{
						this.hideBar();
					}
				});
				
				return this;
			},
			
			contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
				{	var position= dojo.position(this.node);
					return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));	
				},
			onDrop:function(objet)
			{		
			
			if(this.timestart)
				{
					
					this.timestart=null;
				}
			
			
			dojo.removeClass(this.node,"hover");
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
				
				else
				{
					if(objet.isPostIt)
					{
						this.DZ.onDrop(objet);		
					}
				}
			},
			
			onHover:function()
			{	
				if(!this.open)
					{
						this.displayBar();
					}
				dojo.addClass(this.node,"hover");
			},
			onStopHover:function()
			{
				if(this.open)
				{
					this.hideBar();
				}
				dojo.removeClass(this.node,"hover");
			},
			isFree:function()
			{
				return (!this.DZ)
			},
			
			displayBar:function()
			{	
				if(this.DZ&&!this.open)
				{
				
				this.open=true;
				this.manager.prepareAndShowDZBar(this);
				}
			},
			
			hideBar:function()
			{
				this.manager.closeDZBar();
			}

					
					
				
		});
});