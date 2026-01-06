import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { t as n } from './valid-host-Bsy2BS2p.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
        path: `/:username/:products`,
        categories: [`shopping`],
        example: `/gumroad/afkmaster/Eve10`,
        parameters: { username: `username, can be found in URL`, products: `products name, can be found in URL` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Products`,
        maintainers: [`Fatpandac`],
        handler: d,
        description: '`https://afkmaster.gumroad.com/l/Eve10` -> `/gumroad/afkmaster/Eve10`',
    },
    u = (e, t, n, o, l) => s(a(r, { children: [i(`img`, { src: e }), i(`h1`, { children: t }), i(`p`, { style: `color: red;`, children: n }), o ? i(r, { children: c(o) }) : null, i(`hr`, {}), l ? i(r, { children: c(l) }) : null] }));
async function d(r) {
    let i = r.req.param(`username`),
        a = r.req.param(`products`);
    if (!n(i)) throw new t(`Invalid username`);
    let s = `https://${i}.gumroad.com/l/${a}`,
        c = await e(s),
        l = o(c.data),
        d = l(`section.product-content.product-content__row > header > h1`).text(),
        f = l(`section.product-content.product-content__row > section.details > a`).text(),
        p = [
            {
                title: d,
                link: s,
                description: u(
                    c.data.match(/data-preview-url="(.*?)"/)[1],
                    d,
                    l(`div.price`).text(),
                    l(`section.product-content.product-content__row > section:nth-child(3) > div`).html(),
                    l(`div.product-info`).find(`ul.stack`).html()
                ),
            },
        ];
    return { link: s, title: `Gumroad - ${f}/${d}`, item: p };
}
export { l as route };
