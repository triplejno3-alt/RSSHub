import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{Fragment as i,jsx as a,jsxs as o}from"hono/jsx/jsx-runtime";import{renderToString as s}from"hono/jsx/dom/server";const c={path:`/projectdynamic/:type?/:stage?/:status?`,categories:[`finance`],example:`/szse/projectdynamic`,parameters:{type:`类型，见下表，默认为IPO`,stage:`阶段，见下表，默认为全部`,status:`状态，见下表，默认为全部`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`listing.szse.cn/projectdynamic/1/index.html`,`listing.szse.cn/projectdynamic/2/index.html`,`listing.szse.cn/projectdynamic/3/index.html`,`listing.szse.cn/`]}],name:`创业板项目动态`,maintainers:[`nczitzk`],handler:l,url:`listing.szse.cn/projectdynamic/1/index.html`,description:`类型

| IPO | 再融资 | 重大资产重组 |
| --- | ------ | ------------ |
| 1   | 2      | 3            |

  阶段

| 全部 | 受理 | 问询 | 上市委会议 |
| ---- | ---- | ---- | ---------- |
| 0    | 10   | 20   | 30         |

| 提交注册 | 注册结果 | 中止 | 终止 |
| -------- | -------- | ---- | ---- |
| 35       | 40       | 50   | 60   |

  状态

| 全部 | 新受理 | 已问询 | 通过 | 未通过 |
| ---- | ------ | ------ | ---- | ------ |
| 0    | 20     | 30     | 45   | 44     |

| 暂缓审议 | 复审通过 | 复审不通过 | 提交注册 |
| -------- | -------- | ---------- | -------- |
| 46       | 56       | 54         | 60       |

| 注册生效 | 不予注册 | 补充审核 | 终止注册 |
| -------- | -------- | -------- | -------- |
| 70       | 74       | 78       | 76       |

| 中止 | 审核不通过 | 撤回 |
| ---- | ---------- | ---- |
| 80   | 90         | 95   |`};async function l(i){let a={1:`IPO`,2:`再融资`,3:`重大资产重组`},o={10:`受理`,20:`问询`,30:`上市委会议`,35:`提交注册`,40:`注册结果`,50:`中止`,60:`终止`},s={20:`新受理`,30:`已问询`,45:`通过`,44:`未通过`,46:`暂缓审议`,56:`复审通过`,54:`复审不通过`,60:`提交注册`,70:`注册生效`,74:`不予注册`,78:`补充审核`,76:`终止注册`,80:`中止`,90:`审核不通过`,95:`撤回`},c=i.req.param(`type`)??`1`,l=i.req.param(`stage`)??`0`,d=i.req.param(`status`)??`0`,f=`http://listing.szse.cn`,p=(await n({method:`get`,url:`${f}/api/ras/projectrends/query?bizType=${c}${l===`0`?``:`&stage=${l}`}${d===`0`?``:`&status=${d}`}&pageIndex=0&pageSize=20`})).data.data.map(e=>({title:e.prjid,link:`${f}/api/ras/projectrends/details?id=${e.prjid}`}));return p=await Promise.all(p.map(i=>e.tryGet(i.link,async()=>{let e=(await n({method:`get`,url:i.link})).data.data,a=JSON.parse(e.pjdot)[-1];return i.link=`${f}/projectdynamic/ipo/detail/index.html?id=${i.title}`,i.title=`[${e.prjst}] ${e.cmpnm} (${e.cmpsnm})- ${e.csrcind}`,i.description=u(e,a),i.pubDate=r(t(a.startTime,`YYYY-MM-DD HH:mm:ss`),8),i}))),{title:`${a[c]}项目动态${d===`0`?l===`0`?``:` (${o[l]}) `:` (${s[d]}) `} - 创业板发行上市审核信息公开网站 - 深圳证券交易所`,link:`${f}/projectdynamic/${c}/index.html`,item:p}}const u=(e,t)=>s(o(i,{children:[a(`h1`,{children:e.cmpnm}),a(`p`,{}),t.startTime,` `,t.name,a(`h2`,{children:`项目基本信息`}),a(`table`,{children:o(`tbody`,{children:[o(`tr`,{children:[a(`td`,{class:`title`,children:`公司全称`}),a(`td`,{class:`info`,children:e.cmpnm}),a(`td`,{class:`title`,children:`公司简称`}),a(`td`,{class:`info`,children:e.cmpsnm})]}),o(`tr`,{children:[a(`td`,{class:`title`,children:`受理日期`}),a(`td`,{class:`info`,children:e.acptdt}),a(`td`,{class:`title`,children:`更新日期`}),a(`td`,{class:`info`,children:e.updtdt})]}),o(`tr`,{children:[a(`td`,{class:`title`,children:`审核状态`}),a(`td`,{class:`info`,children:e.prjst}),a(`td`,{class:`title`,children:`预计融资金额(亿元)`}),a(`td`,{class:`info`,children:e.maramt})]}),o(`tr`,{children:[a(`td`,{class:`title`,children:`保荐机构`}),a(`td`,{class:`info`,children:a(`a`,{target:`_blank`,href:`/projectdynamic/ipo/index.html?keywords=${e.sprinst}`,children:e.sprinst})}),a(`td`,{class:`title`,children:`保荐代表人`}),a(`td`,{class:`info`,children:a(`span`,{children:e.sprrep})})]}),o(`tr`,{children:[a(`td`,{class:`title`,children:`会计师事务所`}),a(`td`,{class:`info`,children:a(`a`,{target:`_blank`,href:`/projectdynamic/ipo/index.html?keywords=${e.acctfm}`,children:e.acctfm})}),a(`td`,{class:`title`,children:`签字会计师`}),a(`td`,{class:`info`,children:e.acctsgnt})]}),o(`tr`,{children:[a(`td`,{class:`title`,children:`律师事务所`}),a(`td`,{class:`info`,children:a(`a`,{target:`_blank`,href:`/projectdynamic/ipo/index.html?keywords=${e.lawfm}`,children:e.lawfm})}),a(`td`,{class:`title`,children:`签字律师`}),a(`td`,{class:`info`,children:e.lglsgnt})]}),o(`tr`,{children:[a(`td`,{class:`title`,children:`评估机构`}),a(`td`,{class:`info`,children:e.evalinst}),a(`td`,{class:`title`,children:`签字评估师`}),a(`td`,{class:`info`,children:e.evalsgnt})]}),o(`tr`,{children:[a(`td`,{class:`title`,children:`最近一期审计基准日`}),a(`td`,{class:`info`,colspan:`3`,children:e.lastestAuditEndDate})]})]})})]}));export{c as route};