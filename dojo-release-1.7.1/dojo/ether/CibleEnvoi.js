require(['dojo/_base/declare','dojo/dom-construct','dojo/dom-geometry','dojo/dnd/Moveable'], function(declare)
{
	return declare("ether.cibleEnvoi", dojo.dnd.Moveable,
	{	isCibleEnvoi:true,

		constructor: function(node,params,container,clientKeyList,manager)
		{	

		this.manager=manager;
		if(container)
		{
		container.DZ=this;
		this.container=container;
		}
			if(clientKeyList instanceof Array)
			{
				this.clientKeyList=clientKeyList;
			}
			else
			{
				this.clientKeyList=new Array(clientKeyList);
			}
			
			this.refreshNode();
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
			ether.manager.sendPI(postit, this.clientKeyList);
		},
		
		contient : function(posX, posY)		//teste si la position donn�e est contenue dans la surface de l'objet (pour d�tecter le hover, par exemple)
		{	var position= dojo.position(this.node);
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
			
		},
		
		addClient:function(clientKey)
		{

			if(dojo.indexOf(this.clientKeyList,clientKey)==-1)		//on �vite de cr�er des duplications...
			{
				this.clientKeyList.push(clientKey);
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
			dojo.style(this.node,{width:"80px",height:"80px"});
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
		}
		
	});
});