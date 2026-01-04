import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{load as r}from"cheerio";const i={path:`/:category?`,categories:[`new-media`],example:`/tangshufang`,parameters:{category:`分类，见下表，默认为首页`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`tangshufang.com/:category`,`tangshufang.com/`]}],name:`分类`,maintainers:[`nczitzk`],handler:a,description:`| 首页 | 老唐实盘 | 书房拾遗 | 理念 & 估值 | 经典陪读 | 财务套利 |
| ---- | -------- | -------- | ----------- | -------- | -------- |
|      | shipan   | wenda    | linian      | peidu    | taoli    |

| 企业分析 | 白酒企业 | 腾讯控股 | 分众传媒 | 海康威视 | 其他企业 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| qiye     | baijiu   | tengxun  | fenzhong | haikang  | qita     |

| 核心五篇 | 读者投稿 | 读书随笔 | 财报浅析 | 出行游记 | 巴芒连载 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| hexin    | tougao   | suibi    | caibao   | youji    | bamang   |`};async function a(i){let a=i.req.param(`category`)??``,o=i.req.query(`limit`)?Number.parseInt(i.req.query(`limit`)):10,s=`https://www.tangshufang.com${a?`/${a}`:``}`,c=r((await n({method:`get`,url:s})).data),l=c(`article`).slice(0,o).toArray().map(e=>{e=c(e);let n=e.find(`h2 a`);return{title:n.text(),link:n.attr(`href`),pubDate:t(e.find(`time`).text())}});return l=await Promise.all(l.map(t=>e.tryGet(t.link,async()=>{let e=r((await n({method:`get`,url:t.link})).data);return t.description=e(`.wxsyncmain`).html(),t.category=e(`a[rel="category tag"]`).toArray().map(t=>e(t).text()),t}))),{title:c(`title`).text(),link:s,item:l}}export{i as route};