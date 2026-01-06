import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './utils-CJwvetmU.mjs';
const t = {
    path: `/date/:date?`,
    categories: [`reading`],
    example: `/sobooks/date/2020-11`,
    parameters: { date: `日期，见例子，默认为当前年月` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sobooks.net/:category`], target: `/:category` }],
    name: `归档`,
    maintainers: [`nczitzk`],
    handler: n,
};
async function n(t) {
    return await e(t, `books/date/${(t.req.param(`date`) ?? `${new Date().getFullYear()}/${new Date().getMonth()}`).replace(`-`, `/`)}`);
}
export { t as route };
