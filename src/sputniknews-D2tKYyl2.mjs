import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{load as r}from"cheerio";const i={english:`https://sputniknews.com`,spanish:`https://mundo.sputniknews.com`,german:`https://snanews.de`,french:`https://fr.sputniknews.com`,greek:`https://sputniknews.gr`,italian:`https://it.sputniknews.com`,czech:`https://cz.sputniknews.com`,polish:`https://pl.sputniknews.com`,serbian:`https://rs.sputniknews.com`,latvian:`https://sputniknewslv.com`,lithuanian:`https://lt.sputniknews.com`,moldavian:`https://md.sputniknews.com`,belarusian:`https://bel.sputnik.by`,armenian:`https://armeniasputnik.am`,abkhaz:`https://sputnik-abkhazia.info`,ssetian:`https://sputnik-ossetia.com`,georgian:`https://sputnik-georgia.com`,azerbaijani:`https://sputnik.az`,arabic:`https://arabic.sputniknews.com`,turkish:`https://tr.sputniknews.com`,persian:`https://ir.sputniknews.com`,dari:`https://af.sputniknews.com`,kazakh:`https://sputniknews.kz`,kyrgyz:`https://kg.sputniknews.com`,uzbek:`https://oz.sputniknews-uz.com`,tajik:`https://sputnik-tj.com`,vietnamese:`https://vn.sputniknews.com`,japanese:`https://jp.sputniknews.com`,chinese:`http://sputniknews.cn`,portuguese:`https://br.sputniknews.com`},a={path:`/:category?/:language?`,categories:[`traditional-media`],example:`/sputniknews`,parameters:{category:"Category, can be found in URL, `news` by default",language:`Language, see below, English by default`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},name:`Category`,maintainers:[`nczitzk`],handler:o,description:`Categories for International site:

| WORLD | COVID-19 | BUSINESS | SPORT | TECH | OPINION |
| ----- | -------- | -------- | ----- | ---- | ------- |
| world | covid-19 | business | sport | tech | opinion |

  Categories for Chinese site:

| 新闻 | 中国  | 俄罗斯 | 国际            | 俄中关系                 | 评论    |
| ---- | ----- | ------ | --------------- | ------------------------ | ------- |
| news | china | russia | category_guoji | russia_china_relations | opinion |

  Language

| Language    | Id          |
| ----------- | ----------- |
| English     | english     |
| Spanish     | spanish     |
| German      | german      |
| French      | french      |
| Greek       | greek       |
| Italian     | italian     |
| Czech       | czech       |
| Polish      | polish      |
| Serbian     | serbian     |
| Latvian     | latvian     |
| Lithuanian  | lithuanian  |
| Moldavian   | moldavian   |
| Belarusian  | belarusian  |
| Armenian    | armenian    |
| Abkhaz      | abkhaz      |
| Ssetian     | ssetian     |
| Georgian    | georgian    |
| Azerbaijani | azerbaijani |
| Arabic      | arabic      |
| Turkish     | turkish     |
| Persian     | persian     |
| Dari        | dari        |
| Kazakh      | kazakh      |
| Kyrgyz      | kyrgyz      |
| Uzbek       | uzbek       |
| Tajik       | tajik       |
| Vietnamese  | vietnamese  |
| Japanese    | japanese    |
| Chinese     | chinese     |
| Portuguese  | portuguese  |`};async function o(a){let o=a.req.param(`category`)??`news`,s=i[a.req.param(`language`)??`english`],c=r((await n({method:`get`,url:`${s}/services/${o}/more.html`})).data),l=c(`.list__title`).toArray().map(e=>(e=c(e),{title:e.text(),link:`${s}${e.attr(`href`)}`}));return l=await Promise.all(l.map(i=>e.tryGet(i.link,async()=>{let e=r((await n({method:`get`,url:i.link})).data);return i.pubDate=t(e(`a[data-unixtime]`).attr(`data-unixtime`)*1e3),i.category=e(`.tag__text`).toArray().map(t=>e(t).text()),e(`.article__meta, .article__title, .article__info, .article__quote-bg, .article__google-news, .article__footer, .m-buy, .photoview__ext-link`).remove(),e(`div[data-type="article"]`).remove(),i.description=e(`.article`).html(),i}))),{title:`${o} - Sputnik News`,link:`${s}/${o}`,item:l}}export{a as route};