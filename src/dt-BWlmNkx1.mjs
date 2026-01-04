import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./description-BaoNGIxU.mjs";import{load as i}from"cheerio";const a={article:2,report:3,visualization:4},o={path:`/dt/:column?/:category?`,categories:[`traditional-media`],example:`/yicai/dt/article`,parameters:{column:`栏目，见下表，默认为文章`,category:`分类，见下表，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`DT 财经`,maintainers:[`nczitzk`],handler:s,description:`#### [文章](https://dt.yicai.com/article)

| 分类     | ID         |
| -------- | ---------- |
| 全部     | article/0  |
| 新流行   | article/31 |
| 新趋势   | article/32 |
| 商业黑马 | article/33 |
| 新品     | article/34 |
| 营销     | article/35 |
| 大公司   | article/36 |
| 城市生活 | article/38 |

#### [报告](https://dt.yicai.com/report)

| 分类       | ID        |
| ---------- | --------- |
| 全部       | report/0  |
| 人群观念   | report/9  |
| 人群行为   | report/22 |
| 美妆个护   | report/23 |
| 3C 数码    | report/24 |
| 营销趋势   | report/25 |
| 服饰鞋包   | report/27 |
| 互联网     | report/28 |
| 城市与居住 | report/29 |
| 消费趋势   | report/30 |
| 生活趋势   | report/37 |

#### [可视化](https://dt.yicai.com/visualization)

| 分类     | ID               |
| -------- | ---------------- |
| 全部     | visualization/0  |
| 新流行   | visualization/39 |
| 新趋势   | visualization/40 |
| 商业黑马 | visualization/41 |
| 新品     | visualization/42 |
| 营销     | visualization/43 |
| 大公司   | visualization/44 |
| 城市生活 | visualization/45 |`};async function s(o){let{column:s=`article`,category:c=`0`}=o.req.param(),l=o.req.query(`limit`)?Number.parseInt(o.req.query(`limit`),10):30,u=`https://dt.yicai.com`,d=new URL(`api/getNewsList`,u).href,f=new URL(s,u).href,{data:p}=await n(d,{searchParams:{page:1,rid:a[s],cid:c,pageSize:l}}),m=p.data.data.slice(0,l).map(e=>{let n=e.originVideo,i=n.split(/\./).pop();return{title:e.newstitle,link:new URL(e.url,u).href,description:r({image:{src:e.originPic,alt:e.newstitle},intro:e.newsnotes}),author:e.creatername,category:[e.channelrootname,e.channelname,e.NewsTypeName].filter(Boolean),guid:`yicai-dt-${e.newsid}`,pubDate:t(e.utc_createdate),updated:t(e.utc_lastdate),enclosure_url:n,enclosure_type:n?`${i===`mp4`?`video`:`application`}/${i}`:void 0,upvotes:e.newsscore??0}});m=await Promise.all(m.map(t=>e.tryGet(t.link,async()=>{let{data:e}=await n(t.link),a=i(e);return a(`div.logintips`).remove(),a(`img`).each((e,t)=>{t=a(t),a(t).replaceWith(r({image:{src:t.prop(`data-original`)??t.prop(`src`),alt:t.prop(`alt`),width:t.prop(`width`),height:t.prop(`height`)}}))}),t.description+=r({description:a(`div.txt`).html()??void 0}),t.author=a(`div.authortime h3`).text(),t})));let{data:h}=await n(f),g=i(h),_=g(`title`).text(),v=g(`div.logo a img`).prop(`src`),y=new URL(g(`link[rel="shortcut icon"]`).prop(`href`),u).href;return{item:m,title:`${g(`a[data-cid="${c}"]`).text()}${_}`,link:f,description:g(`meta[name="keywords"]`).prop(`content`),language:`zh`,image:v,icon:y,logo:y,subtitle:g(`meta[name="description"]`).prop(`content`),author:_.split(/_/).pop(),allowEmpty:!0}}export{o as route};