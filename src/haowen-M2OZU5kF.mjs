import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { t as a } from './config-not-found-DGyG6Tbz.mjs';
import { t as o } from './utils-Br3UwJrQ.mjs';
import { load as s } from 'cheerio';
const c = {
    path: `/haowen/:day?`,
    categories: [`shopping`],
    example: `/smzdm/haowen/1`,
    parameters: {
        day: {
            description: '以天为时间跨度，默认为 `1`',
            options: [
                { value: `1`, label: `今日热门` },
                { value: `7`, label: `周热门` },
                { value: `30`, label: `月热门` },
            ],
            default: `1`,
        },
    },
    features: { requireConfig: [{ name: `SMZDM_COOKIE`, description: `什么值得买登录后的 Cookie 值` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `好文`,
    maintainers: [`LogicJake`, `pseudoyu`],
    handler: l,
};
async function l(c) {
    if (!t.smzdm.cookie) throw new a(`什么值得买排行榜 is disabled due to the lack of SMZDM_COOKIE`);
    let l = `https://post.smzdm.com/hot_${c.req.param(`day`) ?? `1`}/`,
        u = s(await e(l, { headers: o() })),
        d = u(`li.filter-tab.active`).text(),
        f = u(`li.feed-row-wide`)
            .toArray()
            .map((e) => {
                let t = u(e);
                return { title: t.find(`h5.z-feed-title a`).text(), link: t.find(`h5.z-feed-title a`).attr(`href`), pubDate: i(r(t.find(`span.z-publish-time`).text()), 8) };
            }),
        p = await Promise.all(
            f.map((t) =>
                n.tryGet(t.link ?? ``, async () => {
                    let n = s(await e(t.link ?? ``, { headers: o() })),
                        a = n(`#articleId`);
                    (a.find(`.item-name`).remove(), a.find(`.recommend-tab`).remove());
                    let c = n(`meta[property="og:release_date"]`).attr(`content`);
                    return { title: t.title, link: t.link, description: a.html() || ``, pubDate: c ? i(r(c), 8) : t.pubDate, author: n(`meta[property="og:author"]`).attr(`content`) || `` };
                })
            )
        );
    return { title: `${d}-什么值得买好文`, link: l, item: p.filter((e) => e !== null) };
}
export { c as route };
