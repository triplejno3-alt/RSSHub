import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { r as e, t } from './utils-C9EYn6aX.mjs';
const n = {
    path: `/tag/:keyword`,
    categories: [`multimedia`],
    example: `/chikubi/tag/ドリームチケット`,
    parameters: { keyword: `Keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Tag`,
    maintainers: [`SnowAgar25`],
    handler: r,
    radar: [{ title: `Tag`, source: [`chikubi.jp/tag/:keyword`], target: `/tag/:keyword` }],
};
async function r(n) {
    let { keyword: r } = n.req.param(),
        { id: i, name: a } = await t(`tag`, r),
        o = await e(`tag`, i);
    return { title: `Tag: ${a} - chikubi.jp`, link: `https://chikubi.jp/category/${r}`, item: o };
}
export { n as route };
