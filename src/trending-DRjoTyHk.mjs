import"./ofetch-uhy-qh6X.mjs";import{t as e}from"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{t as n}from"./types-Bl_lnefZ.mjs";import{t as r}from"./config-not-found-DGyG6Tbz.mjs";import{Fragment as i,jsx as a,jsxs as o}from"hono/jsx/jsx-runtime";import{load as s}from"cheerio";import{renderToString as c}from"hono/jsx/dom/server";import{raw as l}from"hono/html";const u={path:`/trending/:since/:language/:spoken_language?`,categories:[`programming`],example:`/github/trending/daily/javascript/en`,view:n.Notifications,parameters:{since:{description:`time range`,options:[{value:`daily`,label:`Today`},{value:`weekly`,label:`This week`},{value:`monthly`,label:`This month`}]},language:{description:"the feed language, available in [Trending page](https://github.com/trending/javascript?since=monthly) 's URL, don't filter option is `any`",default:`any`},spoken_language:{description:`natural language, available in [Trending page](https://github.com/trending/javascript?since=monthly) 's URL`}},features:{requireConfig:[{name:`GITHUB_ACCESS_TOKEN`,description:``}],requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`github.com/trending`],target:`/trending/:since`}],name:`Trending`,maintainers:[`DIYgod`,`jameschensmith`],handler:d,url:`github.com/trending`};async function d(n){if(!e.github||!e.github.access_token)throw new r(`GitHub trending RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);let u=n.req.param(`since`),d=n.req.param(`language`)===`any`?``:n.req.param(`language`),f=n.req.param(`spoken_language`)??``,p=`https://github.com/trending/${encodeURIComponent(d)}?since=${u}&spoken_language_code=${f}`,{data:m}=await t({method:`get`,url:p,headers:{Referer:p}}),h=s(m),g=h(`article`).toArray().map(e=>{let[t,n]=h(e).find(`h2`).text().split(`/`);return{name:n.trim(),owner:t.trim()}}),{data:_}=await t({method:`post`,url:`https://api.github.com/graphql`,headers:{Authorization:`bearer ${e.github.access_token}`},json:{query:`
            query {
            ${g.map((e,t)=>`
                _${t}: repository(owner: "${e.owner}", name: "${e.name}") {
                    ...RepositoryFragment
                }
            `).join(`
`)}
            }

            fragment RepositoryFragment on Repository {
                description
                forkCount
                nameWithOwner
                openGraphImageUrl
                primaryLanguage {
                    name
                }
                stargazerCount
            }
            `}}),v=Object.values(_.data).map(e=>({...g.find(t=>`${t.owner}/${t.name}`===e.nameWithOwner),...e}));return{title:h(`title`).text(),link:p,item:v.map(e=>({title:e.nameWithOwner,author:e.owner,description:c(o(i,{children:[a(`img`,{src:e.openGraphImageUrl}),a(`br`,{}),e.description?l(e.description):null,a(`br`,{}),a(`br`,{}),`Language: `,l(e.primaryLanguage?.name||`Unknown`),a(`br`,{}),`Stars: `,l(String(e.stargazerCount)),a(`br`,{}),`Forks: `,l(String(e.forkCount))]})),link:`https://github.com/${e.nameWithOwner}`}))}}export{u as route};