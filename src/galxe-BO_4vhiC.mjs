import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";const n={path:`/quest/:alias`,name:`Quest`,url:`app.galxe.com`,maintainers:[`cxheng315`],example:`/galxe/quest/MissionWeb3`,categories:[`other`],features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`app.galxe.com/quest/:alias`],target:`/quest/:alias`}],handler:r};async function r(n){let r=n.req.param(`alias`),i=(await e(`https://graphigo.prd.galaxy.eco/query`,{method:`POST`,headers:{"Content-Type":`application/json`},body:{variables:{alias:r,campaignInput:{first:n.req.query(`limit`)?Number.parseInt(n.req.query(`limit`)):50,excludeChildren:!0,listType:`Newest`}},query:`
                query BrowseSpaceCampaigns($id: Int, $alias: String, $campaignInput: ListCampaignInput!) {
                    space(id: $id, alias: $alias) {
                        id
                        name
                        alias
                        info
                        campaigns(input: $campaignInput) {
                            list {
                                startTime
                                endTime
                                id
                                name
                                description
                                __typename
                            }
                            pageInfo {
                                endCursor
                                hasNextPage
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }
            `}})).data.space,a=i.campaigns.list.map(e=>({title:e.name,link:`https://app.galxe.com/quest/${r}/${e.id}`,description:e.description,pubDate:e.startTime?t(e.startTime*1e3):null}));return{title:i.name,description:i.info,link:`https://app.galxe.com/quest/${r}`,item:a,author:i.alias}}export{n as route};