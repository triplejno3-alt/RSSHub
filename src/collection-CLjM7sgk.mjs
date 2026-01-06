import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { n as i } from './utils-CAAmnNMo.mjs';
import { t as a } from './utils-Bry6Na7d.mjs';
import { load as o } from 'cheerio';
const s = {
    path: `/collection/:id/:getAll?`,
    categories: [`social-media`],
    example: `/zhihu/collection/26444956`,
    parameters: { id: `收藏夹 id，可在收藏夹页面 URL 中找到`, getAll: `获取全部收藏内容，任意值为打开` },
    features: { requireConfig: [{ name: `ZHIHU_COOKIES`, description: `` }], requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.zhihu.com/collection/:id`], target: `/collection/:id` }],
    name: `收藏夹`,
    maintainers: [`huruji`, `Colin-XKL`, `Fatpandac`],
    handler: c,
};
async function c(s) {
    let c = s.req.param(`id`),
        l = s.req.param(`getAll`),
        u = await r({ method: `get`, url: `https://www.zhihu.com/api/v4/collections/${c}/items?offset=0&limit=20`, headers: { ...i, cookie: e.zhihu.cookies, Referer: `https://www.zhihu.com/collection/${c}` } }),
        d = u.data.data;
    if (l) {
        let n = u.data.paging.totals,
            a = [...Array.from({ length: Math.round(n / 20) }).keys()].map((e) => e * 20).slice(1),
            o = await Promise.all(
                a.map((n) =>
                    t.tryGet(
                        `https://www.zhihu.com/api/v4/collections/${c}/items?offset=${n}&limit=20`,
                        async () =>
                            (await r({ method: `get`, url: `https://www.zhihu.com/api/v4/collections/${c}/items?offset=${n}&limit=20`, headers: { ...i, cookie: e.zhihu.cookies, Referer: `https://www.zhihu.com/collection/${c}` } }))
                                .data.data
                    )
                )
            ).then((e) => e.flat());
        d.push(...o);
    }
    let f = (await r({ method: `get`, url: `https://www.zhihu.com/collection/${c}`, headers: { ...i, Referer: `https://www.zhihu.com/collection/${c}` } })).data,
        p = o(f),
        m = p(`.CollectionDetailPageHeader-title`).text() + ` - 知乎收藏夹`,
        h = p(`.CollectionDetailPageHeader-description`).text(),
        g = (e) => a([e.content])[0];
    return {
        title: m,
        link: `https://www.zhihu.com/collection/${c}`,
        description: h,
        item:
            d &&
            d.map((e) =>
                e.content.type === `pin`
                    ? g(e)
                    : {
                          title: e.content.type === `article` || e.content.type === `zvideo` ? e.content.title : e.content.question.title,
                          link: e.content.url,
                          description: e.content.type === `zvideo` ? `<img src=${e.content.video.url}/>` : e.content.content,
                          pubDate: n((e.content.type === `article` ? e.content.updated : e.content.updated_time) * 1e3),
                      }
            ),
    };
}
export { s as route };
