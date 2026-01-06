import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './utils-D9Vetn_z.mjs';
const a = {
    path: `/hot`,
    categories: [`new-media`],
    example: `/hk01/hot`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`hk01.com/hot`, `hk01.com/`] }],
    name: `热门`,
    maintainers: [`hoilc`, `Fatpandac`, `nczitzk`],
    handler: o,
    url: `hk01.com/hot`,
};
async function o(a) {
    return { title: `熱門新聞、全城熱話及社會時事 | 香港01`, link: `${r}/hot`, item: await i((await t({ method: `get`, url: `${n}/v2/feed/hot` })).data.items, a.req.query(`limit`), e.tryGet) };
}
export { a as route };
