import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { name: `Award Winners`, example: `/darwinawards`, path: `/`, radar: [{ source: [`darwinawards.com/darwin`, `darwinawards.com/`] }], maintainers: [`zoenglinghou`, `nczitzk`], handler: i, url: `darwinawards.com/darwin` };
async function i() {
    let r = `https://darwinawards.com/darwin/`,
        i = n((await t({ method: `get`, url: r })).data);
    (i(`.cameo`).remove(),
        i(`.topvote_title_desc, .topvote_title_minimal, .topvote_minimal`).each(function () {
            i(this).find(`a`).first().remove();
        }));
    let a = i(`#article_index a`)
        .toArray()
        .map((e) => ((e = i(e)), { title: e.text(), link: e.attr(`href`) }));
    return (
        (a = await Promise.all(
            a.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = n((await t({ method: `get`, url: r.link })).data);
                    return (e(`h2, nav, footer, table, form`).remove(), (r.description = e(`article`).html()), r);
                })
            )
        )),
        { title: i(`title`).text(), link: r, item: a }
    );
}
export { r as route };
