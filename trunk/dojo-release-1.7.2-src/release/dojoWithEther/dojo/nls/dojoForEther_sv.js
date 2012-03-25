require({cache:{
'dijit/form/nls/sv/validate':function(){
define(
"dijit/form/nls/sv/validate", //begin v1.x content
({
	invalidMessage: "Det angivna värdet är ogiltigt.",
	missingMessage: "Värdet är obligatoriskt.",
	rangeMessage: "Värdet är utanför intervallet."
})
//end v1.x content
);

},
'dijit/nls/sv/loading':function(){
define(
"dijit/nls/sv/loading", //begin v1.x content
({
	loadingState: "Läser in...",
	errorState: "Det uppstod ett fel."
})
//end v1.x content
);

},
'dojo/nls/sv/colors':function(){
define(
"dojo/nls/sv/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "aliceblå",
antiquewhite: "antikvitt",
aqua: "akvamarin",
aquamarine: "akvamarin",
azure: "azurblått",
beige: "beige",
bisque: "biskvi",
black: "svart",
blanchedalmond: "skållad mandel",
blue: "blått",
blueviolet: "blåviolett",
brown: "brunt",
burlywood: "träfärgat",
cadetblue: "kadettblått",
chartreuse: "chartreuse",
chocolate: "choklad",
coral: "korall",
cornflowerblue: "kornblått",
cornsilk: "gulvitt",
crimson: "karmosinrött",
cyan: "cyan",
darkblue: "mörkblått",
darkcyan: "mörkt cyan",
darkgoldenrod: "mörkt gullris",
darkgray: "mörkgrått",
darkgreen: "mörkgrönt",
darkgrey: "mörkgrått", // same as darkgray
darkkhaki: "mörkt kaki",
darkmagenta: "mörk magenta",
darkolivegreen: "mörkt olivgrönt",
darkorange: "mörkorange",
darkorchid: "mörkt orkidé",
darkred: "mörkrött",
darksalmon: "mörkt laxfärgat",
darkseagreen: "mörkt havsgrönt",
darkslateblue: "mörkt skifferblått",
darkslategray: "mörkt skiffergrått",
darkslategrey: "mörkt skiffergrått", // same as darkslategray
darkturquoise: "mörkturkost",
darkviolet: "mörkviolett",
deeppink: "djuprosa",
deepskyblue: "mörkt himmelsblått",
dimgray: "smutsgrått",
dimgrey: "smutsgrått", // same as dimgray
dodgerblue: "dodgerblått",
firebrick: "tegelstensrött",
floralwhite: "blomvitt",
forestgreen: "skogsgrönt",
fuchsia: "fuchsia",
gainsboro: "gainsboro",
ghostwhite: "spökvitt",
gold: "guld",
goldenrod: "gullris",
gray: "grått",
green: "grönt",
greenyellow: "gröngult",
grey: "grått", // same as gray
honeydew: "honungsdagg",
hotpink: "varmrosa",
indianred: "indianrött",
indigo: "indigo",
ivory: "elfenbensvitt",
khaki: "kaki",
lavender: "lavendel",
lavenderblush: "lavendelskimrande",
lawngreen: "gräsmattegrönt",
lemonchiffon: "citronchiffong",
lightblue: "ljusblått",
lightcoral: "ljuskorall",
lightcyan: "ljust cyan",
lightgoldenrodyellow: "ljust gullrisgult",
lightgray: "ljusgrått",
lightgreen: "ljusgrönt",
lightgrey: "ljusgrått", // same as lightgray
lightpink: "ljusrosa",
lightsalmon: "ljust laxfärgat",
lightseagreen: "ljust havsgrönt",
lightskyblue: "ljust himmelsblått",
lightslategray: "ljust skiffergrått",
lightslategrey: "ljust skiffergrått", // same as lightslategray
lightsteelblue: "ljust stålblått",
lightyellow: "ljusgult",
lime: "lime",
limegreen: "limegrönt",
linen: "linne",
magenta: "magenta",
maroon: "rödbrunt",
mediumaquamarine: "mellanakvamarin",
mediumblue: "mellanblått",
mediumorchid: "mellanorkidé",
mediumpurple: "mellanlila",
mediumseagreen: "mellanhavsgrönt",
mediumslateblue: "mellanskifferblått",
mediumspringgreen: "mellanvårgrönt",
mediumturquoise: "mellanturkost",
mediumvioletred: "mellanviolettrött",
midnightblue: "midnattsblått",
mintcream: "mintgrädde",
mistyrose: "dunkelrosa",
moccasin: "mockasin",
navajowhite: "navajovitt",
navy: "marinblått",
oldlace: "spetsvitt",
olive: "olivfärgat",
olivedrab: "olivsmutsgult",
orange: "orange",
orangered: "orangerött",
orchid: "orkidé",
palegoldenrod: "blekt gullris",
palegreen: "blekgrönt",
paleturquoise: "blekturkost",
palevioletred: "blekviolettrött",
papayawhip: "papayaröra",
peachpuff: "persika",
peru: "peru",
pink: "rosa",
plum: "plommon",
powderblue: "pulverblått",
purple: "lila",
red: "rött",
rosybrown: "rosenbrunt",
royalblue: "kungligt blått",
saddlebrown: "sadelbrunt",
salmon: "laxfärgat",
sandybrown: "sandbrunt",
seagreen: "havsgrönt",
seashell: "snäckskal",
sienna: "sienna",
silver: "silver",
skyblue: "himmelsblått",
slateblue: "skifferblått",
slategray: "skiffergrått",
slategrey: "skiffergrått", // same as slategray
snow: "snö",
springgreen: "vårgrönt",
steelblue: "stålblått",
tan: "mellanbrunt",
teal: "blågrönt",
thistle: "tistel",
tomato: "tomatrött",
transparent: "transparent",
turquoise: "turkost",
violet: "violett",
wheat: "vete",
white: "vitt",
whitesmoke: "vit rök",
yellow: "gult",
yellowgreen: "gulgrönt"
})
//end v1.x content
);

},
'dojo/cldr/nls/sv/number':function(){
define(
"dojo/cldr/nls/sv/number", //begin v1.x content
{
	"group": " ",
	"percentSign": "%",
	"exponential": "×10^",
	"scientificFormat": "#E0",
	"percentFormat": "#,##0 %",
	"list": ";",
	"infinity": "∞",
	"patternDigit": "#",
	"minusSign": "−",
	"decimal": ",",
	"nan": "¤¤¤",
	"nativeZeroDigit": "0",
	"perMille": "‰",
	"decimalFormat": "#,##0.###",
	"currencyFormat": "#,##0.00 ¤",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojox/form/nls/sv/Uploader':function(){
define(
"dojox/form/nls/sv/Uploader", ({
	label: "Välj filer..."
})
);

},
'dijit/form/nls/sv/ComboBox':function(){
define(
"dijit/form/nls/sv/ComboBox", //begin v1.x content
({
		previousMessage: "Föregående alternativ",
		nextMessage: "Fler alternativ"
})
//end v1.x content
);

},
'dijit/nls/sv/common':function(){
define(
"dijit/nls/sv/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Avbryt",
	buttonSave: "Spara",
	itemClose: "Stäng"
})
//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_sv", [], 1);
