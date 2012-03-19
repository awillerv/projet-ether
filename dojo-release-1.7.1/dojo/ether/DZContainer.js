define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll'],
	function(declare)
	{
	
		declare("ether.DZUnitaire",dojo.dnd.Moveable,
		{
		constructor:function(node,params, manager,client)
		{	this.node=node;
			this.manager=manager;
			this.client=client;
			this.refreshNode();
		},
		
		refreshNode:function()		//une fonction qui calcule l'apparence du node en fonction de la clientList
		{
		imagepath='images/participant.png'; 

		descText = this.manager.participants[this.client].prenom+' '+this.manager.participants[this.client].nom;
		
			this.node.innerHTML='<img src="'+imagepath+'"/><p>'+descText+'</p>';
			dojo.style(this.node,{width:"80px",height:"80px"});
			
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
			},
			
			onHover:function()
			{	
				if(!this.timestart)
				{	
					this.timestart=new Date().getTime();
				}
				else
				{	if(((new Date().getTime()-this.timestart)>500)&&!this.onDisplay)
					{
						
						this.displayBar();
					}
				}
				dojo.addClass(this.node,"hover");
			},
			onStopHover:function()
			{
				if(this.timestart)
				{
					
					this.timestart=null;
				}
				dojo.removeClass(this.node,"hover");
			},
			isFree:function()
			{
				return (!this.DZ)
			},
			
			displayBar:function()
			{
					var bar=this.manager.DZBar;
					this.onDisplay=true;
					for(var i=0;i<this.DZ.clientKeyList.length;i++)
					{	
						var node=dojo.create('div',{style:{float:"left",position:'absolute'}});
						var DZ=new ether.DZUnitaire(node,{},this.manager,this.DZ.clientKeyList[i]);
						DZ.refreshNode();
						
						dojo.place(DZ.node, bar, "last");
					}

					
					
			}	
		});
});