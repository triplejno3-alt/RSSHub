import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = `https://skeb.jp`;
function c(e) {
    if (!e || typeof e != `object` || e.private === !0) return null;
    let t = o(i(f, { imageUrl: e.thumbnail_image_urls?.srcset?.split(`,`).pop()?.trim().split(` `)[0] || ``, body: e.body || ``, audioUrl: e.genre === `music` || e.genre === `voice` ? e.preview_url : null }));
    return { title: e.path || ``, link: `${s}${e.path || ``}`, description: t };
}
const l = { art: `Illust`, voice: `Voice`, novel: `Novel`, video: `Video`, music: `Music`, correction: `Advice`, comic: `Comic` };
function u(e) {
    if (!e || typeof e != `object`) return null;
    let t = e.avatar_url || ``,
        n;
    if (e.creator) {
        let r = e.acceptable ? `Yes` : `No`,
            a = e.nsfw_acceptable ? `Yes` : `No`,
            s = ``;
        (Array.isArray(e.skills) &&
            e.skills.length > 0 &&
            (s = e.skills
                .map((e) => l[e.genre] || e.genre)
                .filter(Boolean)
                .join(`, `)),
            (n = o(i(p, { avatarUrl: t, acceptingCommissions: r, nsfwAcceptable: a, skills: s }))));
    }
    return { title: e.name || ``, link: `${s}/@${e.screen_name || ``}`, description: n };
}
async function d(r, i) {
    let a = `${s}/api/users/${r.replace(`@`, ``)}/followings`,
        o = await n.tryGet(`skeb:followings_data:${r}`, async () => await e(a, { headers: { Authorization: `Bearer ${t.skeb.bearerToken}` } }), t.cache.routeExpire, !1);
    if (!o || typeof o != `object`) throw Error(`Failed to fetch followings data`);
    return i === `following_creators` ? o[i].map((e) => u(e)).filter(Boolean) : o[i].map((e) => c(e)).filter(Boolean);
}
const f = ({ imageUrl: e, body: t, audioUrl: n }) =>
        a(r, {
            children: [
                e ? a(r, { children: [i(`img`, { src: e }), i(`br`, {})] }) : null,
                n ? a(r, { children: [a(`audio`, { controls: !0, children: [i(`source`, { src: n, type: `audio/mp3` }), `Your browser does not support the audio element.`] }), i(`br`, {})] }) : null,
                t,
            ],
        }),
    p = ({ avatarUrl: e, acceptingCommissions: t, nsfwAcceptable: n, skills: o }) =>
        a(r, { children: [e ? i(`img`, { src: e }) : null, a(`p`, { children: [`委託狀況（Accepting Commissions）：`, t] }), a(`p`, { children: [`NSFW：`, n] }), o ? a(`p`, { children: [`類型（Genre）：`, o] }) : null] });
export { c as i, d as n, u as r, s as t };
