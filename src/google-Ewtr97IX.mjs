import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './not-found-C-Horq2w.mjs';
import { t as i } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import * as c from 'cheerio';
import l from 'dayjs';
import u from 'dayjs/plugin/duration.js';
import { renderToString as d } from 'hono/jsx/dom/server';
import { raw as f } from 'hono/html';
import p from 'p-map';
import { google as m } from 'googleapis';
import { getSubtitles as h } from 'youtube-caption-extractor';
const g = (e, n, r) => r.tryGet(`youtube:getPlaylistItems:${e}`, async () => await U((t) => t.playlistItems.list({ part: n, playlistId: e, maxResults: 50 })), t.cache.routeExpire, !1),
    _ = (e, t, n) => n.tryGet(`youtube:getPlaylist:${e}`, async () => await U((n) => n.playlists.list({ part: t, id: e }))),
    v = (e, t, n) => n.tryGet(`youtube:getChannelWithId:${e}`, async () => await U((n) => n.channels.list({ part: t, id: e }))),
    y = (e, t, n) => n.tryGet(`youtube:getChannelWithUsername:${e}`, async () => await U((n) => n.channels.list({ part: t, forUsername: e }))),
    b = (e, t, n) => n.tryGet(`youtube:getVideos:${e}`, async () => await U((n) => n.videos.list({ part: t, id: e }))),
    x = (e) => e.maxres || e.standard || e.high || e.medium || e.default,
    S = (e) => e?.replaceAll(/\r\n|\r|\n/g, `<br>`),
    C = (e, t, n, r) =>
        d(
            s(a, {
                children: [
                    e
                        ? o(`iframe`, {
                              id: `ytplayer`,
                              type: `text/html`,
                              width: `640`,
                              height: `360`,
                              src: `https://www.youtube-nocookie.com/embed/${t}`,
                              frameborder: `0`,
                              allowfullscreen: !0,
                              referrerpolicy: `strict-origin-when-cross-origin`,
                          })
                        : o(`img`, { src: n?.url ?? `` }),
                    o(`br`, {}),
                    r ? o(a, { children: f(r) }) : null,
                ],
            })
        ),
    w = async (e, n) => {
        let r = await n.get(`youtube:accessToken`, !1);
        return (
            r || ((r = (await W.getAccessToken()).token), await n.set(`youtube:accessToken`, r, 3600)),
            W.setCredentials({ access_token: r, refresh_token: t.youtube.refreshToken }),
            n.tryGet(`youtube:getSubscriptions`, () => T(e), t.cache.routeExpire, !1)
        );
    };
async function T(e, t) {
    let n = await m.youtube(`v3`).subscriptions.list({ auth: W, part: e, mine: !0, maxResults: 50, pageToken: t ?? void 0 });
    if (n.data.nextPageToken) {
        let t = await T(e, n.data.nextPageToken);
        t.data.items && (n.data.items = [...(n.data.items || []), ...t.data.items]);
    }
    return n;
}
const E = (e) => /^UC[\w-]{21}[AQgw]$/.test(e),
    D = (e, t) => t.tryGet(`youtube:getLive:${e}`, async () => await U((t) => t.search.list({ part: `snippet`, channelId: e, eventType: `live`, type: `video` }))),
    O = (e) => `https://www.youtube-nocookie.com/embed/${e}?controls=1&autoplay=1&mute=0`,
    k = (e, t = !0) => (t && (e.startsWith(`UC`) || e.startsWith(`UU`)) ? `UULF` + e.slice(2) : e),
    A = async function ({ googleApi: e, youtubeiApi: n, params: r }) {
        if (t.youtube?.key)
            try {
                return await e(r);
            } catch {
                return await n(r);
            }
        return await n(r);
    };
