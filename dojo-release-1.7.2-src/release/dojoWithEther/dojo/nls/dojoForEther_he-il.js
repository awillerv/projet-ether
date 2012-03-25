require({cache:{
'dijit/form/nls/he/validate':function(){
define(
"dijit/form/nls/he/validate", //begin v1.x content
({
	invalidMessage: "הערך שצוין אינו חוקי.",
	missingMessage: "זהו ערך דרוש.",
	rangeMessage: "הערך מחוץ לטווח."
})
//end v1.x content
);

},
'dijit/form/nls/he-il/validate':function(){
define('dijit/form/nls/he-il/validate',{});
},
'dijit/nls/he/loading':function(){
define(
"dijit/nls/he/loading", //begin v1.x content
({
	loadingState: "טעינה...‏",
	errorState: "אירעה שגיאה"
})
//end v1.x content
);

},
'dijit/nls/he-il/loading':function(){
define('dijit/nls/he-il/loading',{});
},
'dojo/nls/he/colors':function(){
define(
"dojo/nls/he/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "כחול פלדה",
antiquewhite: "לבן עתיק",
aqua: "אקווה",
aquamarine: "אקוומארין",
azure: "תכלת עז",
beige: "בז'",
bisque: "לבן שקד",
black: "שחור",
blanchedalmond: "שקד",
blue: "כחול",
blueviolet: "כחול-סגול",
brown: "חום",
burlywood: "חום דהוי",
cadetblue: "כחול ים",
chartreuse: "ירוק-צהוב",
chocolate: "שוקולד",
coral: "אלמוג",
cornflowerblue: "כחול דרדר",
cornsilk: "צהבהב",
crimson: "ארגמן",
cyan: "טורקיז",
darkblue: "כחול כהה",
darkcyan: "טורקיז כהה",
darkgoldenrod: "זהוב כהה",
darkgray: "אפור כהה",
darkgreen: "ירוק כהה",
darkgrey: "אפור כהה", // same as darkgray
darkkhaki: "חאקי כהה",
darkmagenta: "בורדו כהה",
darkolivegreen: "ירוק זית כהה",
darkorange: "כתום כהה",
darkorchid: "סחלב כהה",
darkred: "אדום כהה",
darksalmon: "סלמון כהה",
darkseagreen: "ירוק ים כהה",
darkslateblue: "כחול צפחה כהה",
darkslategray: "אפור צפחה כהה",
darkslategrey: "אפור צפחה כהה", // same as darkslategray
darkturquoise: "טורקיז כהה",
darkviolet: "סגול כהה",
deeppink: "ורוד עמוק",
deepskyblue: "כחול שמיים עמוק",
dimgray: "אפור עמום",
dimgrey: "אפור עמום", // same as dimgray
dodgerblue: "כחול",
firebrick: "לבנה שרופה",
floralwhite: "לבן פרחוני",
forestgreen: "ירוק יער",
fuchsia: "ורוד בהיר",
gainsboro: "גיינסבורו",
ghostwhite: "לבן רפאים",
gold: "זהב",
goldenrod: "זהוב",
gray: "אפור",
green: "ירוק",
greenyellow: "ירוק-צהוב",
grey: "אפור", // same as gray
honeydew: "ירקרק",
hotpink: "ורוד לוהט",
indianred: "אדום דהוי",
indigo: "אינדיגו",
ivory: "שנהב",
khaki: "חאקי",
lavender: "לבנדר",
lavenderblush: "סומק לבנדר",
lawngreen: "ירוק דשא",
lemonchiffon: "ירוק לימון",
lightblue: "תכלת",
lightcoral: "אלמוג בהיר",
lightcyan: "טורקיז בהיר",
lightgoldenrodyellow: "צהוב בהיר",
lightgray: "אפור בהיר",
lightgreen: "ירוק בהיר",
lightgrey: "אפור בהיר", // same as lightgray
lightpink: "ורוד בהיר",
lightsalmon: "סלמון בהיר",
lightseagreen: "ירוק ים בהיר",
lightskyblue: "כחול שמיים בהיר",
lightslategray: "אפור צפחה בהיר",
lightslategrey: "אפור צפחה בהיר", // same as lightslategray
lightsteelblue: "כחול פלדה בהיר",
lightyellow: "צהוב בהיר",
lime: "לימון",
limegreen: "ירוק לימוני",
linen: "פשתן",
magenta: "בורדו",
maroon: "חום אדמדם",
mediumaquamarine: "כחול בינוני",
mediumblue: "תכלת בינוני",
mediumorchid: "סחלב בינוני",
mediumpurple: "סגול בינוני",
mediumseagreen: "ירוק ים בינוני",
mediumslateblue: "כחול צפחה בינוני",
mediumspringgreen: "ירוק אביב בינוני",
mediumturquoise: "טורקיז בינוני",
mediumvioletred: "סגול-אדום בינוני",
midnightblue: "כחול כהה",
mintcream: "קרם מנטה",
mistyrose: "ורוד מעורפל",
moccasin: "מוקסין",
navajowhite: "לבן נוואחו",
navy: "כחול כהה",
oldlace: "תחרה עתיקה",
olive: "זית",
olivedrab: "זית עמום",
orange: "כתום",
orangered: "כתום אדום",
orchid: "סחלב",
palegoldenrod: "זהוב בהיר",
palegreen: "ירוק בהיר",
paleturquoise: "טורקיז בהיר",
palevioletred: "סגול-אדום בהיר",
papayawhip: "פפאיה",
peachpuff: "קציפת אפרסק",
peru: "פרו",
pink: "ורוד",
plum: "שזיף",
powderblue: "כחול חיוור",
purple: "סגול",
red: "אדום",
rosybrown: "חום ורדרד",
royalblue: "כחול מלכותי",
saddlebrown: "חום דהוי",
salmon: "סלמון",
sandybrown: "חום חולי",
seagreen: "ירוק ים",
seashell: "צדף",
sienna: "סיינה",
silver: "כסף",
skyblue: "כחול שמיים",
slateblue: "כחול צפחה",
slategray: "אפור צפחה",
slategrey: "אפור צפחה", // same as slategray
snow: "שלג",
springgreen: "ירוק אביב",
steelblue: "כחול פלדה",
tan: "חום אדמדם",
teal: "כחול-ירוק כהה",
thistle: "דרדר",
tomato: "עגבניה",
turquoise: "טורקיז",
violet: "סגול",
wheat: "חיוט",
white: "לבן",
whitesmoke: "עשן לבן",
yellow: "צהוב",
yellowgreen: "ירוק צהוב"
})
//end v1.x content
);

},
'dojo/nls/he-il/colors':function(){
define('dojo/nls/he-il/colors',{});
},
'dojo/cldr/nls/he/number':function(){
define(
"dojo/cldr/nls/he/number", //begin v1.x content
{
	"group": ",",
	"percentSign": "%",
	"exponential": "E",
	"scientificFormat": "#E0",
	"percentFormat": "#,##0%",
	"list": ";",
	"infinity": "∞",
	"patternDigit": "#",
	"minusSign": "-",
	"decimal": ".",
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
'dojo/cldr/nls/he-il/number':function(){
define('dojo/cldr/nls/he-il/number',{});
},
'dojox/form/nls/he/Uploader':function(){
define('dojox/form/nls/he/Uploader',{});
},
'dojox/form/nls/he-il/Uploader':function(){
define('dojox/form/nls/he-il/Uploader',{});
},
'dijit/form/nls/he/ComboBox':function(){
define(
"dijit/form/nls/he/ComboBox", //begin v1.x content
({
		previousMessage: "האפשרויות הקודמות",
		nextMessage: "אפשרויות נוספות"
})
//end v1.x content
);

},
'dijit/form/nls/he-il/ComboBox':function(){
define('dijit/form/nls/he-il/ComboBox',{});
},
'dijit/nls/he/common':function(){
define(
"dijit/nls/he/common", //begin v1.x content
({
	buttonOk: "אישור",
	buttonCancel: "ביטול",
	buttonSave: "שמירה",
	itemClose: "סגירה"
})
//end v1.x content
);

},
'dijit/nls/he-il/common':function(){
define('dijit/nls/he-il/common',{});
}}});
define("dojo/nls/dojoForEther_he-il", [], 1);
