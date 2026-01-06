import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { n as t } from './utils-C9EYn6aX.mjs';
const n = {
    path: `/search/:keyword`,
    categories: [`multimedia`],
    example: `/chikubi/search/ギャップ`,
    parameters: { keyword: `Keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Search`,
    maintainers: [`SnowAgar25`],
    handler: r,
};
async function r(n) {
    let { keyword: r } = n.req.param(),
        i = `https://chikubi.jp`,
        a = `${i}/wp-json/wp/v2/search?search=${r}`,
        o = await t((await e.get(a)).data.map((e) => e.id.toString()));
    return { title: `Search: ${r} - chikubi.jp`, link: `${i}/search/${encodeURIComponent(r)}`, item: o };
}
export { n as route };
