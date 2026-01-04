import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import"./parse-date-DjdQS_Nt.mjs";import"./got-CKQ7C9HX.mjs";import{i as t,n,r,t as i}from"./utils-CLboz49Y.mjs";const a={257:`留学申请`,379:`世界公民`,400:`投资理财`,31:`生活干货`,345:`职场达人`,391:`人际关系`,38:`海外求职`,265:`签证移民`},o={path:`/section/:id?/:type?/:order?`,categories:[`bbs`],example:`/1point3acres/section/345`,parameters:{id:`分区 id，见下表，默认为全部`,type:`帖子分类, 见下表，默认为 hot，即热门帖子`,order:`排序方式，见下表，默认为空，即最新回复`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`instant.1point3acres.com/section/:id`,`instant.1point3acres.com/`]}],name:`分区`,maintainers:[`nczitzk`],handler:s,description:`分区

| 分区     | id  |
| -------- | --- |
| 留学申请 | 257 |
| 世界公民 | 379 |
| 投资理财 | 400 |
| 生活干货 | 31  |
| 职场达人 | 345 |
| 人际关系 | 391 |
| 海外求职 | 38  |
| 签证移民 | 265 |

  分类

| 热门帖子 | 最新帖子 |
| -------- | -------- |
| hot      | new      |

  排序方式

| 最新回复 | 最新发布 |
| -------- | -------- |
|          | post     |`};async function s(o){let s=o.req.param(`id`)??``,c=o.req.param(`type`)??`hot`,l=o.req.param(`order`)??``,u=o.req.query(`limit`)?Number.parseInt(o.req.query(`limit`)):10,d=`${r}${s?Number.isNaN(s)?`/category/${s}`:`/section/${s}`:``}`,f=`${n}/api${s?Number.isNaN(s)?`/tags/${s}/`:`/forums/${s}/`:``}threads?type=${c}&includes=tags,forum_name,summary&ps=${u}&pg=1&order=${l===``?``:`time_desc`}&is_groupid=1`;return{title:`一亩三分地 - ${Object.hasOwn(a,s)?a[s]:s}${t[c]}`,link:d,item:await i(e.tryGet,f,l)}}export{o as route};