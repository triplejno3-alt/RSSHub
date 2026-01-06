import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { jsx as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
    path: `/search/:q/:order?`,
    categories: [`picture`],
    view: r.Pictures,
    example: `/pixabay/search/cat`,
    parameters: {
        q: `Search term`,
        order: {
            description: `Order`,
            options: [
                { value: `popular`, label: `popular` },
                { value: `latest`, label: `latest` },
            ],
            default: `latest`,
        },
    },
    features: { requireConfig: [{ name: `PIXABAY_KEY`, optional: !0, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`pixabay.com/:searchType/search/:q`], target: `/search/:q` }],
    name: `Search`,
    maintainers: [`TonyRL`],
    handler: s,
};
async function s(r) {
    let { q: o, order: s = `latest` } = r.req.param(),
        l = e.pixabay?.key ?? `7329690-bbadad6d872ba577d5a358679`,
        u = `https://pixabay.com`,
        d = (
            await t.tryGet(
                `pixabay:search:${o}:${s}`,
                async () => {
                    let { data: e } = await n(`${u}/api/`, { searchParams: { key: l, q: o, order: s, per_page: r.req.query(`limit`) ?? 200 } });
                    return e;
                },
                Math.max(e.cache.contentExpire, 1440 * 60),
                !1
            )
        ).hits.map((e) => {
            let { pageURL: t, tags: n, user: r } = e;
            return {
                title: t
                    .substring(t.lastIndexOf(`/`, t.lastIndexOf(`/`) - 1) + 1, t.lastIndexOf(`/`))
                    .replace(/(-\d+)$/, ``)
                    .replaceAll(`-`, ` `),
                description: a(i(c, { item: e })),
                link: t,
                category: n.split(`, `),
                author: r,
            };
        });
    return {
        title: `Search ${o} - Pixabay`,
        description: `Download & use free nature stock photos in high resolution ✓ New free images everyday ✓ HD to 4K ✓ Best nature pictures for all devices on Pixabay`,
        link: `${u}/images/search/${o}/${s === `latest` ? `?order=latest` : ``}`,
        image: `https://pixabay.com/apple-touch-icon.png`,
        language: `en`,
        item: d,
    };
}
const c = ({ item: e }) => i(`img`, { src: e.largeImageURL || e.webformatURL || e.previewURL });
export { o as route };
