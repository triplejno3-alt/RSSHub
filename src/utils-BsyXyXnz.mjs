import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
async function r(r) {
    let i = await t(`https://web.dev/_d/dynamic_content`, { body: `[null,null,null, "${r}",null,null,null,null,31,null,null,null,2]`, method: `post` }),
        a = JSON.parse(i.data.replace(/^[^[]*/, ``));
    return await Promise.all(
        a[0].map((r) => {
            let i = r[6];
            return e.tryGet(i, async () => {
                let { data: e } = await t.get(i),
                    a = n(e)(`.devsite-article-body`);
                return (a.find(`.wd-authors`).remove(), { title: r[0], pubDate: new Date(r[5][0] * 1e3), description: a.html(), link: i });
            });
        })
    );
}
function i(e) {
    return e
        .split(`-`)
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join(``);
}
export { i as n, r as t };
