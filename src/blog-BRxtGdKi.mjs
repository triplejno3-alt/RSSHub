import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{load as i}from"cheerio";import a from"iconv-lite";const o={path:`/blog/:type?/:time?/:sort?`,categories:[`new-media`],example:`/sciencenet/blog`,parameters:{type:`类型，见下表，默认为推荐`,time:`时间，见下表，默认为所有时间`,sort:`排序，见下表，默认为按发表时间排序`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`精选博客`,maintainers:[`nczitzk`],handler:s,description:`类型

| 精选      | 最新 | 热门 |
| --------- | ---- | ---- |
| recommend | new  | hot  |

  时间

| 36 小时内精选博文 | 一周内精选博文 | 一月内精选博文 | 半年内精选博文 | 所有时间精选博文 |
| ----------------- | -------------- | -------------- | -------------- | ---------------- |
| 1                 | 2              | 3              | 4              | 5                |

  排序

| 按发表时间排序 | 按评论数排序 | 按点击数排序 |
| -------------- | ------------ | ------------ |
| 1              | 2            | 3            |`};async function s(o){let s=o.req.param(`type`)??`recommend`,c=o.req.param(`time`)??`5`,l=o.req.param(`sort`)??`1`,u=`http://blog.sciencenet.cn`,d=`${u}/blog.php?mod=${s}&type=list&op=${c}&ord=${l}`,f=await n({method:`get`,url:d,responseType:`buffer`}),p=i(a.decode(f.data,`gbk`)),m=p(`tr td a[title]`).slice(0,o.req.query(`limit`)?Number.parseInt(o.req.query(`limit`)):50).toArray().map(e=>(e=p(e),{title:e.text(),link:`${u}/${e.attr(`href`)}`,pubDate:new Date(e.next().text()).toUTCString()}));return m=await Promise.all(m.map(o=>e.tryGet(o.link,async()=>{let e=await n({method:`get`,url:o.link,responseType:`buffer`}),s=i(a.decode(e.data,`gbk`));return o.author=s(`.xs2`).text(),o.description=s(`#blog_article`).html(),o.pubDate=r(t(s(`.xg1`).eq(5).text()),8),o}))),{title:`科学网 - 精选博文`,link:d,item:m}}export{o as route};