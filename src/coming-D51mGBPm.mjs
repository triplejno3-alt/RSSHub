import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
        path: `/movie/coming`,
        categories: [`social-media`],
        example: `/douban/movie/coming`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `电影即将上映`,
        maintainers: [`reonokiy`],
        radar: [{ title: `豆瓣电影-即将上映`, source: [`movie.douban.com/coming`], target: `/movie/coming` }],
        handler: s,
    },
    o = (e) =>
        i(
            r(t, {
                children: [
                    e.cover_url && e.title ? n(`img`, { src: e.cover_url, alt: e.title, referrerpolicy: `no-referrer` }) : null,
                    n(`h2`, { children: `电影信息` }),
                    r(`ul`, {
                        children: [
                            e.directors?.length ? r(`li`, { children: [`导演：`, e.directors.join(`, `)] }) : null,
                            e.actors?.length ? r(`li`, { children: [`演员：`, e.actors.join(`, `)] }) : null,
                            e.genres?.length ? r(`li`, { children: [`类型：`, e.genres.join(` / `)] }) : null,
                            e.pubdate?.length ? r(`li`, { children: [`上映日期：`, e.pubdate.join(` / `)] }) : null,
                            e.wish_count ? r(`li`, { children: [`想看：`, e.wish_count] }) : null,
                        ],
                    }),
                    e.intro ? r(t, { children: [n(`h2`, { children: `剧情简介` }), n(`p`, { children: e.intro })] }) : null,
                ],
            })
        );
async function s(t) {
    let n = await e({ method: `get`, url: `https://m.douban.com/rexxar/api/v2/movie/coming_soon`, headers: { Referer: `https://m.douban.com/movie/` } });
    return (
        t.set(`json`, { response: n }),
        {
            title: `豆瓣电影-即将上映`,
            link: `https://movie.douban.com/coming`,
            item: n.data?.subjects?.map((e) => ({
                title: e?.title,
                link: e?.url,
                guid: e?.url,
                description: o({
                    title: e?.title,
                    intro: e?.intro,
                    pubdate: e?.pubdate,
                    cover_url: e?.cover_url,
                    directors: e?.directors?.map((e) => e?.name),
                    actors: e?.actors?.map((e) => e?.name),
                    genres: e?.genres,
                    wish_count: e?.wish_count,
                }),
                category: e?.genres,
                itunes_item_image: e?.cover_url,
                upvotes: e?.wish_count,
            })),
        }
    );
}
export { a as route };
