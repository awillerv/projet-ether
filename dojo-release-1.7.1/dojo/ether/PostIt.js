
// classe PostIt dérivée de Moveable avec la valeur ajoutée qui va bien

define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll','dojo/dnd/Mover','dojo/dnd/Moveable','dojo/dom-construct',"dojo/NodeList-dom","dojo/NodeList-html","ether/tap"], function(declare){
console.log(dojo);
	var a= declare("ether.ResizeHandleMover",dojo.dnd.Mover,
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
		constructor: function(node, params,editable)
		{
			this.resizeHandleNode=dojo.place('<div class="resizeHandle" style="visibility:visible"></div>', ether.manager.PISpawnZone, "last");
			var PostItMB=dojo.marginBox(this.node)
			dojo.style(this.resizeHandleNode,{top:PostItMB.t+PostItMB.h+5+"px",left:PostItMB.l+PostItMB.w+5+"px",overflow:"hidden"});
			this.resizeHandle=new ether.ResizeHandle(this.resizeHandleNode,{mover:ether.ResizeHandleMover,parentPostItNode:this.node});
			
			dojo.connect(this.node, dojox.gesture.tap.doubletap, this, function(e)
			{
				e.stopPropagation();
				if(editable)
				{
				if(!this.edition)		
				{
				if(!ether.manager.EditionEnCours)
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
								dojo.forEach(ether.manager.DZList.concat([ether.manager.DZCorbeille,ether.manager.DZTous,ether.manager.DZAnim,ether.manager.DZNonAnim]), function(item){
																			if(item.contient(dojo.marginBox(this.node).l-mover.marginBox.l,dojo.marginBox(this.node).t-mover.marginBox.t))
																			{	
																				item.onHover(this);

																			}
																			else 
																			{
																				item.onStopHover(this);
																			}
																		}
											,this);
		
								},
		
		onMoveStop: function(mover){
									dojo.some(ether.manager.DZList.concat([ether.manager.DZCorbeille,ether.manager.DZTous,ether.manager.DZAnim,ether.manager.DZNonAnim]), function(item){
																			if(item.contient(dojo.marginBox(this.node).l-mover.marginBox.l,dojo.marginBox(this.node).t-mover.marginBox.t))
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
									
		destroy: function(){
							dojo.destroy(this.node);
							},
		
		startEdit:function()
		{	this.edition=true;
			this.toggleResize();
			dojo.toggleClass(this.node,"no-border");
			ether.manager.EditionEnCours=true;
			ether.manager.PIEdite=this;
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
			dojo.attr(this.node,"innerHTML",'<span>'+text+'</span>');
			this.edition=false;
			ether.manager.EditionEnCours=false;
			ether.manager.PIEdite=null;
			this.toggleResize();
			
		},
		getContent:function()
		{
		return dojo.attr(this.node,"innerHTML");
		},
		toggleResize :function()
		{	
			dojo.toggleClass(this.resizeHandleNode,"hidden");
		}
	}
		
		);});