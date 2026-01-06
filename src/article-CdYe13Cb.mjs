import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: [`/articles`, `/essays`, `/`],
    categories: [`blog`],
    example: `/paulgraham/articles`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`paulgraham.com/articles.html`] }],
    name: `Essays`,
    maintainers: [`Maecenas`, `nczitzk`, `dvorak0`],
    handler: a,
    url: `paulgraham.com/articles.html`,
};
async function a(i) {
    let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 30,
        o = `https://paulgraham.com`,
        s = new URL(`articles.html`, o).href,
        { data: c } = await n(s),
        l = r(c),
        u = l(`font a`)
            .slice(0, a)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.text(), link: new URL(e.prop(`href`), o).href }));
    u = await Promise.all(
        u.map((i) =>
            e.tryGet(i.link, async () => {
                let { data: e } = await n(i.link),
                    a = r(e),
                    o = a(`font`).first();
                return ((i.title = a(`title`).text()), (i.description = o.html()), (i.pubDate = t(o.contents().first().text(), `MMMM YYYY`)), i);
            })
        )
    );
    let d = `Paul Graham`,
        f = l(`title`).text(),
        p = l(`link[rel="shortcut icon"]`).prop(`href`);
    return { item: u, title: `${d} - ${f}`, link: s, description: f, language: `en`, image: l(`img[alt="${f}"]`).prop(`src`), icon: p, logo: p, subtitle: f, author: d, allowEmpty: !0 };
}
export { i as route };
