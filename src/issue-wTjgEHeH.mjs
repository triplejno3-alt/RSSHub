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
    o = { path: [`/:journal/vol/:issue`, `/:journal/:issue`], radar: [{ source: [`www.sciencedirect.com/journal/:journal/*`], target: `/:journal` }], name: `Unknown`, maintainers: [], handler: s };
async function s(i) {
    let o = i.req.param(`journal`),
        s = `Volume ` + i.req.param(`issue`).replace(`-`, ` Issue `),
        c = `https://www.sciencedirect.com`,
        l = `${c}/journal/${o}/vol/${i.req.param(`issue`).replace(`-`, `/issue/`)}`,
        u = r((await t(l, { cookieJar: a })).data),
        d = u(`.anchor.js-title-link`).text(),
        f = u(`.js-article`)
            .toArray()
            .map((e) => {
                let t = u(e).find(`.js-article-title`).text(),
                    n = u(e).find(`.js-article__item__authors`).text();
                return { title: t, link: u(e).find(`.article-content-title`).attr(`href`), id: u(e).find(`.article-content-title`).attr(`id`), authors: n, issue: s };
            }),
        p = (e) => n(e),
        m = await Promise.all(
            f.map((n) =>
                e.tryGet(n.link, async () => {
                    let e = r((await t(`${c}/science/article/pii/${n.id}`, { cookieJar: a })).data);
                    return (e(`.section-title`).remove(), (n.doi = e(`.doi`).attr(`href`).replace(`https://doi.org/`, ``)), (n.abstract = e(`.abstract.author`).text()), (n.description = p(n)), n);
                })
            )
        );
    return { title: `${d} - ${s}`, link: l, item: m };
}
export { o as route };
