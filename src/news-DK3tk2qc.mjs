import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import n from"@bbob/html";import r from"@bbob/preset-html5";import{getUniqAttr as i}from"@bbob/plugin-helper";const a={path:`/news/:appid/:language?`,name:`News`,url:`steamcommunity.com`,maintainers:[`keocheung`],handler:s,example:`/news/958260/english`,parameters:{appid:`Game App ID, all digits, can be found in the URL`,language:`Language, english by default, see below for more languages`},description:`
<details>
<summary>More languages</summary>

| 语言代码                                          | 语言名称   |
| ------------------------------------------------- | ---------- |
| English                                           | english    |
| Español - España (Spanish - Spain)                | spanish    |
| Français (French)                                 | french     |
| Italiano (Italian)                                | italian    |
| Deutsch (German)                                  | german     |
| Ελληνικά (Greek)                                  | greek      |
| 한국어 (Korean)                                   | koreana    |
| 简体中文 (Simplified Chinese)                     | schinese   |
| 繁體中文 (Traditional Chinese)                    | tchinese   |
| Русский (Russian)                                 | russian    |
| ไทย (Thai)                                        | thai       |
| 日本語 (Japanese)                                 | japanese   |
| Português (Portuguese)                            | portuguese |
| Português - Brasil (Portuguese - Brazil)          | brazilian  |
| Polski (Polish)                                   | polish     |
| Dansk (Danish)                                    | danish     |
| Nederlands (Dutch)                                | dutch      |
| Suomi (Finnish)                                   | finnish    |
| Norsk (Norwegian)                                 | norwegian  |
| Svenska (Swedish)                                 | swedish    |
| Čeština (Czech)                                   | czech      |
| Magyar (Hungarian)                                | hungarian  |
| Română (Romanian)                                 | romanian   |
| Български (Bulgarian)                             | bulgarian  |
| Türkçe (Turkish)                                  | turkish    |
| Українська (Ukrainian)                            | ukrainian  |
| Tiếng Việt (Vietnamese)                           | vietnamese |
| Español - Latinoamérica (Spanish - Latin America) | latam      |

</details>
    `,categories:[`game`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{title:`News`,source:[`steamcommunity.com/app/:appid`,`steamcommunity.com/app/:appid/allnews`,`steamcommunity.com/app/:appid/announcements`,`steamcommunity.com/app/:appid/news`],target:`/news/:appid`}]},o={english:`en`,german:`de`,french:`fr`,italian:`it`,korean:`ko`,spanish:`es`,schinese:`zh-Hans`,tchinese:`zh-Hant`,japanese:`ja`,portuguese:`pt-PT`,brazilian:`pt-BR`,russian:`ru`,polish:`pl`,danish:`da`,dutch:`nl`,finnish:`fi`,norwegian:`no`,swedish:`sv`,czech:`cs`,hungarian:`hu`,turkish:`tr`,thai:`th`,ukrainian:`uk`,vietnamese:`vi`,romanian:`ro`,greek:`el`,arabic:`ar`,latam:`es-419`,bulgarian:`bg`};async function s(r){let{appid:i=`958260`,language:a=`english`}=r.req.param(),s=r.req.query(`limit`),d=s?Number.parseInt(s,10):100,f=`https://steamcommunity.com`,p=`https://clan.fastly.steamstatic.com`,m=new URL(`events/ajaxgetpartnereventspageable/`,`https://store.steampowered.com`).href,{data:h}=await t(m,{searchParams:{clan_accountid:0,appid:i,offset:0,count:d,l:a}}),g=h.events.slice(0,d).map(t=>{let r=t.event_name,s=`<div lang="${o[a]||``}">${n(t.announcement_body.body.replaceAll(`{STEAM_CLAN_IMAGE}`,`${p}/images`).replaceAll(`[olist]`,`[list=1]`).replaceAll(`[/olist]`,`[/list]`).replaceAll(/(\[\/h\d\])\n/g,`$1`).replaceAll(/(\[list(?:=.*?)?\])\n/g,`$1`),[u(),c,l])}</div>`,d=JSON.parse(t.jsondata),m=d.localized_title_image?.[0],h=d.localized_capsule_image?.[0];return{title:r,description:s,pubDate:e(t.announcement_body.posttime,`X`),link:new URL(`games/${i}/announcements/detail/${t.announcement_body.gid}`,f).href,category:t.announcement_body.tags,content:{html:s,text:t.announcement_body.body},updated:e(t.announcement_body.updatetime,`X`),image:h?new URL(`images/${t.announcement_body.clanid}/${h}`,p).href:void 0,banner:m?new URL(`images/${t.announcement_body.clanid}/${m}`,p).href:void 0}});return{title:`App ${i} News`,link:new URL(`app/${i}/allnews/`,f).href,image:new URL(`store_item_assets/steam/apps/${i}/hero_capsule.jpg`,`https://shared.fastly.steamstatic.com`).href,item:g,language:o[a]||null}}const c=e=>e.walk(e=>typeof e==`string`&&e===`
`?{tag:`br`,content:null}:e),l=e=>e.walk(e=>{if(typeof e==`string`&&/https?:\/\/[^\s]+/.test(e)){let t=0,n,r=[],i=/https?:\/\/[^\s]+/g;for(;(n=i.exec(e))!==null;)n.index>t&&r.push(e.slice(t,n.index)),r.push({tag:`a`,attrs:{href:n[0],rel:`noopener`,target:`_blank`},content:n[0]}),t=n.index+n[0].length;return t<e.length&&r.push(e.slice(t)),r.length===0?e:r.length===1?r[0]:{tag:`span`,content:r}}return e}),u=r.extend(e=>({...e,b:e=>({tag:`b`,content:e.content}),i:e=>({tag:`i`,content:e.content}),u:e=>({tag:`u`,content:e.content}),s:e=>({tag:`s`,content:e.content}),url:e=>({tag:`a`,attrs:{href:Object.keys(e.attrs)[0],rel:`noopener`,target:`_blank`},content:e.content}),previewyoutube:e=>({tag:`iframe`,attrs:{src:`https://www.youtube-nocookie.com/embed/${i(e.attrs).match(/[A-Za-z0-9_-]+/)?.[0]}`,title:`YouTube video player`,frameborder:`0`,allowFullScreen:`1`,refererpolicy:`strict-origin-when-cross-origin`}}),video:(e,{render:t})=>({tag:`video`,attrs:{controls:``,preload:`metadata`,poster:e.attrs?.poster},content:t(Object.entries({webm:`video/webm`,mp4:`video/mp4`}).map(([t,n])=>({tag:`source`,attrs:{src:e.attrs?.[t],type:n}})))})}));export{a as route};