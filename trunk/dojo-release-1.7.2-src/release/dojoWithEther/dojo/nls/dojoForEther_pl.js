require({cache:{
'dijit/form/nls/pl/validate':function(){
define(
"dijit/form/nls/pl/validate", //begin v1.x content
({
	invalidMessage: "Wprowadzona wartość jest niepoprawna.",
	missingMessage: "Ta wartość jest wymagana.",
	rangeMessage: "Ta wartość jest spoza zakresu."
})
//end v1.x content
);

},
'dijit/nls/pl/loading':function(){
define(
"dijit/nls/pl/loading", //begin v1.x content
({
	loadingState: "Ładowanie...",
	errorState: "Niestety, wystąpił błąd"
})
//end v1.x content
);

},
'dojo/nls/pl/colors':function(){
define(
"dojo/nls/pl/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "bladoniebieski",
antiquewhite: "biel antyczna",
aqua: "morski",
aquamarine: "akwamaryna",
azure: "lazurowy",
beige: "beżowy",
bisque: "biszkoptowy",
black: "czarny",
blanchedalmond: "migdałowy",
blue: "niebieski",
blueviolet: "błękitnofiołkowy",
brown: "brązowy",
burlywood: "kolor drewna",
cadetblue: "niebieskoszary",
chartreuse: "żółtooliwkowy",
chocolate: "czekoladowy",
coral: "koralowy",
cornflowerblue: "chabrowy",
cornsilk: "kukurydziany",
crimson: "karmazynowy",
cyan: "niebieskozielony",
darkblue: "ciemnoniebieski",
darkcyan: "ciemnoniebieskozielony",
darkgoldenrod: "ciemne stare złoto",
darkgray: "ciemnoszary",
darkgreen: "ciemnozielony",
darkgrey: "ciemnoszary", // same as darkgray
darkkhaki: "ciemny khaki",
darkmagenta: "ciemnoamarantowy",
darkolivegreen: "ciemnooliwkowy",
darkorange: "ciemnopomarańczowy",
darkorchid: "ciemna orchidea",
darkred: "ciemnoczerwony",
darksalmon: "ciemnołososiowy",
darkseagreen: "ciemna zieleń morska",
darkslateblue: "ciemny gołębi",
darkslategray: "ciemny mysi",
darkslategrey: "ciemny mysi", // same as darkslategray
darkturquoise: "mlecznoturkusowy",
darkviolet: "ciemnofiołkowy",
deeppink: "głęboki różowy",
deepskyblue: "intensywny błękit nieba",
dimgray: "przyciemniony szary",
dimgrey: "przyciemniony szary", // same as dimgray
dodgerblue: "błękit Dodgers",
firebrick: "ceglasty",
floralwhite: "kwiatowa biel",
forestgreen: "leśna zieleń",
fuchsia: "fuksjowy",
gainsboro: "bladoszary",
ghostwhite: "bladobiały",
gold: "złoty",
goldenrod: "stare złoto",
gray: "szary",
green: "zielony",
greenyellow: "zielonożółty",
grey: "szary", // same as gray
honeydew: "miodowy",
hotpink: "odblaskoworóżowy",
indianred: "kasztanowy",
indigo: "indygo",
ivory: "kość słoniowa",
khaki: "khaki",
lavender: "lawendowy",
lavenderblush: "lawendowocielisty",
lawngreen: "trawiasty",
lemonchiffon: "cytrynowy",
lightblue: "jasnoniebieski",
lightcoral: "jasnokoralowy",
lightcyan: "jasnoniebieskozielony",
lightgoldenrodyellow: "jasnożółte stare złoto",
lightgray: "jasnoszary",
lightgreen: "jasnozielony",
lightgrey: "jasnoszary", // same as lightgray
lightpink: "jasnoróżowy",
lightsalmon: "jasnołososiowy",
lightseagreen: "jasna zieleń morska",
lightskyblue: "jasny błękit nieba",
lightslategray: "jasny mysi",
lightslategrey: "jasny mysi", // same as lightslategray
lightsteelblue: "jasnostalowoniebieski",
lightyellow: "jasnożółty",
lime: "limonkowy",
limegreen: "zielony limonkowy",
linen: "lniany",
magenta: "amarantowy",
maroon: "kasztanowy",
mediumaquamarine: "średnia akwamaryna",
mediumblue: "ciemnochabrowy",
mediumorchid: "średnia orchidea",
mediumpurple: "średni fioletowy",
mediumseagreen: "średnia zieleń morska",
mediumslateblue: "średni gołębi",
mediumspringgreen: "średnia wiosenna zieleń",
mediumturquoise: "średni turkusowy",
mediumvioletred: "średni fiołkowowoczerwony",
midnightblue: "granatowoczarny",
mintcream: "jasnomiętowy",
mistyrose: "bladoróżany",
moccasin: "mokasynowy",
navajowhite: "piaskowy",
navy: "granatowy",
oldlace: "bladopomarańczowy",
olive: "oliwkowy",
olivedrab: "oliwkowa zieleń",
orange: "pomarańczowy",
orangered: "pomarańczowoczerwony",
orchid: "orchidea",
palegoldenrod: "blade stare złoto",
palegreen: "bladozielony",
paleturquoise: "bladoturkusowy",
palevioletred: "blady fiołkowoczerwony",
papayawhip: "papaja",
peachpuff: "brzoskwiniowy",
peru: "jasnobrązowy",
pink: "różowy",
plum: "śliwkowy",
powderblue: "jasnobladobłękitny",
purple: "fioletowy",
red: "czerwony",
rosybrown: "różowobrązowy",
royalblue: "królewski błękit",
saddlebrown: "brąz skórzany",
salmon: "łososiowy",
sandybrown: "piaskowy brąz",
seagreen: "zieleń morska",
seashell: "matowoliliowy",
sienna: "siena",
silver: "srebrny",
skyblue: "błękit nieba",
slateblue: "gołębi",
slategray: "mysi",
slategrey: "mysi", // same as slategray
snow: "śnieżny",
springgreen: "wiosenna zieleń",
steelblue: "stalowoniebieski",
tan: "śniady",
teal: "zielonomodry",
thistle: "bladofioletowy",
tomato: "pomidorowy",
transparent: "przezroczysty",
turquoise: "turkusowy",
violet: "fiołkowy",
wheat: "pszeniczny",
white: "biały",
whitesmoke: "przydymiony biały",
yellow: "żółty",
yellowgreen: "żółtozielony"
})
//end v1.x content
);

},
'dojo/cldr/nls/pl/number':function(){
define(
"dojo/cldr/nls/pl/number", //begin v1.x content
{
	"group": " ",
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
'dojox/form/nls/pl/Uploader':function(){
define(
"dojox/form/nls/pl/Uploader", ({
	label: "Wybierz pliki..."
})
);

},
'dijit/form/nls/pl/ComboBox':function(){
define(
"dijit/form/nls/pl/ComboBox", //begin v1.x content
({
		previousMessage: "Poprzednie wybory",
		nextMessage: "Więcej wyborów"
})
//end v1.x content
);

},
'dijit/nls/pl/common':function(){
define(
"dijit/nls/pl/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Anuluj",
	buttonSave: "Zapisz",
	itemClose: "Zamknij"
})
//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_pl", [], 1);
