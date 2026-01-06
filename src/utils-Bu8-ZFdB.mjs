import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import { t as n } from './md5-DQN6cWFb.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
import c from 'crypto-js';
const l = ({ embed: e, ugc: t, ogv: n, aid: o, cid: c, bvid: l, seasonId: u, episodeId: d, img: f, description: p }) =>
        a(r, {
            children: [
                e
                    ? a(r, {
                          children: [
                              t ? i(`iframe`, { width: `640`, height: `360`, src: `https://www.bilibili.com/blackboard/html5mobileplayer.html?aid=${o}&cid=${c}&bvid=${l}`, frameborder: `0`, allowfullscreen: !0 }) : null,
                              n ? i(`iframe`, { width: `640`, height: `360`, src: `https://www.bilibili.com/blackboard/html5mobileplayer.html?seasonId=${u}&episodeId=${d}`, frameborder: `0`, allowfullscreen: !0 }) : null,
                              i(`br`, {}),
                          ],
                      })
                    : null,
                f ? a(r, { children: [i(`img`, { src: f }), i(`br`, {})] }) : null,
                p ? s(p) : null,
            ],
        }),
    u = (e) => o(i(l, { ...e }));
function d(e) {
    let t = ``;
    for (let n = 0; n < e; n++) t += f(16 * Math.random());
    return p(t, e);
}
function f(e) {
    return Math.ceil(e).toString(16).toUpperCase();
}
function p(e, t) {
    let n = ``;
    if (e.length < t) for (let r = 0; r < t - e.length; r++) n += `0`;
    return n + e;
}
function m() {
    let e = Date.now().toString(16).toUpperCase();
    return d(8) + `_` + e;
}
function h() {
    let e = d(8),
        t = d(4),
        n = d(4),
        r = d(4),
        i = d(12),
        a = Date.now();
    return e + `-` + t + `-` + n + `-` + r + `-` + i + p((a % 1e5).toString(), 5) + `infoc`;
}
function g(e) {
    let t = ``;
    for (let n = 0; n < e.length; n++) t += String.fromCharCode(e.charCodeAt(n) - 1);
    return t;
}
function _(e) {
    let t = c.HmacSHA256(`ts${e}`, g(`YhxToH[2q`));
    return c.enc.Hex.stringify(t);
}
function v(e, t) {
    return `${e}&w_webid=${encodeURIComponent(t)}`;
}
function y(e, t) {
    let r = new URLSearchParams(e);
    r.sort();
    let i = r.toString(),
        a = Math.round(Date.now() / 1e3);
    return `${e}&w_rid=${n(`${i}&wts=${a}${t}`)}&wts=${a}`;
}
function b(e, t) {
    let n = Math.PI * 2,
        r = Math.random(),
        i = Math.random(),
        a = Math.sqrt(-2 * Math.log(r)) * Math.cos(n * i);
    return Math.round(a * t + e);
}
function x() {
    if (t.bilibili.dmImgList !== void 0) {
        let e = JSON.parse(t.bilibili.dmImgList);
        return JSON.stringify([e[Math.floor(Math.random() * e.length)]]);
    }
    let e = Math.max(b(1245, 5), 0),
        n = Math.max(b(1285, 5), 0),
        r = [{ x: 3 * e + 2 * n, y: 4 * e - 5 * n, z: 0, timestamp: Math.max(b(30, 5), 0), type: 0 }];
    return JSON.stringify(r);
}
function S() {
    if (t.bilibili.dmImgInter !== void 0) {
        let e = JSON.parse(t.bilibili.dmImgInter);
        return JSON.stringify([e[Math.floor(Math.random() * e.length)]]);
    }
    let e = E(274, 601),
        n = T(134, 30),
        r = E(332, 64),
        i = T(1101, 338),
        a = T(0, 0),
        o = E(1245, 1285),
        s = [
            { t: C(`div`), c: w(`clearfix g-search search-container`), p: [e[0], e[2], e[1]], s: [n[2], n[0], n[1]] },
            { t: C(`div`), c: w(`wrapper`), p: [r[0], r[2], r[1]], s: [i[2], i[0], i[1]] },
        ];
    return JSON.stringify({ ds: s, wh: o, of: a });
}
function C(e) {
    return {
        a: 4,
        article: 29,
        button: 7,
        div: 2,
        em: 27,
        form: 17,
        h1: 11,
        h2: 12,
        h3: 13,
        h4: 14,
        h5: 15,
        h6: 16,
        img: 5,
        input: 6,
        label: 25,
        li: 10,
        ol: 9,
        option: 20,
        p: 3,
        section: 28,
        select: 19,
        span: 1,
        strong: 26,
        table: 21,
        td: 23,
        textarea: 18,
        th: 24,
        tr: 22,
        ul: 8,
    }[e];
}
function w(e) {
    return Buffer.from(e).toString(`base64`).slice(0, -2);
}
function T(e, t) {
    let n = Math.floor(514 * Math.random());
    return [3 * e + 2 * t + n, 4 * e - 4 * t + 2 * n, n];
}
function E(e, t) {
    let n = Math.floor(114 * Math.random());
    return [2 * e + 2 * t + 3 * n, 4 * e - t + n, n];
}
function D(e, t) {
    return `${e}&dm_img_list=${t}&dm_img_str=${Buffer.from(`no webgl`).toString(`base64`).slice(0, -2)}&dm_cover_img_str=${Buffer.from(`no webgl`).toString(`base64`).slice(0, -2)}`;
}
function O(e, t, n) {
    return `${D(e, t)}&dm_img_inter=${n}`;
}
const k = (n, r) =>
        r.tryGet(
            `bilibili:getBangumi:${n}`,
            async () => {
                let t = await e(`https://api.bilibili.com/pgc/view/web/media`, { query: { media_id: n } });
                return (t.result.share_url === void 0 && (t.result.share_url = `https://www.bilibili.com/bangumi/media/md${t.result.media_id}`), t.result);
            },
            t.cache.routeExpire,
            !1
        ),
    A = (n, r) => r.tryGet(`bilibili:getBangumiItems:${n}`, async () => (await e(`https://api.bilibili.com/pgc/web/season/section`, { query: { season_id: n } })).result, t.cache.routeExpire, !1),
    j = (e, t, n, r, i, a) => u({ embed: e, ugc: !0, aid: r, cid: i, bvid: a, img: t.replace(`http://`, `https://`), description: n }),
    M = (e, t, n, r, i) => u({ embed: e, ogv: !0, seasonId: r, episodeId: i, img: t.replace(`http://`, `https://`), description: n });
function N(e) {
    return e ? `https://www.bilibili.com/blackboard/newplayer.html?isOutside=true&autoplay=true&danmaku=true&muted=false&highQuality=true&bvid=${e}` : void 0;
}
const P = (e) => (e ? `https://www.bilibili.com/blackboard/live/live-activity-player.html?cid=${e}` : void 0);
var F = {
    lsid: m,
    _uuid: h,
    hexsign: _,
    addWbiVerifyInfo: y,
    getDmImgList: x,
    getDmImgInter: S,
    addDmVerifyInfo: D,
    addDmVerifyInfoWithInter: O,
    bvidTime: 1589990400,
    addRenderData: v,
    getBangumi: k,
    getBangumiItems: A,
    renderUGCDescription: j,
    renderOGVDescription: M,
    getVideoUrl: N,
};
export { N as n, F as r, P as t };
