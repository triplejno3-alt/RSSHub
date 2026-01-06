import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/news/:category?`,
    categories: [`traditional-media`],
    example: `/i-cable/news`,
    parameters: { category: `分類，默認為新聞資訊` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [
        { source: [`www.i-cable.com`], target: `/news` },
        { source: [`www.i-cable.com/category/:category`], target: `/news/:category` },
    ],
    name: `新聞`,
    maintainers: [`quiniapiezoelectricity`],
    handler: u,
    url: `www.i-cable.com/`,
    description: `
::: tip
分類只可用分類名稱，如：新聞資訊/港聞
:::`,
};
async function u(l) {
    let u = l.req.param(`category`) ?? `新聞資訊`,
        d = l.req.query(`limit`) ?? 20,
        f = `https://www.i-cable.com/wp-json/wp/v2`,
        p = await t.tryGet(`${f}/categories?slug=${u}`, async () => await n(`${f}/categories?slug=${u}`), e.cache.routeExpire, !1);
    if (p.data.length < 1) throw new r(`Invalid Category: ${u}`);
    let m = p.data[0],
        h = (await n(`${f}/posts?_embed=1&categories=${m.id}&per_page=${d}`)).data.map((e) => {
            let t = s(
                o(i, {
                    children: [
                        e._embedded[`wp:featuredmedia`]?.length ? e._embedded[`wp:featuredmedia`].map((e) => a(`figure`, { children: a(`img`, { src: e.source_url }) })) : null,
                        e.content.rendered ? c(e.content.rendered) : null,
                    ],
                })
            );
            return { title: e.title.rendered, link: e.link, pubDate: e.date_gmt, description: t, category: e._embedded[`wp:term`][0].map((e) => e.name) ?? [] };
        });
    return { title: `有線新聞 - ${m.name}`, description: m.description, link: m.link, item: h };
}
export { l as route };
