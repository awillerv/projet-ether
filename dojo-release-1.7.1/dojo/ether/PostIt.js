
// classe PostIt dérivée de Moveable avec la valeur ajoutée qui va bien
//remplacer ether.manager.PIList par la liste privée de soi-même
define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll','dojo/dnd/Mover','dojo/dnd/Moveable','dojo/dom-construct',"dojo/NodeList-dom","dojo/NodeList-html","ether/tap","ether/postItGroup","ether/editeur"], function(declare){


		declare("ether.ResizeHandleMover",dojo.dnd.Mover,
	{	
		constructor:function()
		{
		},
		
		onMouseMove:function(e)
		{
			 dojo.dnd.autoScroll(e);
			 var m = this.marginBox;
			 var pimb=dojo.marginBox(this.host.parentPostItNode);
			if(this.host.isPostItImage) {
				var left = Math.max(m.l + e.pageX,pimb.l+20);
				var hauteur = (left+this.host.offset-pimb.l)*this.host.ratio;
				var top = pimb.t+hauteur-this.host.offset;
				this.host.onMove(this, {l: left, t: top }, e);
			} else {
				this.host.onMove(this, {l: Math.max(m.l + e.pageX,pimb.l+20), t:Math.max(m.t + e.pageY,pimb.t+20)}, e);
			}

		}
	
	});
	
	declare("ether.ResizeHandle",dojo.dnd.Moveable,
	{
		
		constructor : function(node,params)
		{	
			this.parentPostItNode=params.parentPostItNode;
			this.isPostItImage=params.isPostItImage;
			this.ratio=params.ratio;
			this.offset=params.offset;
		},
		
		onMoved:function(mover)
		{
			var newPosition=dojo.marginBox(this.node);
			var postItMB=dojo.marginBox(this.parentPostItNode);
			
			for (var  i  = 0;  i<this.parentPostItNode.children.length;  i++)  {
				var child = this.parentPostItNode.children[i];
				var childMB=dojo.marginBox(child);
				dojo.style(child,{width: newPosition.l+newPosition.w-postItMB.l-childMB.l+"px",height: newPosition.t-postItMB.t+newPosition.h-childMB.t+"px"});
			}
		}
	
	
	});
	

	return declare("ether.postIt",dojo.dnd.Moveable, 
	{
	
		isPostIt:true,		//artefact pour un test
		constructor: function(node, params,manager)
		{	
			this.isPostItImage = false;
			if(this.node.children[0].tagName=="IMG") {
				this.isPostItImage = true;
				var imageMB = dojo.position(this.node.children[0]);
				this.ratio = imageMB.h/imageMB.w;
			}
			this.offset = 13;
			this.manager=manager;
			this.resizeHandleNode=dojo.place('<div class="resizeHandle" style="visibility:visible; z-index:11"></div>', this.manager.PISpawnZone, "last");
			this.updatePositionResizeHandler();
			this.resizeHandle=new ether.ResizeHandle(this.resizeHandleNode,{mover:ether.ResizeHandleMover,parentPostItNode:this.node,isPostItImage:this.isPostItImage,ratio:this.ratio,offset:this.offset});
			
			dojo.connect(this.node, dojox.gesture.tap.doubletap, this, function(e)
			{
				e.stopPropagation();
				if(!this.isPostItImage)
				{
					this.startEdit();
				}
			});
			
		},
		

		onMoved: function(mover){
								var MB=dojo.marginBox(this.node);
								var childMB=dojo.marginBox(this.node.children[0]);
								
								var PIList=new Array();
								for(var i=0; i<this.manager.PIList.length;i++)
								{
									if(this.manager.PIList[i]==this)
									{
										PIList.push(this.manager.PIList[i]);
									}
								}
								
								dojo.forEach(this.manager.DZList.concat([this.manager.DZCorbeille,this.manager.DZTous,this.manager.DZAnim,this.manager.DZNonAnim]).concat(PIList), function(item){
																			if(item.contient(MB.l-mover.marginBox.l,MB.t-mover.marginBox.t))
																			{	
																				item.onHover(this);

																			}
																			else 
																			{
																				item.onStopHover(this);
																			}
																		}
											,this);
								dojo.style(this.resizeHandleNode, {top:MB.t+childMB.h+childMB.t-this.offset+"px",left:MB.l+childMB.w+childMB.l-this.offset+"px"});
		
								},
		
		onMoveStop: function(mover){
									var MB=dojo.marginBox(this.node);
									var PIList=new Array();
									for(var i=0; i<this.manager.PIList.length;i++)
									{
									if(!(this.manager.PIList[i]==this))
									{
										PIList.push(this.manager.PIList[i]);
									}
									}
								//	console.log(PIList);
									dojo.some(this.manager.DZList.concat([this.manager.DZCorbeille,this.manager.DZTous,this.manager.DZAnim,this.manager.DZNonAnim]).concat(PIList).concat(this.manager.DZBarCurrentDZ), function(item){
																			if(item.contient(MB.l-mover.marginBox.l,MB.t-mover.marginBox.t))
																			{
																				item.onDrop(this);
																				return true;
																			}
																			else 
																			{
																				return false;
																			}
													
																		}
											,this);
											
									this.manager.closeDZBar();
									},
									
		supprimer: function(){
							dojo.destroy(this.resizeHandleNode);
							this.destroy();
							},
		
		startEdit:function()
		{	
			new ether.editeur(this);
			dojo.style(this.node, 'display', 'none');
			dojo.style(this.resizeHandle.node, 'display', 'none');
		},
		getContent:function()
		{	
			var objet= {
				type:"postIt",
				
				innerHTML:(this.node.innerHTML),
				style:dojo.attr(this.node,"style"),
				class:dojo.attr(this.node,"class")
				};
				
			return JSON.stringify(objet);
		},
		toggleResize :function()
		{	
			dojo.toggleClass(this.resizeHandleNode,"hidden");
		},
		
		contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
		{	var position= dojo.position(this.node.children[0]);
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
			
		},
		
		onDrop: function(objet)
		{	console.log(objet);
			if(objet.isPostIt||objet.isPostItGroup)
			{	
				this.manager.fusionPI(dojo.attr(this.node,"id"),dojo.attr(objet.node,"id"));
			}
		},
		onHover:function()
		{
		
		},
		onStopHover:function()
		{
		
		},
		
		promote: function()		//promeut un post-it en postItGroup : création d'un postItGroup avec le même node puis autodestruction.
		{	this.resizeHandle.destroy();
			dojo.destroy(this.resizeHandleNode);
			
			var group=ether.postItGroup(this.node,{},this.manager);
			
			this.destroy();
			return group;
			
			
		},
		updatePositionResizeHandler: function()
		{
			var PostItMB=dojo.marginBox(this.node);
			var childMB=dojo.marginBox(this.node.children[0]);
			dojo.style(this.resizeHandleNode,{position:"absolute",top:PostItMB.t+childMB.t+childMB.h-this.offset+"px",left:PostItMB.l+childMB.w+childMB.l-this.offset+"px"});
		}
		
	}
		
		);});
