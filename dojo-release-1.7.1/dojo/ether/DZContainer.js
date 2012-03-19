define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll','ether/CibleEnvoi','ether/tap'],
	function(declare)
	{
	
		declare("ether.DZUnitaire",dojo.dnd.Moveable,
		{
		
		constructor:function(node,params,container,clientKey,manager)
		{	this.isDZU=true;
			this.client=clientKey;
			this.manager=manager;
			this.ghostMB=null;
			this.container=container;
			this.refreshNode();
		},
		
		onDrop : function(postit)		//le comportement en cas de drop d'un objet acceptable. Cette fonction a l'heur d'avoir accès à l'objet ainsi déposé, comme il se doit. On peut accéder à la chaine à transmettre avec objet.getContent();
		{
			this.manager.closeDZBar();
			if(!this.manager.sendPI(postit, this.clientKeyList) && POPUP) {
				this.envoiEchoue();
			}
		},
		
		onMoveStart:function(mover)
		{
			this.ghostMB=dojo.marginBox(this.node);
		},
		
		
		onMoved:function(mover)
		{		var MB=dojo.position(this.node);
				var ContainerList=new Array();
				
				
				
				dojo.some(this.manager.DZContainerList.concat([this.manager.DZCorbeille]), function(item)
																		{
																			if(item.contient(MB.x,MB.y))
																			{	
																				//item.onHover();
																				return true;
																			}
																			else 
																			{	//item.onStopHover();
																				return false;
																			}
													
																		}
																												,this);
					

		},
		onMoveStop:function(mover)
		{		var MB=dojo.position(this.node);
				var ContainerList=new Array();
			
				
				if(!(dojo.some(this.manager.DZContainerList.concat([this.manager.DZCorbeille]), function(item)
																		{
																			if(item.contient(MB.x,MB.y))
																			{	
																				item.onDrop(this);
																				return true;
																			}
																			else 
																			{
																				return false;
																			}
													
																		}
																												,this)
					))
					{
						dojo.marginBox(this.node,this.ghostMB);
					}
		},
		
		contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
		{
			var position = dojo.position(this.node);
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
		},
		
		refreshNode:function()		
		{
		
		imagepath='images/participant.png'; 

		descText = this.manager.participants[this.client].prenom+' '+this.manager.participants[this.client].nom;

		this.node.innerHTML='<img src="'+imagepath+'"/><p>'+descText+'</p>';
		dojo.style(this.node,{width:"60px",height:"60px"});
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
				
				return this;
			},
			
			contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
				{	var position= dojo.position(this.node);
					return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));	
				},
			onDrop:function(objet)
			{		
			

			
			
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
					else
						if(objet.isDZU)
						{	
						this.manager.droppedDZU(objet,this);
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
			},
			
			toggleDisplay:function()
			{
				if(this.open)
				{
					this.hideBar();
				}
				else
				{
					this.displayBar();
				}
			}
			
	
			

					
					
				
		});
});