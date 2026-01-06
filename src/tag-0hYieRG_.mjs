import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './const-vX7QVsvf.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/tag/:tag`,
    categories: [`picture`],
    example: `/8kcos/tag/cosplay`,
    parameters: { tag: `标签名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`8kcosplay.com/tag/:tag`] }],
    name: `标签`,
    maintainers: [`KotoriK`],
    handler: s,
    url: `8kcosplay.com/`,
};
async function s(o) {
    let s = Number.parseInt(o.req.query(`limit`)),
        c = `${n}tag/${o.req.param(`tag`)}/`,
        l = a((await t(c)).body),
        u = l(`li.item`).toArray();
    return {
        title: `${i}-${l(`span[property=name]:not(.hide)`).text()}`,
        link: c,
        item: await Promise.all(
            (s ? u.slice(0, s) : u).map((t) => {
                let { href: n } = a(t)(`h2 > a`)[0].attribs;
                return e.tryGet(n, () => r(n));
            })
        ),
    };
}
export { o as route };
