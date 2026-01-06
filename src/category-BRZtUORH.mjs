import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './post-pXujzLyb.mjs';
const i = `https://vcb-s.com`,
    a = `${i}/wp-json/wp/v2/categories`,
    o = `${i}/wp-json/wp/v2/posts`,
    s = {
        path: `/category/:cate`,
        categories: [`anime`],
        example: `/vcb-s/category/works`,
        parameters: { cate: `分类` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`vcb-s.com/archives/category/:cate`] }],
        name: `分类文章`,
        maintainers: [`cxfksword`],
        handler: c,
        url: `vcb-s.com/`,
        description: `| 作品项目 | 科普系列 | 计划与日志 |
| -------- | -------- | ---------- |
| works    | kb       | planlog    |`,
    };
async function c(s) {
    let c = s.req.param(`cate`),
        l = s.req.query(`limit`) ?? 7,
        u = `${a}?slug=${c}`,
        d = await e.tryGet(u, async () => {
            let e = await n.get(u);
            return (typeof e.data == `string` && (e.data = JSON.parse(e.body.trim())), e.data[0]);
        }),
        f = `${o}?categories=${d.id}&page=1&per_page=${l}&_embed`,
        p = await n.get(f);
    typeof p.data == `string` && (p.data = JSON.parse(p.body.trim()));
    let m = p.data.map((e) => {
        let n = r({
            post: e.content.rendered.replaceAll(/<pre class="js-medie-info-detail.*?>(.*?)<\/pre>/gs, `<pre><code>$1</code></pre>`).replaceAll(/<div.+?dw-box-download.+?>(.*?)<\/div>/gs, `<pre>$1</pre>`),
            medias: e._embedded[`wp:featuredmedia`],
        });
        return { title: e.title.rendered, link: e.link, description: n, pubDate: t(e.date_gmt), author: e._embedded.author[0].name };
    });
    return { title: `${d.name} | VCB-Studio`, link: `${i}/archives/category/${d.slug}`, item: m };
}
export { s as route };
