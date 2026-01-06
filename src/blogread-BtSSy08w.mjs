import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import * as t from 'cheerio';
const n = { path: `/newest`, categories: [`programming`], example: `/blogread/newest`, radar: [{ source: [`blogread.cn/news/newest.php`] }], name: `最新文章`, maintainers: [`fashioncj`], handler: r };
async function r() {
    let n = `https://blogread.cn/news/newest.php`,
        r = await e({ method: `get`, url: n }),
        i = t.load(r.data);
    return {
        title: `技术头条`,
        link: n,
        item: i(`.media`)
            .toArray()
            .map((e) => {
                e = i(e);
                let t = e.find(`dt a`);
                return {
                    title: t.text(),
                    description: e.find(`dd`).eq(0).text(),
                    link: t.attr(`href`),
                    author: e.find(`.small a`).eq(0).text(),
                    pubDate: e.find(`dd`).eq(1).text().split(`
`)[2],
                };
            }),
    };
}
export { n as route };
