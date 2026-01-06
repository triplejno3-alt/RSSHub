import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import './description-UqFyTtWs.mjs';
import { r as n, t as r } from './utils-B0h5xX5T.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/feed/:id?`,
    categories: [`traditional-media`],
    example: `/yicai/feed/669`,
    parameters: { id: `主题 id，可在对应主题页中找到，默认为一财早报` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yicai.com/feed/:id`, `yicai.com/feed`], target: `/feed/:id` }],
    name: `关注`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `::: tip
  全部主题词见 [此处](https://www.yicai.com/feed/alltheme)
:::`,
};
async function o(a) {
    let o = a.req.param(`id`) ?? `669`,
        s = `${n}/feed/${o}`,
        c = `${n}/api/ajax/getlistbytid?id=${o}&page=0&pagesize=${a.req.query(`limit`) ?? 30}`,
        l = i((await t({ method: `get`, url: s })).data),
        u = await r(c, e.tryGet);
    return { title: `第一财经主题 - ${l(`title`).text()}`, link: s, item: u };
}
export { a as route };
