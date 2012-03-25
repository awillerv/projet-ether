require({cache:{
'dijit/form/nls/nl/validate':function(){
define(
"dijit/form/nls/nl/validate", //begin v1.x content
({
	invalidMessage: "De opgegeven waarde is ongeldig.",
	missingMessage: "Deze waarde is verplicht.",
	rangeMessage: "Deze waarde is niet toegestaan."
})
//end v1.x content
);

},
'dijit/form/nls/nl-nl/validate':function(){
define('dijit/form/nls/nl-nl/validate',{});
},
'dijit/nls/nl/loading':function(){
define(
"dijit/nls/nl/loading", //begin v1.x content
({
	loadingState: "Bezig met laden...",
	errorState: "Er is een fout opgetreden"
})
//end v1.x content
);

},
'dijit/nls/nl-nl/loading':function(){
define('dijit/nls/nl-nl/loading',{});
},
'dojo/nls/nl/colors':function(){
define(
"dojo/nls/nl/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "lichtblauw",
antiquewhite: "antiekwit",
aqua: "aqua",
aquamarine: "aquamarijn",
azure: "azuur",
beige: "beige",
bisque: "oranjegeel",
black: "zwart",
blanchedalmond: "amandel",
blue: "blauw",
blueviolet: "violet",
brown: "bruin",
burlywood: "lichtbruin",
cadetblue: "donkerstaalblauw",
chartreuse: "groengeel",
chocolate: "chocoladebruin",
coral: "koraalrood",
cornflowerblue: "korenbloemblauw",
cornsilk: "maïsgeel",
crimson: "karmozijnrood",
cyan: "cyaan",
darkblue: "donkerblauw",
darkcyan: "donkercyaan",
darkgoldenrod: "donkergoud",
darkgray: "donkergrijs",
darkgreen: "donkergroen",
darkgrey: "donkergrijs", // same as darkgray
darkkhaki: "donkerkaki",
darkmagenta: "donkermagenta",
darkolivegreen: "donkerolijfgroen",
darkorange: "donkeroranje",
darkorchid: "donkerorchidee",
darkred: "donkerrood",
darksalmon: "donkerzalm",
darkseagreen: "donkerzeegroen",
darkslateblue: "donkergrijsblauw",
darkslategray: "donkerblauwgrijs",
darkslategrey: "donkerblauwgrijs", // same as darkslategray
darkturquoise: "donkerturquoise",
darkviolet: "donkerviolet",
deeppink: "donkerroze",
deepskyblue: "diephemelblauw",
dimgray: "dofgrijs",
dimgrey: "dofgrijs", // same as dimgray
dodgerblue: "helderblauw",
firebrick: "vuursteenrood",
floralwhite: "rozewit",
forestgreen: "bosgroen",
fuchsia: "fuchsia",
gainsboro: "lichtblauwgrijs",
ghostwhite: "spierwit",
gold: "goud",
goldenrod: "goudbruin",
gray: "grijs",
green: "groen",
greenyellow: "groengeel",
grey: "grijs", // same as gray
honeydew: "meloen",
hotpink: "acaciaroze",
indianred: "indisch rood",
indigo: "indigo",
ivory: "ivoorwit",
khaki: "kaki",
lavender: "lavendelblauw",
lavenderblush: "lavendelblos",
lawngreen: "grasgroen",
lemonchiffon: "citroengeel",
lightblue: "lichtblauw",
lightcoral: "lichtkoraal",
lightcyan: "lichtcyaan",
lightgoldenrodyellow: "lichtgoudgeel",
lightgray: "lichtgrijs",
lightgreen: "lichtgroen",
lightgrey: "lichtgrijs", // same as lightgray
lightpink: "lichtroze",
lightsalmon: "lichtzalm",
lightseagreen: "lichtzeegroen",
lightskyblue: "lichthemelsblauw",
lightslategray: "lichtblauwgrijs",
lightslategrey: "lichtblauwgrijs", // same as lightslategray
lightsteelblue: "lichtstaalblauw",
lightyellow: "lichtgeel",
lime: "limoen",
limegreen: "limoengroen",
linen: "linnen",
magenta: "magenta",
maroon: "kastanjebruin",
mediumaquamarine: "midaquamarijn",
mediumblue: "midblauw",
mediumorchid: "midorchidee",
mediumpurple: "midpurper",
mediumseagreen: "midzeegroen",
mediumslateblue: "midgrijsblauw",
mediumspringgreen: "midlentegroen",
mediumturquoise: "midturquoise",
mediumvioletred: "midvioletrood",
midnightblue: "nachtblauw",
mintcream: "mintroomgeel",
mistyrose: "matroze",
moccasin: "moccasin",
navajowhite: "navajowit",
navy: "marineblauw",
oldlace: "kant",
olive: "olijfgroen",
olivedrab: "grijsbruin",
orange: "oranje",
orangered: "oranjerood",
orchid: "orchidee",
palegoldenrod: "bleekgeel",
palegreen: "bleekgroen",
paleturquoise: "bleekturquoise",
palevioletred: "bleekvioletrood",
papayawhip: "papajaroze",
peachpuff: "perzikroze",
peru: "bruin",
pink: "roze",
plum: "pruim",
powderblue: "lichtblauw-wit",
purple: "purper",
red: "rood",
rosybrown: "roodbruin",
royalblue: "koningsblauw",
saddlebrown: "leerbruin",
salmon: "zalm",
sandybrown: "zandbruin",
seagreen: "zeegroen",
seashell: "schelp",
sienna: "sienna",
silver: "zilvergrijs",
skyblue: "hemelsblauw",
slateblue: "leiblauw",
slategray: "leigrijs",
slategrey: "leigrijs", // same as slategray
snow: "sneeuwwit",
springgreen: "lentegroen",
steelblue: "staalblauw",
tan: "geelbruin",
teal: "grijsblauw",
thistle: "distel",
tomato: "tomaat",
transparent: "transparant",
turquoise: "turquoise",
violet: "violet",
wheat: "tarwebruin",
white: "wit",
whitesmoke: "rookwit",
yellow: "geel",
yellowgreen: "geelgroen"
})
//end v1.x content
);

},
'dojo/nls/nl-nl/colors':function(){
define('dojo/nls/nl-nl/colors',{});
},
'dojo/cldr/nls/nl/number':function(){
define(
"dojo/cldr/nls/nl/number", //begin v1.x content
{
	"group": ".",
	"percentSign": "%",
	"exponential": "E",
	"scientificFormat": "#E0",
	"percentFormat": "#,##0%",
	"list": ";",
	"infinity": "∞",
	"patternDigit": "#",
	"minusSign": "-",
	"decimal": ",",
	"nan": "NaN",
	"nativeZeroDigit": "0",
	"perMille": "‰",
	"decimalFormat": "#,##0.###",
	"currencyFormat": "¤ #,##0.00;¤ #,##0.00-",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojo/cldr/nls/nl-nl/number':function(){
define('dojo/cldr/nls/nl-nl/number',{});
},
'dojox/form/nls/nl/Uploader':function(){
define(
"dojox/form/nls/nl/Uploader", ({
	label: "Bestanden selecteren..."
})
);

},
'dojox/form/nls/nl-nl/Uploader':function(){
define('dojox/form/nls/nl-nl/Uploader',{});
},
'dijit/form/nls/nl/ComboBox':function(){
define(
"dijit/form/nls/nl/ComboBox", //begin v1.x content
({
		previousMessage: "Eerdere opties",
		nextMessage: "Meer opties"
})
//end v1.x content
);

},
'dijit/form/nls/nl-nl/ComboBox':function(){
define('dijit/form/nls/nl-nl/ComboBox',{});
},
'dijit/nls/nl/common':function(){
define(
"dijit/nls/nl/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Annuleren",
	buttonSave: "Opslaan",
	itemClose: "Sluiten"
})
//end v1.x content
);

},
'dijit/nls/nl-nl/common':function(){
define('dijit/nls/nl-nl/common',{});
}}});
define("dojo/nls/dojoForEther_nl-nl", [], 1);
