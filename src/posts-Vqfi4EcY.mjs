import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { o as t, t as n } from './utils-DUC2PxJz.mjs';
const r = {
        path: `/posts/:id`,
        categories: [`programming`],
        example: `/juejin/posts/3051900006845944`,
        parameters: { id: `用户 id, 可在用户页 URL 中找到` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`juejin.cn/user/:id`, `juejin.cn/user/:id/posts`] }],
        name: `用户文章`,
        maintainers: [`Maecenas`],
        handler: a,
    },
    i = (e) => ({ username: e.user_name, description: e.description, avatar: e.avatar_large });
async function a(r) {
    let a = r.req.param(`id`),
        o = (await e(`https://api.juejin.cn/content_api/v1/article/query_list`, { method: `POST`, body: { user_id: a, sort_type: 2 } })).data,
        s = t(o),
        c = i(o[0].author_user_info),
        l = await n(s);
    return { title: `掘金专栏-${c.username}`, link: `https://juejin.cn/user/${a}/posts`, description: c.description, image: c.avatar, item: l };
}
export { r as route };
