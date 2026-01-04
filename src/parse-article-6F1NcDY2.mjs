import{t as e}from"./config-Cc-zZ5p-.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{load as r}from"cheerio";async function i(e,t){let{data:r}=await n(`https://medium.com/_/graphql`,{method:`POST`,headers:{accept:`*/*`,"accept-language":`en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7`,"apollographql-client-name":`lite`,"apollographql-client-version":`main-20240329-011934-2370d8b72b`,"cache-control":`no-cache`,"content-type":`application/json`,"medium-frontend-app":`lite/main-20240329-011934-2370d8b72b`,"medium-frontend-path":`/`,"medium-frontend-route":`homepage`,"ot-tracer-sampled":`true`,"ot-tracer-spanid":`26b843316dc9494d`,"ot-tracer-traceid":`c84ea9154765033`,pragma:`no-cache`,"sec-ch-ua":`"Chromium";v="123", "Not:A-Brand";v="8"`,"sec-ch-ua-mobile":`?0`,"sec-ch-ua-platform":`"macOS"`,"sec-fetch-dest":`empty`,"sec-fetch-mode":`cors`,"sec-fetch-site":`same-origin`,"graphql-operation":e.operationName,cookie:t},body:JSON.stringify([e])});return r[0].data}async function a(e,t,n=20){return(await i(l(n),t))?.followingFeed}async function o(e,t,n=20){return(await i(u(n),t))?.webRecommendedFeed}async function s(e,t,n,r=20){return(await i(d(t,r),n))?.personalisedTagFeed}async function c(e,t,n,r=20){return(await i(f(t,r),n))?.catalogById}function l(e=5){return{operationName:`LegacyFollowingFeedQuery`,variables:{paging:{limit:e}},query:`query LegacyFollowingFeedQuery($paging: PagingOptions) {
            followingFeed(paging: $paging) {
              items {
                feedId
                post {
                  mediumUrl
                  __typename
                }
                __typename
              }
              pagingInfo {
                next {
                  to
                  from
                  limit
                  source
                  __typename
                }
                __typename
              }
              __typename
            }
        }`}}function u(e=5){return{operationName:`LegacyWebInlineRecommendedFeedQuery`,variables:{forceRank:!0,paging:{limit:e}},query:`query LegacyWebInlineRecommendedFeedQuery($paging: PagingOptions, $forceRank: Boolean) {
            webRecommendedFeed(paging: $paging, forceRank: $forceRank) {
              items {
                feedId
                post {
                  mediumUrl
                  __typename
                }
                __typename
              }
              pagingInfo {
                next {
                  limit
                  to
                  source
                  __typename
                }
                __typename
              }
              __typename
            }
        }`}}function d(e,t=5){return{operationName:`LegacyWebInlineTopicFeedQuery`,variables:{tagSlug:e,paging:{limit:t},skipCache:!0},query:`query LegacyWebInlineTopicFeedQuery($tagSlug: String!, $paging: PagingOptions!, $skipCache: Boolean) {
            personalisedTagFeed(tagSlug: $tagSlug, paging: $paging, skipCache: $skipCache) {
              items {
                feedId
                post {
                  mediumUrl
                  __typename
                }
                __typename
              }
              pagingInfo {
                next {
                  source
                  limit
                  from
                  to
                  __typename
                }
                __typename
              }
              __typename
            }
        }`}}function f(e,t=20){return{operationName:`UserCatalogMainContentQuery`,variables:{catalogId:e,pagingOptions:{limit:t}},query:`query UserCatalogMainContentQuery($catalogId: ID!, $pagingOptions: CatalogPagingOptionsInput!) {
            catalogById(catalogId: $catalogId) {
              __typename
              ... on Catalog {
                name
                itemsConnection(pagingOptions: $pagingOptions) {
                  items {
                    entity {
                      ... on Post {
                        mediumUrl
                      }
                    }
                    __typename
                  }
                  __typename
                }
              }
            }
          }`}}async function p(e,t=``){let{data:i}=await n(e,{headers:{cookie:t}}),a=r(i),o=a(`meta[property="article:published_time"]`).attr(`content`),s=a(`meta[name="author"]`).attr(`content`),c=a(`body article`);c.find(`header`).remove();let l=c.find(`h1`).first(),u=l.text();l.remove();let d=c.find(`.pw-subtitle-paragraph`),f=d.text();return d.length===0?c.find(`.pw-post-body-paragraph`).siblings().first().remove():d.siblings().remove(),{title:u,subtitle:f,author:s,publishedTime:o,html:c.html(),url:e}}function m(n,r){return t.tryGet(`medium:article:${r}`,async()=>{let{title:t,author:n,publishedTime:i,html:a}=await p(r,e.medium.articleCookie);return{title:t,author:n,link:r,description:a,pubDate:i}})}export{s as a,o as i,a as n,c as r,m as t};