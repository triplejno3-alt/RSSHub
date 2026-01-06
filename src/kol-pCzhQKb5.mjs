import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { a as n, c as r, n as i, s as a } from './utils-4UMbP2Qc.mjs';
const o = {
    path: `/kol/:kolId/:lang?`,
    categories: [`finance`],
    example: `/followin/kol/4075592991`,
    parameters: { kolId: `KOL ID, can be found in URL`, lang: 'Language, see table above, `en` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`followin.io/:lang/kol/:kolId`, `followin.io/kol/:kolId`] }],
    name: `KOL`,
    maintainers: [`TonyRL`],
    handler: s,
};
async function s(o) {
    let { kolId: s, lang: c = `en` } = o.req.param(),
        { limit: l = 10 } = o.req.query(),
        u = await n(e.tryGet),
        { data: d } = await t(`${i}/_next/data/${u}/${c}/kol/${s}.json`),
        { queries: f } = d.pageProps.dehydratedState,
        { data: p } = f.find((e) => e.queryKey[0] === `/user/get_profile`).state,
        m = r(f.find((e) => e.queryKey[0] === `/feed/list/user`).state.data.pages[0].list.slice(0, l), c, u),
        h = await Promise.all(m.map((t) => a(t, e.tryGet)));
    return { title: `${p.nickname} - Followin`, description: p.bio, link: `${i}/${c}/kol/${s}`, image: p.avatar, language: c, item: h };
}
export { o as route };
