

createPI: function(objet)		//creation de postIt à partir d'un JSON renvoyé par l'éditeur
{
	var innerHTML = dojo.create("div",{class:"contenuPI", innerHTML:objet.texte,style:{backgroundColor: objet.couleur, width:objet.largeur,height:objet.hauteur,position:"absolute"}});
	
	var node=dojo.create("div",{id:"PI"+this.PICount,innerHTML:innerHTML },postItArea);	//on crée un noeud de texte (avec l'id qui va bien PI0,PI1, etc...)
					dojo.style(node,{		//en particulier, on précise la position ici
					position:"absolute",
					left: objet.left + "px",
					top: objet.top + "px",

									});
}