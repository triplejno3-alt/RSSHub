import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./helpers-C9wXLK0V.mjs";import{t as e}from"./parse-date-DjdQS_Nt.mjs";import{t}from"./got-CKQ7C9HX.mjs";const n=`https://www.nogizaka46.com`,r={path:`/blog/:id?`,categories:[`new-media`],example:`/nogizaka46/blog`,parameters:{id:"Member ID, see below, `all` by default"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`blog.nogizaka46.com/s/n46/diary/MEMBER`],target:`/blog`}],name:`Nogizaka46 Blog 乃木坂 46 博客`,maintainers:[`Kasper4649`,`akashigakki`],handler:i,url:`blog.nogizaka46.com/s/n46/diary/MEMBER`,description:`Member ID

| Member ID | Name                  |
| --------- | --------------------- |
| 55401     | 岡本 姫奈             |
| 55400     | 川﨑 桜               |
| 55397     | 池田 瑛紗             |
| 55396     | 五百城 茉央           |
| 55395     | 中西 アルノ           |
| 55394     | 奥田 いろは           |
| 55393     | 冨里 奈央             |
| 55392     | 小川 彩               |
| 55391     | 菅原 咲月             |
| 55390     | 一ノ瀬 美空           |
| 55389     | 井上 和               |
| 55387     | 弓木 奈於             |
| 55386     | 松尾 美佑             |
| 55385     | 林 瑠奈               |
| 55384     | 佐藤 璃果             |
| 55383     | 黒見 明香             |
| 48014     | 清宮 レイ             |
| 48012     | 北川 悠理             |
| 48010     | 金川 紗耶             |
| 48019     | 矢久保 美緒           |
| 48018     | 早川 聖来             |
| 48009     | 掛橋 沙耶香           |
| 48008     | 賀喜 遥香             |
| 48017     | 筒井 あやめ           |
| 48015     | 田村 真佑             |
| 48013     | 柴田 柚菜             |
| 48006     | 遠藤 さくら           |
| 36760     | 与田 祐希             |
| 36759     | 吉田 綾乃クリスティー |
| 36758     | 山下 美月             |
| 36757     | 向井 葉月             |
| 36756     | 中村 麗乃             |
| 36755     | 佐藤 楓               |
| 36754     | 阪口 珠美             |
| 36753     | 久保 史緒里           |
| 36752     | 大園 桃子             |
| 36751     | 梅澤 美波             |
| 36750     | 岩本 蓮加             |
| 36749     | 伊藤 理々杏           |
| 264       | 齋藤 飛鳥             |`};async function i(r){let i=r.req.param(`id`)??`all`,a=await t({method:`get`,url:`${n}/s/n46/api/list/blog${i===`all`?``:`?ct=${i}`}`}),o=JSON.parse(a.data.slice(4).slice(0,-2)).data;return{allowEmpty:!0,title:`乃木坂46 公式ブログ`,link:`https://www.nogizaka46.com/s/n46/diary/MEMBER`,item:o&&o.map(t=>({title:t.title,link:t.link,pubDate:e(t.date),author:t.name,description:t.text,guid:n+new URL(t.link).pathname}))}}export{r as route};