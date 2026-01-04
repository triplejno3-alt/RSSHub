import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./types-Bl_lnefZ.mjs";import{n,t as r}from"./util-DHZvC8Oq.mjs";import{load as i}from"cheerio";const a=async t=>{let{time:a=`24h`,country:o=`us`}=t.req.param(),s=Number.parseInt(t.req.query(`limit`)??`30`,10),c=new URL(`mostwanted/`,r).href,l=i(await e(c,{headers:{Cookie:`countryId=${o};`}})),u=l(`html`).attr(`lang`)??`en`,d=await n(l,a?`div[id$="-${a}"] div.card-panel`:`div.card-panel`,c,o,s),f=l(`title`).text(),p=l(`ul.tabs li.tab a[href$="-${a}"]`).text();return{title:`${f}${p?` - ${p}`:``}`,description:l(`meta[name="description"]`).attr(`content`),link:c,item:d,allowEmpty:!0,image:l(`a.brand-logo img`).attr(`src`)?new URL(l(`a.brand-logo img`).attr(`src`),r).href:void 0,author:f.split(/\|/).pop(),language:u,id:c}},o={path:`/mostwanted/:time?/:country?`,name:`Watchlist Charts`,url:`app-sales.net`,maintainers:[`nczitzk`],handler:a,example:`/app-sales/mostwanted`,parameters:{time:{description:"Time, `24h` as Last 24h by default",options:[{label:`Last 24h`,value:`24h`},{label:`Last Week`,value:`week`},{label:`All Time`,value:`alltime`}]},country:{description:"Country ID, `us` as United States by default",options:[{label:`United States`,value:`us`},{label:`Austria`,value:`at`},{label:`Australia`,value:`au`},{label:`Brazil`,value:`br`},{label:`Canada`,value:`ca`},{label:`France`,value:`fr`},{label:`Germany`,value:`de`},{label:`India`,value:`in`},{label:`Italy`,value:`it`},{label:`Netherlands`,value:`nl`},{label:`Poland`,value:`pl`},{label:`Russia`,value:`ru`},{label:`Spain`,value:`es`},{label:`Sweden`,value:`se`},{label:`Great Britain`,value:`gb`}]}},description:`
| Last 24h | Last Week | All Time |
| -------- | --------- | -------- |
| 24h      | week      | alltime  |

<details>
  <summary>More countries</summary>

| Currency | Country       | ID  |
| -------- | ------------- | --- |
| USD      | United States | us  |
| EUR      | Austria       | at  |
| AUD      | Australia     | au  |
| BRL      | Brazil        | br  |
| CAD      | Canada        | ca  |
| EUR      | France        | fr  |
| EUR      | Germany       | de  |
| INR      | India         | in  |
| EUR      | Italy         | it  |
| EUR      | Netherlands   | nl  |
| PLN      | Poland        | pl  |
| RUB      | Russia        | ru  |
| EUR      | Spain         | es  |
| SEK      | Sweden        | se  |
| GBP      | Great Britain | gb  |

</details>
`,categories:[`program-update`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`app-sales.net/mostwanted`],target:`/mostwanted`},{title:`Watchlist Charts - Last 24h`,source:[`app-sales.net/mostwanted`],target:`/mostwanted/24h`},{title:`Watchlist Charts - Last Week`,source:[`app-sales.net/mostwanted`],target:`/mostwanted/week`},{title:`Watchlist Charts - All Time`,source:[`app-sales.net/mostwanted`],target:`/mostwanted/alltime`}],view:t.Articles};export{a as handler,o as route};