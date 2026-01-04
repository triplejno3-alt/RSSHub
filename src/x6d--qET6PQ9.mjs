import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{load as i}from"cheerio";const a={path:`/:id?`,name:`分类`,url:`xd.x6d.com`,maintainers:[`nczitzk`],handler:o,example:`/x6d/34`,parameters:{id:`分类 id，可在对应分类页面的 URL 中找到，默认为首页最近更新`},description:`| 技巧分享 | QQ 技巧 | 微信技巧 | 其他教程 | 其他分享 |
| -------- | ------- | -------- | -------- | -------- |
| 31       | 55      | 112      | 33       | 88       |

| 宅家自学 | 健身养生 | 摄影剪辑 | 长点知识 | 自我提升 | 两性相关 | 编程办公 | 职场关系 | 新媒体运营 | 其他教程 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | ---------- | -------- |
| 18       | 98       | 94       | 93       | 99       | 100      | 21       | 22       | 19         | 44       |

| 活动线报 | 流量话费 | 免费会员 | 实物活动 | 游戏活动 | 红包活动 | 空间域名 | 其他活动 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 34       | 35       | 91       | 92       | 39       | 38       | 37       | 36       |

| 值得一看 | 找点乐子 | 热门事件 | 节目推荐 |
| -------- | -------- | -------- | -------- |
| 65       | 50       | 77       | 101      |

| 值得一听 | 每日一听 | 歌单推荐 |
| -------- | -------- | -------- |
| 71       | 87       | 79       |

| 资源宝库 | 书籍资料 | 设计资源 | 剪辑资源 | 办公资源 | 壁纸资源 | 编程资源 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 106      | 107      | 108      | 109      | 110      | 111      | 113      |`,categories:[`new-media`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1}};async function o(a){let{id:o=`latest`}=a.req.param(),s=a.req.query(`limit`)?Number.parseInt(a.req.query(`limit`),10):22,c=`https://xd.x6d.com`,l=new URL(o===`latest`?``:`html/${o}.html`,c).href,{data:u}=await n(l),d;if(/<meta\s/.test(u))d=i(u);else{l=new URL(o===`latest`?``:u.match(/'([\w./=?]+)'/g).toReversed().join(``).replaceAll(`'`,``),c).href;let{data:e}=await n(l);d=i(e)}d(`i.rj`).remove();let f=(o===`latest`?d(`#newslist ul`).first().find(`li`).not(`li.addd`).find(`a`).slice(0,s):d(`a.soft-title`).slice(0,s)).toArray().map(e=>(e=d(e),{title:e.prop(`title`)??e.text(),link:new URL(e.prop(`href`),c).href,language:`zh`}));f=await Promise.all(f.map(a=>e.tryGet(a.link,async()=>{let{data:e}=await n(a.link),o=i(e),s=o(`h1.article-title`).text(),l=o(`div.article-content`).html(),u=new URL(o(`div.article-content img`).first().prop(`src`),c).href;return a.title=s,a.description=l,a.pubDate=r(t(o(`time`).text()),8),a.category=o(`b.bq-wg`).toArray().map(e=>o(e).text()),a.author=o(`span.bq-zz`).text(),a.content={html:l,text:o(`div.article-content`).text()},a.image=u,a.banner=u,a.language=`zh`,a})));let p=new URL(d(`div.header-logo img`).prop(`src`),c).href;return{title:d(`title`).text().split(/\s-/)[0],description:d(`meta[name="description"]`).prop(`content`),link:l,item:f,allowEmpty:!0,image:p,language:`zh`}}export{o as handler,a as route};