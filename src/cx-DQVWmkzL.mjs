import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{Fragment as r,jsx as i,jsxs as a}from"hono/jsx/jsx-runtime";import{load as o}from"cheerio";import{renderToString as s}from"hono/jsx/dom/server";import{raw as c}from"hono/html";const l=({data:e,image:t,description:n,categoryToUrl:o,mediaToUrl:l})=>s(i(r,{children:e?a(r,{children:[e.images?.length?e.images.map(e=>i(`figure`,{children:i(`img`,{src:l?l(e):e})},e)):null,e.categories?.length?e.categories.map(e=>i(`a`,{href:o?o(e):e,children:e},e)):null,e.description?i(`p`,{children:e.description}):null,e.vouchers?.length?a(r,{children:[i(`h1`,{children:`相关权益`}),i(`ul`,{children:e.vouchers.map((e,t)=>i(`li`,{children:a(`div`,{children:[e.title?i(`h2`,{children:e.title}):null,e.description?a(r,{children:[i(`h3`,{children:`使用说明`}),i(r,{children:c(e.description)})]}):null,e.activateDate||e.expirationDate?a(r,{children:[i(`h3`,{children:`有效期`}),e.activateDate?a(r,{children:[i(`b`,{children:e.activateDate.split(/T/)[0]}),` 起`]}):null,e.expirationDate?a(r,{children:[i(`b`,{children:e.expirationDate.split(/T/)[0]}),` 止`]}):null]}):null,e.totalLimit?a(r,{children:[i(`h3`,{children:`总计`}),i(`p`,{children:e.totalLimit})]}):null,i(`h3`,{children:`状态`}),i(`p`,{children:e.hasSurplus?`可领取`:`已领完`})]})},e.title??t))})]}):null,e.merchants?.length?a(r,{children:[i(`h1`,{children:`适用门店`}),i(`ul`,{children:e.merchants.map((e,t)=>i(`li`,{children:a(`div`,{children:[e.name?i(`h2`,{children:e.name}):null,e.province?i(`span`,{children:e.province}):null,e.city&&e.city!==e.province?i(`span`,{children:e.city}):null,e.area&&e.area!==e.city?i(`span`,{children:e.area}):null,e.address?i(`span`,{children:e.address}):null,e.contact?i(`p`,{children:i(`a`,{href:`tel:${e.contact}`,children:e.contact})}):null]})},e.name??t))})]}):null]}):a(r,{children:[t?i(`figure`,{children:i(`img`,{src:t.src,alt:t.alt})}):null,n?i(r,{children:c(n)}):null]})})),u={path:`/cx/:category?/:city?`,categories:[`shopping`],example:`/tesla/cx/生活方式/北京`,parameters:{category:`分类，见下表，默认为空，即全部`,city:`城市，默认为空，即全国`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`权益中心`,maintainers:[`simonsmh`,`nczitzk`],handler:d,description:`| 充电免停 | 酒店 | 美食 | 生活方式 |
| -------- | ---- | ---- | -------- |

::: tip
  分类为 **充电免停** 时，城市参数不起作用
:::

<details>
<summary>可选城市</summary>

| 成都 | 深圳 | 洛阳 | 北京 | 南京 | 绍兴 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 西安 | 上海 | 阿坝藏族羌族自治州 | 重庆 | 郑州 | 天津 |
| ---- | ---- | ------------------ | ---- | ---- | ---- |

| 晋中 | 三亚 | 湖州 | 苏州 | 扬州 | 秦皇岛 |
| ---- | ---- | ---- | ---- | ---- | ------ |

| 长沙 | 武汉 | 安阳 | 温州 | 瑞安 | 石家庄 |
| ---- | ---- | ---- | ---- | ---- | ------ |

| 佛山 | 广州 | 杭州 | 烟台 | 沧州 | 张家港 |
| ---- | ---- | ---- | ---- | ---- | ------ |

| 金华 | 临沧 | 大理 | 南昌 | 贵阳 | 信阳 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 张家口 | 铜仁 | 沈阳 | 合肥 | 黔东 | 高邮 |
| ------ | ---- | ---- | ---- | ---- | ---- |

| 三河 | 安顺 | 莆田 | 阳江 | 南宁 | 台州 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 余姚 | 淄博 | 三明 | 中山 | 宁波 | 厦门 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 永康 | 慈溪 | 台山 | 福州 | 无锡 | 宜昌 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 泉州 | 肇庆 | 太仓 | 珠海 | 邢台 | 衡水 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 温岭 | 宜兴 | 东莞 | 威海 | 南通 | 舟山 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 都匀 | 长治 | 江阴 | 云浮 | 常州 | 唐山 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 平湖 | 商丘 | 保定 | 泰州 | 青岛 | 龙口 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 泰安 | 岳阳 | 惠州 | 徐州 | 哈尔滨 | 潍坊 |
| ---- | ---- | ---- | ---- | ------ | ---- |

| 大同 | 嘉兴 | 毕节 | 临汾 | 江门 | 诸暨 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 儋州 | 衢州 | 大连 | 昆山 | 靖江 | 常熟 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 罗定 | 丽江 | 晋江 | 乐清 | 茂名 | 福清 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 廊坊 | 兰溪 | 汕尾 | 滨州 | 昆明 | 玉环 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 绵阳 | 漳州 | 德州 | 聊城 | 龙岩 | 临沂 |
| ---- | ---- | ---- | ---- | ---- | ---- |

| 新沂 | 桐乡 | 迪庆藏族自治州 | 汕头 | 潮州 | 驻马店 |
| ---- | ---- | -------------- | ---- | ---- | ------ |

| 曲阜 | 郴州 | 济源 | 兴义 |
| ---- | ---- | ---- | ---- |
</details>`};async function d(r){let{category:i,city:a}=r.req.param(),s=r.req.query(`limit`)?Number.parseInt(r.req.query(`limit`),10):10,c=`https://cx.tesla.cn`,u=`https://community-api.tesla.cn`,d=new URL(`user-right/list${i?`/${i}`:``}`,c).href,f=new URL(`api/voucherpackage/merchant`,u).href,p=new URL(`api/category`,u).href,m=e=>new URL(`user-right/list/${e}`,c).href,h=e=>new URL(`community-media/${e}`,`https://china-community-app.tesla.cn`).href,{data:g}=await n(p,{searchParams:{type:2}}),_=g.data.findLast(e=>e.name===i),{data:v}=await n(f,{searchParams:{pageSize:s,pageNumber:0,benefitCategoryId:_?.id??void 0,category:_?void 0:i===`充电免停`?2:void 0,city:a}}),y=v.data.pageDatas.slice(0,s).map(e=>({title:e.venueName??e.title,link:new URL(`user-right/detail/${e.id}`,c).href,description:l({image:e.coverImage?{src:e.coverImage,alt:e.venueName??e.title}:void 0,description:e.description?.replaceAll(/\["|"]/g,``)??void 0,data:e.parkingLocationId?{title:e.venueName??e.title,categories:[i],description:`充电停车减免${e.parkingVoucherValue}小时`}:void 0,categoryToUrl:m,mediaToUrl:h}),category:e.categories,guid:e.id,pubDate:t(e.publishedAt),parkingLocationId:e.parkingLocationId}));y=await Promise.all(y.map(t=>e.tryGet(t.link,async()=>{if(t.parkingLocationId)return t.guid=`tesla-user-right#${t.guid}`,delete t.parkingLocationId,t;let e=new URL(`api/voucherpackage/merchant/${t.guid}`,u).href,{data:r}=await n(e),i=r.data;return t.title=i.title??t.title,t.description=l({data:i,categoryToUrl:m,mediaToUrl:h}),t.author=i.merchants?i.merchants.map(e=>e.name).join(`/`):void 0,t.category=[...new Set([...t.category,...i.categories])].filter(Boolean),t.guid=`tesla-user-right#${t.guid}`,t})));let{data:b}=await n(d),x=o(b),S=x(`title`).text(),C=`${a??``}${i??``}`,w=new URL(x(`link[rel="icon"]`).prop(`href`),c).href;return{item:y,title:`${S}权益中心${C?` - ${C}`:``}`,link:d,description:C,language:x(`html`).prop(`lang`),image:x(`meta[property="og:image"]`).prop(`content`),icon:w,logo:w,subtitle:C,author:S,allowEmpty:!0}}export{u as route};