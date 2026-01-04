import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{load as i}from"cheerio";const a={path:`/lm/:id?`,categories:[`traditional-media`],example:`/cctv/lm/xwzk`,parameters:{id:"栏目 id，可在对应栏目页 URL 中找到，默认为 `xwzk` 即 新闻周刊"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`news.cctv.com/:category`],target:`/:category`}],name:`栏目`,maintainers:[`nczitzk`],handler:o,description:`| 焦点访谈 | 等着我 | 今日说法 | 开讲啦 |
| -------- | ------ | -------- | ------ |
| jdft     | dzw    | jrsf     | kjl    |

| 正大综艺 | 经济半小时 | 第一动画乐园 |
| -------- | ---------- | ------------ |
| zdzy     | jjbxs      | dydhly       |

::: tip
  更多栏目请看 [这里](https://tv.cctv.com/lm)
:::`};async function o(a){let o=`https://tv.cctv.com/lm/${a.req.param(`id`)??`xwzk`}/videoset`,s=await n({method:`get`,url:o}),c=i(s.data),l=(await n({method:`get`,url:`https://api.cntv.cn/NewVideo/getVideoListByColumn?id=${s.data.match(/(TOPC\d{16})/)[1]}&n=20&sort=desc&p=1&mode=0&serviceId=tvcctv`})).data.data.list.map(e=>({url:e.url,guid:e.guid,image:e.image,title:e.title,pubDate:r(t(e.time),8),link:`https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid=${e.guid}`,description:`<p>${e.brief.replaceAll(`\r
`,`</p><p>`)}</p>`})),u=await Promise.all(l.map(t=>e.tryGet(t.link,async()=>{let e=(await n({method:`get`,url:t.link})).data;t.description+=`<video src="${e.hls_url}" controls="controls" poster="${t.image}" width="100%"></video><br>`;for(let n of e.video.chapters)t.description+=`<video src="${n.url}" controls="controls" poster="${n.image}" width="100%"></video><br>`;for(let n=2;e.video[`chapters${n}`];n++)for(let r of e.video[`chapters${n}`])t.description+=`<video src="${r.url}" controls="controls" poster="${r.image}" width="100%"></video><br>`;return t.link=t.url,delete t.url,delete t.image,t})));return{title:c(`title`).text(),link:o,item:u,description:c(`meta[name=description]`).attr(`content`)}}export{a as route};