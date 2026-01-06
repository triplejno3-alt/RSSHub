import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = `https://www.abmedia.io`,
    r = `${n}/wp-json/wp/v2/categories`,
    i = `${n}/wp-json/wp/v2/posts`,
    a = (e) => t.get(`${r}?slug=${e}`).then((e) => e.data[0].id),
    o = {
        path: `/:category?`,
        categories: [`new-media`],
        example: `/abmedia/technology-development`,
        parameters: { category: `类别，默认为产品技术` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.abmedia.io/category/:catehory`], target: `/:category` }],
        name: `类别`,
        maintainers: [],
        handler: s,
        description: '参数可以从链接中拿到，如：\n\n  `https://www.abmedia.io/category/technology-development` 对应 `/abmedia/technology-development`',
    };
async function s(r) {
    let o = r.req.param(`category`) ?? `technology-development`,
        s = r.req.param(`limit`) ?? 25,
        c = await a(o),
        l = (await t.get(`${i}?categories=${c}&page=1&per_page=${s}`)).data.map((t) => ({ title: t.title.rendered, link: t.link, description: t.content.rendered, pubDate: e(t.date) }));
    return { title: `abmedia - ${o}`, link: `${n}/category/${o}`, item: l };
}
export { o as route };
