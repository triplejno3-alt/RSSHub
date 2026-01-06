import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './md5-DQN6cWFb.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { FetchError as a } from 'ofetch';
var o = {
    API: {
        BASE: `https://api.mangadex.org`,
        MANGA_META: `https://api.mangadex.org/manga/`,
        MANGA_CHAPTERS: `https://mangadex.org/chapter/`,
        COVERS: `https://api.mangadex.org/cover/`,
        COVER_IMAGE: `https://uploads.mangadex.org/covers/`,
        READING_STATUSES: `https://api.mangadex.org/manga/status`,
        TOKEN: `https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token`,
        SETTING: `https://api.mangadex.org/settings`,
    },
    TOKEN_EXPIRE: 890,
};
const s = () => {
        if (!e.mangadex.clientId || !e.mangadex.clientSecret) throw new i(`Cannot get access token since MangaDex client ID or secret is not set.`);
        return t.tryGet(
            `mangadex:access-token`,
            async () => {
                if (!e.mangadex.refreshToken) return c();
                try {
                    return await l();
                } catch (e) {
                    if (e instanceof a && e.statusCode === 400) return c();
                    throw e;
                }
            },
            o.TOKEN_EXPIRE,
            !1
        );
    },
    c = async () => {
        if (!e.mangadex.clientId || !e.mangadex.clientSecret) throw new i(`Cannot get access token since MangaDex client ID or secret is not set.`);
        if (!e.mangadex.username || !e.mangadex.password) throw new i(`Cannot get refresh token since MangaDex username or password is not set`);
        let t = await r.post(o.API.TOKEN, {
                headers: { 'User-Agent': e.trueUA },
                form: { grant_type: `password`, username: e.mangadex.username, password: e.mangadex.password, client_id: e.mangadex.clientId, client_secret: e.mangadex.clientSecret },
            }),
            n = t?.data?.refresh_token,
            a = t?.data?.access_token;
        if (!n || !a) throw Error(`Failed to retrieve refresh token from MangaDex API.`);
        return ((e.mangadex.refreshToken = n), a);
    },
    l = async () => {
        if (!e.mangadex.clientId || !e.mangadex.clientSecret) throw new i(`Cannot get access token since MangaDex client ID or secret is not set.`);
        if (!e.mangadex.refreshToken) throw new i(`Cannot get access token since MangaDex refresh token is not set.`);
        let t = (
            await r.post(o.API.TOKEN, { headers: { 'User-Agent': e.trueUA }, form: { grant_type: `refresh_token`, refresh_token: e.mangadex.refreshToken, client_id: e.mangadex.clientId, client_secret: e.mangadex.clientSecret } })
        )?.data?.access_token;
        if (!t) throw Error(`Failed to retrieve access token from MangaDex API.`);
        return t;
    };
var u = s;
const d = async () => {
        let n = await u();
        return t.tryGet(
            `mangadex:settings`,
            async () => {
                let t = (await r.get(o.API.SETTING, { headers: { Authorization: `Bearer ${n}`, 'User-Agent': e.trueUA } }))?.data?.settings;
                if (!t) throw Error(`Failed to retrieve user settings from MangaDex API.`);
                return t;
            },
            e.cache.contentExpire,
            !1
        );
    },
    f = async (e = !0) => {
        try {
            return (await d()).userPreferences.filteredLanguages;
        } catch (t) {
            if (e && t instanceof i) return [];
            throw t;
        }
    },
    p = (e, t) => {
        for (let n of t) {
            let t = e instanceof Map ? e.get(n) : e[n];
            if (t) return t;
        }
        return Object.values(e)[0];
    };
