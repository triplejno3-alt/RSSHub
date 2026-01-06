import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, description: t }) => c(o(i, { children: [e?.map((e) => (e?.src ? a(`figure`, { children: a(`img`, { src: e.src, alt: e.alt }) }) : null)), t ? l(t) : null] })),
    d = async (i) => {
        let { category: a = `news/All` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 15,
            c = `http://www.a9vg.com`,
            l = new URL(`list/${a}`, c).href,
            { data: d } = await n(l),
            f = s(d),
            p = f(`html`).prop(`lang`),
            m = f(`a.a9-rich-card-list_item`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = f(e);
                    let n = e.find(`img.a9-rich-card-list_image`),
                        i = e.find(`div.a9-rich-card-list_label`).text();
                    return { title: i, link: new URL(e.prop(`href`), c).href, description: u({ images: n ? [{ src: n.prop(`src`), alt: i }] : void 0 }), pubDate: r(t(e.find(`div.a9-rich-card-list_infos`).text()), 8), language: p };
                });
        m = await Promise.all(
            m.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = s(e);
                    return (
                        a(`ignore_js_op img, p img`).each((e, t) => {
                            ((t = a(t)), t.parent().replaceWith(u({ images: t.prop(`file`) ? [{ src: t.prop(`file`), alt: t.next().find(`div.xs0 p`).first().text() }] : void 0 })));
                        }),
                        (i.title = a(`h1.ts, div.c-article-main_content-title`).first().text()),
                        (i.description = u({ description: a(`td.t_f, div.c-article-main_contentraw`).first().html() })),
                        (i.author =
                            a(`b a.blue`).first().text() ||
                            a(
                                a(`span.c-article-main_content-intro-item`)
                                    .toArray()
                                    .findLast((e) => a(e).text().startsWith(`作者`))
                            )
                                .text()
                                .split(/：/)
                                .pop()),
                        (i.pubDate = r(
                            t(
                                a(`div.authi em`)
                                    .first()
                                    .text()
                                    .trim()
                                    .match(/发表于 (\d+-\d+-\d+ \d+:\d+)/)?.[1] ?? a(`span.c-article-main_content-intro-item`).first().text(),
                                [`YYYY-M-D HH:mm`, `YYYY-MM-DD HH:mm`]
                            ),
                            8
                        )),
                        (i.language = p),
                        i
                    );
                })
            )
        );
        let h = f(`title`).text(),
            g = new URL(`images/logo.1cee7c0f.svg`, c).href;
        return { title: h, description: f(`meta[name="description"]`).prop(`content`), link: l, item: m, allowEmpty: !0, image: g, author: h.split(/-/).pop(), language: p };
    },
    f = {
        path: `/:category{.+}?`,
        name: `新闻`,
        url: `a9vg.com`,
        maintainers: [`monnerHenster`, `nczitzk`],
        handler: d,
        example: `/a9vg/news`,
        parameters: { category: `分类，默认为 ，可在对应分类页 URL 中找到, Category, by default` },
        description: `::: tip
  若订阅 [PS4](http://www.a9vg.com/list/news/PS4)，网址为 \`http://www.a9vg.com/list/news/PS4\`。截取 \`http://www.a9vg.com/list\` 到末尾的部分 \`news/PS4\` 作为参数填入，此时路由为 [\`/a9vg/news/PS4\`](https://rsshub.app/a9vg/news/PS4)。
:::

| 分类                                               | ID                                                     |
| -------------------------------------------------- | ------------------------------------------------------ |
| [All](https://www.a9vg.com/list/news/All)          | [news/All](https://rsshub.app/a9vg/news/All)           |
| [PS4](https://www.a9vg.com/list/news/PS4)          | [news/PS4](https://rsshub.app/a9vg/news/PS4)           |
| [PS5](https://www.a9vg.com/list/news/PS5)          | [news/PS5](https://rsshub.app/a9vg/news/PS5)           |
| [Switch](https://www.a9vg.com/list/news/Switch)    | [news/Switch](https://rsshub.app/a9vg/news/Switch)     |
| [Xbox One](https://www.a9vg.com/list/news/XboxOne) | [news/XboxOne](https://rsshub.app/a9vg/news/XboxOne)   |
| [XSX](https://www.a9vg.com/list/news/XSX)          | [news/XSX](https://rsshub.app/a9vg/news/XSX)           |
| [PC](https://www.a9vg.com/list/news/PC)            | [news/PC](https://rsshub.app/a9vg/news/PC)             |
| [业界](https://www.a9vg.com/list/news/Industry)    | [news/Industry](https://rsshub.app/a9vg/news/Industry) |
| [厂商](https://www.a9vg.com/list/news/Factory)     | [news/Factory](https://rsshub.app/a9vg/news/Factory)   |
  `,
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.a9vg.com/list/:category`],
                target: (e) => {
                    let t = e.category;
                    return t ? `/${t}` : ``;
                },
            },
            { title: `All`, source: [`www.a9vg.com/list/news/All`], target: `/news/All` },
            { title: `PS4`, source: [`www.a9vg.com/list/news/PS4`], target: `/news/PS4` },
            { title: `PS5`, source: [`www.a9vg.com/list/news/PS5`], target: `/news/PS5` },
            { title: `Switch`, source: [`www.a9vg.com/list/news/Switch`], target: `/news/Switch` },
            { title: `Xbox One`, source: [`www.a9vg.com/list/news/XboxOne`], target: `/news/XboxOne` },
            { title: `XSX`, source: [`www.a9vg.com/list/news/XSX`], target: `/news/XSX` },
            { title: `PC`, source: [`www.a9vg.com/list/news/PC`], target: `/news/PC` },
            { title: `业界`, source: [`www.a9vg.com/list/news/Industry`], target: `/news/Industry` },
            { title: `厂商`, source: [`www.a9vg.com/list/news/Factory`], target: `/news/Factory` },
        ],
    };
export { d as handler, f as route };
