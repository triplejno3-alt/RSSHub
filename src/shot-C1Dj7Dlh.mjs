import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { t } from './utils-DFAyFAIS.mjs';
const n = {
    path: `/shot`,
    view: e.Articles,
    categories: [`new-media`],
    example: `/newslaundry/shot`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`newslaundry.com/shot`], target: `/shot` }],
    name: `Shot`,
    maintainers: [`Rjnishant530`],
    handler: r,
};
async function r() {
    return await t(`shot`);
}
export { n as route };
