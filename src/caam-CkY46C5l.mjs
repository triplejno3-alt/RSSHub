import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/:category?`, name: `Unknown`, maintainers: [`nczitzk`], handler: a };
async function a(i) {
    let { category: a = `1` } = i.req.param(),
        o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 30,
        s = `http://www.caam.org.cn`,
        c = new URL(`chn/1/cate_${a}/list_1.html`, s).href,
        { data: l } = await n(c),
        u = r(l),
        d = u(`span.cont`)
            .slice(0, o)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.parent();
                return { title: e.text(), link: new URL(n.prop(`href`), c).href, pubDate: t(n.find(`span.time`).text(), `[YYYY.MM.DD]`) };
            });
    d = await Promise.all(
        d.map((i) =>
            e.tryGet(i.link, async () => {
                let { data: e } = await n(i.link),
                    a = r(e),
                    o = a(`div.fourTop em`);
                return ((i.title = a(`div.fourTop h2`).text()), (i.description = a(`div.fourBox`).html()), (i.author = o.length <= 1 ? void 0 : a(`div.fourTop em`).last().text()), (i.pubDate = t(o.first().text())), i);
            })
        )
    );
    let f = u(`div.footer a`).first().text(),
        p = u(`div.topMeuns ul li a`).last().text(),
        m = new URL(`images/header-back-7.png`, s).href;
    return { item: d, title: `${f} - ${p}`, link: c, description: u(`meta[property="og:description"]`).prop(`content`), language: u(`html`).prop(`lang`), image: m, subtitle: p, author: f };
}
export { i as route };
