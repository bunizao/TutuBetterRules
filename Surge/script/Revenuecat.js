/*

Revenuecat解锁合集，已解锁APP及下载地址请见说明：https://github.com/Guding88/Script/blob/main/Readme.md

[rewrite_local]
^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://raw.githubusercontent.com/Guding88/Script/main/APPheji_Revenuecat.js
//^https?:\/\/api\.revenuecat\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-request-header https://raw.githubusercontent.com/Guding88/Script/main/APPheji_Revenuecat.js

[MITM]
hostname = api.revenuecat.com

*/
const guding = {};
const guding6 = JSON.parse(typeof $response != "undefined" && $response.body || null);
if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  guding.headers = $request.headers;
} else if (guding6 && guding6.subscriber) {
  guding6.subscriber.subscriptions = guding6.subscriber.subscriptions || {};
  guding6.subscriber.entitlements = guding6.subscriber.entitlements || {};
  var headers = {};
  for (var key in $request.headers) {
  const reg = /^[a-z]+$/;
  if (key === "User-Agent" && !reg.test(key)) {
    var lowerkey = key.toLowerCase();
    $request.headers[lowerkey] = $request.headers[key];
    delete $request.headers[key];
    }
  }
  var UA = $request.headers['user-agent'];
  const app = 'gd';
  const UAMappings = {
    'Clockology':{ name: 'Clockology+', id: 'com.mikehill.clockologyios.yearly'},
    'Falendar':{ name: 'Falendar+', id: 'falendar_68_life'},
    'OffScreen':{ name: 'Entitlement.Pro', id: 'tech.miidii.offscreen.subscription.year.intro.first_year_discount'},
    'Paper':{ name: 'pro', id: 'com.fiftythree.paper.pro_12'},
    'Pillow':{ name: 'premium', id: 'com.neybox.pillow.premium.year.specialoffer'},
    'WidgetSmith':{ name: 'Premium', id: 'PremiumAnnualWidget'},
    'streaks':{ name: 'patron', id: 'com.andyworks.streaks.yearlyPatron'},
    'tiimo':{ name: 'full_access', id: 'lifetime.iap'},

    
    
  };
  const data = {
    "expires_date": "6666-06-06T06:06:06Z",
    "original_purchase_date": "2023-06-06T06:06:06Z",
    "purchase_date": "2023-06-06T06:06:06Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };
  for (const i in UAMappings) {
    if (new RegExp(`^${i}`, 'i').test(UA)) {
      const { name, id } = UAMappings[i];
      guding6.subscriber.subscriptions = {};
      guding6.subscriber.subscriptions[id] = data;
      guding6.subscriber.entitlements[name] = JSON.parse(JSON.stringify(data));
      guding6.subscriber.entitlements[name].product_identifier = id;
      break;
    }
  }
  guding.body = JSON.stringify(guding6);
}
$done(guding);
