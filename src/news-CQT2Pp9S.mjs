import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/`, name: `Unknown`, maintainers: [`TonyRL`], handler: a };
async function a(i) {
    let a = `https://keepass.info/news/news_all.html`,
        { data: o } = await n(a),
        s = r(o),
        c = s(`p > a`)
            .toArray()
            .map((e) => ((e = s(e)), { title: e.find(`b`).text(), link: new URL(e.attr(`href`), a).href, pubDate: t(e.next().next(`small`).text().split(`.`)[0]) }))
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10),
        l = await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    if (!t.link.startsWith(`https://keepass.info/`)) return t;
                    let { data: e } = await n(t.link),
                        i = r(e);
                    return (i(`.sectionheader`).remove(), i(`.laytablews > tbody> tr:nth-child(1) > td:nth-child(2) > p`).first().remove(), (t.description = i(`.laytablews > tbody> tr:nth-child(1) > td:nth-child(2)`).html()), t);
                })
            )
        );
    return { title: s(`head title`).attr(`content`), link: a, item: l };
}
export { i as route };
