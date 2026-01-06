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
    path: `/:category?`,
    categories: [`new-media`],
    example: `/secretsanfrancisco/top-news`,
    parameters: { category: `category name, can be found in url` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`secretsanfrancisco.com/:category`], target: `/:category` }],
    name: `Category`,
    maintainers: [`EthanWng97`],
    handler: u,
};
async function u(l) {
    let u = `https://secretsanfrancisco.com`,
        d = `/wp-json/wp/v2/categories`,
        f = l.req.param(`category`) || ``,
        p;
    f &&
        (p = await e.tryGet(`${u}${d}`, async () => {
            let { data: e } = await n(`${u}${d}`, { searchParams: { slug: f } });
            if (!e || e.length === 0) throw Error(`Category "${f}" not found`);
            return e[0];
        }));
    let m = p?.id,
        h = p?.name,
        g = p?.link,
        _ = (await n(`${u}/wp-json/wp/v2/posts`, { searchParams: { per_page: l.req.query(`limit`) ? Number.parseInt(l.req.query(`limit`)) : 10, _embed: ``, ...(m && { categories: m }) } })).data
            .filter((e) => e.language === `en`)
            .map((e) => {
                let n = e._embedded?.[`wp:featuredmedia`]?.find((t) => t.id === e.featured_media),
                    l = n?.source_url,
                    u = n?.alt_text || n?.title?.rendered,
                    d;
                return (
                    n?.caption?.rendered && (d = o(n?.caption?.rendered)),
                    {
                        title: e.title.rendered,
                        description: s(
                            a(r, {
                                children: [
                                    l ? a(`figure`, { children: [u ? i(`img`, { src: l, alt: u }) : i(`img`, { src: l }), i(`figcaption`, { children: d?.text() || `` })] }) : null,
                                    e.content?.rendered ? c(e.content.rendered) : null,
                                ],
                            })
                        ),
                        link: e.link,
                        pubDate: t(e.date_gmt),
                        updated: t(e.modified_gmt),
                        image: l,
                        author: e._embedded.author[0].name,
                    }
                );
            });
    return { title: h ? `Secret San Francisco - ${h}` : `Secret San Francisco`, link: g || `${u}/${f}`, item: _ };
}
export { l as route };
