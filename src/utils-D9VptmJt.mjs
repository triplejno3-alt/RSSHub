import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = `https://furstar.jp`,
    c = (e) => (e ? `${s}/${e}` : s),
    l = (e) => a(r(`div`, { children: [n(`img`, { src: e.avatar }), e.link === null ? n(`a`, { href: `#`, children: e.name }) : n(`a`, { href: e.link, children: e.name })] })),
    u = (e, i, s) => a(r(t, { children: [n(`p`, { children: e }), i.map((e) => n(`img`, { src: e })), o(l(s))] })),
    d = (e) => {
        let t = i(e),
            n = t(`a`),
            r = { name: null, avatar: null, link: null };
        if (n.length > 0) {
            let e = t(`a img`);
            ((r.name = e.attr(`alt`)), (r.avatar = e.attr(`src`)), (r.link = n.attr(`href`)));
        } else {
            let e = t(`img`);
            ((r.name = e.attr(`alt`)), (r.avatar = e.attr(`src`)));
        }
        return r;
    };
var f = {
    BASE: s,
    langBase: c,
    fetchAllCharacters: (e, t) =>
        i(e)(`.character-article`)
            .toArray()
            .map((e) => {
                let n = i(e);
                return {
                    title: n(`.character-headline`).text().trim(),
                    headImage: n(`.character-images img`).attr(`src`).trim(),
                    detailPage: `${t}/${n(`.character-images a`).attr(`href`).trim()}`,
                    author: d(n(`.character-description`).html()),
                };
            }),
    detailPage: (t, n) =>
        n.tryGet(t, async () => {
            let n = i((await e(t, { https: { rejectUnauthorized: !1 } })).data),
                r = n(`.row .panel-heading h2`).text().trim(),
                a = n(`.character-description p`).text().trim();
            return {
                title: r,
                pics: n(`.img-gallery .prettyPhoto`)
                    .toArray()
                    .map((e) => `${s}/${i(e)(`a`).attr(`href`).trim().slice(2)}`),
                desc: a,
                author: d(n(`.character-description`).html()),
            };
        }),
    authorDetail: d,
    renderDesc: u,
    renderAuthor: l,
};
export { f as t };
