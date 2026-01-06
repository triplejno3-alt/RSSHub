import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = async (t) => {
        let s = Number.parseInt(t.req.query(`limit`) ?? `50`, 10),
            c = `https://coolbuy.com`,
            l = new URL(`api/v1.4/product_preview`, c).href,
            u = await e(l, { query: { order_by: `-id`, limit: s, page: 0, offset: 0 } }),
            d = a(await e(c)),
            f = d(`html`).attr(`lang`) ?? `zh`,
            p = u.objects.slice(0, s).map((e) => {
                let t = e.title,
                    a = e.cover_image?.split(/\?/)?.[0],
                    s = [e.display_image?.split(/\?/)?.[0], a].filter(Boolean).map((e) => ({ src: e, alt: t })),
                    l = o(
                        i(n, {
                            children: [
                                r(`table`, {
                                    children: i(`tbody`, {
                                        children: [
                                            e.summary ? i(`tr`, { children: [r(`th`, { children: `简介` }), r(`td`, { children: e.summary })] }) : null,
                                            e.price ? i(`tr`, { children: [r(`th`, { children: `价格` }), r(`td`, { children: e.price })] }) : null,
                                            e.original_price ? i(`tr`, { children: [r(`th`, { children: `原价` }), r(`td`, { children: e.original_price })] }) : null,
                                            e.highest_price ? i(`tr`, { children: [r(`th`, { children: `价格（最高）` }), r(`td`, { children: e.highest_price })] }) : null,
                                            e.highest_original_price ? i(`tr`, { children: [r(`th`, { children: `原价（最高）` }), r(`td`, { children: e.highest_original_price })] }) : null,
                                        ],
                                    }),
                                }),
                                s?.length ? s.map((e) => (e?.src ? r(`figure`, { children: e.alt ? r(`img`, { src: e.src, alt: e.alt }) : r(`img`, { src: e.src }) }) : null)) : null,
                            ],
                        })
                    ),
                    u = e.visit_url,
                    d = `coolbuy-${e.id}#${e.price}`;
                return { title: t, description: l, link: u ?? new URL(e.id, c).href, guid: d, id: d, content: { html: l, text: l }, image: a, banner: a, language: f };
            });
        return {
            title: d(`title`).text(),
            description: d(`meta[property="og:description"]`).attr(`content`),
            link: c,
            item: p,
            allowEmpty: !0,
            image: new URL(`static/coolbuy/packages/dongguan/dist/images/97be46f6.png`, `https://mcache.ifanr.cn`).href,
            language: f,
            id: c,
        };
    },
    c = {
        path: `/`,
        name: `产品`,
        url: `coolbuy.com`,
        maintainers: [`nczitzk`],
        handler: s,
        example: `/coolbuy`,
        parameters: void 0,
        description: void 0,
        categories: [`shopping`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`coolbuy.com`], target: `/` }],
        view: t.Articles,
    };
export { s as handler, c as route };
