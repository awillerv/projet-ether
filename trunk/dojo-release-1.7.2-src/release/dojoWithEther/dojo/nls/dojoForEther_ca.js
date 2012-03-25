require({cache:{
'dijit/form/nls/ca/validate':function(){
define(
"dijit/form/nls/ca/validate", //begin v1.x content
({
	invalidMessage: "El valor introduït no és vàlid",
	missingMessage: "Aquest valor és necessari",
	rangeMessage: "Aquest valor és fora de l'interval"
})

//end v1.x content
);

},
'dijit/nls/ca/loading':function(){
define(
"dijit/nls/ca/loading", //begin v1.x content
({
	loadingState: "S'està carregant...",
	errorState: "Ens sap greu. S'ha produït un error."
})

//end v1.x content
);

},
'dojo/nls/ca/colors':function(){
define(
"dojo/nls/ca/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "blau cian clar",
antiquewhite: "blanc antic",
aqua: "aigua",
aquamarine: "aiguamarina",
azure: "atzur",
beige: "beix",
bisque: "crema",
black: "negre",
blanchedalmond: "ametlla pàl·lid",
blue: "blau",
blueviolet: "blau violeta",
brown: "marró",
burlywood: "marró arenós",
cadetblue: "blau marí",
chartreuse: "Llimona pàl·lid",
chocolate: "xocolata",
coral: "corall",
cornflowerblue: "blau blauet",
cornsilk: "cru",
crimson: "carmesí",
cyan: "cian",
darkblue: "blau fosc",
darkcyan: "cian fosc",
darkgoldenrod: "ocre fosc",
darkgray: "gris fosc",
darkgreen: "verd fosc",
darkgrey: "gris fosc", // same as darkgray
darkkhaki: "caqui fosc",
darkmagenta: "magenta fosc",
darkolivegreen: "verd oliva fosc",
darkorange: "taronja fosc",
darkorchid: "orquídia fosc",
darkred: "vermell fosc",
darksalmon: "salmó fosc",
darkseagreen: "verd marí fosc",
darkslateblue: "blau pissarra fosc",
darkslategray: "gris pissarra fosc",
darkslategrey: "gris pissarra fosc", // same as darkslategray
darkturquoise: "turquesa fosc",
darkviolet: "violeta fosc",
deeppink: "rosa profund",
deepskyblue: "blau cel profund",
dimgray: "gris fosc",
dimgrey: "gris fosc", // same as dimgray
dodgerblue: "blau Dodger",
firebrick: "maó refractari",
floralwhite: "blanc floral",
forestgreen: "verd bosc",
fuchsia: "fúcsia",
gainsboro: "gainsboro",
ghostwhite: "blanc fantasma",
gold: "daurat",
goldenrod: "ocre",
gray: "gris",
green: "verd",
greenyellow: "verd grogós",
grey: "gris", // same as gray
honeydew: "rosada de mel",
hotpink: "rosa fúcsia",
indianred: "vermell indi",
indigo: "índigo",
ivory: "marbre",
khaki: "caqui",
lavender: "lavanda",
lavenderblush: "lavanda vermellosa",
lawngreen: "verd gespa",
lemonchiffon: "groc brisa",
lightblue: "blau clar",
lightcoral: "corall clar",
lightcyan: "cian clar",
lightgoldenrodyellow: "groc ocre clar",
lightgray: "gris clar",
lightgreen: "verd clar",
lightgrey: "gris clar", // same as lightgray
lightpink: "rosa clar",
lightsalmon: "salmó clar",
lightseagreen: "verd marí clar",
lightskyblue: "blau cel clar",
lightslategray: "gris pissarra clar",
lightslategrey: "gris pissarra clar", // same as lightslategray
lightsteelblue: "blau acer clar",
lightyellow: "groc clar",
lime: "verd llimona",
limegreen: "verd llimona verda",
linen: "lli",
magenta: "magenta",
maroon: "marró vermellós",
mediumaquamarine: "aiguamarina mitjana",
mediumblue: "blau mitjà",
mediumorchid: "orquídia mitjana",
mediumpurple: "porpra mitjana",
mediumseagreen: "verd marí mitjà",
mediumslateblue: "blau pissarra mitjà",
mediumspringgreen: "verd primavera mitjà",
mediumturquoise: "turquesa mitjana",
mediumvioletred: "vermell violeta mitjà",
midnightblue: "blau mitjanit",
mintcream: "menta pàl·lid",
mistyrose: "rosa dens",
moccasin: "mocassí",
navajowhite: "blanc Navajo",
navy: "blau marí",
oldlace: "rosa cremós",
olive: "oliva",
olivedrab: "gris oliva",
orange: "taronja",
orangered: "taronja vermellós",
orchid: "orquídia",
palegoldenrod: "ocre pàl·lid",
palegreen: "verd pàl·lid",
paleturquoise: "turquesa pàl·lid",
palevioletred: "vermell porpra pàl·lid",
papayawhip: "préssec pastel",
peachpuff: "préssec",
peru: "Perú",
pink: "rosa",
plum: "pruna",
powderblue: "blau grisós",
purple: "porpra",
red: "vermell",
rosybrown: "marró rosat",
royalblue: "blau marí intens",
saddlebrown: "marró mitjà",
salmon: "salmó",
sandybrown: "marró arenós",
seagreen: "verd marí",
seashell: "petxina marina",
sienna: "siena",
silver: "argent",
skyblue: "blau cel",
slateblue: "blau pissarra",
slategray: "gris pissarra",
slategrey: "gris pissarra", // same as slategray
snow: "neu",
springgreen: "verd de primavera",
steelblue: "blau acer",
tan: "tan",
teal: "verd blavós",
thistle: "card",
tomato: "tomàquet",
transparent: "transparent",
turquoise: "turquesa",
violet: "violeta",
wheat: "blat",
white: "blanc",
whitesmoke: "blanc fumat",
yellow: "groc",
yellowgreen: "verd grogós"
})

//end v1.x content
);

},
'dojo/cldr/nls/ca/number':function(){
define(
"dojo/cldr/nls/ca/number", //begin v1.x content
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
	"currencyFormat": "#,##0.00 ¤",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojox/form/nls/ca/Uploader':function(){
define(
"dojox/form/nls/ca/Uploader", ({
	label: "Selecciona fitxers..."
})
);

},
'dijit/form/nls/ca/ComboBox':function(){
define(
"dijit/form/nls/ca/ComboBox", //begin v1.x content
({
		previousMessage: "Opcions anteriors",
		nextMessage: "Més opcions"
})

//end v1.x content
);

},
'dijit/nls/ca/common':function(){
define(
"dijit/nls/ca/common", //begin v1.x content
({
	buttonOk: "D'acord",
	buttonCancel: "Cancel·la",
	buttonSave: "Desa",
	itemClose: "Tanca"
})

//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_ca", [], 1);
