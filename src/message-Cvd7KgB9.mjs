import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = `https://discord.com`,
    l = `${c}/api/v10`,
    u = (t, r) => n.tryGet(`discord:guilds:${t}`, () => e(`${l}/guilds/${t}`, { headers: { authorization: r } })),
    d = (t, r) => n.tryGet(`discord:channels:${t}`, () => e(`${l}/channels/${t}`, { headers: { authorization: r } })),
    f = (r, i, a = 100) => n.tryGet(`discord:channels:${r}:messages`, () => e(`${l}/channels/${r}/messages`, { headers: { authorization: i }, query: { limit: a } }), t.cache.routeExpire, !1),
    p = new Set([`link`, `embed`, `poll`, `file`, `video`, `image`, `sound`, `sticker`, `snapshot`]),
    m = (r, i, a) =>
        n.tryGet(
            `discord:guilds:${r}:search:${JSON.stringify(a)}`,
            () => {
                let t = { ...a, has: a.has?.length ? a.has : void 0 };
                return e(`${l}/guilds/${r}/messages/search`, { headers: { authorization: i }, query: t });
            },
            t.cache.routeExpire,
            !1
        ),
    h = (e) =>
        e
            ? s(
                  e.replaceAll(
                      `
`,
                      `<br>`
                  )
              )
            : null,
    g = ({ message: e, guildInfo: t }) =>
        a(r, {
            children: [
                e.type === 7 ? a(r, { children: [e.author.global_name ?? e.author.username, ` joined `, t.name, `.`, i(`br`, {})] }) : null,
                e.content ? a(r, { children: [h(e.content), i(`br`, {})] }) : null,
                e.attachments?.map((e) => a(r, { children: [i(`img`, { src: e.proxy_url }), i(`br`, {})] })),
                e.sticker_items?.map((e) => {
                    let t = e.format_type < 3 ? `https://cdn.discordapp.com/stickers/${e.id}.png` : e.format_type === 4 ? `https://media.discordapp.net/stickers/${e.id}.gif` : null;
                    return t ? a(r, { children: [i(`img`, { src: t, alt: e.name }), i(`br`, {})] }) : null;
                }),
                e.embeds?.map((e) =>
                    a(r, {
                        children: [
                            e.type === `article`
                                ? a(r, {
                                      children: [
                                          e.url ? a(r, { children: [i(`a`, { href: e.url, children: e.title || e.url }), e.description ? a(r, { children: [i(`br`, {}), h(e.description)] }) : null, i(`br`, {})] }) : null,
                                          e.thumbnail ? i(`img`, { src: e.thumbnail.proxy_url }) : null,
                                      ],
                                  })
                                : null,
                            e.type === `gifv` ? i(`video`, { controls: !0, poster: e.thumbnail?.proxy_url, children: i(`source`, { src: e.video?.proxy_url, type: `video/mp4` }) }) : null,
                            e.type === `image` ? i(`img`, { src: e.thumbnail?.proxy_url }) : null,
                            e.type === `rich`
                                ? a(r, {
                                      children: [
                                          e.author ? a(r, { children: [i(`a`, { href: e.author.url, children: e.author.name }), i(`br`, {})] }) : null,
                                          i(`a`, { href: e.url, children: e.title || e.url }),
                                          e.description ? a(r, { children: [i(`br`, {}), h(e.description)] }) : null,
                                          i(`br`, {}),
                                          e.image ? i(`img`, { src: e.image.proxy_url }) : null,
                                      ],
                                  })
                                : null,
                            e.type === `video`
                                ? a(r, {
                                      children: [
                                          e.url ? a(r, { children: [i(`a`, { href: e.url, children: e.title }), e.description ? a(r, { children: [i(`br`, {}), h(e.description)] }) : null, i(`br`, {})] }) : null,
                                          e.thumbnail ? i(`img`, { src: e.thumbnail.proxy_url }) : null,
                                      ],
                                  })
                                : null,
                            i(`br`, {}),
                        ],
                    })
                ),
            ],
        }),
    _ = (e) => o(i(g, { ...e }));
export { f as a, d as i, p as n, u as o, c as r, m as s, _ as t };
