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
const u = ({ images: e, intro: t, description: n }) =>
        c(
            o(i, {
                children: [
                    e?.length ? e.map((e) => (e?.src ? a(`figure`, { children: e.alt ? a(`img`, { src: e.src, alt: e.alt }) : a(`img`, { src: e.src }) }) : null)) : null,
                    t ? a(`blockquote`, { children: t }) : null,
                    n ? l(n) : null,
                ],
            })
        ),
    d = {
        path: [`/xhsxw`, `/whxw`],
        categories: [`new-media`],
        example: `/news/xhsxw`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`news.cn/xhsxw.htm`] }],
        name: `新华社新闻`,
        maintainers: [`nczitzk`],
        handler: f,
        url: `news.cn/xhsxw.htm`,
    };
async function f(i) {
    let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 100,
        o = `http://www.news.cn`,
        c = new URL(`xhsxw.htm`, o).href,
        { data: l } = await n(c),
        d = s(l),
        f = d(`ul.wz-list`)
            .prop(`data`)
            .replace(/datasource:/, ``),
        p = new URL(`ds_${f}.json`, o).href,
        {
            data: { datasource: m },
        } = await n(p),
        h = m
            .slice(0, a)
            .map((e) => ({
                title: e.title,
                link: new URL(e.publishUrl, o).href,
                description: u({ images: e.shareImages?.map((t) => ({ src: t.imageUrl, alt: e.title })) ?? void 0, intro: e.summary }),
                author: e.author,
                category: e.keywords.split(/-|,/),
                guid: `news-${e.contentId}`,
                pubDate: r(t(e.publishTime), 8),
            }));
    h = await Promise.all(
        h.map((t) =>
            e.tryGet(t.link, async () => {
                try {
                    let { data: e } = await n(t.link),
                        r = s(e);
                    t.description += u({ description: r(`#detailContent`).html() });
                } catch {}
                return t;
            })
        )
    );
    let g = d(`title`).text(),
        _ = new URL(`20141223_xhsxw_logo_v1.png`, o).href,
        v = new URL(`favicon.ico`, o).href;
    return { item: h, title: g, link: c, description: g.split(/_/)[0], language: `zh`, image: _, icon: v, logo: v, author: g.split(/_/).pop(), allowEmpty: !0 };
}
export { d as route };
