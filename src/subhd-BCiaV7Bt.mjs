import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { sub: { title: `字幕`, category: `new` }, zu: { title: `字幕组`, category: `14` }, newest: { category: `for backwards compatibility` } },
    o = { path: `/:type?/:category?`, name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let s = o.req.param(`type`) ?? `sub`,
        c = o.req.param(`category`) ?? a[s].category,
        l = `https://subhd.tv`,
        u = `${l}/${s === `newest` ? `sub/new` : `${s}/${c}${s === `zu` ? `/l` : ``}`}`,
        d = i((await n({ method: `get`, url: u })).data);
    d(`.align-middle`).each(function () {
        d(this).removeClass(`link-dark`);
    });
    let f = d(`.link-dark`)
        .toArray()
        .map((e) => {
            e = d(e);
            let n = e.parent().parent().find(`.align-text-top`).last().text(),
                i = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
            return {
                link: `${l}${e.attr(`href`)}`,
                author: e.parent().parent().find(`.text-dark`).last().text(),
                pubDate: r(t(n.includes(`-`) ? n : `${i} ${n}`), 8),
                title: `${e.parent().parent().find(`.align-middle`).text()} ${e.text().replace(/ - SubHD/, ``)}`,
            };
        });
    return (
        (f = await Promise.all(
            f.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n({ method: `get`, url: t.link })).data);
                    return (e(`.rounded-circle`).remove(), e(`.view-text`).last().remove(), (t.description = e(`.view-text`).html() + e(`.bg-white`).first().html()), t);
                })
            )
        )),
        { title: d(`title`).text(), link: u, item: f }
    );
}
export { o as route };
