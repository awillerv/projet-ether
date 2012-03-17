define(['dojo/_base/declare','dojo/query','dojo/dnd/autoscroll','dojo/dnd/Mover','dojo/dnd/Moveable','dojo/dom-construct',"dojo/NodeList-dom","dojo/NodeList-html","ether/tap"], 
function(declare){
	return declare("ether.postItGroup",dojo.dnd.Moveable,
	{
		constructor:function(node,params,manager)
		{	this.currentZIndexRange={min:0,max:node.children.length};//on augmente au fur et à mesure qu'on rajoute des éléments...
			this.pixelOffset=7;					  //le décalage haut-gauche en pixels du coin de chaque élément empilé.
			this.manager=manager;
			var MB=dojo.marginBox(node);
			dojo.style(this.node.children[0],{zIndex : 0,position:"absolute"});
			dojo.style(this.node,{height:MB.h+"px",width:MB.w+"px"});
			this.isPostItGroup=true;
		},
		
		addNode:function(postItNodeList,position)		//ajouter un noeud "top"(par défaut) ou "bottom" pour le second paramètre
		{
			for(var n=0;n<postItNodeList.length;n++)
			{
			console.log(n);
			var node=postItNodeList[n];		
			
			if(!position||position=="top")
			{
			
			
			for(var i=0;i<this.node.children.length;  i++)		//on déplace chaque autre enfant de l'offset
			{
				var MB =dojo.marginBox(this.node.children[i]);
				
				dojo.style(this.node.children[i],{top:MB.t+this.pixelOffset+"px", left:MB.l+this.pixelOffset+"px"});
			}
			
			//puis on place le notre
			dojo.place(node, this.node, "first");
			
			dojo.style(node, {"zIndex" :this.currentZIndexRange.max, position:"absolute"});
			
			this.currentZIndexRange.max++;
			}
			else
			{
			if(position=="bottom")
				{
				dojo.place(node, this.node, "last");
				dojo.style(node, {zIndex: this.currentZIndexRange.min, left:(this.node.children.length-1)*this.pixelOffset+"px",top:(this.node.children.length-1)*this.pixelOffset+"px"});
				this.currentZIndexRange.min--;
				}
				
				
			else {console.log('position incorrecte demandée');}
			}
			}
			
				//dans tous les cas, il faut corriger la taille du conteneur. La hauteur et la largeur sont données par le bottom-right le plus grand parmis tous les noeuds (avec un petit ajout...)
			var h=0;
			var w=0;
			 for(var g=0;g<this.node.children.length;g++)
			 {	var MB=dojo.marginBox(this.node.children[g]);
				h=Math.max(h,MB.h+i*this.pixelOffset);
				w=Math.max(w,MB.w+i*this.pixelOffset);
				console.log(h);
				console.log(w);
			 }
			 dojo.style(this.node,{height:h+"px",width: w+"px"});
		},
		
		contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
		{	var position= dojo.position(this.node);
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
			
		},
		
		getContent :function()
		{
			var objet= {
				type:"postItGroup",
				child:this.node.innerHTML,
				style:dojo.attr(this.node,"style"),
				};
				
			return JSON.stringify(objet);
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
		onHover:function()
		{
		},
		onStopHover:function(){},
		
		onDrop:function(objet)
		{
		if(objet.isPostIt||objet.isPostItGroup)
			{	
				this.manager.fusionPI(dojo.attr(this.node,"id"),dojo.attr(objet.node,"id"));
			}
		}
		
	});

});