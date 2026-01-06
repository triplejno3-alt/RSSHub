import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ url: e, alt: t, caption: n, author: r }) => o(`figure`, { children: [a(`img`, { src: e, alt: t }), o(`figcation`, { children: [n ? o(i, { children: [a(`cite`, { children: n }), ` -`, ` `] }) : null, r] })] }),
    d = (e) => c(a(u, { ...e })),
    f = (e) => {
        let t = e(`figure.mainPhoto`),
            n = t.find(`img`),
            r = t.find(`span.copyright`),
            i = t.find(`span.imageDescription`);
        return d({ url: n.attr(`src`), alt: n.attr(`alt`)?.trim(), author: r.text()?.trim(), caption: i.text()?.trim() });
    },
    p = (e) => {
        let t = e(`[itemprop="articleBody"]`);
        return (
            e(`*`)
                .contents()
                .filter(function () {
                    return this.nodeType === 8;
                })
                .remove(),
            t.find(`aside`).remove(),
            t.find(`.videoPlayerContainer`).remove(),
            t.find(`.pulsevideo`).remove(),
            t.find(`.adsContainer`).remove(),
            t.find(`.placeholder`).remove(),
            t.find(`.contentPremium`).removeAttr(`style`),
            t.find(`div.image`).each((t, n) => {
                let r = e(n).find(`img`),
                    i = e(n).find(`span.author`),
                    a = e(n).find(`span.caption`),
                    o = d({ url: r.attr(`src`), alt: r.attr(`alt`)?.trim(), caption: a.text()?.trim(), author: i.text()?.trim() });
                e(n).replaceWith(o);
            }),
            t
        );
    },
    m = {
        path: `/news`,
        categories: [`new-media`],
        example: `/onet/news`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`wiadomosci.onet.pl/`] }],
        name: `News`,
        maintainers: [`Vegann`],
        handler: h,
        url: `wiadomosci.onet.pl/`,
        description: 'This route provides a better reading experience (full text articles) over the official one for `https://wiadomosci.onet.pl`.',
    };
async function h() {
    let i = await r.parseURL(`https://wiadomosci.onet.pl/.feed`),
        a = await Promise.all(
            i.items.map(async (r) => {
                let {
                    description: i,
                    author: a,
                    category: o,
                } = await e.tryGet(r.link, async () => {
                    let { data: e } = await n(r.link, { headers: { referer: `https://www.onet.pl/` } }),
                        t = s(e),
                        i = p(t),
                        a = f(t);
                    return { description: g(t(`#lead`).text()?.trim(), a, i.html()?.trim()), author: t(`.authorNameWrapper span[itemprop="name"]`).text()?.trim(), category: t(`span.relatedTopic`).text()?.trim() };
                });
                return { title: r.title, link: r.link, description: i, author: a, category: o, pubDate: t(r.pubDate), guid: r.id };
            })
        );
    return { title: i.title, link: i.link, description: i.title, item: a, language: `pl`, image: `https://ocdn.eu/wiadomosciucs/static/logo2017/onet2017big_dark.png` };
}
const g = (e, t, n) => c(o(i, { children: [e ? a(`p`, { children: a(`strong`, { children: e }) }) : null, l(t), n ? l(n) : null] }));
export { m as route };
