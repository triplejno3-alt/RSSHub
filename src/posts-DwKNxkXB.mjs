import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import"./got-CKQ7C9HX.mjs";import{t as n}from"./types-Bl_lnefZ.mjs";import{a as r,i,o as a,t as o}from"./utils-ZvzRBK0Y.mjs";import s from"node:querystring";const c={path:`/profile/:handle/:routeParams?`,categories:[`social-media`],view:n.SocialMedia,example:`/bsky/profile/bsky.app`,parameters:{handle:`User handle, can be found in URL`,routeParams:`Filter parameter, Use filter to customize content types`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`bsky.app/profile/:handle`]}],name:`Post`,maintainers:[`TonyRL`],handler:l,description:`
| Filter Value | Description |
|--------------|-------------|
| posts_with_replies | Includes Posts, Replies, and Reposts |
| posts_no_replies | Includes Posts and Reposts, without Replies |
| posts_with_media | Shows only Posts containing media |
| posts_and_author_threads | Shows Posts and Threads, without Replies and Reposts |

Default value for filter is \`posts_and_author_threads\` if not specified.

Example:
- \`/bsky/profile/bsky.app/filter=posts_with_replies\``};async function l(n){let c=n.req.param(`handle`),l=s.parse(n.req.param(`routeParams`)).filter||`posts_and_author_threads`,u=await r(c,e.tryGet),d=await i(u,e.tryGet),f=await o(u,l,e.tryGet),p=f.feed.map(({post:e})=>({title:e.record.text.split(`
`)[0],description:a({text:e.record.text.replaceAll(`
`,`<br>`),embed:e.embed}),author:e.author.displayName,pubDate:t(e.record.createdAt),link:`https://bsky.app/profile/${e.author.handle}/post/${e.uri.split(`app.bsky.feed.post/`)[1]}`,upvotes:e.likeCount,comments:e.replyCount}));return n.set(`json`,{DID:u,profile:d,authorFeed:f}),{title:`${d.displayName} (@${d.handle}) — Bluesky`,description:d.description?.replaceAll(`
`,` `),link:`https://bsky.app/profile/${d.handle}`,image:d.avatar,icon:d.avatar,logo:d.avatar,item:p,allowEmpty:!0}}export{c as route};