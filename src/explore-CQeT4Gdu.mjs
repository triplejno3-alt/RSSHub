import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./got-CKQ7C9HX.mjs";const t={所有:``,绘画:`1d2c1ac230dd11e88a2052540025c377`,视频:`68cf9fc630dd11e8aca852540025c377`,写作:`9db3776230dd11e89c6c52540025c377`,游戏:`ed45455e30dc11e89fd452540025c377`,音乐:`f89c99b22e6f11e8940c52540025c377`,播客:`5378451a30dd11e8bd4f52540025c377`,摄影:`ffa47c662e6f11e8b26952540025c377`,技术:`f62d3e58c39211e88abd52540025c377`,Vtuber:`e4f952e865cc11e98fb252540025c377`,舞蹈:`98a30fda836b11e9bbf152540025c377`,体育:`f2212a3c836c11e9842d52540025c377`,旅游:`3935643c836e11e98cc552540025c377`,美食:`c8d2eaae837011e9bfb652540025c377`,时尚:`05e960f6837311e9984952540025c377`,数码:`d6163d8c837611e98ac352540025c377`,动画:`67498b10837711e99f0652540025c377`,其他:`b1643af4328011e8b5b152540025c377`},n={rec:`推荐`,hot:`人气`},r={path:`/explore/:type/:category?`,categories:[`other`],example:`/afdian/explore/hot/所有`,parameters:{type:`分类`,category:"目录类型，默认为 `所有`"},name:`发现用户`,maintainers:[`sanmmm`],description:`分类

| 推荐 | 最热 |
| ---- | ---- |
| rec  | hot  |

  目录类型

| 所有 | 绘画 | 视频 | 写作 | 游戏 | 音乐 | 播客 | 摄影 | 技术 | Vtuber | 舞蹈 | 体育 | 旅游 | 美食 | 时尚 | 数码 | 动画 | 其他 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ------ | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 所有 | 绘画 | 视频 | 写作 | 游戏 | 音乐 | 播客 | 摄影 | 技术 | Vtuber | 舞蹈 | 体育 | 旅游 | 美食 | 时尚 | 数码 | 动画 | 其他 |`,handler:i};async function i(r){let{type:i=`rec`,category:a=`所有`}=r.req.param(),o=`https://afdian.com`,s=(await e(`${o}/api/creator/list`,{searchParams:{type:i,category_id:t[a]}})).data.data.list.map(e=>{let{doing:t,monthly_fans:n,detail:r}=e.creator;return{title:e.name,description:`正在创作 ${t}<br/>
            ${n}发电人次/月<br/>
            详情:<br/>
            ${r}<br/>
            `,link:`${o}/@${e.url_slug}`}});return{title:`爱发电-创作者 (按 ${a}/${n[i]})`,description:`爱发电-发现创作者 (按 ${a}/${n[i]})`,link:`${o}/explore`,item:s}}export{r as route};