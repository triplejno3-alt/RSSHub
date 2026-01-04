import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{load as r}from"cheerio";const i={103:`财经资讯`,508:`科技资讯`,106:`商业资讯`,632:`消费资讯`,630:`医疗资讯`,119:`康养资讯`,"004":`汽车资讯`,"009":`房产资讯`,629:`ESG 资讯`,"010":`A股资讯`,"001":`港股资讯`,102:`美股资讯`,113:`银行资讯`,115:`保险资讯`,104:`基金资讯`,503:`私募资讯`,112:`信托资讯`,"007":`外汇资讯`,107:`期货资讯`,118:`债券资讯`,603:`券商资讯`,105:`观点`},a={path:`/:channelNum`,categories:[`finance`],example:`/jrj/103`,parameters:{channelNum:{description:`栏目编号`,options:Object.entries(i).map(([e,t])=>({value:e,label:t}))}},url:`www.jrj.com.cn`,name:`资讯`,description:`
| column | Description |
| ---   | ---   |
| 103   | 财经资讯 |
| 508   | 科技资讯 |
| 106   | 商业资讯 |
| 632   | 消费资讯 |
| 630   | 医疗资讯 |
| 119   | 康养资讯 |
| 004   | 汽车资讯 |
| 009   | 房产资讯 |
| 629   | ESG 资讯 |
| 001   | 港股资讯 |
| 102   | 美股资讯 |
| 113   | 银行资讯 |
| 115   | 保险资讯 |
| 104   | 基金资讯 |
| 503   | 私募资讯 |
| 112   | 信托资讯 |
| 007   | 外汇资讯 |
| 107   | 期货资讯 |
| 118   | 债券资讯 |
| 603   | 券商资讯 |
| 105   | 观点 |
    `,maintainers:[`p3psi-boo`],handler:o};async function o(a){let o=a.req.param(`channelNum`),s=(await e(`https://gateway.jrj.com/jrj-news/news/queryNewsList`,{method:`post`,body:{sortBy:1,pageSize:20,makeDate:``,channelNum:o,infoCls:``}})).data.data.map(e=>{let t=e.pcInfoUrl;return{title:e.title,link:t,author:e.paperMediaSource,pubDate:n(e.makeDate)}}),c=await Promise.all(s.map(n=>t.tryGet(n.link,async()=>{let t=n.link;return n.description=r(await e(t))(`.article_content`).html(),n})));return{title:`${i[o]} - 金融界`,link:`https://jrj.com`,item:c}}export{a as route};