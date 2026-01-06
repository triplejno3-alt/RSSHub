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
const u = ({ intro: e, description: t }) => c(o(i, { children: [e ? a(`blockquote`, { children: l(e) }) : null, t ? a(i, { children: l(t) }) : null] })),
    d = async (i) => {
        let { id: a = `1` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10,
            c = `https://www.eshukan.com`,
            l = new URL(`academic/index.aspx?cid=${a}`, c).href,
            { data: d } = await n(l),
            f = s(d),
            p = f(`ul.article li`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = f(e);
                    let n = e.find(`a`),
                        i = n.contents().last().text(),
                        a = e
                            .find(`p span`)
                            .text()
                            .match(/(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2})/)?.[1];
                    e.find(`p span`).remove();
                    let o = u({ intro: e.find(`p`).text() });
                    return { title: i, description: o, pubDate: a ? r(t(a), 8) : void 0, link: new URL(n.prop(`href`), l).href, content: { html: o, text: e.find(`p`).text() } };
                });
        p = await Promise.all(
            p.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = s(e),
                        o = a(`h1`).text(),
                        c = u({ intro: a(`div.summary`).html(), description: a(`div.detail`).html() }),
                        l = a(`div.author`)
                            .text()
                            .match(/(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2})/)?.[1];
                    return ((i.title = o), (i.description = c), (i.pubDate = l ? r(t(l), 8) : i.pubDate), (i.author = a(`div.author a`).text()), (i.content = { html: c, text: a(`div.detail`).text() }), i);
                })
            )
        );
        let m = f(`title`).text(),
            h = new URL(f(`div.logo img`).prop(`src`), c).href;
        return { title: m, description: f(`meta[name="description"]`).prop(`content`), link: l, item: p, allowEmpty: !0, image: h, author: m.split(/_/).pop() };
    },
    f = {
        path: `/academic/:id?`,
        name: `学术资讯`,
        url: `www.eshukan.com`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/eshukan/academic/1`,
        parameters: { category: '栏目 id，默认为 `1`，即期刊动态，可在对应栏目页 URL 中找到' },
        description:
            '::: tip\n  若订阅 [期刊动态](https://www.eshukan.com/academic/index.aspx?cid=1)，网址为 `https://www.eshukan.com/academic/index.aspx?cid=1`。截取 `https://www.eshukan.com/academic/index.aspx?cid=` 到末尾的部分 `1` 作为参数填入，此时路由为 [`/eshukan/academic/1`](https://rsshub.app/eshukan/academic/1)。\n:::\n    ',
        categories: [`study`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.eshukan.com/academic/index.aspx`],
                target: (e, t) => {
                    t = new URL(t);
                    let n = t.searchParams.get(`id`);
                    return `/academic${n ? `/${n}` : ``}`;
                },
            },
        ],
    };
export { d as handler, f as route };
