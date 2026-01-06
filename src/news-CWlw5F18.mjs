import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/news`,
    categories: [`new-media`],
    example: `/sakurazaka46/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sakurazaka46.com/s/s46/news/list`, `sakurazaka46.com/`] }],
    name: `Sakurazaka46 News 櫻坂 46 新闻`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `sakurazaka46.com/s/s46/news/list`,
};
async function a(i) {
    let a = `https://sakurazaka46.com`,
        o = `${a}/s/s46/news/list`,
        s = r((await n({ method: `get`, url: o })).data),
        c = s(`.com-news-part .box a`)
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 30)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.find(`.lead`).text(), link: `${a}${e.attr(`href`).split(`?`)[0]}`, pubDate: t(e.find(`.date`).text()) }));
    return ((c = await Promise.all(c.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n({ method: `get`, url: t.link })).data)(`.article`).html()), t))))), { title: s(`title`).text(), link: o, item: c });
}
export { i as route };
