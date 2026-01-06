import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = `https://freecomputerbooks.com/`;
async function l(e) {
    return a((await t(e)).data);
}
const u = {
    path: `/:category?`,
    name: `Book List`,
    url: new URL(c).host,
    maintainers: [`cubroe`],
    handler: d,
    example: `/freecomputerbooks/compscAlgorithmBooks`,
    parameters: { category: 'A category id., which should be the HTML file name (but **without** the `.html` suffix) in the URL path of a book list page.' },
    categories: [`reading`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`freecomputerbooks.com/`, `freecomputerbooks.com/index.html`], target: `` }],
};
async function d(t) {
    let n = t.req.param(`category`)?.trim(),
        r = n ? new URL(`${n}.html`, c).href : c,
        i = await l(r),
        a = i(`.maintitlebar`).text();
    return {
        title: `Free Computer Books - ` + a,
        link: r,
        description: i(`title`).text(),
        item: await Promise.all(
            i(`ul[id^=newBooks] > li`)
                .toArray()
                .map((t) => f(i(t), a, e))
        ),
    };
}
function f(e, t, n) {
    let r = a(``),
        i = e.find(`a:first`),
        o = e.find(`p:contains("Post under")`),
        s = {
            title: i.text(),
            link: new URL(i.attr(`href`), c).href,
            category: o.length
                ? o
                      .find(`a`)
                      .toArray()
                      .map((e) => r(e).text())
                : t,
        };
    return n.tryGet(s.link, () => p(s));
}
async function p(e) {
    let t = await l(e.link);
    t.root()
        .find(`*`)
        .contents()
        .filter((e, t) => t.type === `comment`)
        .remove();
    let a = t(`#bookdesc img[title]`).attr(`src`),
        c = t(`#booktitle ul`).removeAttr(`style`),
        u = t(`#bookdesccontent`).removeAttr(`id`);
    return (
        c.find(`li:contains(Share This)`).remove(),
        u.find(`img[src$="/hot.gif"]`).remove(),
        u.find(`:contains(Similar Books)`).nextAll().addBack().remove(),
        (e.description = o(i(n, { children: [r(`figure`, { children: r(`img`, { src: a ?? `` }) }), s(c.toString()), s(u.toString())] }))),
        e
    );
}
export { u as route };
