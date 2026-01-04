import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{t as i}from"./invalid-parameter-DGZgOgO2.mjs";import{t as a}from"./valid-host-Bsy2BS2p.mjs";import{load as o}from"cheerio";import s from"iconv-lite";const c=function(e,t,n,r,i,a){let o=null;return n!==-1&&(o=new Date,o.setTime(o.getTime()+n)),[encodeURI(e),`=`,encodeURI(t),o?`; expires=`+o.toGMTString():``,r?`; path=`+r:`/`,i?`; domain=`+i:``,a?`; secure`:``].join(``)},l={path:`/:city?`,categories:[`bbs`],example:`/19lou/jiaxing`,parameters:{city:`分类，见下表，默认为 www，即杭州`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`头条`,maintainers:[`nczitzk`],handler:u,description:`| 杭州 | 台州    | 嘉兴    | 宁波   | 湖州   |
| ---- | ------- | ------- | ------ | ------ |
| www  | taizhou | jiaxing | ningbo | huzhou |

| 绍兴     | 湖州   | 温州    | 金华   | 舟山     |
| -------- | ------ | ------- | ------ | -------- |
| shaoxing | huzhou | wenzhou | jinhua | zhoushan |

| 衢州   | 丽水   | 义乌 | 萧山     | 余杭   |
| ------ | ------ | ---- | -------- | ------ |
| quzhou | lishui | yiwu | xiaoshan | yuhang |

| 临安  | 富阳   | 桐庐   | 建德   | 淳安   |
| ----- | ------ | ------ | ------ | ------ |
| linan | fuyang | tonglu | jiande | chunan |`};async function u(l){let u=l.req.param(`city`)??`www`;if(!a(u))throw new i(`Invalid city`);let d=`https://${u}.19lou.com`,f=await n({method:`get`,url:d,responseType:`buffer`}),p=o(s.decode(f.data,`gbk`));p(`.title-more`).remove();let m=p(`.center-center-jiazi`).find(`a[title]`).toArray().map(e=>(e=p(e),{title:e.attr(`title`),link:`https:${e.attr(`href`)}`}));return m=await Promise.all(m.map(i=>e.tryGet(i.link,async()=>{let e=await n({method:`get`,url:i.link,responseType:`buffer`,headers:{cookie:c(`_Z3nY0d4C_`,`37XgPK9h`,365,`/`,`19lou.com`),referer:d}}),a=o(s.decode(e.data,`gbk`));return a(`.name-lz, .postView-pk-mod`).remove(),i.author=a(`.uname, .user-name`).first().text(),i.description=a(`.post-cont`).first().html()||a(`.thread-cont`).html(),i.pubDate=r(t(a(`.cont-top-left meta`).first().attr(`content`)),8),i}))),{title:p(`title`).text().split(`-`)[0],link:d,item:m}}export{l as route};