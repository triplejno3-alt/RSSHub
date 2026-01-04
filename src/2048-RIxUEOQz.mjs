import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{Fragment as i,jsx as a,jsxs as o}from"hono/jsx/jsx-runtime";import{load as s}from"cheerio";import{renderToString as c}from"hono/jsx/dom/server";const l={path:`/:id?`,categories:[`multimedia`],example:`/2048/2`,parameters:{id:"板块 ID, 见下表，默认为最新合集，即 `3`，亦可在 URL 中找到, 例如, `thread.php?fid-3.html`中, 板块 ID 为`3`"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!0,supportPodcast:!1,supportScihub:!1,nsfw:!0},name:`论坛`,maintainers:[`nczitzk`],handler:u,description:`| 最新合集 | 亞洲無碼 | 日本騎兵 | 歐美新片 | 國內原創 | 中字原創 | 三級寫真 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 3        | 4        | 5        | 13       | 15       | 16       | 18       |

| 有碼.HD | 亞洲 SM.HD | 日韓 VR/3D | 歐美 VR/3D | S-cute / Mywife / G-area |
| ------- | ---------- | ---------- | ---------- | ------------------------ |
| 116     | 114        | 96         | 97         | 119                      |

| 網友自拍 | 亞洲激情 | 歐美激情 | 露出偷窺 | 高跟絲襪 | 卡通漫畫 | 原創达人 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 23       | 24       | 25       | 26       | 27       | 28       | 135      |

| 唯美清純 | 网络正妹 | 亞洲正妹 | 素人正妹 | COSPLAY | 女优情报 | Gif 动图 |
| -------- | -------- | -------- | -------- | ------- | -------- | -------- |
| 21       | 274      | 276      | 277      | 278     | 29       |          |

| 獨家拍攝 | 稀有首發 | 网络见闻 | 主播實錄 | 珍稀套圖 | 名站同步 | 实用漫画 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 213      | 94       | 283      | 111      | 88       | 131      | 180      |

| 网盘二区 | 网盘三区 | 分享福利 | 国产精选 | 高清福利 | 高清首发 | 多挂原创 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 72       | 272      | 195      | 280      | 79       | 216      | 76       |

| 磁链迅雷 | 正片大片 | H-GAME | 有声小说 | 在线视频 | 在线快播影院 |
| -------- | -------- | ------ | -------- | -------- | ------------ |
| 43       | 67       | 66     | 55       | 78       | 279          |

| 综合小说 | 人妻意淫 | 乱伦迷情 | 长篇连载 | 文学作者 | TXT 小说打包 |
| -------- | -------- | -------- | -------- | -------- | ------------ |
| 48       | 103      | 50       | 54       | 100      | 109          |

| 聚友客栈 | 坛友自售 |
| -------- | -------- |
| 57       | 136      |`};async function u(i){let o=i.req.param(`id`)??`3`,l=await t.tryGet(`2048:domainInfo`,async()=>({url:s(await e(`https://2048.info`))(`.button`).first().attr(`onclick`)?.match(/window\.open\('([^']+)'/)?.[1]})),u=await e.raw(l.url),f=await t.tryGet(`2048:redirected:${new URL(u.url).host}`,async()=>{let t=s(await e(u.url)),n=(await e.raw(u.url,{method:`POST`,headers:{"Content-Type":`application/x-www-form-urlencoded`,Cookie:`safe18_tok=${t(`form#s18f input[name="tok"]`).attr(`value`)||``}`},body:new URLSearchParams(Object.fromEntries(t(`form#s18f input`).toArray().map(e=>[e.attribs.name,e.attribs.value]).filter(([e,t])=>e!==null&&t!==null))).toString(),redirect:`manual`})).headers.getSetCookie()?.find(e=>e.startsWith(`safe18_pass=`))?.split(`;`)[0].split(`=`)[1];return{url:u.url,safe18Pass:n}},86400,!1),p=`${f.url}thread.php?fid-${o}.html`,m=await e.raw(p,{headers:{cookie:`safe18_pass=${f.safe18Pass}`}}),h=s(m._data),g=`https://${new URL(m.url).host}`;h(`#shortcut`).remove(),h(`tr[onmouseover="this.className='tr3 t_two'"]`).remove();let _=h(`#ajaxtable tbody .tr2`).last().nextAll(`.tr3`).toArray().map(e=>(e=h(e).find(`a.subject`),{title:e.text(),link:`${g}/${e.attr(`href`)}`,guid:`https://hjd2048.com/2048/${e.attr(`href`)}`})).filter(e=>!e.link.includes(`undefined`)),v=await Promise.all(_.map(i=>t.tryGet(i.guid,async()=>{let t=s(await e(i.link,{headers:{cookie:`safe18_pass=${f.safe18Pass}`}}));t(`.ads, .tips`).remove(),t(`ignore_js_op`).each(function(){let e=t(this).find(`img`),n=e.attr(`data-original`),r=e.attr(`src`),i=n||r;t(this).replaceWith(`<img src="${i}">`)}),i.author=t(`.fl.black`).first().text(),i.pubDate=r(n(t(`span.fl.gray`).first().attr(`title`)),8);let o=t(`#read_tpc`).first().find(`a`).last(),l=t(`#copytext`)?.first()?.text();if(o?.text()?.startsWith(`http`)&&/bt\.azvmw\.com$/.test(new URL(o.text()).hostname)){let t=s(await e(o.text()));i.enclosure_type=`application/x-bittorrent`;let n=t(`.uk-button`).last().attr(`href`);i.enclosure_url=n?.startsWith(`http`)?n:`https://bt.azvmw.com/${n}`;let r=t(`.uk-button`).first().attr(`href`);o.replaceWith(c(a(d,{magnet:r,torrent:i.enclosure_url})))}else l?.startsWith(`magnet`)&&(i.enclosure_url=l,i.enclosure_type=`x-scheme-handler/magnet`);let u=t(`#read_tpc`).first();return t(`.showhide img`).each(function(){u.append(`<br><img style="max-width: 100%;" src="${t(this).attr(`src`)}">`)}),i.description=u.html(),i})));return{title:`${h(`#main #breadCrumb a`).last().text()} - 2048核基地`,link:p,item:v}}const d=({magnet:e,torrent:t})=>o(i,{children:[a(`a`,{href:e,children:`磁力連結`}),` | `,a(`a`,{href:t,children:`下載檔案`})]});export{l as route};