import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './util-D9dIK4sp.mjs';
const t = {
    path: `/safe/business/:site?`,
    categories: [`government`],
    example: `/gov/safe/business/beijing`,
    parameters: { site: `站点，见上表，默认为 beijing` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `业务咨询`,
    maintainers: [`nczitzk`],
    handler: n,
};
async function n(t) {
    let { site: n = `beijing` } = t.req.param();
    return await e(n, `ywzx`, t.req.query(`limit`) ? Number.parseInt(t.req.query(`limit`), 10) : 3);
}
export { t as route };
