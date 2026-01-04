import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import"./parse-date-DjdQS_Nt.mjs";import"./got-CKQ7C9HX.mjs";import{t as e}from"./types-Bl_lnefZ.mjs";import{n as t,r as n,t as r}from"./utils-A_J9u13o.mjs";import i from"p-map";const a={"/":`News`,bpol:`Politics`,bbiz:`Business`,markets:`Markets`,technology:`Technology`,green:`Green`,wealth:`Wealth`,pursuits:`Pursuits`,bview:`Opinion`,equality:`Equality`,businessweek:`Businessweek`,citylab:`CityLab`},o={path:`/:site?`,categories:[`finance`],view:e.Articles,example:`/bloomberg/bbiz`,parameters:{site:{description:`Site ID, can be found below`,options:Object.keys(a).map(e=>({value:e,label:a[e]}))}},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Bloomberg Site`,maintainers:[`bigfei`],description:`
| Site ID      | Title        |
| ------------ | ------------ |
| /            | News         |
| bpol         | Politics     |
| bbiz         | Business     |
| markets      | Markets      |
| technology   | Technology   |
| green        | Green        |
| wealth       | Wealth       |
| pursuits     | Pursuits     |
| bview        | Opinion      |
| equality     | Equality     |
| businessweek | Businessweek |
| citylab      | CityLab      |
  `,handler:s};async function s(e){let o=e.req.param(`site`),s=o?`${n}/${o}/sitemap_news.xml`:`${n}/sitemap_news.xml`,c=await i(await t(s,e),e=>r(e),{concurrency:1});return{title:`Bloomberg - ${a[o??`/`]}`,link:s,item:c}}export{o as route};