import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = (e) => (
        e(`*[style]`).removeAttr(`style`),
        e(`br`).remove(),
        e(`span:empty`).remove(),
        e(`span`).each((t, n) => {
            e(n).html().trim() === `&nbsp;` && e(n).remove();
        }),
        e(`p:empty`).remove(),
        e(`p`).each((t, n) => {
            e(n).html().trim() === `` && e(n).remove();
        }),
        e
    ),
    o = async (t) => {
        let o = a(i((await r(t, { headers: { 'user-agent': e.trueUA } })).data));
        return new s(
            o(`.content-head h2`).text().trim(),
            o(`.content-persons p span:last`).text().trim(),
            n(o(`.content-time`).text().trim(), `YYYY-MM-DD`),
            o(`div[class=content-list-box]`).html(),
            o(`.content-tags a[rel="tag"]`)
                .toArray()
                .map((e) => o(e).text().trim())
        );
    };
var s = class {
        constructor(e, t, n, r, i) {
            ((this.title = e), (this.author = t), (this.pubDate = n), (this.description = r), (this.category = i));
        }
    },
    c = { siteLink: `https://chinafactcheck.com`, cleanDom: a, getArticleDetail: o, ArticleDetail: s, trueUA: e.trueUA };
const l = { path: `/`, radar: [{ source: [`chinafactcheck.com/`], target: `` }], name: `Unknown`, maintainers: [`kdanfly`], handler: u, url: `chinafactcheck.com/` };
async function u() {
    let e = i((await r(c.siteLink, { headers: { 'user-agent': c.trueUA } })).data),
        n = e(`.post-info-box .post-thumb a`)
            .toArray()
            .map((t) => ({ link: e(t).attr(`href`) })),
        a = await Promise.all(
            n.map((e) =>
                t.tryGet(e.link, async () => {
                    let { title: t, author: n, pubDate: r, description: i, category: a } = await c.getArticleDetail(e.link);
                    return ((e.title = t), (e.author = n), (e.pubDate = r), (e.description = i), (e.category = a), e);
                })
            )
        );
    return { title: e(`head title`).text(), link: c.siteLink, item: a };
}
export { l as route };
