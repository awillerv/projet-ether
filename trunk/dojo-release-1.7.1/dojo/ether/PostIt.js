
// classe PostIt dérivée de Moveable avec la valeur ajoutée qui va bien

define(['dojo/_base/declare','dojo/query','dojo/dnd/moveable','dojo/dom-construct',"dojo/NodeList-dom","dojo/NodeList-html","ether/tap"], function(declare){

	return declare("ether.postIt",dojo.dnd.Moveable, 
	{
		isPostIt:true,		//artefact pour un test
		constructor: function(node, params,editable)
		{
			
			

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
			
		},
		getContent:function()
		{
		return dojo.attr(this.node,"innerHTML");
		}
	}
		
		)
		;});