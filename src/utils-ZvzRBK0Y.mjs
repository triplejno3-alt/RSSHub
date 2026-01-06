import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = ({ text: e, embed: t }) =>
        a(
            i(n, {
                children: [
                    e ? i(n, { children: [o(e), r(`br`, {})] }) : null,
                    t
                        ? r(n, {
                              children:
                                  t.$type === `app.bsky.embed.images#view`
                                      ? t.images?.map((e) => i(`span`, { children: [r(`img`, { src: e.fullsize, alt: e.alt ?? `` }), r(`br`, {})] }))
                                      : t.$type === `app.bsky.embed.video#view`
                                        ? i(n, {
                                              children: [
                                                  i(`video`, {
                                                      controls: !0,
                                                      poster: t.thumbnail,
                                                      style: `max-width: 100%; height: auto;`,
                                                      preload: `metadata`,
                                                      children: [r(`source`, { src: t.playlist, type: `application/x-mpegURL` }), `Your browser does not support HTML5 video playback.`],
                                                  }),
                                                  r(`br`, {}),
                                              ],
                                          })
                                        : t.$type === `app.bsky.embed.external#view`
                                          ? i(`a`, { href: t.external?.uri, children: [r(`b`, { children: t.external?.title }), r(`br`, {}), t.external?.description] })
                                          : null,
                          })
                        : null,
                ],
            })
        ),
    c = (e, n) =>
        n(`bsky:${e}`, async () => {
            let { data: n } = await t(`https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle`, { searchParams: { handle: e } });
            return n.did;
        }),
    l = (e, n) =>
        n(`bsky:profile:${e}`, async () => {
            let { data: n } = await t(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile`, { searchParams: { actor: e } });
            return n;
        }),
    u = (n, r, i) =>
        i(
            `bsky:authorFeed:${n}:${r}`,
            async () => {
                let { data: e } = await t(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed`, { searchParams: { actor: n, filter: r, limit: 30 } });
                return e;
            },
            e.cache.routeExpire,
            !1
        ),
    d = (n, r) =>
        r(
            `bsky:feed:${n}`,
            async () => {
                let { data: e } = await t(`https://public.api.bsky.app/xrpc/app.bsky.feed.getFeed`, { searchParams: { feed: n, limit: 30 } });
                return e;
            },
            e.cache.routeExpire,
            !1
        ),
    f = (n, r) =>
        r(
            `bsky:feedGenerator:${n}`,
            async () => {
                let { data: e } = await t(`https://public.api.bsky.app/xrpc/app.bsky.feed.getFeedGenerator`, { searchParams: { feed: n } });
                return e;
            },
            e.cache.routeExpire,
            !1
        );
export { c as a, l as i, d as n, s as o, f as r, u as t };
