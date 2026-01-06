import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = ({ images: e, description: t }) =>
        s(a(r, { children: [e?.length ? e.map((e) => (e?.src ? i(`figure`, { children: e.alt ? i(`img`, { src: e.src, alt: e.alt }) : i(`img`, { src: e.src }) }) : null)) : null, t ? c(t) : null] })),
    u = async (r) => {
        let { category: i } = r.req.param(),
            a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 12,
            s = `https://www.cuilingmag.com`,
            c = new URL(i ? `category/${i}` : ``, s).href,
            { data: u } = await n(c),
            d = o(u),
            f = d(`html`).prop(`lang`),
            p = d(`div.new-list-div, div.item`)
                .slice(0, a)
                .toArray()
                .map((e) => {
                    e = d(e);
                    let t = e.find(`h3.new-list-h3, h3.title-font`).first().text().trim(),
                        n = e.find(`img`).first().prop(`src`),
                        r = n ? new URL(n, s).href : void 0;
                    return {
                        title: t,
                        description: l({ images: r ? [{ src: r, alt: t }] : void 0 }),
                        link: new URL(e.find(`a`).first().prop(`href`), s).href,
                        author: e.find(`a.new-list-p, div.author`).text().trim(),
                        image: r,
                        banner: r,
                        language: f,
                        enclosure_url: r,
                        enclosure_type: r ? `image/${r.split(/\./).pop()}` : void 0,
                        enclosure_title: t,
                    };
                });
        p = await Promise.all(
            p.map((r) =>
                e.tryGet(r.link, async () => {
                    let { data: e } = await n(r.link),
                        i = o(e),
                        a = `${i(`p.title-font`).text().trim()} ${i(`p.subtitle-font`).text().trim()}`,
                        c = i(`div.banner img`).first().prop(`src`),
                        u = c ? new URL(c, s).href : void 0,
                        d = r.description + l({ images: u ? [{ src: u, alt: a }] : void 0, description: i(`div.article-content`).html() });
                    return (
                        (r.title = a),
                        (r.description = d),
                        (r.pubDate = t(i(`p.time`).first().text())),
                        (r.category = [
                            ...new Set([
                                ...i(`p.sort a`)
                                    .toArray()
                                    .map((e) => i(e).text().trim()),
                                ...i(`span.type`)
                                    .toArray()
                                    .map((e) => i(e).text().trim()),
                            ]),
                        ].filter(Boolean)),
                        (r.author = i(`p.author a`)
                            .toArray()
                            .map((e) => i(e).contents().first().text().trim())
                            .join(`/`)),
                        (r.content = { html: d, text: i(`div.article-content`).text() }),
                        (r.banner = u),
                        (r.language = f),
                        (r.enclosure_url = u ?? r.enclosure_url),
                        (r.enclosure_type = u ? `image/${u.split(/\./).pop()}` : r.enclosure_type),
                        (r.enclosure_title = a),
                        r
                    );
                })
            )
        );
        let m = d(`title`).text().trim(),
            h = new URL(d(`div.nav-logo a img`).prop(`src`), s).href;
        return { title: m, description: d(`meta[property="og:description"]`).prop(`content`), link: c, item: p, allowEmpty: !0, image: h, author: m.split(/-/).pop(), language: f };
    },
    d = {
        path: `/:category?`,
        name: `分类`,
        url: `cuilingmag.com`,
        categories: [`new-media`],
        maintainers: [`nczitzk`],
        handler: u,
        example: `/cuilingmag`,
        parameters: { category: `分类，默认为空，即全部，可在对应分类页 URL 中找到` },
        description: `::: tip
  若订阅 [#哲学·文明](https://www.cuilingmag.com/category/philosophy_civilization)，网址为 \`https://www.cuilingmag.com/category/philosophy_civilization\`。截取 \`https://www.cuilingmag.com/category\` 到末尾的部分 \`philosophy_civilization\` 作为参数填入，此时路由为 [\`/cuilingmag/philosophy_civilization\`](https://rsshub.app/cuilingmag/philosophy_civilization)。
:::

| 分类                                                                       | ID                                                                                |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [哲学 · 文明](https://www.cuilingmag.com/category/philosophy_civilization) | [philosophy_civilization](https://rsshub.app/cuilingmag/philosophy_civilization) |
| [艺术 · 科技](https://www.cuilingmag.com/category/art_science)             | [art_science](https://rsshub.app/cuilingmag/art_science)                         |
| [未来 · 生命](https://www.cuilingmag.com/category/future_life)             | [future_life](https://rsshub.app/cuilingmag/future_life)                         |
| [行星智慧](https://www.cuilingmag.com/category/planetary_wisdom)           | [planetary_wisdom](https://rsshub.app/cuilingmag/planetary_wisdom)               |
| [数字治理](https://www.cuilingmag.com/category/digital_governance)         | [digital_governance](https://rsshub.app/cuilingmag/digital_governance)           |
| [Noema精选](https://www.cuilingmag.com/category/selected_noema)            | [selected_noema](https://rsshub.app/cuilingmag/selected_noema)                   |
  `,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`cuilingmag.com/category/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/cuilingmag${t ? `/${t}` : ``}`;
                },
            },
            { title: `全部`, source: [`cuilingmag.com`], target: `/` },
            { title: `哲学 · 文明`, source: [`cuilingmag.com/category/philosophy_civilization`], target: `/philosophy_civilization` },
            { title: `艺术 · 科技`, source: [`cuilingmag.com/category/art_science`], target: `/art_science` },
            { title: `未来 · 生命`, source: [`cuilingmag.com/category/future_life`], target: `/future_life` },
            { title: `行星智慧`, source: [`cuilingmag.com/category/planetary_wisdom`], target: `/planetary_wisdom` },
            { title: `数字治理`, source: [`cuilingmag.com/category/digital_governance`], target: `/digital_governance` },
            { title: `Noema精选`, source: [`cuilingmag.com/category/selected_noema`], target: `/selected_noema` },
        ],
    };
export { u as handler, d as route };
