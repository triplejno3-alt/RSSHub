import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./got-CKQ7C9HX.mjs";import{jsx as t}from"hono/jsx/jsx-runtime";import{load as n}from"cheerio";import{renderToString as r}from"hono/jsx/dom/server";const i={path:`/:category?/:language?`,categories:[`study`],example:`/mindmeister/mind-map-examples`,parameters:{category:"Categories, see the table below, `mind-map-examples` by default",language:"Languages, see the table below, `en` by default"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Public Maps`,maintainers:[`TonyRL`],handler:a,description:`| Categories    | parameter         |
| ------------- | ----------------- |
| Featured Map  | mind-map-examples |
| Business      | business          |
| Design        | design            |
| Education     | education         |
| Entertainment | entertainment     |
| Life          | life              |
| Marketing     | marketing         |
| Productivity  | productivity      |
| Summaries     | summaries         |
| Technology    | technology        |
| Other         | other             |

| Languages  | parameter |
| ---------- | --------- |
| English    | en        |
| Deutsch    | de        |
| Français   | fr        |
| Español    | es        |
| Português  | pt        |
| Nederlands | nl        |
| Dansk      | da        |
| Русский    | ru        |
| 日本語     | ja        |
| Italiano   | it        |
| 简体中文   | zh        |
| 한국어     | ko        |
| Other      | other     |`};async function a(i){let{category:a=`mind-map-examples`,language:o=`en`}=i.req.param(),s=`https://www.mindmeister.com${o===`en`||o===`other`?``:`/${o}`}/${a===`mind-map-examples`?a:`mind-maps/${a}?language=${o}`}`,c=n((await e(s)).data),l=c(`#public-listing .map-tile-wrapper`).toArray().map(e=>{e=c(e);let n=new URL(e.find(`.map-wrapper`).attr(`style`).match(/url\('(.*)'\);/)[1]).href,i=e.find(`.title`).text();return{title:i,description:r(t(`img`,{src:n.split(`?`)[0],alt:i.trim()})),link:e.find(`.title`).attr(`href`),author:e.find(`.author`).text().trim().replace(/^by/,``),category:e.find(`.fw-bold`).text()}});return{title:c(`head title`).text(),description:c(`head meta[name=description]`).text(),link:s,item:l,language:o}}export{i as route};