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
    example: `/cointelegraph`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `News`,
    maintainers: [`pseudoyu`],
    handler: s,
    radar: [{ source: [`cointelegraph.com/`], target: `/` }],
    description: `Get latest news from Cointelegraph with full text.`,
};
async function s() {
    let e = await i.parseURL(`https://cointelegraph.com/rss`),
        a = (
            await Promise.all(
                e.items
                    .filter((e) => e.link && /\/news|\/explained|\/innovation-circle/.test(e.link))
                    .map((e) => ({ ...e, link: e.link?.split(`?`)[0] }))
                    .map((e) =>
                        n.tryGet(e.link, async () => {
                            let n = e.link,
                                i = await c(n);
                            return (
                                i || t.warn(`Failed to extract content from ${n}`),
                                {
                                    title: e.title || `Untitled`,
                                    description: i || e.content,
                                    pubDate: e.pubDate ? r(e.pubDate) : void 0,
                                    link: n,
                                    author: e.creator || `CoinTelegraph`,
                                    category: e.categories?.map((e) => e.trim()) || [],
                                    image: e.enclosure?.url,
                                }
                            );
                        })
                    )
            )
        ).filter((e) => e !== null);
    return { title: e.title || `CoinTelegraph News`, link: e.link || `https://cointelegraph.com`, description: e.description || `Latest news from CoinTelegraph`, language: e.language || `en`, item: a };
}
async function c(n) {
    try {
        let t = a(await e(n)),
            r = t(`script:contains("window.__NUXT__")`).text(),
            i = JSON.parse(r.match(/\.fullText=(".*?");/)?.[1] || `{}`),
            o = t(`.post-cover__image`);
        return (
            o.find(`source`).remove(),
            o.find(`img`).removeAttr(`srcset`),
            o.find(`img`).attr(
                `src`,
                o
                    .find(`img`)
                    .attr(`src`)
                    ?.match(/(https:\/\/s3\.cointelegraph\.com\/.+)/)?.[1] || ``
            ),
            o.html() + i || null
        );
    } catch (e) {
        return (t.error(`Error fetching article content: ${e}`), null);
    }
}
export { o as route };
