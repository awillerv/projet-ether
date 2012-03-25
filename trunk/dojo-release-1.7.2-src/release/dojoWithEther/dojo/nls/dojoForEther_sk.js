require({cache:{
'dijit/form/nls/sk/validate':function(){
define(
"dijit/form/nls/sk/validate", //begin v1.x content
({
	invalidMessage: "Zadaná hodnota nie je platná.",
	missingMessage: "Táto hodnota je vyžadovaná.",
	rangeMessage: "Táto hodnota je mimo rozsah."
})

//end v1.x content
);

},
'dijit/nls/sk/loading':function(){
define(
"dijit/nls/sk/loading", //begin v1.x content
({
	loadingState: "Zavádzanie...",
	errorState: "Nastala chyba"
})

//end v1.x content
);

},
'dojo/nls/sk/colors':function(){
define(
"dojo/nls/sk/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "modrá alice",
antiquewhite: "antická biela",
aqua: "svetlá zelenomodrá",
aquamarine: "akvamarínová",
azure: "azúrová",
beige: "béžová",
bisque: "biskvitová",
black: "čierna",
blanchedalmond: "lúpané mandle",
blue: "modrá",
blueviolet: "modrofialová",
brown: "hnedá",
burlywood: "pieskovo hnedá",
cadetblue: "sivomodrá",
chartreuse: "kartúza",
chocolate: "čokoládovo hnedá",
coral: "koralová",
cornflowerblue: "nevädzovo modrá",
cornsilk: "hodvábna žltá",
crimson: "karmínová",
cyan: "zelenomodrá",
darkblue: "tmavomodrá",
darkcyan: "tmavozelenomodrá",
darkgoldenrod: "zlatobyľová tmavá",
darkgray: "tmavosivá",
darkgreen: "tmavozelená",
darkgrey: "tmavosivá", // same as darkgray
darkkhaki: "žltohnedá tmavá",
darkmagenta: "tmavopurpurová",
darkolivegreen: "olivovozelená tmavá",
darkorange: "tmavooranžová",
darkorchid: "orchideovo ružová tmavá",
darkred: "tmavočervená",
darksalmon: "lososovo ružová tmavá",
darkseagreen: "morská zelená tmavá",
darkslateblue: "bridlicová modrá tmavá",
darkslategray: "bridlicová sivá tmavá",
darkslategrey: "bridlicová sivá tmavá", // same as darkslategray
darkturquoise: "tyrkysová tmavá",
darkviolet: "tmavofialová",
deeppink: "hlboká ružová",
deepskyblue: "hlboká blankytná modrá",
dimgray: "sivá matná",
dimgrey: "sivá matná", // same as dimgray
dodgerblue: "modrá dodger",
firebrick: "pálená tehla",
floralwhite: "kvetinová biela",
forestgreen: "lesná zelená",
fuchsia: "purpurová",
gainsboro: "sivomodrá svetlá",
ghostwhite: "biely tieň",
gold: "zlatá",
goldenrod: "zlatobyľ",
gray: "sivá",
green: "zelená",
greenyellow: "žltozelená",
grey: "sivá", // same as gray
honeydew: "ambrózia",
hotpink: "teplá ružová",
indianred: "indická červená",
indigo: "fialovo modrá",
ivory: "slonovinová",
khaki: "khaki",
lavender: "levanduľová",
lavenderblush: "levanduľový rumenec",
lawngreen: "zelená tráva",
lemonchiffon: "citrónový šifón",
lightblue: "svetlomodrá",
lightcoral: "koralová svetlá",
lightcyan: "zelenomodrá svetlá",
lightgoldenrodyellow: "zlatobyľová svetlá",
lightgray: "svetlosivá",
lightgreen: "svetlozelená",
lightgrey: "svetlosivá", // same as lightgray
lightpink: "svetloružová",
lightsalmon: "lososovo ružová svetlá",
lightseagreen: "morská zelená svetlá",
lightskyblue: "blankytná modrá svetlá",
lightslategray: "bridlicová sivá svetlá",
lightslategrey: "bridlicová sivá svetlá", // same as lightslategray
lightsteelblue: "oceľovo modrá svetlá",
lightyellow: "svetložltá",
lime: "lipová",
limegreen: "lipová zelená",
linen: "ľan",
magenta: "purpurová",
maroon: "gaštanovo hnedá",
mediumaquamarine: "akvamarínová stredná",
mediumblue: "stredne modrá",
mediumorchid: "orchideovo ružová stredná",
mediumpurple: "purpurová stredná",
mediumseagreen: "morská zelená stredná",
mediumslateblue: "bridlicová modrá stredná",
mediumspringgreen: "jarná zelená stredná",
mediumturquoise: "tyrkysová stredná",
mediumvioletred: "fialovočervená stredná",
midnightblue: "nočná modrá",
mintcream: "mätová krémová",
mistyrose: "zahmlená ruža",
moccasin: "črievičníková",
navajowhite: "navajská biela",
navy: "vojenská zelená",
oldlace: "stará čipka",
olive: "olivovo zelená",
olivedrab: "olivovo zelená fádna",
orange: "oranžová",
orangered: "oranžovo červená",
orchid: "orchideovo ružová",
palegoldenrod: "bledá zlatobyľová",
palegreen: "bledozelená",
paleturquoise: "bledo tyrkysová",
palevioletred: "bledá fialovo červená",
papayawhip: "papájový krém",
peachpuff: "broskyňová pena",
peru: "peru",
pink: "ružová",
plum: "slivková",
powderblue: "prášková modrá",
purple: "purpurová",
red: "červená",
rosybrown: "ružovo hnedá",
royalblue: "kráľovská modrá",
saddlebrown: "sedlová hnedá",
salmon: "lososovo ružová",
sandybrown: "pieskovo hnedá",
seagreen: "morská zelená",
seashell: "lastúrová",
sienna: "sienská",
silver: "strieborná",
skyblue: "blankytná modrá",
slateblue: "bridlicová modrá",
slategray: "bridlicová sivá",
slategrey: "bridlicová sivá", // same as slategray
snow: "snehobiela",
springgreen: "jarná zelená",
steelblue: "oceľovo modrá",
tan: "žltohnedá",
teal: "tyrkysová",
thistle: "bodliaková fialová",
tomato: "paradajková červená",
transparent: "priesvitná",
turquoise: "tyrkysová",
violet: "fialová",
wheat: "pšeničná",
white: "biela",
whitesmoke: "biely dym",
yellow: "žltá",
yellowgreen: "žltozelená"
})

//end v1.x content
);

},
'dojo/cldr/nls/sk/number':function(){
define(
"dojo/cldr/nls/sk/number", //begin v1.x content
{
	"currencyFormat": "#,##0.00 ¤",
	"group": " ",
	"decimal": ","
}
//end v1.x content
);
},
'dojox/form/nls/sk/Uploader':function(){
define(
"dojox/form/nls/sk/Uploader", ({
	label: "Vybrať súbory..."
})
);

},
'dijit/form/nls/sk/ComboBox':function(){
define(
"dijit/form/nls/sk/ComboBox", //begin v1.x content
({
		previousMessage: "Predchádzajúce voľby",
		nextMessage: "Ďalšie voľby"
})

//end v1.x content
);

},
'dijit/nls/sk/common':function(){
define(
"dijit/nls/sk/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Zrušiť",
	buttonSave: "Uložiť",
	itemClose: "Zatvoriť"
})

//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_sk", [], 1);
