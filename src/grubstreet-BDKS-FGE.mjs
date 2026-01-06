import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
async function r(e) {
    let r = n((await t(e)).data)(`div.article-content`);
    return (
        r.find(`aside.related`).remove(),
        r.find(`aside.article-details_heading-with-paragraph`).remove(),
        r.find(`section.package-list`).remove(),
        r.find(`div.source-links h2`).remove(),
        r.find(`div.source-links svg`).remove(),
        r.find(`div.mobile-secondary-area`).remove(),
        r.find(`aside.newsletter-flex-text`).remove(),
        { description: r.html() }
    );
}
function i(e, t) {
    return Promise.all(
        e.map((e) =>
            t.tryGet(e.canonicalUrl, async () => {
                let t = e.canonicalUrl.replace(`http://`, `https://`),
                    n;
                if (e.byline) {
                    let t = e.byline[0];
                    if (t && t.names) {
                        let e = t.names.map((e) => e.text);
                        e && e.length > 0 && (n = `by ` + e.join(`, `));
                    }
                }
                let i = { title: e.plaintextPrimaryHeadline, link: t, guid: t, pubDate: e.date };
                n && (i.author = n);
                let { description: a } = await r(t);
                return ((i.description = a), i);
            })
        )
    );
}
var a = { getData: async (n, r, a, o) => ({ title: a, link: r, description: o, item: await i((await t(r)).data.articles.slice(0, n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`), 10) : 25), e) }) };
const o = { path: `/`, radar: [{ source: [`grubstreet.com/`], target: `` }], name: `Unknown`, maintainers: [`loganrockmore`], handler: s, url: `grubstreet.com/` };
async function s(e) {
    return await a.getData(e, `https://www.grubstreet.com/_components/newsfeed/instances/grubstreet-index@published`, `Grub Street`, `New York Magazine's Food and Restaurant Blog`);
}
export { o as route };
