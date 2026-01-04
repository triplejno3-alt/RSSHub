import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{Fragment as n,jsx as r,jsxs as i}from"hono/jsx/jsx-runtime";import{renderToString as a}from"hono/jsx/dom/server";const o={path:`/:column`,categories:[`multimedia`],example:`/cntv/TOPC1451528971114112`,parameters:{column:`栏目ID, 可在对应CNTV栏目页面找到`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`navi.cctv.com/`]}],name:`栏目`,maintainers:[`WhoIsSure`,`Fatpandac`],handler:s,url:`navi.cctv.com/`,description:`::: tip
栏目 ID 查找示例:
打开栏目具体某一期页面，F12 控制台输入\`column_id\`得到栏目 ID。
:::

  栏目

| 新闻联播             | 新闻周刊             | 天下足球             |
| -------------------- | -------------------- | -------------------- |
| TOPC1451528971114112 | TOPC1451559180488841 | TOPC1451551777876756 |`};async function s(o){let s=(await t({method:`get`,url:`https://api.cntv.cn/NewVideo/getVideoListByColumn?id=${o.req.param(`column`)}&n=${Number.isNaN(Number.parseInt(o.req.query(`limit`)))?25:Number.parseInt(o.req.query(`limit`))}&sort=desc&p=1&mode=0&serviceId=tvcctv`})).data.data.list,c=s[0].title.match(/《(.*?)》/)[1];return{title:`CNTV 栏目 - ${c}`,description:`${c} 栏目的视频更新`,item:s.map(t=>({title:t.title,description:a(i(n,{children:[r(`p`,{children:t.brief}),i(`p`,{children:[`时长：`,t.length]}),r(`p`,{children:r(`img`,{src:t.image})}),r(`p`,{children:r(`a`,{href:t.url,children:`在线观看`})})]})),pubDate:e(t.time),link:t.url}))}}export{o as route};