import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = new Map([
        [0, `qb.htm`],
        [1, `xytz.htm`],
        [2, `rstz.htm`],
        [6, `jwtz.htm`],
        [8, `xgtz.htm`],
        [7, `kytz.htm`],
        [5, `cwtz.htm`],
        [3, `ghtz.htm`],
        [4, `yytz.htm`],
    ]),
    a = { path: `/eecs/:type?`, name: `Unknown`, maintainers: [`Ir1d`], handler: o };
async function o(a) {
    let o = `https://eecs.pku.edu.cn`,
        s = a.params && Number.parseInt(a.req.param(`type`));
    s === void 0 && (s = 0);
    let c = r((await n(o + `/xygk1/ggtz/` + i.get(s))).data),
        l = c(`.hvr-shutter-out-vertical`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.attr(`title`), link: new URL(e.attr(`href`), o).href, pubDate: t(e.find(`em`).text()) }));
    return (
        (l = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return (
                        e(`input`).remove(),
                        e(`h1`).remove(),
                        e(`.con_xq`).remove(),
                        e(`form[name=_newscontent_fromname] img`).each((e, t) => {
                            ((t = c(t)), t.attr(`src`).startsWith(`/`) && t.attr(`src`, new URL(t.attr(`src`), o).href));
                        }),
                        e(`form[name=_newscontent_fromname] ul li a`).each((e, t) => {
                            ((t = c(t)), t.attr(`href`).startsWith(`/`) && t.attr(`href`, new URL(t.attr(`href`), o).href));
                        }),
                        (t.description = e(`form[name=_newscontent_fromname]`).html()),
                        t
                    );
                })
            )
        )),
        { title: c(`title`).text(), link: o + `/xygk1/ggtz/` + i.get(s), description: `北大信科 公告通知`, item: l }
    );
}
export { a as route };
