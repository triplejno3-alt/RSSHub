import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = { path: `*`, name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let s = n(o).replace(/^\//, ``) || `32942`,
        c = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 50,
        l = `https://www.bast.net.cn/${Number.isNaN(s) ? s : `col/col${s}`}/`,
        u = a((await r({ method: `get`, url: l })).data);
    u(`.list-title-bif`).remove();
    let d = u(`title`).text(),
        f = u(`a[title]`);
    f.length === 0 && ((u = a(u(`ul.cont-list div script`).first().text())), u(`.list-title-bif`).remove(), (f = u(`a[title]`)));
    let p = f
        .slice(0, c)
        .toArray()
        .map((e) => ((e = u(e)), { title: e.text().trim(), link: e.attr(`href`) }));
    return (
        (p = await Promise.all(
            p.map((n) =>
                e.tryGet(n.link, async () => {
                    if (/bast\.net\.cn/.test(n.link)) {
                        let e = a((await r({ method: `get`, url: n.link })).data);
                        ((n.title = e(`meta[name="ArticleTitle"]`).attr(`content`)),
                            (n.author = e(`meta[name="contentSource"]`).attr(`content`)),
                            (n.pubDate = i(t(e(`meta[name="pubdate"]`).attr(`content`)), 8)),
                            (n.category = [e(`meta[name="ColumnName"]`).attr(`content`)]),
                            (n.description = e(`.arccont`).html()));
                    }
                    return n;
                })
            )
        )),
        { title: d, link: l, item: p }
    );
}
export { o as route };
