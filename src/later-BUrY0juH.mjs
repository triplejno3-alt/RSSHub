import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/movie/later`,
    categories: [`social-media`],
    example: `/douban/movie/later`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `即将上映的电影`,
    maintainers: [`DIYgod`],
    handler: r,
};
async function r() {
    let n = t((await e({ method: `get`, url: `https://movie.douban.com/cinema/later/beijing/` })).data);
    return {
        title: `即将上映的电影`,
        link: `https://movie.douban.com/cinema/later/`,
        item: n(`#showing-soon .item`)
            .toArray()
            .map((e) => {
                let t = n(e).html(),
                    r = n(`h3`, e).text().trim(),
                    i = n(`ul li`, e).eq(0).text().trim(),
                    a = n(`ul li`, e).eq(1).text().trim(),
                    o = n(`a.thumb`, e).attr(`href`);
                return { title: `${i} - 《${r}》 - ${a}`, link: o, description: t };
            }),
    };
}
export { n as route };
