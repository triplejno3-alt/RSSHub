import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './md5-DQN6cWFb.mjs';
const n = `https://www.showstart.com`,
    r = `秀动网`,
    i = (e = 20) => {
        let t = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz` + Date.now(),
            n = [];
        for (let r = 0; r < e; r++) n.push(t.charAt(Math.floor(Math.random() * t.length)));
        return n.join(``);
    },
    a = new Map([[`token`, i(32).toLowerCase()]]),
    o = { vendorName: ``, deviceMode: ``, deviceName: ``, systemName: ``, systemVersion: ``, cpuMode: ` `, cpuCores: ``, cpuArch: ``, memerySize: ``, diskSize: ``, network: ``, resolution: `1920*1080`, pixelResolution: `` },
    s = async () => {
        let { result: e } = await c(`/waf/gettoken`);
        return (a.set(`accessToken`, e.accessToken.access_token), a.set(`idToken`, e.idToken.id_token), a.get(`accessToken`));
    },
    c = async (n, r = t(Date.now().toString()), s) => {
        let c = i(32) + Date.now();
        return await e(`https://www.showstart.com/api${n}`, {
            method: `POST`,
            headers: {
                cdeviceinfo: encodeURIComponent(JSON.stringify(o)),
                cdeviceno: a.get(`token`),
                cookie: [...a.entries()].map(([e, t]) => `${e}=${t}`).join(`; `),
                crpsign: t(r + `web` + a.get(`token`) + (s ? JSON.stringify(s) : ``) + n + `999web` + c),
                crtraceid: c,
                csappid: `web`,
                cterminal: `web`,
                cusat: r,
                cusid: ``,
                cusit: ``,
                cusname: ``,
                cusut: ``,
                cversion: `999`,
            },
            body: s,
        });
    };
function l(e, t) {
    return e.toSorted((e, n) => (e[t] < n[t] ? -1 : e[t] > n[t] ? 1 : 0));
}
function u(e, t) {
    let n = new Set();
    return e.filter((e) => (n.has(e[t]) ? !1 : (n.add(e[t]), !0)));
}
async function d(e) {
    return ((e.pageNo = e.pageNo || `1`), (e.pageSize = e.pageSize || `30`), (await c(`/web/activity/list`, await s(), e)).result.result.map((e) => _(e)));
}
const f = (e) => (e ? `<img src="${e}" />` : ``),
    p = (e) => (e ? `<p>演出时间：${e}</p>` : ``),
    m = (e, t) => (e || t ? `<p>地址：${[e, t].join(` - `)}</p>` : ``),
    h = (e) => (e ? `<p>艺人：${e}</p>` : ``),
    g = (e) => (e ? `<p>票价：${e}</p>` : ``);
function _(e) {
    return { title: e.title, link: `${n}/event/${e.id}`, description: [f(e.poster), p(e.showTime), m(e.cityName, e.siteName), h(e.performers), g(e.price)].join(``) };
}
async function v(e) {
    return ((e.pageNo = e.pageNo || `1`), (e.pageSize = e.pageSize || `30`), (await c(`/web/performer/list`, await s(), e)).result.result.map((e) => ({ title: e.name, link: `${n}/artist/${e.id}`, description: `id: ${e.id}` })));
}
async function y(e) {
    let t = await c(`/web/performer/info`, await s(), e);
    return { id: e.performerId, name: t.result.name, content: t.result.content, avatar: t.result.avatar, poster: t.result.poster, styles: t.result.styles, activityList: t.result.activities.map((e) => _(e)) };
}
async function b(e) {
    let t = await c(`/web/brand/info`, await s(), e);
    return { id: e.brandId, name: t.result.name, content: t.result.content, avatar: t.result.avatar, poster: t.result.poster, activityList: t.result.activities.map((e) => _(e)) };
}
async function x(e) {
    return (
        (e.pageNo = e.pageNo || `1`),
        (e.pageSize = e.pageSize || `30`),
        (await c(`/web/site/list`, await s(), e)).result.result.map((e) => ({ title: `${e.cityName} - ${e.name}`, link: `${n}/venue/${e.id}`, description: `id: ${e.id}` }))
    );
}
async function S(e) {
    let t = await c(`/web/site/info`, await s(), e);
    return { id: e.siteId, name: `${t.result.cityName} - ${t.result.name}`, address: t.result.address, avatar: t.result.avatar, poster: t.result.poster };
}
async function C(e) {
    return ((e.pageNo = e.pageNo || `1`), (e.pageSize = e.pageSize || `30`), (await c(`/web/brand/list`, await s(), e)).result.result.map((e) => ({ title: e.name, link: `${n}/host/${e.id}`, description: `id: ${e.id}` })));
}
async function w() {
    return c(`/web/activity/list/params`, await s());
}
async function T(e = ``) {
    return l((await w()).result, `cityCode`)
        .filter((t) => t.cityName.includes(e.trim()))
        .map((e) => ({ title: e.cityName, link: `${n}/event/list?cityCode=${e.cityCode}`, description: `cityCode: ${e.cityCode}` }));
}
async function E(e = ``) {
    let t = (await w()).result.flatMap((e) => e.styles);
    return ((t = u(t, `key`)), (t = l(t, `key`)), t.filter((t) => t.showName.includes(e.trim())).map((e) => ({ title: e.showName, link: `${n}/event/list?showStyle=${e.key}`, description: `showStyle: ${e.key}` })));
}
async function D(e, t) {
    let n = (await w()).result.find((t) => String(t.cityCode) === e);
    return n ? { cityName: n.cityName, showName: n.styles.find((e) => String(e.key) === t)?.showName } : {};
}
export { D as a, S as c, n as d, r as f, T as i, x as l, b as n, y as o, C as r, v as s, d as t, E as u };
