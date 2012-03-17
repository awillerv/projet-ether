
// classe PostIt d�riv�e de Moveable avec la valeur ajout�e qui va bien
//remplacer ether.manager.PIList par la liste priv�e de soi-m�me
define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll','dojo/dnd/Mover','dojo/dnd/Moveable','dojo/dom-construct',"dojo/NodeList-dom","dojo/NodeList-html","ether/tap","ether/postItGroup"], function(declare){

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

			 this.host.onMove(this, {l: Math.max(m.l + e.pageX,pimb.l), t:Math.max( m.t + e.pageY,pimb.t)}, e);
			
			
		     //this.host.onMove(this, {l: Math.max(m.l,e.pageX-positionOffset.l), t: Math.max(m.t,e.pageY-positionOffset.t)});
			
		}
	
	});
	
	declare("ether.ResizeHandle",dojo.dnd.Moveable,
	{
		
		constructor : function(node,params)
		{	
			this.parentPostItNode=params.parentPostItNode;
		},
		
		onMoved:function(mover)
		{
			var newPosition=dojo.marginBox(this.node);
			//console.log(newPosition);
			var postItMB=dojo.marginBox(this.parentPostItNode);
			dojo.style(this.parentPostItNode,{width: newPosition.l-postItMB.l+"px",height: (newPosition.t-postItMB.t)+"px"});
			
			for (var  i  = 0;  i<this.parentPostItNode.children.length;  i++)  {
				var child = this.parentPostItNode.children[i];
				dojo.style(child,{width: newPosition.l-postItMB.l+"px",height: (newPosition.t-postItMB.t)+"px"});
  }
		}
	
	
	});

	return declare("ether.postIt",dojo.dnd.Moveable, 
	{
	
		isPostIt:true,		//artefact pour un test
		constructor: function(node, params,manager,editable)
		{	this.manager=manager;
			this.resizeHandleNode=dojo.place('<div class="resizeHandle" style="visibility:visible"></div>', this.manager.PISpawnZone, "last");
			var PostItMB=dojo.marginBox(this.node)
			dojo.style(this.resizeHandleNode,{top:PostItMB.t+PostItMB.h+"px",left:PostItMB.l+PostItMB.w+"px",overflow:"hidden"});
			this.resizeHandle=new ether.ResizeHandle(this.resizeHandleNode,{mover:ether.ResizeHandleMover,parentPostItNode:this.node});
			
			dojo.connect(this.node, dojox.gesture.tap.doubletap, this, function(e)
			{
				e.stopPropagation();
				if(editable)
				{
				if(!this.edition)		
				{
				if(!this.manager.EditionEnCours)
				{
				this.startEdit();
				}
				}
				else
				{
				this.stopEdit();
				}
			}});
			
		},
		

		onMoved: function(mover){
								var MB=dojo.marginBox(this.node);
								
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
								
								dojo.style(this.resizeHandleNode, {top:MB.t+MB.h+"px",left:MB.l+MB.w+"px"});
		
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
									dojo.some(this.manager.DZList.concat([this.manager.DZCorbeille,this.manager.DZTous,this.manager.DZAnim,this.manager.DZNonAnim]).concat(PIList), function(item){
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
									},
									
		supprimer: function(){
							this.destroy();
							
							dojo.destroy(this.resizeHandleNode);
							dojo.destroy(this.node);
							},
		
		startEdit:function()
		{	this.edition=true;
			this.toggleResize();
			dojo.toggleClass(this.node,"no-border");
			this.manager.EditionEnCours=true;
			this.manager.PIEdite=this;
			var text=dojo.attr(dojo.query('> *', this.node)[0],"innerHTML");
			console.log(text);
			dojo.attr(this.node,"innerHTML",'<textarea id="ZoneEditionPI">'+text+'</textarea>');
			textarea= document.getElementById("ZoneEditionPI");
			textarea.focus();
			if(textarea.setSelectionRange) {
				var len = textarea.value.length * 2;
				textarea.setSelectionRange(len, len);
											}
				else
				{
				textarea.value = textarea.value;
				}

		},
		
		stopEdit:function()
		{
			var text=dojo.attr(dojo.query('> *', this.node)[0],"value");
			dojo.attr(this.node,"innerHTML",'<div style="overflow:hidden">'+text+'</div>');
			this.edition=false;
			this.manager.EditionEnCours=false;
			this.manager.PIEdite=null;
			this.toggleResize();
			
		},
		getContent:function()
		{	
			var objet= {
				type:"postIt",
				child:(this.node.innerHTML),
				style:dojo.attr(this.node,"style"),
				class:dojo.attr(this.node,"class")
				};
				
			return JSON.stringify(objet);
		},
		toggleResize :function()
		{	
			dojo.toggleClass(this.resizeHandleNode,"hidden");
		},
		
		contient : function(posX, posY)		//teste si la position donn�e est contenue dans la surface de l'objet (pour d�tecter le hover, par exemple)
		{	var position= dojo.position(this.node);
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
		
		promote: function()		//promeut un post-it en postItGroup : cr�ation d'un postItGroup avec le m�me node puis autodestruction.
		{	this.resizeHandle.destroy();
			dojo.destroy(this.resizeHandleNode);
			
			var group=ether.postItGroup(this.node,{},this.manager);
			
			this.destroy();
			return group;
			
			
		}
		
	}
		
		);});