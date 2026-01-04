import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./got-CKQ7C9HX.mjs";import*as n from"node:url";import{load as r}from"cheerio";const i={path:`/jobcenter/:recruitType?/:city?/:type?/:order?/:latest?`,categories:[`bbs`],example:`/nowcoder/jobcenter/1/北京/1/1/true`,parameters:{recruitType:"招聘分类，`1` 指 实习广场，`2` 指 社招广场，默认为 `1`",city:"所在城市，可选城市见下表，若空则为 `全国`",type:"职位类型，可选职位代码见下表，若空则为 `全部`",order:"排序参数，可选排序参数代码见下表，若空则为 `默认`",latest:"是否仅查看最近一周，可选 `true` 和 `false`，默认为 `false`"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`nowcoder.com/`],target:`/jobcenter`}],name:`实习广场 & 社招广场`,maintainers:[`nczitzk`],handler:a,url:`nowcoder.com/`,description:`可选城市有：北京、上海、广州、深圳、杭州、南京、成都、厦门、武汉、西安、长沙、哈尔滨、合肥、其他

  职位类型代码见下表：

| 研发 | 测试 | 数据 | 算法 | 前端 | 产品 | 运营 | 其他 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1    | 2    | 3    | 4    | 5    | 6    | 7    | 0    |

  排序参数见下表：

| 最新发布 | 最快处理 | 处理率最高 |
| -------- | -------- | ---------- |
| 1        | 2        | 3          |`};async function a(i){let a=`https://www.nowcoder.com/job/center/`,o=r((await t({method:`get`,url:`${a}?${i.req.param(`type`)?`type=`+i.req.param(`type`):``}${i.req.param(`city`)?`&city=`+i.req.param(`city`):``}${i.req.param(`order`)?`&order=`+i.req.param(`order`):``}${i.req.param(`recruitType`)?`&recruitType=`+i.req.param(`recruitType`):``}${i.req.param(`latest`)?`&latest=`+i.req.param(`latest`):``}`})).data),s=o(`ul.reco-job-list li`).slice(0,30).toArray().map(e=>{e=o(e);let t=e.find(`a.reco-job-title`),r=e.find(`div.reco-job-com a`),i=e.find(`div.reco-job-detail span`).eq(1).text(),s=new Date;if(i.includes(`天`)){let e=i.split(`天`)[0];s.setDate(s.getDate()-e)}else if(i.includes(`小时`)){let e=i.split(`小时`)[0];s.setHours(s.getHours()-e)}return{title:`${r.text()} | ${t.text()}`,link:n.resolve(a,t.attr(`href`)),pubDate:s.toUTCString()}}),c=await Promise.all(s.map(n=>e.tryGet(n.link,async()=>(n.description=r((await t({method:`get`,url:n.link})).data)(`div.rec-job`).html(),n))));return{title:`${i.req.param(`recruitType`)&&i.req.param(`recruitType`)===`2`?`社招广场`:`实习广场`} - 牛客网`,link:a,item:c}}export{i as route};