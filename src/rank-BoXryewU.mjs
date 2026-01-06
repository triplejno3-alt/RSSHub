import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { r as e, t } from './utils-C1nO_tyr.mjs';
const n = {
    path: `/ac/rank/:type?/:time?`,
    categories: [`anime`],
    example: `/qq/ac/rank`,
    parameters: { type: `分类，见下表，默认为月票榜`, time: '时间，`cur` 为当周、`prev` 为上周' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ac.qq.com/Rank/comicRank/type/:type`, `ac.qq.com/`] }],
    name: `排行榜`,
    maintainers: [`nczitzk`],
    handler: r,
    description: `| 月票榜 | 飙升榜 | 新作榜 | 畅销榜 | TOP100 | 男生榜 | 女生榜 |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| mt     | rise   | new    | pay    | top    | male   | female |

::: tip
  \`time\` 参数仅在 \`type\` 参数选为 **月票榜** 的时候生效。
:::`,
};
async function r(n) {
    let r = { mt: `月票榜`, rise: `飙升榜`, new: `新作榜`, pay: `畅销榜`, top: `TOP100`, male: `男生榜`, female: `女生榜` },
        i = n.req.param(`type`) ?? `mt`,
        a = n.req.param(`time`) ?? `cur`;
    return await t(n, `${e}/Rank/comicRank/type/${i}`, a, r[i]);
}
export { n as route };
