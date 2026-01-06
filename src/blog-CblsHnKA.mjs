import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/blog`,
    categories: [`programming`],
    example: `/huggingface/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`huggingface.co/blog`, `huggingface.co/`] }],
    name: `英文博客`,
    maintainers: [`cesaryuan`, `zcf0508`],
    handler: a,
    url: `huggingface.co/blog`,
};
async function a() {
    let { allBlogs: i } = await e(`https://huggingface.co/api/blog`),
        a = i.map((e) => ({
            title: e.title,
            link: `https://huggingface.co${e.url}`,
            pubDate: n(e.publishedAt),
            author: e.authorsData.map((e) => ({ name: e.fullname || e.name })),
            upvotes: e.upvotes,
            image: e.thumbnail ? new URL(e.thumbnail, `https://huggingface.co`).toString() : void 0,
            category: e.tags,
        }));
    return {
        title: `Huggingface 英文博客`,
        link: `https://huggingface.co/blog`,
        item: await Promise.all(
            a.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link));
                    return (t(`.mb-4, .mb-6, .not-prose, h1`).remove(), { ...n, description: t(`.blog-content`).html() ?? void 0 });
                })
            )
        ),
    };
}
export { i as route };
