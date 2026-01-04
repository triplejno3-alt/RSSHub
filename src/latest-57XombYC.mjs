import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./parse-date-DjdQS_Nt.mjs";import{n as t,r as n,t as r}from"./utils-ls53K0so.mjs";const i={path:`/latest/:type?`,name:`Latest, heat, essence`,example:`/matters/latest/heat`,parameters:{uid:`Defaults to latest, see table below`},maintainers:[`xyqfer`,`Cerebrater`,`xosdy`],handler:async i=>{let{type:a=`latest`}=i.req.param(),o=i.req.query(`limit`)?Number.parseInt(i.req.query(`limit`),10):20,s={latest:{title:`最新`,apiType:`newest`},heat:{title:`熱議`,apiType:`hottest`},essence:{title:`精華`,apiType:`icymi`}},c=(await e(t,{method:`POST`,body:{query:`{
                viewer {
                  recommendation {
                    feed: ${s[a].apiType}(input: {first: ${o}}) {
                      edges {
                        node {
                          shortHash
                          title
                          content
                          createdAt
                          author {
                            displayName
                          }
                          tags {
                            content
                          }
                        }
                      }
                    }
                  }
                }
              }`}})).data.viewer.recommendation.feed.edges.map(({node:e})=>n(e));return{title:`Matters | ${s[a].title}`,link:r,item:c}},radar:[{source:[`matters.town`]}],description:`| 最新   | 热门 | 精华    |
| ------ | ---- | ------- |
| latest | heat | essence |`};export{i as route};