var j = {
    getPlaylistItems: g,
    getPlaylist: _,
    getChannelWithId: v,
    getChannelWithUsername: y,
    getVideos: b,
    getThumbnail: x,
    formatDescription: S,
    renderDescription: C,
    getSubscriptions: w,
    getSubscriptionsRecusive: T,
    isYouTubeChannelId: E,
    getLive: D,
    getVideoUrl: O,
    getPlaylistWithShortsFilter: k,
};
function M(e, t = 2) {
    return String(e).padStart(t, `0`);
}
function N(e) {
    let t = Math.floor(e * 1e3),
        n = Math.floor(t / 36e5),
        r = Math.floor((t % 36e5) / 6e4),
        i = Math.floor((t % 6e4) / 1e3),
        a = t % 1e3;
    return `${M(n)}:${M(r)}:${M(i)},${M(a, 3)}`;
}
function P(e) {
    return e.map((e, t) => {
        let n = Number.parseFloat(e.start),
            r = n + Number.parseFloat(e.dur);
        return `${t + 1}
${N(n)} --> ${N(r)}
${e.text}
`;
    }).join(`
`);
}
const F = (e) =>
        n.tryGet(`youtube:getSubtitlesByVideoId:${e}`, async () => {
            try {
                return P(await h({ videoID: e }));
            } catch {
                return ``;
            }
        }),
    I = (e) => `data:text/plain;charset=utf-8,${encodeURIComponent(e)}`;
function L(e) {
    return !e || e.trim() === `` ? [] : [{ url: I(e), mime_type: `text/srt`, title: `Subtitles` }];
}
const R = async (e) => {
        let t = await p(e, async (e) => ({ videoId: e, srt: L(await F(e)) }), { concurrency: 5 });
        return Object.fromEntries(t.map(({ videoId: e, srt: t }) => [e, t]));
    },
    { OAuth2: z } = m.auth;
l.extend(u);
let B = 0;
const V = {};
if (t.youtube && t.youtube.key) {
    let e = t.youtube.key.split(`,`);
    for (let [t, n] of e.entries()) n && ((V[t] = m.youtube({ version: `v3`, auth: n })), (B = t + 1));
}
let H = -1;
const U = async (e) => {
    let t;
    for (let n = 0; n < B; n++) {
        H++;
        try {
            t = await e(V[H % B]);
            break;
        } catch {}
    }
    return t;
};
let W;
t.youtube &&
    t.youtube.clientId &&
    t.youtube.clientSecret &&
    t.youtube.refreshToken &&
    ((W = new z(t.youtube.clientId, t.youtube.clientSecret, `https://developers.google.com/oauthplayground`)), W.setCredentials({ refresh_token: t.youtube.refreshToken }));
