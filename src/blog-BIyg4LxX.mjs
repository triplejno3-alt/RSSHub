import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./types-Bl_lnefZ.mjs";import{Fragment as i,jsx as a,jsxs as o}from"hono/jsx/jsx-runtime";import{load as s}from"cheerio";import{renderToString as c}from"hono/jsx/dom/server";import{raw as l}from"hono/html";const u=({images:e,intro:t,description:n})=>c(o(i,{children:[e?.map(e=>e?.src?a(`figure`,{children:a(`img`,{src:e.src,alt:e.alt})}):null),t?a(`blockquote`,{children:t}):null,n?l(n):null]})),d=async r=>{let{lang:i=`en`}=r.req.param(),a=Number.parseInt(r.req.query(`limit`)??`30`,10),o=`https://www.deepl.com`,c=new URL(`${i}/blog`,o).href,l=s(await e(c)),d=l(`html`).attr(`lang`)??i,f=[];return f=l(`h4, h6`).slice(0,a).toArray().map(e=>{let t=l(e).parent().parent(),r=t.find(`h4, h6`).text(),i=t.find(`img`).attr(`src`),a=u({images:i?[{src:i,alt:r}]:void 0,intro:t.find(`p`).text()}),s=t.find(`time`).attr(`datetime`),c=t.attr(`href`),f=t.find(`span.me-6 span`).last().text().split(/,\s/).map(e=>({name:e,url:void 0,avatar:void 0})),p=s;return{title:r,description:a,pubDate:s?n(s):void 0,link:c?new URL(c,o).href:void 0,author:f,content:{html:a,text:a},image:i,banner:i,updated:p?n(p):void 0,language:d}}),f=await Promise.all(f.map(r=>r.link?t.tryGet(r.link,async()=>{let t=s(await e(r.link)),i=t(`h1[data-contentful-field-id="title"]`).text(),a=r.description+u({description:t(`div.my-redesign-3`).html()}),o=t(`time`).first().attr(`datetime`),c=t(`span[data-contentful-field-id="author"] span`).last().text().split(/,\s/).map(e=>({name:e,url:void 0,avatar:void 0})),l=t(`meta[property="og:image"]`).attr(`content`)??t(`picture[data-contentful-field-id="image"] img`).attr(`src`),f=o,p={title:i,description:a,pubDate:o?n(o):r.pubDate,author:c,content:{html:a,text:a},image:l,banner:l,updated:f?n(f):r.updated,language:d};return{...r,...p}}):r)),{title:l(`title`).text(),description:l(`meta[property="og:description"]`).attr(`content`),link:c,item:f,allowEmpty:!0,image:l(`meta[property="og:image"]`).attr(`content`),language:d,id:l(`meta[property="og:url"]`).attr(`content`)}},f=[{label:`Deutsch`,value:`de`},{label:`English`,value:`en`},{label:`Español`,value:`es`},{label:`日本語`,value:`ja`},{label:`Français`,value:`fr`},{label:`Italiano`,value:`it`},{label:`Bahasa Indonesia`,value:`id`},{label:`한국어`,value:`ko`},{label:`Nederlands`,value:`nl`},{label:`Čeština`,value:`cs`},{label:`Svenska`,value:`sv`},{label:`Polski`,value:`pl`},{label:`Português (Brasil)`,value:`pt-BR`},{label:`Português`,value:`pt-PT`},{label:`Türkçe`,value:`tr`},{label:`Русский`,value:`ru`},{label:`简体中文`,value:`zh`},{label:`Українська`,value:`uk`},{label:`العربية`,value:`ar`}],p={path:`/blog/:lang?`,name:`Blog`,url:`www.deepl.com`,maintainers:[`nczitzk`],handler:d,example:`/deepl/blog/en`,parameters:{lang:{description:"Language, `en` as English by default",options:f}},description:`::: tip
To subscribe to [Blog](https://www.deepl.com/en/blog), where the source URL is \`https://www.deepl.com/en/blog\`, extract the certain parts from this URL to be used as parameters, resulting in the route as [\`/deepl/blog/en\`](https://rsshub.app/deepl/blog/en).
:::

<details>
  <summary>More languages</summary>

| Language                                               | ID                                           |
| ------------------------------------------------------ | -------------------------------------------- |
| [Deutsch](https://www.deepl.com/de/blog)               | [de](https://rsshub.app/deepl/blog/de)       |
| [English](https://www.deepl.com/en/blog)               | [en](https://rsshub.app/deepl/blog/en)       |
| [Español](https://www.deepl.com/es/blog)               | [es](https://rsshub.app/deepl/blog/es)       |
| [日本語](https://www.deepl.com/ja/blog)                | [ja](https://rsshub.app/deepl/blog/ja)       |
| [Français](https://www.deepl.com/fr/blog)              | [fr](https://rsshub.app/deepl/blog/fr)       |
| [Italiano](https://www.deepl.com/it/blog)              | [it](https://rsshub.app/deepl/blog/it)       |
| [Bahasa Indonesia](https://www.deepl.com/id/blog)      | [id](https://rsshub.app/deepl/blog/id)       |
| [한국어](https://www.deepl.com/ko/blog)                | [ko](https://rsshub.app/deepl/blog/ko)       |
| [Nederlands](https://www.deepl.com/nl/blog)            | [nl](https://rsshub.app/deepl/blog/nl)       |
| [Čeština](https://www.deepl.com/cs/blog)               | [cs](https://rsshub.app/deepl/blog/cs)       |
| [Svenska](https://www.deepl.com/sv/blog)               | [sv](https://rsshub.app/deepl/blog/sv)       |
| [Polski](https://www.deepl.com/pl/blog)                | [pl](https://rsshub.app/deepl/blog/pl)       |
| [Português (Brasil)](https://www.deepl.com/pt-BR/blog) | [pt-BR](https://rsshub.app/deepl/blog/pt-BR) |
| [Português](https://www.deepl.com/pt-PT/blog)          | [pt-PT](https://rsshub.app/deepl/blog/pt-PT) |
| [Türkçe](https://www.deepl.com/tr/blog)                | [tr](https://rsshub.app/deepl/blog/tr)       |
| [Русский](https://www.deepl.com/ru/blog)               | [ru](https://rsshub.app/deepl/blog/ru)       |
| [简体中文](https://www.deepl.com/zh/blog)              | [zh](https://rsshub.app/deepl/blog/zh)       |
| [Українська](https://www.deepl.com/uk/blog)            | [uk](https://rsshub.app/deepl/blog/uk)       |
| [العربية](https://www.deepl.com/ar/blog)               | [ar](https://rsshub.app/deepl/blog/ar)       |

</details>
`,categories:[`new-media`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.deepl.com/:lang/blog`],target:e=>{let t=e.lang;return`/deepl/blog${t?`/${t}`:``}`}},{title:`Deutsch`,source:[`www.deepl.com/de/blog`],target:`/blog/de`},{title:`English`,source:[`www.deepl.com/en/blog`],target:`/blog/en`},{title:`Español`,source:[`www.deepl.com/es/blog`],target:`/blog/es`},{title:`日本語`,source:[`www.deepl.com/ja/blog`],target:`/blog/ja`},{title:`Français`,source:[`www.deepl.com/fr/blog`],target:`/blog/fr`},{title:`Italiano`,source:[`www.deepl.com/it/blog`],target:`/blog/it`},{title:`Bahasa Indonesia`,source:[`www.deepl.com/id/blog`],target:`/blog/id`},{title:`한국어`,source:[`www.deepl.com/ko/blog`],target:`/blog/ko`},{title:`Nederlands`,source:[`www.deepl.com/nl/blog`],target:`/blog/nl`},{title:`Čeština`,source:[`www.deepl.com/cs/blog`],target:`/blog/cs`},{title:`Svenska`,source:[`www.deepl.com/sv/blog`],target:`/blog/sv`},{title:`Polski`,source:[`www.deepl.com/pl/blog`],target:`/blog/pl`},{title:`Português (Brasil)`,source:[`www.deepl.com/pt-BR/blog`],target:`/blog/pt-BR`},{title:`Português`,source:[`www.deepl.com/pt-PT/blog`],target:`/blog/pt-PT`},{title:`Türkçe`,source:[`www.deepl.com/tr/blog`],target:`/blog/tr`},{title:`Русский`,source:[`www.deepl.com/ru/blog`],target:`/blog/ru`},{title:`简体中文`,source:[`www.deepl.com/zh/blog`],target:`/blog/zh`},{title:`Українська`,source:[`www.deepl.com/uk/blog`],target:`/blog/uk`},{title:`العربية`,source:[`www.deepl.com/ar/blog`],target:`/blog/ar`}],view:r.Articles,zh:{path:`/blog/:lang?`,name:`博客`,url:`www.deepl.com`,maintainers:[`nczitzk`],handler:d,example:`/deepl/blog/en`,parameters:{lang:{description:"语言，默认为 `en`，可在对应语言页 URL 中找到",options:f}},description:`::: tip
若订阅 [博客](https://www.deepl.com/zh/blog)，网址为 \`https://www.deepl.com/zh/blog\`，请截取 \`https://www.deepl.com/\` 到末尾 \`/blog\` 的部分 \`zh\` 作为 \`lang\` 参数填入，此时目标路由为 [\`/deepl/blog/zh\`](https://rsshub.app/deepl/blog/zh)。

:::

<details>
  <summary>更多语言</summary>

| Language                                               | ID                                           |
| ------------------------------------------------------ | -------------------------------------------- |
| [Deutsch](https://www.deepl.com/de/blog)               | [de](https://rsshub.app/deepl/blog/de)       |
| [English](https://www.deepl.com/en/blog)               | [en](https://rsshub.app/deepl/blog/en)       |
| [Español](https://www.deepl.com/es/blog)               | [es](https://rsshub.app/deepl/blog/es)       |
| [日本語](https://www.deepl.com/ja/blog)                | [ja](https://rsshub.app/deepl/blog/ja)       |
| [Français](https://www.deepl.com/fr/blog)              | [fr](https://rsshub.app/deepl/blog/fr)       |
| [Italiano](https://www.deepl.com/it/blog)              | [it](https://rsshub.app/deepl/blog/it)       |
| [Bahasa Indonesia](https://www.deepl.com/id/blog)      | [id](https://rsshub.app/deepl/blog/id)       |
| [한국어](https://www.deepl.com/ko/blog)                | [ko](https://rsshub.app/deepl/blog/ko)       |
| [Nederlands](https://www.deepl.com/nl/blog)            | [nl](https://rsshub.app/deepl/blog/nl)       |
| [Čeština](https://www.deepl.com/cs/blog)               | [cs](https://rsshub.app/deepl/blog/cs)       |
| [Svenska](https://www.deepl.com/sv/blog)               | [sv](https://rsshub.app/deepl/blog/sv)       |
| [Polski](https://www.deepl.com/pl/blog)                | [pl](https://rsshub.app/deepl/blog/pl)       |
| [Português (Brasil)](https://www.deepl.com/pt-BR/blog) | [pt-BR](https://rsshub.app/deepl/blog/pt-BR) |
| [Português](https://www.deepl.com/pt-PT/blog)          | [pt-PT](https://rsshub.app/deepl/blog/pt-PT) |
| [Türkçe](https://www.deepl.com/tr/blog)                | [tr](https://rsshub.app/deepl/blog/tr)       |
| [Русский](https://www.deepl.com/ru/blog)               | [ru](https://rsshub.app/deepl/blog/ru)       |
| [简体中文](https://www.deepl.com/zh/blog)              | [zh](https://rsshub.app/deepl/blog/zh)       |
| [Українська](https://www.deepl.com/uk/blog)            | [uk](https://rsshub.app/deepl/blog/uk)       |
| [العربية](https://www.deepl.com/ar/blog)               | [ar](https://rsshub.app/deepl/blog/ar)       |

</details>
`}};export{d as handler,p as route};