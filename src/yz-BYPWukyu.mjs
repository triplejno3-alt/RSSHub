import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './utils-EXn4xJ5g.mjs';
const t = `https://yz.jou.edu.cn/index/zxgg.htm`,
    n = {
        path: `/yztzgg`,
        categories: [`university`],
        example: `/jou/yztzgg`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`yz.jou.edu.cn/index/zxgg.htm`, `yz.jou.edu.cn/`] }],
        name: `研招网通知公告`,
        maintainers: [`real-jiakai`],
        handler: r,
        url: `yz.jou.edu.cn/index/zxgg.htm`,
    };
async function r(n) {
    return { title: `江苏海洋大学 -- 研招通知公告`, link: t, item: await e(n, t, `https://yz.jou.edu.cn`, `winstyle207638`, `timestyle207638`, `titlestyle207543`, `timestyle207543`) };
}
export { n as route };
