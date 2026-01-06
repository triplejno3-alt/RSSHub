import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/speeches/:language?`,
    categories: [`government`],
    example: `/who/speeches`,
    parameters: { language: `Language, see below, English by default` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`who.int/director-general/speeches`], target: `/speeches` }],
    name: `Speeches`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `who.int/director-general/speeches`,
    description: `Language

| English | العربية | 中文 | Français | Русский | Español | Português |
| ------- | ------- | ---- | -------- | ------- | ------- | --------- |
| en      | ar      | zh   | fr       | ru      | es      | pt        |`,
};
async function a(i) {
    let a = i.req.param(`language`) || `en`,
        o = `https://www.who.int`,
        s = `${o}/${a === `en` ? `` : `${a}/`}director-general/speeches`,
        c = (await n({ method: `get`, url: `${o}/api/hubs/speeches?sf_culture=${a}&$orderby=PublicationDateAndTime%20desc&$select=Title,PublicationDateAndTime,ItemDefaultUrl` })).data.value.map((e) => ({
            title: e.Title,
            link: `${s}/detail/${e.ItemDefaultUrl}`,
            pubDate: t(e.PublicationDateAndTime),
        }));
    return { title: `Speeches - WHO`, link: s, item: await Promise.all(c.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link })).data)(`.sf-detail-body-wrapper`).html()), t)))) };
}
export { i as route };
