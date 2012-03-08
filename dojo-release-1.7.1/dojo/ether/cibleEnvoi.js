require(['dojo/_base/declare', 'dojo/dom-geometry','dojo/ETHER/cible'], function(declare)
{
	return declare("ether.CibleEnvoi", ether.cible,
	{
		constructor: function(node,clientList)
		{
			if(clientList instanceof Array)
			{
				this.clientList=clientList;
			}
			else
			{
				this.clientList=new Array(clientList);
			}
		}
		
	
	}
});