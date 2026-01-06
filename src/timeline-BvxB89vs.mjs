import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as t, n, r, t as i } from './utils-fhcja1zS.mjs';
const a = {
    path: `/timeline`,
    categories: [`new-media`],
    example: `/utgd/timeline`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`utgd.net/`] }],
    name: `时间线`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `utgd.net/`,
};
async function o(a) {
    let o = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 20,
        s = r((await e(`${i}/api/v2/timeline/`, { query: { page: 1, page_size: o } })).results, o);
    return { title: `UNTAG`, link: t, item: await Promise.all(s.map((e) => n(e))) };
}
export { a as route };
