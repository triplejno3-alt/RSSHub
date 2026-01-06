import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './utils-C4JpPoMa.mjs';
const r = {
    path: `/saved/:limit?`,
    categories: [`multimedia`],
    example: `/spotify/saved/50`,
    parameters: { limit: `Track count, 50 by default` },
    features: {
        requireConfig: [
            { name: `SPOTIFY_CLIENT_ID`, description: `` },
            { name: `SPOTIFY_CLIENT_SECRET`, description: `` },
            { name: `SPOTIFY_REFRESHTOKEN`, description: `` },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    radar: [{ source: [`open.spotify.com/collection/tracks`], target: `/saved` }],
    name: `Personal Saved Tracks`,
    maintainers: [`outloudvi`],
    handler: i,
    url: `open.spotify.com/collection/tracks`,
};
async function i(r) {
    let i = await n.getPrivateToken(),
        a = r.req.param(`limit`),
        o = Number.isNaN(Number.parseInt(a)) ? 50 : Number.parseInt(a),
        s = (await e(`https://api.spotify.com/v1/me/tracks?limit=${o}`, { method: `GET`, headers: { Authorization: `Bearer ${i}` } })).items;
    return {
        title: `Spotify: My Saved Tracks`,
        link: `https://open.spotify.com/collection/tracks`,
        description: `Latest ${o} saved tracks on Spotify.`,
        allowEmpty: !0,
        item: s.map((e) => ({ ...n.parseTrack(e.track), pubDate: t(e.added_at) })),
    };
}
export { r as route };
