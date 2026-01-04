import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./types-Bl_lnefZ.mjs";import{load as i}from"cheerio";const a=async r=>{let{category:a=`ywgg/tzgg`}=r.req.param(),o=Number.parseInt(r.req.query(`limit`)??`15`,10),s=`https://www.cccmc.org.cn`,c=new URL(a.endsWith(`/`)?a:`${a}/`,s).href,l=await e(c),u=i(l),d=u(`html`).attr(`lang`)??`zh-CN`,f=[];f=l.match(/\{url:'(.*)',title:'(.*)',time:'(.*)'\},/g)?.slice(0,o).map(e=>{let t=e.match(/'(.*?)'/),r=t?.[2]??``,i=t?.[3],a=t?.[1],o=i;return{title:r,pubDate:i?n(i):void 0,link:a?new URL(a,s).href:void 0,updated:o?n(o):void 0,language:d}})??[],f=(await Promise.all(f.map(r=>r.link?t.tryGet(r.link,async()=>{let t=i(await e(r.link)),a=t(`div.title`).text(),o=t(`div#article-content`).html()??``,s=t(`span.time`).text().split(/：/).pop(),c=t(`span.form, span.from`).toArray().map(e=>{let n=t(e);return{name:n.text().split(/：/).pop()??n.text()}}),l=s,u={title:a,description:o,pubDate:s?n(s):r.pubDate,author:c,content:{html:o,text:o},updated:l?n(l):r.updated,language:d};return{...r,...u}}):r))).filter(e=>!0);let p=u(`title`).text();return{title:p,description:p.split(/-/)[0].trim(),link:c,item:f,allowEmpty:!0,image:u(`img.logo`).attr(`src`),author:p.split(/-/)?.pop()?.trim(),language:d,id:c}},o={path:`/:category{.+}?`,name:`通用`,url:`www.cccmc.org.cn`,maintainers:[`nczitzk`],handler:a,example:`/cccmc/ywgg/tzgg`,parameters:{category:"分类，默认为 `ywgg/tzgg`，即通知公告，可在对应分类页 URL 中找到, Category, `ywgg/tzgg`，即通知公告  by default"},description:`::: tip
若订阅 [综合政策](https://www.cccmc.org.cn/zcfg/zhzc/)，网址为 \`https://www.cccmc.org.cn/zcfg/zhzc/\`，请截取 \`https://www.cccmc.org.cn/\` 到末尾的部分 \`zcfg/zhzc\` 作为 \`category\` 参数填入，此时目标路由为 [\`/cccmc/zcfg/zhzc\`](https://rsshub.app/cccmc/zcfg/zhzc)。
:::

<details>
<summary>更多分类</summary>

#### [会员之家](https://www.cccmc.org.cn/hyzj)

| [会员之声](https://www.cccmc.org.cn/hyzj/hyzs/) | [会员动态](https://www.cccmc.org.cn/hyzj/hydt/) | [会员推介](https://www.cccmc.org.cn/hyzj/hytj/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [hyzj/hyzs](https://rsshub.app/cccmc/hyzj/hyzs) | [hyzj/hydt](https://rsshub.app/cccmc/hyzj/hydt) | [hyzj/hytj](https://rsshub.app/cccmc/hyzj/hytj) |

#### [政策法规](https://www.cccmc.org.cn/zcfg)

| [综合政策](https://www.cccmc.org.cn/zcfg/zhzc/) | [国内贸易](https://www.cccmc.org.cn/zcfg/gnmy/) | [对外贸易](https://www.cccmc.org.cn/zcfg/dwmy/) | [投资合作](https://www.cccmc.org.cn/zcfg/tzhz/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [zcfg/zhzc](https://rsshub.app/cccmc/zcfg/zhzc) | [zcfg/gnmy](https://rsshub.app/cccmc/zcfg/gnmy) | [zcfg/dwmy](https://rsshub.app/cccmc/zcfg/dwmy) | [zcfg/tzhz](https://rsshub.app/cccmc/zcfg/tzhz) |

#### [行业资讯](https://www.cccmc.org.cn/hyzx)

| [统计分析](https://www.cccmc.org.cn/hyzx/tjfx/) | [石油化工](https://www.cccmc.org.cn/hyzx/syhg/) | [金属矿产](https://www.cccmc.org.cn/hyzx/jskc/) | [五金建材](https://www.cccmc.org.cn/hyzx/wjjc/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [hyzx/tjfx](https://rsshub.app/cccmc/hyzx/tjfx) | [hyzx/syhg](https://rsshub.app/cccmc/hyzx/syhg) | [hyzx/jskc](https://rsshub.app/cccmc/hyzx/jskc) | [hyzx/wjjc](https://rsshub.app/cccmc/hyzx/wjjc) |

#### [商业机会](https://www.cccmc.org.cn/syjh/)+

| [供应信息](https://www.cccmc.org.cn/syjh/gyxx/) | [需求信息](https://www.cccmc.org.cn/syjh/xqxx/) | [合作信息](https://www.cccmc.org.cn/syjh/hzxx/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [syjh/gyxx](https://rsshub.app/cccmc/syjh/gyxx) | [syjh/xqxx](https://rsshub.app/cccmc/syjh/xqxx) | [syjh/hzxx](https://rsshub.app/cccmc/syjh/hzxx) |

#### [商会党建](https://www.cccmc.org.cn/shdj)

| [党群动态](https://www.cccmc.org.cn/shdj/dqdt/) | [党内法规](https://www.cccmc.org.cn/shdj/dnfg/) | [青年工作](https://www.cccmc.org.cn/shdj/qngz/) |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| [shdj/dqdt](https://rsshub.app/cccmc/shdj/dqdt) | [shdj/dnfg](https://rsshub.app/cccmc/shdj/dnfg) | [shdj/qngz](https://rsshub.app/cccmc/shdj/qngz) |
</details>
`,categories:[`new-media`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.cccmc.org.cn/:category`],target:e=>{let t=e.category;return`/cccmc${t?`/${t}`:``}`}},{title:`商业机会 - 供应信息`,source:[`www.cccmc.org.cn/syjh/gyxx/`],target:`/syjh/gyxx`},{title:`商业机会 - 需求信息`,source:[`www.cccmc.org.cn/syjh/xqxx/`],target:`/syjh/xqxx`},{title:`商业机会 - 合作信息`,source:[`www.cccmc.org.cn/syjh/hzxx/`],target:`/syjh/hzxx`},{title:`商会党建 - 党群动态`,source:[`www.cccmc.org.cn/shdj/dqdt/`],target:`/shdj/dqdt`},{title:`商会党建 - 党内法规`,source:[`www.cccmc.org.cn/shdj/dnfg/`],target:`/shdj/dnfg`},{title:`商会党建 - 青年工作`,source:[`www.cccmc.org.cn/shdj/qngz/`],target:`/shdj/qngz`},{title:`行业资讯 - 统计分析`,source:[`www.cccmc.org.cn/hyzx/tjfx/`],target:`/hyzx/tjfx`},{title:`行业资讯 - 石油化工`,source:[`www.cccmc.org.cn/hyzx/syhg/`],target:`/hyzx/syhg`},{title:`行业资讯 - 金属矿产`,source:[`www.cccmc.org.cn/hyzx/jskc/`],target:`/hyzx/jskc`},{title:`行业资讯 - 五金建材`,source:[`www.cccmc.org.cn/hyzx/wjjc/`],target:`/hyzx/wjjc`},{title:`会员之家 - 会员之声`,source:[`www.cccmc.org.cn/hyzj/hyzs/`],target:`/hyzj/hyzs`},{title:`会员之家 - 会员动态`,source:[`www.cccmc.org.cn/hyzj/hydt/`],target:`/hyzj/hydt`},{title:`会员之家 - 会员推介`,source:[`www.cccmc.org.cn/hyzj/hytj/`],target:`/hyzj/hytj`},{title:`政策法规 - 综合政策`,source:[`www.cccmc.org.cn/zcfg/zhzc/`],target:`/zcfg/zhzc`},{title:`政策法规 - 国内贸易`,source:[`www.cccmc.org.cn/zcfg/gnmy/`],target:`/zcfg/gnmy`},{title:`政策法规 - 对外贸易`,source:[`www.cccmc.org.cn/zcfg/dwmy/`],target:`/zcfg/dwmy`},{title:`政策法规 - 投资合作`,source:[`www.cccmc.org.cn/zcfg/tzhz/`],target:`/zcfg/tzhz`}],view:r.Articles};export{a as handler,o as route};