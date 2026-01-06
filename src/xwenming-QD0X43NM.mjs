import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let { category: i } = n.req.param(),
            a = Number.parseInt(n.req.query(`limit`) ?? `50`, 10),
            o = `wp-json/wp/v2`,
            s = `https://www.xwenming.com`,
            c = new URL(`${o}/posts`, s).href,
            l = new URL(`${o}/categories`, s).href,
            u = (await e(l, { query: { search: i } })).find((e) => e.slug === i || e.name === i),
            d = u?.id ?? void 0,
            f = u?.slug ?? void 0,
            p = await e(c, { query: { _embed: `true`, per_page: a, categories: d } }),
            m = new URL(f ? `index.php/category/${f}` : ``, s).href,
            h = r(await e(m)),
            g = h(`html`).attr(`lang`) ?? `zh`,
            _ = p.slice(0, a).map((e) => {
                let n = e.title?.rendered ?? e.title,
                    r = e.content.rendered,
                    i = e.date_gmt,
                    a = e.link,
                    o = e._embedded?.[`wp:term`]?.flat().map((e) => e.name) ?? [],
                    s = e._embedded?.author.map((e) => ({ name: e.name, url: e.link, avatar: e.avatar_urls?.[`96`] ?? e.avatar_urls?.[`48`] ?? e.avatar_urls?.[`24`] ?? void 0 })) ?? [],
                    c = e.guid?.rendered ?? e.guid,
                    l = e._embedded?.[`wp:featuredmedia`]?.[0].source_url ?? void 0,
                    u = e.modified_gmt ?? i;
                return { title: n, description: r, pubDate: i ? t(i) : void 0, link: a ?? c, category: o, author: s, guid: c, id: c, content: { html: r, text: r }, image: l, banner: l, updated: u ? t(u) : void 0, language: g };
            });
        return { title: h(`title`).text(), description: h(`meta[name="description"]`).attr(`content`), link: m, item: _, allowEmpty: !0, image: h(`meta[name="msapplication-TileImage"]`).attr(`content`), language: g, id: m };
    },
    a = {
        path: `/:category?`,
        name: `分类`,
        url: `www.xwenming.com`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/xwenming/news`,
        parameters: {
            category: {
                description: `分类，默认为全部，可在对应分类页 URL 中找到`,
                options: [
                    { label: `全部`, value: `` },
                    { label: `科技前沿`, value: `news` },
                    { label: `疑难杂症`, value: `solve` },
                    { label: `通知专栏`, value: `notice` },
                    { label: `未分类`, value: `uncategorized` },
                ],
            },
        },
        description: `::: tip
订阅 [科技前沿](https://www.xwenming.com/index.php/category/news)，其源网址为 \`https://www.xwenming.com/index.php/category/news\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/xwenming/category/news\`](https://rsshub.app/xwenming/category/news) 或 [\`/xwenming/category/科技前沿\`](https://rsshub.app/xwenming/category/科技前沿)。
:::

| 分类                                                                | ID                                                                  |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [全部](https://www.xwenming.com)                                    | [<空>](https://rsshub.app/xwenming)                                 |
| [科技前沿](https://www.xwenming.com/index.php/category/news)        | [news](https://rsshub.app/xwenming/category/news)                   |
| [疑难杂症](https://www.xwenming.com/index.php/category/solve)       | [solve](https://rsshub.app/xwenming/category/solve)                 |
| [通知专栏](https://www.xwenming.com/index.php/category/notice)      | [notice](https://rsshub.app/xwenming/category/notice)               |
| [未分类](https://www.xwenming.com/index.php/category/uncategorized) | [uncategorized](https://rsshub.app/xwenming/category/uncategorized) |
`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.xwenming.com`, `www.xwenming.com/index.php/category/:category`], target: `/:category` },
            { title: `全部`, source: [`www.xwenming.com`], target: `/` },
            { title: `科技前沿`, source: [`www.xwenming.com/index.php/category/news`], target: `/news` },
            { title: `疑难杂症`, source: [`www.xwenming.com/index.php/category/solve`], target: `/solve` },
            { title: `通知专栏`, source: [`www.xwenming.com/index.php/category/notice`], target: `/notice` },
            { title: `未分类`, source: [`www.xwenming.com/index.php/category/uncategorized`], target: `/uncategorized` },
        ],
        view: n.Articles,
    };
export { i as handler, a as route };
