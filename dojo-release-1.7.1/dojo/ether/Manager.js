
// classe manager qui gere l'ensemble des post-it et des zones de drop

require({"dojo/declare","dojo/dom-construct","dojo/_base/window"}, function(declare)
{	
	return declare("ether.manager",null,
	{
		constructor: function(){
		this.DZList=new array();
		this.PIList=new array();
		this.groupId=0;
	},
		
		createDropZone: function(clientKeyList)
		{		var clientArray;
				if(clientKeyList instanceof Array)
			{
				clientArray=clientKeyList;
			}
			else
			{
				clientArray=new Array(clientKeyList);
			}
				count=clientArray.length;
				var imgpath;
				if(count==1)
				{
				imgpath="images/participant.png";
				}
				else 
				{
				if(count==2)
				{
				imgpath="images/groupe2.png";
				}
				else(count>=3)
				{
				imgpath="images/groupe3.png";
				}
				}
				
				var inner=='<img src="'+imgpath+'"/><br/>'; 
				if (count>1){count=count+1; inner=inner+"<p>Groupe "+count+"</p>">;}else{inner=inner+"<p>"+participants[clientArray[0]].prenom+" "+clientArray[0]].nom};
				
				node=dojo.create(div,{class:"DZ",innerHTML: inner, style:{float:'left'}},dojo.byId("applicationBottom"));
				return new cibleEnvoi(node,clientArray);
		}
	
	}


}