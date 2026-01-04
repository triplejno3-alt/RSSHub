import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";const n={path:`/:city/:pollution?`,categories:[`other`],example:`/aqicn/beijing/pm25`,parameters:{city:`城市拼音或地区 ID，详见[aqicn.org](http://aqicn.org/city/)`,pollution:`可选择显示更详细的空气污染成分`},radar:[{source:[`aqicn.org`]}],name:`实时 AQI`,maintainers:[`ladeng07`],handler:r,url:`aqicn.org`,descriptions:`
|   参数   | 污染成分 |
| -------- | -------- |
|   pm25   |  PM2.5   |
|   pm10   |  PM10    |
|   o3     |  O3      |
|   no2    |  NO2     |
|   so2    |  SO2     |
|   co     |  CO      |

举例: [https://rsshub.app/aqicn/beijing/pm25,pm10](https://rsshub.app/aqicn/beijing/pm25,pm10)

1. 显示单个污染成分，例如「pm25」, [https://rsshub.app/aqicn/beijing/pm25](https://rsshub.app/aqicn/beijing/pm25)
2. 逗号分隔显示多个污染成分，例如「pm25,pm10」，[https://rsshub.app/aqicn/beijing/pm25,pm10](https://rsshub.app/aqicn/beijing/pm25,pm10)
3. 城市子站 ID 获取方法：右键显示网页源代码，搜索 "idx" （带双冒号），后面的 ID 就是子站的 ID，如你给的链接 ID 是 4258，RSS 地址就是 [https://rsshub.app/aqicn/4258](https://rsshub.app/aqicn/4258)
`};async function r(n){let r=n.req.param(`city`),i=n.req.param(`pollution`)||[],a={so2:`so2`,no2:`no2`,co:`co`,o3:`O3`,pm25:`PM2.5`,pm10:`PM10`},o=(await t({method:`get`,url:`http://aqicn.org/aqicn/json/android/${Number.isNaN(Number(r))?r:`@${r}`}/json`})).data,s=i.length===0?``:i.split(`,`).map(e=>{let t=typeof o.historic[a[e]]==`object`?o.historic[a[e]][Object.keys(o.historic[a[e]])[0]]:o.historic[a[e]][0];return`${a[e].toUpperCase()}:<b>${t}</b><br>`}).join(``);return{title:`${o.namena}AQI`,link:`https://aqicn.org/city/${o.ids.path}`,description:`${o.namena}AQI-aqicn.org`,item:[{title:`${o.namena}实时空气质量(AQI)${o.utimecn}`,description:`${o.infocn}<br>风力:<b>${o.cwind[0]}</b>级<br>AQI:<b>${o.aqi}</b><br>${s}<img src="${o.wgt}">`,pubDate:e(o.time*1e3),guid:`${o.time}-${r}-${i}`,link:`https://aqicn.org/city/${o.ids.path}`}]}}export{n as route};