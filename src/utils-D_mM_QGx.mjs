import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = [`misskey.io`, `madost.one`, `mk.nixnet.social`],
    c = ({ reply: e, text: t, files: n }) =>
        o(
            a(r, {
                children: [
                    e ? i(`blockquote`, { children: i(`p`, { children: e.text }) }) : null,
                    t
                        ? i(`p`, {
                              children: t.replaceAll(
                                  `
`,
                                  `<br>`
                              ),
                          })
                        : null,
                    (n ?? []).map((e) =>
                        a(r, {
                            children: [
                                i(`br`, {}),
                                e.type.includes(`image`)
                                    ? i(`img`, { src: e.url })
                                    : e.type.includes(`video`)
                                      ? i(`video`, { controls: !0, poster: e.thumbnailUrl, children: i(`source`, { src: e.url, type: e.type }) })
                                      : e.type.includes(`audio`)
                                        ? i(`audio`, { controls: !0, children: i(`source`, { src: e.url, type: e.type }) })
                                        : i(`a`, { href: e.url, target: `_blank`, children: e.name }),
                                e.comment ? i(`p`, { children: e.comment }) : null,
                            ],
                        })
                    ),
                ],
            })
        ),
    l = (e, n, r = !1) =>
        e.map((e) => {
            let i = e.renote && Object.keys(e.renote).length > 0,
                a = e.reply && Object.keys(e.reply).length > 0,
                o = i ? e.renote : e,
                l = o.user.host ?? n,
                u = r ? String(o.user.name) : `${o.user.name} (${o.user.username}@${l})`,
                d = c({ text: o.text, files: o.files, reply: e.reply }),
                f = ``;
            if (a && e.reply) {
                let t = e.reply.user.host ?? n;
                f = `Reply to ${r ? e.reply.user.name : `${e.reply.user.name} (${e.reply.user.username}@${t})`}: "${o.text ?? ``}"`;
            } else f = i ? `Renote: ${u}: "${o.text ?? ``}"` : `${u}: "${o.text ?? ``}"`;
            let p = o.id;
            if (i) {
                let t = e.user.host ?? n,
                    r = o.user.host ?? n;
                (t !== r || !s.includes(r)) && (p = e.id);
            }
            let m = `https://${l}/notes/${p}`,
                h = t(o.createdAt);
            return { title: f, description: d, pubDate: h, link: m, author: u };
        });
async function u(t, r, { withRenotes: i = !1, mediaOnly: a = !1 }) {
    let o = `https://${r}/api/users/search-by-username-and-host`,
        s = `misskey_username/${r}/${t}`,
        c = await e.tryGet(s, async () => {
            let e = (await n({ method: `post`, url: o, json: { username: t, host: r, detail: !0, limit: 1 } })).data.find((e) => e.username === t);
            if (!e) throw Error(`username ${t} not found`);
            return e;
        }),
        l = c.id,
        u = c.avatarUrl;
    return {
        site: r,
        accountId: l,
        accountData: (await n({ method: `post`, url: `https://${r}/api/users/notes`, json: { userId: l, withChannelNotes: !0, withRenotes: i, withReplies: !a, withFiles: a, limit: 10, offset: 0 } })).data,
        avatarUrl: u,
    };
}
var d = { parseNotes: l, getUserTimelineByUsername: u, allowSiteList: s };
export { d as t };
