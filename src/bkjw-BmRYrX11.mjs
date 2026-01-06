import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://jwc.xmut.edu.cn`,
    a = { path: `/jwc/bkjw/:category?`, name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let { category: o = `jwxt` } = a.req.param(),
        s = `${i}/index/tzgg/${o}.htm`,
        c = r((await n(s, { headers: { referer: i }, https: { rejectUnauthorized: !1 } })).data),
        l = c(`#result_list table tbody tr`)
            .toArray()
            .map((e) => {
                let n = c(`td`, e).eq(0),
                    r = c(`td`, e).eq(1),
                    a = c(`a`, n).attr(`href`),
                    o;
                o = a.startsWith(`../../`) ? new URL(a, i).href : a;
                let s = c(`a`, n).attr(`title`),
                    l = t(r.text().trim());
                return { title: s, link: o, pubDate: l };
            }),
        u = await Promise.all(
            l.map((t) => e.tryGet(t.link, async () => ((t.description = r((await n(t.link, { headers: { referer: i }, https: { rejectUnauthorized: !1 } })).data)(`table #result #content form div #vsb_content_6`).html()), t)))
        );
    return { title: c(`title`).text(), link: s, item: u };
}
export { a as route };
