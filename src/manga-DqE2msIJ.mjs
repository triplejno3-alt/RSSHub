import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/manga/:name`,
    categories: [`anime`],
    example: `/bakamh/manga/最强家丁`,
    parameters: { name: `漫画名称，漫画主页的地址栏中` },
    radar: [{ source: [`bakamh.com/manga/:name/`] }],
    name: `漫画更新`,
    maintainers: [`yoyobase`],
    handler: async (i) => {
        let { name: a } = i.req.param(),
            o = Number.parseInt(i.req.query(`limit`), 15) || 15,
            s = `https://bakamh.com/manga/${a}/`,
            c = r(await e(s)),
            l = JSON.parse(c(`script[type="application/ld+json"]`).text()),
            u = c(`li.wp-manga-chapter`)
                .toArray()
                .slice(0, o)
                .map((e) => {
                    let t = c(e),
                        n = t.find(`i`).text().replaceAll(` `, ``);
                    return { title: t.find(`a`).text(), link: t.find(`a`).attr(`href`), guid: t.find(`a`).attr(`href`), pubDate: n };
                });
        u.length > 0 && (u[0].pubDate = l.dateModified);
        let d = await Promise.all(
            u.map((i) =>
                t.tryGet(i.link, async () => {
                    let t = r(await e(i.link)),
                        a = t(`div.reading-content img`),
                        o = t(`<div class="image-container"></div>`);
                    return (a.appendTo(o), (i.description = o.html()), (i.pubDate = n(i.pubDate, `YYYY年M月D日`)), i);
                })
            )
        );
        return { title: c(`title`).text(), link: s, description: c(`.post-content_item p`).text(), image: c(`.summary_image a img`).attr(`src`), item: d };
    },
    url: `bakamh.com`,
};
export { i as route };
