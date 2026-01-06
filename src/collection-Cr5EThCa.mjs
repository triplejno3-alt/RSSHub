import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { i as t, r as n } from './utils-DL02_WpV.mjs';
const r = {
    path: `/collection/:id/:lang?`,
    categories: [`multimedia`],
    example: `/themoviedb/collection/131292/en-US`,
    parameters: { id: `Collection ID`, lang: `Language` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Collection`,
    maintainers: [`x2cf`],
    handler: i,
};
async function i(r) {
    let { id: i, lang: a } = r.req.param(),
        { data: o } = await e(`https://api.themoviedb.org/3/collection/${i}`, { searchParams: { language: a, api_key: t() } });
    return { title: `${o.name} — TMDB`, description: o.overview.trim(), image: `https://image.tmdb.org/t/p/original${o.poster_path}`, link: `https://www.themoviedb.org/collection/${o.id}`, item: o.parts.map((e) => n(e, a)) };
}
export { r as route };
