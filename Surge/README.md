# surge配置使用教程🥳


### -Starting Introduction/初级教程

#### 点击`从URL下载配置` 引用以下链接：
```
https://raw.githubusercontent.com/bunizao/TutuBetterRules/tutu/Surge/Surge.conf
```
 * 由于这是引用配置，不可编辑，所以我们还需要`创建当前配置副本`。

#### 使用Sub-Store添加订阅节点：
 * 首页点击`模块`-->`引用新模块..`-->复制以下链接：
```
https://raw.githubusercontent.com/Peng-YM/Sub-Store/master/config/Surge.sgmodule
```
 * 在浏览器中打开 https://sub.store 后进入Sub-Store，先添加`单条订阅`输入你的节点信息，然后添加`组合订阅`；   
 * **组合订阅的命名一定要为Surge** ‼️
 * 若获取到的链接为 `https://sub.store/download/collection/Surge` 则为成功。
 * 进入Surge，`更新外部资源`即可使用节点。
   * Sub-Store高级进阶玩法请参阅 [官方教程](https://www.notion.so/Sub-Store-6259586994d34c11a4ced5c406264b46)

#### 替换你自己的机场订阅链接：
```
[Proxy Group]
102 # > 这是你的机场链接填写的地方 在policy_path=后面粘贴你自己机场的订阅链接（不要在这里粘贴 谢谢）
103 ℕ𝕖𝕩𝕚𝕥𝕒𝕝𝕝𝕪 = select, policy-path=https://naixisubs.com/downloadConfig/SurgeConfig.aspx?t=ss&urk=fucku114514
104 𝔽𝕝𝕠𝕨𝕖𝕣ℂ𝕝𝕠𝕦𝕕 = select, policy-path=sublink
```
  * 替换`policy_path=`后面的内容为你自己的机场订阅链接。
  * 花样字体生成： https://qwerty.dev/fancy-font-generator
  * 虽然没什么大用，策略组选择的节点还是来自Sub-Store。
---
### -Advanced Introduction/进阶教程
  * 本配置独家支援`🆕 Anti-IPCheck 混淆大陆app的ip查询`功能，**默认开启**。
```
144 # > 🆕 Anti-IPCheck 混淆大陆app的ip查询
145 RULE-SET,https://raw.githubusercontent.com/bunizao/TutuBetterRules/tutu/RuleList/DOMAlN/Anti-IPCheck.list,𝐏𝐫𝐨𝐱𝐲
```
如想关闭，请删去144、145两行或者转为注释。
  * WeChat加速，**默认关闭**。
```
163 # > 🆕WeChat 根据你自己的Wechat DC选择策略
164 #RULE-SET,https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/Extra/WeChat.list,🇸🇬Singapore
```
  * Suggestions/使用建议：
    * WeChat绑定以下地区手机号的：`🇨🇳中国大陆(+86)`、`🇭🇰香港特别行政区(+852)`、`🇲🇴澳门特别行政区(+853)`、`🇪🇺欧洲经济区(EEU)`，**不建议开启**，保持默认即可。
    * WeChat绑定以下地区手机号的：`🇺🇳其他地区`，建议开启。删除164行前面的 **#** 号，即可开启。
