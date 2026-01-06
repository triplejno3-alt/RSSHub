import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { path: `/`, radar: [{ source: [`hackyournews.com/`], target: `` }], name: `Unknown`, maintainers: [`ftiasch`], handler: i, url: `hackyournews.com/` };
async function i() {
    let r = `https://hackyournews.com`,
        { data: i } = await t(r),
        a = n(i);
    return {
        title: `Index`,
        link: r,
        item: a(`tr.story`)
            .toArray()
            .map((t) => {
                let n = a(t).find(`a`).first().text(),
                    r = a(t).next(),
                    i = r.text().trimStart().split(`|`),
                    o = Number.parseInt(i[0].split(` points`)[0].trim()),
                    s = i[0].split(`by`)[1].trim(),
                    c = e(i[1].trim()),
                    l = [];
                i.length === 5 && (l = [i[2].trim(), i[3].trim()]);
                let u = r.find(`a`),
                    d = u.attr(`href`),
                    f = Number.parseInt(u.text()),
                    p = r
                        .find(`p`)
                        .toArray()
                        .map((e) => a(e).text())
                        .join(`<br>`);
                return { title: n, link: d, author: s, category: l, comments: f, upvotes: o, pubDate: c, description: p };
            }),
    };
}
export { r as route };
