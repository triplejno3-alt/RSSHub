import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{jsx as i}from"hono/jsx/jsx-runtime";import{load as a}from"cheerio";import{renderToString as o}from"hono/jsx/dom/server";import s from"iconv-lite";const c={path:`/list/:id?`,categories:[`bbs`],example:`/8264/list/751`,parameters:{id:`列表 id，见下表，默认为 751，即热门推荐`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`列表`,maintainers:[`nczitzk`],handler:l,description:`| 热门推荐 | 户外知识 | 户外装备 |
| -------- | -------- | -------- |
| 751      | 238      | 204      |

<details>
<summary>更多列表</summary>

#### 热门推荐

| 业界 | 国际 | 专访 | 图说 | 户外 | 登山 | 攀岩 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 489  | 733  | 746  | 902  | 914  | 934  | 935  |

#### 户外知识

| 徒步 | 露营 | 安全急救 | 领队 | 登雪山 |
| ---- | ---- | -------- | ---- | ------ |
| 242  | 950  | 931    | 920  | 915  |

| 攀岩 | 骑行 | 跑步 | 滑雪 | 水上运动 |
| ---- | ---- | ---- | ---- | -------- |
| 916  | 917  | 918  | 919  | 921    |

| 钓鱼 | 潜水 | 攀冰 | 冲浪 | 网球 |
| ---- | ---- | ---- | ---- | ---- |
| 951  | 952  | 953  | 966  | 967  |

| 绳索知识 | 高尔夫 | 马术 | 户外摄影 | 羽毛球 |
| -------- | ------ | ---- | -------- | ------ |
| 968    | 969  | 970  | 973    | 971  |

| 游泳 | 溯溪 | 健身 | 瑜伽 |
| ---- | ---- | ---- | ---- |
| 974  | 975  | 976  | 977  |

#### 户外装备

| 服装 | 冲锋衣 | 抓绒衣 | 皮肤衣 | 速干衣 |
| ---- | ------ | ------ | ------ | ------ |
| 209  | 923  | 924  | 925  | 926  |

| 羽绒服 | 软壳 | 户外鞋 | 登山鞋 | 徒步鞋 |
| ------ | ---- | ------ | ------ | ------ |
| 927  | 929  | 211  | 928  | 930  |

| 越野跑鞋 | 溯溪鞋 | 登山杖 | 帐篷 | 睡袋 |
| -------- | ------ | ------ | ---- | ---- |
| 933    | 932  | 220  | 208  | 212  |

| 炉具 | 灯具 | 水具 | 面料 | 背包 |
| ---- | ---- | ---- | ---- | ---- |
| 792  | 218  | 219  | 222  | 207  |

| 防潮垫 | 电子导航 | 冰岩绳索 | 综合装备 |
| ------ | -------- | -------- | -------- |
| 214  | 216    | 215    | 223    |
</details>`};async function l(c){let{id:l=`751`}=c.req.param(),u=c.req.query(`limit`)?Number.parseInt(c.req.query(`limit`),10):30,d=`https://www.8264.com`,f=new URL(`list/${l}`,d).href,{data:p}=await n(f,{responseType:`buffer`}),m=a(s.decode(p,`gbk`));m(`div.newslist_info`).remove();let h=m(`div.newlist_r, div.newslist_r, div.bbslistone_name, dt`).find(`a`).slice(0,u).toArray().map(e=>{e=m(e);let t=e.prop(`href`);return{title:e.text(),link:t.startsWith(`http`)?t:new URL(t,d).href}});h=await Promise.all(h.map(c=>e.tryGet(c.link,async()=>{let{data:e}=await n(c.link,{responseType:`buffer`}),l=a(s.decode(e,`gbk`));l(`a.syq, a.xlsj, a.titleoverflow200, #fjump`).remove(),l(`i.pstatus`).remove(),l(`div.crly`).remove();let u=l(`span.pub-time`).text()||l(`span.fby span`).first().prop(`title`)||l(`span.fby`).first().text().split(`发表于`).pop().trim();return l(`img`).each(function(){l(this).replaceWith(o(i(`figure`,{children:i(`img`,{src:l(this).prop(`file`),alt:l(this).prop(`alt`)})})))}),c.title=l(`h1`).first().text(),c.description=l(`div.art-content, td.t_f`).first().html(),c.author=l(`a.user-name, #author`).first().text(),c.category=l(`div.fl_dh a, div.site a`).toArray().map(e=>l(e).text().trim()),c.pubDate=r(t(u,[`YYYY-MM-DD HH:mm`,`YYYY-M-D HH:mm`]),8),c})));let g=m(`meta[name="description"]`).prop(`content`).trim(),_=new URL(`favicon`,d).href;return{item:h,title:`${m(`span.country, h2`).text()} - ${g.split(`,`).pop()}`,link:f,description:g,language:`zh-cn`,icon:_,logo:_,subtitle:m(`meta[name="keywords"]`).prop(`content`).trim(),author:m(`meta[name="author"]`).prop(`content`)}}export{c as route};