require({cache:{
'dijit/form/nls/nb/validate':function(){
define(
"dijit/form/nls/nb/validate", //begin v1.x content
({
	invalidMessage: "Den angitte verdien er ikke gyldig.",
	missingMessage: "Denne verdien er obligatorisk.",
	rangeMessage: "Denne verdien er utenfor gyldig område."
})
//end v1.x content
);

},
'dijit/nls/nb/loading':function(){
define(
"dijit/nls/nb/loading", //begin v1.x content
({
	loadingState: "Laster inn...",
	errorState: "Det oppsto en feil"
})
//end v1.x content
);

},
'dojo/nls/nb/colors':function(){
define(
"dojo/nls/nb/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "blåhvit",
antiquewhite: "antikk hvit",
aqua: "akva",
aquamarine: "akvamarin",
azure: "asur",
beige: "beige",
bisque: "gulrosa",
black: "svart",
blanchedalmond: "lys mandel",
blue: "blå",
blueviolet: "blåfiolett",
brown: "brun",
burlywood: "matt mellombrun",
cadetblue: "mørk grønnblå",
chartreuse: "løvgrønn",
chocolate: "sjokolade",
coral: "korall",
cornflowerblue: "kornblå",
cornsilk: "cornsilk",
crimson: "karmosinrødt",
cyan: "cyan",
darkblue: "mørk blå",
darkcyan: "mørk cyan",
darkgoldenrod: "mørk gyldenris",
darkgray: "mørk grå",
darkgreen: "mørk grønn",
darkgrey: "mørk grå", // same as darkgray
darkkhaki: "mørk khaki",
darkmagenta: "mørk magenta",
darkolivegreen: "mørk olivengrønn",
darkorange: "mørk oransje",
darkorchid: "mørk orkide",
darkred: "mørk rød",
darksalmon: "mørk lakserosa",
darkseagreen: "mørk sjøgrønn",
darkslateblue: "mørk skiferblå",
darkslategray: "mørk skifergrå",
darkslategrey: "mørk skifergrå", // same as darkslategray
darkturquoise: "mørk turkis",
darkviolet: "mørk fiolett",
deeppink: "dyp rosa",
deepskyblue: "dyp himmelblå",
dimgray: "mørk mørkegrå",
dimgrey: "mørk mørkegrå", // same as dimgray
dodgerblue: "lys havblå",
firebrick: "mursteinsrød",
floralwhite: "blomsterhvit",
forestgreen: "skoggrønn",
fuchsia: "fuksia",
gainsboro: "lys lys grå",
ghostwhite: "egghvit",
gold: "gull",
goldenrod: "gyldenris",
gray: "grå",
green: "grønn",
greenyellow: "gulgrønn",
grey: "grå", // same as gray
honeydew: "grønnhvit",
hotpink: "halvmørk rosa",
indianred: "rustrød",
indigo: "indigo",
ivory: "elfenbenshvit",
khaki: "khaki",
lavender: "lavendel",
lavenderblush: "lillahvit",
lawngreen: "plengrønn",
lemonchiffon: "ferskenfarget",
lightblue: "lys blå",
lightcoral: "lys korall",
lightcyan: "lys cyan",
lightgoldenrodyellow: "lys gyldenrisgul",
lightgray: "lys grå",
lightgreen: "lys grønn",
lightgrey: "lys grå", // same as lightgray
lightpink: "lys rosa",
lightsalmon: "lys lakserosa",
lightseagreen: "lys sjøgrønn",
lightskyblue: "lys himmelblå",
lightslategray: "lys skifergrå",
lightslategrey: "lys skifergrå", // same as lightslategray
lightsteelblue: "lys stålblå",
lightyellow: "lys gul",
lime: "lime",
limegreen: "limegrønn",
linen: "lin",
magenta: "magenta",
maroon: "rødbrun",
mediumaquamarine: "middels akvamarin",
mediumblue: "mellomblå",
mediumorchid: "middels orkide",
mediumpurple: "middels purpur",
mediumseagreen: "middels sjøgrønn",
mediumslateblue: "middels skiferblå",
mediumspringgreen: "middels vårgrønn",
mediumturquoise: "middels turkis",
mediumvioletred: "middels fiolettrød",
midnightblue: "midnattsblå",
mintcream: "mintkrem",
mistyrose: "lys rosenrød",
moccasin: "lys gulbrun",
navajowhite: "gulbrun",
navy: "marineblå",
oldlace: "kniplingshvit",
olive: "oliven",
olivedrab: "middels olivengrønn",
orange: "oransje",
orangered: "rødoransje",
orchid: "orkide",
palegoldenrod: "svak gyldenris",
palegreen: "svak grønn",
paleturquoise: "svak turkis",
palevioletred: "svak fiolettrød",
papayawhip: "lys papaya",
peachpuff: "brunrosa",
peru: "lys nøttebrun",
pink: "rosa",
plum: "plommefarget",
powderblue: "lys grønnblå",
purple: "purpur",
red: "rød",
rosybrown: "brunlilla",
royalblue: "kongeblå",
saddlebrown: "mørk nøttebrun",
salmon: "lakserosa",
sandybrown: "sandbrun",
seagreen: "sjøgrønn",
seashell: "skjellhvit",
sienna: "nøttebrun",
silver: "sølvfarget",
skyblue: "himmelblå",
slateblue: "skiferblå",
slategray: "skifergrå",
slategrey: "skifergrå", // same as slategray
snow: "snøhvit",
springgreen: "vårgrønn",
steelblue: "stålblå",
tan: "matt mellombrun",
teal: "mørk grønnblå",
thistle: "lys grålilla",
tomato: "tomatrød",
transparent: "gjennomsiktig",
turquoise: "turkis",
violet: "fiolett",
wheat: "varm sienna",
white: "hvit",
whitesmoke: "røykhvit",
yellow: "gul",
yellowgreen: "gulgrønn"
})
//end v1.x content
);

},
'dojo/cldr/nls/nb/number':function(){
define(
"dojo/cldr/nls/nb/number", //begin v1.x content
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
	"nan": "NaN",
	"nativeZeroDigit": "0",
	"perMille": "‰",
	"decimalFormat": "#,##0.###",
	"currencyFormat": "¤ #,##0.00",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojox/form/nls/nb/Uploader':function(){
define(
"dojox/form/nls/nb/Uploader", ({
	label: "Velg filer..."
})
);

},
'dijit/form/nls/nb/ComboBox':function(){
define(
"dijit/form/nls/nb/ComboBox", //begin v1.x content
({
		previousMessage: "Tidligere valg",
		nextMessage: "Flere valg"
})
//end v1.x content
);

},
'dijit/nls/nb/common':function(){
define(
"dijit/nls/nb/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Avbryt",
	buttonSave: "Lagre",
	itemClose: "Lukk"
})
//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_nb", [], 1);
