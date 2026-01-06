import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './const-vX7QVsvf.mjs';
import { load as a } from 'cheerio';
const o = n,
    s = {
        path: `/`,
        categories: [`picture`],
        example: `/8kcos/`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        radar: [{ source: [`8kcosplay.com/`], target: `` }],
        name: `最新`,
        maintainers: [`KotoriK`],
        handler: c,
        url: `8kcosplay.com/`,
    };
async function c(n) {
    let s = Number.parseInt(n.req.query(`limit`)),
        c = await t(o),
        l = a(c.body)(`ul.post-loop li.item`).toArray();
    return {
        title: `${i}-最新`,
        link: o,
        item:
            c.body &&
            (await Promise.all(
                (s ? l.slice(0, s) : l).map((t) => {
                    let { href: n } = a(t)(`h2 > a`)[0].attribs;
                    return e.tryGet(n, () => r(n));
                })
            )),
    };
}
export { s as route };
