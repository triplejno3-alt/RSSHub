import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = { path: `/yjsy/*`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 10,
        s = n(a) === `/yjsy` ? `/tzgg` : n(a).replace(/^\/yjsy/, ``),
        c = `https://yjsy.nenu.edu.cn`,
        l = `${c}${s}.htm`,
        u = i((await r({ method: `get`, url: l })).data),
        d = u(`a.tit`)
            .slice(0, o)
            .toArray()
            .map((e) => {
                e = u(e);
                let t = e.attr(`href`);
                return { title: e.text(), link: t.startsWith(`http`) ? t : new URL(t, c).href };
            });
    return (
        (d = await Promise.all(
            d.map((n) =>
                e.tryGet(n.link, async () => {
                    if (/yjsy\.nenu\.edu\.cn/.test(n.link)) {
                        let e = i((await r({ method: `get`, url: n.link })).data);
                        ((n.title = e(`h2`).text()),
                            (n.description = e(`.v_news_content`).html()),
                            (n.pubDate = t(
                                e(`h3`)
                                    .text()
                                    .match(/(\d{4}-\d{2}-\d{2})/)[1]
                            )));
                    }
                    return n;
                })
            )
        )),
        { title: u(`title`).text(), link: l, item: d }
    );
}
export { a as route };
