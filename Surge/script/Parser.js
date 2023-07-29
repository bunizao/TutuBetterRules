***************************/
const isEgern = 'object' == typeof egern;
const isLanceX = 'undefined' !== typeof $native;
if (isEgern || isLanceX){
	$environment = {"language":"zh-Hans","system":"iOS","surge-build":"2806","surge-version":"5.20.0"}
};
const isStashiOS = 'undefined' !== typeof $environment && $environment['stash-version'];
const isSurgeiOS = 'undefined' !== typeof $environment && $environment['surge-version'];
const isShadowrocket = 'undefined' !== typeof $rocket;

var jsctype
if (isStashiOS){
    jsctype = "stash";
}else if (isSurgeiOS){
    jsctype = "surge";
}else if (isShadowrocket){
    jsctype = "shadowrocket";
}else if (isLooniOS){
    jsctype = "loon";
}else{jsctype = "";};
var name = "";
var desc = "";
var req
var urlArg
if (isLooniOS || isSurgeiOS || isShadowrocket){
    req = $request.url.replace(/qx$|qx\?.*/,'');
    if ($request.url.indexOf("qx?") != -1){
        urlArg = "?" + $request.url.split("qx?")[1];
    }else{urlArg = ""};
    
}else if (isStashiOS){
    req = $request.url.replace(/qx\.stoverride$|qx\.stoverride\?.*/,'');
    if ($request.url.indexOf("qx.stoverride?") != -1){
        urlArg = "?" + $request.url.split("qx.stoverride?")[1];
    }else{urlArg = ""};
};
var rewriteName = req.substring(req.lastIndexOf('/') + 1).split('.')[0];
//获取参数
var nName = urlArg.search(/\?n=|&n=/) != -1 ? (urlArg.split(/\?n=|&n=/)[1].split("&")[0].split("+")) : null;
var Pin0 = urlArg.search(/\?y=|&y=/) != -1 ? (urlArg.split(/\?y=|&y=/)[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var Pout0 = urlArg.search(/\?x=|&x=/) != -1 ? (urlArg.split(/\?x=|&x=/)[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var hnAdd = urlArg.search(/\?hnadd=|&hnadd=/) != -1 ? (urlArg.split(/\?hnadd=|&hnadd=/)[1].split("&")[0].replace(/%20/g,"").split(",")) : null;
var hnDel = urlArg.search(/\?hndel=|&hndel=/) != -1 ? (urlArg.split(/\?hndel=|&hndel=/)[1].split("&")[0].replace(/%20/g,"").split(",")) : null;
var jsConverter = urlArg.search(/\?jsc=|&jsc=/) != -1 ? (urlArg.split(/\?jsc=|&jsc=/)[1].split("&")[0].split("+")) : null;
var jsConverter2 = urlArg.search(/\?jsc2=|&jsc2=/) != -1 ? (urlArg.split(/\?jsc2=|&jsc2=/)[1].split("&")[0].split("+")) : null;
var delNoteSc = urlArg.search(/\?del=|&del=/) != -1 ? true : false;
var nCron = urlArg.search(/\?cron=|&cron=/) != -1 ? (urlArg.split(/\?cron=|&cron=/)[1].split("&")[0].split("+")).map(decodeURIComponent) : null;
var nCronExp = urlArg.search(/\?cronexp=|&cronexp=/) != -1 ? (urlArg.split(/\?cronexp=|&cronexp=/)[1].split("&")[0].replace(/\./g," ").split("+")).map(decodeURIComponent) : null;
var icon = "";
var cachExp = urlArg.search(/\?cachexp=|&cachexp=/) != -1 ? (urlArg.split(/\?cachexp=|&cachexp=/)[1].split("&")[0]) : null;

//缓存有效期相关
var currentTime = new Date();
var seconds = Math.floor(currentTime.getTime() / 1000); // 将毫秒转换为秒
var boxjsSetExp = $persistentStore.read("Parser_cache_exp") ?? "1";
//设置有效期时间
var expirationTime
if (cachExp != null){
  expirationTime = cachExp * 1 * 60 * 60;
}else{
  expirationTime = boxjsSetExp * 1 * 60 * 60;
};
//console.log(expirationTime);
var nCache = [{"url":"","body":"","time":""}];
var oCache = $persistentStore.read("parser_cache");
//检查是否有缓存
if (oCache != "" && oCache != null){
  oCache = JSON.parse(oCache);
}else{oCache = null;};

//修改名字和简介
if (nName === null){
	name = rewriteName;
    desc = name;
}else{
	name = nName[0] != "" ? nName[0] : rewriteName;
	desc = nName[1] != undefined ? nName[1] : name;
};
if (isShadowrocket || isLooniOS ||isSurgeiOS){
	name = "#!name=" + decodeURIComponent(name);
	desc = "#!desc=" + decodeURIComponent(desc);
}else if (isStashiOS){
	name = 'name: ' + '"' + decodeURIComponent(name) + '"';
	desc = 'desc: ' + '"' + decodeURIComponent(desc) + '"';
};
let npluginDesc = name + "\n" + desc;

//随机图标开关，不传入参数默认为开
if(isLooniOS && iconStatus == "启用" && iconLibrary2 != "Pokemon"){
	const stickerStartNum = 1001;
const stickerSum = iconLibrary1.split("(")[1].split("P")[0];
let randomStickerNum = parseInt(stickerStartNum + Math.random() * stickerSum).toString();
   icon = "#!icon=" + "https://github.com/Toperlock/Quantumult/raw/main/icon/" + iconLibrary2 + "/" + iconLibrary2 + "-" + randomStickerNum + iconFormat;
}else if (isLooniOS && iconStatus == "启用" && iconLibrary2 == "Pokemon"){
    icon = "#!icon=" + pluginPokemonIcon;
};
const pluginIcon = icon;
console.log("插件图标：" + pluginIcon);

!(async () => {
  let body
  
  if (oCache == null){
    //console.log("一个缓存也没有")
  body = await http(req);
  nCache[0].url = req;
  nCache[0].body = body;
  nCache[0].time = seconds;
  $persistentStore.write(JSON.stringify(nCache), 'parser_cache');
  }else{
    //删除大于一天的缓存防止缓存越来越大
    oCache = oCache.filter(obj => {
  return seconds - obj.time < 86400 ;
});
$persistentStore.write(JSON.stringify(oCache), 'parser_cache');

 if (!oCache.some(obj => obj.url === req)){
     //console.log("有缓存但是没有这个URL的")
  body = await http(req);
  nCache[0].url = req;
  nCache[0].body = body;
  nCache[0].time = seconds;
  var mergedCache = oCache.concat(nCache);
$persistentStore.write(JSON.stringify(mergedCache), 'parser_cache');
  }else if (oCache.some(obj => obj.url === req)){
    const objIndex = oCache.findIndex(obj => obj.url === req);
    if (seconds - oCache[objIndex].time > expirationTime){
      //console.log("有缓存且有url,但是过期了")
  body = await http(req);
  oCache[objIndex].body = body;
  oCache[objIndex].time = seconds;
$persistentStore.write(JSON.stringify(oCache), 'parser_cache');
    }else{
      //console.log("有缓存且有url且没过期")
    if (oCache[objIndex].body == null || oCache[objIndex].body == ""){
        //console.log("但是body为null")
        body = await http(req);
        oCache[objIndex].body = body;
        oCache[objIndex].time = seconds;        $persistentStore.write(JSON.stringify(oCache), "parser_cache");
    }else{
        //console.log("获取到缓存body")
        body = oCache[objIndex].body;
    }
      };
  };
};

//判断是否断网
if(body == null || body == ""){if(isSurgeiOS || isStashiOS){
    console.log("QX转换：未获取到body的链接为" + $request.url)
	$notification.post("QX转换：未获取到body","请检查网络及节点是否畅通\n" + "源链接为" + $request.url,"认为是bug?点击通知反馈",{url:"https://t.me/zhangpeifu"})
 $done({ response: { status: 404 ,body:{} } });}else if(isLooniOS || isShadowrocket){
    console.log("QX转换：未获取到body的链接为" + $request.url)
    $notification.post("QX转换：未获取到body","请检查网络及节点是否畅通\n" + "源链接为" + $request.url,"认为是bug?点击通知反馈","https://t.me/zhangpeifu")
 $done({ response: { status: 404 ,body:{} } });
}//识别客户端通知
}else{//以下开始重写及脚本转换


if (body.match(/\/\*+\n[\s\S]*\n\*+\/\n/)){
body = body.replace(/[\s\S]*(\/\*+\n[\s\S]*\n\*+\/\n)[\s\S]*/,"$1").match(/[^\r\n]+/g);
}else{
    body = body.match(/[^\r\n]+/g);};
    
let pluginDesc = [];
let httpFrame = "";
let URLRewrite = [];
let script = [];
let MapLocal = [];
let MITM = "";
let cron = []; 
let providers = [];  
let others = [];       //不支持的内容


let scname = "";       //脚本名
let js = "";           //脚本链接
let sctype = "";       //脚本类型
let ptn = "";          //正则
let rebody = "";       //是否需要body
let size = "";         //允许最大body大小
let proto = "";        //是否开启binary-body-mode
let cronExp = "";      //cron表达式
let croName = "";      //cron任务名
let cronJs = "";       //cron脚本链接
let rejectType = "";   //重写reject类型
let urlInNum = "";     //重写中"url"字样出现的位置
let reHdType = "";     //request|response-header
let reHdPtn = "";      //re-header 正则
let reHdArg1 = "";     //用以匹配的headers
let reHdArg2 = "";     //替换
let arg = "";          //echo-response 返回内容
let mockPtn = "";      //echo-res转mock 正则
let dataCon = "";      //echo-res转mock 返回内容
let reBdType = "";     //request|response-body
let reBdPtn = "";      //re-header 正则
let reBdArg1 = "";     //用以匹配的headers
let reBdArg2 = "";     //替换


body.forEach((x, y, z) => {
	x = x.replace(/^ *(#|;|\/\/)/,'#').replace(/\x20.+url-and-header\x20/,' url ').replace(/\x20+url\x20+/," url ").replace(/^hostname\x20*=/,"hostname=").replace(/(^[^#].+)\x20+\/\/.+/,"$1");
//去掉注释
if (Pin0 != null)	{
	for (let i=0; i < Pin0.length; i++) {
  const elem = Pin0[i];
	if (x.indexOf(elem) != -1){
		x = x.replace(/^#/,"")
	}else{};
};//循环结束
}else{};//去掉注释结束

//增加注释
if (Pout0 != null){
	for (let i=0; i < Pout0.length; i++) {
  const elem = Pout0[i];
	if (x.indexOf(elem) != -1 && x.search(/^hostname=/) == -1){
		x = "#" + x;
	}else{};
};//循环结束
}else{};//增加注释结束

//添加主机名
if (hnAdd != null){
	if (x.search(/^hostname=/) != -1){
		x = x.replace(/\x20/g,"").replace(/(.+)/,`$1,${hnAdd}`).replace(/,{2,}/g,",");
	}else{};
}else{};//添加主机名结束

//删除主机名
if (hnDel != null && x.search(/^hostname=/) != -1){
    x = x.replace(/\x20/g,"").replace(/^hostname=/,"").replace(/%.*%/,"").replace(/,{2,}/g,",").split(",");
	for (let i=0; i < hnDel.length; i++) {
  const elem = hnDel[i];
if (x.indexOf(elem) != -1){
  let hnInNum = x.indexOf(elem);
  delete x[hnInNum];
}else{};
  };//循环结束
x = "hostname=" + x
}else{};//删除主机名结束

//开启脚本转换
if (jsConverter != null)	{
	for (let i=0; i < jsConverter.length; i++) {
  const elem = jsConverter[i];
	if (x.indexOf(elem) != -1){
		x = x.replace(/\x20(https?|ftp|file)(:\/\/.+\.js)/g,` $1$2_script-converter-${jsctype}.js`);
	}else{};
};//循环结束
}else{};//开启脚本转换结束

//开启脚本转换2
if (jsConverter2 != null)	{
	for (let i=0; i < jsConverter2.length; i++) {
  const elem = jsConverter2[i];
	if (x.indexOf(elem) != -1){
        jsctype = jsctype.toUpperCase();
		x = x.replace(/\x20(https?|ftp|file)(:\/\/.+\.js)/g,` $1$2_script-converter-${jsctype}.js`);
	}else{};
};//循环结束
}else{};//开启脚本转换2结束


//剔除已注释重写
if (delNoteSc === true && x.match(/^#/) && x.indexOf("#!") == -1){
		x = "";
};//剔除已注释重写结束

	let type = x.match(
		/^#!|\x20url\x20script-|\x20url\x20reject$|\x20url\x20reject-|\x20echo-response\x20|\-header\x20|^hostname| url 30|\x20(request|response)-body|[^\s]+ [^u\s]+ [^\s]+ [^\s]+ [^\s]+ ([^\s]+ )?(https?|ftp|file)/
	)?.[0];
//判断注释
if (isLooniOS || isSurgeiOS || isShadowrocket){
	
	if (x.match(/^[^#]/)){
	var noteK = "";
	}else{
	var noteK = "#";
	};
}else if (isStashiOS){
	if (x.match(/^[^#]/)){
	var noteKn8 = "\n        ";
	var noteKn6 = "\n      ";
	var noteKn4 = "\n    ";
	var noteK4 = "    ";
	var noteK2 = "  ";
	}else{
	var noteKn8 = "\n#        ";
	var noteKn6 = "\n#      ";
	var noteKn4 = "\n#    ";
	var noteK4 = "#    ";
	var noteK2 = "#  ";
	};
};//判断注释结束

	if (type) {
		switch (type) {
//简介            
			case "#!":
               if (isStashiOS){
               x = x.replace(/^#! *(name|desc) *= *(.*)/,'$1: "$2"');
            
            if (nName != null){
                x = x.replace(/^name:.*/,name).replace(/^desc:.*/,desc);
            };
            pluginDesc.push(x);
            };
            
			if (isLooniOS && iconStatus == "启用" && iconLibrary2 == "Pokemon"){
				if (nName != null){
                x = x.replace(/^#!name *=.*/,name).replace(/^#!desc *=.*/,desc);};
            if (iconReplace == "启用"){
                x = x.replace(/^#!icon *=.*/,pluginIcon);
            };
			x = x.replace(/^(#!author *=).*/i,pluginPokemonAuthor)
			x = x.replace(/^(#!homepage *=).*/i,pluginPokemonHomepage)
            pluginDesc.push(x);
				
			}else if (isLooniOS || isSurgeiOS || isShadowrocket){
            if (nName != null){
                x = x.replace(/^#!name *=.*/,name).replace(/^#!desc *=.*/,desc);};
            if (iconReplace == "启用"){
                x = x.replace(/^#!icon *=.*/,pluginIcon);
            };
            pluginDesc.push(x);
            };
            
            break;
            
			case " url script-":
//脚本

				sctype = x.match(' script-response') ? 'response' : 'request';
				
				urlInNum = x.replace(/\x20{2,}/g," ").split(" ").indexOf("url");
				
				ptn = x.replace(/\x20{2,}/g," ").split(" ")[urlInNum - 1].replace(/^#/,"");

				if (isSurgeiOS){
					ptn = ptn.replace(/(.+,.+)/,'"$1"');};

				js = x.replace(/\x20{2,}/g," ").split(" ")[urlInNum + 2];
                
				rebody = x.match(/\x20script[^\s]*(-body|-analyze)/) ? ', requires-body=true' : '';
				
				size = x.match(/\x20script[^\s]*(-body|-analyze)/) ? ', max-size=3145728' : '';
				
				proto = js.match(/proto\.js/i) ? ', binary-body-mode=true' : '';
                
                if (isStashiOS){
					
				rebody = x.match(/\x20script[^\s]*(-body|-analyze)/) ? 'require-body: true' : '';
				
				size = x.match(/\x20script[^\s]*(-body|-analyze)/) ? 'max-size: 3145728' : '';
				
				proto = js.match(/proto\.js/i) ? 'binary-mode: true' : '';
				};
				
				scname = js.substring(js.lastIndexOf('/') + 1, js.lastIndexOf('.') );
				
				if (isLooniOS){			
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
					script.push(
						`${noteK}http-${sctype} ${ptn} script-path=${js}${rebody}${proto}, timeout=60 ,tag=${scname}_${y}`);
				}else if (isSurgeiOS || isShadowrocket){			
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
					script.push(
						`${noteK}${scname}_${y} = type=http-${sctype}, pattern=${ptn}${rebody}${size}${proto}, script-path=${js}, timeout=60, script-update-interval=0`);
				}else if (isStashiOS){
				z[y - 1]?.match(/^#/) && script.push("    " + z[y - 1]);
					
				script.push(
						`${noteK4}- match: ${ptn}${noteKn6}name: ${scname}_${y}${noteKn6}type: ${sctype}${noteKn6}timeout: 30${noteKn6}${rebody}${noteKn6}${size}${noteKn6}${proto}`
				);
				providers.push(
						`${noteK2}${scname}_${y}:${noteKn4}url: ${js}${noteKn4}interval: 86400`);
				};
				
				break;
				
//reject-

			case " url reject-":
				
				if (isShadowrocket || isLooniOS){
				z[y - 1]?.match(/^#/) && URLRewrite.push(z[y - 1]);
				URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.*?)\x20url\x20(reject-200|reject-img|reject-dict|reject-array)/, `${noteK}$2 - $3`));
				}else if(isSurgeiOS){
					z[y - 1]?.match(/^#/) && MapLocal.push(z[y - 1]);
                    
				if (x.match(/dict$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-dict.json"
				}else if (x.match(/array$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-array.json"
				}else if (x.match(/200$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-200.txt"
				}else if (x.match(/img$/)){
					rejectType = "https://raw.githubusercontent.com/mieqq/mieqq/master/reject-img.gif"
				};
				MapLocal.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.+?)\x20url\x20reject-.+/, `${noteK}$2 data="${rejectType}"`));	
				}else if (isStashiOS){
				z[y - 1]?.match(/^#/) && URLRewrite.push("    " + z[y - 1]);
				URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.*?)\x20url\x20(reject-200|reject-img|reject-dict|reject-array)/, `${noteK4}- >-${noteKn6}$2 - $3`));
				};
				break;
				
				case " url reject":
                
				if (isSurgeiOS || isShadowrocket || isLooniOS){
				z[y - 1]?.match(/^#/) && URLRewrite.push(z[y - 1]);
				
				URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.+?)\x20url\x20reject$/, `${noteK}$2 - reject`));
				}else if (isStashiOS){
				z[y - 1]?.match(/^#/) && URLRewrite.push("    " + z[y - 1]);
				
				URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.+?)\x20url\x20reject$/, `${noteK4}- >-${noteKn6}$2 - reject`));
				}; 
				break;
				
//(request|response)-header
			case "-header ":
				
				reHdType = x.match(' response-header ') ? 'response' : 'request';
				
				reHdPtn = x.replace(/\x20{2,}/g," ").split(" url re")[0].replace(/^#/,"");
				if (isSurgeiOS){
					reHdPtn = reHdPtn.replace(/(.+,.+)/,'"$1"');};
				
				reHdArg1 = x.split(" " + reHdType + "-header ")[1];
				
				reHdArg2 = x.split(" " + reHdType + "-header ")[2];
				
				if (isLooniOS){
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
				script.push(`${noteK}http-${reHdType} ${reHdPtn} script-path=https://raw.githubusercontent.com/xream/scripts/main/surge/modules/replace-header/index.js, timeout=60, tag=replaceHeader_${y}, argument="${reHdArg1}->${reHdArg2}"`);				
				}else if (isSurgeiOS || isShadowrocket){
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
				script.push(`${noteK}replaceHeader_${y} = type=http-${reHdType}, pattern=${reHdPtn}, script-path=https://raw.githubusercontent.com/xream/scripts/main/surge/modules/replace-header/index.js, timeout=60, argument="${reHdArg1}->${reHdArg2}"`);
				
				}else if (isStashiOS){
				z[y - 1]?.match(/^#/) && script.push("    " + z[y - 1]);
				script.push(`${noteK4}- match: ${reHdPtn}${noteKn6}name: replaceHeader_${y}${noteKn6}type: ${reHdType}${noteKn6}timeout: 30${noteKn6}argument: |-${noteKn8}${reHdArg1}->${reHdArg2}`);
				providers.push(`${noteK2}replaceHeader_${y}:${noteKn4}url: https://raw.githubusercontent.com/xream/scripts/main/surge/modules/replace-header/index.js${noteKn4}interval: 86400`	);				
				};
				break;
				
			case " echo-response ":
			
				arg = x.split(" echo-response ")[2];
			
			if(/^(https?|ftp|file):\/\/.*/.test(arg)){
				
				urlInNum = x.replace(/\x20{2,}/g," ").split(" ").indexOf("url");
				
				ptn = x.replace(/\x20{2,}/g," ").split(" ")[urlInNum - 1].replace(/^#/,"");
                
				scname = arg.substring(arg.lastIndexOf('/') + 1, arg.lastIndexOf('.') );
				if (isLooniOS){
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
				
				script.push(
					`${noteK}http-request ${ptn} script-path=https://raw.githubusercontent.com/xream/scripts/main/surge/modules/echo-response/index.js, timeout=60, tag=${scname}_${y}, argument=type=text/json&url=${arg}`);
				}else if (isSurgeiOS){
				z[y - 1]?.match(/^#/) && MapLocal.push(z[y - 1]);

				mockPtn = x.replace(/\x20{2,}/g," ").split(" url echo-response")[0].replace(/^#/,"");
				
				dataCon = x.replace(/\x20{2,}/g," ").split(" echo-response ")[2];
				
				MapLocal.push(`${noteK}${mockPtn} data="${dataCon}"`);
				}else if (isShadowrocket){
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
				
				script.push(
					`${noteK}${scname}_${y} = type=http-request, pattern=${ptn}, script-path=https://raw.githubusercontent.com/xream/scripts/main/surge/modules/echo-response/index.js, timeout=60, argument=type=text/json&url=${arg}`)
				}else if (isStashiOS){
				z[y - 1]?.match(/^#/) && script.push("    " + z[y - 1]);
				
				script.push(
					`${noteK4}- match: ${ptn}${noteKn6}name: ${scname}_${y}${noteKn6}type: request${noteKn6}timeout: 30${noteKn6}argument: |-${noteKn8}type=text/json&url=${arg}`)
				
				providers.push(
							`${noteK2}${scname}_${y}:${noteKn4}url: https://raw.githubusercontent.com/xream/scripts/main/surge/modules/echo-response/index.js${noteKn4}interval: 86400`);
				}; 

			}else{others.push(x)};
			
				break;

//mitm
			case "hostname":
			
			    if (isLooniOS){
					
				MITM = x.replace(/%.*%/g," ").replace(/\x20/g,"").replace(/,*\x20*$/,"").replace(/hostname=(.*)/, `[MITM]\n\nhostname = $1`).replace(/=\x20,+/,"= ");
				}else if (isSurgeiOS || isShadowrocket){
					
				MITM = x.replace(/%.*%/g,"").replace(/\x20/g,"").replace(/,{2,}/g,",").replace(/,*\x20*$/,"").replace(/hostname=(.*)/, `[MITM]\n\nhostname = %APPEND% $1`).replace(/%\x20,+/,"% ");
				}else if (isStashiOS){
					
				MITM = x.replace(/%.*%/g,"").replace(/\x20/g,"").replace(/,{2,}/g,",").replace(/,*\x20*$/,"").replace(/hostname=(.*)/, `t&2;mitm:\nt&hn;"$1"`).replace(/",+/,'"');
				};
				break;
				
//302/307		
				
			case " url 30":
				
				if (isLooniOS || isSurgeiOS || isShadowrocket){
					z[y - 1]?.match(/^#/) && URLRewrite.push(z[y - 1]);
					URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.*?)\x20url\x20(302|307)\x20(.+)/, `${noteK}$2 $4 $3`));
				}else if (isStashiOS){
				z[y - 1]?.match(/^#/) && URLRewrite.push("    " + z[y - 1]);
					URLRewrite.push(x.replace(/\x20{2,}/g," ").replace(/(^#)?(.*?)\x20url\x20(302|307)\x20(.+)/, `${noteK4}- >-${noteKn6}$2 $4 $3`));
				};
				break;
		
			default:
            
            if (type.match(/\x20(request|response)-body/)){
                
//(response|request)-body
				reBdType = x.match(' response-body ') ? 'response' : 'request';
				
				reBdPtn = x.replace(/\x20{2,}/g," ").split(" url re")[0].replace(/^#/,"");
				if (isSurgeiOS){
					reBdPtn = reBdPtn.replace(/(.+,.+)/,'"$1"');};
				reBdArg1 = x.split(" " + reBdType + "-body ")[1];
				
				reBdArg2 = x.split(" " + reBdType + "-body ")[2];
					if (isLooniOS){
					z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
						
					script.push(
							`${noteK}http-${reBdType} ${reBdPtn} script-path=https://gitlab.com/lodepuly/vpn_tool/-/raw/main/Resource/Script/CommonScript/replace-body.js, requires-body=true, timeout=60 ,tag=replaceBody_${y}, argument="${reBdArg1}->${reBdArg2}"`);
					}else if (isSurgeiOS || isShadowrocket){
					z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
					script.push(
							`${noteK}replaceBody_${y} = type=http-${reBdType}, pattern=${reBdPtn}, requires-body=true, max-size=3145728, script-path=https://gitlab.com/lodepuly/vpn_tool/-/raw/main/Resource/Script/CommonScript/replace-body.js, timeout=60, argument="${reBdArg1}->${reBdArg2}"`);
					}else if (isStashiOS){
					z[y - 1]?.match(/^#/) && script.push("    " + z[y - 1]);
					
					script.push(
							`${noteK4}- match: ${reBdPtn}${noteKn6}name: replaceBody_${y}${noteKn6}type: ${reBdType}${noteKn6}timeout: 30${noteKn6}require-body: true${noteKn6}max-size: 3145728${noteKn6}argument: |-${noteKn8}${reBdArg1}->${reBdArg2}`);
					providers.push(
							`${noteK2}replaceBody_${y}:${noteKn4}url: https://gitlab.com/lodepuly/vpn_tool/-/raw/main/Resource/Script/CommonScript/replace-body.js${noteKn4}interval: 86400`);	
					};
                    }else if (type.match(/\x20(https?|ftp|file)/)){
//定时任务                    
				
				if (isSurgeiOS || isShadowrocket || isLooniOS){
				cronExp = x.replace(/\x20{2,}/g," ").split(/\x20(https?|ftp|file)/)[0].replace(/^#/,'');
				}else if (isStashiOS){
				cronExp = x.replace(/\x20{2,}/g," ").split(/\x20(https?|ftp|file)/)[0].replace(/[^\s]+ ([^\s]+ [^\s]+ [^\s]+ [^\s]+ [^\s]+)/,'$1').replace(/^#/,'');
				};
				
            if (nCron != null){
	for (let i=0; i < nCron.length; i++) {
  const elem = nCron[i];
	if (x.indexOf(elem) != -1){
        cronExp = nCronExp[i];   
            };};};
                
				cronJs = x.split("://")[0].replace(/.+\x20([^\s]+)$/,"$1") + "://" + x.split("://")[1].split(",")[0];
				
				croName = cronJs.substring(cronJs.lastIndexOf('/') + 1, cronJs.lastIndexOf('.') );
				
				if (isSurgeiOS || isShadowrocket){
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
				script.push(
						`${noteK}${croName} = type=cron, cronexp="${cronExp}", script-path=${cronJs}, timeout=60, wake-system=1`);	
				}else if (isLooniOS){
				z[y - 1]?.match(/^#/) && script.push(z[y - 1]);
				script.push(
						`${noteK}cron "${cronExp}" script-path=${cronJs}, timeout=60, tag=${croName}`);
				}else if (isStashiOS){
				z[y - 1]?.match(/^#/) && cron.push("    " + z[y - 1]);
				cron.push(
						`${noteK4}- name: ${croName}${noteKn6}cron: "${cronExp}"${noteKn6}timeout: 60`);
				providers.push(
						`${noteK2}${croName}:${noteKn4}url: ${cronJs}${noteKn4}interval: 86400`);	};
                    };//定时任务转换结束
				}
		} //switch结束
	
}); //循环结束

if (isLooniOS){
    pluginDesc = (pluginDesc[0] || '') && `${pluginDesc.join("\n")}`;
    
    if (pluginDesc !="" && pluginDesc.search(/#! *name *=/) != -1){
        //没有图标的插入图标
        if (pluginDesc.search(/#! *icon *= *.+/) == -1){
        pluginDesc = pluginDesc + "\n" + pluginIcon;
            
        }else{pluginDesc = pluginDesc;};
		
        //Pokemon没有作者的插入作者
        if (iconLibrary2 == "Pokemon" && pluginDesc.search(/#! *author *= *.+/i) == -1){
        pluginDesc = pluginDesc + "\n" + pluginPokemonAuthor;
        }else{pluginDesc = pluginDesc;};
		
        //Pokemon没有homepage的插入homepage
        if (iconLibrary2 == "Pokemon" && pluginDesc.search(/#! *homepage *= *.+/i) == -1){
        pluginDesc = pluginDesc + "\n" + pluginPokemonHomepage;
        }else{pluginDesc = pluginDesc;};
		
    }else{
        if (iconLibrary2 == "Pokemon"){
            pluginDesc = npluginDesc + "\n" + pluginIcon + "\n" + pluginPokemonAuthor + "\n" + pluginPokemonHomepage;
        }else{
                    pluginDesc = npluginDesc + "\n" + pluginIcon;
        };
    };
    
    if (iconReplace == "启用" && pluginDesc.search(/#!icon=/) == -1 ){
        pluginDesc = pluginDesc + "\n" + pluginIcon};
    
	script = (script[0] || '') && `[Script]\n\n${script.join("\n\n")}`;
	
	URLRewrite = (URLRewrite[0] || '') && `[Rewrite]\n\n${URLRewrite.join("\n")}`;
	
	others = (others[0] || '') && `${others.join("\n\n")}`;
	
body = `${pluginDesc}


${URLRewrite}


${script}


${MITM}`
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
}else if (isSurgeiOS || isShadowrocket){
    
    pluginDesc = (pluginDesc[0] || '') && `${pluginDesc.join("\n")}`;
    
    if (pluginDesc !="" && pluginDesc.search(/#! *name *=/) != -1){
        pluginDesc = pluginDesc;
    }else{
        pluginDesc = npluginDesc;
    };
    
	script = (script[0] || '') && `[Script]\n\n${script.join("\n\n")}`;
	
	URLRewrite = (URLRewrite[0] || '') && `[URL Rewrite]\n\n${URLRewrite.join("\n")}`;
	
	MapLocal = (MapLocal[0] || '') && `[Map Local]\n\n${MapLocal.join("\n\n")}`;
	
	others = (others[0] || '') && `${others.join("\n\n")}`;

body = `${pluginDesc}


${URLRewrite}


${script}


${MapLocal}


${MITM}`
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
}else if (isStashiOS){
    
    pluginDesc = (pluginDesc[0] || '') && `${pluginDesc.join("\n")}`;
    
    if (pluginDesc !="" && pluginDesc.search(/name: /) != -1){
        pluginDesc = pluginDesc;
    }else{
        pluginDesc = npluginDesc;
    };
	
	URLRewrite = (URLRewrite[0] || '') && `  rewrite:\n${URLRewrite.join("\n")}`;
    
	script = (script[0] || '') && `  script:\n${script.join("\n\n")}`;
    
    	MITM = MITM.replace(/\x20/g,'')
           .replace(/\,/g,'"\n    - "')
		   .replace(/t&2;/g,'  ')
		   .replace(/t&hn;/g,'    - ')
	
    if (URLRewrite != "" || script != "" || MITM !=""){
httpFrame = `http:
${URLRewrite}

${script}

${MITM}`
    };

	cron = (cron[0] || '') && `cron:\n  script:\n${cron.join("\n")}`;
	
	providers = (providers[0] || '') && `script-providers:\n${providers.join("\n")}`;
	
	others = (others[0] || '') && `${others.join("\n\n")}`;

body = `${pluginDesc}


${httpFrame}

${cron}

${providers}`
		.replace(/script-providers:\n+$/g,'')
		.replace(/#      \n/gi,'\n')
		.replace(/      \n/g,"")
		.replace(/(#.+\n)\n+(?!\[)/g,'$1')
		.replace(/\n{2,}/g,'\n\n')
};
