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
    let o = `https://web3caff.com${n(a) === `/` ? `` : n(a)}`,
        s = i((await r({ method: `get`, url: o })).data),
        c = s(`.list-grouped`)
            .first()
            .find(`.list-body`)
            .slice(0, a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 10)
            .toArray()
            .map((e) => {
                e = s(e);
                let t = e.find(`.list-title`);
                return { title: t.text(), link: t.attr(`href`) };
            });
    return (
        (c = await Promise.all(
            c.map((n) =>
                e.tryGet(n.link, async () => {
                    let e = i((await r({ method: `get`, url: n.link })).data);
                    return (
                        e(`.ss-inline-share-wrapper`).remove(),
                        (n.description = e(`.post-content`).html()),
                        (n.author = e(`.author-name .author-popup`).text()),
                        (n.category = e(`a[rel="category tag"]`)
                            .toArray()
                            .map((e) => s(e).text())),
                        (n.pubDate = t(e(`meta[property="article:published_time"]`).attr(`content`))),
                        n
                    );
                })
            )
        )),
        { title: s(`title`).text(), link: o, item: c }
    );
}
export { a as route };
