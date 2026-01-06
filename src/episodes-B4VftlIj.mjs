import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/episodes`,
    categories: [`multimedia`],
    example: `/storyfm/episodes`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !0, supportScihub: !1 },
    radar: [{ source: [`storyfm.cn/episodes-list`, `storyfm.cn/`] }],
    name: `播客`,
    maintainers: [`nczitzk`],
    handler: u,
    url: `storyfm.cn/episodes-list`,
};
async function u() {
    let l = `https://storyfm.cn/episodes-list/`,
        u = o((await n({ method: `get`, url: l })).data),
        d = u(`.e-ep`)
            .toArray()
            .map((e) => {
                e = u(e);
                let n = e.find(`h2.e-ep__title a`);
                return {
                    title: n.text(),
                    link: n.attr(`href`),
                    pubDate: t(e.find(`.whitespace-nowrap`).text()),
                    enclosure_type: `audio/mpeg`,
                    enclosure_url: e.find(`audio source`).attr(`src`),
                    itunes_item_image: e.find(`.zoom-image-container-progression img`).attr(`src`),
                };
            });
    return (
        (d = await Promise.all(
            d.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = o((await n({ method: `get`, url: t.link })).data);
                    return (
                        (t.author = e(`.rs-post__author`).text().replace(/By/, ``).trim()),
                        (t.description = s(
                            a(r, { children: [t.enclosure_url ? i(`audio`, { controls: !0, children: i(`source`, { src: t.enclosure_url }) }) : null, e(`.rs-post__content`).html() ? c(e(`.rs-post__content`).html()) : null] })
                        )),
                        t
                    );
                })
            )
        )),
        { title: `故事FM`, link: l, item: d, itunes_author: `故事FM`, image: u(`.custom-logo-link img`).attr(`src`) }
    );
}
export { l as route };