function m(e) {
    let t = [];
    for (let [n, r] of Object.entries(e))
        if (typeof r == `object` && !Array.isArray(r) && !(r instanceof Set))
            for (let [e, i] of Object.entries(r)) (typeof i == `string` || typeof i == `number` || typeof i == `boolean`) && t.push(`${encodeURIComponent(n)}[${encodeURIComponent(e)}]=${encodeURIComponent(i)}`);
        else if (Array.isArray(r) || r instanceof Set) for (let e of r) t.push(`${encodeURIComponent(n)}[]=${encodeURIComponent(e)}`);
        else t.push(`${encodeURIComponent(n)}=${encodeURIComponent(r)}`);
    return t.length === 0 ? `` : `?` + t.join(`&`);
}
const h = async (e, n = !0, i) => {
    let a = n ? [`cover_art`] : [],
        s = await t.tryGet(`mangadex:manga-meta:${e}`, async () => {
            let { data: t } = await r.get(`${o.API.MANGA_META}${e}${m({ includes: a })}`);
            if (t.result === `error`) throw Error(t.errors[0].detail);
            return t.data;
        }),
        c = s.relationships || [],
        l = [...(typeof i == `string` ? [i] : i || []), ...(await f()), s.attributes.originalLanguage].filter(Boolean),
        u = p({ ...s.attributes.title, ...Object.fromEntries(s.attributes.altTitles.flatMap((e) => Object.entries(e))) }, l),
        d = p(s.attributes.description, l);
    if (!n) return { title: u, description: d };
    let h = c.find((e) => e.type === `cover_art`)?.attributes.fileName + `.512.jpg`;
    return { title: u, description: d, cover: `${o.API.COVER_IMAGE}${e}/${h}` };
};
async function g(e, i = !0, a) {
    let s = [...new Set(e)].sort(),
        c = i ? [`cover_art`] : [],
        l = await t.tryGet(`mangadex:manga-meta:${n(s.join(``))}`, async () => {
            let { data: e } = await r.get(o.API.MANGA_META.slice(0, -1) + m({ ids: s, includes: c, limit: s.length }));
            if (e.result === `error`) throw Error(`Failed to retrieve manga meta from MangaDex API.`);
            return e.data;
        }),
        u = [...(typeof a == `string` ? [a] : a || []), ...(await f())].filter(Boolean),
        d = new Map();
    for (let e of l) {
        let t = e.id,
            n = p({ ...e.attributes.title, ...Object.fromEntries(e.attributes.altTitles.flatMap((e) => Object.entries(e))) }, [...u, e.attributes.originalLanguage]),
            r = p(e.attributes.description, u),
            a,
            s = { id: t, title: n, description: r, cover: a };
        if (i) {
            let t = e.relationships.find((e) => e.type === `cover_art`)?.attributes.fileName;
            t && ((a = `${o.API.COVER_IMAGE}${e.id}/${t}.512.jpg`), (s = { ...s, cover: a }));
        }
        d.set(t, s);
    }
    return d;
}
const _ = async (n, i, a) => {
        let s = new Set([...(typeof i == `string` ? [i] : i || []), ...(await f())].filter(Boolean)),
            c = `${o.API.MANGA_META}${n}/feed${m({ order: { publishAt: `desc` }, limit: a || 100, translatedLanguage: s })}`,
            l = await t.tryGet(
                `mangadex:manga-chapters:${n}`,
                async () => {
                    let { data: e } = await r.get(c);
                    if (e.result === `error`) throw Error(e.errors[0].detail);
                    return e.data;
                },
                e.cache.routeExpire,
                !1
            );
        return l
            ? l.map((e) => ({
                  title: [e.attributes.volume ? `Vol. ${e.attributes.volume}` : null, e.attributes.chapter ? `Ch. ${e.attributes.chapter}` : null, e.attributes.title].filter(Boolean).join(` `),
                  link: `${o.API.MANGA_CHAPTERS}${e.id}`,
                  pubDate: new Date(e.attributes.publishAt),
              }))
            : [];
    },
    v = async (e, t = !0, n) => {
        let [r, i] = await Promise.all([h(e, t, n), _(e, n)]);
        return { ...r, chapters: i };
    };
export { f as a, m as i, v as n, u as o, g as r, o as s, _ as t };
