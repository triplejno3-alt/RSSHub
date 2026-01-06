import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/archives`,
    categories: [`blog`],
    example: `/enterprisecraftsmanship/archives`,
    radar: [{ source: [`enterprisecraftsmanship.com/archives/`] }],
    url: `enterprisecraftsmanship.com/`,
    name: `Archives`,
    maintainers: [`liyaozhong`],
    handler: o,
    description: `Enterprise Craftsmanship blog archives`,
};
async function o() {
    let a = `https://enterprisecraftsmanship.com/archives`,
        o = i((await r(a)).data),
        s = o(`.postIndexItem`)
            .toArray()
            .map((e) => {
                let t = o(e);
                return { title: t.find(`.title a`).text().trim(), link: new URL(t.find(`.title a`).attr(`href`), a).href, pubDate: n(t.find(`.date`).text().trim()) };
            });
    return (
        (s = await Promise.all(
            s.map((n) =>
                t.tryGet(n.link, async () => {
                    try {
                        let e = i((await r(n.link)).data);
                        return ((n.description = (e(`.post > .paragraph`).html() ?? ``) + (e(`.post >.sect1`).html() ?? ``)), n);
                    } catch (t) {
                        return (e.error(`处理文章 ${n.link} 时发生错误: ${t}`), n);
                    }
                })
            )
        )),
        { title: `Enterprise Craftsmanship - Archives`, link: a, item: s }
    );
}
export { a as route };
