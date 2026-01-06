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
    path: `/author/:id?`,
    categories: [`traditional-media`],
    example: `/yicai/author/100005663`,
    parameters: { id: `作者 id，可在对应作者页中找到，默认为第一财经研究院` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yicai.com/author/:id`, `yicai.com/author`], target: `/author/:id` }],
    name: `一财号`,
    maintainers: [`nczitzk`],
    handler: o,
};
async function o(a) {
    let o = a.req.param(`id`) ?? `100005663`,
        s = `${n}/author/${o}.html`,
        c = `${n}/api/ajax/getlistbysid?id=${o}&page=1&pagesize=${a.req.query(`limit`) ?? 30}`,
        l = i((await t({ method: `get`, url: s })).data),
        u = await r(c, e.tryGet);
    return { title: `第一财经一财号 - ${l(`title`).text()}`, link: s, item: u };
}
export { a as route };
