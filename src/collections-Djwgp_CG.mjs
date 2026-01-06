import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, r as n, t as r } from './utils-1r_RsdOL.mjs';
const i = {
        path: `/collections/:type`,
        view: e.Articles,
        categories: [`programming`],
        example: `/css-tricks/collections/2`,
        parameters: {
            category: {
                description: `Collection Type`,
                options: [
                    { value: `3`, label: `Latest CSS Guides` },
                    { value: `2`, label: `Fresh From the Almanac` },
                    { value: `4`, label: `Classic Tricks` },
                ],
            },
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`css-tricks.com`], target: `/collections/:type` }],
        name: `CSS Guides`,
        maintainers: [`Rjnishant530`],
        handler: o,
    },
    a = { 2: `pages`, 3: `posts`, 4: `chapters` };
async function o(e) {
    let i = e.req.param(`type`),
        o = i === `1` ? `2` : i,
        s = `body > div.page-wrap > section.post-sliders > div:nth-child(${o})`,
        c = `${s}>div.post-slider-header.header-card > h2`,
        l = `${s}>div.post-slider-header.header-card > p`,
        { title: u, description: d, cards: f } = await r(`${s} article.mini-card.module.module-article`, c, l),
        p = await t(f, !0, a[o]);
    return { title: u || `Fresh From the Almanac`, description: d || `Properties, selectors, rules, and functions!`, link: n, item: p, language: `en`, logo: `${n}/favicon.ico`, icon: `${n}/favicon.ico` };
}
export { i as route };
