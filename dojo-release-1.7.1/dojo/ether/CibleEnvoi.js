require(['dojo/_base/declare','dojo/dom-construct','dojo/dom-geometry','dojo/dnd/Moveable','ether/Cible'], function(declare)
{
	return declare("ether.cibleEnvoi", dojo.dnd.Moveable,
	{	isCibleEnvoi:true,

		constructor: function(node,params,container,clientKeyList,manager)
		{	this.clientKeyList=new Array();
			this.manager=manager;
			if(container) {
				container.DZ=this;
				
				this.container=container;
			}
			if(clientKeyList instanceof Array) {
				this.clientKeyList=clientKeyList;
			} else {
				this.clientKeyList.push(clientKeyList);
			}
			this.refreshNode();
			
			dojo.connect(this.node, dojox.gesture.tap.doubletap,this,function(e)
			{	
			
			if(this.container)
				{
				this.container.toggleDisplay();
				}
			e.stopPropagation();
			}
			
			);
			
		},
		
		
		onHover : function(postit) 		//fonction qui est appelée lorsque un objet droppable est envoyé. On aura l'amabilité de lui passer ledit objet. Ne pas hésiter à le surcharger.
		{
			this.container.displayBar();
			dojo.addClass(this.node,'cibleHover');		//c'est le plus simple pour le marquage graphique de la possibilité de drop, non?
			
		},
		
		onStopHover : function(postit)
		{
			dojo.removeClass(this.node,'cibleHover');
		},
		
		onDrop : function(postit)		//le comportement en cas de drop d'un objet acceptable. Cette fonction a l'heur d'avoir accès à l'objet ainsi déposé, comme il se doit. On peut accéder à la chaine à transmettre avec objet.getContent();
		{
			this.manager.closeDZBar();
			if(!this.manager.sendPI(postit, this.clientKeyList)) {
				this.envoiEchoue();
			}
		},
		
		addClient:function(clientKey)
		{
			
			if(dojo.indexOf(this.clientKeyList,clientKey)==-1)		//on évite de créer des duplications...
			{
				this.clientKeyList.push(clientKey);
				return true;
			}
			else
			{
				return false;
			}
				
		},
		removeClient:function(clientKey)
		{	
			
			var aux=dojo.indexOf(this.clientKeyList,clientKey);
			if(aux!=-1)
			{	
				this.clientKeyList.splice(aux,1);
			}

			
		},
		
		refreshNode:function()		//une fonction qui calcule l'apparence du node en fonction de la clientList
		{
		
		if(this.clientKeyList.length==1)
		{imagepath='images/participant.png'; 

		descText = this.manager.participants[this.clientKeyList[0]].prenom+' '+this.manager.participants[this.clientKeyList[0]].nom;}
		else
		{
		descText=this.clientKeyList.length+" personnes";
		if(this.clientKeyList.length==2)
		{imagepath='images/groupe2.png';}
		else{imagepath='images/groupe3.png';}
		}
			this.node.innerHTML='<img src="'+imagepath+'"/><p>'+descText+'</p>';
			dojo.style(this.node,{width:"60px",height:"60px"});
		},
		
		onMoveStart:function(mover)
		{
			this.ghostMB=dojo.marginBox(this.node);
		},
		onMoved:function(mover)
		{		var MB=dojo.position(this.node);
				var ContainerList=new Array();
				
				for(var i=0; i<this.manager.DZContainerList.length;i++)
				{
				if(!(this.manager.DZContainerList[i]==this.container))
				{
										ContainerList.push(this.manager.DZContainerList[i]);
				}
				}
				
				dojo.some(ContainerList.concat([this.manager.DZCorbeille]), function(item)
																		{
																			if(item.contient(MB.x,MB.y))
																			{	
																				item.onHover();
																				return true;
																			}
																			else 
																			{	item.onStopHover();
																				return false;
																			}
													
																		}
																												,this);
					

		},
		onMoveStop:function(mover)
		{		var MB=dojo.position(this.node);
				var ContainerList=new Array();
				//this.manager.closeDZBar();
				//console.log(mover.marginBox);
				for(var i=0; i<this.manager.DZContainerList.length;i++)
				{
				if(!(this.manager.DZContainerList[i]==this.container))
				{
										ContainerList.push(this.manager.DZContainerList[i]);
				}
				}
				
				if(!(dojo.some(ContainerList.concat([this.manager.DZCorbeille]), function(item)
																		{
																			if(item.contient(MB.x,MB.y))
																			{	this.manager.closeDZBar();
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
		
		supprimer: function()
		{
			this.container.DZ=null;
			this.destroy();
		}
		
	});
});