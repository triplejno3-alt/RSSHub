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
const o = { path: `/cnnic/*`, name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let s = n(o).replaceAll(/^\/cnnic/g, ``),
        c = `http://www.cnnic.net.cn${s === `/` ? `/gywm/xwzx/rdxw/20172017_7086/` : `${s}/`}`,
        l = a((await r({ method: `get`, url: c })).data),
        u = l(`.link a`)
            .slice(0, o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 12)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.text(), link: new URL(e.attr(`href`), c).href }));
    return (
        (u = await Promise.all(
            u.map((n) =>
                e.tryGet(n.link, async () => {
                    let e = a((await r({ method: `get`, url: n.link })).data);
                    return ((n.description = e(`.TRS_Editor`).html()), (n.pubDate = i(t(e(`.info .text span`).first().text(), `YYYY年MM月DD日 HH:mm`), 8)), n);
                })
            )
        )),
        { title: l(`title`).text(), link: c, item: u }
    );
}
export { o as route };
