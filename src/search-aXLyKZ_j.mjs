import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/search/:params`,
    categories: [`game`],
    example: `/steam/search/sort_by=Released_DESC&tags=492&category1=10&os=linux`,
    parameters: { params: `Query parameters for a Steam Store search.` },
    radar: [{ source: [`store.steampowered.com`, `store.steampowered.com/search/:params`] }],
    name: `Store Search`,
    maintainers: [`moppman`],
    handler: r,
};
async function r(n) {
    let r = new URLSearchParams(n.req.param(`params`)),
        { data: i } = await e(`https://store.steampowered.com/search/`, { searchParams: r }),
        a = t(i);
    return {
        title: `Steam search result`,
        description: `Query: ${r.toString()}`,
        link: /g_strUnfilteredURL\s=\s'(.*)'/.exec(i)[1],
        item: a(`#search_result_container a`)
            .toArray()
            .map((e) => {
                let t = a(e),
                    n = !!t.attr(`data-ds-bundle-data`),
                    r = t.find(`.discount_original_price`).length > 0,
                    i = t.find(`.search_review_summary`).length > 0,
                    o = ``;
                if (n) {
                    let e = JSON.parse(t.attr(`data-ds-bundle-data`));
                    ((o += `Bundle
`),
                        e.m_bRestrictGifting &&
                            (o += `Restrict gifting
`),
                        (o += `Items count: ${e.m_rgItems.length}\n`));
                }
                return (
                    r
                        ? ((o += `Discount: ${t.find(`.discount_pct`).text().trim()}\n`),
                          (o += `Original price: ${t.find(`.discount_original_price`).text().trim()}\n`),
                          (o += `Discounted price: ${t.find(`.discount_final_price`).text().trim()}\n`))
                        : (o += `Price: ${t.find(`.discount_final_price`).text().trim()}\n`),
                    i && (o += t.find(`.search_review_summary`).attr(`data-tooltip-html`)),
                    {
                        title: t.find(`span.title`).text(),
                        link: t.attr(`href`),
                        description: o.replaceAll(
                            `
`,
                            `<br>`
                        ),
                        media: { thumbnail: { url: t.find(`.search_capsule img`).attr(`src`) } },
                    }
                );
            })
            .filter((e) => e.title),
    };
}
export { n as route };
