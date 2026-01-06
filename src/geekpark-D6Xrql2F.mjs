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
const l = ({ images: e, intro: t, description: n }) =>
        s(
            a(r, {
                children: [e?.length ? e.map((e) => (e?.src ? i(`figure`, { children: i(`img`, { src: e.src, alt: e.alt }) }, e.src) : null)) : null, t ? i(`blockquote`, { children: t }) : null, n ? i(r, { children: c(n) }) : null],
            })
        ),
    u = async (r) => {
        let { column: i } = r.req.param(),
            a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 20,
            s = `https://geekpark.net`,
            c = `https://mainssl.geekpark.net`,
            u = new URL(i ? `column/${i}` : ``, s).href,
            d = new URL(i ? `api/v1/columns/${i}` : `api/v2`, c).href,
            { data: f } = await n(d),
            p = (f.homepage_posts ?? f.column.posts).slice(0, a).map((e) => {
                e = e.post ?? e;
                let n = e.title,
                    r = e.cover_url,
                    i = l({ images: r ? [{ src: r, alt: n }] : void 0, intro: e.abstract }),
                    a = `geekpark-${e.id}`;
                return {
                    title: n,
                    description: i,
                    pubDate: t(e.published_timestamp, `X`),
                    link: new URL(`api/v1/posts/${e.id}`, c).href,
                    category: [...new Set([...e.tags, e.column?.title])].filter(Boolean),
                    author: e.authors.map((e) => e.realname ?? e.nickname).join(`/`),
                    guid: a,
                    id: a,
                    content: { html: i, text: e.abstract },
                    image: r,
                    banner: r,
                };
            });
        p = await Promise.all(
            p.map((r) =>
                e.tryGet(r.link, async () => {
                    let { data: e } = await n(r.link),
                        i = e.post,
                        a = i.title,
                        o = i.cover_url,
                        c = l({ images: o ? [{ src: o, alt: a }] : void 0, intro: i.abstract, description: i.content }),
                        u = `geekpark-${i.id}`;
                    return (
                        (r.title = a),
                        (r.description = c),
                        (r.pubDate = t(i.published_timestamp, `X`)),
                        (r.link = new URL(`news/${i.id}`, s).href),
                        (r.category = [...new Set([...i.tags, i.column?.title])].filter(Boolean)),
                        (r.author = i.authors.map((e) => e.realname ?? e.nickname).join(`/`)),
                        (r.guid = u),
                        (r.id = u),
                        (r.content = { html: c, text: i.content }),
                        (r.image = o),
                        (r.banner = o),
                        (r.updated = t(i.updated_at)),
                        r
                    );
                })
            )
        );
        let m = { title: ``, description: ``, link: u, item: p, allowEmpty: !0, image: ``, author: `` };
        if (i) ((m.title = `${f.column.title} | 极客公园`), (m.description = f.column.description), (m.image = f.column.banner_url));
        else {
            let { data: e } = await n(u),
                t = o(e);
            ((m.title = t(`title`).text()),
                (m.description = t(`meta[property="og:description"]`).prop(`content`)),
                (m.image = `https:${t(`meta[name="og:image"]`).prop(`content`)}`),
                (m.author = t(`meta[property="og:site_name"]`).prop(`content`)));
        }
        return m;
    },
    d = {
        path: `/:column?`,
        name: `栏目`,
        url: `geekpark.net`,
        maintainers: [`nczitzk`],
        handler: u,
        example: `/geekpark`,
        parameters: { column: `栏目 id，默认为空，即首页资讯，可在对应栏目页 URL 中找到` },
        description: `::: tip
  若订阅 [综合报道](https://www.geekpark.net/column/179)，网址为 \`https://www.geekpark.net/column/179\`。截取 \`https://www.geekpark.net/column/\` 到末尾的部分 \`179\` 作为参数填入，此时路由为 [\`/geekpark/179\`](https://rsshub.app/geekpark/179)。
:::

| 栏目                                                         | ID                                     |
| ------------------------------------------------------------ | -------------------------------------- |
| [综合报道](https://www.geekpark.net/column/179)              | [179](https://rsshub.app/geekpark/179) |
| [AI新浪潮观察](https://www.geekpark.net/column/304)          | [304](https://rsshub.app/geekpark/304) |
| [新造车观察](https://www.geekpark.net/column/305)            | [305](https://rsshub.app/geekpark/305) |
| [财报解读](https://www.geekpark.net/column/271)              | [271](https://rsshub.app/geekpark/271) |
| [底稿对话CEO系列](https://www.geekpark.net/column/308)       | [308](https://rsshub.app/geekpark/308) |
| [Geek Insight 特稿系列](https://www.geekpark.net/column/306) | [306](https://rsshub.app/geekpark/306) |
| [心科技](https://www.geekpark.net/column/307)                | [307](https://rsshub.app/geekpark/307) |
| [行业资讯](https://www.geekpark.net/column/2)                | [2](https://rsshub.app/geekpark/2)     |
  `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`geekpark.net`], target: `/` },
            {
                source: [`geekpark.net/column/:column?`],
                target: (e) => {
                    let t = e.column;
                    return t ? `/${t}` : ``;
                },
            },
            { title: `综合报道`, source: [`www.geekpark.net/column/179`], target: `/179` },
            { title: `AI新浪潮观察`, source: [`www.geekpark.net/column/304`], target: `/304` },
            { title: `新造车观察`, source: [`www.geekpark.net/column/305`], target: `/305` },
            { title: `财报解读`, source: [`www.geekpark.net/column/271`], target: `/271` },
            { title: `底稿对话CEO系列`, source: [`www.geekpark.net/column/308`], target: `/308` },
            { title: `Geek Insight 特稿系列`, source: [`www.geekpark.net/column/306`], target: `/306` },
            { title: `心科技`, source: [`www.geekpark.net/column/307`], target: `/307` },
            { title: `行业资讯`, source: [`www.geekpark.net/column/2`], target: `/2` },
        ],
    };
export { u as handler, d as route };
