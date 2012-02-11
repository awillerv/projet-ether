
// classe PostIt dérivée de Moveable avec la valeur ajoutée qui va bien

define(['dojo/_base/declare','dojo/query','dojo/dnd/moveable','dojo/dom-construct'], function(declare){
	return declare("ether.PostIt",dojo.dnd.Moveable, 
	{
		constructor: function(node, params, targetList)
		{
			if(targetList instanceof Array)
			{
				this.targetList=targetList;
			}
			else
			{
				this.targetList= new Array(targetList);
			}
		
		},
		
		addCible: function(cible)
		{
			this.targetList=this.targetList.push(cible);
		},
		
		onMoved: function(mover){
								dojo.forEach(this.targetList, function(item){
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
									dojo.some(this.targetList, function(item){
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
							}
	}
		
		)
		;});