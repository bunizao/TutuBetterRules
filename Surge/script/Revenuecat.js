
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
    "expires_date": "2099-10-12T11:45:14Z",
    "original_purchase_date": "2022-09-01T11:45:14Z",
    "purchase_date": "2022-09-01T11:45:14Z",
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
