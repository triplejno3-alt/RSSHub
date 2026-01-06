import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
import { load as i } from 'cheerio';
const a = { path: `/blog`, categories: [`blog`], example: `/baoyu/blog`, radar: [{ source: [`baoyu.io/`] }], url: `baoyu.io/`, name: `Blog`, maintainers: [`liyaozhong`], handler: o, description: `宝玉 - 博客文章` };
async function o() {
    let a = `https://baoyu.io`,
        o = `${a}/feed.xml`,
        s = await r.parseURL(o);
    return {
        title: `宝玉的博客`,
        link: a,
        item: await Promise.all(
            s.items.map((r) => {
                let a = r.link;
                return e.tryGet(a, async () => {
                    let e =
                        i((await n(a)).data)(`.container`)
                            .find(`.prose`)
                            .html() || ``;
                    return { title: r.title, description: e, link: a, pubDate: r.pubDate ? t(r.pubDate) : void 0, author: r.creator || `宝玉` };
                });
            })
        ),
    };
}
export { a as route };
