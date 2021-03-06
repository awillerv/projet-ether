require({cache:{
'dijit/form/nls/tr/validate':function(){
define(
"dijit/form/nls/tr/validate", //begin v1.x content
({
	invalidMessage: "Girilen değer geçersiz.",
	missingMessage: "Bu değer gerekli.",
	rangeMessage: "Bu değer aralık dışında."
})
//end v1.x content
);

},
'dijit/nls/tr/loading':function(){
define(
"dijit/nls/tr/loading", //begin v1.x content
({
	loadingState: "Yükleniyor...",
	errorState: "Üzgünüz, bir hata oluştu"
})
//end v1.x content
);

},
'dojo/nls/tr/colors':function(){
define(
"dojo/nls/tr/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "alice mavisi",
antiquewhite: "antik beyaz",
aqua: "deniz mavisi",
aquamarine: "akuamarin",
azure: "azur mavisi",
beige: "bej",
bisque: "bisküvi",
black: "siyah",
blanchedalmond: "soluk badem",
blue: "mavi",
blueviolet: "mavi-mor",
brown: "kahverengi",
burlywood: "sarımsı kahverengi",
cadetblue: "denizci mavisi",
chartreuse: "chartreuse",
chocolate: "çikolata",
coral: "mercan",
cornflowerblue: "peygamber çiçeği mavisi",
cornsilk: "mısır rengi",
crimson: "crimson",
cyan: "camgöbeği",
darkblue: "koyu mavi",
darkcyan: "koyu camgöbeği",
darkgoldenrod: "koyu sarı",
darkgray: "koyu gri",
darkgreen: "koyu yeşil",
darkgrey: "koyu gri", // same as darkgray
darkkhaki: "koyu haki",
darkmagenta: "koyu mor",
darkolivegreen: "koyu zeytin yeşili",
darkorange: "koyu turuncu",
darkorchid: "koyu orkide",
darkred: "koyu kırmızı",
darksalmon: "koyu somon",
darkseagreen: "koyu deniz yeşili",
darkslateblue: "koyu arduvaz mavisi",
darkslategray: "koyu arduvaz grisi",
darkslategrey: "koyu arduvaz grisi", // same as darkslategray
darkturquoise: "koyu turkuaz",
darkviolet: "koyu eflatun",
deeppink: "koyu pembe",
deepskyblue: "koyu gök mavisi",
dimgray: "soluk gri",
dimgrey: "soluk gri", // same as dimgray
dodgerblue: "toz mavisi",
firebrick: "canlı kiremit",
floralwhite: "çiçek beyazı",
forestgreen: "koyu deniz yeşili",
fuchsia: "fuşya",
gainsboro: "gainsboro",
ghostwhite: "silik beyaz",
gold: "altın",
goldenrod: "sarısabır",
gray: "gri",
green: "yeşil",
greenyellow: "yeşil-sarı",
grey: "gri", // same as gray
honeydew: "çam sakızı",
hotpink: "sıcak pembe",
indianred: "kızılderili kırmızısı",
indigo: "çivit mavisi",
ivory: "fildişi",
khaki: "haki",
lavender: "lavanta",
lavenderblush: "lavanta pembesi",
lawngreen: "çimen yeşili",
lemonchiffon: "limoni",
lightblue: "açık mavi",
lightcoral: "açık mercan",
lightcyan: "açık camgöbeği",
lightgoldenrodyellow: "açık sarısabır",
lightgray: "açık gri",
lightgreen: "açık yeşil",
lightgrey: "açık gri", // same as lightgray
lightpink: "açık pembe",
lightsalmon: "açık somon",
lightseagreen: "açık deniz yeşili",
lightskyblue: "açık gök mavisi",
lightslategray: "açık arduvaz grisi",
lightslategrey: "açık arduvaz grisi", // same as lightslategray
lightsteelblue: "açık metalik mavi",
lightyellow: "açık sarı",
lime: "limon yeşili",
limegreen: "küf yeşili",
linen: "keten",
magenta: "macenta",
maroon: "kestane",
mediumaquamarine: "orta akuamarin",
mediumblue: "orta mavi",
mediumorchid: "orta orkide",
mediumpurple: "orta mor",
mediumseagreen: "orta deniz yeşili",
mediumslateblue: "orta arduvaz mavisi",
mediumspringgreen: "orta bahar yeşili",
mediumturquoise: "orta turkuaz",
mediumvioletred: "orta menekşe kırmızısı",
midnightblue: "gece mavisi",
mintcream: "naneli krem",
mistyrose: "gülkurusu",
moccasin: "mokosen",
navajowhite: "navajo beyazı",
navy: "lacivert",
oldlace: "eski dantel",
olive: "zeytin",
olivedrab: "asker yeşili",
orange: "turuncu",
orangered: "turuncu kırmızı",
orchid: "orkide",
palegoldenrod: "soluk sarısabır",
palegreen: "soluk yeşil",
paleturquoise: "soluk turkuaz",
palevioletred: "soluk menekşe kırmızısı",
papayawhip: "papaya sapı",
peachpuff: "açık şeftali",
peru: "peru",
pink: "pembe",
plum: "erik",
powderblue: "pudra mavisi",
purple: "mor",
red: "kırmızı",
rosybrown: "pembemsi kahverengi",
royalblue: "parlak koyu mavi",
saddlebrown: "açık kahve",
salmon: "somon",
sandybrown: "kum rengi",
seagreen: "deniz yeşili",
seashell: "deniz kabuğu",
sienna: "koyu kahve",
silver: "gümüş",
skyblue: "gök mavisi",
slateblue: "arduvaz mavisi",
slategray: "arduvaz grisi",
slategrey: "arduvaz grisi", // same as slategray
snow: "kar",
springgreen: "bahar yeşili",
steelblue: "metalik mavi",
tan: "güneş yanığı",
teal: "Teal mavi",
thistle: "devedikeni",
tomato: "domates",
transparent: "saydam",
turquoise: "turkuaz",
violet: "eflatun",
wheat: "buğday",
white: "beyaz",
whitesmoke: "beyaz duman",
yellow: "sarı",
yellowgreen: "sarı yeşil"
})
//end v1.x content
);

},
'dojo/cldr/nls/tr/number':function(){
define(
"dojo/cldr/nls/tr/number", //begin v1.x content
{
	"group": ".",
	"percentSign": "%",
	"exponential": "E",
	"scientificFormat": "#E0",
	"percentFormat": "% #,##0",
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
'dojox/form/nls/tr/Uploader':function(){
define(
"dojox/form/nls/tr/Uploader", ({
	label: "Dosyaları Seç..."
})
);

},
'dijit/form/nls/tr/ComboBox':function(){
define(
"dijit/form/nls/tr/ComboBox", //begin v1.x content
({
		previousMessage: "Önceki seçenekler",
		nextMessage: "Diğer seçenekler"
})
//end v1.x content
);

},
'dijit/nls/tr/common':function(){
define(
"dijit/nls/tr/common", //begin v1.x content
({
	buttonOk: "Tamam",
	buttonCancel: "İptal",
	buttonSave: "Kaydet",
	itemClose: "Kapat"
})
//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_tr", [], 1);
