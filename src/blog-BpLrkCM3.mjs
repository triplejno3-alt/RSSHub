import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './utils-WI9NnzyQ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = {
    path: `/blog`,
    categories: [`programming`],
    example: `/gitpod/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gitpod.io/blog`, `gitpod.io/`] }],
    name: `Blog`,
    maintainers: [`TonyRL`],
    handler: d,
    url: `gitpod.io/blog`,
};
async function d(u) {
    let d = u.req.query(`limit`) ? Number.parseInt(u.req.query(`limit`)) : 10,
        f = s((await n(r + `/blog`)).data),
        p = f(`div[class^="flex justify-center"]`)
            .slice(0, d)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.find(`h2`).text(), link: r + e.find(`a`).attr(`href`), pubDate: t(e.find(`span[class^=date]`).text()) }));
    p = await Promise.all(
        p.map((t) =>
            e.tryGet(t.link, async () => {
                let e = s((await n(t.link)).data),
                    r = e(`img[class^=max-h]`),
                    u = e(`div[class^=content-blog]`).html();
                return (
                    (t.description = c(o(i, { children: [a(`img`, { src: r.attr(`src`), alt: r.attr(`alt`) }), u ? l(u) : null] }))),
                    (t.author = e(`span.avatars a`)
                        .toArray()
                        .map((t) => e(t).text().trim())
                        .join(`, `)),
                    t
                );
            })
        )
    );
    let m = { title: f(`title`).text(), link: r + `/blog`, description: f(`meta[name="description"]`).attr(`content`), language: `en-US`, item: p };
    return (u.set(`json`, m), m);
}
export { u as route };
