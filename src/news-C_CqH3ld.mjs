import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/news/:language?`,
    categories: [`government`],
    example: `/who/news`,
    parameters: { language: `Language, see below, English by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`who.int/news`], target: `/news` }],
    name: `News`,
    maintainers: [`nczitzk`],
    handler: i,
    url: `who.int/news`,
    description: `Language

| English | العربية | 中文 | Français | Русский | Español | Português |
| ------- | ------- | ---- | -------- | ------- | ------- | --------- |
| en      | ar      | zh   | fr       | ru      | es      | pt        |`,
};
async function i(r) {
    let i = r.req.param(`language`) ?? `en`,
        a = `https://www.who.int`,
        o = `${a}/${i === `en` ? `` : `${i}/`}news`,
        s = (await n({ method: `get`, url: `${a}/api/news/newsitems?sf_culture=${i}&$orderby=PublicationDateAndTime%20desc&$select=Title,PublicationDateAndTime,ItemDefaultUrl` })).data.value.map((e) => ({
            title: e.Title,
            link: `${o}/item/${e.ItemDefaultUrl}`,
            pubDate: t(e.PublicationDateAndTime),
        }));
    return { title: `News - WHO`, link: o, item: await Promise.all(s.map((t) => e.tryGet(t.link, async () => ((t.description = (await n({ method: `get`, url: t.link })).data.match(/"description":"(.*)","datePublished"/)[1]), t)))) };
}
export { r as route };
