require(['dojo/_base/declare', 'dojo/dom-geometry','dojo/ETHER/cible'], function(declare)
{
	return declare("ether.CibleEnvoi", ether.cible,
	{
		constructor: function(node,clientkeyList)
		{
			if(clientList instanceof Array)
			{
				this.clientList=clientkeyList;
			}
			else
			{
				this.clientList=new Array(clientkeyList);
			}
		}
		
	
	}
});