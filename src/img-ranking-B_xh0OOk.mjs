import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import"./parse-date-DjdQS_Nt.mjs";import{t as e}from"./got-CKQ7C9HX.mjs";import"./description-ysUMLo8r.mjs";import{t}from"./utils-DTPoD2K3.mjs";const n={bh2:{title:`崩坏学园2`,gids:3,default_forum:`tongren`,default_ranking_type:`weekly`,forums:{tongren:{title:`同人`,forum_id:40}}},bh3:{title:`崩坏3`,gids:1,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:4,default_cate:`illustration`,cates:{comic:{title:`漫画`,cate_id:3},illustration:{title:`插画`,cate_id:4},cos:{title:`COS`,cate_id:17}}}}},ys:{title:`原神`,gids:2,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:29,default_cate:`illustration`,cates:{manual:{title:`手工`,cate_id:1},qute:{title:`Q版`,cate_id:2},comic:{title:`漫画`,cate_id:3},illustration:{title:`插画`,cate_id:4}}},cos:{title:`COS`,forum_id:49}}},wd:{title:`未定事件簿`,gids:4,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:38}}},sr:{title:`崩坏：星穹铁道`,gids:6,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:56}}},zzz:{title:`绝区零`,gids:8,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:59}}},dby:{title:`大别野`,gids:5,default_forum:`tongren`,forums:{tongren:{title:`同人`,forum_id:39},cos:{title:`COS`,forum_id:47}}}},r={daily:{id:1,title:`日榜`},weekly:{id:2,title:`周榜`},monthly:{id:3,title:`月榜`}},i=e=>({gids:n[e]?.gids,title:n[e]?.title}),a=(e,t)=>{t=t||n[e]?.default_forum||`tongren`;let r=n[e]?.forums?.[t];return{forum_id:r?.forum_id,title:`${r?.title}榜`}},o=(e,t,r)=>{t=t||n[e]?.default_forum||`tongren`;let i=n[e]?.forums?.[t],a=i?.default_cate;return a?(r||=a,{title:`${i?.cates?.[r]?.title}榜`,cate_id:i?.cates?.[r]?.cate_id}):{title:``,cate_id:`0`}},s=(e,t)=>(t=t||n[e]?.default_ranking_type||`daily`,{id:r[t]?.id,title:r[t]?.title}),c={path:`/bbs/img-ranking/:game/:routeParams?`,categories:[`game`],example:`/mihoyo/bbs/img-ranking/ys/forumType=tongren&cateType=illustration&rankingType=daily`,parameters:{game:`游戏缩写`,routeParams:`额外参数；请参阅以下说明和表格`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`miyoushe.com/:game/imgRanking/:forum_id/:ranking_id/:cate_id`],target:`/bbs/img-ranking/:game`}],name:`米游社 - 同人榜`,maintainers:[`CaoMeiYouRen`],handler:l,description:`| 键          | 含义                                  | 接受的值                                                             | 默认值       |
| ----------- | ------------------------------------- | -------------------------------------------------------------------- | ------------ |
| forumType   | 主榜类型（仅原神、大别野有 cos 主榜） | tongren/cos                                                          | tongren      |
| cateType    | 子榜类型（仅崩坏三、原神有子榜）      | 崩坏三：illustration/comic/cos；原神：illustration/comic/qute/manual | illustration |
| rankingType | 排行榜类型（崩坏二没有日榜）          | daily/weekly/monthly                                                 | daily        |
| lastId      | 当前页 id（用于分页）                 | 数字                                                                 | 1            |

  游戏缩写

| 崩坏三 | 原神 | 崩坏二 | 未定事件簿 | 星穹铁道 | 大别野 | 绝区零 |
| ------ | ---- | ------ | ---------- | -------- | ------ | ------ |
| bh3    | ys   | bh2    | wd         | sr       | dby    | zzz    |

  主榜类型

| 同人榜  | COS 榜 |
| ------- | ------ |
| tongren | cos    |

  子榜类型

  崩坏三 子榜

| 插画         | 漫画  | COS |
| ------------ | ----- | --- |
| illustration | comic | cos |

  原神 子榜

| 插画         | 漫画  | Q 版 | 手工   |
| ------------ | ----- | ---- | ------ |
| illustration | comic | qute | manual |

  排行榜类型

| 日榜  | 周榜   | 月榜    |
| ----- | ------ | ------- |
| daily | weekly | monthly |`};async function l(n){let r=n.req.param(`game`),{forumType:c=`tongren`,cateType:l,rankingType:u,lastId:d=``}=Object.fromEntries(new URLSearchParams(n.req.param(`routeParams`))),f=n.req.query(`limit`)||`20`,{gids:p,title:m}=i(r);if(!p)throw Error(`未知的游戏！`);let{forum_id:h,title:g}=a(r,c);if(!h)throw Error(`${m} 的排行榜不存在！`);let{cate_id:_,title:v}=o(r,c,l),{id:y,title:b}=s(r,u),x=`https://bbs-api.miyoushe.com/post/wapi/getImagePostList?${new URLSearchParams({gids:p,forum_id:h,cate_id:_,type:y,page_size:f,last_id:d}).toString()}`,S=(await e({method:`get`,url:x}))?.data?.data?.list;if(!S)throw Error(`未获取到数据！`);return{title:`米游社-${m}-${g}${v?`-${v}`:``}-${b}`,link:x,item:S.map(e=>t(e))}}export{c as route};