require(['dojo/_base/declare','dojo/dom-geometry','dojo/ETHER/cible'], function(declare)
{
	return declare("ether.CibleEnvoi", ether.cible,
	{
		constructor: function(node,clientKeyList)
		{
			if(clientKeyList instanceof Array)
			{
				this.clientKeyList=clientKeyList;
			}
			else
			{
				this.clientKeyList=new Array(clientKeyList);
			}
		},
		onDrop: function(postIts)
		{
			socket.emit('envoi', postIts, this.clientKeyList);
		}
	});
});