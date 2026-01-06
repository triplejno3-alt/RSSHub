import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
import { Fragment as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = { path: `/`, example: `/gameapps`, radar: [{ source: [`gameapps.hk/`] }], name: `最新消息`, maintainers: [`TonyRL`], handler: u, url: `gameapps.hk/` };
async function u() {
    let l = `https://www.gameapps.hk`,
        u = await r.parseURL(`${l}/rss`),
        d = await Promise.all(
            u.items.map((r) =>
                t.tryGet(r.link, async () => {
                    let t = o(await e(r.link, { headers: { Referer: l } }));
                    r.title = t(`meta[property="og:title"]`).attr(`content`) ?? t(`.news-title h1`).text();
                    let u = t(`.pagination li`)
                        .not(`.disabled`)
                        .not(`.active`)
                        .find(`a`)
                        .toArray()
                        .map((e) => `${l}${e.attribs.href}`);
                    t(`.pages`).remove();
                    let d = t(`.news-content`);
                    if ((delete r.content, delete r.contentSnippet, delete r.isoDate, u.length)) {
                        let t = await Promise.all(
                            u.map(async (t) => {
                                let n = o(await e(t, { headers: { referer: r.link } }));
                                return (n(`.pages`).remove(), n(`.news-content`).html());
                            })
                        );
                        d.append(t);
                    }
                    let f = t(`div.introduction.media.news-intro div.media-body`).html()?.trim(),
                        p = d.html()?.trim();
                    return (
                        (r.description = s(a(i, { children: [f ? c(f) : null, p ? c(p) : null] }))),
                        (r.guid = r.guid.slice(0, r.link.lastIndexOf(`/`))),
                        (r.pubDate = n(r.pubDate)),
                        (r.enclosure_url = t(`div.introduction.media.news-intro div.media-left`).find(`img`).attr(`src`)),
                        (r.enclosure_type = `image/jpeg`),
                        r
                    );
                })
            )
        );
    return { title: u.title, link: u.link, description: u.description, image: `${l}/static/favicon/apple-touch-icon.png`, item: d, language: u.language };
}
export { l as route };
