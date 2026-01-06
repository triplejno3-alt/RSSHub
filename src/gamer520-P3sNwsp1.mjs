import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/:category?/:order?`,
    categories: [`game`],
    example: `/gamer520/switchyouxi`,
    parameters: { category: `分类，见下表`, order: `排序，发布日期: date; 修改日期: modified` },
    features: { antiCrawler: !0 },
    name: `文章`,
    maintainers: [`xzzpig`],
    handler: a,
    url: `www.gamer520.com/`,
    description: `分类

| 所有 | Switch 游戏下载 | 金手指     | 3A 巨作 | switch 主题 | PC 游戏 |
| ---- | --------------- | ---------- | ------- | ----------- | ------- |
| all  | switchyouxi     | jinshouzhi | 3ajuzuo | zhuti       | pcgame  |`,
};
async function i(t) {
    return await e.tryGet(`gamer520:categories`, async () => {
        let { data: e } = await n(`${t}/wp-json/wp/v2/categories`);
        return e.map((e) => ({ slug: e.slug, id: e.id, name: e.name, link: e.link }));
    });
}
async function a(e) {
    let r = `https://www.gamer520.com`,
        a = await i(r),
        o = e.req.param(`category`) ?? `all`,
        s = e.req.param(`order`),
        c = a.find((e) => e.slug === o)?.id,
        { data: l } = await n(`${r}/wp-json/wp/v2/posts`, { searchParams: { categories: c, orderby: s, per_page: e.req.query(`limit`) ? Number.parseInt(e.req.query(`limit`)) : void 0 } }),
        u = l.map((e) => ({
            guid: `gamer520:${e.id}`,
            title: e.title.rendered,
            link: e.guid.rendered,
            pubDate: t(e.date_gmt),
            updated: t(e.modified_gmt),
            category: e.categories?.map((e) => a.find((t) => t.id === e)?.name ?? ``).filter((e) => e !== ``) ?? [],
            description: e.content.rendered,
        }));
    return { title: `全球游戏交流中心-` + (a.find((e) => e.slug === o)?.name ?? `所有`), link: a.find((e) => e.slug === o)?.link ?? r, item: u };
}
export { r as route };
