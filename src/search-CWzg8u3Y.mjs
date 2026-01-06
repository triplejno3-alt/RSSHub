import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { i as r, t as i } from './utils-BD0jSsK2.mjs';
const a = {
    path: `/search/:keyword`,
    categories: [`picture`],
    example: `/skeb/search/初音ミク`,
    parameters: { keyword: `Search keyword` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Search Results`,
    maintainers: [`SnowAgar25`],
    handler: o,
    description: `Get the search results for works on Skeb`,
};
async function o(a) {
    let o = a.req.param(`keyword`);
    if (!o) throw new n(`Invalid search keyword`);
    let s = await t.tryGet(`skeb:search:${o}`, async () => {
        let t = await e(`https://hb1jt3kre9-dsn.algolia.net/1/indexes/*/queries`, {
            method: `POST`,
            headers: { 'x-algolia-application-id': `HB1JT3KRE9`, 'x-algolia-api-key': `9a4ce7d609e71bf29e977925e4c6740c` },
            body: {
                requests: [
                    { indexName: `User`, query: o, params: `hitsPerPage=40`, filters: `genres:art OR genres:comic OR genres:voice OR genres:novel OR genres:video OR genres:music OR genres:correction` },
                    { indexName: `Request`, query: o, params: `hitsPerPage=40&filters=genre%3Aart%20OR%20genre%3Acomic%20OR%20genre%3Avoice%20OR%20genre%3Anovel%20OR%20genre%3Avideo%20OR%20genre%3Amusic%20OR%20genre%3Acorrection` },
                ],
            },
        });
        if (!t || !t.results || !Array.isArray(t.results) || t.results.length < 2) throw Error(`Invalid data received from API`);
        let n = t.results[1].hits;
        if (!Array.isArray(n)) throw TypeError(`Invalid hits data received from API`);
        return n.map((e) => r(e)).filter(Boolean);
    });
    return { title: `Skeb - Search Results for "${o}"`, link: `${i}/search?q=${encodeURIComponent(o)}`, item: s };
}
export { a as route };
