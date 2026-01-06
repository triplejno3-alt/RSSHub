import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './comic-D6aSD92r.mjs';
import a from 'p-map';
const o = {
    path: `/update`,
    categories: [`anime`],
    example: `/zaimanhua/update`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`manhua.zaimanhua.com/update`], target: `/update` }],
    name: `最近更新`,
    maintainers: [`kjasn`],
    handler: async () => {
        let o = `https://manhua.zaimanhua.com`,
            s = (await e(`${o}/api/v1/comic2/update_list?status&theme&zone&cate&firstLetter&sortType&page=1&size=20`, { headers: { 'user-agent': t.trueUA, referer: o } })).data.comicList,
            c = await a(
                s,
                async (a) => {
                    let s = a.id,
                        c = a.last_update_chapter_id,
                        l = a.comic_py,
                        u = `${o}/api/v1/comic2/chapter/detail?comic_id=${s}&chapter_id=${c}`;
                    return await n.tryGet(u, async () => {
                        let n = (await e(u, { headers: { 'user-agent': t.trueUA, referer: o } })).data,
                            d = i(n.chapterInfo.page_url || []);
                        return {
                            title: `[${a.status}] | ${a.name} - ${a.last_update_chapter_name}`,
                            author: a.authors,
                            category: [a.status, ...a.types.split(`/`).map((e) => e.trim())],
                            image: a.cover,
                            link: `${o}/view/${l}/${s}/${c}`,
                            pubDate: r(a.last_updatetime * 1e3),
                            description: d,
                        };
                    });
                },
                { concurrency: 3 }
            );
        return { title: `再漫画 - 最近更新`, link: `${o}/update`, item: c };
    },
};
export { o as route };
