import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './const-BIMMuJCo.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/`,
    categories: [`picture`],
    example: `/cosplaytele`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`cosplaytele.com/`], target: `` }],
    name: `Latest`,
    maintainers: [`AiraNadih`],
    handler: s,
    url: `cosplaytele.com/`,
};
async function s(o) {
    let s = Number.parseInt(o.req.query(`limit`)) || 20,
        c = a((await t(n)).body),
        l = c(`#content .post-item`).slice(0, s).toArray();
    return {
        title: `${i} - Latest`,
        link: n,
        item: await Promise.all(
            l.map((t) => {
                let n = c(t).find(`h5.post-title a`).attr(`href`);
                return e.tryGet(n, () => r(n));
            })
        ),
    };
}
export { o as route };
