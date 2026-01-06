import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
        path: `/monthly-games`,
        categories: [`game`],
        view: t.Notifications,
        example: `/ps/monthly-games`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.playstation.com/en-sg/ps-plus/whats-new`] }],
        name: `PlayStation Monthly Games`,
        maintainers: [`justjustCC`],
        handler: l,
        url: `www.playstation.com/en-sg/ps-plus/whats-new`,
    },
    c = (e, t) => o(i(n, { children: [r(`img`, { src: e }), t] }));
async function l() {
    let t = `https://www.playstation.com/en-sg/ps-plus/whats-new/`,
        { data: n } = await e(t),
        r = a(n);
    return {
        title: `PlayStation Plus Monthly Games`,
        link: t,
        item: r(`#monthly-games .box--light `)
            .toArray()
            .map((e) => {
                let t = r(e);
                return { title: t.find(`h3`).text(), description: c(t.find(`.media-block__img source`).attr(`srcset`), t.find(`h3 + p`).text()), link: t.find(`.btn--cta`).attr(`href`) };
            }),
    };
}
export { s as route };
