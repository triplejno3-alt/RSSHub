import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './utils-C4JpPoMa.mjs';
const i = {
    path: `/playlist/:id`,
    categories: [`multimedia`],
    view: n.Audios,
    example: `/spotify/playlist/4UBVy1LttvodwivPUuwJk2`,
    parameters: { id: `Playlist ID` },
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
    description: `::: warning
Due to [limitations by Spotify](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api), this endpoint is unable to access "Algorithmic and Spotify-owned editorial playlists".
:::`,
    radar: [{ source: [`open.spotify.com/playlist/:id`] }],
    name: `Playlist`,
    maintainers: [`outloudvi`],
    handler: a,
};
async function a(n) {
    let i = await r.getPublicToken(),
        a = await e(`https://api.spotify.com/v1/playlists/${n.req.param(`id`)}`, { method: `GET`, headers: { Authorization: `Bearer ${i}` } }),
        o = a.tracks.items;
    return { title: a.name, link: a.external_urls.spotify, description: a.description, allowEmpty: !0, item: o.map((e) => ({ ...r.parseTrack(e.track), pubDate: t(e.added_at) })), image: a.images.length ? a.images[0].url : void 0 };
}
export { i as route };
