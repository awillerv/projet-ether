dependencies = {
	layers: [
		{
			name: "dojoForEther.js",
			dependencies: [
				"dojo/parser", "dojo/on", "dojox/validate/web", "dojo/dom-construct", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-style", "dojo/dom-geometry", "dojo/query", "dojo/_base/fx", "dojo/fx", "dojo/fx/easing", "dojo/_base/unload", "dojo/_base/sniff", "ether/tap",
				"dijit/Dialog", "dijit/ProgressBar", "dijit/form/ValidationTextBox", "dijit/form/RadioButton", "dijit/form/Form", 
				"dijit/MenuBar", "dijit/PopupMenuBarItem", "dijit/DropDownMenu", "dijit/MenuItem", "ether/MenuItem", "dijit/MenuSeparator", "dijit/PopupMenuItem", "dijit/CheckedMenuItem",
				"dojox/form/Uploader", "dijit/form/Textarea", "dijit/form/FilteringSelect", "dojo/data/ItemFileReadStore", "dijit/ColorPalette",
				"dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/dnd/Source", "dojo/_base/array",
				"ether/PostIt", "ether/Cible","ether/CibleEnvoi", "ether/editeur","ether/DZContainer", "dojo/keys",
				"dijit/_base",
				"dijit/WidgetSet",
				"dijit/_base/focus",
				"dijit/_base/place",
				"dijit/_base/popup",
				"dijit/_base/scroll",
				"dijit/_base/sniff",
				"dijit/_base/typematic",
				"dijit/_base/wai",
				"dijit/_base/window",
				"dijit/form/DropDownButton",
				"dijit/form/ComboButton",
				"dojo/fx/Toggler",
				"dijit/TooltipDialog",
				"dojo/dnd/AutoSource",
				"dojo/dnd/Target",
				"dojo/selector/acme",
				"dojo/_firebug/firebug",
				"dojo/i18n",
				"dojo/cldr/nls/fr/number",
				"dijit/nls/fr/loading",
				"dijit/nls/fr/common",
				"dijit/form/nls/fr/validate",
				"dojox/form/nls/fr/Uploader",
				"dijit/form/nls/fr/ComboBox",
				"dojo/nls/fr/colors"
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "ether", "../ether" ]
	]
}
