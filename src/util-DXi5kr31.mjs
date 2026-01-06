import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
import c from 'crypto-js';
const l = ({ image: e, audio: t, video: a, preface: c, summary: l, description: u }) =>
        o(
            i(n, {
                children: [
                    !a?.src && e?.src ? r(`figure`, { children: r(`img`, { src: e.src, width: e.width, height: e.height }) }) : null,
                    t?.src ? r(`audio`, { controls: !0, children: r(`source`, { src: t.src, type: t.type }) }) : null,
                    a?.src ? i(`video`, { poster: a.poster || e?.src, controls: !0, children: [r(`source`, { src: a.src, type: a.type }), r(`object`, { data: a.src, children: r(`embed`, { src: a.src }) })] }) : null,
                    c ? r(n, { children: s(c) }) : null,
                    l ? r(n, { children: s(l) }) : null,
                    u ? r(n, { children: s(u) }) : null,
                ],
            })
        ),
    u = `huxiu.com`,
    d = `https://www.${u}`,
    f = `https://api-article.${u}`,
    p = `https://api-brief.${u}`,
    m = `https://api-account.${u}`,
    h = `https://moment-api.${u}`,
    g = `https://search-api.${u}`,
    _ = (e) => {
        let t = a(e);
        return (
            t(`div.neirong-shouquan`).remove(),
            t(`em.vote__bar, div.vote__btn, div.vote__time`).remove(),
            t(`p img`).each((e, n) => {
                ((n = t(n)), (n.prop(`src`) ?? n.prop(`_src`)) !== void 0 && n.parent().replaceWith(l({ image: { src: (n.prop(`src`) ?? n.prop(`_src`)).split(/\?/)[0], width: n.prop(`data-w`), height: n.prop(`data-h`) } })));
            }),
            t(`p, span`).each((e, n) => {
                ((n = t(n)), n.contents().length === 1 && /^\s*$/.test(n.text()) ? n.remove() : (n.removeClass(), n.removeAttr(`data-check-id label class`)));
            }),
            t(`.text-big-title`).each((e, n) => {
                ((n.tagName = `h3`), (n = t(n)), n.removeClass(), n.removeAttr(`class`));
            }),
            t(`.text-sm-title`).each((e, n) => {
                ((n.tagName = `h4`), (n = t(n)), n.removeClass(), n.removeAttr(`class`));
            }),
            t.html()
        );
    },
    v = async (e) => {
        let n = new URL(`briefColumn/detail`, p).href,
            {
                data: { data: r },
            } = await t.post(n, { form: { platform: `www`, brief_column_id: e } }),
            i = new URL(`club/${r.club_id}.html`, d).href,
            { data: o } = await t(i),
            s = a(o),
            c = `${r.name}-${r.sub_name}`,
            l = new URL(s(`link[rel="apple-touch-icon"]`).prop(`href`), d).href,
            u = s(`meta[name="author"]`).prop(`content`);
        return { title: `${c}-${u}`, link: i, description: r.summary, language: s(`html`).prop(`lang`), image: r.head_img, icon: l, logo: l, subtitle: c, author: u, itunes_author: u, itunes_category: `News`, allowEmpty: !0 };
    },
    y = async (e) => {
        let n = new URL(`club/${e}.html`, d).href,
            { data: r } = await t(n),
            i = a(r),
            o = i(`title`).text(),
            s = new URL(i(`link[rel="apple-touch-icon"]`).prop(`href`), d).href,
            c = i(`meta[name="author"]`).prop(`content`);
        return {
            data: {
                title: o,
                link: n,
                description: i(`ul.content-item li.content`).text().trim(),
                language: i(`html`).prop(`lang`),
                image: i(`div.header img.img`).prop(`data-src`)?.split(/\?/)[0] ?? void 0,
                icon: s,
                logo: s,
                subtitle: o.split(/-/)[0],
                author: c,
                itunes_author: c,
                itunes_category: `News`,
                allowEmpty: !0,
            },
            briefColumnId: r.match(/"brief_column_id":"(\d+)",/)[1],
        };
    },
    b = async (e) => {
        let { data: n } = await t(e),
            r = a(n),
            i = new URL(r(`link[rel="apple-touch-icon"]`).prop(`href`), d).href,
            o = r(`meta[name="author"]`).prop(`content`);
        return {
            title: r(`title`).text(),
            link: e,
            description: r(`div.tag-content`).text() || r(`span.author-intro`).text() || r(`p.collection__intro`).text() || r(`meta[name="description"]`).prop(`content`),
            language: r(`html`).prop(`lang`),
            icon: i,
            logo: i,
            subtitle: r(`title`).text().split(/-/)[0],
            author: o,
            itunes_author: o,
            itunes_category: `News`,
            allowEmpty: !0,
        };
    },
    x = async (n) => {
        let { data: r } = await t(n.link),
            i = w(r),
            a = i?.briefStoreModule?.brief_detail.brief ?? i?.articleDetail?.articleDetail ?? void 0;
        if (!a) return n;
        let { processed: o, processedItem: s = {} } = E(a.audio_info);
        Object.keys(s).length !== 0 && (s.itunes_item_image = a.pic_path ?? a.share_info?.share_img ?? void 0);
        let { processed: c, processedItem: u = {} } = k(a.video_info);
        return (
            (n.title = a.title ?? n.title),
            (n.description = l({ image: { src: a.pic_path }, video: c, audio: o, preface: _(a.content_preface ?? a.preface), summary: a.ai_summary, description: _(a.content) })),
            (n.author = a.user_info?.username ?? n.author),
            (n.category = [a.video_article_tag, a.brief_column?.name ?? void 0, a.club_info?.name ?? void 0, ...(a.tags_info?.map((e) => e.name) ?? []), ...(a.relation_info?.channel?.map((e) => e.name) ?? [])].filter(Boolean)),
            (n.pubDate = e(a.dateline ?? a.publish_time, `X`)),
            (n.upvote = a.agreenum ?? n.upvote),
            (n.comments = a.commentnum ?? a.total_comment_num ?? n.comments),
            (n.upvote = Number.parseInt(n.upvote, 10)),
            (n.comments = Number.parseInt(n.comments, 10)),
            { ...s, ...u, ...n }
        );
    },
    S = () => {
        let e = ``;
        for (let t = 0; t < 16; t++) e += `abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ`.charAt(Math.floor(Math.random() * 62));
        return e;
    },
    C = () => {
        let e = Math.round(Date.now() / 1e3).toString(),
            t = S(),
            n = [`hUzaABtNfDE-6UiyaYhfsmjW-8dnoyVc`, e, t].toSorted();
        return { nonce: t, timestamp: e, signature: c.SHA1(n[0] + n[1] + n[2]).toString() };
    },
    w = (e) => {
        let t = e.match(/window\.__INITIAL_STATE__=({.*?});\(function\(\)/);
        if (t) return JSON.parse(t[1]);
    },
    T = [``, `low`],
    E = (e) => {
        let t = e ? T.find((t) => Object.hasOwn(e, `audio_${t === `` ? `` : `${t}_`}path`)) : void 0;
        if (t === void 0) return { processed: void 0, processedItem: {} };
        let n = `audio_${t}path`,
            r = `audio_${t}size`,
            i = { duration: e.format_length_new ?? e.format_length, size: Object.hasOwn(e, r) ? e[r] : void 0, src: e[n], type: `audio/${e[n].split(/\./).pop()}` };
        return { processed: i, processedItem: { itunes_duration: i.duration, enclosure_url: i.src, enclosure_length: i.size, enclosure_type: i.type } };
    },
    D = async (t, n, r) => (
        (t = t
            .map((t) => {
                let n = ``,
                    r = ``;
                if (t.object_type === 8) ((n = `huxiu-moment-${t.object_id}`), (r = t.url || new URL(`moment/${t.object_id}.html`, d).href));
                else if (t.brief_id || /huxiu\.com\/brief\//.test(t.url)) ((t.brief_id = t.brief_id ?? t.aid), (n = `huxiu-brief-${t.brief_id}`), (r = new URL(`brief/${t.brief_id}.html`, d).href));
                else if (t.aid) ((n = `huxiu-article-${t.aid}`), (r = new URL(`article/${t.aid}.html`, d).href));
                else return ``;
                let { processed: i, processedItem: a = {} } = E(t.audio_info);
                Object.keys(a).length !== 0 && (a.itunes_item_image = t.pic_path ?? t.share_info?.share_img ?? void 0);
                let { processed: o, processedItem: s = {} } = k(t.video_info),
                    c = t.count_info?.agree ?? t.count_info?.favtimes ?? t.agree_num ?? 0,
                    u = t.count_info?.disagree ?? 0,
                    f = t.count_info?.total_comment_num ?? t.count_info?.commentnum ?? t.total_comment_num ?? t.commentnum ?? 0;
                return {
                    ...a,
                    ...s,
                    title: (t.title ?? t.summary ?? t.content)?.replaceAll(/<\/?(?:em|br)?>/g, ``),
                    link: r,
                    description: l({ image: { src: t.origin_pic_path ?? t.pic_path ?? t.big_pic_path?.split(/\?/)[0] ?? void 0 }, audio: i, video: o, summary: t.summary ?? t.content ?? t.preface }),
                    author: t.user_info?.username ?? t.brief_column?.name ?? t.author_info?.username ?? t.author,
                    guid: n,
                    pubDate: (t.publish_time ?? t.dateline) ? e(t.publish_time ?? t.dateline, `X`) : void 0,
                    upvotes: Number.parseInt(c, 10),
                    downvotes: Number.parseInt(u, 10),
                    comments: Number.parseInt(f, 10),
                };
            })
            .filter(Boolean)
            .slice(0, n)),
        await Promise.all(
            t.map((e) =>
                r(e.guid, async () => {
                    if (new RegExp(u, `i`).test(new URL(e.link).hostname)) {
                        if (!e.guid.startsWith(`huxiu-moment`)) return await x(e);
                    } else return e;
                    return e;
                })
            )
        )
    ),
    O = [`fhd`, `fhd_medium`, `wifi`, `fhd_low`, `flow`, `hd`, `sd`],
    k = (e) => {
        let t = e ? O.find((t) => Object.hasOwn(e, `${t}_link`)) : void 0;
        if (t === void 0) return { processed: void 0, processedItem: {} };
        let n = `${t}_link`,
            r = `origin_${t}_size`,
            i = { duration: e.duration ?? e.origin_duration, poster: e.cover ?? e.custom_cover_path ?? e.gif_path, size: Object.hasOwn(e, r) ? e[r] : void 0, src: e[n], type: `video/${e[n].split(/\./).pop()}` };
        return { processed: i, processedItem: { itunes_item_image: i.poster, itunes_duration: i.duration, enclosure_url: i.src, enclosure_length: i.size, enclosure_type: i.type } };
    };
export { g as a, b as c, d, h as i, C as l, p as n, v as o, m as r, y as s, f as t, D as u };
