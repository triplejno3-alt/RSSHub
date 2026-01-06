import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { path: `/jwc/:listId`, radar: [{ source: [`jwc.sspu.edu.cn/jwc/:listId/list.htm`] }], name: `Unknown`, maintainers: [`TonyRL`], handler: o };
async function o(a) {
    let o = a.req.param(`listId`),
        s = `https://jwc.sspu.edu.cn`,
        { data: c, url: l } = await n(`${s}/${o}/list.htm`),
        u = i(c),
        d = u(`.news_list .news`)
            .slice(0, a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 15)
            .toArray()
            .map((e) => {
                e = u(e);
                let t = e.find(`.news_title a`);
                return { title: t.attr(`title`), link: `${s}${t.attr(`href`)}` };
            }),
        f = await Promise.all(
            d.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e);
                    return ((a.description = o(`.wp_articlecontent`).html()), (a.pubDate = r(t(o(`.arti_update`).text(), `YYYY-MM-DD HH:mm:ss`), 8)), a);
                })
            )
        );
    return { title: u(`head title`).text(), link: l, item: f };
}
export { a as route };
