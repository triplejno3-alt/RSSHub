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
import o from 'iconv-lite';
const s = { path: `/nopss/*`, name: `Unknown`, maintainers: [], handler: c };
async function c(s) {
    let c = n(s) === `/nopss` ? `/GB/219469` : n(s).replace(/^\/nopss/, ``),
        l = `http://www.nopss.gov.cn`,
        u = `${l}${c}`,
        d = await r({ method: `get`, url: u, responseType: `buffer` }),
        f = a(o.decode(d.data, `gbk`)),
        p = f(`.p2j_list_con .clearfix li a`)
            .slice(0, s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`)) : 40)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.text(), link: `${l}${e.attr(`href`)}`, pubDate: i(t(e.next().text(), `[YYYY-MM-DD HH:mm]`), 8) }));
    return (
        (p = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = await r({ method: `get`, url: t.link, responseType: `buffer` });
                    return ((t.description = a(o.decode(e.data, `gbk`))(`.text_con`).html()), t);
                })
            )
        )),
        { title: f(`title`).text(), link: u, item: p }
    );
}
export { s as route };
