import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{load as r}from"cheerio";const i={path:`/zhejiang/gwy/:category?/:column?`,categories:[`government`],example:`/gov/zhejiang/gwy/1`,parameters:{category:`分类，见下表，默认为全部`,column:`地市专栏，见下表，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`zjks.gov.cn/zjgwy/website/init.htm`,`zjks.gov.cn/zjgwy/website/queryDetail.htm`,`zjks.gov.cn/zjgwy/website/queryMore.htm`],target:`/zhejiang/gwy`}],name:`通知`,maintainers:[`nczitzk`],handler:a,url:`zjks.gov.cn/zjgwy/website/init.htm`,description:`| 分类         | id |
| ------------ | -- |
| 重要通知     | 1  |
| 招考公告     | 2  |
| 招考政策     | 3  |
| 面试体检考察 | 4  |
| 录用公示专栏 | 5  |

| 地市         | id    |
| ------------ | ----- |
| 浙江省       | 133   |
| 浙江省杭州市 | 13301 |
| 浙江省宁波市 | 13302 |
| 浙江省温州市 | 13303 |
| 浙江省嘉兴市 | 13304 |
| 浙江省湖州市 | 13305 |
| 浙江省绍兴市 | 13306 |
| 浙江省金华市 | 13307 |
| 浙江省衢州市 | 13308 |
| 浙江省舟山市 | 13309 |
| 浙江省台州市 | 13310 |
| 浙江省丽水市 | 13311 |
| 省级单位     | 13317 |`};async function a(i){let{category:a,column:o}=i.req.param(),s=i.req.query(`limit`)?Number.parseInt(i.req.query(`limit`),10):50,c=`http://gwy.zjks.gov.cn`,l=new URL(`zjgwy/website/${a?`queryMore`:`init`}.htm`,c).href,u=new URL(`zjgwy/website/queryDetail.htm`,c).href,{data:d}=await n.post(l,{form:{dsdm:o,mkxh:a,oldornew:`new`}}),f=r(d),p=f(`a[onclick^="queryDetail"]`).slice(0,s).toArray().map(e=>{e=f(e);let n=e.prop(`onclick`).match(/queryDetail\('?(\d+)'?, '?(\d+)'?\);/);return{title:e.text(),link:u,category:n[1],guid:`zjks-${n[1]}-${n[2]}`,pubDate:t(e.parent().next().text()),tzid:n[2]}});p=await Promise.all(p.map(t=>e.tryGet(t.guid,async()=>{let{data:e}=await n.post(u,{form:{mkxh:t.category,oldornew:`new`,dsdm:o,tzid:t.tzid}}),i=r(e);t.description=i(`div.ibox-content`).last().html(),t.category=[i(`div.ibox-title`).last().find(`h5`).first().text()];let a=i(`a.ke-insertfile`);return a.length>0&&(t.enclosure_url=a.first().prop(`href`)),delete t.tzid,t})));let m=f(`button.btn-success`).last().text(),h=f(`table`).parent().prev().find(`h5`).text();return{item:p,title:`${f(`title`).text()} - ${m}${h}`,link:l,description:f(`div.title-font2`).text(),subtitle:`${m}${h}`,author:f(`div.title-font`).text(),allowEmpty:!0}}export{i as route};