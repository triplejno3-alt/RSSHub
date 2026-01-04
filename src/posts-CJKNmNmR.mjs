import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{n as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{load as n}from"cheerio";const r={path:`/posts/:cid/:sort?`,categories:[`programming`],example:`/learnblockchain/posts/DApp/newest`,parameters:{cid:`分类id,更多分类可以论坛的URL找到`,sort:`排序方式，默认精选`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`文章`,maintainers:[`running-grass`],handler:i,description:`| id       | 分类         |
| -------- | ------------ |
| all      | 全部         |
| DApp     | 去中心化应用 |
| chains   | 公链         |
| 联盟链   | 联盟链       |
| scaling  | Layer2       |
| langs    | 编程语言     |
| security | 安全         |
| dst      | 存储         |
| basic    | 理论研究     |
| other    | 其他         |

| id       | 排序方式    |
| -------- | ----------- |
| newest   | 最新        |
| featured | 精选 (默认) |
| featured | 最赞        |
| hottest  | 最热        |`};async function i(r){let i=r.req.param(`cid`)||`all`,a=r.req.param(`sort`),o=`https://learnblockchain.cn/categories/`;o+=i+`/`,a&&(o+=a+`/`);let s=(await t(o)).data,c=n(s),l=c(`div.stream-list section.stream-list-item`);return{title:`登链社区--${i}`,link:o,description:`登链社区`,item:l.toArray().map(t=>{let n=c(t);return{title:n.find(`h2.title`).text().trim(),description:n.find(`div.excerpt`).text().trim(),pubDate:e(n.find(`.author li:nth-child(2)`).text().replace(`发布于`,``).trim()),link:n.find(`h2.title a`).attr(`href`).trim(),author:n.find(`.author li:nth-child(1)`).text().trim()}})}}export{r as route};