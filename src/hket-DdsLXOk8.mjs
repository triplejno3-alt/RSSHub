import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{jsx as i,jsxs as a}from"hono/jsx/jsx-runtime";import*as o from"cheerio";import{renderToString as s}from"hono/jsx/dom/server";const c={srac:{baseUrl:`https://china.hket.com`},sran:{baseUrl:`https://inews.hket.com`},srat:{baseUrl:`https://topick.hket.com`},sraw:{baseUrl:`https://wealth.hket.com`}},l=(e,t)=>s(a(`figure`,{children:[i(`img`,{alt:e,src:t}),i(`figcaption`,{children:e})]})),u={path:`/:category?`,categories:[`traditional-media`],example:`/hket/sran001`,parameters:{category:`分类，默认为全部新闻，可在 URL 中找到，部分见下表`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`china.hket.com/:category/*`],target:`/:category`},{source:[`inews.hket.com/:category/*`],target:`/:category`},{source:[`topick.hket.com/:category/*`],target:`/:category`},{source:[`wealth.hket.com/:category/*`],target:`/:category`},{source:[`www.hket.com/`],target:`/`}],name:`新闻`,maintainers:[`TonyRL`],handler:d,url:`www.hket.com/`,description:`香港经济日报已有提供简单 RSS，详细可前往官方网站： [https://www.hket.com/rss](https://www.hket.com/rss)

此路由主要补全官方 RSS 全文输出及完善分类输出。

<details>
<summary>分类</summary>

| sran001  | sran008  | sran010  | sran011  | sran012  | srat006  |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 全部新闻 | 财经地产 | 科技信息 | 国际新闻 | 商业新闻 | 香港新闻 |

| sran009  | sran009-1 | sran009-2 | sran009-3  | sran009-4 | sran009-5 | sran009-6 |
| -------- | --------- | --------- | ---------- | --------- | --------- | --------- |
| 即时财经 | 股市      | 新股 IPO  | 新经济追踪 | 当炒股    | 宏观解读  | Hot Talk  |

| sran011-1 | sran011-2    | sran011-3    |
| --------- | ------------ | ------------ |
| 环球政治  | 环球经济金融 | 环球社会热点 |

| sran016    | sran016-1  | sran016-2  | sran016-3  | sran016-4  | sran016-5      |
| ---------- | ---------- | ---------- | ---------- | ---------- | -------------- |
| 大湾区主页 | 大湾区发展 | 大湾区工作 | 大湾区买楼 | 大湾区消费 | 大湾区投资理财 |

| srac002  | srac003  | srac004  | srac005  |
| -------- | -------- | -------- | -------- |
| 即时中国 | 经济脉搏 | 国情动向 | 社会热点 |

| srat001 | srat008 | srat055  | srat069  | srat070   |
| ------- | ------- | -------- | -------- | --------- |
| 话题    | 观点    | 休闲消费 | 娱乐新闻 | TOPick TV |

| srat052  | srat052-1 | srat052-2  | srat052-3 |
| -------- | --------- | ---------- | --------- |
| 健康主页 | 食用安全  | 医生诊症室 | 保健美颜  |

| srat053  | srat053-1 | srat053-2 | srat053-3 | srat053-4  |
| -------- | --------- | --------- | --------- | ---------- |
| 亲子主页 | 儿童健康  | 育儿经    | 教育      | 亲子好去处 |

| srat053-6   | srat053-61 | srat053-62 | srat053-63 | srat053-64 |
| ----------- | ---------- | ---------- | ---------- | ---------- |
| Band 1 学堂 | 幼稚园     | 中小学     | 尖子教室   | 海外升学   |

| srat072-1  | srat072-2  | srat072-3        | srat072-4         |
| ---------- | ---------- | ---------------- | ----------------- |
| 健康身心活 | 抗癌新方向 | 「糖」「心」解密 | 风湿不再 你我自在 |

| sraw007  | sraw009  | sraw010  | sraw011  | sraw012  | sraw014  | sraw018  | sraw019  |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 全部博客 | Bloggers | 收息攻略 | 精明消费 | 退休规划 | 个人增值 | 财富管理 | 绿色金融 |

| sraw015  | sraw015-07 | sraw015-08 | sraw015-09 | sraw015-10 |
| -------- | ---------- | ---------- | ---------- | ---------- |
| 移民百科 | 海外置业   | 移民攻略   | 移民点滴   | 海外理财   |

| sraw020  | sraw020-1    | sraw020-2 | sraw020-3 | sraw020-4 |
| -------- | ------------ | --------- | --------- | --------- |
| ESG 主页 | ESG 趋势政策 | ESG 投资  | ESG 企业  | ESG 社会  |
</details>`};async function d(i){let{category:a=`sran001`}=i.req.param(),s=c[a.slice(0,4)].baseUrl,u=await e(`${s}/${a}`),d=o.load(u),f=d(`.main-listing-container div.listing-title > a`).toArray().map(e=>{e=d(e);let t=e.parent().parent().find(`.share-button`).data(`url`);return{title:e.text().trim(),link:t.startsWith(`http`)?t:s+t}}),p=await Promise.all(f.map(i=>t.tryGet(i.link,async()=>{if(i.link.startsWith(`https://invest.hket.com/`)||i.link.startsWith(`https://ps.hket.com/`)){let t=await(i.link.startsWith(`https://invest.hket.com/`)?e(`https://invest.hket.com/content-api-middleware/content`,{headers:{referer:i.link},method:`POST`,body:{id:i.link.split(`/`).pop(),channel:`invest`}}):e(`https://data02.hket.com/content`,{headers:{referer:i.link},query:{id:i.link.split(`/`).pop(),channel:`epc`}}));return i.pubDate=r(n(t.displayDate),8),i.updated=r(n(t.lastModifiedDate),8),i.author=t.authors?.map(e=>e.name).join(`, `),i.description=t.content.full||t.content.partial,i.category=t.contentTags?.map(e=>e.name),i}let t=await e(i.link),a=o.load(t);i.category=a(`.contentTags-container > .hotkey-container-wrapper > .hotkey-container > a`).toArray().map(e=>a(e).text().trim()),a(`source`).remove(),a(`p.article-detail_caption, .article-extend-button, span.click-to-enlarge`).remove(),a(`.loyalty-promotion-container, .relatedContents-container, .article-details-center-sharing-btn, .article-detail_login`).remove(),a(`.gallery-related-container, .contentTags-container`).remove(),a(`.listing-widget-126, div.template-default.hket-row.no-padding.detail-widget`).remove(),a(`.ad_MobileMain, .adunit, .native-ad`).remove(),a(`span`).each((e,t)=>{a(t).text().startsWith(`+`)&&a(t).remove()}),a(`img`).each((e,t)=>{t=a(t),t.replaceWith(l(t.data(`alt`),t.data(`src`)??t.attr(`src`)))});let s=JSON.parse(a(`script[type="application/ld+json"]`).toArray().find(e=>a(e).text().includes(`NewsArticle`))?.children[0].data);return i.description=a(`div.article-detail-body-container`).html(),i.pubDate=n(s.datePublished),i.updated=n(s.dateModified),i})));return{title:d(`head meta[name=title]`).attr(`content`)?.trim(),link:s+`/`+a,description:d(`head meta[name=description]`).attr(`content`)?.trim(),item:p,language:`zh-hk`}}export{u as route};