import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './utils-EXn4xJ5g.mjs';
const t = `https://www.jou.edu.cn/index/tzgg.htm`,
    n = {
        path: `/tzgg`,
        categories: [`university`],
        example: `/jou/tzgg`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.jou.edu.cn/index/tzgg.htm`, `www.jou.edu.cn/`] }],
        name: `官网通知公告`,
        maintainers: [`real-jiakai`],
        handler: r,
        url: `www.jou.edu.cn/index/tzgg.htm`,
    };
async function r(n) {
    return { title: `江苏海洋大学 -- 通知公告`, link: t, item: await e(n, t, `https://www.jou.edu.cn`, `winstyle106390`, `timestyle106390`, `titlestyle106402`, `timestyle106402`) };
}
export { n as route };
