import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './utils-C4JpPoMa.mjs';
const i = {
    path: `/artist/:id`,
    categories: [`multimedia`],
    view: n.Audios,
    example: `/spotify/artist/6k9TBCxyr4bXwZ8Y21Kwn1`,
    parameters: { id: `Artist ID` },
    features: {
        requireConfig: [
            { name: `SPOTIFY_CLIENT_ID`, description: `` },
            { name: `SPOTIFY_CLIENT_SECRET`, description: `` },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    radar: [{ source: [`open.spotify.com/artist/:id`] }],
    name: `Artist Albums`,
    maintainers: [`outloudvi`],
    handler: a,
};
async function a(n) {
    let i = await r.getPublicToken(),
        a = n.req.param(`id`),
        o = await e(`https://api.spotify.com/v1/artists/${a}`, { method: `GET`, headers: { Authorization: `Bearer ${i}` } }),
        s = (await e(`https://api.spotify.com/v1/artists/${a}/albums`, { method: `GET`, headers: { Authorization: `Bearer ${i}` } })).items;
    return {
        title: `Albums of ${o.name}`,
        link: o.external_urls.spotify,
        allowEmpty: !0,
        item: s.map((e) => ({
            title: e.name,
            author: e.artists.map((e) => e.name).join(`, `),
            description: `"${e.name}" by ${e.artists.map((e) => e.name).join(`, `)}, released at ${e.release_date} with ${e.total_tracks} tracks.`,
            pubDate: t(e.release_date),
            link: e.external_urls.spotify,
        })),
        image: o.images.length ? o.images[0].url : void 0,
    };
}
export { i as route };
