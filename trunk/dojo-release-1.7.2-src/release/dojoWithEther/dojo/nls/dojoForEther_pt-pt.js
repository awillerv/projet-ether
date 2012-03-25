require({cache:{
'dijit/form/nls/pt/validate':function(){
define(
"dijit/form/nls/pt/validate", //begin v1.x content
({
	invalidMessage: "O valor inserido não é válido.",
	missingMessage: "Este valor é necessário.",
	rangeMessage: "Este valor está fora do intervalo. "
})
//end v1.x content
);

},
'dijit/form/nls/pt-pt/validate':function(){
define(
"dijit/form/nls/pt-pt/validate", //begin v1.x content
({
	invalidMessage: "O valor introduzido não é válido.",
	missingMessage: "Este valor é requerido.",
	rangeMessage: "Este valor encontra-se fora do intervalo."
})
//end v1.x content
);

},
'dijit/nls/pt/loading':function(){
define(
"dijit/nls/pt/loading", //begin v1.x content
({
	loadingState: "Carregando...",
	errorState: "Desculpe, ocorreu um erro"
})
//end v1.x content
);

},
'dijit/nls/pt-pt/loading':function(){
define(
"dijit/nls/pt-pt/loading", //begin v1.x content
({
	loadingState: "A carregar...",
	errorState: "Lamentamos, mas ocorreu um erro"
})
//end v1.x content
);

},
'dojo/nls/pt/colors':function(){
define(
"dojo/nls/pt/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "azul alice",
antiquewhite: "branco antigo",
aqua: "aqua",
aquamarine: "água marinha",
azure: "azul celeste",
beige: "bege",
bisque: "bisque",
black: "preto",
blanchedalmond: "amêndoa pelada",
blue: "azul",
blueviolet: "azul violeta",
brown: "marrom",
burlywood: "burlywood",
cadetblue: "azul cadet",
chartreuse: "chartreuse",
chocolate: "chocolate",
coral: "coral",
cornflowerblue: "azul centaurea",
cornsilk: "cornsilk",
crimson: "carmesim",
cyan: "ciano",
darkblue: "azul escuro",
darkcyan: "ciano escuro",
darkgoldenrod: "goldenrod escuro",
darkgray: "cinza escuro",
darkgreen: "verde escuro",
darkgrey: "cinza escuro", // same as darkgray
darkkhaki: "cáqui escuro",
darkmagenta: "magenta escuro",
darkolivegreen: "verde oliva escuro",
darkorange: "laranja escuro",
darkorchid: "orquídea escuro",
darkred: "vermelho escuro",
darksalmon: "salmão escuro",
darkseagreen: "verde marinho escuro",
darkslateblue: "azul ardósia escuro",
darkslategray: "cinza ardósia escuro",
darkslategrey: "cinza ardósia escuro", // same as darkslategray
darkturquoise: "turquesa escuro",
darkviolet: "violeta escuro",
deeppink: "rosa profundo",
deepskyblue: "azul céu intenso",
dimgray: "cinza turvo",
dimgrey: "cinza turvo", // same as dimgray
dodgerblue: "azul dodger",
firebrick: "firebrick",
floralwhite: "branco floral",
forestgreen: "verde floresta",
fuchsia: "fúcsia",
gainsboro: "gainsboro",
ghostwhite: "branco ghost",
gold: "dourado",
goldenrod: "goldenrod",
gray: "cinza",
green: "verde",
greenyellow: "amarelo esverdeado",
grey: "cinza", // same as gray
honeydew: "honeydew",
hotpink: "rosa quente",
indianred: "vermelho indiano",
indigo: "índigo",
ivory: "marfim",
khaki: "cáqui",
lavender: "lavanda",
lavenderblush: "lavanda avermelhada",
lawngreen: "verde grama",
lemonchiffon: "limão chiffon",
lightblue: "azul claro",
lightcoral: "coral claro",
lightcyan: "ciano claro",
lightgoldenrodyellow: "amarelo goldenrod claro",
lightgray: "cinza claro",
lightgreen: "verde claro",
lightgrey: "cinza claro", // same as lightgray
lightpink: "rosa claro",
lightsalmon: "salmão claro",
lightseagreen: "verde marinho claro",
lightskyblue: "azul céu claro",
lightslategray: "cinza ardósia claro",
lightslategrey: "cinza ardósia claro", // same as lightslategray
lightsteelblue: "azul aço claro",
lightyellow: "amarelo claro",
lime: "lima",
limegreen: "verde lima",
linen: "linho",
magenta: "magenta",
maroon: "castanho",
mediumaquamarine: "água marinha médio",
mediumblue: "azul médio",
mediumorchid: "orquídea médio",
mediumpurple: "roxo médio",
mediumseagreen: "verde marinho médio",
mediumslateblue: "azul ardósia médio",
mediumspringgreen: "verde primavera médio",
mediumturquoise: "turquesa médio",
mediumvioletred: "vermelho violeta médio",
midnightblue: "azul meia-noite",
mintcream: "creme de menta",
mistyrose: "rosa enevoado",
moccasin: "moccasin",
navajowhite: "branco navajo",
navy: "marinho",
oldlace: "cadarço velho",
olive: "oliva",
olivedrab: "verde oliva",
orange: "laranja",
orangered: "vermelho alaranjado",
orchid: "orquídea",
palegoldenrod: "goldenrod esbranquiçado",
palegreen: "verde esbranquiçado",
paleturquoise: "turquesa esbranquiçado",
palevioletred: "vermelho violeta esbranquiçado",
papayawhip: "creme de papaya",
peachpuff: "peach puff",
peru: "peru",
pink: "rosa",
plum: "ameixa",
powderblue: "azul talco",
purple: "roxo",
red: "vermelho",
rosybrown: "marrom rosado",
royalblue: "azul royal",
saddlebrown: "marrom saddle",
salmon: "salmão",
sandybrown: "marrom cor de areia",
seagreen: "verde marinho",
seashell: "seashell",
sienna: "sienna",
silver: "prateado",
skyblue: "azul céu",
slateblue: "azul ardósia",
slategray: "cinza ardósia",
slategrey: "cinza ardósia", // same as slategray
snow: "branco neve",
springgreen: "verde primavera",
steelblue: "azul aço",
tan: "tan",
teal: "azul esverdeado",
thistle: "thistle",
tomato: "tomate",
transparent: "transparente",
turquoise: "turquesa",
violet: "violeta",
wheat: "trigo",
white: "branco",
whitesmoke: "fumaça branca",
yellow: "amarelo",
yellowgreen: "verde amarelado"
})
//end v1.x content
);

},
'dojo/nls/pt-pt/colors':function(){
define(
"dojo/nls/pt-pt/colors", //begin v1.x content
({
// local representation of all CSS3 named colors, companion to dojo.colors.  To be used where descriptive information
// is required for each color, such as a palette widget, and not for specifying color programatically.

//Note: due to the SVG 1.0 spec additions, some of these are alternate spellings for the same color e.g. gray vs. gray.
//TODO: should we be using unique rgb values as keys instead and avoid these duplicates, or rely on the caller to do the reverse mapping?
aliceblue: "azul alice",
antiquewhite: "branco antigo",
aqua: "verde-água",
aquamarine: "verde-azulado",
azure: "azul-celeste",
beige: "bege",
bisque: "rosa-velho",
black: "preto",
blanchedalmond: "amêndoa claro",
blue: "azul",
blueviolet: "azul violeta",
brown: "castanho",
burlywood: "castanho pinho",
cadetblue: "azul cadete",
chartreuse: "amarelo esverdeado",
chocolate: "chocolate",
coral: "coral",
cornflowerblue: "azul-violáceo",
cornsilk: "branco seda",
crimson: "carmesim",
cyan: "ciano",
darkblue: "azul escuro",
darkcyan: "ciano escuro",
darkgoldenrod: "ouro velho escuro",
darkgray: "cinzento escuro",
darkgreen: "verde escuro",
darkgrey: "cinzento escuro", // same as darkgray
darkkhaki: "caqui escuro",
darkmagenta: "magenta escuro",
darkolivegreen: "verde-azeitona escuro",
darkorange: "laranja escuro",
darkorchid: "orquídea escuro",
darkred: "vermelho escuro",
darksalmon: "salmão escuro",
darkseagreen: "verde marinho escuro",
darkslateblue: "azul ardósia escuro",
darkslategray: "cinzento ardósia escuro",
darkslategrey: "cinzento ardósia escuro", // same as darkslategray
darkturquoise: "turquesa escuro",
darkviolet: "violeta escuro",
deeppink: "rosa profundo",
deepskyblue: "azul céu profundo",
dimgray: "cinzento esbatido",
dimgrey: "cinzento esbatido", // same as dimgray
dodgerblue: "azul furtivo",
firebrick: "tijolo fogo",
floralwhite: "branco floral",
forestgreen: "verde floresta",
fuchsia: "fúcsia",
gainsboro: "cinzento azulado claro",
ghostwhite: "branco sombreado",
gold: "dourado",
goldenrod: "ouro velho",
gray: "cinzento",
green: "verde",
greenyellow: "amarelo esverdeado",
grey: "cinzento", // same as gray
honeydew: "mel",
hotpink: "rosa forte",
indianred: "almagre",
indigo: "índigo",
ivory: "marfim",
khaki: "caqui",
lavender: "alfazema",
lavenderblush: "alfazema rosado",
lawngreen: "verde relva",
lemonchiffon: "limão chiffon",
lightblue: "azul claro",
lightcoral: "coral claro",
lightcyan: "ciano claro",
lightgoldenrodyellow: "ouro velho amarelado claro",
lightgray: "cinzento claro",
lightgreen: "verde claro",
lightgrey: "cinzento claro", // same as lightgray
lightpink: "rosa claro",
lightsalmon: "salmão claro",
lightseagreen: "verde marinho claro",
lightskyblue: "azul céu claro",
lightslategray: "cinzento ardósia claro",
lightslategrey: "cinzento ardósia claro", // same as lightslategray
lightsteelblue: "azul-aço claro",
lightyellow: "amarelo claro",
lime: "lima",
limegreen: "verde-lima",
linen: "linho",
magenta: "magenta",
maroon: "bordeaux",
mediumaquamarine: "verde-azulado médio",
mediumblue: "azul médio",
mediumorchid: "orquídea médio",
mediumpurple: "roxo médio",
mediumseagreen: "verde marinho médio",
mediumslateblue: "azul ardósia médio",
mediumspringgreen: "verde primavera médio",
mediumturquoise: "turquesa médio",
mediumvioletred: "violeta avermelhado médio",
midnightblue: "azul meia-noite",
mintcream: "creme de menta",
mistyrose: "rosa pálido",
moccasin: "mocassim",
navajowhite: "branco navajo",
navy: "azul marinho",
oldlace: "renda antiga",
olive: "azeitona",
olivedrab: "azeitona claro",
orange: "laranja",
orangered: "vermelho alaranjado",
orchid: "orquídea",
palegoldenrod: "ouro velho pálido",
palegreen: "verde pálido",
paleturquoise: "turquesa pálido",
palevioletred: "violeta avermelhado pálido",
papayawhip: "creme de papaia",
peachpuff: "pêssego",
peru: "peru",
pink: "rosa",
plum: "cor-de-ameixa",
powderblue: "azul de esmalte",
purple: "roxo",
red: "vermelho",
rosybrown: "castanho rosado",
royalblue: "azul real",
saddlebrown: "castanho sela",
salmon: "salmão",
sandybrown: "castanho areia",
seagreen: "verde marinho",
seashell: "concha",
sienna: "castanho-avermelhado",
silver: "prateado",
skyblue: "azul céu",
slateblue: "azul ardósia",
slategray: "cinzento ardósia",
slategrey: "cinzento ardósia", // same as slategray
snow: "branco-neve",
springgreen: "verde primavera",
steelblue: "azul-aço",
tan: "castanho claro",
teal: "verde-azulado",
thistle: "cardo",
tomato: "vermelho tomate",
turquoise: "turquesa",
violet: "violeta",
wheat: "trigo",
white: "branco",
whitesmoke: "fumo branco",
yellow: "amarelo",
yellowgreen: "verde amarelado"
})
//end v1.x content
);

},
'dojo/cldr/nls/pt/number':function(){
define(
"dojo/cldr/nls/pt/number", //begin v1.x content
{
	"group": ".",
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
	"currencyFormat": "¤#,##0.00;(¤#,##0.00)",
	"plusSign": "+"
}
//end v1.x content
);
},
'dojo/cldr/nls/pt-pt/number':function(){
define(
"dojo/cldr/nls/pt-pt/number", //begin v1.x content
{
	"currencyFormat": "#,##0.00 ¤",
	"group": " "
}
//end v1.x content
);
},
'dojox/form/nls/pt/Uploader':function(){
define(
"dojox/form/nls/pt/Uploader", ({
	label: "Selecione Arquivos..."
})
);

},
'dojox/form/nls/pt-pt/Uploader':function(){
define('dojox/form/nls/pt-pt/Uploader',{});
},
'dijit/form/nls/pt/ComboBox':function(){
define(
"dijit/form/nls/pt/ComboBox", //begin v1.x content
({
		previousMessage: "Opções anteriores",
		nextMessage: "Mais opções"
})
//end v1.x content
);

},
'dijit/form/nls/pt-pt/ComboBox':function(){
define(
"dijit/form/nls/pt-pt/ComboBox", //begin v1.x content
({
		previousMessage: "Opções anteriores",
		nextMessage: "Mais opções"
})
//end v1.x content
);

},
'dijit/nls/pt/common':function(){
define(
"dijit/nls/pt/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Cancelar",
	buttonSave: "Salvar",
	itemClose: "Fechar"
})
//end v1.x content
);

},
'dijit/nls/pt-pt/common':function(){
define(
"dijit/nls/pt-pt/common", //begin v1.x content
({
	buttonOk: "OK",
	buttonCancel: "Cancelar",
	buttonSave: "Guardar",
	itemClose: "Fechar"
})
//end v1.x content
);

}}});
define("dojo/nls/dojoForEther_pt-pt", [], 1);
