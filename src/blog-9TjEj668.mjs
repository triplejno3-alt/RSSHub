import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `https://bitmovin.com`,
    r = {
        path: `/blog`,
        categories: [`programming`],
        example: `/bitmovin/blog`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`bitmovin.com/blog`, `bitmovin.com/`] }],
        name: `Blog`,
        maintainers: [`elxy`],
        handler: i,
        url: `bitmovin.com/blog`,
    };
async function i(r) {
    let { data: i } = await t(`${`${n}/wp-json/wp/v2`}/posts`, { searchParams: { per_page: r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`)) : 100 } }),
        a = i.map((t) => ({ title: t.title.rendered, author: t.authors.map((e) => e.display_name).join(`, `), description: t.content.rendered, pubDate: e(t.date_gmt), link: t.link }));
    return { title: `Blog - Bitmovin`, link: `${n}/blog/`, item: a };
}
export { r as route };
