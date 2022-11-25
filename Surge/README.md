# Surge配置使用教程🥳
#### 规则更新通知频道：[🌟欢迎关注telegram频道](https://t.me/hututu00)

 写在前面：由于作者经常懒得更新README文档，导致某些参数不准确（例如进阶教程中所指的配置文件行数），或者某些链接已经失效，如果您有发现可以帮助我提一个`issue`或者 `Pull Request`,作者在这里十分感激！

### Starting Introduction/初级教程


#### 点击`从URL下载配置` 引用以下链接：
 * PRO版：
```
https://raw.iqiq.io/bunizao/TutuBetterRules/tutu/Surge/Surge.conf
```
 * 青春版： 
```
https://raw.iqiq.io/bunizao/TutuBetterRules/tutu/Surge/Surge_lite.conf
```

 * 区别介绍：
   * 青春版的策略组部分相较PRO版较为缩减，只保留一些精干常用的策略组。
   * [GENERAL]部分重写，注释风格更加统一美观。
   * 青春版的 `所有域名` 添加了GitHub反代，丝滑更新全部配置。
   * 总结：固化内容增多，选择余地减少。



#### 使用Sub-Store添加订阅节点：
   `2022.09.08` 之后的配置**内嵌Sub-Store**，可以不用添加模块，请确认您正在阅读本文章的日期。
 * 请确认您已经**正确配置并信任了系统根证书**，并且已开启`MitM`、`Rewrite`、`脚本`。
 * 在浏览器中打开 https://sub.store 后进入Sub-Store，先添加`单条订阅`输入你的节点信息，然后添加`组合订阅`；   
 * **组合订阅的命名一定要为Surge** ‼️
 * 若获取到的链接为 `https://sub.store/download/collection/Surge` 则为成功。
 * 进入Surge，`更新外部资源` 即可使用节点。
   * Sub-Store高级进阶玩法请参阅 [官方教程](https://www.notion.so/Sub-Store-6259586994d34c11a4ced5c406264b46)

#### 替换你自己的机场订阅链接：
```
[Proxy Group]
102 # > 这是你的机场链接填写的地方 在policy_path=后面粘贴你自己机场的订阅链接
103 ℕ𝕖𝕩𝕚𝕥𝕒𝕝𝕝𝕪 = select, policy-path=这里粘贴你自己机场的订阅链接
104 𝔽𝕝𝕠𝕨𝕖𝕣ℂ𝕝𝕠𝕦𝕕 = select, policy-path=这里粘贴你自己机场的订阅链接
```
  * 替换`policy_path=`后面的内容为你自己的机场订阅链接，名字可以更换掉不会有影响。
  * 花样字体生成： https://qwerty.dev/fancy-font-generator

---
### Advanced Introduction/进阶教程
  * 1.本配置独家支援`🆕 Anti-IPCheck 混淆大陆app的ip查询`功能，**默认开启**。
```
144 # > 🆕 Anti-IPCheck 混淆大陆app的ip查询
145 RULE-SET,https://raw.githubusercontent.com/bunizao/TutuBetterRules/tutu/RuleList/DOMAlN/Anti-IPCheck.list,𝐏𝐫𝐨𝐱𝐲
```
如想关闭，请删去144、145两行或者转为注释。
  * 2.WeChat加速，**默认关闭**。
```
163 # > 🆕WeChat 根据你自己的Wechat DC选择策略
164 #RULE-SET,https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/WeChat.list,🇸🇬Singapore
```
  * Suggestions/使用建议：
    * WeChat绑定以下地区手机号的：`🇨🇳中国大陆(+86)`、`🇭🇰香港特别行政区(+852)`、`🇲🇴澳门特别行政区(+853)`、`🇪🇺欧洲经济区(EEA)`，**不建议开启**，保持默认即可。
    * WeChat绑定以下地区手机号的：`🇺🇳其他地区`，建议开启。删除164行前面的 **#** 号，即可开启。


  * 3.ASN分流，**默认开启**。
    * 使用了先进的`ASN分流`代替了古老刻板的`GEOIP,CN`。
    * `ASN`分流比`GEOIP,CN`更加精准可靠。
    * ASN list引用自[VirgilClyne](https://github.com/VirgilClyne/GetSomeFries/wiki/%F0%9F%8C%90-ASN#%E7%AE%80%E4%BB%8B)
 ```
196 # > 先进的 ASN China 分流
197 #GEOIP,CN,DIRECT
198 RULE-SET,https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/ruleset/ASN.China.list,DIRECT
 ```

  * 4.Panel/面板
    * 以下是我整理的Panel面板，包括重载配置、策略组面板、网络详情、流媒体解锁状态检测。
```
https://raw.githubusercontent.com/bunizao/TutuBetterRules/tutu/Surge/panel/AllPanel.sgmodule
```
  * 5.Module/模块
    * 彩云天气通知：定时通知您身边的天气状态。  （ios16+不可用）
[CaiYunWeather.sgmodule](https://raw.githubusercontent.com/bunizao/TutuBetterRules/tutu/Surge/module/CaiYunWeather.sgmodule)

    * TikTok解锁：使用本脚本可以解锁TikTok对MCC检测的限制(台湾🇹🇼)。  
[Tiktok-UnlockTW.sgmodule](https://raw.githubusercontent.com/bunizao/TutuBetterRules/tutu/Surge/module/Tiktok-UnlockTW.sgmodule)

    * 一些个破解合集  
[破解合集.sgmodule](https://raw.githubusercontent.com/bunizao/TutuBetterRules/tutu/Surge/module/FunScript.sgmodule)

    * 🧱墙裂推荐：[iRingo](https://github.com/VirgilClyne/iRingo#iringo)-解锁完整的Apple功能和集成服务
      * [ iRingo for Location Services.sgmodule](https://github.com/VirgilClyne/iRingo/blob/main/sgmodule/Location.sgmodule?raw=true)
      * [ iRingo for Siri & Search.sgmodule](https://github.com/VirgilClyne/iRingo/blob/main/sgmodule/Siri.sgmodule?raw=true)
      * [ iRingo for Weather.sgmodule](https://github.com/VirgilClyne/iRingo/blob/beta/sgmodule/Weather.beta.sgmodule?raw=true) //iOS16+不可用
      * [ iRingo for News.sgmodule](https://github.com/VirgilClyne/iRingo/blob/main/sgmodule/News.sgmodule?raw=true)
      * [ iRingo for TV app.sgmodule](https://github.com/VirgilClyne/iRingo/blob/main/sgmodule/TV.sgmodule?raw=true)
   
    * 🧱墙裂推荐：[🌐 DNS分流模块](https://github.com/VirgilClyne/GetSomeFries/wiki/%F0%9F%8C%90-DNS)
      * [🌐 DNS for Router and Companys.sgmodule](https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/sgmodule/DNS.sgmodule)
      ---
      ### Announsment/声明
      ### [简体中文](https://github.com/bunizao/TutuBetterRules/blob/tutu/Announcement/Announcement_SimplifiedChinese.md)｜[繁體中文](https://github.com/bunizao/TutuBetterRules/blob/tutu/Announcement/Announcement_TradiationalChinese.md)｜[English](https://github.com/bunizao/TutuBetterRules/blob/tutu/Announcement/Announcement_English.md)｜[日本語](https://github.com/bunizao/TutuBetterRules/blob/tutu/Announcement/Announcement_Japanese.md)｜[Deutsche](https://github.com/bunizao/TutuBetterRules/blob/tutu/Announcement/Announcement_German.md)
      ---
      
     
