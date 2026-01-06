import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/:category?`,
    categories: [`design`],
    example: `/bossdesign`,
    parameters: { category: `分类，可在对应分类页 URL 中找到，留空为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `分类`,
    maintainers: [`TonyRL`],
    handler: i,
    description: `| Boss 笔记 | 电脑日志        | 素材资源         | 设计师神器      | 设计教程        | 设计资讯            |
| --------- | --------------- | ---------------- | --------------- | --------------- | ------------------- |
| note      | computer-skills | design-resources | design-software | design-tutorial | design_information |`,
};
async function i(r) {
    let i = r.req.param(`category`),
        a = Number.parseInt(r.req.query(`limit`), 10) || void 0,
        o = `https://www.bossdesign.cn`,
        s = await e.tryGet(`bossdesign:categories:${i}`, async () => {
            let { data: e } = await n(`${o}/wp-json/wp/v2/categories`);
            return e.find((e) => e.slug === i || e.name === i);
        }),
        c = s?.id,
        { data: l } = await n(`${o}/wp-json/wp/v2/posts`, { searchParams: { categories: c, per_page: a, _embed: `` } }),
        u = l.map((e) => ({
            title: e.title.rendered,
            description: e.content.rendered,
            pubDate: t(e.date_gmt),
            updated: t(e.modified_gmt),
            link: e.link,
            guid: e.guid.rendered,
            category: [...new Set([...e._embedded[`wp:term`][0].map((e) => e.name), ...e._embedded[`wp:term`][1].map((e) => e.name)])],
        }));
    return {
        title: s?.name ? `${s.name} | Boss设计` : `Boss设计 | 收集国外设计素材网站的资源平台。`,
        description: s?.description ?? `Boss设计-收集国外设计素材网站的资源平台。专注于收集国外设计素材和国外设计网站，以及超实用的设计师神器，只为设计初学者和设计师提供海量的资源平台。..`,
        image: s?.cover ?? `${o}/wp-content/themes/pinghsu/images/Bossdesign-ico.ico`,
        link: s?.link ?? o,
        item: u,
    };
}
export { r as route };
