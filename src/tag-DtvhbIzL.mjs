import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { a as n, c as r, i, n as a, o, s, t as c } from './utils-4UMbP2Qc.mjs';
const l = {
    path: `/tag/:tagId/:lang?`,
    categories: [`finance`],
    example: `/followin/tag/177008`,
    parameters: { tagId: `Tag ID, can be found in URL`, lang: 'Language, see table above, `en` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`followin.io/:lang/tag/:tagId`, `followin.io/tag/:tagId`] }],
    name: `Tag`,
    maintainers: [`TonyRL`],
    handler: u,
};
async function u(l) {
    let { tagId: u, lang: d = `en` } = l.req.param(),
        { limit: f = 20 } = l.req.query(),
        p = await n(e.tryGet),
        m = await e.tryGet(`followin:tag:${u}:${d}`, async () => {
            let { data: e } = await t(`${a}/_next/data/${p}/${d}/tag/${u}.json`),
                { queries: n } = e.pageProps.dehydratedState,
                { base_info: r } = n.find((e) => e.queryKey[0] === `/tag/info/v2`).state.data;
            return r;
        }),
        h = await o(e.tryGet),
        g = i(d),
        { data: _ } = await t.post(`${c}/feed/list/tag`, { headers: { 'x-bparam': JSON.stringify(g), 'x-gtoken': h }, json: { count: f, id: Number.parseInt(u), type: `tag_discussion_feed` } });
    if (_.code !== 2e3) throw Error(_.msg);
    let v = r(_.data.list.slice(0, f), d, p),
        y = await Promise.all(v.map((t) => s(t, e.tryGet)));
    return { title: `${m.name} - Followin`, description: m.description, link: `${a}/${d}/tag/${u}`, image: m.logo, language: d, item: y };
}
export { l as route };
