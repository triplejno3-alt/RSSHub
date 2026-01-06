import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
async function i(e) {
    let t = await n({ method: `get`, url: `https://sspai.com/api/v1/user/slug/info/get?slug=${e}`, headers: { Referer: `https://sspai.com/u/${e}/posts` } });
    if (t.data.error !== 0) throw new r(`User Not Found`);
    return t.data.data.id;
}
const a = {
    path: `/author/:id`,
    categories: [`new-media`],
    example: `/sspai/author/796518`,
    parameters: { id: `作者 slug 或 id，slug 可在作者主页URL中找到，id 不易查找，仅作兼容` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sspai.com/u/:id/posts`] }],
    name: `作者`,
    maintainers: [`SunShinenny`, `hoilc`],
    handler: o,
};
async function o(r) {
    let a = (await n({ method: `get`, url: `https://sspai.com/api/v1/articles?offset=0&limit=20&author_ids=${/^\d+$/.test(r.req.param(`id`)) ? r.req.param(`id`) : await i(r.req.param(`id`))}&include_total=false` })).data.list,
        o = a[0].author.slug,
        s = a[0].author.nickname,
        c = await Promise.all(
            a.map((r) => {
                let i = `https://sspai.com/api/v1/article/info/get?id=${r.id}&view=second&support_webp=true`,
                    a = ``,
                    o = `sspai: ${r.id}`;
                return e.tryGet(o, async () => {
                    let e = (await n(i)).data.data,
                        o = e.promote_image;
                    return (
                        o && (a = `<img src="${o}" alt="Article Cover Image" style="display: block; margin: 0 auto;"><br>`),
                        (a += e.body),
                        { title: r.title.trim(), description: a, link: `https://sspai.com/post/${r.id}`, pubDate: t(r.released_at * 1e3), author: r.author.nickname }
                    );
                });
            })
        );
    return { title: `${s} - 少数派作者`, link: `https://sspai.com/u/${o}/posts`, description: `${s} 更新推送 `, item: c };
}
export { a as route };
