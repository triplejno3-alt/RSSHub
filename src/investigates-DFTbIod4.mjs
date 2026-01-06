import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/investigates`,
    categories: [`traditional-media`],
    view: r.Articles,
    example: `/reuters/investigates`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Inverstigates`,
    maintainers: [`LyleLee`],
    handler: o,
};
async function o() {
    let r = `https://www.reuters.com/investigates/`,
        a = i((await n(r)).data),
        o = a(`article.section-article-container.row`)
            .toArray()
            .map((e) => ({ title: a(e).find(`h2.subtitle`).text(), link: a(e).find(`a.row.d-flex`).prop(`href`) })),
        s = await Promise.all(
            o.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = i((await n(r.link)).data);
                    return (
                        (r.title = e(`title`).text()),
                        (r.description = e(`article.special-report`).html()),
                        (r.pubDate = t(e(`time[itemprop="datePublished"]`).attr(`datetime`))),
                        (r.author = e(`meta[property="og:article:publisher"]`).attr(`content`)),
                        r
                    );
                })
            )
        );
    return { title: a(`h1.series-subtitle`).text(), link: r, item: s };
}
export { a as route };
