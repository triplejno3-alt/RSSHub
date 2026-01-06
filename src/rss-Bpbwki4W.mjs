import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { t as i } from './rss-parser-CKuAfhVS.mjs';
import { jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
const l = new Set([`tw`, `hk`]),
    u = {
        path: `/:region?`,
        categories: [`new-media`],
        example: `/eprice/tw`,
        parameters: { region: `地区，预设为 tw` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `最新消息`,
        maintainers: [`TonyRL`],
        handler: d,
        description: `地区：

| hk   | tw   |
| ---- | ---- |
| 香港 | 台湾 |`,
    };
async function d(u) {
    let d = u.req.param(`region`) ?? `tw`;
    if (!l.has(d)) throw new r(`Invalid region`);
    let f = await i.parseURL(`https://www.eprice.com.${d}/news/rss.xml`);
    for (let e of f.items) e.link = e.link.replace(/^http:\/\//i, `https://`);
    let p = await Promise.all(
            f.items.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = s((await n(r.link, { headers: { Referer: `https://www.eprice.com.${d}` } })).data);
                    return (
                        e(`noscript`).remove(),
                        e(`div[id^=dablewidget]`).remove(),
                        e(`div[class^=parallax-ads]`).remove(),
                        e(`.adsbygoogle, .join-eprice-fb, .teads`).remove(),
                        e(`div.ad-336x280-g, div.ad-728x90-g`).remove(),
                        e(`div.clear, div.news-vote, div.signature`).remove(),
                        e(`ul.inner, ul.navigator, ul.infobar`).remove(),
                        e(`iframe[src^="https://www.facebook.com/plugins/like.php"]`).remove(),
                        (r.category = r.categories),
                        e(`a`).each((t, n) => {
                            ((n = e(n)),
                                n.attr(`href`) &&
                                    n.attr(`href`).endsWith(`.jpg`) &&
                                    (n.after(c(o(`figure`, { children: [a(`img`, { src: n.attr(`href`), alt: n.attr(`title`) ?? ``, title: n.attr(`title`) ?? `` }), a(`figcaption`, { children: n.attr(`title`) ?? `` })] }))),
                                    n.remove()));
                        }),
                        e(`img`).each((t, n) => {
                            ((n = e(n)), n.attr(`data-original`) && n.attr(`src`, n.attr(`data-original`)));
                        }),
                        delete r.categories,
                        delete r.content,
                        delete r.contentSnippet,
                        delete r.creator,
                        delete r.enclosure,
                        delete r.isoDate,
                        (r.description = e(`div.user-comment-block`).html() || e(`div.content`).html() || e(`li.inner`).html() || e(`div.section-content`).html() || e(`.article__content`).html()),
                        (r.pubDate = t(r.pubDate)),
                        r
                    );
                })
            )
        ),
        m = { title: f.title, link: f.link, description: f.description, item: p, image: f.image.url, language: f.language };
    return (u.set(`json`, m), m);
}
export { u as route };
