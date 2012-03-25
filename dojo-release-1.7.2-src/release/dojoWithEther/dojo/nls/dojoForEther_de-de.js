require({cache:{
'dijit/form/nls/de/validate':function(){
define(
"dijit/form/nls/de/validate", //begin v1.x content
({
	invalidMessage: "Der eingegebene Wert ist ungültig. ",
	missingMessage: "Dieser Wert ist erforderlich.",
	rangeMessage: "Dieser Wert liegt außerhalb des gültigen Bereichs. "
})
//end v1.x content
);

},
'dijit/form/nls/de-de/validate':function(){
define('dijit/form/nls/de-de/validate',{});
},
'dijit/nls/de/loading':function(){
define(
"dijit/nls/de/loading", //begin v1.x content
({
	loadingState: "Wird geladen...",
	errorState: "Es ist ein Fehler aufgetreten."
})
//end v1.x content
);

},
'dijit/nls/de-de/loading':function(){
define('dijit/nls/de-de/loading',{});
},
'dojo/nls/de/colors':function(){
define(
"dojo/nls/de/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "Alice-blau",
antiquewhite: "Antikweiß",
aqua: "Wasserblau",
aquamarine: "Aquamarin",
azure: "Azur",
beige: "Beige",
bisque: "Bisquit",
black: "Schwarz",
blanchedalmond: "Mandelweiß",
blue: "Blau",
blueviolet: "Blauviolett",
brown: "Braun",
burlywood: "Burlywood",
cadetblue: "Kadettenblau",
chartreuse: "Helles Gelbgrün",
chocolate: "Schokoladenbraun",
coral: "Koralle",
cornflowerblue: "Kornblumenblau",
cornsilk: "Kornseide",
crimson: "Karmesinrot",
cyan: "Zyan",
darkblue: "Dunkelblau",
darkcyan: "Dunkelzyan",
darkgoldenrod: "Dunkelgoldgelb",
darkgray: "Dunkelgrau",
darkgreen: "Dunkelgrün",
darkgrey: "Dunkelgrau", // same as darkgray
darkkhaki: "Dunkelkhaki",
darkmagenta: "Dunkelmagenta",
darkolivegreen: "Dunkelolivgrün",
darkorange: "Dunkelorange",
darkorchid: "Dunkelorchidee",
darkred: "Dunkelrot",
darksalmon: "Dunkellachs",
darkseagreen: "Dunkles Meergrün",
darkslateblue: "Dunkelschieferblau",
darkslategray: "Dunkelschiefergrau",
darkslategrey: "Dunkelschiefergrau", // same as darkslategray
darkturquoise: "Dunkeltürkis",
darkviolet: "Dunkelviolett",
deeppink: "Tiefrosa",
deepskyblue: "Dunkles Himmelblau",
dimgray: "Blassgrau",
dimgrey: "Blassgrau", // same as dimgray
dodgerblue: "Dodger-blau",
firebrick: "Schamottestein",
floralwhite: "Blütenweiß",
forestgreen: "Forstgrün",
fuchsia: "Fuchsia",
gainsboro: "Gainsboro",
ghostwhite: "Geisterweiß",
gold: "Gold",
goldenrod: "Goldgelb",
gray: "Grau",
green: "Grün",
greenyellow: "Grüngelb",
grey: "Grau", // same as gray
honeydew: "Honigtau",
hotpink: "Knallrosa",
indianred: "Indischrot",
indigo: "Indigoblau",
ivory: "Elfenbein",
khaki: "Khaki",
lavender: "Lavendelblau",
lavenderblush: "Lavendelhauch",
lawngreen: "Grasgrün",
lemonchiffon: "Zitronenchiffon",
lightblue: "Hellblau",
lightcoral: "Hellkoralle",
lightcyan: "Hellzyan",
lightgoldenrodyellow: "Hellgoldgelb",
lightgray: "Hellgrau",
lightgreen: "Hellgrün",
lightgrey: "Hellgrau", // same as lightgray
lightpink: "Hellrosa",
lightsalmon: "Helllachs",
lightseagreen: "Helles Meergrün",
lightskyblue: "Helles Himmelblau",
lightslategray: "Helles Schiefergrau",
lightslategrey: "Helles Schiefergrau", // same as lightslategray
lightsteelblue: "Helles Stahlblau",
lightyellow: "Hellgelb",
lime: "Limone",
limegreen: "Limonengrün",
linen: "Leinen",
magenta: "Magenta",
maroon: "Kastanienbraun",
mediumaquamarine: "Mittelaquamarin",
mediumblue: "Mittelblau",
mediumorchid: "Mittelorchidee",
mediumpurple: "Mittelpurpur",
mediumseagreen: "Mittelmeeresgrün",
mediumslateblue: "Mittelschieferblau ",
mediumspringgreen: "Mittelfrühlingsgrün",
mediumturquoise: "Mitteltürkis ",
mediumvioletred: "Mittelviolettrot ",
midnightblue: "Mitternachtblau",
mintcream: "Mintcreme",
mistyrose: "Blassrose",
moccasin: "Mokassin",
navajowhite: "Navajo-weiß",
navy: "Marineblau",
oldlace: "Alte Spitze",
olive: "Oliv",
olivedrab: "Olivgrau",
orange: "Orange",
orangered: "Orangerot",
orchid: "Orchidee",
palegoldenrod: "Blassgoldgelb",
palegreen: "Blassgrün",
paleturquoise: "Blasstürkis",
palevioletred: "Blassviolettrot ",
papayawhip: "Papayacreme",
peachpuff: "Pfirsich",
peru: "Peru",
pink: "Rosa",
plum: "Pflaume",
powderblue: "Pulverblau",
purple: "Purpurrot",
red: "Rot",
rosybrown: "Rosigbraun",
royalblue: "Königsblau",
saddlebrown: "Sattelbraun",
salmon: "Lachs",
sandybrown: "Sandbraun",
seagreen: "Meeresgrün",
seashell: "Muschelweiß",
sienna: "Sienna",
silver: "Silbergrau",
skyblue: "Himmelblau",
slateblue: "Schieferblau",
slategray: "Schiefergrau",
slategrey: "Schiefergrau", // same as slategray
snow: "Schneeweiß",
springgreen: "Frühlingsgrün",
steelblue: "Stahlblau",
tan: "Hautfarben",
teal: "Smaragdgrün",
thistle: "Distel",
tomato: "Tomatenrot",
transparent: "Transparent",
turquoise: "Türkis",
violet: "Violett",
wheat: "Weizen",
white: "Weiß",
whitesmoke: "Rauchweiß",
yellow: "Gelb",
yellowgreen: "Gelbgrün"
})
//end v1.x content
);

},
'dojo/nls/de-de/colors':function(){
define('dojo/nls/de-de/colors',{});
},
'dojo/cldr/nls/de/number':function(){
define(
"dojo/cldr/nls/de/number", //begin v1.x content
{
	"group": ".",
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
	"currencyFormat": "#,##0.00 ¤",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojo/cldr/nls/de-de/number':function(){
define('dojo/cldr/nls/de-de/number',{});
},
'dojox/form/nls/de/Uploader':function(){
define(
"dojox/form/nls/de/Uploader", ({
	label: "Dateien auswählen..."
})
);

},
'dojox/form/nls/de-de/Uploader':function(){
define('dojox/form/nls/de-de/Uploader',{});
},
'dijit/form/nls/de/ComboBox':function(){
define(
"dijit/form/nls/de/ComboBox", //begin v1.x content
({
		previousMessage: "Vorherige Auswahl",
		nextMessage: "Weitere Auswahlmöglichkeiten"
})
//end v1.x content
);

},
'dijit/form/nls/de-de/ComboBox':function(){
define('dijit/form/nls/de-de/ComboBox',{});
},
'dijit/nls/de/common':function(){
define(
"dijit/nls/de/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Abbrechen",
	buttonSave: "Speichern",
	itemClose: "Schließen"
})
//end v1.x content
);

},
'dijit/nls/de-de/common':function(){
define('dijit/nls/de-de/common',{});
}}});
define("dojo/nls/dojoForEther_de-de", [], 1);
