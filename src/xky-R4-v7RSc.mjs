import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './common-hb1Jsf-n.mjs';
const t = {
    path: `/xky/:category?/:page?`,
    categories: [`university`],
    example: `/hunau/xky`,
    parameters: { category: '页面分类，默认为 `tzgg_8472`', page: '页码，默认为 `1`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xky.hunau.edu.cn/`, `xky.hunau.edu.cn/tzgg_8472`, `xky.hunau.edu.cn/:category`], target: `/:category` }],
    name: `信息与智能科学学院`,
    maintainers: [],
    handler: n,
    url: `xky.hunau.edu.cn/`,
    description: `| 分类 | 通知公告   | 学院新闻 | 其他分类通知... |
| ---- | ---------- | -------- | --------------- |
| 参数 | tzgg_8472 | xyxw     | 对应 URL        |`,
};
async function n(t) {
    await e(t, {
        baseHost: `https://xky.hunau.edu.cn`,
        baseCategory: `tzgg_8472`,
        baseTitle: `信息与智能科学技术学院`,
        baseDescription: `湖南农业大学信息与智能科学技术学院`,
        baseDeparment: `xky`,
        baseClass: `div.right_list ul li:has(a)`,
    });
}
export { t as route };
