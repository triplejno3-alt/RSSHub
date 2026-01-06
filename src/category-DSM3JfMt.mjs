import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './const-Kir9KCxq.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/category/:category`,
    categories: [`picture`],
    example: `/baobua/category/network`,
    parameters: { category: `Category` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`baobua.com/cat/:category`], target: `/category/:category` }],
    name: `Category`,
    maintainers: [`AiraNadih`],
    handler: s,
    url: `baobua.com/`,
};
async function s(o) {
    let s = o.req.param(`category`),
        c = `${n}cat/${s}/`,
        l = a((await t(c)).body),
        u = l(`.thcovering-video`).toArray();
    return {
        title: `${i} - Category: ${s}`,
        link: c,
        item: await Promise.all(
            u
                .map((t) => {
                    let i = l(t).find(`a`).attr(`href`);
                    return i ? (i.startsWith(`/`) && (i = new URL(i, n).href), e.tryGet(i, () => r(i))) : null;
                })
                .filter(Boolean)
        ),
    };
}
export { o as route };
