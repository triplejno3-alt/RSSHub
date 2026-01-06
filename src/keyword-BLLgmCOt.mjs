import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './utils-DFqNU-x2.mjs';
const t = {
    path: `/keyword/:keyword`,
    categories: [`design`],
    example: `/dribbble/keyword/player`,
    parameters: { keyword: `desired keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Keyword`,
    maintainers: [`DIYgod`, `loganrockmore`],
    handler: n,
};
async function n(t) {
    let n = t.req.param(`keyword`),
        r = `https://dribbble.com/search/shots/recent?q=${n}`,
        i = `Dribbble - keyword ${n}`;
    return await e.getData(r, i);
}
export { t as route };
