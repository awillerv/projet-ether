require({cache:{
'dijit/form/nls/ja/validate':function(){
define(
"dijit/form/nls/ja/validate", //begin v1.x content
({
	invalidMessage: "入力した値は無効です。",
	missingMessage: "この値は必須です。",
	rangeMessage: "この値は範囲外です。"
})
//end v1.x content
);

},
'dijit/form/nls/ja-jp/validate':function(){
define('dijit/form/nls/ja-jp/validate',{});
},
'dijit/nls/ja/loading':function(){
define(
"dijit/nls/ja/loading", //begin v1.x content
({
	loadingState: "ロード中...",
	errorState: "エラーが発生しました。"
})
//end v1.x content
);

},
'dijit/nls/ja-jp/loading':function(){
define('dijit/nls/ja-jp/loading',{});
},
'dojo/nls/ja/colors':function(){
define(
"dojo/nls/ja/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "アリス・ブルー",
antiquewhite: "アンティーク・ホワイト",
aqua: "アクア",
aquamarine: "碧緑",
azure: "薄い空色",
beige: "ベージュ",
bisque: "ビスク",
black: "黒",
blanchedalmond: "皮なしアーモンド",
blue: "青",
blueviolet: "青紫",
brown: "茶",
burlywood: "バーリーウッド",
cadetblue: "くすんだ青",
chartreuse: "淡黄緑",
chocolate: "チョコレート",
coral: "珊瑚",
cornflowerblue: "コーンフラワー・ブルー",
cornsilk: "コーンシルク",
crimson: "深紅",
cyan: "シアン・ブルー",
darkblue: "ダーク・ブルー",
darkcyan: "ダーク・シアン・ブルー",
darkgoldenrod: "ダーク・ゴールデン・ロッド",
darkgray: "ダーク・グレイ",
darkgreen: "ダーク・グリーン",
darkgrey: "ダーク・グレイ", // same as darkgray
darkkhaki: "ダーク・カーキー",
darkmagenta: "ダーク・マジェンタ",
darkolivegreen: "ダーク・オリーブ・グリーン",
darkorange: "ダーク・オレンジ",
darkorchid: "ダーク・オーキッド",
darkred: "ダーク・レッド",
darksalmon: "ダーク・サーモン",
darkseagreen: "ダーク・シー・グリーン",
darkslateblue: "ダーク・スレート・ブルー",
darkslategray: "ダーク・スレート・グレイ",
darkslategrey: "ダーク・スレート・グレイ", // same as darkslategray
darkturquoise: "ダーク・ターコイズ",
darkviolet: "ダーク・バイオレット",
deeppink: "濃いピンク",
deepskyblue: "濃い空色",
dimgray: "くすんだグレイ",
dimgrey: "くすんだグレイ", // same as dimgray
dodgerblue: "ドッジャー・ブルー",
firebrick: "赤煉瓦色",
floralwhite: "フローラル・ホワイト",
forestgreen: "フォレスト・グリーン",
fuchsia: "紫紅色",
gainsboro: "ゲインズボーロ",
ghostwhite: "ゴースト・ホワイト",
gold: "金",
goldenrod: "ゴールデン・ロッド",
gray: "グレイ",
green: "緑",
greenyellow: "緑黄色",
grey: "グレイ", // same as gray
honeydew: "ハニーデュー",
hotpink: "ホット・ピンク",
indianred: "インディアン・レッド",
indigo: "藍色",
ivory: "アイボリー",
khaki: "カーキー",
lavender: "ラベンダー",
lavenderblush: "ラベンダー・ブラッシ",
lawngreen: "ローン・グリーン",
lemonchiffon: "レモン・シフォン",
lightblue: "ライト・ブルー",
lightcoral: "ライト・コーラル",
lightcyan: "ライト・シアン",
lightgoldenrodyellow: "ライト・ゴールデン・ロッド・イエロー",
lightgray: "ライト・グレイ",
lightgreen: "ライト・グリーン",
lightgrey: "ライト・グレイ", // same as lightgray
lightpink: "ライト・ピンク",
lightsalmon: "ライト・サーモン",
lightseagreen: "ライト・シー・グリーン",
lightskyblue: "ライト・スカイ・ブルー",
lightslategray: "ライト・スレート・グレイ",
lightslategrey: "ライト・スレート・グレイ", // same as lightslategray
lightsteelblue: "ライト・スチール・ブルー",
lightyellow: "ライト・イエロー",
lime: "ライム",
limegreen: "ライム・グリーン",
linen: "亜麻色",
magenta: "赤紫",
maroon: "えび茶",
mediumaquamarine: "ミディアム・アクアマリーン",
mediumblue: "ミディアム・ブルー",
mediumorchid: "ミディアム・オーキッド",
mediumpurple: "ミディアム・パープル",
mediumseagreen: "ミディアム・シー・グリーン",
mediumslateblue: "ミディアム・スレート・ブルー",
mediumspringgreen: "ミディアム・スプリング・グリーン",
mediumturquoise: "ミディアム・ターコイズ",
mediumvioletred: "ミディアム・バイオレット・レッド",
midnightblue: "ミッドナイト・ブルー",
mintcream: "ミント・クリーム",
mistyrose: "ミスティ・ローズ",
moccasin: "モカシン",
navajowhite: "ナバホ・ホワイト",
navy: "濃紺",
oldlace: "オールド・レイス",
olive: "オリーブ",
olivedrab: "濃黄緑",
orange: "オレンジ",
orangered: "オレンジ・レッド",
orchid: "薄紫",
palegoldenrod: "ペイル・ゴールデン・ロッド",
palegreen: "ペイル・グリーン",
paleturquoise: "ペイル・ターコイズ",
palevioletred: "ペイル・バイオレット・レッド",
papayawhip: "パパイア・ホイップ",
peachpuff: "ピーチ・パフ",
peru: "ペルー",
pink: "ピンク",
plum: "深紫",
powderblue: "淡青",
purple: "紫",
red: "赤",
rosybrown: "ロージー・ブラウン",
royalblue: "藤色",
saddlebrown: "サドル・ブラウン",
salmon: "サーモン",
sandybrown: "砂褐色",
seagreen: "シー・グリーン",
seashell: "シーシェル",
sienna: "黄褐色",
silver: "銀",
skyblue: "スカイ・ブルー",
slateblue: "スレート・ブルー",
slategray: "スレート・グレイ",
slategrey: "スレート・グレイ", // same as slategray
snow: "雪色",
springgreen: "スプリング・グリーン",
steelblue: "鋼色",
tan: "茶褐色",
teal: "ティール",
thistle: "シスル",
tomato: "トマト色",
transparent: "透明",
turquoise: "ターコイズ",
violet: "すみれ色",
wheat: "小麦色",
white: "白",
whitesmoke: "ホワイト・スモーク",
yellow: "黄",
yellowgreen: "黄緑"
})
//end v1.x content
);

},
'dojo/nls/ja-jp/colors':function(){
define('dojo/nls/ja-jp/colors',{});
},
'dojo/cldr/nls/ja/number':function(){
define(
"dojo/cldr/nls/ja/number", //begin v1.x content
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
'dojo/cldr/nls/ja-jp/number':function(){
define('dojo/cldr/nls/ja-jp/number',{});
},
'dojox/form/nls/ja/Uploader':function(){
define(
"dojox/form/nls/ja/Uploader", ({
	label: "ファイルの選択..."
})
);

},
'dojox/form/nls/ja-jp/Uploader':function(){
define('dojox/form/nls/ja-jp/Uploader',{});
},
'dijit/form/nls/ja/ComboBox':function(){
define(
"dijit/form/nls/ja/ComboBox", //begin v1.x content
({
		previousMessage: "以前の選択項目",
		nextMessage: "追加の選択項目"
})
//end v1.x content
);

},
'dijit/form/nls/ja-jp/ComboBox':function(){
define('dijit/form/nls/ja-jp/ComboBox',{});
},
'dijit/nls/ja/common':function(){
define(
"dijit/nls/ja/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "キャンセル",
	buttonSave: "保存",
	itemClose: "閉じる"
})
//end v1.x content
);

},
'dijit/nls/ja-jp/common':function(){
define('dijit/nls/ja-jp/common',{});
}}});
define("dojo/nls/dojoForEther_ja-jp", [], 1);
