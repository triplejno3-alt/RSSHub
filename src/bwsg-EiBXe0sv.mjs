import{t as e}from"./ofetch-uhy-qh6X.mjs";import"./config-Cc-zZ5p-.mjs";import"./logger-_vmdpChp.mjs";import"./parse-date-DjdQS_Nt.mjs";import{r as t}from"./common-utils-uYpL50sT.mjs";import{load as n}from"cheerio";const r={name:`Angebote`,example:`/bwsg/_vermarktungsart=miete&_objektart=wohnung&_zimmer=2,3&_wohnflaeche=45,70&_plz=1210,1220`,path:`*`,maintainers:[`sk22`],categories:[`other`],description:`
Copy the query parameters for your https://www.bwsg.at/immobilien/immobilie-suchen
search, omitting the leading \`?\`

::: tip
Since there's no parameter available that sorts by "last added" (and there's no
obvious pattern to the default ordering), and since this RSS feed only fetches
the first page of results, you probably want to specify enough search
parameters to make sure you only get one page of results – because else, your
RSS feed might not get all items.
:::`,async handler(r){let i=t(r).slice(1);i.startsWith(`&`)&&(i=i.slice(1));let a=`https://www.bwsg.at/immobilien/immobilie-suchen/?${i}`,o=n(await e(a));return{title:`Immobilien - BWSG`,language:`de`,logo:`https://www.bwsg.at/wp-content/uploads/2024/06/favicon-bwsg.png`,allowEmpty:!0,item:o(`[data-objektnummer] > a`).toArray().map(e=>{let t=o(e),n=e.attribs.href,r=t.find(`.res_immobiliensuche__immobilien__item__thumb > img`).attr(`src`),i=t.find(`.res_immobiliensuche__immobilien__item__content__title`).text().trim(),a=t.find(`.res_immobiliensuche__immobilien__item__content__meta__location`).text().trim(),s=t.find(`.res_immobiliensuche__immobilien__item__content__meta__preis`).text().trim(),c=t.find(`.res_immobiliensuche__immobilien__item__content__meta__row_1`).text().trim();return{title:`${a}, ${i}`,description:(s?`${s} | `:``)+c,link:n,image:r}}),link:a}}};export{r as route};