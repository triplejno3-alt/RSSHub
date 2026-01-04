import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{Fragment as t,jsx as n,jsxs as r}from"hono/jsx/jsx-runtime";import{renderToString as i}from"hono/jsx/dom/server";const a={0:`Community`,1:`Microtransaction`,2:`Collection`,3:`Art`,4:`Video`,5:`Screenshot`,6:`Game`,7:`Software`,8:`Concept`,9:`WebGuide`,10:`IntegratedGuide`,11:`Merch`,12:`ControllerBinding`,13:`SteamworksAccessInvite`,14:`SteamVideo`,15:`GameManagedItem`},o={path:`/appcommunityfeed/:appid/:routeParams?`,categories:[`game`],example:`/steam/appcommunityfeed/730`,parameters:{appid:`Steam appid, can be found on the community hub page or store page URL.`,routeParams:`Query parameters.`},radar:[{title:`Community Hub`,source:[`steamcommunity.com/app/:appid`],target:`/appcommunityfeed/:appid`},{title:`Community Hub`,source:[`store.steampowered.com/app/:appid/*/`],target:`/appcommunityfeed/:appid`}],description:`Query Parameters:

| Name                   | Type   | Description             |
| ---------------------- | ------ | ----------------------- |
| p                      | string | p                       |
| rgSections[]           | string | rgSections              |
| filterLanguage         | string | Filter Language         |
| languageTag            | string | Language Tag            |
| nMaxInappropriateScore | string | Max Inappropriate Score |

Example:
- \`/appcommunityfeed/730/p=1&rgSections[]=2&rgSections[]=4&filterLanguage=english&languageTag=english&nMaxInappropriateScore=1\` for CS2 Screenshot and Artwork contents.
- \`/appcommunityfeed/730/rgSections[]=6\` for CS2 Workshop contents only.
- \`/appcommunityfeed/570/rgSections[]=3&rgSections[]=9\` for Dota2 Video and Guides contents.

::: tip
It can also access community hub contents that require a logged-in account.
:::
`,name:`Steam Community Hub Feeds`,maintainers:[`NyaaaDoge`],handler:async t=>{let{appid:r=730,routeParams:o}=t.req.param(),c=await e(`https://steamcommunity.com/library/appcommunityfeed/${r}${o?`?${o}`:``}`);return{title:`${r} Steam Community Hub`,link:`https://steamcommunity.com/app/${r}`,item:c.hub.map(e=>({title:e.title===``?a[e.type]:e.title,link:`https://steamcommunity.com/sharedfiles/filedetails/?id=${e.published_file_id}`,description:i(n(s,{image:e.full_image_url,description:e.description})),author:e.creator.name,category:a[e.type]}))}}},s=({image:e,description:i})=>r(t,{children:[e?n(`img`,{src:e}):null,n(`p`,{children:i})]});export{o as route};