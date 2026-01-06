import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './utils-B1TuH4pn.mjs';
import { t as e } from './review-U4uDTzbX.mjs';
const t = {
    path: `/review/:id/:order?/:lang?`,
    categories: [`game`],
    example: `/taptap/review/142793/hot`,
    parameters: { id: `游戏 ID，游戏主页 URL 中获取`, order: `排序方式，空为综合，可选如下`, lang: '语言，`zh-CN` 或 `zh-TW`，默认为 `zh-CN`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.taptap.cn/app/:id/review`, `www.taptap.cn/app/:id`], target: `/review/:id` }],
    name: `游戏评价`,
    maintainers: [`hoilc`, `TonyRL`],
    handler: e,
    description: `| 最新   | 综合 |
| --- | --- |
| new | hot |`,
};
export { t as route };
