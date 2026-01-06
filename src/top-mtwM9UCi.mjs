import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { n as t, t as n } from './util-311rBg0P.mjs';
const r = {
    path: `/top/:category?`,
    categories: [`reading`],
    example: `/56kog/top/weekvisit`,
    parameters: { category: `分类，见下表，默认为周点击榜` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `榜单`,
    maintainers: [`nczitzk`],
    handler: i,
    description: `| [周点击榜](https://www.56kog.com/top/weekvisit.html) | [总收藏榜](https://www.56kog.com/top/goodnum.html) | [最新 入库](https://www.56kog.com/top/postdate.html) |
| ---------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| weekvisit                                            | goodnum                                            | postdate                                             |`,
};
async function i(r) {
    let { category: i = `weekvisit` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 30,
        o = new URL(`top/${i.split(/_/)[0]}_1.html`, t).href;
    return await n(a, o, e.tryGet);
}
export { r as route };