const G = async ({ username: t, embed: a, filterShorts: o, isJsonFeed: s }) => {
        let u;
        t.startsWith(`@`) &&
            (u = await n.tryGet(`youtube:handle:${t}`, async () => {
                let r = await e(`https://www.youtube.com/${t}`),
                    i = c.load(r),
                    a = JSON.parse(
                        i(`script`)
                            .text()
                            .match(/ytInitialData = ({.*?});/)?.[1] || `{}`
                    ).metadata.channelMetadataRenderer,
                    o = a.externalId;
                return { channelName: a.title, image: a.avatar?.thumbnails?.[0]?.url, description: a.description, playlistId: (await j.getChannelWithId(o, `contentDetails`, n)).data.items[0].contentDetails.relatedPlaylists.uploads };
            }));
        let d = await (async () => {
                if (u?.playlistId) {
                    let e = u.playlistId;
                    return j.getPlaylistWithShortsFilter(e, o);
                } else {
                    let e = (await j.getChannelWithUsername(t, `contentDetails`, n)).data.items;
                    if (!e) throw new r(`The channel https://www.youtube.com/user/${t} does not exist.`);
                    let i = e[0].id;
                    return o ? j.getPlaylistWithShortsFilter(i, o) : e[0].contentDetails.relatedPlaylists.uploads;
                }
            })(),
            f = await j.getPlaylistItems(d, `snippet`, n);
        if (!f) throw new r(`This channel doesn't have any content.`);
        let p = f.data.items.map((e) => e.snippet.resourceId.videoId),
            m = await j.getVideos(p.join(`,`), `contentDetails`, n),
            h = s ? await R(p) : {};
        return {
            title: `${u?.channelName || t} - YouTube`,
            link: t.startsWith(`@`) ? `https://www.youtube.com/${t}` : `https://www.youtube.com/user/${t}`,
            description: u?.description || `YouTube user ${t}`,
            image: u?.image,
            item: f.data.items
                .filter((e) => e.snippet.title !== `Private video` && e.snippet.title !== `Deleted video`)
                .map((e) => {
                    let t = e.snippet,
                        n = t.resourceId.videoId,
                        r = j.getThumbnail(t.thumbnails),
                        o = m?.data.items.find((e) => e.id === n),
                        s = (h && h[n]) || [];
                    return {
                        title: t.title,
                        description: j.renderDescription(a, n, r, j.formatDescription(t.description)),
                        pubDate: i(t.publishedAt),
                        link: `https://www.youtube.com/watch?v=${n}`,
                        author: t.videoOwnerChannelTitle,
                        image: r.url,
                        attachments: [{ url: O(n), mime_type: `text/html`, duration_in_seconds: o?.contentDetails.duration ? l.duration(o.contentDetails.duration).asSeconds() : void 0 }, ...s],
                    };
                }),
        };
    },
    K = async ({ channelId: e, embed: t, filterShorts: r, isJsonFeed: a }) => {
        let o = r ? null : (await j.getChannelWithId(e, `contentDetails`, n)).data.items[0].contentDetails.relatedPlaylists.uploads,
            s = r ? j.getPlaylistWithShortsFilter(e) : o,
            c = (await j.getPlaylistItems(s, `snippet`, n)).data.items,
            u = c.map((e) => e.snippet.resourceId.videoId),
            d = await j.getVideos(u.join(`,`), `contentDetails`, n),
            f = a ? await R(u) : {};
        return {
            title: `${c[0].snippet.channelTitle} - YouTube`,
            link: `https://www.youtube.com/channel/${e}`,
            description: `YouTube channel ${c[0].snippet.channelTitle}`,
            item: c
                .filter((e) => e.snippet.title !== `Private video` && e.snippet.title !== `Deleted video`)
                .map((e) => {
                    let n = e.snippet,
                        r = n.resourceId.videoId,
                        a = j.getThumbnail(n.thumbnails),
                        o = d?.data.items.find((e) => e.id === r),
                        s = (f && f[r]) || [];
                    return {
                        title: n.title,
                        description: j.renderDescription(t, r, a, j.formatDescription(n.description)),
                        pubDate: i(n.publishedAt),
                        link: `https://www.youtube.com/watch?v=${r}`,
                        author: n.videoOwnerChannelTitle,
                        image: a.url,
                        attachments: [{ url: O(r), mime_type: `text/html`, duration_in_seconds: o?.contentDetails.duration ? l.duration(o.contentDetails.duration).asSeconds() : void 0 }, ...s],
                    };
                }),
        };
    },
    q = async ({ playlistId: e, embed: t, isJsonFeed: r }) => {
        let a = (await j.getPlaylist(e, `snippet`, n)).data.items[0].snippet.title,
            o = (await j.getPlaylistItems(e, `snippet`, n)).data.items.filter((e) => e.snippet.title !== `Private video` && e.snippet.title !== `Deleted video`),
            s = o.map((e) => e.snippet.resourceId.videoId),
            c = await j.getVideos(s.join(`,`), `contentDetails`, n),
            u = r ? await R(s) : {};
        return {
            title: `${a} by ${o[0].snippet.channelTitle} - YouTube`,
            link: `https://www.youtube.com/playlist?list=${e}`,
            description: `${a} by ${o[0].snippet.channelTitle}`,
            item: o.map((e) => {
                let n = e.snippet,
                    r = n.resourceId.videoId,
                    a = j.getThumbnail(n.thumbnails),
                    o = c?.data.items.find((e) => e.id === r),
                    s = (u && u[r]) || [];
                return {
                    title: n.title,
                    description: j.renderDescription(t, r, a, j.formatDescription(n.description)),
                    pubDate: i(n.publishedAt),
                    link: `https://www.youtube.com/watch?v=${r}`,
                    author: n.videoOwnerChannelTitle,
                    image: a.url,
                    attachments: [{ url: O(r), mime_type: `text/html`, duration_in_seconds: o?.contentDetails.duration ? l.duration(o.contentDetails.duration).asSeconds() : void 0 }, ...s],
                };
            }),
        };
    };
export { A as a, C as c, R as i, j as l, q as n, O as o, G as r, E as s, K as t };
