import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{Fragment as i,jsx as a,jsxs as o}from"hono/jsx/jsx-runtime";import{load as s}from"cheerio";import{renderToString as c}from"hono/jsx/dom/server";const l=({image:e,video:t,digest:n})=>c(o(i,{children:[e?a(`img`,{src:e}):null,t?a(`video`,{controls:!0,children:a(`source`,{src:t,type:`video/mp4`})}):null,n?a(`p`,{children:n}):null]})),u={"":{id:`BAI5E21O`,title:`首页`},qsyk:{id:`BD21K0DL`,title:`轻松一刻`},cz:{id:`CICMICLU`,title:`槽值`},rj:{id:`CICMOMBL`,title:`人间`},dgxm:{id:`CICMPVC5`,title:`大国小民`},ssyg:{id:`CICMLCOU`,title:`三三有梗`},sd:{id:`D551V75C`,title:`数读`},kk:{id:`D55253RH`,title:`看客`},xhx:{id:`D553A53L`,title:`下划线`},txs:{id:`D553PGHQ`,title:`谈心社`},dd:{id:`CICMS5BI`,title:`哒哒`},pbgl:{id:`CQ9UDVKO`,title:`胖编怪聊`},qyd:{id:`CQ9UJIJN`,title:`曲一刀`},jrzs:{id:`BD284UM8`,title:`今日之声`},lc:{id:`CICMMGBH`,title:`浪潮`},fd:{id:`D5543R68`,title:`沸点`}},d={path:`/exclusive/:id?`,categories:[`new-media`],example:`/163/exclusive/qsyk`,parameters:{id:`栏目, 默认为首页`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`3g.163.com/touch/exclusive/sub/:id`]}],name:`栏目`,maintainers:[`nczitzk`],handler:f,description:`| 分类     | 编号 |
| -------- | ---- |
| 首页     |      |
| 轻松一刻 | qsyk |
| 槽值     | cz   |
| 人间     | rj   |
| 大国小民 | dgxm |
| 三三有梗 | ssyg |
| 数读     | sd   |
| 看客     | kk   |
| 下划线   | xhx  |
| 谈心社   | txs  |
| 哒哒     | dd   |
| 胖编怪聊 | pbgl |
| 曲一刀   | qyd  |
| 今日之声 | jrzs |
| 浪潮     | lc   |
| 沸点     | fd   |`};async function f(i){let a=i.req.param(`id`)??``,o=`https://3g.163.com`,c=`${o}/touch/exclusive${a?`/sub/${a}`:``}`,d=await n({method:`get`,url:`${o}/touch/reconstruct/article/list/${u[a].id}wangning/0-20.html`}),f=JSON.parse(d.data.match(/^artiList\((.*)\)$/)[1])[`${u[a].id}wangning`].map(e=>({title:e.title,author:e.source,link:e.skipURL||e.url||`${o}/dy/article/${e.docid}.html`,pubDate:r(t(e.ptime),8),videoId:e.skipType===`video`?e.stitle:``}));return f=await Promise.all(f.map(t=>e.tryGet(t.link,async()=>{try{if(t.videoId){let e=await n({method:`get`,url:`${o}/touch/video/detail/jsonp/VIA8K0PTB.html?callback=videoList`}),r=JSON.parse(e.data.match(/^videoList\((.*)\)$/)[1])?.mp4_url;t.description=l({video:r})}else{let e=s((await n({method:`get`,url:t.link})).data);e(`.m-linkCard`).remove(),e(`.m-photo`).each(function(){e(this).html(l({image:e(this).find(`img`).attr(`data-src`)}))}),t.description=e(`.article-body`).html()}}catch{}return delete t.videoId,t}))),{title:`网易独家 - ${u[a].title}`,link:c,item:f}}export{d as route};