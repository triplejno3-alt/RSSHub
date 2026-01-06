import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './description-JX-Eg8ss.mjs';
import { load as r } from 'cheerio';
import { CookieJar as i } from 'tough-cookie';
const a = new i(),
    o = { path: [`/:journal/latest`, `/:journal`], radar: [{ source: [`www.sciencedirect.com/journal/:journal/*`], target: `/:journal` }], name: `Unknown`, maintainers: [], handler: s };
async function s(i) {
    let o = i.req.param(`journal`),
        s = `https://www.sciencedirect.com`,
        c = `${s}/journal/${o}`,
        l = r((await t(c, { cookieJar: a })).data),
        u = l(`.anchor.js-title-link`).text(),
        d = `${s}${l(`.link-anchor.u-clr-black`).attr(`href`)}`,
        f = ``;
    d.match(`suppl`) === null ? d.match(`issue`) !== null && (f = `Volume ` + d.match(`vol/(.*)/issue`)[1] + ` Issue ` + d.match(`/issue/(.*)`)[1]) : (f = `Volume ` + d.match(`vol/(.*)/suppl`)[1]);
    let p = r((await t(d, { cookieJar: a })).data),
        m = p(`.js-article`)
            .toArray()
            .map((e) => {
                let t = p(e).find(`.js-article-title`).text(),
                    n = p(e).find(`.js-article__item__authors`).text();
                return { title: t, link: p(e).find(`.article-content-title`).attr(`href`), id: p(e).find(`.article-content-title`).attr(`id`), authors: n, issue: f };
            }),
        h = (e) => n(e);
    return {
        title: u,
        link: c,
        item: await Promise.all(
            m.map((n) =>
                e.tryGet(n.link, async () => {
                    let e = r((await t(`${s}/science/article/pii/${n.id}`, { cookieJar: a })).data);
                    return (e(`.section-title`).remove(), (n.doi = e(`.doi`).attr(`href`).replace(`https://doi.org/`, ``)), (n.abstract = e(`.abstract.author`).text()), (n.description = h(n)), n);
                })
            )
        ),
    };
}
export { o as route };
