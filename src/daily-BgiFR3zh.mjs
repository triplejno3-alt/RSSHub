import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './utils-Bry6Na7d.mjs';
const n = {
    path: `/pin/daily`,
    categories: [`social-media`],
    example: `/zhihu/pin/daily`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`daily.zhihu.com/*`], target: `/daily` }],
    name: `知乎想法 - 24 小时新闻汇总`,
    maintainers: [`xyqfer`],
    handler: r,
    url: `daily.zhihu.com/*`,
};
async function r() {
    let {
        data: { data: n },
    } = await e({ method: `get`, url: `https://api.zhihu.com/pins/special/972884951192113152/moments?order_by=newest&reverse_order=0&limit=20` });
    return { title: `知乎想法-24小时新闻汇总`, link: `https://www.zhihu.com/pin/special/972884951192113152`, description: `汇集每天的社会大事、行业资讯，让你用最简单的方式获得想法里的新闻`, item: t(n) };
}
export { n as route };
