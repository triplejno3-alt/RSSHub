import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { jsx as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
import i from '@bbob/html';
import a from '@bbob/preset-html5';
const o = `https://instant.1point3acres.com`,
    s = `https://api.1point3acres.com`,
    c = { new: `最新帖子`, hot: `热门帖子` },
    l = (e) =>
        e.walk((e) =>
            typeof e == `string` &&
            e ===
                `
`
                ? { tag: `br`, content: null }
                : e
        ),
    u = async (n, r, c) => {
        let u = await t({ method: `get`, url: r, headers: { referer: o } });
        return await Promise.all(
            u.data.threads.map((r) => {
                let u = {
                    guid: r.tid,
                    title: r.subject,
                    author: r.author,
                    link: `${o}/thread/${r.tid}`,
                    description: r.summary,
                    pubDate: e((c === `` ? r.lastpost : r.dateline) * 1e3),
                    category: [r.forum_name, ...(r.tags ? r.tags.map((e) => e.displayname) : [])],
                };
                return n(u.link, async () => {
                    try {
                        let e = (await t({ method: `get`, url: `${s}/api/v3/threads/${u.guid}`, headers: { referer: o } })).data.thread,
                            n = a.extend((t) => ({
                                ...t,
                                attach: (t, { render: n }) => {
                                    let r = n(t.content),
                                        i = e.attachment_list.find((e) => e.aid === Number.parseInt(r));
                                    return i.isimage
                                        ? { tag: `img`, attrs: { src: i.url } }
                                        : {
                                              tag: `a`,
                                              attrs: { href: `https://www.1point3acres.com/bbs/plugin.php?id=attachcenter:page&aid=${r}`, rel: `noopener`, target: `_blank` },
                                              content: `https://www.1point3acres.com/bbs/plugin.php?id=attachcenter:page&aid=${r}`,
                                          };
                                },
                                url: (e) => {
                                    let t = Object.keys(e.attrs)[0];
                                    return t.startsWith(`https://link.1p3a.com/?url=`)
                                        ? { tag: `a`, attrs: { href: decodeURIComponent(t.replace(`https://link.1p3a.com/?url=`, ``)), rel: `noopener`, target: `_blank` }, content: e.content }
                                        : { tag: `a`, attrs: { href: t, rel: `noopener`, target: `_blank` }, content: e.content };
                                },
                            }));
                        if (((u.description = i(e.message_bbcode, [n(), l])), !e.message_bbcode.includes(`[attach]`) && e.attachment_list.length > 0))
                            for (let t of e.attachment_list) u.description += t.isimage === 1 ? `<br>` + d(t.url, t.height, t.width) : ``;
                    } catch {}
                    return u;
                });
            })
        );
    },
    d = (e, t, i) => r(n(`img`, { src: e, height: t, width: i }));
export { c as i, s as n, o as r, u as t };
