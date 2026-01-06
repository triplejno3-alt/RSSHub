import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/user/blog/:name`,
    categories: [`programming`],
    example: `/luogu/user/blog/ftiasch`,
    parameters: { name: `博客名称` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`luogu.com/blog/:name`] }, { source: [`luogu.com.cn/blog/:name`] }],
    name: `用户博客`,
    maintainers: [`ftiasch`],
    handler: i,
};
async function i(r) {
    let i = `https://www.luogu.com.cn/blog/${r.req.param(`name`)}/`,
        { uid: a, title: o } = await t.tryGet(i, async () => {
            let t = n(await e(i));
            return { uid: t(`meta[name='blog-uid']`).attr(`content`), title: `${t(`meta[name='blog-name']`).attr(`content`)} - 洛谷博客` };
        }),
        s = (await e(`https://www.luogu.com.cn/api/blog/lists?uid=${a}`)).data.result.map((e) => ({ title: e.title, link: `${i}${e.identifier}`, pubDate: new Date(e.postTime * 1e3) }));
    return {
        title: o,
        link: i,
        item: await Promise.all(
            s.map((r) =>
                t.tryGet(r.link, async () => {
                    let t = n(await e(r.link));
                    return { title: r.title, link: r.link, pubDate: r.pubDate, description: t(`#article-content`).html() };
                })
            )
        ),
    };
}
export { r as route };
