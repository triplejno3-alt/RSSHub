import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/`,
    categories: [`blog`],
    example: `/englishhome`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`englishhome.org/`] }],
    name: `首頁`,
    maintainers: [`johan456789`],
    handler: r,
    description: `英語之家 - The Home of English 首頁`,
};
async function r() {
    let n = `https://englishhome.org`;
    return {
        title: `英語之家 - The Home of English`,
        link: n,
        language: `zh-TW`,
        item: (await e(`${n}/wp-json/wp/v2/posts?per_page=20&_embed=author,wp:term`)).map((e) => ({
            title: e.title?.rendered,
            description: e.content?.rendered ?? e.excerpt?.rendered ?? ``,
            link: e.link,
            pubDate: t(e.date_gmt ?? e.date),
            author: e._embedded?.author?.[0]?.name,
            category: Array.isArray(e._embedded?.[`wp:term`])
                ? e._embedded[`wp:term`]
                      .flat()
                      .map((e) => e?.name)
                      .filter(Boolean)
                : void 0,
        })),
    };
}
export { n as route };
