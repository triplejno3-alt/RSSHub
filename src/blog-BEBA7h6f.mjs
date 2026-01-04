import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{t as r}from"./timezone-CrV-DT8S.mjs";import{load as i}from"cheerio";const a={path:`/blog/:id?/:page?`,categories:[`new-media`],example:`/sakurazaka46/blog`,parameters:{id:"Member ID, see below, `all` by default",page:"Page, `0` by default"},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Sakurazaka46 Blog 櫻坂 46 博客`,maintainers:[`victor21813`,`nczitzk`,`akashigakki`],handler:o,description:`Member ID

| Member ID | Name         |
| --------- | ------------ |
| 2000      | 三期生リレー |
| 69        | 山下 瞳月    |
| 68        | 村山 美羽    |
| 67        | 村井 優      |
| 66        | 向井 純葉    |
| 65        | 的野 美青    |
| 64        | 中嶋 優月    |
| 63        | 谷口 愛季    |
| 62        | 小島 凪紗    |
| 61        | 小田倉 麗奈  |
| 60        | 遠藤 理子    |
| 59        | 石森 璃花    |
| 58        | 守屋 麗奈    |
| 57        | 増本 綺良    |
| 56        | 幸阪 茉里乃  |
| 55        | 大沼 晶保    |
| 54        | 大園 玲      |
| 53        | 遠藤 光莉    |
| 51        | 山﨑 天      |
| 50        | 森田 ひかる  |
| 48        | 松田 里奈    |
| 47        | 藤吉 夏鈴    |
| 46        | 田村 保乃    |
| 45        | 武元 唯衣    |
| 44        | 関 有美子    |
| 43        | 井上 梨名    |
| 15        | 原田 葵      |
| 14        | 土生 瑞穂    |
| 11        | 菅井 友香    |
| 08        | 齋藤 冬優花  |
| 07        | 小林 由依    |
| 06        | 小池 美波    |
| 04        | 尾関 梨香    |
| 03        | 上村 莉菜    |`};async function o(a){let o=a.req.param(`id`)??`all`,s=a.req.param(`page`)??`0`,c=`https://sakurazaka46.com`,l=`${c}/s/s46/diary/blog/list${o===`all`?`?page=${s}`:`?page=${s}&ct=${o}`}`,u=i((await n({method:`get`,url:l})).data),d=u(`.com-blog-part .box a`).toArray().map(e=>(e=u(e),{title:e.text(),author:e.find(`.name`).text(),link:`${c}${e.attr(`href`).split(`?`)[0]}`}));return d=await Promise.all(d.map(a=>e.tryGet(a.link,async()=>{let e=i((await n({method:`get`,url:a.link})).data);return a.description=e(`.box-article`).html(),a.pubDate=r(t(e(`.blog-foot .date`).text()),9),a}))),{title:`${u(`title`).text()}${o?` - ${u(`.name`).first().text()}`:``}`,link:l,item:d}}export{a as route};