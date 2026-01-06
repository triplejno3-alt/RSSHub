import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/topic/:id`,
    categories: [`new-media`],
    example: `/sspai/topic/250`,
    parameters: { id: `专题 id，可在专题主页URL中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sspai.com/topic/:id`] }],
    name: `专题内文章更新`,
    maintainers: [`SunShinenny`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`id`),
        a = (await n({ method: `get`, url: `https://sspai.com/api/v1/articles?offset=0&limit=20&topic_id=${i}&sort=created_at&include_total=false` })).data.list,
        o = ``,
        s = ``,
        c = ``,
        l = await Promise.all(
            a.map((r) => {
                let a = r.title,
                    l = r.created_at,
                    u = `https://sspai.com/api/v1/article/info/get?id=${r.id}&view=second&support_webp=true`,
                    d = `https://sspai.com/post/${r.id}`,
                    f = r.author.nickname;
                return (
                    o === `` && ((o = r.topics[0].title), (s = `https://sspai.com/topic/${i}`), (c = r.topics[0].intro)),
                    e.tryGet(`sspai: ${r.id}`, async () => {
                        let e = await n(u),
                            r = ``,
                            i = e.data.data,
                            o = i.promote_image;
                        return (o && (r = `<img src="${o}" alt="Article Cover Image" style="display: block; margin: 0 auto;"><br>`), (r += i.body), { title: a, link: d, author: f, description: r, pubDate: t(l * 1e3) });
                    })
                );
            })
        );
    return { title: `少数派专题-${o}`, link: s, description: c, item: l };
}
export { r as route };
