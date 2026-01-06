import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = (e) => e?.height ?? e?.width ?? e?.alt,
    u = ({ images: e, intro: t, description: n }) =>
        s(
            a(r, {
                children: [e?.length ? e.map((e) => (e?.src ? i(`figure`, { children: i(`img`, { src: e.src, alt: l(e) }) }, e.src) : null)) : null, t ? i(`blockquote`, { children: t }) : null, n ? i(r, { children: c(n) }) : null],
            })
        ),
    d = `wp-json/wp/v2`,
    f = { search: `s` },
    p = { category: `categories`, tag: `tags`, search: void 0 },
    m = new Set([`search`]),
    h = (e, t, n = !1) => {
        let r = (e, i) => {
            let a = Object.keys(e).filter((t) => e[t]?.length > 0 && (n ? Object.hasOwn(p, t) : Object.hasOwn(f, t)));
            if (a.length === 0) return i;
            let o = a[0],
                s = e[o],
                c = { ...e };
            delete c[o];
            let l = b(o, n),
                u = s.map((e) => (Object.hasOwn(e, t) ? e[t] : e));
            return (l && i.append(l, u.join(`,`)), r(c, i));
        };
        return r(e, new URLSearchParams());
    },
    g = async (e, t) => {
        let n = async (e, r) => {
                if (r.length === 0) return [];
                let [i, ...a] = r,
                    o = await y(e, i, t);
                return [...(o?.id && o?.slug ? [{ id: o.id, name: o.name, slug: o.slug }] : []), ...(await n(e, a))];
            },
            r = async (e, t) => {
                let i = Object.keys(e);
                if (i.length === 0) return t;
                let a = i[0],
                    o = e[a],
                    s = { ...e };
                return (delete s[a], r(s, { ...t, [a]: m.has(a) ? o : await n(a, o) }));
            };
        return await r(e, {});
    },
    _ = (e, t, n = new URLSearchParams()) => {
        let r = n.toString();
        return `${t}/${e}${r ? `?${r}` : ``}`;
    },
    v = async (e, n) => {
        let r = async (e) => {
                if (e.length === 0) return;
                let [n, ...i] = e;
                try {
                    let { data: e } = await t.get(n);
                    return e;
                } catch {
                    return r(i);
                }
            },
            i = await r([e, n]);
        if (!i) return {};
        let a = o(i),
            s = a(`title`).first().text(),
            c = new URL(`wp-content/uploads/site_logo.png`, n).href;
        return {
            title: s,
            description: a(`meta[property="og:description"]`).attr(`content`) || a(`meta[name="description"]`).attr(`content`),
            link: e,
            allowEmpty: !0,
            image: c,
            author: a(`meta[property="og:site_name"]`).attr(`content`),
            language: a(`html`).attr(`lang`),
        };
    },
    y = async (e, n, r) => {
        let { data: i } = await t(`${r}/${d}/${b(e, !0)}`, { searchParams: { search: n } });
        return i.length > 0 ? i[0] : void 0;
    },
    b = (e, t = !1) => {
        let n = t ? p : f;
        return Object.hasOwn(n, e) ? (n[e] ?? e) : void 0;
    },
    x = (e) => {
        let t = Object.keys(e).filter((t) => e[t].length > 0 && !Object.hasOwn(f, t));
        if (t.length !== 0) return e[t[0]].map((e) => e.slug).join(`/`);
    },
    S = (e) => {
        let t = (e, n = {}, r) => {
            if (!e) return n;
            let [i, ...a] = e.split(/\/|,/),
                o = Object.hasOwn(p, i),
                s = o ? i : r,
                c = s ? { ...n, [s]: [...(n[s] || []), ...(o ? [] : [i])] } : n;
            return t(a.join(`/`), c, s);
        };
        return t(e, {});
    },
    C = async (r) => {
        let { filter: i } = r.req.param(),
            a = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 40,
            s = `https://the.bi/s`,
            c = S(i),
            l = await g(c, s),
            f = h(c, `name`, !1),
            p = h(l, `id`, !0);
        (p.append(`_embed`, `true`), p.append(`per_page`, String(a)), p.append(`page`, `1`));
        let m = _(`${d}/posts`, s, p),
            y = _(x(l) ?? ``, s, f),
            { data: b } = await t(m),
            C = b.slice(0, a).map((t) => {
                let r = t._embedded[`wp:term`],
                    i = t.guid?.rendered ?? t.guid,
                    a = o(t.content?.rendered ?? t.content),
                    s = a(`a[id='publication']`).text(),
                    c = a(`img#poster`).prop(`data-srcset`);
                a(`figure.graf`).each((e, t) => {
                    t = a(t);
                    let n = t.find(`img`);
                    t.replaceWith(u({ images: n ? [{ src: n.prop(`src`), width: n.prop(`width`), height: n.prop(`height`) }] : void 0 }));
                });
                let l = a(`h1`).text(),
                    d = a(`h2`).text();
                a(`h1`).parent().remove();
                let f = u({ images: c ? [{ src: c }] : void 0, intro: d, description: a.html() });
                return {
                    title: t.title?.rendered ?? t.title ?? l,
                    description: f,
                    pubDate: n(e(t.date_gmt), 0),
                    updated: n(e(t.modified_gmt), 0),
                    link: t.link,
                    category: [...new Set(r.flat().map((e) => e.name))],
                    author: [...t._embedded.author, { name: s }],
                    guid: i,
                    id: i,
                    content: { html: f, text: a.text() },
                };
            });
        return { ...(await v(y, s)), item: C };
    },
    w = {
        path: `/:filter{.+}?`,
        name: `分类`,
        url: `the.bi`,
        maintainers: [`nczitzk`],
        handler: C,
        example: `/the`,
        parameters: { filter: `过滤器，见下方描述` },
        description: `::: tip
  如果你想订阅特定类别或标签，可以在路由中填写 filter 参数。\`/category/rawmw7dsta2jew\` 可以实现订阅 [剩余价值](https://the.bi/s/rawmw7dsta2jew) 类别。此时，路由是 [\`/the/category/rawmw7dsta2jew/\`](https://rsshub.app/the/category/rawmw7dsta2jew).

  你还可以订阅多个类别。\`/category/rawmw7dsta2jew,rawbcvxkktdkq8/\` 可以实现同时订阅 [剩余价值](https://the.bi/s/rawmw7dsta2jew) 和 [打江山](https://the.bi/s/rawbcvxkktdkq8) 两个类别。此时，路由是 [\`/the/category/rawmw7dsta2jew,rawbcvxkktdkq8\`](https://rsshub.app/the/category/rawmw7dsta2jew,rawbcvxkktdkq8).

  类别和标签也可以合并订阅。\`/category/rawmw7dsta2jew/tag/raweekl3na8trq\` 订阅 [剩余价值](https://the.bi/s/rawmw7dsta2jew) 类别和 [动物](https://the.bi/s/raweekl3na8trq) 标签。此时，路由是 [\`/the/category/rawmw7dsta2jew/tag/raweekl3na8trq\`](https://rsshub.app/the/category/rawmw7dsta2jew/tag/raweekl3na8trq).

  你还可以搜索关键字。\`/search/中国\` 搜索关键字 [中国](https://the.bi/s/?s=中国)。在这种情况下，路径是 [\`/the/search/中国\`](https://rsshub.app/the/search/中国).
:::

| 分类                                           | ID                                                               |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| [时局图](https://the.bi/s/rawj7o4ypewv94)      | [rawj7o4ypewv94](https://rsshub.app/the/category/rawj7o4ypewv94) |
| [剩余价值](https://the.bi/s/rawmw7dsta2jew)    | [rawmw7dsta2jew](https://rsshub.app/the/category/rawmw7dsta2jew) |
| [打江山](https://the.bi/s/rawbcvxkktdkq8)      | [rawbcvxkktdkq8](https://rsshub.app/the/category/rawbcvxkktdkq8) |
| [中国经济](https://the.bi/s/raw4krvx85dh27)    | [raw4krvx85dh27](https://rsshub.app/the/category/raw4krvx85dh27) |
| [水深火热](https://the.bi/s/rawtn8jpsc6uvv)    | [rawtn8jpsc6uvv](https://rsshub.app/the/category/rawtn8jpsc6uvv) |
| [东升西降](https://the.bi/s/rawai5kd4z15il)    | [rawai5kd4z15il](https://rsshub.app/the/category/rawai5kd4z15il) |
| [大局 & 大棋](https://the.bi/s/raw2efkzejrsx8) | [raw2efkzejrsx8](https://rsshub.app/the/category/raw2efkzejrsx8) |
| [境外势力](https://the.bi/s/rawmpalhnlphuc)    | [rawmpalhnlphuc](https://rsshub.app/the/category/rawmpalhnlphuc) |
| [副刊](https://the.bi/s/rawxght2jr2u5z)        | [rawxght2jr2u5z](https://rsshub.app/the/category/rawxght2jr2u5z) |
| [天高地厚](https://the.bi/s/rawrsnh9zakqdx)    | [rawrsnh9zakqdx](https://rsshub.app/the/category/rawrsnh9zakqdx) |
| [Oyster](https://the.bi/s/rawdhl9hugdfn9)      | [rawdhl9hugdfn9](https://rsshub.app/the/category/rawdhl9hugdfn9) |
  `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`the.bi/s/:category?`],
                target: (e) => {
                    let t = e.category;
                    return `/the${t ? `/category/${t}` : ``}`;
                },
            },
            { title: `时局图`, source: [`the.bi/s/rawj7o4ypewv94`], target: `/category/rawj7o4ypewv94` },
            { title: `剩余价值`, source: [`the.bi/s/rawmw7dsta2jew`], target: `/category/rawmw7dsta2jew` },
            { title: `打江山`, source: [`the.bi/s/rawbcvxkktdkq8`], target: `/category/rawbcvxkktdkq8` },
            { title: `中国经济`, source: [`the.bi/s/raw4krvx85dh27`], target: `/category/raw4krvx85dh27` },
            { title: `水深火热`, source: [`the.bi/s/rawtn8jpsc6uvv`], target: `/category/rawtn8jpsc6uvv` },
            { title: `东升西降`, source: [`the.bi/s/rawai5kd4z15il`], target: `/category/rawai5kd4z15il` },
            { title: `大局 & 大棋`, source: [`the.bi/s/raw2efkzejrsx8`], target: `/category/raw2efkzejrsx8` },
            { title: `境外势力`, source: [`the.bi/s/rawmpalhnlphuc`], target: `/category/rawmpalhnlphuc` },
            { title: `副刊`, source: [`the.bi/s/rawxght2jr2u5z`], target: `/category/rawxght2jr2u5z` },
            { title: `天高地厚`, source: [`the.bi/s/rawrsnh9zakqdx`], target: `/category/rawrsnh9zakqdx` },
            { title: `Oyster`, source: [`the.bi/s/rawdhl9hugdfn9`], target: `/category/rawdhl9hugdfn9` },
        ],
    };
export { C as handler, w as route };
