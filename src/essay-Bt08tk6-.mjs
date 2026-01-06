import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { n as e, r as t, t as n } from './utils-COEECZhI.mjs';
const r = {
    path: `/essay`,
    categories: [`journal`],
    example: `/caareviews/essay`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`caareviews.org/reviews/essay`] }],
    name: `Essays`,
    maintainers: [`Fatpandac`],
    handler: i,
    url: `caareviews.org/reviews/essay`,
};
async function i(r) {
    let i = `${t}/reviews/essay`;
    return { title: `Essays`, link: i, item: await n(r, await e(i)) };
}
export { r as route };
