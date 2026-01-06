import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { a as n, c as r, n as i, s as a } from './utils-4UMbP2Qc.mjs';
const o = {
    path: `/topic/:topicId/:lang?`,
    categories: [`finance`],
    example: `/followin/topic/40`,
    parameters: { topicId: `Topic ID, can be found in URL`, lang: 'Language, see table above, `en` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`followin.io/:lang/topic/:topicId`, `followin.io/topic/:topicId`] }],
    name: `Topic`,
    maintainers: [`TonyRL`],
    handler: s,
};
async function s(o) {
    let { topicId: s, lang: c = `en` } = o.req.param(),
        { limit: l = 20 } = o.req.query(),
        u = await n(e.tryGet),
        { data: d } = await t(`${i}/_next/data/${u}/${c}/topic/${s}.json`),
        { queries: f } = d.pageProps.dehydratedState,
        { data: p } = f.find((e) => e.queryKey[0] === `/topic/info`).state,
        m = r(f.find((e) => e.queryKey[0] === `/feed/list/topic`).state.data.pages[0].list.slice(0, l), c, u),
        h = await Promise.all(m.map((t) => a(t, e.tryGet)));
    return { title: `${p.title} - Followin`, description: p.desc, link: `${i}/${c}/topic/${s}`, image: p.logo, language: c, item: h };
}
export { o as route };
