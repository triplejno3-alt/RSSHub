import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { destr as l } from 'destr';
import { raw as u } from 'hono/html';
const d = ({ img: e, src: t, caption: n, credit: r }) =>
        c(
            o(`figure`, {
                children: [
                    o(`div`, { children: [a(`img`, { src: e }), o(`audio`, { controls: !0, children: [a(`source`, { src: t, type: `audio/mpeg` }), `Your browser does not support the audio element.`] })] }),
                    o(`figcaption`, { children: [a(`div`, { class: `caption`, children: n ? u(n) : null }), a(`div`, { class: `credit`, children: r ? u(r) : null })] }),
                ],
            })
        ),
    f = ({ chart: e }) =>
        c(
            o(`figure`, {
                children: [
                    e.title ? a(i, { children: e.title }) : null,
                    e.subtitle ? a(`p`, { children: e.subtitle }) : null,
                    a(`noscript`, { children: a(`img`, { src: e.fallback, alt: e.chartAlt, loading: `lazy`, style: `display:block; margin-left:auto; margin-right:auto; width:100%;` }) }),
                    a(`iframe`, {
                        id: e.chartId,
                        title: e.title,
                        referrerpolicy: `no-referrer`,
                        width: `100%`,
                        height: `150vh`,
                        frameborder: `0`,
                        marginheight: `0`,
                        marginwidth: `0`,
                        loading: `lazy`,
                        scrolling: `no`,
                        style: `border:0; margin:0; padding:0; width:100%; height:150vh;`,
                        src: e.url,
                    }),
                    e.source ? o(`figcaption`, { children: [a(`div`, { class: `source`, children: u(e.source) }), e.footnote ? a(`p`, { children: e.footnote }) : null] }) : null,
                ],
            })
        ),
    p = ({ src: e, alt: t, caption: n, credit: r }) =>
        c(
            o(`figure`, {
                children: [
                    a(`img`, { src: e, alt: t, loading: `lazy`, style: `display:block; margin-left:auto; margin-right:auto; width:100%;` }),
                    n || r ? o(`figcaption`, { children: [a(`div`, { class: `caption`, children: n ? u(n) : null }), a(`div`, { class: `credit`, children: r ? u(r) : null })] }) : null,
                ],
            })
        ),
    m = ({ stream: e, mp4: t, coverUrl: n, caption: r }) =>
        c(
            o(`figure`, {
                children: [
                    o(`video`, {
                        controls: !0,
                        playsinline: `true`,
                        'webkit-playsinline': `true`,
                        'x5-playsinline': `true`,
                        'x5-video-player-type': `h5`,
                        'x5-video-orientation': `landscape|portrait`,
                        'x5-video-player-fullscreen': `true`,
                        'x-webkit-airplay': `allow`,
                        preload: `metadata`,
                        poster: n,
                        children: [e ? a(`source`, { src: e, type: `application/x-mpegURL` }) : null, t ? a(`source`, { src: t, type: `video/mp4` }) : null],
                    }),
                    r ? a(`figcaption`, { children: a(`div`, { class: `caption`, children: u(r) }) }) : null,
                ],
            })
        ),
    h = (e) =>
        e?.kind === `video`
            ? m(e.video ?? {})
            : e?.kind === `image`
              ? c(
                    o(`figure`, {
                        children: [
                            a(`img`, { src: e.src, alt: e.description, loading: `lazy`, style: `display:block; margin-left:auto; margin-right:auto; width:100%;` }),
                            e.caption ? o(`figcaption`, { children: [a(`div`, { class: `caption`, children: u(e.caption) }), a(`div`, { class: `credit`, children: e.credit ? u(e.credit) : null })] }) : null,
                        ],
                    })
                )
              : ``,
    g = `https://www.bloomberg.com/feeds`,
    _ = { accept: `application/json`, 'cache-control': `no-cache`, referer: `https://www.bloomberg.com` },
    v = {
        articles: { url: `https://www.bloomberg.com/article/api/story/slug/` },
        features: { url: `https://www.bloomberg.com/article/api/story/slug/` },
        audio: { url: `https://www.bloomberg.com/news/audio/`, sel: `script#__NEXT_DATA__` },
        videos: { url: `https://www.bloomberg.com/news/videos/`, sel: `script` },
        newsletters: { url: `https://www.bloomberg.com/article/api/story/slug/` },
        'photo-essays': { url: `https://www.bloomberg.com/javelin/api/photo-essay_transporter/`, sel: `script[type = "application/json"][data-component-props]` },
        'features/': { url: `https://www.bloomberg.com/features/`, sel: `script[id^="article-info"][type="application/json"], script[class^="article-info"][type="application/json"], script#dvz-config`, prop: `id` },
    },
    y = [/\/(?<page>[\w-]*?)\/(?<link>\d{4}-\d{2}-\d{2}\/.*)/, /(?<!news|politics)\/(?<page>features\/|graphics\/)(?<link>.*)/],
    b = /<p>|<\/p>/g,
    x = /<p\b[^>]*>(&nbsp;|\s)<\/p>/g,
    S = (t) => e.raw(t, { headers: _, parseResponse: (e) => ({ data: l(e), body: e }) }),
    C = async (e, t) => {
        let i = s((await r(e)).data, { xml: { xmlMode: !0 } });
        return i(`urlset url`)
            .toArray()
            .slice(0, t.req.query(`limit`) ? Number.parseInt(t.req.query(`limit`)) : 50)
            .map((e) => ((e = i(e)), { title: e.find(String.raw`news\:title`).text(), link: e.find(`loc`).text(), pubDate: n(e.find(String.raw`news\:publication_date`).text()) }));
    },
    w = (e) =>
        t.tryGet(e.link, async () => {
            let t = y
                .map((t) => t.exec(e.link))
                .filter((e) => e && e.groups)
                .map((e) => e && e.groups)[0];
            if (t) {
                let { page: n, link: r } = t;
                if (v[n]) {
                    let t = { ...v[n] },
                        i;
                    try {
                        i = await S(`${t.url}${r}`);
                    } catch (t) {
                        if (t.name && (t.name === `HTTPError` || t.name === `RequestError` || t.name === `FetchError`))
                            try {
                                i = await S(e.link);
                            } catch {
                                return { title: e.title, link: e.link, pubDate: e.pubDate };
                            }
                    }
                    if ((i.redirected && new URL(i.url).pathname === `/tosv2.html`) || i.status === 404) return { title: e.title, link: e.link, pubDate: e.pubDate };
                    switch (n) {
                        case `audio`:
                            return T(i._data, t, e);
                        case `videos`:
                            return E(i._data, t, e);
                        case `photo-essays`:
                            return D(i._data, t, e);
                        case `features/`:
                            return O(i._data, t, e);
                        default:
                            return k(i._data.data, e);
                    }
                }
            }
            return e;
        }),
    T = async (e, t, r) => {
        let i = JSON.parse(s(e.data)(t.sel).html()).props.pageProps,
            a = i.episode;
        return {
            title: a.title || r.title,
            link: i.pageInfo.canonicalUrl || r.link,
            guid: `bloomberg:${a.id}`,
            description: (await M(a.articleBody, i)).replaceAll(x, ``),
            pubDate: n(a.publishedAt) || r.pubDate,
            author: i.hero.showTitle,
            media: { content: { url: a.image }, thumbnails: { url: a.image } },
            enclosure_type: `audio/mpeg`,
            enclosure_url: a.url,
            itunes_item_image: a.image || i.pageInfo.image.url,
        };
    },
    E = async (e, t, r) => {
        let i = s(e.data),
            a = i(t.sel)
                .filter((e, t) => i(t).text().includes(`__PRELOADED_STATE__`))
                .text()
                .trim()
                .match(/window\.__PRELOADED_STATE__ = (.*?);/)?.[1],
            o = JSON.parse(a || `{}`),
            c = o.video?.videoStory ?? o.quicktakeVideo?.videoStory;
        if (c) {
            let e = await N(c.video.bmmrId, c.summary.html.replaceAll(x, ``));
            return {
                title: c.headline.text || r.title,
                link: c.url || r.link,
                guid: `bloomberg:${c.id}`,
                description: m(e),
                pubDate: n(c.publishedAt) || r.pubDate,
                media: { content: { url: c.video?.thumbnail.url || `` }, thumbnails: { url: c.video?.thumbnail.url || `` } },
                category: e.keywords ?? [],
            };
        }
        return r;
    },
    D = async (e, t, n) => {
        let r = s(e.data.html),
            i = {};
        for (let e of r(t.sel).toArray()) Object.assign(i, JSON.parse(r(e).html()));
        return { title: i.headline || n.title, link: i.canonical || n.link, guid: `bloomberg:${i.id}`, description: (await M(i.body, i)).replaceAll(x, ``), pubDate: n.pubDate, author: i.authors?.map((e) => e.name).join(`, `) ?? [] };
    },
    O = async (e, t, n) => {
        let r = s(e.data)(t.sel).text().trim(),
            i = JSON.parse(r)[t.prop];
        try {
            return await k((await S(`https://www.bloomberg.com/article/api/story/id/${i}`))._data, n);
        } catch (e) {
            if (e.name && (e.name === `HTTPError` || e.name === `RequestError` || e.name === `FetchError`)) return { title: n.title, link: n.link, pubDate: n.pubDate };
        }
    },
    k = async (e, t) => {
        let r = e.ledeImageUrl || Object.values(e.imageAttachments ?? {})[0]?.url;
        return {
            title: e.headline || t.title,
            link: e.url || t.link,
            guid: `bloomberg:${e.id}`,
            description: A(e) + (await j(e)) + (await R(e.body || ``)),
            pubDate: n(e.publishedAt) || t.pubDate,
            author: e.authors?.map((e) => e.name).join(`, `) ?? [],
            category: e.mostRelevantTags ?? [],
            media: { content: { url: r }, thumbnails: { url: r } },
        };
    },
    A = (e) => {
        let t = e.dek || e.summary || e.headline || ``,
            n = e.abstract?.map((e) => `<li>${e}</li>`).join(``);
        return n ? t + `<ul>${n}</ul>` : t;
    },
    j = async (e) => {
        if (e.ledeMediaKind) {
            let t = e.ledeMediaKind;
            return h({
                kind: e.ledeMediaKind,
                caption: e.ledeCaption?.replaceAll(b, ``) ?? ``,
                description: e.ledeDescription?.replaceAll(b, ``) ?? ``,
                credit: e.ledeCredit?.replaceAll(b, ``) ?? ``,
                src: e.ledeImageUrl,
                video: t === `video` && (await N(e.ledeAttachment.bmmrId)),
            });
        } else if (e.lede) {
            let t = e.lede;
            return p({ src: t.url, alt: t.alt || t.title, caption: t.caption?.replaceAll(b, ``) ?? ``, credit: t.credit?.replaceAll(b, ``) ?? `` });
        } else if (e.imageAttachments) {
            let t = Object.values(e.imageAttachments)[0];
            return t ? p({ src: t.baseUrl || t.url, alt: t.alt || t.title, caption: t.caption?.replaceAll(b, ``) ?? ``, credit: t.credit?.replaceAll(b, ``) ?? `` }) : ``;
        } else if (e.type === `Lede`) {
            let t = e.props;
            return h({ kind: t.media, caption: t.caption?.replaceAll(b, ``) ?? ``, description: t.dek?.replaceAll(b, ``) ?? ``, credit: t.credit?.replaceAll(b, ``) ?? ``, src: t.url });
        }
    },
    M = async (e, t) => {
        let n = [`meta`, `script`, `*[class$="-footnotes"]`, `*[class$="for-you"]`, `*[class$="-newsletter"]`, `*[class$="page-ad"]`, `*[class$="-recirc"]`, `*[data-ad-placeholder="Advertisement"]`],
            r = s(e);
        for (let e of n) r(e).remove();
        r(`.paywall`).removeAttr(`class`);
        for await (let e of r(`figure`)) {
            let n = r(e).data(`image-type`),
                i = r(e).data(`type`),
                a = ``;
            if (n === `audio`) {
                let n = {};
                if (t.audios) {
                    let i = t.audios.find((t) => t.id.toString() === r(e).data(`id`).toString());
                    n = {
                        img: i.image?.url || r(e).find(`img`).attr(`src`),
                        src: i.url || r(e).find(`audio source`).attr(`src`),
                        caption: r(e).find(`[class$="text"]`).html()?.trim() ?? ``,
                        credit: r(e).find(`[class$="credit"]`).html()?.trim() ?? ``,
                    };
                }
                if (t.episode) {
                    let i = t.episode;
                    n = {
                        src: i.url,
                        img: i.image || t.pageInfo.image.url,
                        caption: i.description || (r(e).find(`[class$="text"]`).html()?.trim() ?? ``),
                        credit: (i.credits.map((e) => e.name).join(`, `) ?? []) || (r(e).find(`[class$="credit"]`).html()?.trim() ?? ``),
                    };
                }
                a = d(n);
            } else if (n === `video`) {
                if (t.videoAttachments) {
                    let n = t.videoAttachments[r(e).data(`id`)];
                    a = m(await N(n.bmmrId));
                }
            } else if (n === `photo` || n === `image` || i === `image`) {
                let n, i;
                if (t.imageAttachments) {
                    let a = t.imageAttachments[r(e).data(`id`)];
                    ((i = a?.alt || r(e).find(`img`).attr(`alt`)?.trim()), (n = a?.baseUrl));
                } else ((i = r(e).find(`img`).attr(`alt`).trim()), (n = r(e).find(`img`).data(`native-src`)));
                let o = r(e).find(`[class$="text"], .caption, .photo-essay__text`).html()?.trim() ?? ``,
                    s = r(e).find(`[class$="credit"], .credit, .photo-essay__source`).html()?.trim() ?? ``;
                a = p({ src: n, alt: i, caption: o, credit: s });
            }
            (r(a).insertAfter(e), r(e).remove());
        }
        return r.html();
    },
    N = async (e, t) => {
        let n = await S(`https://www.bloomberg.com/multimedia/api/embed?id=${e}`);
        if ((n.redirected && new URL(n.url).pathname === `/tosv2.html`) || n.status === 404) return { stream: ``, mp4: ``, coverUrl: ``, caption: t };
        if (n._data.data) {
            let e = n._data.data;
            return { stream: e.streams ? e.streams[0]?.url : ``, mp4: e.downloadURLs ? e.downloadURLs[600] : ``, coverUrl: e.thumbnail?.baseUrl ?? ``, caption: e.description || e.title || t };
        }
        return { stream: ``, mp4: ``, coverUrl: ``, caption: t };
    },
    P = {
        paragraph: async (e, t) => `<p>${await t(e.content)}</p>`,
        text: (e) => {
            let { attributes: t, value: n } = e;
            return t?.emphasis && t?.strong ? `<strong><em>${n}</em></strong>` : t?.emphasis ? `<em>${n}</em>` : t?.strong ? `<strong>${n}</strong>` : n;
        },
        'inline-newsletter': async (e, t) => `<div>${await t(e.content)}</div>`,
        'inline-recirc': async (e, t) => `<div>${await t(e.content)}</div>`,
        heading: async (e, t) => {
            let n = e.data;
            if (n.level === 2 || n.level === 3) return `<h3>${await t(e.content)}</h3>`;
        },
        link: async (e, t) => {
            let n = e.data.destination,
                r = n.web,
                i = n.bbg,
                a = e.data.title;
            return r
                ? `<a href="${r}" title="${a}" target="_blank">${await t(e.content)}</a>`
                : i && i.startsWith(`bbg://news/stories`)
                  ? `<a href="${`https://www.bloomberg.com/news/terminal/${i.split(`bbg://news/stories/`).pop()}`}" title="${a}" target="_blank">${await t(e.content)}</a>`
                  : String(await t(e.content));
        },
        entity: async (e, t) => {
            let n = e.subType,
                r = e.data.link.destination.web;
            if (n === `person`) return t(e.content);
            if (n === `story`)
                return r ? `<a href="${r}" target="_blank">${await t(e.content)}</a>` : `<a href="${`https://www.bloomberg.com/news/terminal/${e.data.story.identifiers.suid}`}" target="_blank">${await t(e.content)}</a>`;
            if (n === `security`) {
                let n = e.data.security.identifiers.parsekey;
                if (n) {
                    let r = n.split(` `);
                    return `<a href="${[...`https://www.bloomberg.com/quote/${r[0]}:`, r[1]]}" target="_blank">${await t(e.content)}</a>`;
                }
            }
            return t(e.content);
        },
        br: () => `<br/>`,
        hr: () => `<br/>`,
        ad: () => {},
        blockquote: async (e, t) => `<blockquote>${await t(e.content)}</blockquote>`,
        quote: async (e, t) => `<blockquote>${await t(e.content)}</blockquote>`,
        aside: async (e, t) => `<aside>${await t(e.content)}</aside>`,
        list: async (e, t) => {
            let n = e.subType;
            if (n === `unordered`) return `<ul>${await t(e.content)}</ul>`;
            if (n === `ordered`) return `<ol>${await t(e.content)}</ol>`;
        },
        listItem: async (e, t) => `<li>${await t(e.content)}</li>`,
        media: async (e) => {
            let t = e.subType;
            if (t === `chart` && e.data.attachment) {
                if (e.data.attachment.creator === `TOASTER`) {
                    let t = e.data.chart,
                        n = { src: (t && t.fallback) || ``, chart: e.data.attachment, id: (t && t.id) || ``, alt: (t && t.alt) || `` },
                        r = n.chart;
                    return f({ chart: { source: r.source, footnote: r.footnote, url: r.url, title: r.title, subtitle: r.subtitle, chartId: `toaster-chart-${n.id}`, chartAlt: n.alt, fallback: n.src } });
                }
                return p({ alt: e.data.attachment?.footnote || ``, caption: e.data.attachment?.title + e.data.attachment.subtitle || ``, credit: e.data.attachment?.source || ``, src: e.data.chart?.fallback || `` });
            }
            if (t === `photo`) {
                let t = e.data,
                    n = ``;
                return (
                    t.attachment && (n = p({ src: t.photo?.src, alt: t.photo?.alt, caption: t.photo?.caption, credit: t.photo?.credit })),
                    t.link && t.link.destination && t.link.destination.web ? `<a href="${t.link.destination.web}" target="_blank">${n}</a>` : n
                );
            }
            if (t === `video`) {
                let t = e.data,
                    n = t.attachment?.id;
                if (n) return m(await N(n, t.attachment?.title));
            }
            if (t === `audio` && e.data.attachment) {
                let t = e.data.attachment,
                    n = t.title,
                    r = t.url,
                    i = t.image;
                if (n && r) return d({ src: r, img: i.url, caption: n, credit: `` });
            }
            return ``;
        },
        tabularData: async (e, t) => `<table>${await t(e.content)}</table>`,
        columns: (e) => `<tr>${e.data.definitions.map((e) => ({ title: e.title, span: e.colSpan || 1, type: e.dataType })).map((e) => `<th colspan=${e.span}>${e.title}</th>`)}</tr>`,
        row: async (e, t) => `<tr>${await t(e.content)}</tr>`,
        cell: async (e, t) => `<td data-coltype=${{ 'news-rsf-table-number': `number`, 'news-rsf-table-string': `text` }[e.data.class] || `text`} colspan=${e.data.colspan}>${await t(e.content)}</td>`,
    },
    F = async (e) => await L(e),
    I = async (e, t) => (!e.type || !P[e.type] ? `<node>${e.type}</node>` : await P[e.type](e, F, t)),
    L = async (e) => (await Promise.all(e.map(async (t, n) => await I(t, { index: n, prev: e[n - 1]?.type, next: e[n + 1]?.type })))).join(``),
    R = async (e) => (!e || !e.content ? `` : await L(e.content));
export { C as n, g as r, w as t };
