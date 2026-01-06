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
const l = `https://nautil.us`,
    u = {
        path: `/topic/:tid`,
        categories: [`new-media`],
        example: `/nautil/topic/arts`,
        parameters: { tid: `topic` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`nautil.us/topics/:tid`] }],
        name: `Topics`,
        maintainers: [`emdoe`],
        handler: d,
        description: 'This route provides a flexible plan with full text content to subscribe specific topic(s) on the Nautilus. Please visit [nautil.us](https://nautil.us) and click `Topics` to acquire whole topic list.',
    };
async function d(u) {
    let d = await e.tryGet(`nautil:categories`, async () => {
            let { data: e } = await n(`${l}/wp-json/wp/v2/categories`, { searchParams: { per_page: 100 } });
            return e.map((e) => ({ id: e.id, name: e.name, slug: e.slug }));
        }),
        { data: f } = await n(`${l}/wp-json/wp/v2/posts`, { searchParams: { categories: d.find((e) => e.slug === u.req.param(`tid`).toLowerCase()).id, per_page: u.req.query(`limit`) ? Number.parseInt(u.req.query(`limit`)) : 20 } }),
        p = f.map((e) => {
            let n = e.yoast_head_json,
                l = o(e.content.rendered, null, !1);
            return (
                l(`img`).each((e, t) => {
                    ((t = l(t)), t.attr(`src`, t.attr(`data-src`) ?? t.attr(`srcset`)), t.attr(`src`, t.attr(`src`).split(`?`)[0]), t.removeAttr(`data-src`), t.removeAttr(`srcset`));
                }),
                {
                    title: e.title.rendered,
                    author: e.yoast_head_json.author,
                    description: s(a(r, { children: [n.og_image?.length ? n.og_image.map((e) => i(`img`, { src: e.url.split(`?`)[0] })) : null, c(l.html())] })),
                    link: e.link,
                    pubDate: t(e.date_gmt),
                }
            );
        });
    return { title: `Nautilus | ` + d.find((e) => e.slug === u.req.param(`tid`).toLowerCase()).name, link: `${l}/topics/${u.req.param(`tid`)}/`, item: p };
}
export { u as route };
