import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./types-Bl_lnefZ.mjs";import{n,t as r}from"./util-DHZvC8Oq.mjs";import{load as i}from"cheerio";const a=async t=>{let{category:a=`highlights`,country:o=`us`}=t.req.param(),s=Number.parseInt(t.req.query(`limit`)??`100`,10),c=new URL(a.endsWith(`/`)?a:`${a}/`,r).href,l=i(await e(c,{headers:{Cookie:`countryId=${o};`}})),u=l(`html`).attr(`lang`)??`en`,d=await n(l,`div.card-panel`,c,o,s),f=l(`title`).text();return{title:f,description:l(`meta[name="description"]`).attr(`content`),link:c,item:d,allowEmpty:!0,image:l(`a.brand-logo img`).attr(`src`)?new URL(l(`a.brand-logo img`).attr(`src`),r).href:void 0,author:f.split(/\|/).pop(),language:u,id:c}},o={path:`/:category?/:country?`,name:`Category`,url:`app-sales.net`,maintainers:[`nczitzk`],handler:a,example:`/app-sales/highlights`,parameters:{category:{description:"Category, `highlights` as Highlights by default",options:[{label:`Highlights`,value:`highlights`},{label:`Active Sales`,value:`activesales`},{label:`Now Free`,value:`nowfree`}]},country:{description:"Country ID, `us` as United States by default",options:[{label:`United States`,value:`us`},{label:`Austria`,value:`at`},{label:`Australia`,value:`au`},{label:`Brazil`,value:`br`},{label:`Canada`,value:`ca`},{label:`France`,value:`fr`},{label:`Germany`,value:`de`},{label:`India`,value:`in`},{label:`Italy`,value:`it`},{label:`Netherlands`,value:`nl`},{label:`Poland`,value:`pl`},{label:`Russia`,value:`ru`},{label:`Spain`,value:`es`},{label:`Sweden`,value:`se`},{label:`Great Britain`,value:`gb`}]}},description:`::: tip
To subscribe to [Highlights](https://www.app-sales.net/highlights/), where the source URL is \`https://www.app-sales.net/highlights/\`, extract the certain parts from this URL to be used as parameters, resulting in the route as [\`/app-sales/highlights\`](https://rsshub.app/app-sales/highlights).
:::

| Highlights | Active Sales | Now Free |
| ---------- | ------------ | -------- |
| highlights | activesales  | nowfree  |

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
`,categories:[`program-update`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`app-sales.net/:category`],target:e=>{let t=e.category;return`/app-sales${t?`/${t}`:``}`}},{title:`Highlights`,source:[`app-sales.net/highlights`],target:`/highlights`},{title:`Active Sales`,source:[`app-sales.net/activesales`],target:`/activesales`},{title:`Now Free`,source:[`app-sales.net/nowfree`],target:`/nowfree`}],view:t.Articles};export{a as handler,o as route};