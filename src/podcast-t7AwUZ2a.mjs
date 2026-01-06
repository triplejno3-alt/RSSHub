import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
const a = {
    path: `/p/:id`,
    categories: [`multimedia`],
    example: `/soundon/p/33a68cdc-18ad-4192-84cc-22bd7fdc6a31`,
    parameters: { id: `Podcast ID` },
    features: { supportPodcast: !0 },
    radar: [{ source: [`player.soundon.fm/p/:id`] }],
    name: `Podcast`,
    maintainers: [`TonyRL`],
    view: i.Audios,
    handler: async (i) => {
        let { id: a } = i.req.param(),
            o = `https://api.soundon.fm/v2/client`,
            s = `KilpEMLQeNzxmNBL55u5`,
            c = await n.tryGet(`soundon:${a}`, async () => (await e(`${o}/podcasts/${a}`, { headers: { 'api-token': s } })).data.data),
            l = (await n.tryGet(`soundon:${a}:episodes`, async () => (await e(`${o}/podcasts/${a}/episodes`, { headers: { 'api-token': s } })).data, t.cache.routeExpire, !1)).map(({ data: e }) => ({
                title: e.title,
                description: e.contentEncoded,
                link: e.url,
                author: e.artistName,
                pubDate: r(e.publishDate),
                itunes_item_image: e.cover,
                enclosure_url: e.audioUrl,
                enclosure_type: e.audioType,
                itunes_duration: e.duration,
                category: e.itunesKeywords,
            }));
        return { title: c.title, description: c.description, itunes_author: c.artistName, itunes_category: c.itunesCategories.join(`, `), itunes_explicit: c.explicit, image: c.cover, language: c.language, link: c.url, item: l };
    },
};
export { a as route };
