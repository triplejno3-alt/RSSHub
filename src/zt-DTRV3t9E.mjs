import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = async (s) => {
        let { id: c = `xijiayi` } = s.req.param(),
            l = s.req.query(`limit`) ? Number.parseInt(s.req.query(`limit`), 10) : 50,
            u = `https://www.ithome.com`,
            d = new URL(`zt/${c}`, u).href,
            { data: f } = await n(d),
            p = a(f),
            m = `IT之家`,
            h = p(`div.newsbody`)
                .slice(0, l)
                .toArray()
                .map((e) => {
                    e = p(e);
                    let n = e.find(`h2`).text(),
                        i = e.find(`img`).prop(`data-original`) ?? e.find(`img`).prop(`src`);
                    return {
                        title: n,
                        pubDate: r(
                            t(
                                e
                                    .find(`span.time script`)
                                    .text()
                                    .match(/'(.*?)'/)
                            ),
                            8
                        ),
                        link: e.find(`a`).first().prop(`href`),
                        author: e.find(`div.editor`).contents().first().text(),
                        image: i,
                        banner: i,
                        language: `zh`,
                    };
                });
        h = await Promise.all(
            h.map((s) =>
                e.tryGet(s.link, async () => {
                    let { data: e } = await n(s.link),
                        c = a(e);
                    (c(`p.ad-tips, a.topic-bar`).remove(),
                        c(`div#paragraph p img`).each((e, t) => {
                            t = c(t);
                            let n = t.prop(`data-original`);
                            if (n) {
                                let e = t.prop(`alt`);
                                t.replaceWith(o(i(`figure`, { children: e ? i(`img`, { src: n, alt: e }) : i(`img`, { src: n }) })));
                            }
                        }));
                    let l = c(`h1`).text(),
                        u = c(`div#paragraph`).html(),
                        d = c(`div#paragraph img`).first().prop(`src`);
                    return (
                        (s.title = l),
                        (s.description = u),
                        (s.pubDate = r(t(c(`span#pubtime_baidu`).text()), 8)),
                        (s.category = c(`div.cv a`)
                            .toArray()
                            .map((e) => c(e).text())
                            .slice(1)),
                        (s.author = c(`span#author_baidu`).contents().last().text() || c(`span#source_baidu`).contents().last().text() || c(`span#editor_baidu`).contents().last().text()),
                        (s.content = { html: u, text: c(`div#paragraph`).text() }),
                        (s.image = d),
                        (s.banner = d),
                        (s.language = `zh`),
                        s
                    );
                })
            )
        );
        let g = new URL(p(`meta[property="og:image"]`).prop(`content`), u).href;
        return { title: `${m} - ${p(`title`).text()}`, description: p(`meta[name="description"]`).prop(`content`), link: d, item: h, allowEmpty: !0, image: g, author: m, language: `zh` };
    },
    c = {
        path: `/zt/:id?`,
        name: `专题`,
        url: `ithome.com`,
        maintainers: [`nczitzk`],
        handler: s,
        example: `/ithome/zt/xijiayi`,
        parameters: { category: `专题 id，默认为 xijiayi，即 [喜加一](https://www.ithome.com/zt/xijiayi)，可在对应专题页 URL 中找到` },
        description: `::: tip
  更多专题请见 [IT之家专题](https://www.ithome.com/zt)
:::`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`ithome.com/zt/:id`], target: `/zt/:id` }],
    };
export { s as handler, c as route };
