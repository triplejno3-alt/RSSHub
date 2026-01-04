import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{load as i}from"cheerio";const a=`https://www.cast.org.cn`;async function o(o){return await Promise.all(i(o)(`li`).toArray().map(o=>{let s=i(o)(`a`),c=s.attr(`href`);return c?.startsWith(`http`)?{title:s.text(),link:s.attr(`href`)}:(c=`${a}${s.attr(`href`)}`,e.tryGet(c,async()=>{let e=i((await n.get(c)).data),a=r(t(e(`meta[name=PubDate]`).attr(`content`),`YYYY-MM-DD HH:mm`),8);return{title:s.text(),pubDate:a,description:e(`#zoom`).html(),link:c}}))}))}const s={path:`/:column/:subColumn/:category?`,categories:[`government`],example:`/cast/xw/tzgg/ZH`,parameters:{column:`栏目编号，见下表`,subColumn:`二级栏目编号`,category:`分类`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`cast.org.cn/:column/:subColumn/:category/index.html`,`cast.org.cn/:column/:subColumn/index.html`],target:`/:column/:subColumn/:category?`}],name:`通用`,maintainers:[`KarasuShin`,`TonyRL`],handler:c,description:`::: tip
  在路由末尾处加上 \`?limit=限制获取数目\` 来限制获取条目数量，默认值为\`10\`
:::

| 分类     | 编码 |
| -------- | ---- |
| 全景科协 | qjkx |
| 智库     | zk   |
| 学术     | xs   |
| 科普     | kp   |
| 党建     | dj   |
| 数据     | sj   |
| 新闻     | xw   |`};async function c(e){let{column:t,subColumn:r,category:s}=e.req.param(),{limit:c=10}=e.req.query(),l=`${a}/${t}/${r}`;s&&(l+=`/${s}/index.html`);let{data:u}=await n.get(l),d=i(u),f=[];if(t===`xw`&&r===`SP`&&!s)f=await o(u);else{let e=d(`script[parseType="bulidstatic"]`),t=`${a}${e.attr(`url`)}`,r=JSON.parse(e.attr(`querydata`)?.replaceAll(`'`,`"`)??`{}`);r.paramJson=`{"pageNo":1,"pageSize":${c}}`;let{data:i}=await n.get(t,{searchParams:new URLSearchParams(r)});f=await o(i.data.html)}return{title:d(`head title`).text(),link:l,image:`https://www.cast.org.cn/favicon.ico`,item:f}}export{s as route};