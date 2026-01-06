import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/podcast/:id/:region?`,
    categories: [`multimedia`],
    example: `/apple/podcast/id1559695855/cn`,
    parameters: { id: `播客id，可以在 Apple 播客app 内分享的播客的 URL 中找到`, region: `地區代碼，例如 cn、us、jp，預設為 cn` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`podcasts.apple.com/:region/podcast/:showName/:id`, `podcasts.apple.com/:region/podcast/:id`] }],
    name: `播客`,
    maintainers: [`Acring`],
    handler: o,
    url: `www.apple.com/apple-podcasts/`,
};
async function o(a) {
    let { id: o, region: s } = a.req.param(),
        c = o.match(/id(\d+)/)?.[1],
        l = `https://podcasts.apple.com`,
        u = i(await e(`${l}/${s || `cn`}/podcast/${o}`)),
        d = JSON.parse(u(`#serialized-server-data`).text())[0].data.shelves.find((e) => e.contentType === `showHeaderRegular`).items[0],
        f = await n.tryGet(
            `apple:podcast:bearer`,
            async () => {
                let t = new URL(u(`head script[type="module"]`).attr(`src`), l).href;
                return (await e(t, { parseResponse: (e) => e })).match(/="(eyJhbGci.*?)",/)[1];
            },
            t.cache.contentExpire,
            !1
        ),
        p = await e(`https://amp-api.podcasts.apple.com/v1/catalog/us/podcasts/${c}/episodes`, {
            query: { 'extend[podcast-channels]': `editorialArtwork,subscriptionArtwork,subscriptionOffers`, include: `channel`, limit: 25, with: `entitlements`, l: `en-US` },
            headers: { Authorization: `Bearer ${f}`, Origin: l },
        }),
        m = p.data.map(({ attributes: e }) => {
            let t = e.offers[0];
            return {
                title: e.name,
                enclosure_url: e.assetUrl || t.hlsUrl,
                enclosure_type: e.assetUrl ? `audio/mp4` : `application/vnd.apple.mpegurl`,
                itunes_duration: (e.durationInMilliseconds || t.durationInMilliseconds) / 1e3,
                link: e.url,
                pubDate: r(e.releaseDateTime),
                description: e.description.standard.replaceAll(
                    `
`,
                    `<br>`
                ),
                author: e.artistName,
                itunes_item_image: e.artwork.url.replace(/\{w\}x\{h\}(?:\{c\}|bb)\.\{f\}/, `3000x3000bb.webp`),
                category: e.genreNames,
            };
        }),
        h = p.data.find((e) => e.type === `podcast-episodes`).relationships.channel.data.find((e) => e.type === `podcast-channels`)?.attributes;
    return {
        title: h?.name ?? d.title,
        link: h?.url ?? d.contextAction.podcastOffer.storeUrl,
        itunes_author: d.contextAction.podcastOffer.author,
        item: m,
        description: (d.description || h?.description.standard)?.replaceAll(
            `
`,
            ` `
        ),
        image: ((h?.logoArtwork || h?.subscriptionArtwork)?.url || d.contextAction.podcastOffer.artwork.template).replace(/\{w\}x\{h\}(?:\{c\}|bb)\.\{f\}/, `3000x3000bb.webp`),
        itunes_category: d.metadata.find((e) => Object.hasOwn(e, `category`)).category?.title || d.metadata.find((e) => Object.hasOwn(e, `category`)).category,
    };
}
export { a as route };
