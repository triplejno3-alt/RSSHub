import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './utils-DFqNU-x2.mjs';
const t = {
    path: `/popular/:timeframe?`,
    categories: [`design`],
    example: `/dribbble/popular`,
    parameters: { timeframe: `support the following values: week, month, year and ever` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`dribbble.com/`], target: `/popular` }],
    name: `Popular`,
    maintainers: [`DIYgod`, `loganrockmore`],
    handler: n,
    url: `dribbble.com/`,
};
async function n(t) {
    let n = t.req.param(`timeframe`),
        r = `https://dribbble.com/shots/popular${n ? `?timeframe=${n}` : ``}`;
    return await e.getData(r, `Dribbble - Popular Shots`);
}
export { t as route };
