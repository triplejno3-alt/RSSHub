import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/:type`,
    categories: [`blog`],
    example: `/logrocket/dev`,
    parameters: { type: `dev | product-management | ux-design` },
    radar: [{ source: [`blog.logrocket.com`] }],
    name: `blog.logrocket`,
    maintainers: [`findwei`],
    handler: a,
    url: `blog.logrocket.com/`,
};
async function a(i) {
    let a = i.req.param(`type`),
        o = `https://blog.logrocket.com/`,
        s = `Dev`;
    a === `product-management` ? (s = `Product Management`) : a === `ux-design` && (s = `UX Design`);
    let c = r(await e(`${o}${a}`)),
        l = c(`div.post-list .post-card`)
            .toArray()
            .map((e) => {
                e = c(e);
                let t = e.find(`a`).first();
                return {
                    title: e.find(`.post-card-title`).first().text(),
                    link: t.attr(`href`),
                    pubDate: n(e.find(`.post-card-author-name`).next().text().split(` ⋅ `)[0], `MMM D, YYYY`),
                    author: e.find(`.post-card-author-name`).text(),
                };
            }),
        u = await Promise.all(
            l.map((n) =>
                t.tryGet(n.link, async () => {
                    let t = r(await e(n.link));
                    return (t(`div.content-max-width .sidebar-container div.code-block`).remove(), (n.description = t(`div.content-max-width .sidebar-container`).html()), n);
                })
            )
        );
    return { title: `logrocket-${s}`, link: o, description: `logrocket-${s}`, item: u };
}
export { i as route };
