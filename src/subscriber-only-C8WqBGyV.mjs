import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { t } from './utils-DFAyFAIS.mjs';
const n = {
    path: `/subscriber-only`,
    view: e.Articles,
    categories: [`new-media`],
    example: `/newslaundry/subscriber-only`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`newslaundry.com/subscriber-only`], target: `/subscriber-only` }],
    name: `Subscriber Only`,
    maintainers: [`Rjnishant530`],
    handler: r,
};
async function r() {
    return await t(`subscriber-only`);
}
export { n as route };
