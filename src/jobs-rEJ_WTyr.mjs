import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/jobs`,
    categories: [`bbs`],
    example: `/eleduck/jobs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`eleduck.com/categories/5`, `eleduck.com/`] }],
    name: `工作机会`,
    maintainers: [`sfyumi`],
    handler: i,
    url: `eleduck.com/categories/5`,
};
async function i() {
    let { data: r } = await n(`https://svc.eleduck.com/api/v1/posts`, { searchParams: { category: 5 } }),
        i = r.posts.map((e) => ({ id: e.id, title: e.title, link: `https://eleduck.com/posts/${e.id}`, author: e.user.nickname, description: e.summary, pubDate: t(e.published_at), category: e.tags.map((e) => e.name) }));
    return {
        title: `招聘 | 电鸭社区`,
        link: `https://eleduck.com/category/5`,
        item: await Promise.all(
            i.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(`https://svc.eleduck.com/api/v1/posts/${t.id}`);
                    return ((t.description = e.post.content), t);
                })
            )
        ),
    };
}
export { r as route };
