import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";import{load as n}from"cheerio";const r={path:`/blog/:id?/:page?`,categories:[`new-media`],example:`/hinatazaka46/blog`,parameters:{id:"Member ID, see below, `all` by default",page:"Page, `0` by default"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Hinatazaka46 Blog 日向坂 46 博客`,maintainers:[],handler:i,description:`Member ID

| Member ID | Name         |
| --------- | ------------ |
| 2000      | 四期生リレー |
| 36        | 渡辺 莉奈    |
| 35        | 山下 葉留花  |
| 34        | 宮地 すみれ  |
| 33        | 藤嶌 果歩    |
| 32        | 平岡 海月    |
| 31        | 平尾 帆夏    |
| 30        | 竹内 希来里  |
| 29        | 正源司 陽子  |
| 28        | 清水 理央    |
| 27        | 小西 夏菜実  |
| 26        | 岸 帆夏      |
| 25        | 石塚 瑶季    |
| 24        | 山口 陽世    |
| 23        | 森本 茉莉    |
| 22        | 髙橋 未来虹  |
| 21        | 上村 ひなの  |
| 18        | 松田 好花    |
| 17        | 濱岸 ひより  |
| 16        | 丹生 明里    |
| 15        | 富田 鈴花    |
| 14        | 小坂 菜緒    |
| 13        | 河田 陽菜    |
| 12        | 金村 美玖    |
| 11        | 東村 芽依    |
| 10        | 高本 彩花    |
| 9         | 高瀬 愛奈    |
| 8         | 佐々木 美玲  |
| 7         | 佐々木 久美  |
| 6         | 齊藤 京子    |
| 5         | 加藤 史帆    |
| 4         | 影山 優佳    |
| 2         | 潮 紗理菜    |`};async function i(r){let i=r.req.param(`id`)??`all`,a=r.req.param(`page`)??`0`,o=`https://www.hinatazaka46.com/s/official/diary/member/list${i===`all`?`?page=${a}`:`?page=${a}&ct=${i}`}`,s=n((await t({method:`get`,url:o})).data),c=s(`div.p-blog-group .p-blog-article`).toArray().map(t=>{let r=n(t);return{title:r(`.c-blog-article__title`).text(),link:r(`.c-button-blog-detail`).attr(`href`),pubDate:e(r(`.c-blog-article__date`).text()),author:r(`.c-blog-article__name`).text(),description:r(`.c-blog-article__text`).html()}});return{allowEmpty:!0,title:s(`title`).text(),link:o,item:c}}export{r as route};