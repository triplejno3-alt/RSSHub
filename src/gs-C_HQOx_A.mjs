import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{t as i}from"./wechat-mp-HNgcLN2K.mjs";import{load as a}from"cheerio";const o={path:`/gs/:type/:num?`,categories:[`university`],example:`/sjtu/gs/enroll/59`,parameters:{type:`类别`,num:"细分类别, 仅对`type`为`enroll`或`exchange`有效"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`gs.sjtu.edu.cn/announcement/:type`],target:`/gs/:type`}],name:`研究生通知公告`,maintainers:[`dzx-dzx`],handler:s,description:`| 工作信息 | 招生信息 | 培养信息 | 学位学科 | 国际交流 | 创新工程 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| work     | enroll   | train    | degree   | exchange | xsjy     |

  当\`type\`为\`enroll\`, \`num\`可选字段:

| 58       | 59       | 60         | 61       | 62       |
| -------- | -------- | ---------- | -------- | -------- |
| 博士招生 | 硕士招生 | 港澳台招生 | 考点信息 | 院系动态 |

  当\`type\`为\`exchange\`, \`num\`可选字段:

| 67             | 68             | 69             | 70             | 71             |
| -------------- | -------------- | -------------- | -------------- | -------------- |
| 国家公派研究生 | 国际化培养资助 | 校际交换与联培 | 交流与合作项目 | 项目招募与宣讲 |`};async function s(o){let s=o.req.param(`type`),c=o.req.param(`num`)??``,l=`https://www.gs.sjtu.edu.cn`,u=`${l}/announcement/${s}/${c}`,d=a((await n({method:`get`,url:u})).data),f=d(`a.announcement-item`).toArray().map(e=>{e=d(e);let n=e.find(`.day`).text().trim().replace(`.`,`-`),i=e.find(`.month`).text().trim();return{title:e.find(`.title`).text().trim(),link:`${e.attr(`href`).startsWith(`http`)?``:l}${e.attr(`href`)}`,pubDate:r(t(`${i}-${n}`,`YYYY-MM-DD`),8)}}),p=await Promise.all(f.map(t=>e.tryGet(t.link,async()=>(new URL(t.link).hostname===`mp.weixin.qq.com`?t.description=(await i(t.link)).description:t.description=a((await n({method:`get`,url:t.link})).data)(`.page-content`).html(),t))));return{title:`${c===``?``:`${d(`.category-nav-block .active`).text().trim()} - `}${d(`div.inner-banner-text .title`).text().trim()} - ${d(`title`).text()}`,link:u,item:p}}export{o as route};