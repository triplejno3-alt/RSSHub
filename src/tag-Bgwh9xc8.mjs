import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r } from './utils-CsErTCPf.mjs';
const i = {
    path: `/tag/:tag`,
    categories: [`game`],
    example: `/4gamers/tag/限時免費`,
    parameters: { tag: `标签名，可在标签 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.4gamers.com.tw/news/tag/:tag`] }],
    name: `标签`,
    maintainers: [`hoilc`],
    handler: a,
    url: `www.4gamers.com.tw/news`,
};
async function a(i) {
    let a = i.req.param(`tag`),
        { data: o } = await t(`https://www.4gamers.com.tw/site/api/news/by-tag`, { searchParams: { tag: a, pageSize: i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 25 } }),
        s = r(o.data.results),
        c = await Promise.all(s.map((t) => e.tryGet(t.link, () => n(t))));
    return { title: `4Gamers - #${a}`, link: `https://www.4gamers.com.tw/news/tag/${a}`, item: c };
}
export { i as route };
