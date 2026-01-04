import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./got-CKQ7C9HX.mjs";const t={path:`/bookstore/newest`,categories:[`social-media`],example:`/zhihu/bookstore/newest`,parameters:{},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!0,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`知乎书店 - 新书`,maintainers:[`xyqfer`],handler:n};async function n(){return{title:`知乎书店-新书抢鲜`,link:`https://www.zhihu.com/pub/features/new`,item:(await e({method:`get`,url:`https://api.zhihu.com/books/features/new`})).data.data.map(e=>{let t=e.authors.map(e=>e.name).join(`、`);return{title:e.title,link:e.url,description:`
          <img src="${e.cover.replaceAll(/_.+\.jpg/g,`.jpg`)}"><br>
          <strong>${e.title}</strong><br>
          作者: ${t}<br><br>
          ${e.description}<br><br>
          价格: ${e.promotion.price/100}元
        `}})}}export{t as route};