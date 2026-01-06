import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { n as r, t as i } from './utils-7XZqFwHy.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import c from 'dayjs';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = (e, t, n) =>
        l(
            s(a, {
                children: [
                    e.visit_amount,
                    `阅读 `,
                    e.note_amount,
                    `条笔记 创建于`,
                    t,
                    o(`br`, {}),
                    n.map((e) =>
                        s(a, {
                            children: [
                                (e.struct?.items ?? []).map((e) =>
                                    e.type === `text` || e.type === `link`
                                        ? o(`span`, {
                                              children: u(
                                                  (e.content ?? ``).replaceAll(
                                                      `
`,
                                                      `<br>`
                                                  )
                                              ),
                                          })
                                        : e.type === `url`
                                          ? o(`a`, { href: e.url, children: e.content })
                                          : null
                                ),
                                o(`br`, {}),
                                c(e.publish_time_timestamp, `X`).format(`YYYY-MM-DD HH:mm:ss`),
                                o(`hr`, {}),
                            ],
                        })
                    ),
                ],
            })
        ),
    f = {
        path: `/posts/:author`,
        categories: [`new-media`],
        example: `/zhiy/posts/long`,
        parameters: { author: `作者 ID，可在URL中找到` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`zhiy.cc/:author`] }],
        name: `笔记`,
        maintainers: [`TonyRL`],
        handler: p,
    };
async function p(a) {
    let o = a.req.param(`author`),
        { author_id: s, author_name: l, author_signature: u, author_avatar_url: f } = await r(o),
        {
            data: { result: p },
        } = await n(`${i}/api/app/share/garden/users/${s}/posts`, { searchParams: { page: 1, limit: a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`)) : 100 } }),
        m = p.map((e) => ({ title: e.title, pubDate: t(e.create_time, `X`), link: `${i}/b${e.share_md5}`, guid: `${i}/b${e.share_md5}:${e.link_amount}:${e.note_amount}`, postId: e.id, shareMD5: e.share_md5 })),
        h = await Promise.all(
            m.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(`${i}/api/app/share/posts/${t.shareMD5}`),
                        {
                            data: { result: r },
                        } = await n(`${i}/api/app/share/posts/${t.postId}/notes`, { searchParams: { page: 1, limit: 100 } });
                    return ((t.description = d(e, c(e.create_time, `X`).format(`YYYY-MM-DD HH:mm:ss`), r)), t);
                })
            )
        );
    return { title: l, link: `${i}/${o}`, description: u, image: f, item: h };
}
export { f as route };
