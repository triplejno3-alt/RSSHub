import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/strategyand/sustainability`,
    categories: [`other`],
    example: `/pwc/strategyand/sustainability`,
    radar: [{ source: [`strategyand.pwc.com/at/en/functions/sustainability-strategy/publications.html`, `strategyand.pwc.com/`] }],
    name: `Sustainability`,
    maintainers: [`mintyfrankie`],
    handler: r,
    url: `strategyand.pwc.com/at/en/functions/sustainability-strategy/publications.html`,
};
async function r() {
    let n = await e(`https://www.strategyand.pwc.com/content/pwc/03/en/functions/sustainability-strategy/publications/jcr:content/root/container/content-free-container/section_545483788/collection_v2.filter-dynamic.html`, {
        query: { currentPagePath: `/content/pwc/03/en/functions/sustainability-strategy/publications`, list: { menu_0: [] }, defaultImagePath: `/content/dam/pwc/network/strategyand-collection-fallback-images` },
    });
    return {
        title: `PwC Strategy& - Sustainability Publications`,
        link: `https://www.strategyand.pwc.com/at/en/functions/sustainability-strategy/publications.html`,
        language: `en`,
        description: `Sustainability Publications from PwC Strategy&`,
        item: JSON.parse(n.elements).map((e) => ({ title: e.title, link: e.href, pubDate: t(e.publishDate, `DD/MM/YY`), description: e.text, category: e.tags })),
    };
}
export { n as route };
