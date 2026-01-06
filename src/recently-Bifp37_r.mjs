import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
async function t(t) {
    let { data: n } = await e(`https://macmenubar.com/wp-json/wp/v2/categories`, { method: `GET`, searchParams: { slug: t } });
    return n.reduce((e, t) => e + t.id + `,`, ``);
}
const n = {
    path: `/recently/:category?`,
    categories: [`blog`],
    example: `/macmenubar/recently/developer-apps,system-tools`,
    parameters: { category: `Category path name, seperate by comma, default is all categories. Category path name can be found in url` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Recently`,
    maintainers: [`5upernova-heng`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`category`),
        i = { per_page: 100 };
    return (
        r && (i.categories = await t(r)),
        {
            title: `Recent Posts | MacMenuBar.com`,
            link: `https://macmenubar.com/recently-added/`,
            item: (await e(`https://macmenubar.com/wp-json/wp/v2/posts`, { method: `GET`, searchParams: i })).data.map((e) => {
                let t = e.title.rendered,
                    n = e.link,
                    r = e.date_gmt,
                    i = e.content.rendered,
                    a = e.tag_info.map((e) => e.name),
                    o = e.category_info.map((e) => e.name);
                return { title: t, link: n, pubDate: r, description: i, category: [...a, ...o] };
            }),
        }
    );
}
export { n as route };
