import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './comic-D6aSD92r.mjs';
import a from 'p-map';
const o = {
    path: `/comic/:id`,
    categories: [`anime`],
    parameters: { id: `漫画ID` },
    example: `/zaimanhua/comic/14488`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`manhua.zaimanhua.com/details`, `manhua.zaimanhua.com/details/:id`], target: `/comic/:id` }],
    name: `漫画更新`,
    maintainers: [`kjasn`],
    handler: s,
};
async function s(o) {
    let s = `https://manhua.zaimanhua.com`,
        c = o.req.param(`id`),
        l = (await e(`${s}/api/v1/comic2/comic/detail?id=${c}`, { headers: { 'user-agent': t.trueUA, referer: s } })).data.comicInfo,
        u = l.chapterList[0].title,
        d = l.chapterList[0].data,
        f = l.comicPy,
        p = l.title,
        m = await a(
            d,
            async (a) => {
                let o = `${s}/api/v1/comic2/chapter/detail?comic_id=${c}&chapter_id=${a.chapter_id}`;
                return await n.tryGet(o, async () => {
                    let n = (await e(o, { headers: { 'user-agent': t.trueUA, referer: s } })).data,
                        l = i(n.chapterInfo.page_url || []);
                    return { title: `[${u}] | ${p} - ${a.chapter_title}`, category: [u], image: n.chapterInfo.page_url?.[0] || ``, link: `${s}/view/${f}/${c}/${a.chapter_id}`, pubDate: r(a.updatetime * 1e3), description: l };
                });
            },
            { concurrency: 3 }
        );
    return { title: `再漫画 - ${p}`, link: `${s}/details/${c}`, item: m };
}
export { o as route };
