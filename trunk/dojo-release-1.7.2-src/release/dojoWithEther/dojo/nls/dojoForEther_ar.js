require({cache:{
'dijit/form/nls/ar/validate':function(){
define(
"dijit/form/nls/ar/validate", //begin v1.x content
({
	invalidMessage: "القيمة التي تم ادخالها غير صحيحة.",
	missingMessage: "يجب ادخال هذه القيمة.",
	rangeMessage: "هذه القيمة ليس بالمدى الصحيح."
})
//end v1.x content
);

},
'dijit/nls/ar/loading':function(){
define(
"dijit/nls/ar/loading", //begin v1.x content
({
	loadingState: "جاري التحميل...",
	errorState: "عفوا، حدث خطأ"
})
//end v1.x content
);

},
'dojo/nls/ar/colors':function(){
define(
"dojo/nls/ar/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "أزرق فاتح",
antiquewhite: "أبيض عتيق",
aqua: "أزرق مائي",
aquamarine: "أزرق مائل للأخضر (زبرجد)",
azure: "أزرق سماوي",
beige: "بيج",
bisque: "أصفر برتقالي الى رمادي مصفر",
black: "أسود",
blanchedalmond: "أخضر مائل للبياض",
blue: "أزرق",
blueviolet: "أزرق-بنفسجي",
brown: "بني",
burlywood: "خشبي",
cadetblue: "أزرق ملون بالرمادي",
chartreuse: "أخضر مائل للصفرة",
chocolate: "بني غامق",
coral: "مرجاني",
cornflowerblue: "أزرق عنبري",
cornsilk: "حريري",
crimson: "قرمزي",
cyan: "أزرق سماوي",
darkblue: "أزرق داكن",
darkcyan: "أزرق سماوي داكن",
darkgoldenrod: "أصفر ذهبي داكن",
darkgray: "رمادي داكن",
darkgreen: "أخضر داكن",
darkgrey: "رمادي داكن", // same as darkgray
darkkhaki: "كاكي داكن",
darkmagenta: "قرمزي داكن",
darkolivegreen: "أخضر زيتوني داكن",
darkorange: "برتقالي داكن",
darkorchid: "أرجواني داكن",
darkred: "أحمر داكن",
darksalmon: "فضي داكن",
darkseagreen: "أخضر مائل للأزرق داكن",
darkslateblue: "أزرق اردوازي داكن",
darkslategray: "رمادي اردوازي داكن",
darkslategrey: "رمادي اردوازي داكن", // same as darkslategray
darkturquoise: "تركواز داكن",
darkviolet: "بنفسجي داكن",
deeppink: "أحمر وردي غامق",
deepskyblue: "أزرق سماوي غامق",
dimgray: "رمادي شاحب",
dimgrey: "رمادي شاحب", // same as dimgray
dodgerblue: "أزرق عنبري",
firebrick: "أصفر زاهي",
floralwhite: "أبيض زهري",
forestgreen: "أخضر بلون أشجار الغابات",
fuchsia: "فوشيا",
gainsboro: "رمادي مائل للأزرق فاتح",
ghostwhite: "أبيض شفاف",
gold: "ذهبي",
goldenrod: "أصفر ذهبي",
gray: "رمادي",
green: "أخضر",
greenyellow: "أخضر مائل للأصفر",
grey: "رمادي", // same as gray
honeydew: "أبيض مائل للأخضر",
hotpink: "أحمر وردي زاهي",
indianred: "أحمر هندي",
indigo: "نيلي",
ivory: "عاجي",
khaki: "كاكي",
lavender: "أرجواني شاحب",
lavenderblush: "أحمر أرجواني",
lawngreen: "أخضر بلون العشب",
lemonchiffon: "أصفر شفاف",
lightblue: "أزرق فاتح",
lightcoral: "مرجاني فاتح",
lightcyan: "سماوي فاتح",
lightgoldenrodyellow: "أصفر ذهبي فاتح",
lightgray: "رمادي فاتح",
lightgreen: "أخضر فاتح",
lightgrey: "رمادي فاتح", // same as lightgray
lightpink: "وردي فاتح",
lightsalmon: "فضي فاتح",
lightseagreen: "أخضر مائل للأزرق فاتح",
lightskyblue: "أزرق سماوي فاتح",
lightslategray: "رمادي اردوازي فاتح",
lightslategrey: "رمادي اردوازي فاتح", // same as lightslategray
lightsteelblue: "أزرق معدني فاتح",
lightyellow: "أصفر فاتح",
lime: "ليموني",
limegreen: "أخضر ليموني",
linen: "كتاني",
magenta: "أحمر قرمزي",
maroon: "أحمر داكن",
mediumaquamarine: "أزرق مائل للأخضر (زبرجد) متوسط",
mediumblue: "أزرق متوسط",
mediumorchid: "أرجواني متوسط",
mediumpurple: "قرمزي متوسط",
mediumseagreen: "أخضر مائل للأزرق متوسط",
mediumslateblue: "أزرق اردوازي متوسط",
mediumspringgreen: "أخضر ربيعي متوسط",
mediumturquoise: "تركواز متوسط",
mediumvioletred: "أحمر-بنفسجي متوسط",
midnightblue: "أزرق بحري",
mintcream: "أصفر شاحب مائل للأخضر الزرعي",
mistyrose: "وردي",
moccasin: "نحاسي أحمر",
navajowhite: "أبيض ملاحي",
navy: "أزرق داكن",
oldlace: "برتقالي مائل للأصفر شاحب",
olive: "أخضر زيتوني داكن",
olivedrab: "أسود فاتح",
orange: "برتقالي",
orangered: "أحمر مائل للبرتقالي",
orchid: "أرجواني فاتح",
palegoldenrod: "أصفر ذهبي شاحب",
palegreen: "أخضر شاحب",
paleturquoise: "تركواز شاحب",
palevioletred: "أحمر-بنفسجي شاحب",
papayawhip: "خوخي فاتح",
peachpuff: "خوخي مائل للأصفر",
peru: "بني جملي",
pink: "وردي",
plum: "أرجواني داكن",
powderblue: "أزرق مائل للأصفر",
purple: "ارجواني",
red: "أحمر",
rosybrown: "بني وردي",
royalblue: "أزرق ملكي",
saddlebrown: "بني فاتح",
salmon: "برتقالي وردي شاحب",
sandybrown: "بني مائل للصفرة",
seagreen: "أخضر مائل للأزرق",
seashell: "أبيض مائل للأصفر فاتح",
sienna: "بني محروق",
silver: "فضي",
skyblue: "أزرق سماوي",
slateblue: "أزرق اردوازي",
slategray: "رمادي اردوازي",
slategrey: "رمادي اردوازي", // same as slategray
snow: "أبيض ثلجي",
springgreen: "أخضر ربيعي",
steelblue: "أزرق معدني",
tan: "خمري",
teal: "بترولي",
thistle: "ارجواني شاحب",
tomato: "أحمر مائل للأصفر",
turquoise: "تركواز",
violet: "بنفسجي",
wheat: "أخضر قمحي",
white: "أبيض",
whitesmoke: "دخان أبيض",
yellow: "أصفر",
yellowgreen: "أخضر مائل للأصفر"
})
//end v1.x content
);

},
'dojo/cldr/nls/ar/number':function(){
define(
"dojo/cldr/nls/ar/number", //begin v1.x content
{
	"group": "٬",
	"percentSign": "٪",
	"exponential": "اس",
	"list": "؛",
	"infinity": "∞",
	"minusSign": "-",
	"decimal": "٫",
	"nan": "ليس رقم",
	"perMille": "؉",
	"decimalFormat": "#,##0.###;#,##0.###-",
	"currencyFormat": "¤ #,##0.00;¤ #,##0.00-",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojox/form/nls/ar/Uploader':function(){
define('dojox/form/nls/ar/Uploader',{});
},
'dijit/form/nls/ar/ComboBox':function(){
define(
"dijit/form/nls/ar/ComboBox", //begin v1.x content
({
		previousMessage: "الاختيارات السابقة",
		nextMessage: "مزيد من الاختيارات"
})
//end v1.x content
);

},
'dijit/nls/ar/common':function(){
define(
"dijit/nls/ar/common", //begin v1.x content
({
	buttonOk: "حسنا",
	buttonCancel: "الغاء",
	buttonSave: "حفظ",
	itemClose: "اغلاق"
})
//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_ar", [], 1);
