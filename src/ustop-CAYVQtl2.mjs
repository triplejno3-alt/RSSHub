import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/movie/ustop`,
    categories: [`social-media`],
    example: `/douban/movie/ustop`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `北美票房榜`,
    maintainers: [`DIYgod`],
    handler: n,
};
async function n() {
    return {
        title: `豆瓣电影北美票房榜`,
        link: `https://movie.douban.com/chart`,
        item: (await e({ method: `get`, url: `https://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a` })).data.subjects.map(
            (e) => (
                (e = e.subject),
                { title: e.title, description: `标题：${e.title}<br> 影片类型：${e.genres.join(` | `)}  <br>评分：${e.rating.stars === `00` ? `无` : e.rating.average} <br/> <img src="${e.images.large}">`, link: e.alt }
            )
        ),
    };
}
export { t as route };
