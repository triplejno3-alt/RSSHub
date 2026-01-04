import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./timezone-CrV-DT8S.mjs";import{t as r}from"./types-Bl_lnefZ.mjs";import{load as i}from"cheerio";const a=async r=>{let{category:a,id:o}=r.req.param(),s=Number.parseInt(r.req.query(`limit`)??`30`,10),c=`http://load.grainoil.com.cn`,l=new URL(`${a}/${o}.jspx`,c).href,u=i(await e(l)),d=u(`html`).attr(`lang`)??`zh-CN`,f=[];return f=u(`div.m_listpagebox ol li a`).slice(0,s).toArray().map(e=>{let r=u(e),i=r.find(`b`).text(),a=r.find(`span`).text().trim(),o=r.attr(`href`),s=a;return{title:i,pubDate:a?n(t(a),8):void 0,link:o,updated:s?n(t(s),8):void 0,language:d}}),f=(await Promise.all(f.map(t=>t.link?cache.tryGet(t.link,async()=>{let n=i(await e(t.link)),r=n(`div.m_tit h2`).text(),a=n(`div.TRS_Editor`).html()??``,o={title:r,description:a,author:n(`div.m_tit h2 a`).first().text(),content:{html:a,text:a},language:d};return{...t,...o}}):t))).filter(e=>!0),{title:u(`title`).text(),description:u(`meta[http-equiv="description"]`).attr(`content`),link:l,item:f,allowEmpty:!0,image:u(`div.top_logo img`).attr(`src`)?new URL(u(`div.top_logo img`).attr(`src`),c).href:void 0,author:u(`meta[http-equiv="keywords"]`).attr(`content`),language:d,id:l}},o={path:`/:category/:id`,name:`分类`,url:`load.grainoil.com.cn`,maintainers:[`nczitzk`],handler:a,example:`/grainoil/newsListHome/3`,parameters:{category:{description:"分类，默认为 `newsListHome`，可在对应分类页 URL 中找到",options:[{label:`newsListHome`,value:`newsListHome`},{label:`newsListChannel`,value:`newsListChannel`}]},id:{description:`分类 ID，可在对应分类页 URL 中找到`}},description:`::: tip
若订阅 [政务信息](http://load.grainoil.com.cn/newsListHome/1430.jspx)，网址为 \`http://load.grainoil.com.cn/newsListHome/1430.jspx\`，请截取 \`https://load.grainoil.com.cn/\` 到末尾 \`.jspx\` 的部分 \`newsListHome/1430\` 作为 \`category\` 和 \`id\`参数填入，此时目标路由为 [\`/grainoil/newsListHome/1430\`](https://rsshub.app/grainoil/newsListHome/1430)。
:::

<details>
  <summary>更多分类</summary>

| 分类     | ID                 |
| -------- | ------------------ |
| 政务信息 | newsListHome/1430  |
| 要闻动态 | newsListHome/3     |
| 产业经济 | newsListHome/1469  |
| 产业信息 | newsListHome/1471  |
| 爱粮节粮 | newsListHome/1470  |
| 政策法规 | newsListChannel/18 |
| 生产气象 | newsListChannel/19 |
| 统计资料 | newsListChannel/20 |
| 综合信息 | newsListChannel/21 |

</details>
`,categories:[`new-media`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`load.grainoil.com.cn/:category/:id`],target:e=>`/grainoil/${e.category}/${e.id}`},{title:`政务信息`,source:[`load.grainoil.com.cn/newsListHome/1430.jspx`],target:`/newsListHome/1430`},{title:`要闻动态`,source:[`load.grainoil.com.cn/newsListHome/3.jspx`],target:`/newsListHome/3`},{title:`产业经济`,source:[`load.grainoil.com.cn/newsListHome/1469.jspx`],target:`/newsListHome/1469`},{title:`产业信息`,source:[`load.grainoil.com.cn/newsListHome/1471.jspx`],target:`/newsListHome/1471`},{title:`爱粮节粮`,source:[`load.grainoil.com.cn/newsListHome/1470.jspx`],target:`/newsListHome/1470`},{title:`政策法规`,source:[`load.grainoil.com.cn/newsListChannel/18.jspx`],target:`/newsListChannel/18`},{title:`生产气象`,source:[`load.grainoil.com.cn/newsListChannel/19.jspx`],target:`/newsListChannel/19`},{title:`统计资料`,source:[`load.grainoil.com.cn/newsListChannel/20.jspx`],target:`/newsListChannel/20`},{title:`综合信息`,source:[`load.grainoil.com.cn/newsListChannel/21.jspx`],target:`/newsListChannel/21`}],view:r.Articles};export{a as handler,o as route};