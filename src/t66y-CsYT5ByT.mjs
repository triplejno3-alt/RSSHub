import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{n as r,t as i}from"./utils-DSad8yzx.mjs";import*as a from"cheerio";const o={path:`/:id/:type?/:search?`,categories:[`multimedia`],example:`/t66y/20/2`,parameters:{id:`分区 id, 可在分区页 URL 中找到`,type:`类型 id, 可在分区类型过滤后的 URL 中找到`,search:"主题类型筛选，可在分区主题类型筛选后的 URL 中找到，默认为 `today`"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1,nsfw:!0},name:`分区帖子`,maintainers:[`zhboner`],handler:l,description:`> 注意：并非所有的分区都有子类型，可以参考成人文学交流区的 \`古典武侠\` 这一子类型。

| 亚洲无码原创区 | 亚洲有码原创区 | 欧美原创区 | 动漫原创区 | 国产原创区 |
| -------------- | -------------- | ---------- | ---------- | ---------- |
| 2              | 15             | 4          | 5          | 25         |

| 中字原创区 | 转帖交流区 | HTTP 下载区 | 在线成人区 |
| ---------- | ---------- | ----------- | ---------- |
| 26         | 27         | 21          | 22         |

| 技术讨论区 | 新时代的我们 | 达盖尔的旗帜 | 成人文学交流 |
| ---------- | ------------ | ------------ | ------------ |
| 7          | 8            | 16           | 20           |

  **主题过滤**

  > 因为该类型无法搭配子类型使用，所以使用时 \`type\` 子类型需使用 \`-999\` 占位

| 今日主题 | 热门主题 | 精华主题 | 原创主题 | 今日新作  |
| ------- | ------- | ------- | ------- | ------ |
| today   | hot     | digest  | 1       | 2      |`},s={today:`今日主题`,hot:`热门主题`,digest:`精华主题`,1:`原创主题`,2:`今日新作`},c=`today`;async function l(o){let l=o.req.param(`id`),u=(Number.parseInt(o.req.param(`type`))||-999).toString(),d=u!==`-999`,f=d?c:o.req.param(`search`)??c,p=new URL(`thread0806.php?fid=${l}&search=${f}`,i);d&&p.searchParams.set(`type`,u);let{data:m}=await n(p),h=a.load(m),g=h(`#ajaxtable > tbody:nth-child(2) .tr3`).not(`.tr2.tac`).toArray().map(e=>{let n=h(e),r=n.find(`.tal`),a=r.contents().filter((e,t)=>t.type===`text`).text().trim(),o=r.find(`h3 a`),s=n.find(`td:nth-child(3)`);return{title:`${a} ${o.text()}`,link:`${i}/${o.attr(`href`)}`,author:s.find(`a`).text(),pubDate:t(String(s.find(`span[data-timestamp]`).data(`timestamp`)).slice(0,-1),`X`)}}),_=await Promise.all(g.map(t=>e.tryGet(t.link,async()=>{let{data:e}=await n(t.link);return t.description=r(e),t})));return{title:(d?`[${h(`.t .fn b`).text()}] `:``)+(f?`[${s[f]}] `:``)+h(`head title`).text(),link:p.href,item:_,allowEmpty:!0}}export{o as route};