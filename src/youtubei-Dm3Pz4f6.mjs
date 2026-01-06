import { t as e } from './cache-DLkCV5c7.mjs';
import { n as t } from './parse-date-DjdQS_Nt.mjs';
import { i as n, l as r, o as i } from './google-Ewtr97IX.mjs';
import { Innertube as a } from 'youtubei.js';
let o;
const s = () => (
        (o ||= a.create({
            fetch: (e, t) => {
                let n = typeof e == `string` ? e : e instanceof URL ? e.toString() : e.url;
                return fetch(n, { method: e?.method, ...t });
            },
        })),
        o
    ),
    c = (t) => e.tryGet(`youtube:getChannelIdByUsername:${t}`, async () => (await (await s()).resolveURL(`https://www.youtube.com/${t}`)).payload.browseId),
    l = async ({ username: e, embed: t, filterShorts: n, isJsonFeed: r }) => u({ channelId: await c(e), embed: t, filterShorts: n, isJsonFeed: r }),
    u = async ({ channelId: e, embed: a, isJsonFeed: o }) => {
        let c = await (await s()).getChannel(e),
            l = await c.getVideos(),
            u = o ? await n(l.videos.filter((e) => `video_id` in e).map((e) => e.video_id)) : {};
        return {
            title: `${c.metadata.title || e} - YouTube`,
            link: `https://www.youtube.com/channel/${e}`,
            image: c.metadata.avatar?.[0].url,
            description: c.metadata.description,
            item: await Promise.all(
                l.videos
                    .filter((e) => `video_id` in e)
                    .map((e) => {
                        let n = (o && u[e.video_id]) || [],
                            s = `best_thumbnail` in e ? e.best_thumbnail?.url : `thumbnails` in e ? e.thumbnails?.[0]?.url : void 0;
                        return {
                            title: e.title.text || `YouTube Video ${e.video_id}`,
                            description: `description_snippet` in e ? r.renderDescription(a, e.video_id, s, r.formatDescription(e.description_snippet?.toHTML())) : null,
                            link: `https://www.youtube.com/watch?v=${e.video_id}`,
                            author: typeof e.author == `string` ? e.author : e.author.name === `N/A` ? void 0 : e.author.name,
                            image: s,
                            pubDate: `published` in e && e.published?.text ? t(e.published.text) : void 0,
                            attachments: [{ url: i(e.video_id), mime_type: `text/html`, duration_in_seconds: e.duration && `seconds` in e.duration ? e.duration.seconds : void 0 }, ...n],
                        };
                    })
            ),
        };
    },
    d = async ({ playlistId: e, embed: n }) => {
        let a = await (await s()).getPlaylist(e),
            o = await a.videos;
        return {
            title: `${a.info.title || e} by ${a.info.author.name} - YouTube`,
            link: `https://www.youtube.com/playlist?list=${e}`,
            image: a.info.thumbnails?.[0].url,
            description: a.info.description || `${a.info.title} by ${a.info.author.name}`,
            item: o
                .filter((e) => `id` in e)
                .map((e) => {
                    let a = `best_thumbnail` in e ? e.best_thumbnail?.url : e.thumbnails?.[0]?.url;
                    return {
                        title: e.title.text || `YouTube Video ${e.id}`,
                        description: r.renderDescription(n, e.id, a, ``),
                        link: `https://www.youtube.com/watch?v=${e.id}`,
                        pubDate: `published` in e && e.published?.text ? t(e.published.text) : void 0,
                        author: `author` in e ? [{ name: e.author.name, url: e.author.url, avatar: e.author.thumbnails?.[0]?.url }] : void 0,
                        image: a,
                        attachments: [{ url: i(e.id), mime_type: `text/html`, duration_in_seconds: `duration` in e && e.duration && `seconds` in e.duration ? e.duration.seconds : void 0 }],
                    };
                }),
        };
    };
export { d as n, l as r, u as t };
