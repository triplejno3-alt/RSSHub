import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
        path: `/post/list/:sort?`,
        example: `/bc3ts/post/list`,
        parameters: { sort: '排序方式，`1` 為最新，`2` 為熱門，默认為 `1`' },
        features: { antiCrawler: !0 },
        radar: [{ source: [`web.bc3ts.net`] }],
        name: `動態`,
        maintainers: [`TonyRL`],
        handler: d,
    },
    c = `https://web.bc3ts.net`,
    l = (e) => o(i(u, { media: e })),
    u = ({ media: e }) =>
        a(r, {
            children: [
                i(`br`, {}),
                e.map((e) =>
                    e.type === 0
                        ? i(`img`, { src: e.media_url, alt: e.name })
                        : e.type === 3
                          ? i(`video`, { controls: !0, preload: `metadata`, poster: `https://img.bc3ts.net/video/post/upload/${e.cover}`, children: i(`source`, { src: e.media_url, type: `video/mp4` }) })
                          : null
                ),
            ],
        });
async function d(r) {
    let { sort: i = `1` } = r.req.param(),
        a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 20,
        o = (await e(`https://app.bc3ts.net/post/list/v2`, { headers: { apikey: `zlF+kaPfem%23we$2@90irpE*_RGjdw`, app_version: `3.0.28`, version: `2.0.0`, 'User-Agent': t.trueUA }, query: { limits: a, sort_type: i } })).data.map(
            (e) => ({
                title:
                    e.title ??
                    e.content.split(`
`)[0],
                description:
                    e.content.replaceAll(
                        `
`,
                        `<br>`
                    ) + (e.media.length && l(e.media)),
                link: `${c}/post/${e.id}`,
                author: e.user.name,
                pubDate: n(e.created_time, `x`),
                category: e.group.name,
                upvotes: e.like_count,
                comments: e.comment_count,
            })
        );
    return {
        title: `爆料公社${i === `1` ? `最新` : `熱門`}動態`,
        link: c,
        language: `zh-TW`,
        image: `https://img.bc3ts.net/image/web/main/logo-white-new-2023.png`,
        icon: `https://img.bc3ts.net/image/web/main/logo/logo_icon_6th_2024_192x192.png`,
        item: o,
    };
}
export { s as route };
