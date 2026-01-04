import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t}from"./cache-DLkCV5c7.mjs";import{t as n}from"./parse-date-DjdQS_Nt.mjs";import{jsx as r,jsxs as i}from"hono/jsx/jsx-runtime";import{renderToString as a}from"hono/jsx/dom/server";const o={path:`/user/sheets/:username/:iso?/:freeOnly?`,categories:[`shopping`],example:`/mymusicsheet/user/sheets/HalcyonMusic/USD/1`,parameters:{username:`Username, can be found in the URL`,iso:"ISO 4217 currency code for displaying prices, defaults to `USD`",freeOnly:`Only return free scores, any value to enable`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`mymusicfive.com/:username/*`,`mymusicfive.com/:username`],target:`/user/sheets/:username`}],name:`User Sheets`,maintainers:[`Freddd13`],handler:s,description:`Please refer to [Wikipedia](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) for ISO 4217.`};async function s(i){let o=`https://mms.pd.mapia.io/mms/graphql`,{username:s,iso:l=`USD`,freeOnly:u}=i.req.param(),d=await t.tryGet(`mymusicfive:exchangeRate`,()=>e(`https://payport.pd.mapia.io/v2/currency`,{query:{serviceProvider:`mms`,"ngsw-bypass":!0,"no-cache":Date.now(),skipHeaders:!0}})),f=(await t.tryGet(`mymusicfive:artistInfo:${s}`,()=>e(o,{method:`POST`,body:{operationName:`ArtistDetailLoadUser`,query:`
              query ArtistDetailLoadUser($artistUrl: String!) {
                user(artistUrl: $artistUrl) {
                  coverUrl
                  coverImageMeta {
                    isDark
                    isLight
                    startRgba: rgba(opacity: 1)
                    endRgba: rgba(opacity: 0.24)
                  }
                  createdAt
                  instruments
                  userId
                  name
                  profileUrl
                  iamUuid
                  artistUrl
                  profileImageMeta {
                    startRgba: rgba(opacity: 1)
                    endRgba: rgba(opacity: 0.24)
                    hex
                    isDark
                  }
                  social {
                    type
                    url
                  }
                  sheetsCount
                  isArtist
                  isOfficial
                  likes
                  seoInfo {
                    title
                    description
                    keywords
                    imageUrl
                  }
                  uploadedInstrumentGroups {
                    name
                    instruments {
                      name
                    }
                  }
                }
              }`,variables:{artistUrl:s}}}))).data.user,p=(await e(o,{method:`POST`,body:{operationName:`loadArtistSheets`,query:`
          query loadArtistSheets($data: SheetSearchInput!) {
            sheetSearch(data: $data) {
              list {
                productId
                productType
                metaSong
                metaMaker
                metaMusician
                metaMemo
                instruments
                createdAt
                level
                price
                sheetId
                status
                author {
                  name
                  artistUrl
                  profileUrl
                }
                youtubeId
                title
                supportCountry
                excludeCountries
                __typename
              }
              total
              current
              listNum
            }
          }`,variables:{data:{listNum:10,paginate:`page`,includeChord:null,includeLyrics:null,page:1,level:null,instruments:[],orderBy:{createdAt:`DESC`},isFree:u?!0:null,category:null,artistUrl:s,aggregationKeywords:[`PACKAGE_IDS`,`TAG_IDS`,`INSTRUMENTS`,`SHEET_TYPE`,`INCLUDE_CHORD`,`INCLUDE_LYRICS`,`INSTRUMENTATION`,`LEVEL`,`CATEGORY`],aggregationKeySize:20}}}})).data.sheetSearch.list.map(e=>{let t=`Unknown`,i=Number.parseFloat(e.price);if(e.price===0)t=`Free`;else if(!Number.isNaN(i)&&Number.isFinite(i)){let e=Number.parseFloat(d[l]);e&&(t=`${(i*e).toFixed(2)} ${l}`)}let o=e.youtubeId,u={musicName:e.metaSong,musicMemo:e.metaMemo,musicianName:e.metaMusician,instruments:e.instruments,status:e.status,price:t};return{title:`${e.title} | ${t}`,link:`https://www.mymusicfive.com/${s}/${e.sheetId}`,guid:`https://www.mymusicsheet.com/${s}/${e.sheetId}`,itunes_item_image:e.author.profileUrl,description:a(r(c,{youtubeId:o,content:u})),author:e.author.name,pubDate:n(e.createdAt)}});return{title:f.seoInfo.title||`${f.name}'s Music Sheets`,description:f.seoInfo.description,image:f.profileUrl,link:`https://www.mymusicfive.com/${s}?viewType=sheet&orderBy=createdAt`,item:p}}const c=({youtubeId:e,content:t})=>i(`div`,{class:`item-description`,children:[e?r(`iframe`,{id:`ytplayer`,type:`text/html`,width:`640`,height:`360`,src:`https://www.youtube-nocookie.com/embed/${e}?autoplay=0`,frameborder:`0`,allowfullscreen:!0,referrerpolicy:`strict-origin-when-cross-origin`}):null,t.musicName?i(`p`,{children:[`Music Name: `,t.musicName]}):null,t.musicMemo?i(`p`,{children:[`Music Memo: `,t.musicMemo]}):null,t.musicianName?i(`p`,{children:[`Musician Name: `,t.musicianName]}):null,t.instruments&&t.instruments.length?i(`p`,{children:[`Instruments:`,t.instruments.map(e=>` ${e}`)]}):null,t.status?i(`p`,{children:[`Status: `,t.status]}):null,t.price?i(`p`,{children:[`Price: `,t.price]}):null]});export{o as route};