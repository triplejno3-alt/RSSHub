import"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import{t as e}from"./cache-DLkCV5c7.mjs";import"./helpers-C9wXLK0V.mjs";import{t}from"./parse-date-DjdQS_Nt.mjs";import{t as n}from"./got-CKQ7C9HX.mjs";import{load as r}from"cheerio";const i={path:`/:category?`,categories:[`programming`],example:`/smashingmagazine/react`,parameters:{category:`Find in URL or Table below`},features:{requireConfig:!1,requirePuppeteer:!1,antiCrawler:!1,supportBT:!1,supportPodcast:!1,supportScihub:!1},radar:[{source:[`smashingmagazine.com/category/:category`],target:`/:category`}],name:`Category`,maintainers:[`Rjnishant530`],handler:a,url:`smashingmagazine.com/articles/`,description:`| **Category**       |                    |
| ------------------ | ------------------ |
| Accessibility      | accessibility      |
| Best practices     | best-practices     |
| Business           | business           |
| Career             | career             |
| Checklists         | checklists         |
| CSS                | css                |
| Data Visualization | data-visualization |
| Design             | design             |
| Design Patterns    | design-patterns    |
| Design Systems     | design-systems     |
| E-Commerce         | e-commerce         |
| Figma              | figma              |
| Freebies           | freebies           |
| HTML               | html               |
| Illustrator        | illustrator        |
| Inspiration        | inspiration        |
| JavaScript         | javascript         |
| Mobile             | mobile             |
| Performance        | performance        |
| Privacy            | privacy            |
| React              | react              |
| Responsive Design  | responsive-design  |
| Round-Ups          | round-ups          |
| SEO                | seo                |
| Typography         | typography         |
| Tools              | tools              |
| UI                 | ui                 |
| Usability          | usability          |
| UX                 | ux                 |
| Vue                | vue                |
| Wallpapers         | wallpapers         |
| Web Design         | web-design         |
| Workflow           | workflow           |`};async function a(i){let a=i.req.param(`category`),o=`https://www.smashingmagazine.com`,s=a?`/category/${a}`:`/articles`,{data:c}=await n(`${o}${s}`),l=r(c),u=l(`article.article--post`).toArray().map(e=>{e=l(e);let n=e.find(`h2.article--post__title a`),r=e.find(`p.article--post__teaser`).clone().children().remove().end().text(),i=e.find(`span.article--post__author-name a`).text(),a=t(l(`p.article--post__teaser time`).attr(`datetime`),`YYYY-MM-DD`);return{title:n.text(),link:`${o}${n.attr(`href`)}`,pubDate:a,description:r,author:i}}),d=await Promise.all(u.map(t=>e.tryGet(t.link,async()=>{let{data:e}=await n(t.link),i=r(e);return t.category=i(`li.meta-box--tags a`).toArray().map(e=>i(e).text()),t.description=[i(`div#article__content header.article-header`).clone().children(`ul`).remove().end().html(),i(`div#article__content section.article__summary`).html(),...i(`div#article__content div.c-garfield-the-cat`).clone().children(`div`).remove().end().toArray().map(e=>i(e).html())].join(``),t})));return{title:`Smashing Magazine Articles`,link:`${o}${s}`,item:d,description:`Latest Articles on Smashingmagazine.com`,logo:`https://www.smashingmagazine.com/images/favicon/apple-touch-icon.png`,icon:`https://www.smashingmagazine.com/images/favicon/favicon.svg`,language:`en-us`}}export{i as route};