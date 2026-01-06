import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `search/:keyword`,
    name: `Search`,
    url: `anime1.me`,
    maintainers: [`cxheng315`],
    example: `/anime1/search/神之塔`,
    categories: [`anime`],
    parameters: { keyword: `Anime1 Search Keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    handler: i,
};
async function i(r) {
    let { keyword: i } = r.req.param(),
        a = n(await e(`https://anime1.me/?s=${i}`)),
        o = a(`page-title`).text().trim(),
        s = a(`article.type-post`)
            .toArray()
            .map((e) => {
                let n = a(e),
                    r = n.find(`.entry-title a`).text().trim();
                return { title: r, link: n.find(`.entry-title a`).attr(`href`), description: r, pubDate: t(n.find(`time`).attr(`datetime`) || ``) };
            });
    return { title: o, link: `https://anime1.me/?s=${i}`, description: o, itunes_author: `Anime1`, itunes_image: `https://anime1.me/wp-content/uploads/2021/02/cropped-1-180x180.png`, item: s };
}
export { r as route };
