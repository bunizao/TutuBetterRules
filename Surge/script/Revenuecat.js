// Source@ https://gist.githubusercontent.com/ddgksf2013/dbb1695cd96743eef18f3fac5c6fe227/raw/revenuecat.js

// 兼容性转换 via @ScriptHub


if (typeof $request !== 'undefined') {
  const lowerCaseRequestHeaders = Object.fromEntries(
    Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v])
  );

  $request.headers = new Proxy(lowerCaseRequestHeaders, {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey.toLowerCase(), receiver);
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey.toLowerCase(), value, receiver);
    },
  });
}
if (typeof $response !== 'undefined') {
  const lowerCaseResponseHeaders = Object.fromEntries(
    Object.entries($response.headers).map(([k, v]) => [k.toLowerCase(), v])
  );

  $response.headers = new Proxy(lowerCaseResponseHeaders, {
    get: function (target, propKey, receiver) {
      return Reflect.get(target, propKey.toLowerCase(), receiver);
    },
    set: function (target, propKey, value, receiver) {
      return Reflect.set(target, propKey.toLowerCase(), value, receiver);
    },
  });
}


// QX 相关
var setInterval = () => {}
var clearInterval = () => {}
var $task = {
  fetch: url => {
    return new Promise((resolve, reject) => {
      if (url.method == 'POST') {
        $httpClient.post(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      } else {
        $httpClient.get(url, (error, response, data) => {
          if (response) {
            response.body = data
            resolve(response, {
              error: error,
            })
          } else {
            resolve(null, {
              error: error,
            })
          }
        })
      }
    })
  },
}

var $prefs = {
  valueForKey: key => {
    return $persistentStore.read(key)
  },
  setValueForKey: (val, key) => {
    return $persistentStore.write(val, key)
  },
}

var $notify = (title = '', subt = '', desc = '', opts) => {
  const toEnvOpts = (rawopts) => {
    if (!rawopts) return rawopts 
    if (typeof rawopts === 'string') {
      if ('undefined' !== typeof $loon) return rawopts
      else if('undefined' !== typeof $rocket) return rawopts
      else return { url: rawopts }
    } else if (typeof rawopts === 'object') {
      if ('undefined' !== typeof $loon) {
        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
        return { openUrl, mediaUrl }
      } else {
        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
        if('undefined' !== typeof $rocket) return openUrl
        return { url: openUrl }
      }
    } else {
      return undefined
    }
  }
  console.log(title, subt, desc, toEnvOpts(opts))
  $notification.post(title, subt, desc, toEnvOpts(opts))
}
var _scriptSonverterOriginalDone = $done
var _scriptSonverterDone = (val = {}) => {
  let result
  if (
    (typeof $request !== 'undefined' &&
    typeof val === 'object' &&
    typeof val.status !== 'undefined' &&
    typeof val.headers !== 'undefined' &&
    typeof val.body !== 'undefined') || true
  ) {
    try {
      for (const part of val?.status?.split(' ')) {
        const statusCode = parseInt(part, 10)
        if (!isNaN(statusCode)) {
          val.status = statusCode
          break
        }
      }
    } catch (e) {}
    if (!val.status) {
      val.status = 200
    }
    if (!val.headers) {
      val.headers = {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      }
    }
    result = { response: val }
  } else {
    result = val
  }
  console.log('$done')
  try {
    console.log(JSON.stringify(result))
  } catch (e) {
    console.log(result)
  }
  _scriptSonverterOriginalDone(result)
}
var window = globalThis
window.$done = _scriptSonverterDone
var global = globalThis
global.$done = _scriptSonverterDone

/***********************************

> ScriptName        RevenueCat多合一脚本[墨鱼版]
> Author            @ddgksf2013
> ForHelp           若有屏蔽广告的需求，可公众号后台回复APP名称
> WechatID          墨鱼手记
> TgChannel         https://t.me/ddgksf2021
> Contribute        https://t.me/ddgksf2013_bot
> Feedback          📮 ddgksf2013@163.com 📮
> UpdateTime        2023-11-25
> Suitable          自行观看“# > ”注释内容，解锁是暂时的，购买也不是永久的[订阅、跑路]
> Attention         如需引用请注明出处，谢谢合作！
> ScriptURL         https://gist.githubusercontent.com/ddgksf2013/dbb1695cd96743eef18f3fac5c6fe227/raw/revenuecat.js

# ========解锁列表======== #
# > 01 白云天气
https://apps.apple.com/cn/app/id1575901953
# > 02 图图记账
https://apps.apple.com/cn/app/id1546356856
# > 03 Aphrodite
https://apps.apple.com/cn/app/id1568289454
# > 04 Apollo
https://apps.apple.com/cn/app/id1616467801
# > 05 pandora
https://apps.apple.com/cn/app/id1470560916
# > 06 widgetart
https://apps.apple.com/cn/app/id1539097448
# > 07 Spark
https://apps.apple.com/cn/app/id997102246
# > 08 Pillow
https://apps.apple.com/cn/app/id878691772
# > 09 1Blocker
https://apps.apple.com/cn/app/id1365531024
# > 10 VSCO
https://apps.apple.com/cn/app/id588013838
# > 13 OffScreen
https://apps.apple.com/cn/app/id1474340105
# > 14 花样文字
https://apps.apple.com/cn/app/id1438854446
# > 15 ScannerPro
https://apps.apple.com/cn/app/id333710667
# > 16 车票票
https://apps.apple.com/cn/app/id6446212291
# > 17 HTTPBot
https://apps.apple.com/us/app/id1232603544
# > 18 Audiomack
https://apps.apple.com/cn/app/id921765888
# > 19 ServerBee
https://apps.apple.com/cn/app/id6443553714
# > 20 NotBoring天气
https://apps.apple.com/cn/app/id1531063436
# > 21 NotBoring习惯
https://apps.apple.com/cn/app/id1593891243
# > 22 NotBoring计算器
https://apps.apple.com/cn/app/id1533591596
# > 23 NotBoring计时器
https://apps.apple.com/cn/app/id1531048091
# > 24 NotBoringVibes
https://apps.apple.com/cn/app/id1661440185
# > 25 倒数鸭
https://apps.apple.com/cn/app/id6457201223
# > 26 iptv-ultra
https://apps.apple.com/cn/app/id1549657742
# > 27 happy-days
https://apps.apple.com/cn/app/id1564858029
# > 28 chatai[非国区旧版V3.6]
https://apps.apple.com/us/app/id1661016696
# > 29 aptv[旧版V1.25]
https://apps.apple.com/us/app/id1630403500
# > 30 TouchRetouch
https://apps.apple.com/cn/app/id373311252
# > 31 方弗相机
https://apps.apple.com/cn/app/id1621425556
# > 32 Myjumplab
https://apps.apple.com/us/app/id1554077178
# > 33 目标地图
https://apps.apple.com/cn/app/id1555022550
# > 34 Paku
https://apps.apple.com/cn/app/id1534130193
# > 35 AwesomeHabits
https://apps.apple.com/cn/app/id1514915737
# > 36 Gear
https://apps.apple.com/cn/app/id1458962238
# > 37 MoneyThings
https://apps.apple.com/cn/app/id1549694221
# > 38 Anybox
https://apps.apple.com/us/app/id1593408455
# > 39 noto
https://apps.apple.com/us/app/id1459055246
# > 40 Widgetsmith
https://apps.apple.com/cn/app/id1523682319
# > 41 Percento
https://apps.apple.com/cn/app/id1494319934
# > 42 Planny
https://apps.apple.com/cn/app/id1515324201
# > 43 loopsie
https://apps.apple.com/us/app/id1259909228
# > 44 手机硬件管家
https://apps.apple.com/cn/app/id1329937809
# > 45 ImageX
https://apps.apple.com/us/app/id1668530080
# > 46 我的时间
https://apps.apple.com/cn/app/id1481796842
# > 47 Fin
https://apps.apple.com/cn/app/id1489698531
# > 48 星垂日记
https://apps.apple.com/cn/app/id1663588935
# > 49 星垂专注
https://apps.apple.com/cn/app/id6446450915
# > 50 Locket
https://apps.apple.com/cn/app/id1600525061
# > 51 one4wall
https://apps.apple.com/us/app/id6446678464
# > 52 mizframa
https://apps.apple.com/cn/app/id6444951894
# > 53 极简时钟
https://apps.apple.com/cn/app/id1265404088
# > 54 极简日记
https://apps.apple.com/cn/app/id1568936702
# > 55 治愈时钟
https://apps.apple.com/cn/app/id1599856748
# > 56 photomator
https://apps.apple.com/cn/app/id1444636541
# > 57 奇妙组件
https://apps.apple.com/cn/app/id1466785009
# > 58 structured
https://apps.apple.com/cn/app/id1499198946


[rewrite_local]

# ～ RevenueCat@ddgksf2013
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/[^/]+$) url script-echo-response https://gist.githubusercontent.com/ddgksf2013/dbb1695cd96743eef18f3fac5c6fe227/raw/revenuecat.js
^https:\/\/api\.revenuecat\.com\/.+\/subscribers\/[^/]+/(offerings|attributes)$ url request-header (\r\n)X-RevenueCat-ETag:.+(\r\n) request-header $1X-RevenueCat-ETag:$2

[mitm]

hostname=api.revenuecat.com

***********************************/




//固定头部, tg频道：https://t.me/ddgksf2021

var ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
var cuttlefish = {"Attention":"恭喜你抓到元数据！由墨鱼分享，请勿售卖或分享他人！","request_date_ms":1662599120248,"request_date":"2022-09-08T01:05:20Z","subscriber":{"non_subscriptions":{},"first_seen":"2022-09-08T01:04:03Z","original_application_version":"8","other_purchases":{},"management_url":"https://apps.apple.com/account/subscriptions","subscriptions":{},"entitlements":{},"original_purchase_date":"2022-09-07T13:05:43Z","original_app_user_id":"$RCAnonymousID:ddgksf2013","last_seen":"2022-09-08T01:04:03Z"}};
var ddgksf2013={"is_sandbox":false,"ownership_type":"PURCHASED","billing_issues_detected_at":null,"period_type":"normal","expires_date":"2099-12-18T01:04:17Z","grace_period_expires_date":null,"unsubscribe_detected_at":null,"original_purchase_date":"2022-09-08T01:04:18Z","purchase_date":"2022-09-08T01:04:17Z","store":"app_store"};
var ddgksf2021={"grace_period_expires_date":null,"purchase_date":"2022-09-08T01:04:17Z","product_identifier":"ddgksf2013_1y_128","expires_date":"2099-12-18T01:04:17Z"};
var obj = JSON.parse(JSON.stringify(cuttlefish));
ddgksf2021['product_identifier']="com.ddgksf2013.premium.yearly";
obj['subscriber']['subscriptions']['com.ddgksf2013.premium.yearly']=ddgksf2013;

//动态ID分配
if(ua.indexOf('%E8%BD%A6%E7%A5%A8%E7%A5%A8') != -1) {//车票票
 obj['subscriber']['entitlements']['vip+watch_vip']=ddgksf2021;
}
else if(ua.indexOf('LUTCamera') != -1) {//方弗相机
	ddgksf2021['product_identifier']="com.uzero.funforcam.monthlysub";
	obj['subscriber']['entitlements']['ProVersion']=ddgksf2021;
	obj['subscriber']['subscriptions']['com.uzero.funforcam.monthlysub']=ddgksf2013;
}
else if(ua.indexOf('totowallet') != -1) {//图图记账
	ddgksf2021['product_identifier']="com.ziheng.totowallet.yearly";
	obj['subscriber']['entitlements']['all']=ddgksf2021;
	obj['subscriber']['subscriptions']['com.ziheng.totowallet.yearly']=ddgksf2013;
}
else if(ua.indexOf('Aphrodite') != -1) {//Aphrodite
	obj['subscriber']['entitlements']['all']=ddgksf2021;
}
else if(ua.indexOf('apollo') != -1) {//apollo
	obj['subscriber']['entitlements']['all']=ddgksf2021;
}
else if(ua.indexOf('widget_art') != -1) {//widget_art
	obj['subscriber']['entitlements']['all']=ddgksf2021;	
}
else if(ua.indexOf('OneBox') != -1) {//pandora
  obj['subscriber']['entitlements']['all']=ddgksf2021;
}
else if(ua.indexOf('Spark') != -1) {//spark
	obj['subscriber']['entitlements']['premium']=ddgksf2021;	
}
else if(ua.indexOf('Pillow') != -1) {//pillow
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
}
else if(ua.indexOf('1Blocker') != -1) {//1Blocker
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
}
else if(ua.indexOf('VSCO') != -1) {//VSCO
	obj['subscriber']['entitlements']['membership']=ddgksf2021;
}
else if(ua.indexOf('UTC') != -1) {//花样文字
	obj['subscriber']['entitlements']['Entitlement.Pro']=ddgksf2021;	
}
else if(ua.indexOf('OffScreen') != -1) {//OffScreen
	obj['subscriber']['entitlements']['Entitlement.Pro']=ddgksf2021;	
}
else if(ua.indexOf('ScannerPro') != -1) {//Scanner Pro
	obj['subscriber']['entitlements']['plus']=ddgksf2021;
}
else if(ua.indexOf('WhiteCloud') != -1) {//WhiteCloud
	obj['subscriber']['entitlements']['allaccess']=ddgksf2021;
}
else if(ua.indexOf('HTTPBot') != -1) {//httpbot
  obj['subscriber']['entitlements']['pro']=ddgksf2021;
}
else if(ua.indexOf('audiomack') != -1) {//Audiomack
	obj['subscriber']['entitlements']['Premium1']=ddgksf2021;
}
else if(ua.indexOf('server_bee') != -1) {//server_bee
	obj['subscriber']['entitlements']['Pro']=ddgksf2021;
}
else if(ua.indexOf('simple-') != -1) {//NotBoring
	obj['subscriber']['entitlements']['patron']=ddgksf2021;
}
else if(ua.indexOf('streaks') != -1) {//习惯
	obj['subscriber']['entitlements']['patron']=ddgksf2021;
}
else if(ua.indexOf('andyworks-calculator') != -1) {//计算器
	obj['subscriber']['entitlements']['patron']=ddgksf2021;
}
else if(ua.indexOf('vibes') != -1) {//vibes
	obj['subscriber']['entitlements']['patron']=ddgksf2021;
}
else if(ua.indexOf('CountDuck') != -1) {//vibes
	ddgksf2021['product_identifier']="Lifetime";
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
	obj['subscriber']['subscriptions']['Lifetime']=ddgksf2013;
}
else if(ua.indexOf('IPTVUltra') != -1) {//vibes
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
}
else if(ua.indexOf('Happy%3ADays') != -1) {//HappyDays
	ddgksf2021['product_identifier']="happy_999_lifetime";
	obj['subscriber']['entitlements']['pro']=ddgksf2021;
	obj['subscriber']['subscriptions']['happy_999_lifetime']=ddgksf2013;
}
else if(ua.indexOf('ChatGPTApp') != -1) {//chat-ai-ask-chatbot-assistant
	obj['subscriber']['entitlements']['Advanced']=ddgksf2021;
}
else if(ua.indexOf('APTV') != -1) {//APTV
	obj['subscriber']['entitlements']['pro']=ddgksf2021;	
}
else if(ua.indexOf('TouchRetouchBasic') != -1) {//TouchRetouchBasic
	obj['subscriber']['entitlements']['premium']=ddgksf2021;	
}
else if(ua.indexOf('My%20Jump%20Lab') != -1) {//My%20Jump%20Lab
	obj['subscriber']['entitlements']['lifetime']=ddgksf2021;	
}
else if(ua.indexOf('%E7%9B%AE%E6%A0%87%E5%9C%B0%E5%9B%BE') != -1) {//目标地图
	obj['subscriber']['entitlements']['pro']=ddgksf2021;
}
else if(ua.indexOf('Paku') != -1) {//Paku
  obj['subscriber']['entitlements']['pro']=ddgksf2021;
}
else if(ua.indexOf('Awesome%20Habits') != -1) {//Awesome%20Habits
  obj['subscriber']['entitlements']['premium']=ddgksf2021;
}
else if(ua.indexOf('Gear') != -1) {//Gear	
	ddgksf2021['product_identifier']="com.gear.app.yearly";
	obj['subscriber']['entitlements']['pro']=ddgksf2021;
	obj['subscriber']['subscriptions']['com.gear.app.yearly']=ddgksf2013;

}
else if(ua.indexOf('MoneyThings') != -1) {//MoneyThings
	obj['subscriber']['entitlements']['Premium']=ddgksf2021;
}
else if(ua.indexOf('Anybox') != -1) {//Anybox
	obj['subscriber']['entitlements']['pro']=ddgksf2021;	
}
else if(ua.indexOf('Fileball') != -1) {//Filebox
	obj['subscriber']['entitlements']['filebox_pro']=ddgksf2021;
}
else if(ua.indexOf('Noto') != -1) {//noto
  obj['subscriber']['entitlements']['pro']=ddgksf2021;
}
else if(ua.indexOf('Grow') != -1) {
	ddgksf2021['product_identifier']="grow_lifetime";
	obj['subscriber']['entitlements']['grow.pro']=ddgksf2021;
	obj['subscriber']['subscriptions']['grow_lifetime']=ddgksf2013;
}
else if(ua.indexOf('WidgetSmith') != -1) {//Widgetsmith
	obj['subscriber']['entitlements']['Premium']=ddgksf2021;
}
else if(ua.indexOf('Percento') != -1) {//Percento
	obj['subscriber']['entitlements']['premium']=ddgksf2021;	
}
else if(ua.indexOf('Planny') != -1) {//Planny 6
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
}
else if(ua.indexOf('CPUMonitor') != -1) {//手机硬件管家
	obj['subscriber']['entitlements']['Pro']=ddgksf2021;	
}
else if(ua.indexOf('Locket') != -1) {
	obj['subscriber']['entitlements']['Gold']=ddgksf2021;	
}
else if(ua.indexOf('My%20Tim') != -1) {
	obj['subscriber']['entitlements']['Pro']=ddgksf2021;	
}
else if(ua.indexOf('Photom') != -1) {
	ddgksf2021['product_identifier']="pixelmator_photo_pro_subscription_v1_pro_offer";
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
	obj['subscriber']['subscriptions']['pixelmator_photo_pro_subscription_v1_pro_offer']=ddgksf2013;	
}
else if(ua.indexOf('mizframa') != -1) {
	ddgksf2021['product_identifier']="mf_20_lifetime2";
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
	obj['subscriber']['subscriptions']['mf_20_lifetime2']=ddgksf2013;
}
else if(ua.indexOf('ImageX') != -1) {
	ddgksf2021['product_identifier']="imagex.pro.ios.lifetime";
	obj['subscriber']['entitlements']['imagex.pro.ios']=ddgksf2021;
	obj['subscriber']['subscriptions']['imagex.pro.ios.lifetime']=ddgksf2013;	
}
else if(ua.indexOf('Fin') != -1) {//Fin
	ddgksf2021['product_identifier']="com.circles.fin.premium.yearly";
	obj['subscriber']['entitlements']['premium']=ddgksf2021;
	obj['subscriber']['subscriptions']['com.circles.fin.premium.yearly']=ddgksf2013;
}
else if(ua.indexOf('One4Wall') != -1) {
	ddgksf2021['product_identifier']="lifetime_key";
	obj['subscriber']['entitlements']['lifetime']=ddgksf2021;
	obj['subscriber']['subscriptions']['lifetime_key']=ddgksf2013;
}
else if(ua.indexOf('OneWidget') != -1) {
	obj['subscriber']['entitlements']['allaccess']=ddgksf2021;
}
else{
  obj['subscriber']['entitlements']['pro']=ddgksf2021;
}
_scriptSonverterDone({body: JSON.stringify(obj)});
