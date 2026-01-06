import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = { path: `/blog`, categories: [`blog`], example: `/thzt/blog`, url: `thzt.github.io`, name: `Blog`, maintainers: [`jihuayu`], handler: a };
async function a() {
    let i = `https://thzt.github.io`,
        a = `${i}/archives/`,
        o = r((await n({ method: `get`, url: a })).data),
        s = o(`a.post-title-link`)
            .toArray()
            .map((e) => {
                let t = o(e),
                    n = t.attr(`href`) || ``;
                return { title: t.find(`span`).first().text() || ``, link: n };
            });
    return {
        title: `thzt articles`,
        link: a,
        item: await Promise.all(
            s.slice(0, 15).map((a) =>
                e.tryGet(a.link, async () => {
                    let e = r((await n({ method: `get`, url: `${i}/${a.link}` })).data),
                        o = e(`span.post-time > time`).text();
                    return ((a.author = `何幻`), (a.pubDate = t(o)), (a.description = e(`div.post-body`).first().html() || ``), (a.category = [e(`span.post-category>span>a>span`).first().text()]), a);
                })
            )
        ),
    };
}
export { i as route };
