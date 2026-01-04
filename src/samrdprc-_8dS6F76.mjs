import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./types-Bl_lnefZ.mjs";import{load as i}from"cheerio";const a=async r=>{let{id:a=`xwdt/gzdt`}=r.req.param(),o=Number.parseInt(r.req.query(`limit`)??`17`,10),s=`https://www.samrdprc.org.cn`,c=new URL(a.endsWith(`/`)?a:`${a}/`,s).href,l=i(await e(c)),u=l(`html`).attr(`lang`)??`zh`,d=[];return d=l(`div.boxl_ul ul li`).slice(0,o).toArray().map(e=>{let t=l(e),r=t.find(`a`).first(),i=r.text(),a=t.find(`span`).text(),o=r.attr(`href`),s=a;return{title:i,pubDate:a?n(a):void 0,link:o?new URL(o,c).href:void 0,updated:s?n(s):void 0,language:u}}),d=await Promise.all(d.map(r=>r.link?t.tryGet(r.link,async()=>{let t=i(await e(r.link)),a=t(`div.show_tit`).text(),o=t(`div.TRS_Editor div.TRS_Editor`).html()??void 0,s=t(`div.show_tit2`).text().split(/：/).pop()?.trim(),c=t(`meta[name="keywords"]`).attr(`content`)?.split(/,/)??[],l=s,d={title:a,description:o,pubDate:s?n(s):r.pubDate,category:c,content:{html:o,text:o},updated:l?n(l):r.updated,language:u};return{...r,...d}}):r)),{title:l(`title`).text(),description:l(`meta[name="description"]`).attr(`content`),link:c,item:d,allowEmpty:!0,image:new URL(`images/logo_DPRC.png`,s).href,author:l(`meta[name="keyword"]`).attr(`content`)?.split(/,/)[0],language:u,id:l(`meta[property="og:url"]`).attr(`content`)}},o={path:`/:id{.+}?`,name:`栏目`,url:`www.samrdprc.org.cn`,maintainers:[`nczitzk`],handler:a,example:`/samrdprc/xwdt/gzdt`,parameters:{id:{description:"栏目 id，默认为 `xwdt/gzdt`，即国内新闻，可在对应分类页 URL 中找到",options:[{label:`新闻动态`,value:`xwdt/gzdt`},{label:`网站公告`,value:`wzgg`},{label:`汽车召回`,value:`qczh`},{label:`消费品召回`,value:`xfpzh`},{label:`技术报告`,value:`yjgz/jsyj`},{label:`SAC/TC463`,value:`yjgz/sactc`},{label:`研究动态`,value:`yjgz/yjfx`},{label:`安全教育`,value:`aqjy`},{label:`国内法规`,value:`flfg/gnfg`}]}},description:`::: tip
订阅 [网站公告](https://www.samrdprc.org.cn/wzgg/)，其源网址为 \`https://www.samrdprc.org.cn/wzgg/\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/samrdprc/wzgg\`](https://rsshub.app/samrdprc/wzgg)。
:::

<details>
  <summary>更多分类</summary>

  #### 网站首页

  | [新闻动态](https://www.samrdprc.org.cn/xwdt/gzdt/) | [网站公告](https://www.samrdprc.org.cn/wzgg/) | [汽车召回](https://www.samrdprc.org.cn/qczh/) | [消费品召回](https://www.samrdprc.org.cn/xfpzh/) |
  | -------------------------------------------------- | --------------------------------------------- | --------------------------------------------- | ------------------------------------------------ |
  | [xwdt/gzdt](https://rsshub.app/samrdprc/xwdt/gzdt) | [wzgg](https://rsshub.app/samrdprc/wzgg)      | [qczh](https://rsshub.app/samrdprc/qczh)      | [xfpzh](https://rsshub.app/samrdprc/xfpzh)       |

  #### 科学研究

  | [技术报告](https://www.samrdprc.org.cn/yjgz/jsyj/) | [SAC/TC463](https://www.samrdprc.org.cn/yjgz/sactc/) | [研究动态](https://www.samrdprc.org.cn/yjgz/yjfx/) |
  | -------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
  | [yjgz/jsyj](https://rsshub.app/samrdprc/yjgz/jsyj) | [yjgz/sactc](https://rsshub.app/samrdprc/yjgz/sactc) | [yjgz/yjfx](https://rsshub.app/samrdprc/yjgz/yjfx) |

  #### 安全教育

  | [安全教育](https://www.samrdprc.org.cn/aqjy/) |
  | --------------------------------------------- |
  | [aqjy](https://rsshub.app/samrdprc/aqjy)      |

  #### 法律法规

  | [国内法规](https://www.samrdprc.org.cn/flfg/gnfg/) |
  | -------------------------------------------------- |
  | [flfg/gnfg](https://rsshub.app/samrdprc/flfg/gnfg) |
</details>
`,categories:[`government`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportRadar:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`www.samrdprc.org.cn/:id`],target:`/:id`},{title:`网站首页 - 新闻动态`,source:[`www.samrdprc.org.cn/xwdt/gzdt/`],target:`/xwdt/gzdt`},{title:`网站首页 - 网站公告`,source:[`www.samrdprc.org.cn/wzgg/`],target:`/wzgg`},{title:`网站首页 - 汽车召回`,source:[`www.samrdprc.org.cn/qczh/`],target:`/qczh`},{title:`网站首页 - 消费品召回`,source:[`www.samrdprc.org.cn/xfpzh/`],target:`/xfpzh`},{title:`科学研究 - 技术报告`,source:[`www.samrdprc.org.cn/yjgz/jsyj/`],target:`/yjgz/jsyj`},{title:`科学研究 - SAC/TC463`,source:[`www.samrdprc.org.cn/yjgz/sactc/`],target:`/yjgz/sactc`},{title:`科学研究 - 研究动态`,source:[`www.samrdprc.org.cn/yjgz/yjfx/`],target:`/yjgz/yjfx`},{title:`安全教育 - 安全教育`,source:[`www.samrdprc.org.cn/aqjy/`],target:`/aqjy`},{title:`法律法规 - 国内法规`,source:[`www.samrdprc.org.cn/flfg/gnfg/`],target:`/flfg/gnfg`}],view:r.Articles};export{a as handler,o as route};