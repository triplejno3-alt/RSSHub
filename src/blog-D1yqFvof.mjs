import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{Fragment as n,jsx as r,jsxs as i}from"hono/jsx/jsx-runtime";import{renderToString as a}from"hono/jsx/dom/server";import{raw as o}from"hono/html";const s=(e,t)=>a(i(n,{children:[r(`img`,{src:e}),t?r(n,{children:o(t)}):null]})),c={path:`/blog/:username`,categories:[`blog`],example:`/hashnode/blog/inklings`,parameters:{username:`博主名称，用户头像 URL 中找到`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`hashnode.dev/`]}],name:`用户博客`,maintainers:[`hnrainll`],handler:l,url:`hashnode.dev/`,description:"::: tip\n  username 为博主用户名，而非`xxx.hashnode.dev`中`xxx`所代表的 blog 地址。\n:::"};async function l(n){let r=n.req.param(`username`);if(!r)return;let i=`
    {
        user(username: "${r}") {
            publication {
                posts{
                    slug
                    title
                    brief
                    coverImage
                    dateAdded
                }
            }
        }
    }
    `,a=`https://${r}.hashnode.dev`,o=(await t({method:`POST`,url:`https://api.hashnode.com`,headers:{Referer:a,"Content-type":`application/json`},body:JSON.stringify({query:i})})).data.data.user.publication;if(!o)return;let c=o.posts;return{title:`Hashnode by ${r}`,link:a,item:c.map(t=>({title:t.title,description:s(t.coverImage,t.brief),pubDate:e(t.dateAdded),link:`${a}/${t.slug}`})).filter(e=>e!==``)}}export{c as route};