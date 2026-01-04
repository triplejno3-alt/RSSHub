import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{Fragment as i,jsx as a}from"hono/jsx/jsx-runtime";import{renderToString as o}from"hono/jsx/dom/server";const s={path:[`/column/:id?`,`/:id?`],categories:[`traditional-media`],example:`/cankaoxiaoxi/column/diyi`,parameters:{id:"栏目 id，默认为 `diyi`，即第一关注"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`栏目`,maintainers:[`yuxinliu-alex`,`nczitzk`],handler:c,description:`| 栏目           | id       |
| -------------- | -------- |
| 第一关注       | diyi     |
| 中国           | zhongguo |
| 国际           | gj       |
| 观点           | guandian |
| 锐参考         | ruick    |
| 体育健康       | tiyujk   |
| 科技应用       | kejiyy   |
| 文化旅游       | wenhualy |
| 参考漫谈       | cankaomt |
| 研究动态       | yjdt     |
| 海外智库       | hwzk     |
| 业界信息・观点 | yjxx     |
| 海外看中国城市 | hwkzgcs  |
| 译名趣谈       | ymymqt   |
| 译名发布       | ymymfb   |
| 双语汇         | ymsyh    |
| 参考视频       | video    |
| 军事           | junshi   |
| 参考人物       | cankaorw |`};async function c(i){let a=i.req.param(`id`)??`diyi`,o=i.req.query(`limit`)?Number.parseInt(i.req.query(`limit`)):50,s=`https://china.cankaoxiaoxi.com`,c=`${s}/json/channel/${a}/list.json`,u=`${s}/json/channel/${a}.channeljson`,d=`${s}/#/generalColumns/${a}`,f=await n({method:`get`,url:c}),p=await n({method:`get`,url:u}),m=f.data.list.slice(0,o).map(e=>({title:e.data.title,author:e.data.userName,category:e.data.channelName,pubDate:r(t(e.data.publishTime),8),link:e.data.moVideoPath?e.data.sourceUrl:`${s}/json/content/${e.data.url.match(/\/pages\/(.*?)\.html/)[1]}.detailjson`,video:e.data.moVideoPath,cover:e.data.mCoverImg}));return m=await Promise.all(m.map(t=>e.tryGet(t.link,async()=>{if(t.video)t.description=l(t.video,t.cover);else{let e=(await n({method:`get`,url:t.link})).data;t.link=`${s}/#/detailsPage/${a}/${e.id}/1/${e.publishTime.split(` `)[0]}`,t.description=e.txt}return t}))),{title:`参考消息 - ${p.data.name}`,link:d,description:`参考消息`,language:`zh-cn`,item:m}}const l=(e,t)=>o(a(i,{children:e?a(`video`,{controls:!0,poster:t,children:a(`source`,{src:e,type:`video/mp4`})}):null}));export{s as route};