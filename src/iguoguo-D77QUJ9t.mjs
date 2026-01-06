import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { load as i } from 'cheerio';
const a = `https://www.iguoguo.net`,
    o = (t) => n.tryGet(`iguoguo:category:${t}`, async () => (await e(`${a}/wp-json/wp/v2/categories`, { query: { slug: t } }))[0].id),
    s = (r, i) => n.tryGet(`iguoguo:posts:${r}`, async () => await e(`${a}/wp-json/wp/v2/posts`, { query: { categories: r, per_page: i } }), t.cache.routeExpire, !1),
    c = {
        path: `/html5`,
        categories: [`design`],
        example: `/iguoguo/html5`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `最新 H5`,
        maintainers: [`yuxinliu-alex`],
        handler: l,
    };
async function l(e) {
    let t = Number.parseInt(e.req.query(`limit`) ?? `10`),
        n = `${a}/html5`,
        c = await s(await o(`h5`), t),
        l = { jpg: `jpeg`, png: `png` };
    return {
        title: `爱果果`,
        link: n,
        description: `爱果果iguoguo是一个优秀酷站、h5、UI素材资源的发布分享平台，是设计师的灵感聚合地和素材下载源。`,
        language: `zh-cn`,
        item: c.map((e) => {
            let t = i(e.content.rendered),
                n = t(`p > img`).first().attr(`src`);
            return (
                t(`p > img`).first().remove(),
                t(`h4`).each((e, n) => {
                    t(n).text().includes(`扫码欣赏`) && t(n).remove();
                }),
                { title: e.title.rendered, description: t.html(), link: e.link, cover: n, pubDate: r(e.date_gmt), media: n && { content: { url: n, type: `image/${l[n.split(`.`).pop()]}` } } }
            );
        }),
    };
}
export { c as route };
