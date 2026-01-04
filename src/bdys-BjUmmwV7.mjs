import"./ofetch-uhy-qh6X.mjs";import{t as e}from"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./got-CKQ7C9HX.mjs";import{t as i}from"./timezone-CrV-DT8S.mjs";import{t as a}from"./config-not-found-DGyG6Tbz.mjs";import{Fragment as o,jsx as s,jsxs as c}from"hono/jsx/jsx-runtime";import{load as l}from"cheerio";import{renderToString as u}from"hono/jsx/dom/server";import{raw as d}from"hono/html";import f from"p-map";const p=new Set([`52bdys.com`,`bde4.icu`,`bdys01.com`]),m={path:`/:caty?/:type?/:area?/:year?/:order?`,categories:[`multimedia`],example:`/bdys`,parameters:{caty:"影视类型，见下表，默认为 `all` 即不限",type:"资源分类，见下表，默认为 `all` 即不限",area:"制片地区，见下表，默认为 `all` 即不限",year:"上映时间，此处填写年份不小于2000，默认为 `all` 即不限",order:`影视排序，见下表，默认为更新时间`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`首页`,maintainers:[`nczitzk`],handler:h,description:`#### 资源分类

| 不限 | 电影 | 电视剧 |
| ---- | ---- | ------ |
| all  | 0    | 1      |

#### 影视类型

| 不限 | 动作    | 爱情   | 喜剧 | 科幻   | 恐怖   |
| ---- | ------- | ------ | ---- | ------ | ------ |
| all  | dongzuo | aiqing | xiju | kehuan | kongbu |

| 战争      | 武侠  | 魔幻   | 剧情   | 动画    | 惊悚     |
| --------- | ----- | ------ | ------ | ------- | -------- |
| zhanzheng | wuxia | mohuan | juqing | donghua | jingsong |

| 3D | 灾难   | 悬疑   | 警匪    | 文艺  | 青春     |
| -- | ------ | ------ | ------- | ----- | -------- |
| 3D | zainan | xuanyi | jingfei | wenyi | qingchun |

| 冒险    | 犯罪   | 纪录 | 古装     | 奇幻   | 国语  |
| ------- | ------ | ---- | -------- | ------ | ----- |
| maoxian | fanzui | jilu | guzhuang | qihuan | guoyu |

| 综艺   | 历史  | 运动    | 原创压制   |
| ------ | ----- | ------- | ---------- |
| zongyi | lishi | yundong | yuanchuang |

| 美剧  | 韩剧  | 国产电视剧 | 日剧 | 英剧   | 德剧 |
| ----- | ----- | ---------- | ---- | ------ | ---- |
| meiju | hanju | guoju      | riju | yingju | deju |

| 俄剧 | 巴剧 | 加剧  | 西剧    | 意大利剧 | 泰剧  |
| ---- | ---- | ----- | ------- | -------- | ----- |
| eju  | baju | jiaju | spanish | yidaliju | taiju |

| 港台剧    | 法剧 | 澳剧 |
| --------- | ---- | ---- |
| gangtaiju | faju | aoju |

#### 制片地区

| 大陆 | 中国香港 | 中国台湾 |
| ---- | -------- | -------- |

| 美国 | 英国 | 日本 | 韩国 | 法国 |
| ---- | ---- | ---- | ---- | ---- |

| 印度 | 德国 | 西班牙 | 意大利 | 澳大利亚 |
| ---- | ---- | ------ | ------ | -------- |

| 比利时 | 瑞典 | 荷兰 | 丹麦 | 加拿大 | 俄罗斯 |
| ------ | ---- | ---- | ---- | ------ | ------ |

#### 影视排序

| 更新时间 | 豆瓣评分 |
| -------- | -------- |
| 0        | 1        |`};async function h(m){let h=m.req.param(`caty`)||`all`,g=m.req.param(`type`)||`all`,_=m.req.param(`area`)||`all`,v=m.req.param(`year`)||`all`,y=m.req.param(`order`)||`0`,b=m.req.query(`domain`)||`bdys01.com`;if(!e.feature.allow_user_supply_unsafe_domain&&!p.has(new URL(`https://${b}`).hostname))throw new a(`This RSS is disabled unless 'ALLOW_USER_SUPPLY_UNSAFE_DOMAIN' is set to 'true'.`);let x=`https://www.${b}`,S=`${x}/s/${h}?${g===`all`?``:`&type=`+g}${_===`all`?``:`&area=`+_}${v===`all`?``:`&year=`+v}&order=${y}`,C=l((await r({method:`get`,url:S})).data),w=``,T=C(`.card-body .card a`).slice(0,15).toArray().map(e=>{e=C(e);let t=e.attr(`href`).split(`;jsessionid=`);w=t[1];let r=e.next();return{title:r.find(`h3`).text(),link:`${x}${t[0]}`,pubDate:n(r.find(`.text-muted`).text())}}),E={cookie:`JSESSIONID=${w}`};return{title:`哔嘀影视`,link:S,item:await f(T,e=>t.tryGet(e.link,async()=>{let t=await r({method:`get`,url:e.link,headers:E}),a=await r({method:`get`,url:`${x}/downloadInfo/list?mid=${e.link.split(`/`)[4].split(`.`)[0]}`,headers:E}),f=l(t.data);f(`svg`).remove();let p=f(`.download-list .list-group`),m=f(`.row.mt-3`).html(),h=f(`#synopsis`).html(),g=p.html(),_=a.data;return e.description=u(c(o,{children:[m?c(o,{children:[d(m),s(`br`,{})]}):null,h?c(o,{children:[d(h),s(`br`,{})]}):null,_?.length?c(`div`,{children:[s(`b`,{children:`下载地址：`}),_.map(e=>s(`div`,{class:`item`,children:c(`div`,{class:`content`,children:[e.downloadCategory.name,`: `,s(`a`,{href:e.url,children:e.url})]})}))]}):null,g?c(`div`,{children:[s(`b`,{children:`种子列表：`}),d(g)]}):null]})),e.pubDate=i(n(f(`.bg-purple-lt`).text().replace(`更新时间：`,``)),8),e.guid=`${e.link}#${f(`.card h1`).text()}`,e.enclosure_url=p.html()?`${x}${p.find(`a`).first().attr(`href`)}`:a.data.pop().url,e.enclosure_type=`application/x-bittorrent`,e}),{concurrency:1})}}export{m as route};