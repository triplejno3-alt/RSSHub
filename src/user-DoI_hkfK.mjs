import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
const a = {
    path: `/user/:id`,
    categories: [`picture`],
    view: i.Pictures,
    example: `/fantia/user/3498`,
    parameters: { id: `User id, can be found in user profile URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`fantia.jp/fanclubs/:id`] }],
    name: `User Posts`,
    maintainers: [`nczitzk`],
    handler: o,
};
async function o(i) {
    let a = `https://fantia.jp`,
        o = `${a}/api/v1/fanclubs/${i.req.param(`id`)}`,
        s = (await r({ method: `get`, url: a, headers: { Cookie: e.fantia.cookies ?? `` } })).data.match(/name="csrf-token" content="(.*?)"\s?\/>/)[1],
        c = await r({ method: `get`, url: o, headers: { Cookie: e.fantia.cookies ?? `` } }),
        l = c.data.fanclub.recent_posts.map((e) => ({ title: e.title, link: `${a}/api/v1/posts/${e.id}`, description: `<p>${e.comment}</p>`, pubDate: n(e.posted_at) })),
        u = await Promise.all(
            l.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = await r({ method: `get`, url: n.link, headers: { Cookie: e.fantia.cookies ?? ``, 'X-CSRF-Token': s, Accept: `application/json, text/plain, */*`, Referer: `${a}/`, 'X-Requested-With': `XMLHttpRequest` } });
                    return ((n.link = n.link.replace(`api/v1/`, ``)), (n.description += `<img src="${t.data.post?.thumb?.large ?? t.data.post.thumb_micro}">`), n);
                })
            )
        );
    return { title: `Fantia - ${c.data.fanclub.fanclub_name_with_creator_name}`, link: `${a}/fanclubs/${i.req.param(`id`)}`, item: u };
}
export { a as route };
