import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './utils-Bry6Na7d.mjs';
const n = {
    path: `/pin/hotlist`,
    categories: [`social-media`],
    example: `/zhihu/pin/hotlist`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.zhihu.com/zhihu/bookstore/newest`] }],
    name: `知乎想法热榜`,
    maintainers: [`xyqfer`],
    handler: r,
    url: `www.zhihu.com/zhihu/bookstore/newest`,
};
async function r() {
    let {
        data: { data: n },
    } = await e({ method: `get`, url: `https://api.zhihu.com/pins/hot_list?reverse_order=0` });
    return { title: `知乎想法热榜`, link: `https://www.zhihu.com/`, description: `整点更新`, item: t(n) };
}
export { n as route };
