import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./types-Bl_lnefZ.mjs";import{load as r}from"cheerio";const i=[{label:`Bandizip`,value:`bandizip`},{label:`Bandizip for Mac`,value:`bandizip.mac`},{label:`BandiView`,value:`bandiview`},{label:`Honeycam`,value:`honeycam`}],a=[{label:`English`,value:`en`},{label:`中文(简体)`,value:`cn`},{label:`中文(繁體)`,value:`tw`},{label:`日本語`,value:`jp`},{label:`Русский`,value:`ru`},{label:`Español`,value:`es`},{label:`Français`,value:`fr`},{label:`Deutsch`,value:`de`},{label:`Italiano`,value:`it`},{label:`Slovenčina`,value:`sk`},{label:`Українська`,value:`uk`},{label:`Беларуская`,value:`be`},{label:`Dansk`,value:`da`},{label:`Polski`,value:`pl`},{label:`Português Brasileiro`,value:`br`},{label:`Čeština`,value:`cs`},{label:`Nederlands`,value:`nl`},{label:`Slovenščina`,value:`sl`},{label:`Türkçe`,value:`tr`},{label:`ภาษาไทย`,value:`th`},{label:`Ελληνικά`,value:`gr`},{label:`O'zbek`,value:`uz`},{label:`Romanian`,value:`ro`},{label:`한국어`,value:`kr`}],o=async n=>{let{id:o=`bandizip`,language:s=`en`}=n.req.param(),c=Number.parseInt(n.req.query(`limit`)??`500`,10),l=new Set(i.map(e=>e.value));if(!l.has(o))throw Error(`Invalid id: ${o}. Allowed values are: ${[...l].join(`, `)}`);let u=new Set(a.map(e=>e.value));if(!u.has(s))throw Error(`Invalid language: ${s}. Allowed values are: ${[...u].join(`, `)}`);let d=`https://${s}.bandisoft.com`,f=new URL(`${o}/history/`,d).href,p=r(await e(f)),m=p(`html`).attr(`lang`)??`en`,h=p(`meta[name="author"]`).attr(`content`),g=p(`div.row`).slice(0,c).toArray().map(e=>{let n=p(e),r=n.find(`div.cell1`).text(),i=n.find(`div.cell2`).text(),a=r,c=n.find(`ul.cell3`).html()??void 0,l=f,u=`bandisoft-${o}-${s}-${r}`,d=i;return{title:a,description:c,pubDate:i?t(i):void 0,link:l,author:h,guid:u,id:u,content:{html:c,text:c},updated:d?t(d):void 0,language:m}});return{title:p(`title`).text(),description:p(`meta[name="description"]`).attr(`content`),link:f,item:g,allowEmpty:!0,image:p(`img#logo_light`).attr(`src`),author:h,language:m,id:f}},s={path:`/history/:id?/:language?`,name:`History`,url:`www.bandisoft.com`,maintainers:[`nczitzk`],handler:o,example:`/bandisoft/history/bandizip`,parameters:{id:{description:"ID, `bandizip` by default",options:i},language:{description:"Language, `en` by default",options:a}},description:`::: tip
To subscribe to [Bandizip Version History](https://www.bandisoft.com/bandizip/history/), where the source URL is \`https://www.bandisoft.com/bandizip/history/\`, extract the certain parts from this URL to be used as parameters, resulting in the route as [\`/bandisoft/history/bandizip\`](https://rsshub.app/bandisoft/history/bandizip).
:::

<details>
  <summary>More languages</summary>

| Language             | ID  |
| -------------------- | --- |
| English              | en  |
| 中文(简体)           | cn  |
| 中文(繁體)           | tw  |
| 日本語               | jp  |
| Русский              | ru  |
| Español              | es  |
| Français             | fr  |
| Deutsch              | de  |
| Italiano             | it  |
| Slovenčina           | sk  |
| Українська           | uk  |
| Беларуская           | be  |
| Dansk                | da  |
| Polski               | pl  |
| Português Brasileiro | br  |
| Čeština              | cs  |
| Nederlands           | nl  |
| Slovenščina          | sl  |
| Türkçe               | tr  |
| ภาษาไทย              | th  |
| Ελληνικά             | gr  |
| Oʻzbek               | uz  |
| Romanian             | ro  |
| 한국어               | kr  |

</details>
`,categories:[`program-update`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.bandisoft.com/:id/history`],target:e=>{let t=e.id;return`/bandisoft/history${t?`/${t}`:``}`}}],view:n.Articles,zh:{path:`/history/:id?/:language?`,name:`更新记录`,url:`www.bandisoft.com`,maintainers:[`nczitzk`],handler:o,example:`/bandisoft/history/bandizip`,parameters:{id:{description:"ID, 默认为 `bandizip`，可在对应产品页 URL 中找到",options:i},language:{description:"地区, 默认为 `en`",options:a}},description:`::: tip
若订阅 [Bandizip 更新记录](https://cn.bandisoft.com/bandizip/history/)，网址为 \`https://cn.bandisoft.com/bandizip/history/\`，请截取 \`cn\` 作为 \`category\` 参数填入，此时目标路由为 [\`/bandisoft/:language?/:id?\`](https://rsshub.app/bandisoft/:language?/:id?)。
:::

<details>
  <summary>更多语言</summary>

| Language             | ID  |
| -------------------- | --- |
| English              | en  |
| 中文(简体)           | cn  |
| 中文(繁體)           | tw  |
| 日本語               | jp  |
| Русский              | ru  |
| Español              | es  |
| Français             | fr  |
| Deutsch              | de  |
| Italiano             | it  |
| Slovenčina           | sk  |
| Українська           | uk  |
| Беларуская           | be  |
| Dansk                | da  |
| Polski               | pl  |
| Português Brasileiro | br  |
| Čeština              | cs  |
| Nederlands           | nl  |
| Slovenščina          | sl  |
| Türkçe               | tr  |
| ภาษาไทย              | th  |
| Ελληνικά             | gr  |
| Oʻzbek               | uz  |
| Romanian             | ro  |
| 한국어               | kr  |

</details>
`}};export{o as handler,s as route};