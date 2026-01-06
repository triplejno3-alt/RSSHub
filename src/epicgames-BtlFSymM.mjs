import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import o from 'dayjs';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = {
    path: `/freegames/:locale?/:country?`,
    categories: [`game`],
    view: n.Notifications,
    example: `/epicgames/freegames/en-US/US`,
    parameters: { locale: { description: `Locale`, default: `en-US` }, country: { description: `Country`, default: `US` } },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`store.epicgames.com/:locale/free-games`], target: `/freegames/:locale` }],
    name: `Free games`,
    maintainers: [`DIYgod`, `NeverBehave`, `Zyx-A`, `junfengP`, `nczitzk`, `KotaHv`],
    handler: l,
};
async function l(n) {
    let c = n.req.param(`locale`) ?? `en-US`,
        l = n.req.param(`country`) ?? `US`,
        u = `https://store.epicgames.com`,
        d = `${u}/${c}/free-games?lang=${c}`,
        f = `https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=${c}&country=${l}&allowCountries=${l}`,
        p = `https://store-content-ipv4.ak.epicgames.com/api/${c}/content`,
        m = await t({ method: `get`, url: f }),
        h = o(),
        g = m.data.data.Catalog.searchStore.elements
            .filter(
                (e) =>
                    e.promotions &&
                    e.promotions.promotionalOffers &&
                    e.promotions.promotionalOffers.length &&
                    e.promotions.promotionalOffers[0].promotionalOffers[0].discountSetting.discountType === `PERCENTAGE` &&
                    e.promotions.promotionalOffers[0].promotionalOffers[0].discountSetting.discountPercentage === 0 &&
                    o(e.promotions.promotionalOffers[0].promotionalOffers[0].startDate) <= h &&
                    o(e.promotions.promotionalOffers[0].promotionalOffers[0].endDate) > h
            )
            .map(async (n) => {
                let l = `${u}/${c}/p/`,
                    d = `${p}/products/`,
                    f = !1;
                n.categories.some((e) => e.path === `bundles`) && ((l = `${u}/${c}/bundles/`), (f = !0), (d = `${p}/bundles/`));
                let m = n.catalogNs.mappings && n.catalogNs.mappings.length > 0 ? n.catalogNs.mappings[0].pageSlug : n.offerMappings && n.offerMappings.length > 0 ? n.offerMappings[0].pageSlug : (n.productSlug ?? n.urlSlug);
                (n.offerType === `ADD_ON` && (m = n.offerMappings[0].pageSlug), (l += m), (d += m));
                let h = n.description;
                f && (h = (await t({ method: `get`, url: d })).data.data.about.shortDescription);
                let g = n.keyImages[0].url;
                n.keyImages.some((e) => (e.type === `DieselStoreFrontWide` ? ((g = e.url), !0) : !1));
                let _ = o(n.promotions.promotionalOffers[0].promotionalOffers[0].endDate).toISOString();
                return {
                    title: n.title,
                    author: n.seller.name,
                    link: l,
                    description: s(a(r, { children: [i(`p`, { children: h }), i(`img`, { src: g }), i(`p`, { children: `Free Now to ${_}` })] })),
                    pubDate: e(n.promotions.promotionalOffers[0].promotionalOffers[0].startDate),
                };
            });
    return { title: `Epic Games Store - Free Games`, link: d, item: await Promise.all(g) };
}
export { c as route };
