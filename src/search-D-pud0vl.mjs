import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { a as r, t as i } from './utils-cMJuIYwm.mjs';
const a = {
    path: `/search/:keyword`,
    categories: [`multimedia`],
    view: n.Videos,
    example: `/pornhub/search/stepsister`,
    parameters: { keyword: `keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Keyword Search`,
    maintainers: [`nczitzk`],
    handler: o,
};
async function o(n) {
    let a = n.req.param(`keyword`),
        o = `${i}/webmasters/search?search=${a}`,
        s = (await t(o)).data.videos.map((t) => ({
            title: t.title,
            link: t.url,
            description: r({ thumbs: t.thumbs }),
            pubDate: e(t.publish_date),
            category: [...new Set([...t.tags.map((e) => e.tag_name), ...t.categories.map((e) => e.category)])],
        }));
    return { title: `Pornhub - ${a}`, link: o, item: s };
}
export { a as route };
