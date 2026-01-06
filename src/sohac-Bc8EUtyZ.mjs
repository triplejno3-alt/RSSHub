import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = { path: `/sohac/*`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 10,
        s = n(a) === `/sohac` ? `/index/tzgg` : n(a).replace(/^\/sohac/, ``),
        c = `https://sohac.nenu.edu.cn`,
        l = `${c}${s}.htm`,
        u = i((await r({ method: `get`, url: l })).data),
        d = u(`span.data`)
            .slice(0, o)
            .toArray()
            .map((e) => ((e = u(e).prev()), { title: e.text(), link: new URL(e.attr(`href`), c).href }));
    return (
        (d = await Promise.all(
            d.map((n) =>
                e.tryGet(n.link, async () => {
                    let e = i((await r({ method: `get`, url: n.link })).data);
                    return (
                        (n.title = e(`.biaoti`).text()),
                        (n.description = e(`.v_news_content`).html()),
                        (n.pubDate = t(
                            e(`.sj`)
                                .text()
                                .match(/(\d{4}-\d{2}-\d{2})/)[1]
                        )),
                        n
                    );
                })
            )
        )),
        { title: u(`title`).text(), link: l, item: d }
    );
}
export { a as route };
