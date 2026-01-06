import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, t as n } from './utils-DFAyFAIS.mjs';
const r = {
    path: `/nl-cheatsheet`,
    view: e.Articles,
    categories: [`new-media`],
    example: `/newslaundry/nl-cheatsheet`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`newslaundry.com/collection/nl-cheatsheet`], target: `/nl-cheatsheet` }],
    name: `Explains`,
    maintainers: [`Rjnishant530`],
    handler: i,
};
async function i() {
    return await n(`nl-cheatsheet`, `${t}/collection/nl-cheatsheet`);
}
export { r as route };
