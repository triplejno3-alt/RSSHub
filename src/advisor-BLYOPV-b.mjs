import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{t as r}from"./got-CKQ7C9HX.mjs";import{load as i}from"cheerio";const a={path:`/advisor/data/:type?/:category?`,categories:[`programming`],example:`/github/advisor/data/reviewed/composer`,features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`github.com/advisories`,`github.com`]}],name:`Github Advisory Database RSS`,maintainers:[`sd0ric4`],handler:o,description:`
| Type | Description | Explanation |
| --- | --- | --- |
| reviewed | Reviewed | 已审核 |
| unreviewed | Unreviewed | 未审核 |

| Category | Description | Explanation |
| --- | --- | --- |
| composer | Composer | PHP 依赖管理工具 |
| go | Go | Go 语言包管理工具 |
| maven | Maven | Java 项目管理工具 |
| npm | NPM | Node.js 包管理工具 |
| nuget | NuGet | .NET 包管理工具 |
| pip | Pip | Python 包管理工具 |
| pub | Pub | Dart 包管理工具 |
| rubygems | RubyGems | Ruby 包管理工具 |
| rust | Rust | Rust 包管理工具 |
| erlang | Erlang | Erlang 包管理工具 |
| actions | Actions | GitHub Actions |
| swift | Swift | Swift 包管理工具 |`};async function o(a){let{category:o,type:s}=a.req.param(),c=i((await r({method:`get`,url:`https://github.com/advisories?query=type%3A${s}+ecosystem%3A${o}`})).data),l=c(`div.Box-row`).toArray().map(e=>{e=c(e);let t=e.find(`a.Link--primary`),r=e.find(`relative-time`).attr(`datetime`),i=t.text()||`No title`,a=t.attr(`href`)||`#`,o=n(r||``);return{title:i,link:`https://github.com${a}`,pubDate:o,description:``}}),u=await Promise.all(l.map(n=>t.tryGet(n.link,async()=>(n.description=i(await e(n.link))(`.comment-body`).first().html()||``,n))));return{title:`GitHub Advisory Database RSS - ${o} - ${s}`,link:`https://github.com/advisories`,item:u}}export{a as route};