import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/ia/yjs`,
    categories: [`university`],
    example: `/cas/ia/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.ia.cas.cn/yjsjy/zs/sszs`, `www.ia.cas.cn/`] }],
    name: `自动化所`,
    maintainers: [`shengmaosu`],
    handler: r,
    url: `www.ia.cas.cn/yjsjy/zs/sszs`,
};
async function r() {
    let n = `http://www.ia.cas.cn/yjsjy/zs/sszs/`,
        r = t((await e(n)).data),
        i = r(`.col-md-9 li`);
    return {
        title: `中科院自动化所`,
        link: n,
        description: `中科院自动化所通知公告`,
        item: i && i.toArray().map((e) => ((e = r(e)), { title: e.find(`li a`).text(), description: e.find(`li a`).text(), link: e.find(`li a`).attr(`href`) })),
    };
}
export { n as route };
