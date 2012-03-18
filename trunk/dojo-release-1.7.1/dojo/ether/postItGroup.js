define(['dojo/_base/declare','dojo/query','ether/tap','dojo/dnd/autoscroll','dojo/dnd/Mover','dojo/dnd/Moveable','dojo/dom-construct',"dojo/NodeList-dom","dojo/NodeList-html","ether/tap"], 
function(declare){


	
	
	
	declare("ether.postItGroupFragment",dojo.dnd.Moveable,
	{
		constructor:function(node, params, parent, manager)
		{
			this.manager=manager;
			this.parent=parent;
			console.log(this);
		},
		
		
		onMoveStop:function(mover)
		{
			var MB=dojo.marginBox(this.node);
			var parentMB=dojo.marginBox(this.parent.node);
			if(MB.t+MB.h<0||MB.l+MB.w<0||MB.l>parentMB.w||MB.t>parentMB.t)
			{
				this.parent.removeFragment(this);
				this.manager.wrapAndRegisterPI(this);		//obligé de ruser... je détester ça
			}
		},
		
		disable:function()
		{
			this.destroy();		//retire le comportement de Moveable
		}
		
		
		
	});
	


	return declare("ether.postItGroup",dojo.dnd.Moveable,
	{
		constructor:function(node,params,manager)
		{	this.currentZIndexRange={min:0,max:node.children.length};//on augmente au fur et à mesure qu'on rajoute des éléments...
			this.pixelOffset=7;					  //le décalage haut-gauche en pixels du coin de chaque élément empilé.
			this.manager=manager;
			this.fragments=new Array();
			var MB=dojo.marginBox(node);
			dojo.style(this.node.children[0],{zIndex : 0,position:"absolute"});
			dojo.style(this.node,{height:MB.h+"px",width:MB.w+"px"});
			this.isPostItGroup=true;
			console.log(ether);
			
			dojo.connect(this.node, dojox.gesture.tap.doubletap,this,function(e)
			{	if(this.estEtale)
					{
					this.rassembler();
					e.stopPropagation();
					}
			else
				{
				this.etaler(e.target.tapX, e.target.tapY);
				e.stopPropagation();
				}
			});
		},
		
		addNode:function(node,position)		//ajouter un noeud "top"(par défaut) ou "bottom" pour le second paramètre
		{	
			if(!position||position=="top")
			{
			
			

			
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
				//il faut a présent recalculer la position des fils
			
				for(var i=0;i<this.node.children.length;i++)
				{
					var node=this.node.children[i];
					dojo.style(node, {top:this.pixelOffset*(dojo.getStyle(node,"zIndex"))+"px",left:this.pixelOffset*(dojo.getStyle(node,"zIndex"))+"px"});
				}
				
			
				//dans tous les cas, il faut corriger la taille du conteneur. La hauteur et la largeur sont données par le bottom-right le plus grand parmis tous les noeuds (avec un petit ajout...)
			var h=0;
			var w=0;
			 for(var g=0;g<this.node.children.length;g++)
			 {	var MB=dojo.marginBox(this.node.children[g]);
				h=Math.max(h,MB.h+MB.t);
				w=Math.max(w,MB.w+MB.l);

			 }
			 dojo.style(this.node,{height:h+"px",width: w+"px"});
		},
		
		contient : function(posX, posY)		//teste si la position donnée est contenue dans la surface de l'objet (pour détecter le hover, par exemple)
		{	
			var position= dojo.position(this.node); 
			return (posX>=position.x&&posX<=(position.x+position.w)&&posY>=position.y&&posY<=(position.y+position.h));
			
		},
		
		getContent :function()
		{
			var objet= {
				type:"postItGroup",
				innerHTML:this.node.innerHTML,
				style:dojo.attr(this.node,"style"),
				};
				
			return JSON.stringify(objet);
		},
		
		onMoved: function(mover){
								var MB=dojo.marginBox(this.node);
								
								var PIList=new Array();
								for(var i=0; i<this.manager.PIList.length;i++)
								{
									if(!(this.manager.PIList[i]==this))
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
									//console.log(this.manager.DZList.concat([this.manager.DZCorbeille,this.manager.DZTous,this.manager.DZAnim,this.manager.DZNonAnim]).concat(PIList));
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
		},
		
		supprimer:function()
		{
		
		},
		
		
		etaler:function(centreX,centreY)
		{
			//calcul de la taille de la zone conteneur : la base est 200px, + le maximum de la hauteur/largeur de chaque enfant
			var h=0;
			var w=0;
			 for(var g=0;g<this.node.children.length;g++)
			 {	var MB=dojo.marginBox(this.node.children[g]);
				h=Math.max(h,MB.h+MB.t);
				w=Math.max(w,MB.w+MB.l);
			 }
			 var dimensionX= 200+w;
			 var dimensionY=200+h;
		
			 dojo.style(this.node,{top:centreX-dimensionX/2+"px", left:centreY-dimensionY/2+"px",width:dimensionX+"px",height:dimensionY+"px",backgroundColor:"black",opacity:0.7});
			 var conteneurMB=dojo.marginBox(this.node);
			 for(var n=0;n<this.node.children.length;n++)
			 {
				var MB2=dojo.marginBox(this.node.children[n]);
				var top=conteneurMB.h/2+ 100*Math.cos(2*Math.PI*n/this.node.children.length)-MB2.h/2;
				var left=conteneurMB.w/2+ 100*Math.sin(2*Math.PI*n/this.node.children.length)-MB2.w/2;
				dojo.style(this.node.children[n], {top:top+"px",left:left+"px",opacity:1});
				this.fragments.push(ether.postItGroupFragment(this.node.children[n],{},this,this.manager));
			 }
			 this.estEtale=true;
		},
		
		rassembler:function()
		{	
		
			while(this.fragments.length>0)
				{
					var node=this.fragments[0].node;
					dojo.style(node, {top:this.pixelOffset*(dojo.getStyle(node,"zIndex"))+"px",left:this.pixelOffset*(dojo.getStyle(node,"zIndex"))+"px"});
					this.fragments[0].disable();
					this.fragments.splice(0,1);
				}
				
			
				//dans tous les cas, il faut corriger la taille du conteneur. La hauteur et la largeur sont données par le bottom-right le plus grand parmis tous les noeuds (avec un petit ajout...)
			var h=0;
			var w=0;
			 for(var g=0;g<this.node.children.length;g++)
			 {	var MB=dojo.marginBox(this.node.children[g]);
				h=Math.max(h,MB.h+MB.t);
				w=Math.max(w,MB.w+MB.l);

			 }
			 dojo.style(this.node,{height:h+"px",width: w+"px",opacity:"inherit",backgroundColor:"white"});
			 this.estEtale=false;
		},
		
		removeFragment:function(fragment)
		{	var i=0;
			while(this.fragments[i]!=fragment&&i<this.fragments.length)
			{	
			i++;
			}
			
			this.fragments.splice(i,1);
		}
		
	});

});