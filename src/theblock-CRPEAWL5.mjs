import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/category/:category`,
    categories: [`finance`],
    example: `/theblock/category/crypto-ecosystems`,
    parameters: { category: `News category` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Category`,
    maintainers: [`pseudoyu`],
    handler: o,
    radar: [{ source: [`theblock.co/category/:category`], target: `/category/:category` }],
    description: `Get latest news from TheBlock by category. Note that due to website limitations, only article summaries may be available.`,
};
async function o(a) {
    let o = a.req.param(`category`),
        c = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 10,
        l = `https://www.theblock.co/api/category/${o}`;
    try {
        let a = (await e(l)).data?.articles || [];
        if (!a.length) throw Error(`No articles found for category: ${o}`);
        let u = await Promise.all(
            a.slice(0, c).map((a) =>
                n.tryGet(`theblock:article:${a.url}`, async () => {
                    try {
                        let n = (await e(`https://www.theblock.co/api/post/${a.id}/`)).post,
                            o = i(n.body, null, !1);
                        if (n.body.length) {
                            o(`.copyright`).remove();
                            let e = ``;
                            if ((a.thumbnail && (e += `<p><img src="${n.thumbnail}" alt="${a.title}"></p>`), (e += n.intro + o.html()), e))
                                return {
                                    title: a.title,
                                    link: a.url,
                                    pubDate: r(n.published),
                                    description: e,
                                    author: a.authors?.map((e) => e.name).join(`, `) || `TheBlock`,
                                    category: [...new Set([n.categories.name, ...n.categories.map((e) => e.name), ...n.tags.map((e) => e.name)])],
                                    guid: a.url,
                                    image: a.thumbnail,
                                };
                        }
                        return (t.info(`Using summary-based approach for article: ${a.url}`), s(a));
                    } catch (e) {
                        return (t.warn(`Couldn't fetch full content for ${a.url}: ${e.message}`), s(a));
                    }
                })
            )
        );
        return {
            title: `TheBlock - ${o.charAt(0).toUpperCase() + o.slice(1).replaceAll(`-`, ` `)}`,
            link: `https://www.theblock.co/category/${o}`,
            item: u,
            description: `Latest articles from TheBlock in the ${o} category`,
            language: `en`,
        };
    } catch (e) {
        throw (t.error(`Error in TheBlock handler: ${e.message}`), e);
    }
}
function s(e) {
    let t = ``;
    return (
        e.thumbnail && (t += `<p><img src="${e.thumbnail}" alt="${e.title}"></p>`),
        e.subheading && (t += `<p><strong>${e.subheading}</strong></p>`),
        e.preview && (t += `<p>${e.preview}</p>`),
        (t += `<p><a href="${e.url}">Read the full article at TheBlock</a></p>`),
        {
            title: e.title,
            link: e.url,
            pubDate: r(e.publishedFormatted, `MMMM D, YYYY, h:mmA [EST]`),
            description: t,
            author: e.authors?.map((e) => e.name).join(`, `) || `TheBlock`,
            category: e.primaryCategory?.name || [],
            guid: e.url,
            image: e.thumbnail,
        }
    );
}
export { a as route };
