define(
//begin v1.x content
({
	/* These are already handled in the default RTE
		amp:"ampersand",lt:"less-than sign",
		gt:"greater-than sign",
		nbsp:"no-break space\nnon-breaking space",
		quot:"quote",
	*/
	iexcl:"反感叹号",
	cent:"分币符号",
	pound:"英镑符号",
	curren:"货币符号",
	yen:"日元符号/人民币符号",
	brvbar:"横向虚线\n纵向虚线",
	sect:"小节符号",
	uml:"分音符\n间隔分音符",
	copy:"版权符号",
	ordf:"阴性序数指示符",
	laquo:"左双尖括号\n左双尖括号",
	not:"非符号",
	shy:"软连字符\n自由选定连字符",
	reg:"注册符号\n注册商标符号",
	macr:"长音符号\n间隔长音符号\n破折号\nAPL 破折号",
	deg:"度符号",
	plusmn:"正负号\n正号或负号",
	sup2:"上标 2\n上标数字 2\n平方",
	sup3:"上标 3\n上标数字 3\n立方",
	acute:"锐音符\n间隔锐音符",
	micro:"μ 符号",
	para:"段落符号\n段落符号",
	middot:"中心点\n乔治逗号\n希腊中心点",
	cedil:"软音符\n间隔软音符",
	sup1:"上标 1\n上标数字 1",
	ordm:"阳性序数指示符",
	raquo:"右双尖括号\n右双尖括号",
	frac14:"普通四分之一\n四分之一",
	frac12:"普通二分之一\n二分之一",
	frac34:"普通四分之三\n四分之三",
	iquest:"倒问号\n倒问号",
	Agrave:"带重音符的拉丁大写字母 A\n带重音符的拉丁大写字母 A",
	Aacute:"带锐音符的拉丁大写字母 A",
	Acirc:"带抑扬符的拉丁大写字母 A",
	Atilde:"带颚化音的拉丁大写字母 A",
	Auml:"带分音符的拉丁大写字母 A",
	Aring:"带上圆圈的拉丁大写字母 A\n带圆圈的拉丁大写字母 A",
	AElig:"拉丁大写字母 AE\n拉丁大写连字 AE",
	Ccedil:"带软音符的拉丁大写字母 C",
	Egrave:"带重音符的拉丁大写字母 E",
	Eacute:"带锐音符的拉丁大写字母 E",
	Ecirc:"带抑扬符的拉丁大写字母 E",
	Euml:"带分音符的拉丁大写字母 E",
	Igrave:"带重音符的拉丁大写字母 I",
	Iacute:"带锐音符的拉丁大写字母 I",
	Icirc:"带抑扬符的拉丁大写字母 I",
	Iuml:"带分音符的拉丁大写字母 I",
	ETH:"拉丁大写字母 ETH",
	Ntilde:"带颚化音的拉丁大写字母 N",
	Ograve:"带重音符的拉丁大写字母 O",
	Oacute:"带锐音符的拉丁大写字母 O",
	Ocirc:"带抑扬符的拉丁大写字母 O",
	Otilde:"带颚化音的拉丁大写字母 O",
	Ouml:"带分音符的拉丁大写字母 O",
	times:"乘号",
	Oslash:"带竖线的拉丁大写字母 O\n带斜杠的拉丁大写字母 O",
	Ugrave:"带重音符的拉丁大写字母 U",
	Uacute:"带锐音符的拉丁大写字母 U",
	Ucirc:"带抑扬符的拉丁大写字母 U",
	Uuml:"带分音符的拉丁大写字母 U",
	Yacute:"带锐音符的拉丁大写字母 Y",
	THORN:"拉丁大写字母 THORN",
	szlig:"拉丁小写字母 sharp s\ness-zed",
	agrave:"带重音符的拉丁小写字母 a\n带重音符的拉丁小写字母 a",
	aacute:"带锐音符的拉丁小写字母 a",
	acirc:"带抑扬符的拉丁小写字母 a",
	atilde:"带颚化音的拉丁小写字母 a",
	auml:"带分音符的拉丁小写字母 a",
	aring:"带上圆圈的拉丁小写字母 a\n带圆圈的拉丁小写字母 a",
	aelig:"拉丁小写字母 ae\n拉丁小写连字 ae",
	ccedil:"带软音符的拉丁小写字母 c",
	egrave:"带重音符的拉丁小写字母 e",
	eacute:"带锐音符的拉丁小写字母 e",
	ecirc:"带抑扬符的拉丁小写字母 e",
	euml:"带分音符的拉丁小写字母 e",
	igrave:"带重音符的拉丁小写字母 i",
	iacute:"带锐音符的拉丁小写字母 i",
	icirc:"带抑扬符的拉丁小写字母 i",
	iuml:"带分音符的拉丁小写字母 i",
	eth:"拉丁小写字母 eth",
	ntilde:"带颚化音的拉丁小写字母 n",
	ograve:"带重音符的拉丁小写字母 o",
	oacute:"带锐音符的拉丁小写字母 o",
	ocirc:"带抑扬符的拉丁小写字母 o",
	otilde:"带颚化音的拉丁小写字母 o",
	ouml:"带分音符的拉丁小写字母 o",
	divide:"除号",
	oslash:"带竖线的拉丁小写字母 o\n带斜杠的拉丁小写字母 o",
	ugrave:"带重音符的拉丁小写字母 u",
	uacute:"带锐音符的拉丁小写字母 u",
	ucirc:"带抑扬符的拉丁小写字母 u",
	uuml:"带分音符的拉丁小写字母 u",
	yacute:"带锐音符的拉丁小写字母 y",
	thorn:"拉丁小写字母 thorn",
	yuml:"带分音符的拉丁小写字母 y",

// Greek Characters and Symbols
	fnof:"带挂钩符号的拉丁小写 f\n分数\nflorin",
	Alpha:"希腊大写字母 alpha",
	Beta:"希腊大写字母 beta",
	Gamma:"希腊大写字母 gamma",
	Delta:"希腊大写字母 delta",
	Epsilon:"希腊大写字母 epsilon",
	Zeta:"希腊大写字母 zeta",
	Eta:"希腊大写字母 eta",
	Theta:"希腊大写字母 theta",
	Iota:"希腊大写字母 iota",
	Kappa:"希腊大写字母 kappa",
	Lambda:"希腊大写字母 lambda",
	Mu:"希腊大写字母 mu",
	Nu:"希腊大写字母 nu",
	Xi:"希腊大写字母 xi",
	Omicron:"希腊大写字母 omicron",
	Pi:"希腊大写字母 pi",
	Rho:"希腊大写字母 rho",
	Sigma:"希腊大写字母 sigma",
	Tau:"希腊大写字母 tau",
	Upsilon:"希腊大写字母 upsilon",
	Phi:"希腊大写字母 phi",
	Chi:"希腊大写字母 chi",
	Psi:"希腊大写字母 psi",
	Omega:"希腊大写字母 omega",
	alpha:"希腊小写字母 alpha",
	beta:"希腊小写字母 beta",
	gamma:"希腊小写字母 gamma",
	delta:"希腊小写字母 delta",
	epsilon:"希腊小写字母 epsilon",
	zeta:"希腊小写字母 zeta",
	eta:"希腊小写字母 eta",
	theta:"希腊小写字母 theta",
	iota:"希腊小写字母 iota",
	kappa:"希腊小写字母 kappa",
	lambda:"希腊小写字母 lambda",
	mu:"希腊小写字母 mu",
	nu:"希腊小写字母 nu",
	xi:"希腊小写字母 xi",
	omicron:"希腊小写字母 omicron",
	pi:"希腊小写字母 pi",
	rho:"希腊小写字母 rho",
	sigmaf:"希腊小写字母 final sigma",
	sigma:"希腊小写字母 sigma",
	tau:"希腊小写字母 tau",
	upsilon:"希腊小写字母 upsilon",
	phi:"希腊小写字母 phi",
	chi:"希腊小写字母 chi",
	psi:"希腊小写字母 psi",
	omega:"希腊小写字母 omega",
	thetasym:"希腊小写字母 theta 符号",
	upsih:"带挂钩符号的希腊字母 upsilon",
	piv:"希腊 pi 符号",
	bull:"子弹符号\n黑色小圆圈",
	hellip:"水平省略号\n三个点组成的标题",
	prime:"分钟符号\n分钟\n尺",
	Prime:"秒符号\n秒\n寸",
	oline:"顶线\n间隔顶线",
	frasl:"分数斜杠",
	weierp:"脚本大写 P\n幂集\nWeierstrass p",
	image:"黑色大写字母 I\n虚部符号",
	real:"黑色大写字母 R\n实部符号",
	trade:"商标符号",
	alefsym:"alef 符号\n第一个超限基数",
	larr:"向左箭头",
	uarr:"向上箭头",
	rarr:"向右箭头",
	darr:"向下箭头",
	harr:"向左上箭头",
	crarr:"回车符\n回车符",
	lArr:"向左双箭头",
	uArr:"向上双箭头",
	rArr:"向右双箭头",
	dArr:"向下双箭头",
	hArr:"左右向双箭头",
	forall:"全部",
	part:"部分差分",
	exist:"存在",
	empty:"空集\n空集\n直径",
	nabla:"劈形算符\n后向差分",
	isin:"...的元素",
	notin:"不是...的元素",
	ni:"作为成员包含",
	prod:"N 元积\n积符号",
	sum:"N 元和",
	minus:"负号",
	lowast:"星号运算符",
	radic:"平方根\n根号",
	prop:"成比例",
	infin:"无限",
	ang:"角度",
	and:"逻辑和\n尖三角形",
	or:"逻辑或\n V 字形",
	cap:"交集\n盖状",
	cup:"并集n\n杯状","int":"整数",
	there4:"因此",
	sim:"颚化音运算符\n偏离\n相似",
	cong:"约等于",
	asymp:"几乎等于\n渐近",
	ne:"不等于",
	equiv:"完全相等",
	le:"小于或等于",
	ge:"大于或等于",
	sub:"...的子集",
	sup:"...的超集",
	nsub:"不是...的子集",
	sube:"...的子集或等于",
	supe:"...的超集或等于",
	oplus:"带圆圈的加号\n异或",
	otimes:"带圆圈的乘号\n向量积",
	perp:"倒 T\n正交于\n垂直",
	sdot:"点运算符",
	lceil:"left ceiling\nAPL upstile",
	rceil:"right ceiling",
	lfloor:"left floor\nAPL downstile",
	rfloor:"right floor",
	lang:"左尖括号",
	rang:"右尖括号",
	loz:"菱形",
	spades:"黑色桃形",
	clubs:"黑色梅花形\n三叶草",
	hearts:"黑色心形\n心形",
	diams:"黑色菱形",
	OElig:"拉丁大写连字 OE",
	oelig:"拉丁小写连字 oe",
	Scaron:"带倒折音的拉丁大写字母 S",
	scaron:"带倒折音的拉丁小写字母 s",
	Yuml:"带分音符的拉丁大写字母 Y",
	circ:"修饰符字母抑扬符重音符",
	tilde:"小颚化音符号",
	ensp:"单倍间距",
	emsp:"双倍间距",
	thinsp:"窄空格",
	zwnj:"零宽度非连字符",
	zwj:"零宽度连字符",
	lrm:"从左向右标记",
	rlm:"从右向左标记",
	ndash:"短破折号",
	mdash:"长破折号",
	lsquo:"左单引号",
	rsquo:"右单引号",
	sbquo:"低单引号",
	ldquo:"左双引号",
	rdquo:"右双引号",
	bdquo:"低双引号",
	dagger:"剑号",
	Dagger:"双剑号",
	permil:"千分率符号",
	lsaquo:"左尖括号",
	rsaquo:"右尖括号",
	euro:"欧元符号"
})
//end v1.x content
);
