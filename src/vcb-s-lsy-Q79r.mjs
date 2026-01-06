import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './post-pXujzLyb.mjs';
const r = `https://vcb-s.com`,
    i = `${r}/wp-json/wp/v2/posts`,
    a = { path: `/`, radar: [{ source: [`vcb-s.com/`], target: `` }], name: `Unknown`, maintainers: [`cxfksword`], handler: o, url: `vcb-s.com/` };
async function o(a) {
    let o = `${i}?per_page=${a.req.query(`limit`) ?? 7}&_embed`,
        s = await t.get(o);
    return (
        typeof s.data == `string` && (s.data = JSON.parse(s.body.trim())),
        {
            title: `VCB-Studio - 大家一起实现的故事！`,
            link: r,
            item: s.data.map((t) => {
                let r = n({
                    post: t.content.rendered.replaceAll(/<pre class="js-medie-info-detail.*?>(.*?)<\/pre>/gs, `<pre><code>$1</code></pre>`).replaceAll(/<div.+?dw-box-download.+?>(.*?)<\/div>/gs, `<pre>$1</pre>`),
                    medias: t._embedded[`wp:featuredmedia`],
                });
                return { title: t.title.rendered, link: t.link, description: r, pubDate: e(t.date_gmt), author: t._embedded.author[0].name };
            }),
        }
    );
}
export { a as route };
