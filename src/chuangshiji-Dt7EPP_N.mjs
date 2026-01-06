import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { n as t, r as n, t as r } from './utils-7RMq-xOX.mjs';
const i = {
    path: `/csj`,
    categories: [`new-media`],
    example: `/sina/csj`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`tech.sina.com.cn/chuangshiji`, `tech.sina.com.cn/`] }],
    name: `专栏 - 创事记`,
    maintainers: [`xapool`],
    handler: a,
    url: `tech.sina.com.cn/chuangshiji`,
};
async function a(i) {
    let { limit: a = `50` } = i.req.query(),
        o = n((await r(`402`, `2559`, a)).data.result.data);
    return { title: `新浪专栏-创事记`, link: `https://tech.sina.com.cn/chuangshiji`, item: await Promise.all(o.map((n) => t(n, e.tryGet))) };
}
export { i as route };
