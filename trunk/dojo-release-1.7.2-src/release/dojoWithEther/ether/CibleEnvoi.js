//>>built
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
				dojo.place(this.node,this.container.node,"last");
				
			}
			if(clientKeyList instanceof Array) {
				this.clientKeyList=clientKeyList;
			} else {
				this.clientKeyList.push(clientKeyList);
			}
			this.refreshNode();
			
			
			
			
		},
		
		
		onHover : function(postit) 		//fonction qui est appel�e lorsque un objet droppable est envoy�. On aura l'amabilit� de lui passer ledit objet. Ne pas h�siter � le surcharger.
		{
			this.container.displayBar();
			dojo.addClass(this.node,'cibleHover');		//c'est le plus simple pour le marquage graphique de la possibilit� de drop, non?
			
		},
		
		onStopHover : function(postit)
		{
			dojo.removeClass(this.node,'cibleHover');
		},
		
		onDrop : function(objet)		//le comportement en cas de drop d'un objet acceptable. Cette fonction a l'heur d'avoir acc�s � l'objet ainsi d�pos�, comme il se doit. On peut acc�der � la chaine � transmettre avec objet.getContent();
		{	
			this.manager.closeDZBar();
			this.onStopHover();
			if(objet.isPostIt)
			{
				var resultat = this.manager.sendPI(objet, this.clientKeyList);
				if(resultat==undefined) {
					this.envoiEchoue();
				} else {
					this.dernierEnvoye = resultat;
				}
			}
			return true;
		},
		
		addClient:function(clientKey)
		{
			
			if(dojo.indexOf(this.clientKeyList,clientKey)==-1)		//on �vite de cr�er des duplications...
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
		if(this.connect)
		{
		dojo.disconnect(this.connect);
		}
		this.connect=dojo.connect(this.node, dojox.gesture.tap.doubletap,this,function(e)
			{	
			
			if(this.container)
				{
				this.container.toggleDisplay();
				}
			e.stopPropagation();
			}
			
			);
		
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
			var MB=dojo.marginBox(this.container.node);
			var MBObjet=dojo.marginBox(this.node);
			
			this.node.innerHTML='<img src="'+imagepath+'"/><p>'+descText+'</p>';
			//dojo.style(this.node,{width:"60px",height:"60px"});
			dojo.style(this.node,{position:"relative",left:MB.w/2-MBObjet.w/2+"px",top:0+"px"});
		},
		
		onMoveStart:function(mover)
		{
			
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
				
				dojo.forEach(ContainerList.concat([this.manager.DZCorbeille]), function(item)
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
				if(this.container.contient(MB.x,MB.y))
				{
					dojo.addClass(this.container.node,"hover");
				}
				else
				{
					dojo.removeClass(this.container.node,"hover");
				}
					

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
						var MB=dojo.marginBox(this.container.node);
						var MBObjet=dojo.marginBox(this.node);
					dojo.style(this.node,{position:"relative",left:MB.w/2-MBObjet.w/2+"px",top:0+"px"});
						
					}
					
					dojo.forEach(this.manager.DZContainerList,function(item)
						{
							dojo.removeClass(item.node,"hover");
						});
		},
		
		
		contient : function(posX, posY)		//teste si la position donn�e est contenue dans la surface de l'objet (pour d�tecter le hover, par exemple)
		{
			var position = dojo.position(this.node);
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
		},
		
		supprimer: function()
		{	
			this.container.DZ=null;
			this.manager.closeDZBar();
			this.destroy();
			
		},
		
		envoiReussi: function() {
			dojo.addClass(this.node,'cibleEnvoiReussi');
			var id = dojo.attr(this.node, 'id');
			setTimeout("dojo.removeClass(dojo.byId('"+id+"'), 'cibleEnvoiReussi')",2000);
		},
		
		envoiEchoue: function() {
			dojo.addClass(this.node,'cibleEnvoiEchoue');
			var id = dojo.attr(this.node, 'id');
			setTimeout("dojo.removeClass(dojo.byId('"+id+"'), 'cibleEnvoiEchoue')",2000);
			if(this.manager.POPUP) {
				dijit.showTooltip('<img src="images/erreur.png" /> Erreur lors de l\'envoi du post-it', id, ['above','below']);
				setTimeout("dijit.hideTooltip('"+id+"')", 2000);
			}
		},
		
		reception: function () {
			dojo.addClass(this.node,'cibleReception');
			var id = dojo.attr(this.node, 'id');
			setTimeout("dojo.removeClass(dojo.byId('"+id+"'), 'cibleReception')",2000);
		},
		
		hasClient:function(key) {
			return (dojo.indexOf(this.clientKeyList,key)!=-1);
		}
	});
});