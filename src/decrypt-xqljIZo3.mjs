import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './rss-parser-CKuAfhVS.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/`,
    categories: [`finance`],
    example: `/decrypt`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `News`,
    maintainers: [`pseudoyu`],
    handler: s,
    radar: [{ source: [`decrypt.co/`], target: `/` }],
    description: `Get latest news from Decrypt.`,
};
async function s(e) {
    let a = e.req.query(`limit`) ? Number.parseInt(e.req.query(`limit`)) : 20,
        o = await i.parseURL(`https://decrypt.co/feed`),
        s = await Promise.all(
            o.items
                .filter((e) => e && e.link && !e.link.includes(`/videos`))
                .slice(0, a)
                .map((e) =>
                    n.tryGet(`decrypt:article:${e.link}`, async () => {
                        if (!e.link) return {};
                        try {
                            let t = await c(e.link);
                            return {
                                title: e.title || `Untitled`,
                                link: e.link.split(`?`)[0],
                                pubDate: e.pubDate ? r(e.pubDate) : void 0,
                                description: t?.fullText ?? (e.content || ``),
                                author: e.creator || `Decrypt`,
                                category: t?.tags ? [...new Set([...(e.categories ?? []), ...t.tags])] : e.categories || [],
                                guid: e.guid || e.link,
                                image: t?.featuredImage ?? e.enclosure?.url,
                            };
                        } catch (n) {
                            return (
                                t.warn(`Couldn't fetch full content for ${e.link}: ${n.message}`),
                                {
                                    title: e.title || `Untitled`,
                                    link: e.link.split(`?`)[0],
                                    pubDate: e.pubDate ? r(e.pubDate) : void 0,
                                    description: e.content || ``,
                                    author: e.creator || `Decrypt`,
                                    category: e.categories || [],
                                    guid: e.guid || e.link,
                                    image: e.enclosure?.url,
                                }
                            );
                        }
                    })
                )
        );
    return { title: o.title || `Decrypt`, link: o.link || `https://decrypt.co`, description: o.description || `Latest news from Decrypt`, item: s, language: o.language || `en`, image: o.image?.url };
}
async function c(n) {
    try {
        let t = a(await e(n)),
            r = JSON.parse(t(`script#__NEXT_DATA__`).text()).props.pageProps.post;
        return r.content.length ? { fullText: `<img src="${r.featuredImage.src}" alt="${r.featuredImage.alt}">` + r.content, featuredImage: r.featuredImage.src, tags: r.tags.data.map((e) => e.name) } : null;
    } catch (e) {
        return (t.error(`Error extracting full text from ${n}: ${e}`), null);
    }
}
export { o as route };
