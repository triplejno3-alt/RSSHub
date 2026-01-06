import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import * as t from 'node:url';
import { load as n } from 'cheerio';
const r = { path: `/explore/column/:id`, name: `Unknown`, maintainers: [], handler: i };
async function i(r) {
    let i = r.req.param(`id`),
        a = t.resolve(`https://www.douban.com/explore/column/`, i),
        o = n((await e.get(a)).data),
        s = o(`div.h1`).text(),
        c = o(`div.item`)
            .slice(0, 10)
            .toArray()
            .map((e) => ({ title: o(e).find(`div.title a`).text(), link: o(e).find(`div.title a`).attr(`href`), author: o(e).find(`div.usr-pic a`).text() }));
    for (let e = c.length - 1; e >= 0; e--) c[e].author === `[已注销]` && c.splice(e, 1);
    let l = await Promise.all(
        c.map(async (t) => {
            let r = t.title,
                i = t.author,
                a = t.link;
            return { title: r, link: a, description: n((await e.get(a)).data)(`#link-report`).html(), author: i };
        })
    );
    return { title: `${s}-豆瓣发现`, link: a, item: l };
}
export { r as route };
