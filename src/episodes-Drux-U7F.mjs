import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { i as n, n as r } from './utils-DL02_WpV.mjs';
const i = {
    path: `/tv/:id/seasons/:seasonNumber/episodes/:lang?`,
    categories: [`multimedia`],
    example: `/themoviedb/tv/70593/seasons/1/episodes/en-US`,
    parameters: { id: `TV show ID`, seasonNumber: `Season number`, lang: `Language` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `TV Show Episodes`,
    maintainers: [`x2cf`],
    handler: a,
};
async function a(i) {
    let { id: a, seasonNumber: o, lang: s } = i.req.param(),
        c = { language: s, api_key: n() },
        { data: l } = await t(`https://api.themoviedb.org/3/tv/${a}`, { searchParams: c }),
        { data: u } = await t(`https://api.themoviedb.org/3/tv/${a}/season/${o}`, { searchParams: c });
    return {
        title: `${l.name} ${u.name} — TMDB`,
        description: u.overview.trim(),
        image: `https://image.tmdb.org/t/p/original${u.poster_path}`,
        link: `https://www.themoviedb.org/tv/${l.id}/season/${u.season_number}`,
        item: u.episodes
            .toReversed()
            .map((t) => ({
                title: `${t.episode_number} ${t.name}`,
                link: `https://www.themoviedb.org/tv/${l.id}/season/${t.season_number}/episode/${t.episode_number}`,
                description: r(t),
                pubDate: t.air_date ? e(t.air_date) : void 0,
            })),
    };
}
export { i as route };
