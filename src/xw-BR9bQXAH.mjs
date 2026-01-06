import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { n as i, r as a, t as o } from './util-QS_fCX6z.mjs';
import { load as s } from 'cheerio';
const c = { path: `/chinamine-safety/xw/:category{.+}?`, name: `Unknown`, maintainers: [], handler: l };
async function l(c) {
    let { category: l = `yjglbyw` } = c.req.param(),
        u = c.req.query(`limit`) ? Number.parseInt(c.req.query(`limit`), 10) : 30,
        d = new URL(`xw/${l.endsWith(`/`) ? l : `${l}/`}`, a).href,
        { data: f } = await n(d),
        p = s(f),
        m = p(`div.center_display_right table tbody tr td a`)
            .slice(0, u)
            .toArray()
            .map((e) => ((e = p(e)), { title: e.text(), link: new URL(e.prop(`href`), d).href, pubDate: r(t(e.parent().find(`span`).text()), 8) }));
    return ((m = await i(m, e.tryGet)), { item: m, ...o(p, d) });
}
export { c as route };
