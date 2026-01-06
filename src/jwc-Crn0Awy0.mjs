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
    path: `/jwc/:category?/:page?`,
    categories: [`university`],
    example: `/hunau/jwc`,
    parameters: { category: '页面分类，默认为 `tzgg`', page: '页码，默认为 `1`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`xky.hunau.edu.cn/`, `xky.hunau.edu.cn/tzgg_8472`, `xky.hunau.edu.cn/:category`], target: `/:category` }],
    name: `教务处`,
    maintainers: [],
    handler: n,
    url: `xky.hunau.edu.cn/`,
    description: `| 分类 | 通知公告 | 教务动态 | 其他教务通知... |
| ---- | -------- | -------- | --------------- |
| 参数 | tzgg     | jwds     | 对应 URL        |`,
};
async function n(t) {
    await e(t, { baseHost: `https://jwc.hunau.edu.cn`, baseCategory: `tzgg`, baseTitle: `湖南农业大学教务处`, baseDeparment: `jwc` });
}
export { t as route };
