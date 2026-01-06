import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { a as r, c as i, n as a, r as o, s } from './utils-4UMbP2Qc.mjs';
const c = {
    path: `/news/:lang?`,
    categories: [`finance`],
    view: n.Articles,
    example: `/followin/news`,
    parameters: {
        lang: {
            description: `Language`,
            options: [
                { value: `en`, label: `English` },
                { value: `zh-Hans`, label: `简体中文` },
                { value: `zh-Hant`, label: `繁體中文` },
                { value: `vi`, label: `Tiếng Việt` },
            ],
            default: `en`,
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`followin.io/:lang?/news`, `followin.io/news`] }],
    name: `News`,
    maintainers: [`TonyRL`],
    handler: l,
};
async function l(n) {
    let { lang: c = `en` } = n.req.param(),
        { limit: l = 20 } = n.req.query(),
        u = await r(e.tryGet),
        { data: d } = await t(`${a}/_next/data/${u}/${c}/news.json`),
        f = i(d.pageProps.dehydratedState.queries.find((e) => e.queryKey[0] === `/feed/list/recommended/news`).state.data.pages[0].list.slice(0, l), c, u),
        p = await Promise.all(f.map((t) => s(t, e.tryGet)));
    return { title: `${c === `en` ? `News` : c === `vi` ? `Bản tin` : `快讯`} - Followin`, link: `${a}/${c}/news`, image: o, language: c, item: p };
}
export { c as route };
