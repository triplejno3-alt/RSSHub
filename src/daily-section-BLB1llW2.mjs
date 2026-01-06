import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { n as r } from './utils-CAAmnNMo.mjs';
const i = {
    path: `/daily/section/:sectionId`,
    categories: [`social-media`],
    example: `/zhihu/daily/section/2`,
    parameters: { sectionId: `合集 id，可在 https://news-at.zhihu.com/api/7/sections 找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`daily.zhihu.com/*`], target: `/daily` }],
    name: `知乎日报 - 合集`,
    maintainers: [`ccbikai`],
    handler: a,
    url: `daily.zhihu.com/*`,
};
async function a(i) {
    let a = i.req.param(`sectionId`),
        o = await e(`https://news-at.zhihu.com/api/7/section/${a}`, { headers: { ...r, Referer: `https://news-at.zhihu.com/api/7/section/${a}` } }),
        s = o.stories.filter((e) => e.url.startsWith(`https://daily.zhihu.com/`)),
        c = await Promise.all(
            s.map(async (r) => {
                let i = `https://news-at.zhihu.com/api/7/news/` + r.id,
                    a = await t.tryGet(i, async () => await e(i));
                return { title: a.title, description: a.body, link: a.url, pubDate: n(a.publish_time, `X`) };
            })
        );
    return { title: `${o.name} - 知乎日报`, link: `https://daily.zhihu.com`, description: `每天3次，每次7分钟`, image: `http://static.daily.zhihu.com/img/new_home_v3/mobile_top_logo.png`, item: c };
}
export { i as route };
