import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";const n={path:`/news`,categories:[`bbs`],example:`/xiaote/news`,parameters:{},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`xiaote.com/`]}],name:`首页帖子`,maintainers:[`wxsimon`],handler:r,url:`xiaote.com/`};async function r(){let{data:n}=await t.post(`https://lcen.xiaote.net//api/graphql/`,{json:{query:`query($startCursor: Int) {
                communities(startCursor: $startCursor) {
                    edges {
                        node {
                            objectId
                            content
                            createdAt
                            imageUrls
                            user{
                                nickname
                            }
                    }
                }
              }
            }`}});return{title:`小特社区`,link:`https://xiaote.com/`,item:n.data.communities.edges.map(t=>{let n=t.node,r=n.content;if(n.imageUrls)for(let e of n.imageUrls)r+=`<img src="${e}">`;return{title:n.content,link:`https://www.xiaote.com/r/${n.objectId}`,description:r,pubDate:e(n.createdAt*1e3),author:n.user.nickname}})}}export{n as route};