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
			this.croix=null;
			this.container=container;
			this.refreshNode();
		},
		

		onDrop : function(objet)		//le comportement en cas de drop d'un objet acceptable. Cette fonction a l'heur d'avoir accès à l'objet ainsi déposé, comme il se doit. On peut accéder à la chaine à transmettre avec objet.getContent();
		{	

			this.manager.closeDZBar();

			this.onStopHover();
			if(objet.isPostIt)
			{
				var resultat = this.manager.sendPI(objet, [this.client]);
				if(resultat==undefined) {
					this.envoiEchoue();
				} else {
					this.dernierEnvoye = resultat;
				}

			}
			return true;
		},
		
		onMoveStart:function(mover)
		{
			this.ghostMB=dojo.marginBox(this.node);
		},
		
		onHover:function()
		{
		dojo.addClass(this.node,'cibleHover');
		},
		
		onStopHover:function()
		{
		dojo.removeClass(this.node,'cibleHover');
		},
		
		
		onMoved:function(mover)
		{		var MB=dojo.position(this.node);
				var ContainerList=new Array();
				
				
				
				dojo.forEach(this.manager.DZContainerList.concat([this.manager.DZCorbeille]), function(item)
																		{
																			if(item.contient(MB.x,MB.y))
																			{if(item.isDZContainer)
																				{
																				dojo.addClass(item.node,'hover');
																				return true;
																				}
																			else{dojo.addClass(item.node,'cibleHover')
																				}
																			}
																			else 
																			{	dojo.removeClass(item.node,'cibleHover');
																				dojo.removeClass(item.node,'hover');
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
		},
		
		toggleDelete:function()
		{
			if(!this.croix)
				{
				var MB=dojo.marginBox(this.node);
				this.croix=dojo.create("img",{src:"images/erreur.png"},this.node);
				dojo.style(this.croix, {top:0+"px",left:MB.w-12+"px",position:"absolute"});
				
				dojo.connect(this.croix, dojox.gesture.tap,this,function(e)
				{	
					this.toggleDelete();
					this.manager.droppedDZU(this);
				});
				}
				
				else
				{
				dojo.destroy(this.croix);
				this.croix=null;
				}
		}
		
		
		});
	
	
	
	
	//****************************************************
	
	
		return declare("ether.DZContainer",null,
		{	isDZContainer:true,
			constructor: function(node,position,manager,DZ)
			{	this.position=position;
				this.node=node;
				this.timestart=0;
				this.croix=null;
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
			
			this.manager.closeDZBar();
			
			
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
						var MB=dojo.marginBox(this.node);
						
						var MBObjet=dojo.marginBox(objet.node);
						objet.container.DZ=null;
						objet.container=this;
						dojo.place(this.DZ.node,this.node,"first");
						dojo.style(this.DZ.node,{position:"relative",left:MB.w/2-MBObjet.w/2+"px",top:0+"px"});
						this.DZ.refreshNode();
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
			dojo.removeClass(this.node,"hover");
				if(this.open)
				{
					this.hideBar();
				}
				
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
					
					this.manager.prepareAndShowDZBar(this, true);
				}
			},
			
			toggleDelete:function()
			{
				if(!this.croix)
				{
				var MB=dojo.marginBox(this.node);
				this.croix=dojo.create("img",{src:"images/erreur.png"},this.node);
				dojo.style(this.croix, {top:0+"px",left:MB.w-12+"px",position:"absolute"});
				
				dojo.connect(this.croix, dojox.gesture.tap,this,function(e)
				{
					this.manager.deleteDZ(this.DZ);
				});
				}
				
				else
				{
				this.manager.closeDZBar();
				dojo.destroy(this.croix);
				this.croix=null;
				
				}
			}
			
	
			

					
					
				
		});
});