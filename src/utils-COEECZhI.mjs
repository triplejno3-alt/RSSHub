import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = `http://www.caareviews.org`,
    u = async (e) => {
        let t = o((await n(e)).data);
        return t(`#infinite-content > div`)
            .toArray()
            .map((e) => ({ title: t(e).find(`div.title`).text().trim(), link: new URL(t(e).find(`div.title > em > a`).attr(`href`), l).href, author: t(e).find(`div.contributors`).text().trim() }));
    },
    d = (u, d) =>
        Promise.all(
            d.map((u) =>
                e.tryGet(u.link, async () => {
                    let e = o((await n(u.link)).data),
                        d = new URL(e(`div.cover > a`).attr(`href`), l).href,
                        f = e(`div.content.full-review`).html();
                    return (
                        (u.description = s(a(r, { children: [i(`img`, { src: d }), c(f ?? ``)] }))),
                        e(`div.review_heading`).remove(),
                        (u.pubDate = t(e(`div.header-text > div.clearfix`).text())),
                        (u.doi = e(`div.crossref > a`).attr(`href`).replace(`http://dx.doi.org/`, ``)),
                        u
                    );
                })
            )
        );
export { u as n, l as r, d as t };
