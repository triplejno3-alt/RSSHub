import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = { path: `*`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let o = n(a) === `/` ? `/realtime` : n(a),
        s = `https://www.8world.com`,
        c = `${s}${o}`,
        l = i((await r({ method: `get`, url: c })).data),
        u = l(`div[data-column="Two-Third"] .article-title .article-link`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.text(), link: `${s}${e.attr(`href`)}` }));
    return (
        (u = await Promise.all(
            u.map((n) =>
                e.tryGet(n.link, async () => {
                    let e = i((await r({ method: `get`, url: n.link })).data);
                    return (
                        (n.description = e(`.text-long`).html()),
                        (n.title = e(`meta[name="cXenseParse:mdc-title"]`).attr(`content`)),
                        (n.author = e(`meta[name="cXenseParse:author"]`).attr(`content`)),
                        (n.pubDate = t(e(`meta[name="cXenseParse:recs:publishtime"]`).attr(`content`))),
                        (n.category = e(`meta[name="cXenseParse:mdc-keywords"]`)
                            .toArray()
                            .map((t) => e(t).attr(`content`))),
                        n
                    );
                })
            )
        )),
        { title: l(`title`).text(), link: c, item: u }
    );
}
export { a as route };
