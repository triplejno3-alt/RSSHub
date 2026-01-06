import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './utils-TYDBMERt.mjs';
const t = `https://www.hao6v.tv/gvod/dsj.html`,
    n = {
        path: `/latestTVSeries`,
        categories: [`multimedia`],
        example: `/6v123/latestTVSeries`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`hao6v.com/`, `hao6v.com/gvod/dsj.html`] }],
        name: `最新电视剧`,
        maintainers: [`tc9011`],
        handler: r,
        url: `hao6v.com/`,
    };
async function r(n) {
    return { title: `6v电影-最新电影`, link: t, description: `6v最新电影RSS`, item: await e(n, t, []) };
}
export { n as route };
