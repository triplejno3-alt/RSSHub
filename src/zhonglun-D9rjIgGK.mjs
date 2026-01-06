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
const l = ({ intro: e, description: t }) => s(a(r, { children: [e ? i(`blockquote`, { children: e }) : null, t ? i(r, { children: c(t) }) : null] })),
    u = async (r) => {
        let { language: i = `zh` } = r.req.param(),
            a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 30,
            s = `https://${i === `zh` ? `www` : i.replaceAll(/[^\dA-Za-z-]/g, ``)}.zhonglun.com`,
            c = new URL(`research/articles`, s).href,
            { data: u } = await n(c),
            d = o(u),
            f = d(`div#dataList > dl > dd, div#dataList > ul > li`)
                .slice(0, a)
                .toArray()
                .map((e) => {
                    e = d(e);
                    let n = l({ intro: e.find(`p`).text() });
                    return { title: e.find(`h3 > a`).text(), description: n, pubDate: t(e.find(`span`).text()), link: e.find(`h3 > a`).prop(`href`), language: i };
                });
        f = await Promise.all(
            f.map((r) =>
                e.tryGet(r.link, async () => {
                    let { data: e } = await n(r.link),
                        a = o(e),
                        s = a(`div.news_dtitle h2`).text(),
                        c = r.description + l({ description: a(`div.edit_con_original`).html() }),
                        u = a(`img.raw-image`).first().prop(`src`);
                    return (
                        (r.title = s),
                        (r.description = c),
                        (r.pubDate = t(a(`span.posttime`).text())),
                        (r.author = a(`span.author`).text().split(/：/).pop()),
                        (r.content = { html: c, text: a(`div.edit_con_original`).text() }),
                        (r.image = u),
                        (r.banner = u),
                        (r.language = i),
                        r
                    );
                })
            )
        );
        let p = new URL(d(`header.header h1 a img`).prop(`src`), s).href;
        return {
            title: `${d(`title`).text()} - ${d(`div.siteban_text`).text()}`,
            description: d(`meta[name="description"]`).prop(`content`),
            link: c,
            item: f,
            allowEmpty: !0,
            image: p,
            author: d(`meta[name="author"]`).prop(`content`),
            language: i,
        };
    },
    d = {
        path: `/research/article/:language{[a-zA-Z0-9-]+}?`,
        name: `中伦研究专业文章`,
        url: `zhonglun.com`,
        maintainers: [`nczitzk`],
        handler: u,
        example: `/zhonglun/research/article/zh`,
        parameters: { category: `语言，默认为 zh，即简体中文，可在对应分类页 URL 中找到` },
        description: `
| ENG | 简体中文 | 日本語 | 한국어 |
| --- | -------- | ------ | ------ |
| en  | zh       | ja     | kr     |
    `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { title: `专业文章`, source: [`zhonglun.com/research/articles`], target: `/research/article/zh` },
            { title: ` Articles`, source: [`en.zhonglun.com/research/articles`], target: `/research/article/en` },
            { title: `論評`, source: [`ja.zhonglun.com/research/articles`], target: `/research/article/ja` },
            { title: `전문기사`, source: [`kr.zhonglun.com/research/articles`], target: `/research/article/kr` },
        ],
    };
export { u as handler, d as route };
