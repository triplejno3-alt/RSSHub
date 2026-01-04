import"./ofetch-uhy-qh6X.mjs";import{t as e}from"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./config-not-found-DGyG6Tbz.mjs";import{load as i}from"cheerio";import{JSDOM as a}from"jsdom";const o={path:`/tag/:name?/:type?`,categories:[`social-media`],example:`/lofter/tag/cosplay/date`,parameters:{name:"tag name, such as `名侦探柯南`, `摄影` by default",type:`ranking type, see below, new by default`},features:{requireConfig:[{name:`LOFTER_COOKIE`,description:`LOFTER_COOKIE: 用于搜索标签相关内容，获取方式：
    1.  登录 Lofter 并搜索任一标签，进入页面 https://www.lofter.com/tag/*
    2.  打开控制台，切换到 Network 面板，刷新
    3.  点击 TagBean.seach.dwr 请求，找到 Cookie
    4.  获取最新标签内容只要求 \`LOFTER_SESS\` 开始的字段`}],requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Tag`,maintainers:[`hoilc`,`nczitzk`,`LucunJi`],handler:s,description:`::: warning
  搜索标签下的最新内容需要 Lofter 登录后的 Cookie 值，所以只能自建，详情见部署页面的配置模块。
:::

| new  | date | week | month | total |
| ---- | ---- | ---- | ----- | ----- |
| 最新 | 日榜 | 周榜 | 月榜  | 总榜  |`};async function s(o){let s=o.req.param(`name`)??`摄影`,c=o.req.param(`type`)??`new`,l=`https://www.lofter.com`,u=`${l}/tag/${s}/${c}`,d=`${l}/dwr/call/plaincall/TagBean.search.dwr`,f=e.lofter.cookies;if(f===void 0)throw new r(`Lofter 用户登录后的 Cookie 值`);let p=new a(`<script>if (dwr == null) var dwr = {};
        if (dwr.engine == null) dwr.engine = {};
        dwr.engine._remoteHandleCallback = function () {
            this.data = arguments;
        };
        ${(await n({method:`post`,url:d,body:new URLSearchParams({callCount:1,scriptSessionId:"${scriptSessionId}187",httpSessionId:``,"c0-scriptName":`TagBean`,"c0-methodName":`search`,"c0-id":`0`,"c0-param0":`string:${encodeURI(s)}`,"c0-param1":`number:0`,"c0-param2":`string:`,"c0-param3":`string:${c}`,"c0-param4":`boolean:false`,"c0-param5":`number:0`,"c0-param6":`number:20`,"c0-param7":`number:0`,"c0-param8":`number:0`,batchId:493053}),headers:{Referer:`https://www.lofter.com/tag/${encodeURI(s)}`,Cookie:f}})).data}<\/script>`,{runScripts:`dangerously`}).window.dwr.engine.data[2],m={new:`最新`,date:`日榜`,week:`周榜`,month:`月榜`,total:`最热`}[c]??``,h=p.map(e=>{let n=e.post,r=``;if(n.embed){let e=JSON.parse(n.embed);(e.h256Url||e.video_down_url)&&(r=`<video src="${e.h256Url??e.video_down_url}" poster="${e.video_img_url??``}" controls="controls"></video>`)}let a=n.photoLinks?JSON.parse(n.photoLinks).reduce((e,t)=>e+`<img src="${t.orign}"/>`,``):``,o=i(n.digest),s=o.text();return{author:n.blogInfo.blogNickName,link:n.blogPageUrl,title:n.title||`${n.blogInfo.blogNickName}${s?`：${s}`:``}`,pubDate:t(n.publishTime),description:r+a+o.html(),category:n.tagList}});return{title:`${s} - ${m} | LOFTER`,link:u,item:h}}export{o as route};