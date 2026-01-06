import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/news`,
    categories: [`game`],
    example: `/warhammer-community/news`,
    radar: [{ source: [`www.warhammer-community.com/en-gb/all-news-and-features/`, `www.warhammer-community.com/en-gb/`] }],
    name: `News`,
    maintainers: [`TonyRL`],
    handler: a,
    url: `www.warhammer-community.com/en-gb/all-news-and-features/`,
};
async function a(i) {
    let a = `https://www.warhammer-community.com`,
        o = Number.parseInt(i.req.query(`limit`) || `16`, 10),
        s = (await e(`${a}/api/search/news/`, { method: `POST`, body: { sortBy: `date_desc`, category: ``, collections: [`articles`], game_systems: [], index: `news`, locale: `en-gb`, page: 0, perPage: o, topics: [] } })).news.map(
            (e) => ({ title: e.title, link: `${a}/en-gb${e.uri}/`, description: e.excerpt, image: `https://assets.warhammer-community.com/${e.image.path}`, pubDate: n(e.date), category: e.topics.map((e) => e.title) })
        ),
        c = await Promise.all(
            s.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link))(`.article-content`);
                    return (t.find(`button`).remove(), (n.description = t.html() || n.description), n);
                })
            )
        );
    return { title: `All News and Features - Warhammer Community`, link: `${a}/en-gb/all-news-and-features/`, image: `${a}/images/apple-favicon.png`, item: c };
}
export { i as route };
