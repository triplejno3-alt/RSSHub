import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './const-u94s3ec2.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/apps/search/:q`,
    example: `/shopify/apps/search/flow`,
    parameters: { q: `需要搜索的 App` },
    name: `App store search`,
    maintainers: [`PrintNow`],
    handler: i,
    radar: [
        {
            source: [`apps.shopify.com/search`],
            target: (e, t) => {
                let n = new URL(t).searchParams;
                return n.has(`q`) ? `/shopify/apps/search/${n.get(`q`)}` : ``;
            },
        },
    ],
};
async function i(r) {
    let { q: i = `` } = r.req.param(),
        a = n(await (await e.get(`${t}/search`, { searchParams: { q: i }, headers: { accept: `text/html, application/xhtml+xml`, 'accept-language': `en-US;q=0.9`, 'turbo-frame': `search_page`, referer: t, dnt: `1` } })).data),
        o = a(`.search-results-component div[data-controller="app-card"]`)
            .toArray()
            .map((e) => {
                let n = a(e).attr(`data-app-card-handle-value`),
                    r = a(e).find(`div.tw-self-stretch`).clone(),
                    i = r
                        .find(`span`)
                        .text()
                        .match(/\d\.\d/),
                    o = r.find(`span + span.tw-sr-only`).text().match(/\d+/);
                return {
                    title: a(e).attr(`data-app-card-name-value`) ?? ``,
                    link: `${t}/${n}`,
                    description: a(e).find(`div.tw-text-fg-tertiary`).first().text().trim(),
                    image: a(e).attr(`data-app-card-icon-url-value`),
                    _extra: {
                        handle: n,
                        description: a(e).find(`div.tw-text-fg-tertiary`).first().text().trim(),
                        built_for_shopify: a(e).find(`span.built-for-shopify-badge`).length > 0,
                        ratting: i ? Number.parseFloat(i[0]) : 0,
                        ratting_count: o ? Number(o[0]) : 0,
                    },
                };
            });
    return { title: `Search results for "${i}" – Shopify App Store`, link: `https://apps.shopify.com/search?q=${i}`, allowEmpty: !0, language: `en-us`, item: o };
}
export { r as route };
