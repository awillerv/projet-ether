require({cache:{
'dijit/form/nls/fi/validate':function(){
define(
"dijit/form/nls/fi/validate", //begin v1.x content
({
	invalidMessage: "Annettu arvo ei kelpaa.",
	missingMessage: "Tämä arvo on pakollinen.",
	rangeMessage: "Tämä arvo on sallitun alueen ulkopuolella."
})
//end v1.x content
);

},
'dijit/form/nls/fi-fi/validate':function(){
define('dijit/form/nls/fi-fi/validate',{});
},
'dijit/nls/fi/loading':function(){
define(
"dijit/nls/fi/loading", //begin v1.x content
({
	loadingState: "Lataus on meneillään...",
	errorState: "On ilmennyt virhe."
})
//end v1.x content
);

},
'dijit/nls/fi-fi/loading':function(){
define('dijit/nls/fi-fi/loading',{});
},
'dojo/nls/fi/colors':function(){
define(
"dojo/nls/fi/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "vaaleanharmaansininen",
antiquewhite: "antiikinvalkoinen",
aqua: "sinivihreä",
aquamarine: "vedenvihreä",
azure: "taivaansininen",
beige: "vaaleanruskea",
bisque: "vaaleanruskea",
black: "musta",
blanchedalmond: "kuorittu manteli",
blue: "sininen",
blueviolet: "sinivioletti",
brown: "ruskea",
burlywood: "puunruskea",
cadetblue: "meren vihreä",
chartreuse: "kellanvihreä",
chocolate: "suklaanruskea",
coral: "koralli",
cornflowerblue: "syvänsininen",
cornsilk: "maissinkeltainen",
crimson: "karmiininpunainen",
cyan: "syaani",
darkblue: "tummansininen",
darkcyan: "tumma turkoosi",
darkgoldenrod: "tumma kultapiisku",
darkgray: "tummanharmaa",
darkgreen: "tummanvihreä",
darkgrey: "tummanharmaa", // same as darkgray
darkkhaki: "tumma khaki",
darkmagenta: "tumma magenta",
darkolivegreen: "tummanoliivinvihreä",
darkorange: "tummanoranssi",
darkorchid: "tumma orkidea",
darkred: "tummanpunainen",
darksalmon: "tumma lohenpunainen",
darkseagreen: "tumma merenvihreä",
darkslateblue: "tumma siniharmaa",
darkslategray: "tummanharmaa",
darkslategrey: "tummanharmaa", // same as darkslategray
darkturquoise: "tumma turkoosi",
darkviolet: "tummanvioletti",
deeppink: "syvä vaaleanpunainen",
deepskyblue: "tumma taivaansininen",
dimgray: "himmeänharmaa",
dimgrey: "himmeänharmaa", // same as dimgray
dodgerblue: "Dodger-sininen",
firebrick: "poltetun tiilen punainen",
floralwhite: "kukanvalkoinen",
forestgreen: "metsänvihreä",
fuchsia: "purppura",
gainsboro: "gainsboro",
ghostwhite: "lakananvalkoinen",
gold: "kulta",
goldenrod: "kullanruskea",
gray: "harmaa",
green: "vihreä",
greenyellow: "vihreänkeltainen",
grey: "harmaa", // same as gray
honeydew: "hunajameloninvihreä",
hotpink: "pinkki",
indianred: "kirkkaanpunainen",
indigo: "indigo",
ivory: "norsunluu",
khaki: "khaki",
lavender: "laventeli",
lavenderblush: "laventelinpunainen",
lawngreen: "ruohonvihreä",
lemonchiffon: "sitruunankeltainen",
lightblue: "vaaleansininen",
lightcoral: "vaalea koralli",
lightcyan: "vaalea syaani",
lightgoldenrodyellow: "vaalea kultapiiskunkeltainen",
lightgray: "vaaleanharmaa",
lightgreen: "vaaleanvihreä",
lightgrey: "vaaleanharmaa", // same as lightgray
lightpink: "vaaleanpunainen",
lightsalmon: "vaalea lohenpunainen",
lightseagreen: "vaalea merenvihreä",
lightskyblue: "vaalea taivaansininen",
lightslategray: "vaaleanharmaa",
lightslategrey: "vaaleanharmaa", // same as lightslategray
lightsteelblue: "vaalea teräksensininen",
lightyellow: "vaaleankeltainen",
lime: "vaaleanvihreä",
limegreen: "limetinvihreä",
linen: "pellavanvaalea",
magenta: "magenta",
maroon: "kastanjanruskea",
mediumaquamarine: "keskivaalea vedenvihreä",
mediumblue: "keskisininen",
mediumorchid: "keskivaalea orkidea",
mediumpurple: "keskivaalea violetti",
mediumseagreen: "keskivaalea merenvihreä",
mediumslateblue: "keskivaalea siniharmaa",
mediumspringgreen: "keskivaalea keväänvihreä",
mediumturquoise: "keskivaalea turkoosi",
mediumvioletred: "keskivaalea lila",
midnightblue: "yönsininen",
mintcream: "minttukreemi",
mistyrose: "utuinen ruusu",
moccasin: "nahanruskea",
navajowhite: "navajonvalkoinen",
navy: "laivastonsininen",
oldlace: "vanha pitsi",
olive: "oliivinvihreä",
olivedrab: "oliivinruskea",
orange: "oranssi",
orangered: "oranssinpunainen",
orchid: "orkidea",
palegoldenrod: "haalea kultapiisku",
palegreen: "haalea vihreä",
paleturquoise: "haalea turkoosi",
palevioletred: "haalea lila",
papayawhip: "papaijavaahto",
peachpuff: "persikka",
peru: "peru",
pink: "vaaleanpunainen",
plum: "luumunpunainen",
powderblue: "harmaansininen",
purple: "violetti",
red: "punainen",
rosybrown: "punertavanruskea",
royalblue: "syvänsininen",
saddlebrown: "satulanruskea",
salmon: "lohenpunainen",
sandybrown: "hiekanruskea",
seagreen: "merenvihreä",
seashell: "simpukankuori",
sienna: "siena",
silver: "hopea",
skyblue: "taivaansininen",
slateblue: "savensininen",
slategray: "savenharmaa",
slategrey: "savenharmaa", // same as slategray
snow: "lumivalkoinen",
springgreen: "keväänvihreä",
steelblue: "teräksensininen",
tan: "kellanruskea",
teal: "sinivihreä",
thistle: "ohdake",
tomato: "tomaatinpunainen",
transparent: "läpinäkyvä",
turquoise: "turkoosi",
violet: "violetti",
wheat: "vehnänkeltainen",
white: "valkoinen",
whitesmoke: "savunvalkea",
yellow: "keltainen",
yellowgreen: "kellanvihreä"
})
//end v1.x content
);

},
'dojo/nls/fi-fi/colors':function(){
define('dojo/nls/fi-fi/colors',{});
},
'dojo/cldr/nls/fi/number':function(){
define(
"dojo/cldr/nls/fi/number", //begin v1.x content
{
	"group": " ",
	"percentSign": "%",
	"exponential": "E",
	"scientificFormat": "#E0",
	"percentFormat": "#,##0 %",
	"list": ";",
	"infinity": "∞",
	"patternDigit": "#",
	"minusSign": "-",
	"decimal": ",",
	"nan": "epäluku",
	"nativeZeroDigit": "0",
	"perMille": "‰",
	"decimalFormat": "#,##0.###",
	"currencyFormat": "#,##0.00 ¤",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojo/cldr/nls/fi-fi/number':function(){
define('dojo/cldr/nls/fi-fi/number',{});
},
'dojox/form/nls/fi/Uploader':function(){
define(
"dojox/form/nls/fi/Uploader", ({
	label: "Valitse tiedostot..."
})
);

},
'dojox/form/nls/fi-fi/Uploader':function(){
define('dojox/form/nls/fi-fi/Uploader',{});
},
'dijit/form/nls/fi/ComboBox':function(){
define(
"dijit/form/nls/fi/ComboBox", //begin v1.x content
({
		previousMessage: "Edelliset valinnat",
		nextMessage: "Lisää valintoja"
})
//end v1.x content
);

},
'dijit/form/nls/fi-fi/ComboBox':function(){
define('dijit/form/nls/fi-fi/ComboBox',{});
},
'dijit/nls/fi/common':function(){
define(
"dijit/nls/fi/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Peruuta",
	buttonSave: "Tallenna",
	itemClose: "Sulje"
})
//end v1.x content
);

},
'dijit/nls/fi-fi/common':function(){
define('dijit/nls/fi-fi/common',{});
}}});
define("dojo/nls/dojoForEther_fi-fi", [], 1);
