import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = ({ images: e, audios: t, videos: a, intro: o, description: c }) =>
        i(n, {
            children: [
                e?.map((e, t) => (e?.src ? r(`figure`, { children: r(`img`, { src: e.src, alt: e.alt, width: e.width, height: e.height }) }, `${e.src}-${t}`) : null)),
                t?.map((e, t) => (e?.src ? i(`audio`, { controls: !0, children: [r(`source`, { src: e.src, type: e.type }), r(`object`, { data: e.src, children: r(`embed`, { src: e.src }) })] }, `${e.src}-${t}`) : null)),
                a?.map((e, t) =>
                    e?.src
                        ? e?.type?.endsWith(`taptap`)
                            ? r(`iframe`, { src: e.src, frameborder: `0`, allowfullscreen: !0 }, `${e.src}-${t}`)
                            : i(`video`, { controls: !0, children: [r(`source`, { src: e.src, type: e.type }), r(`object`, { data: e.src, children: r(`embed`, { src: e.src }) })] }, `${e.src}-${t}`)
                        : null
                ),
                o ? r(`blockquote`, { children: o }) : null,
                c ? r(n, { children: s(c) }) : null,
            ],
        }),
    l = (e) => o(r(c, { ...e })),
    u = `https://image.gcores.com`,
    d = { BOLD: { fontWeight: `bold` }, CODE: { fontFamily: `monospace`, wordWrap: `break-word` }, ITALIC: { fontStyle: `italic` }, STRIKETHROUGH: { textDecoration: `line-through` }, UNDERLINE: { textDecoration: `underline` } },
    f = {
        'header-one': { element: `h1` },
        'header-two': { element: `h2` },
        'header-three': { element: `h3` },
        'header-four': { element: `h4` },
        'header-five': { element: `h5` },
        'header-six': { element: `h6` },
        'unordered-list-item': { element: `li`, parentElement: `ul` },
        'ordered-list-item': { element: `li`, parentElement: `ol` },
        blockquote: { element: `blockquote` },
        atomic: { element: void 0 },
        'code-block': { element: `pre` },
        unstyled: { element: `p` },
    },
    p = (e, t) =>
        `<span style="${Object.entries(t)
            .map(([e, t]) => `${e.replaceAll(/([A-Z])/g, `-$1`).toLowerCase()}: ${t}`)
            .join(`; `)}">${e}</span>`,
    m = (e, t) => {
        switch (e.type) {
            case `EMBED`:
                return e.data.content.startsWith(`http`) ? `<a href="${e.data.content}" target="_blank">${e.data.content}</a>` : e.data.content;
            case `IMAGE`:
                return l({ images: e.data.path ? [{ src: new URL(e.data.path, u).href, alt: e.data.caption, width: e.data.width, height: e.data.height }] : void 0 }).replaceAll(
                    `
`,
                    ``
                );
            case `GALLERY`:
                return !e.data.images || !Array.isArray(e.data.images)
                    ? ``
                    : l({ images: e.data.images.map((t) => ({ src: new URL(t.path, u).href, alt: t.caption ?? e.data.caption, width: t.width, height: t.height })) }).replaceAll(
                          `
`,
                          ``
                      );
            case `LINK`:
                return `<a href="${e.data.url}" target="_blank">${t}</a>`;
            case `WIDGET`:
                return `<a href="${e.data.url}" target="_blank">${e.data.title}</a>`;
            default:
                return ``;
        }
    },
    h = (e, t) => {
        let n = f[e.type];
        if (!n) return ``;
        let { text: r, inlineStyleRanges: i, entityRanges: a } = e,
            o = [];
        for (let e of i) o.push({ ...e, styles: [d[e.style]], entity: null });
        for (let e of a) o.push({ ...e, styles: [], entity: t[e.key] });
        o.sort((e, t) => e.offset - t.offset);
        let s = new Map(),
            c = [];
        for (let e of o) {
            let t = `${e.offset}-${e.length}`,
                n = s.get(t);
            (n || ((n = { offset: e.offset, length: e.length, styles: [], entities: [] }), s.set(t, n), c.push(n)), e.styles.length > 0 && n.styles.push(...e.styles), e.entity && n.entities.push(e.entity));
        }
        let l = [],
            u = 0;
        for (let e of c) {
            l.push(r.substring(u, e.offset));
            let t = r.substring(e.offset, e.offset + e.length);
            if (e.styles.length > 0) {
                let n = {};
                for (let t of e.styles) for (let [e, r] of Object.entries(t)) n[e] = r;
                t = p(t, n);
            }
            if (e.entities.length > 0) for (let n of e.entities) t = m(n, t);
            (l.push(t), (u = e.offset + e.length));
        }
        return (
            l.push(r.slice(u)),
            `${n.element ? `<${n.element}>` : ``}${l.join(``).replaceAll(
                `
`,
                `<br>`
            )}${n.element ? `</${n.element}>` : ``}`
        );
    },
    g = (e) => {
        let { blocks: t, entityMap: n } = e;
        if (!t || t.length === 0) return ``;
        let r = [],
            i,
            a = [];
        for (let e of t) {
            let t = f[e.type];
            if (!t) continue;
            let o = h(e, n);
            t.parentElement ? (i === t.parentElement ? a.push(o) : (i && r.push(`<${i}>${a.join(``)}</${i}>`), (i = t.parentElement), (a = [o]))) : (i && (r.push(`<${i}>${a.join(``)}</${i}>`), (i = void 0), (a = [])), r.push(o));
        }
        return (i && r.push(`<${i}>${a.join(``)}</${i}>`), r.join(``));
    },
    _ = `https://www.gcores.com`,
    v = `https://image.gcores.com`,
    y = new Set([`radios`, `articles`, `news`, `videos`, `talks`]),
    b = async (n, r, i, o) => {
        let s = await e(i, { query: r ?? { 'page[limit]': n, sort: `-published-at`, include: `category,user,media`, 'filter[list-all]': 1 } }),
            c = a(await e(o)),
            u = c(`html`).attr(`lang`) ?? `zh-CN`,
            d = s.included,
            f = [...s.data, ...d].filter((e) => y.has(e.type)),
            p = [];
        p = f?.slice(0, n).map((e) => {
            let n = e.attributes,
                r = e.relationships,
                i = n.title,
                a = n[`published-at`],
                o = `${e.type}/${e.id}`,
                s = [r?.category?.data, r?.tag?.data, r?.topic?.data]
                    .filter(Boolean)
                    .map((e) => {
                        let t = d.find((t) => t.type === e.type && t.id === e.id)?.attributes;
                        return t?.name ?? t?.title;
                    })
                    .filter(Boolean),
                f = r?.user?.data,
                p = f ? d.find((e) => e.type === f.type && e.id === f.id) : void 0,
                m = p ? [{ name: p.attributes?.nickname, url: p.id ? new URL(`${f.type}/${p.id}`, _).href : void 0, avatar: p.thumb ? new URL(p.thumb, v).href : void 0 }] : void 0,
                h = `gcores-${e.id}`,
                y = (n.cover ?? n.thumb) ? new URL(n.cover ?? n.thumb, v).href : void 0,
                b = a,
                x = { title: i, pubDate: a ? t(a) : void 0, link: new URL(o, _).href, category: s, author: m, guid: h, id: h, image: y, banner: y, updated: b ? t(b) : void 0, language: u },
                S,
                C,
                w = d.find((e) => e.id === r.media?.data?.id)?.attributes;
            if (
                (n[`speech-path`]
                    ? ((S = new URL(`uploads/audio/${n[`speech-path`]}`, `https://alioss.gcores.com`).href), (C = `audio/${S?.split(/\./).pop()}`))
                    : w &&
                      (w.audio
                          ? ((S = w.audio), (C = `audio/${S?.split(/\./).pop()}`))
                          : w[`original-src`] && ((S = w[`original-src`]), (C = `video/${S?.split(/\?/).pop() ? (/^id=\d+$/.test(S?.split(/\?/).pop()) ? `taptap` : S?.split(/\./).pop()) : ``}`))),
                S)
            ) {
                let e = n.duration ? Number(n.duration) : 0;
                x = { ...x, enclosure_url: S, enclosure_type: C, enclosure_title: i, enclosure_length: e, itunes_duration: e, itunes_item_image: y };
            }
            let T = l({
                images: n.cover ? [{ src: new URL(n.cover, v).href, alt: i }] : void 0,
                audios: C?.startsWith(`audio`) && S ? [{ src: S, type: C }] : void 0,
                videos: C?.startsWith(`video`) && S ? [{ src: S, type: C }] : void 0,
                intro: n.desc || n.excerpt,
                description: n.content ? g(JSON.parse(n.content)) : void 0,
            });
            return ((x = { ...x, title: i ?? c(T).text(), description: T, content: { html: T, text: T } }), x);
        });
        let m = c(`title`).text();
        return { title: m, description: c(`meta[name="description"]`).attr(`content`), link: o, item: p, allowEmpty: !0, author: m.split(/\|/).pop()?.trim(), language: u, id: c(`meta[property="og:url"]`).attr(`content`) };
    };
export { b as n, _ as t };
