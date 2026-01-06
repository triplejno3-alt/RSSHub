import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/post/:type?`,
    categories: [`bbs`],
    example: `/loongarch/post/newest`,
    parameters: { type: `top 或 newest` },
    radar: [{ source: [`bbs.loongarch.org`] }],
    name: `最热 / 最新帖子`,
    maintainers: [`ladeng07`, `3401797899`],
    handler: r,
    url: `bbs.loongarch.org/`,
};
async function r(n) {
    let r = n.req.param(`type`),
        i = `最新帖子`,
        a = `-createdAt`;
    r === `top` && ((i = `最热帖子`), (a = `-commentCount`));
    let { data: o } = await t(`https://bbs.loongarch.org/api/discussions`, { searchParams: { include: `user,tags,tags.parent,firstPost`, sort: a, 'page[offset]': 0 } }),
        s = o.included.filter((e) => e.type === `users`),
        c = o.included.filter((e) => e.type === `tags`),
        l = o.included.filter((e) => e.type === `posts`),
        u = o.data.map(({ attributes: t, relationships: n }) => ({
            title: t.title,
            link: `https://bbs.loongarch.org/d/${t.slug}`,
            author: s.find((e) => e.id === n.user.data.id).attributes.displayName,
            description: l.find((e) => e.id === n.firstPost.data.id).attributes.contentHtml,
            pubDate: e(t.createdAt),
            updated: e(t.lastPostedAt),
            category: n.tags.data.map((e) => c.find((t) => t.id === e.id).attributes.name),
        }));
    return { title: `LA UOSC-${i}`, link: `https://bbs.loongarch.org/api/discussions`, description: `LA UOSC-${i}`, item: u };
}
export { n as route };
