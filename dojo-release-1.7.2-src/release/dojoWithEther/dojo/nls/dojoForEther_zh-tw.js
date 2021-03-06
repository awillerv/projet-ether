require({cache:{
'dijit/form/nls/zh/validate':function(){
define(
"dijit/form/nls/zh/validate", //begin v1.x content
({
	invalidMessage: "输入的值无效。",
	missingMessage: "此值是必需值。",
	rangeMessage: "此值超出范围。"
})
//end v1.x content
);

},
'dijit/form/nls/zh-tw/validate':function(){
define(
"dijit/form/nls/zh-tw/validate", //begin v1.x content
({
	invalidMessage: "輸入的值無效。",
	missingMessage: "必須提供此值。",
	rangeMessage: "此值超出範圍。"
})
//end v1.x content
);

},
'dijit/nls/zh/loading':function(){
define(
"dijit/nls/zh/loading", //begin v1.x content
({
	loadingState: "正在加载...",
	errorState: "对不起，发生了错误"
})
//end v1.x content
);

},
'dijit/nls/zh-tw/loading':function(){
define(
"dijit/nls/zh-tw/loading", //begin v1.x content
({
	loadingState: "載入中...",
	errorState: "抱歉，發生錯誤"
})
//end v1.x content
);

},
'dojo/nls/zh/colors':function(){
define(
"dojo/nls/zh/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "艾莉斯蓝",
antiquewhite: "古董白",
aqua: "水绿色",
aquamarine: "碧绿色",
azure: "浅天蓝",
beige: "米色",
bisque: "乳黄色",
black: "黑色",
blanchedalmond: "杏仁白",
blue: "蓝色",
blueviolet: "蓝紫色",
brown: "褐色",
burlywood: "原木色",
cadetblue: "军队蓝",
chartreuse: "浅黄绿色",
chocolate: "巧克力色",
coral: "珊瑚红",
cornflowerblue: "藏蓝色",
cornsilk: "玉米黄",
crimson: "绯红色",
cyan: "青色",
darkblue: "深蓝色",
darkcyan: "深青色",
darkgoldenrod: "深金黄色",
darkgray: "深灰色",
darkgreen: "深绿色",
darkgrey: "深灰色", // same as darkgray
darkkhaki: "深褐色",
darkmagenta: "深洋红色",
darkolivegreen: "深橄榄绿色",
darkorange: "深橙色",
darkorchid: "暗兰花紫",
darkred: "深红色",
darksalmon: "深橙红",
darkseagreen: "深海绿色",
darkslateblue: "深石板蓝",
darkslategray: "深石板灰",
darkslategrey: "深石板灰", // same as darkslategray
darkturquoise: "深青绿色",
darkviolet: "深紫罗兰",
deeppink: "深粉色",
deepskyblue: "深天蓝色",
dimgray: "暗灰色",
dimgrey: "暗灰色", // same as dimgray
dodgerblue: "宝蓝",
firebrick: "砖红色",
floralwhite: "花白",
forestgreen: "森林绿",
fuchsia: "紫红色",
gainsboro: "亮灰色",
ghostwhite: "苍白",
gold: "金黄色",
goldenrod: "鲜黄",
gray: "灰色",
green: "绿色",
greenyellow: "绿黄色",
grey: "灰色", // same as gray
honeydew: "蜜色",
hotpink: "暗粉",
indianred: "印度红",
indigo: "靛蓝色",
ivory: "象牙色",
khaki: "黄褐色",
lavender: "淡紫色",
lavenderblush: "淡紫红色",
lawngreen: "草绿色",
lemonchiffon: "柠檬色",
lightblue: "淡蓝色",
lightcoral: "浅珊瑚红",
lightcyan: "浅青色",
lightgoldenrodyellow: "浅金黄色",
lightgray: "浅灰色",
lightgreen: "浅绿色",
lightgrey: "浅灰色", // same as lightgray
lightpink: "浅粉色",
lightsalmon: "浅橙红色",
lightseagreen: "浅海绿色",
lightskyblue: "浅天蓝色",
lightslategray: "浅石板灰",
lightslategrey: "浅石板灰", // same as lightslategray
lightsteelblue: "浅钢蓝色",
lightyellow: "浅黄色",
lime: "酸橙色",
limegreen: "暗黄绿色",
linen: "亚麻布色",
magenta: "洋红色",
maroon: "褐紫红色",
mediumaquamarine: "淡碧绿色",
mediumblue: "淡蓝色",
mediumorchid: "淡兰花紫",
mediumpurple: "淡紫色",
mediumseagreen: "淡海绿色",
mediumslateblue: "淡灰蓝色",
mediumspringgreen: "淡草绿色",
mediumturquoise: "淡青绿色",
mediumvioletred: "淡紫罗兰",
midnightblue: "蓝黑色",
mintcream: "薄荷乳白",
mistyrose: "粉红玫瑰",
moccasin: "鹿皮黄",
navajowhite: "印地安黄",
navy: "藏青色",
oldlace: "旧布黄",
olive: "橄榄色",
olivedrab: "暗橄榄色",
orange: "橙色",
orangered: "桔红色",
orchid: "兰花紫",
palegoldenrod: "浅金黄色",
palegreen: "淡绿色",
paleturquoise: "淡青绿色",
palevioletred: "浅紫罗兰",
papayawhip: "粉木瓜橙",
peachpuff: "粉桃红",
peru: "秘鲁棕",
pink: "粉红色",
plum: "梅红色",
powderblue: "粉蓝色",
purple: "紫色",
red: "红色",
rosybrown: "玫瑰褐色",
royalblue: "亮蓝色",
saddlebrown: "鞍具褐色",
salmon: "橙红色",
sandybrown: "浅褐色",
seagreen: "海绿色",
seashell: "贝壳白",
sienna: "赭色",
silver: "银白色",
skyblue: "天蓝色",
slateblue: "石板蓝",
slategray: "石板灰",
slategrey: "石板灰", // same as slategray
snow: "雪白",
springgreen: "浅草绿色",
steelblue: "钢蓝色",
tan: "茶色",
teal: "青色",
thistle: "蓟色",
tomato: "番茄色",
transparent: "透明的",
turquoise: "青绿色",
violet: "紫罗兰色",
wheat: "淡黄色",
white: "白色",
whitesmoke: "烟白色",
yellow: "黄色",
yellowgreen: "黄绿色"
})
//end v1.x content
);

},
'dojo/nls/zh-tw/colors':function(){
define(
"dojo/nls/zh-tw/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "愛麗絲藍",
antiquewhite: "米白色",
aqua: "水色",
aquamarine: "碧綠色",
azure: "天藍色",
beige: "灰棕色",
bisque: "橘黃色",
black: "黑色",
blanchedalmond: "杏仁白",
blue: "藍色",
blueviolet: "藍紫色",
brown: "褐色",
burlywood: "實木色",
cadetblue: "軍服藍",
chartreuse: "淡黃綠色",
chocolate: "巧克力色",
coral: "珊瑚紅",
cornflowerblue: "矢車菊藍",
cornsilk: "玉米黃",
crimson: "暗深紅色",
cyan: "青色",
darkblue: "暗藍色",
darkcyan: "暗青色",
darkgoldenrod: "暗金菊色",
darkgray: "暗灰色",
darkgreen: "暗綠色",
darkgrey: "暗灰色", // same as darkgray
darkkhaki: "暗卡其色",
darkmagenta: "暗紫紅色",
darkolivegreen: "暗橄欖綠",
darkorange: "暗橙色",
darkorchid: "暗蘭花色",
darkred: "暗紅色",
darksalmon: "暗鮭紅",
darkseagreen: "暗海綠色",
darkslateblue: "暗岩藍色",
darkslategray: "暗岩灰色",
darkslategrey: "暗岩灰色", // same as darkslategray
darkturquoise: "暗松石綠",
darkviolet: "暗紫羅蘭色",
deeppink: "深粉紅色",
deepskyblue: "深天藍色",
dimgray: "昏灰色",
dimgrey: "昏灰色", // same as dimgray
dodgerblue: "道奇藍",
firebrick: "紅磚色",
floralwhite: "花卉白",
forestgreen: "森綠色",
fuchsia: "海棠紅",
gainsboro: "石板灰",
ghostwhite: "幽靈色",
gold: "金色",
goldenrod: "金菊色",
gray: "灰色",
green: "綠色",
greenyellow: "綠黃色",
grey: "灰色", // same as gray
honeydew: "密瓜色",
hotpink: "暖粉紅色",
indianred: "印度紅",
indigo: "靛藍色",
ivory: "象牙色",
khaki: "卡其色",
lavender: "薰衣草紫",
lavenderblush: "薰衣草紫紅",
lawngreen: "草綠色",
lemonchiffon: "奶油黃",
lightblue: "淡藍色",
lightcoral: "淡珊瑚紅",
lightcyan: "淡青色",
lightgoldenrodyellow: "淡金菊黃",
lightgray: "淡灰色",
lightgreen: "淡綠色",
lightgrey: "淡灰色", // same as lightgray
lightpink: "淡粉紅色",
lightsalmon: "淡鮭紅",
lightseagreen: "淡海綠色",
lightskyblue: "淡天藍色",
lightslategray: "淡岩灰色",
lightslategrey: "淡岩灰色", // same as lightslategray
lightsteelblue: "淡鐵藍色",
lightyellow: "淡黃色",
lime: "檸檬色",
limegreen: "檸檬綠",
linen: "亞麻色",
magenta: "紫紅色",
maroon: "栗色",
mediumaquamarine: "中碧綠色",
mediumblue: "中藍色",
mediumorchid: "中蘭紫色",
mediumpurple: "中紫色",
mediumseagreen: "中海綠色",
mediumslateblue: "中岩藍色",
mediumspringgreen: "中春綠色",
mediumturquoise: "中松石綠",
mediumvioletred: "中紫羅蘭紅",
midnightblue: "午夜藍",
mintcream: "薄荷乳白色",
mistyrose: "霧玫瑰色",
moccasin: "鹿皮黃色",
navajowhite: "印地安黃色",
navy: "海軍藍",
oldlace: "舊蕾絲色",
olive: "橄欖色",
olivedrab: "橄欖綠",
orange: "橙色",
orangered: "橙紅色",
orchid: "蘭花色",
palegoldenrod: "灰金菊色",
palegreen: "灰綠色",
paleturquoise: "灰松石綠",
palevioletred: "灰紫羅蘭紅",
papayawhip: "番木瓜色",
peachpuff: "粉撲桃色",
peru: "祕魯色",
pink: "粉紅色",
plum: "李紫色",
powderblue: "粉藍色",
purple: "紫色",
red: "紅色",
rosybrown: "玫瑰褐",
royalblue: "品藍色",
saddlebrown: "鞍褐色",
salmon: "鮭紅色",
sandybrown: "沙褐色",
seagreen: "海綠色",
seashell: "海貝色",
sienna: "黃土赭色",
silver: "銀色",
skyblue: "天藍色",
slateblue: "岩藍色",
slategray: "岩灰色",
slategrey: "岩灰色", // same as slategray
snow: "雪白色",
springgreen: "春綠色",
steelblue: "鐵藍色",
tan: "皮革色",
teal: "深藍綠色",
thistle: "薊色",
tomato: "蕃茄紅",
transparent: "透明",
turquoise: "松石綠",
violet: "紫羅蘭色",
wheat: "小麥色",
white: "白色",
whitesmoke: "白煙色",
yellow: "黃色",
yellowgreen: "黃綠色"
})
//end v1.x content
);

},
'dojo/cldr/nls/zh/number':function(){
define(
"dojo/cldr/nls/zh/number", //begin v1.x content
{
	"decimalFormat": "#,##0.###",
	"group": ",",
	"scientificFormat": "#E0",
	"percentFormat": "#,##0%",
	"currencyFormat": "¤#,##0.00",
	"decimal": "."
}
//end v1.x content
);
},
'dojo/cldr/nls/zh-tw/number':function(){
define('dojo/cldr/nls/zh-tw/number',{});
},
'dojox/form/nls/zh/Uploader':function(){
define(
"dojox/form/nls/zh/Uploader", ({
	label: "选择文件..."
})
);

},
'dojox/form/nls/zh-tw/Uploader':function(){
define(
"dojox/form/nls/zh-tw/Uploader", ({
	label: "選取檔案..."
})
);

},
'dijit/form/nls/zh/ComboBox':function(){
define(
"dijit/form/nls/zh/ComboBox", //begin v1.x content
({
		previousMessage: "先前选项",
		nextMessage: "更多选项"
})
//end v1.x content
);

},
'dijit/form/nls/zh-tw/ComboBox':function(){
define(
"dijit/form/nls/zh-tw/ComboBox", //begin v1.x content
({
		previousMessage: "前一個選擇項",
		nextMessage: "其他選擇項"
})
//end v1.x content
);

},
'dijit/nls/zh/common':function(){
define(
"dijit/nls/zh/common", //begin v1.x content
({
	buttonOk: "确定",
	buttonCancel: "取消",
	buttonSave: "保存",
	itemClose: "关闭"
})
//end v1.x content
);

},
'dijit/nls/zh-tw/common':function(){
define(
"dijit/nls/zh-tw/common", //begin v1.x content
({
	buttonOk: "確定",
	buttonCancel: "取消",
	buttonSave: "儲存",
	itemClose: "關閉"
})
//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_zh-tw", [], 1);
