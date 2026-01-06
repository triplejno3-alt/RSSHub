import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { a as t, o as n, r, t as i } from './utils-UGcwE5N1.mjs';
const a = {
    path: `/bestreviews/:language?/:mode?`,
    categories: [`multimedia`],
    example: `/javlibrary/bestreviews/en`,
    parameters: { language: 'Language, see below, Japanese by default, as `ja`', mode: 'Mode, see below, Last Month by default, as `1`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Best Reviews`,
    maintainers: [`nczitzk`],
    handler: o,
    description: `| Last Month | All Time |
| ---------- | -------- |
| 1          | 2        |`,
};
async function o(a) {
    let o = a.req.param(`mode`) ?? t,
        s = a.req.param(`language`) ?? r;
    return await i(s, `${n}/${s}/tl_bestreviews.php?list&mode=${o}`, e.tryGet);
}
export { a as route };
