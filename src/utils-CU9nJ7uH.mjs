import { t as e } from './config-Cc-zZ5p-.mjs';
import { t } from './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './puppeteer-BbZGb8cd.mjs';
import { i as a, n as o, t as s } from './readable-social--hCfpJhv.mjs';
import { t as c } from './puppeteer-utils-BhPB3ohS.mjs';
import { load as l } from 'cheerio';
import u from 'node:querystring';
var d = class extends Error {
    constructor(e) {
        (super(e), (this.name = `RenewWeiboCookiesError`));
    }
};
const f = {
    apiHeaders: { 'MWeibo-Pwa': 1, 'X-Requested-With': `XMLHttpRequest`, 'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1` },
    RenewWeiboCookiesError: d,
    getCookies: (() => {
        let r = `https://m.weibo.cn/`,
            a = `Cooling down before new visitor Cookies from ${r} may be fetched`,
            o = !1;
        return async (s = !1) => {
            if (e.weibo.cookies) {
                if (s) throw Error(`Cookies expired. Please update WEIBO_COOKIES`);
                return e.weibo.cookies;
            }
            let l = `weibo:visitor-cookies`;
            return (
                s && n.set(l, ``, 1),
                await n.tryGet(l, async () => {
                    if (o) throw s?.message ? (t.warn(a), s) : Error(a);
                    ((o = !0),
                        setTimeout(() => {
                            o = !1;
                        }, e.cache.routeExpire * 1e3),
                        s ? t.warn(`Renewing visitor Cookies from ${r}`) : t.info(`Fetching visitor Cookies from ${r}`));
                    let n = 0,
                        { page: l, destory: u } = await i(r, {
                            onBeforeLoad: async (e) => {
                                let t = new Set([`document`, `script`, `xhr`, `fetch`]);
                                (await e.setUserAgent(f.apiHeaders[`User-Agent`]),
                                    await e.setRequestInterception(!0),
                                    e.on(`request`, (e) => {
                                        if (!t.has(e.resourceType()) || n >= 2) {
                                            e.abort();
                                            return;
                                        }
                                        (e.url().startsWith(r) && n++, e.continue());
                                    }));
                            },
                            gotoConfig: { waitUntil: `networkidle0` },
                        }),
                        d = await c(l, `weibo.cn`);
                    if ((await u(), n < 2 || !d)) throw Error(`Unable to fetch visitor cookies. Please set WEIBO_COOKIES. Redirection: ${n}, last URL: ${l.url()}`);
                    return d;
                })
            );
        };
    })(),
    tryWithCookies: (() => {
        let e = 0,
            n = (e) => {
                if (e?.data?.ok === -100) throw new d(`Cookies expired. Msg: ${e?.data?.msg || ``} ${e?.data?.url || ``}`);
            };
        return async (r) => {
            try {
                return await r(await f.getCookies(!1), n);
            } catch (i) {
                if (i.message?.includes(`WEIBO_COOKIES`)) throw i;
                if (e > 10) (t.warn(`Too many errors while fetching data from weibo API, renewing Cookies: ${i.message}`), t.info(`Please open an issue on GitHub if renewing Cookies fixes the error`));
                else if (!((i.name === `HTTPError` || i.name === `FetchError`) && i.status === 432) && i.name !== `RenewWeiboCookiesError`) throw (e++, i);
                return ((e = 0), await r(await f.getCookies(i), n));
            }
        };
    })(),
    formatTitle: (e) =>
        e
            .replaceAll(/<span class=["']url-icon["']><img\s[^>]*?alt=["']?([^>]+?)["']?\s[^>]*?\/?><\/span>/g, `$1`)
            .replaceAll(/<span class=["']url-icon["']>(<img\s[^>]*>)<\/span>/g, ``)
            .replaceAll(/<img\s[^<]*>/g, `[图片]`)
            .replaceAll(/<[^<]*>/g, ``)
            .replaceAll(
                `
`,
                ` `
            )
            .trim(),
    formatExtended: (e, t, n, r = {}, i = []) => {
        let c = u.parse(e.req.param(`routeParams`));
        r = {
            readable: s(r.readable, o(c.readable), !1),
            authorNameBold: s(r.authorNameBold, o(c.authorNameBold), !1),
            showAuthorInTitle: s(r.showAuthorInTitle, o(c.showAuthorInTitle), !1),
            showAuthorInDesc: s(r.showAuthorInDesc, o(c.showAuthorInDesc), !1),
            showAuthorAvatarInDesc: s(r.showAuthorAvatarInDesc, o(c.showAuthorAvatarInDesc), !1),
            showAtBeforeAuthor: s(r.showAtBeforeAuthor, null, !1),
            showEmojiForRetweet: s(r.showEmojiForRetweet, o(c.showEmojiForRetweet), !1),
            showRetweetTextInTitle: s(r.showRetweetTextInTitle, o(c.showRetweetTextInTitle), !0),
            addLinkForPics: s(r.addLinkForPics, o(c.addLinkForPics), !1),
            showTimestampInDescription: s(r.showTimestampInDescription, o(c.showTimestampInDescription), !1),
            widthOfPics: s(r.widthOfPics, a(c.widthOfPics), -1),
            heightOfPics: s(r.heightOfPics, a(c.heightOfPics), -1),
            sizeOfAuthorAvatar: s(r.sizeOfAuthorAvatar, a(c.sizeOfAuthorAvatar), 48),
            showEmojiInDescription: s(r.showEmojiInDescription, a(c.showEmojiInDescription), !1),
            showLinkIconInDescription: s(r.showLinkIconInDescription, a(c.showLinkIconInDescription), !0),
            preferMobileLink: s(r.preferMobileLink, o(c.preferMobileLink), !1),
        };
        let {
                readable: l,
                authorNameBold: d,
                showAuthorInTitle: p,
                showAuthorInDesc: m,
                showAuthorAvatarInDesc: h,
                showAtBeforeAuthor: g,
                showEmojiForRetweet: _,
                showRetweetTextInTitle: v,
                addLinkForPics: y,
                showTimestampInDescription: b,
                widthOfPics: x,
                heightOfPics: S,
                sizeOfAuthorAvatar: C,
                showEmojiInDescription: w,
                showLinkIconInDescription: T,
                preferMobileLink: E,
            } = r,
            D = ``,
            O = (t.longText && t.longText.longTextContent) || t.text || ``;
        (w || (O = O.replaceAll(/<span class=["']?url-icon["']?><img\s[^>]*?alt=["']?([^>]+?)["']?\s[^>]*?\/><\/span>/g, `$1`)),
            T || (O = O.replaceAll(/(<a\s[^>]*>)<span class=["']?url-icon["']?><img\s[^>]*><\/span>[^<>]*?<span class=["']?surl-text["']?>([^<>]*?)<\/span><\/a>/g, `$1$2</a>`)));
        let k = O.match(/<span class=["']?surl-text["']?>#([^<>]*?)#<\/span>/g)?.map((e) => e?.match(/#([^#]+)#/)?.[1]);
        ((O = O.replaceAll(`全文<br>`, `<br>`)),
            (O = O.replaceAll(/<a href="(.*?)">全文<\/a>/g, ``)),
            (O = O.replaceAll(/"https:\/\/weibo\.cn\/sinaurl.*?[&?]u=(http.*?)"/g, (e, t) => `"${decodeURIComponent(t)}"`)),
            (O = O.replaceAll(/<a\s+href="https?:\/\/[^"]+\.(jpg|png|gif)"/g, (e) => `${e} data-rsshub-image="href"`)));
        let A = O.replaceAll(
            `
`,
            `<br>`
        );
        if (m) {
            let e = `<a href="https://weibo.com/${t.user.id}" target="_blank">`;
            h && (e += `<img width="${C}" height="${C}" src="${t.user.profile_image_url}" ${l ? `hspace="8" vspace="8" align="left"` : ``} />`);
            let n = t.user.screen_name;
            (g && (n = `@` + n), (e += d ? `<strong>${n}</strong></a>:&ensp;` : `${n}</a>:&ensp;`), (A = e + A));
        }
        if ((t.pics && !Array.isArray(t.pics) && typeof t.pics == `object` && (t.pics = Object.values(t.pics)), t.page_info && t.page_info.type === `article` && t.page_info.page_pic && t.page_info.page_pic.url)) {
            let e = { large: { url: t.page_info.page_pic.url } };
            t.pics ? t.pics.push(e) : (t.pics = [e]);
        }
        let j = t.pics ? t.pics.filter((e) => e.type === `livephoto`).length : 0,
            M = t.pics && t.pics.filter((e) => e.type !== `livephoto`);
        if (M) {
            l && (A += `<br clear="both" /><div style="clear: both"></div>`);
            let e = ``;
            for (let t of M) e += `<img width="0" height="0" hidden="true" src="${t.large.url}">`;
            i.push(e);
            for (let e of M) {
                y && (A += `<a href="` + e.large.url + `">`);
                let t = ``;
                if (((A += `<img `), (A += l ? `vspace="8" hspace="4"` : ``), e.large)) {
                    let { geo: n, url: r } = e.large;
                    if (n?.width || x >= 0) {
                        let e = n?.width || x;
                        ((A += ` width="${e}"`), (t += `width: ${e}px;`));
                    }
                    if (n?.height || S >= 0) {
                        let e = n?.height || S;
                        ((A += ` height="${e}"`), (t += `height: ${e}px;`));
                    }
                    A += ` style="${t}" src="${r}">`;
                }
                (y && (A += `</a>`), (O += `<img src="" />`));
            }
        }
        if (t.retweeted_status) {
            ((A += l
                ? `<br clear="both" /><div style="clear: both"></div><blockquote style="background: #80808010;border-top:1px solid #80808030;border-bottom:1px solid #80808030;margin:0;padding:5px 20px;">`
                : `<br><blockquote> - 转发 `),
                t.retweeted_status.user || (t.retweeted_status.user = { profile_image_url: ``, screen_name: `[原微博不可访问]`, id: `sorry` }));
            let n = Object.assign({}, r);
            ((n.showAuthorInDesc = !0),
                (n.showAuthorAvatarInDesc = !1),
                (n.showAtBeforeAuthor = !0),
                (D += f.formatExtended(e, t.retweeted_status, void 0, n, i).description),
                (A += D),
                l &&
                    (A += `<br><small>原博：<a href="https://weibo.com/${t.retweeted_status.user.id}/${t.retweeted_status.bid}" target="_blank" rel="noopener noreferrer">https://weibo.com/${t.retweeted_status.user.id}/${t.retweeted_status.bid}</a></small>`),
                b && (A += `<br><small>` + new Date(t.retweeted_status.created_at).toLocaleString() + `</small>`),
                l && (A += `<br clear="both" /><div style="clear: both"></div>`),
                (A += `</blockquote>`));
        }
        m && h && (A = i.join(``) + A);
        let N = ``;
        (p && (N += t.user.screen_name + `: `),
            (!t.retweeted_status || v) && (N += f.formatTitle(O)),
            t.retweeted_status && ((N += _ ? `🔁 ` : ` - 转发 `), (N += f.formatTitle(D))),
            j > 0 && ((N += ` `), (N += Array.from({ length: j + 1 }).join(`[Live Photo]`))),
            t.page_info && t.page_info === `video` && (N += ` [视频]`),
            (n ||= t.user?.id));
        let P = t.bid || t.id,
            F = n ? `https://weibo.com/${n}/${P}` : `https://m.weibo.cn/status/${P}`,
            I = E ? `https://m.weibo.cn/status/${P}` : F,
            L = [{ name: t.user?.screen_name, url: `https://weibo.com/${n}`, avatar: t.user?.avatar_hd }],
            R = t.created_at;
        return { description: A, title: N, link: I, guid: F, author: L, pubDate: R, category: k };
    },
    getShowData: async (e, t) => {
        let n = `https://m.weibo.cn/statuses/show?id=${t}`;
        return (await r.get(n, { headers: { Referer: `https://m.weibo.cn/u/${e}`, ...f.apiHeaders } })).data.data;
    },
    formatVideo: (e, t) => {
        let n = t.page_info,
            r = t.pics && t.pics.filter((e) => e.type === `livephoto` && e.videoSrc),
            i = `<br clear="both" /><div style="clear: both"></div>`,
            a = !1;
        if (r) for (let e of r) ((i += `<video controls="controls" poster="${(e.large && e.large.url) || e.url}" src="${e.videoSrc}" style="width: 100%"></video>`), (a = !0));
        if (n && n.type === `video`) {
            let e = n.page_pic,
                t = e ? e.url : ``,
                r = n.page_url,
                o = n.media_info || {},
                s = n.urls || {},
                c = s.mp4_720p_mp4 || o.mp4_720p_mp4 || ``,
                l = s.mp4_hd_mp4 || o.mp4_hd_url || o.stream_url_hd || ``,
                u = s.hevc_mp4_hd || ``,
                d = s.mp4_ld_mp4 || o.mp4_sd_url || o.stream_url || ``;
            (c || l || u || d) &&
                ((i += `<video controls="controls" poster="${t}" style="width: 100%">`),
                c && (i += `<source src="${c}">`),
                l && (i += `<source src="${l}">`),
                u && (i += `<source src="${u}">`),
                d && (i += `<source src="${d}">`),
                r && (i += `<p>视频无法显示，请前往<a href="${r}" target="_blank" rel="noopener noreferrer">微博视频</a>观看。</p>`),
                (i += `</video>`),
                (a = !0));
        }
        return (a && (e += i), e);
    },
    formatArticle: async (e, t, i) => {
        let a = i.page_info;
        if (a && a.type === `article` && a.page_url) {
            let e = a.page_url.match(/id=(\d+)/);
            if (!e) return t;
            let i = e[1],
                o = `https://card.weibo.com/article/m/aj/detail?id=${i}`,
                s = (await n.tryGet(o, async () => (await r.get(o, { headers: { Referer: `https://card.weibo.com/article/m/show/id/${i}`, ...f.apiHeaders } })).data)).data;
            if (s && s.title && s.content) {
                let e = s.title,
                    n = s.content,
                    r = s.summary,
                    i = s.create_at,
                    a = s.read_count,
                    o = s.is_original,
                    c = s.is_article_free,
                    u = `<br clear="both" /><br clear="both" />`;
                ((u += `<div style="clear: both"></div><div style="background: #fff;border:5px solid #80808030;margin:0;padding:3% 5%;overflow-wrap: break-word">`),
                    (u += `<h1 style="font-size: 1.5rem;line-height: 1.25;color: #333;">${e}</h1>`));
                let d = `display: inline-block;margin-inline: 0.25rem;width: 2.25rem; height: 1.125rem; background: #eee; border-radius: 2px; box-sizing: border-box; text-align: center; line-height: 1.0625rem; font-size: 0.75rem; color: #aaa;`,
                    f = `<p style="line-height: 1.66; color: #999;margin: 0 0 0.75rem;font-size: 0.75rem;padding: 0">`;
                (c && (f += `<span style="${d}">试读</span> `),
                    o && (f += `<span style="${d}">原创</span> `),
                    (f += `<span style="margin-inline: 0.25rem;">发布时间: ${i}</span> `),
                    (f += `<span style="margin-inline: 0.25rem;">阅读量: ${a}</span> `),
                    (f += `</p>`),
                    (u += f),
                    r && (u += `<p style="color: #999;line-height: 1.5rem;padding: 0.0625rem 0 0.875rem;margin: 0">${r}</p>`),
                    (u += `<div style="height: 0;border-bottom: 1px dashed #999;margin-bottom: 0.75rem;"></div>`));
                let p = l(n);
                (p(`p`).each((e, t) => {
                    t = p(t);
                    let n = t.attr(`style`) || ``;
                    ((n = `margin: 0;padding: 0;border: 0;` + n), t.attr(`style`, n));
                }),
                    p(`.image`).each((e, t) => {
                        t = p(t);
                        let n = t.attr(`style`) || ``;
                        ((n = `display: table;text-align: center;margin-left: auto;margin-right: auto;clear: both;min-width: 50px;` + n), t.attr(`style`, n));
                    }),
                    p(`img`).each((e, t) => {
                        t = p(t);
                        let n = t.attr(`style`) || ``;
                        ((n = `display: block;max-width: 100%;margin-left: auto;margin-right: auto;min-width: 50px;` + n), t.attr(`style`, n));
                    }));
                let m = p.html();
                ((u += `<div style="line-height: 1.59;text-align: justify;font-size: 1.0625rem;color: #333;">${m}</div>`), (u += `</div>`), (t += u));
            }
        }
        return t;
    },
    formatComments: async (e, t, i, a) => {
        if (i && i.comments_count && i.id && i.mid) {
            let e = i.id,
                o = `https://m.weibo.cn/comments/hotflow?id=${e}&mid=${i.mid}&max_id_type=0`,
                s = await n.tryGet(o, async () => (await r.get(o, { headers: { Referer: `https://m.weibo.cn/detail/${e}`, ...f.apiHeaders } })).data);
            if (s.data && s.data.data) {
                let e = s.data.data;
                ((t += `<br clear="both" /><div style="clear: both"></div><div style="background: #80808010;border-top:1px solid #80808030;border-bottom:1px solid #80808030;margin:0;padding:5px 20px;">`), (t += `<h3>热门评论</h3>`));
                for (let n of e) {
                    t += `<p style="margin-bottom: 0.5em;margin-top: 0.5em">`;
                    let e = n.user.screen_name;
                    if (
                        (a === `1` && n.blogger_icons && (e += n.blogger_icons[0].name),
                        (t += `<a href="https://weibo.com/${n.user.id}" target="_blank">${e}</a>: ${n.text}`),
                        `pic` in n && (t += `<br><img src="${n.pic.url}">`),
                        n.comments)
                    ) {
                        t += `<blockquote style="border-left:0.2em solid #80808080; margin-left: 0.3em; padding-left: 0.5em; margin-bottom: 0.5em; margin-top: 0.25em">`;
                        for (let e of n.comments) {
                            let n = e.text.match(/<a\s+href="https:\/\/weibo\.cn\/sinaurl\?u=([^"]+)"[^>]*><span class='url-icon'><img[^>]*><\/span><span class="surl-text">(查看图片|评论配图|查看动图)<\/span><\/a>/g);
                            if (n)
                                for (let t of n) {
                                    let n = t.match(/href="https:\/\/weibo\.cn\/sinaurl\?u=([^"]+)"/);
                                    if (n) {
                                        let r = `<img src="${decodeURIComponent(n[1])}" style="width: 1rem; height: 1rem;">`;
                                        e.text = e.text.replaceAll(t, r);
                                    }
                                }
                            t += `<div style="font-size: 0.9em">`;
                            let r = e.user.screen_name;
                            (a === `1` && e.blogger_icons && (r += e.blogger_icons[0].name), (t += `<a href="https://weibo.com/${e.user.id}" target="_blank">${r}</a>: ${e.text}`), (t += `</div>`));
                        }
                        t += `</blockquote>`;
                    }
                    t += `</p>`;
                }
                t += `</div>`;
            }
        }
        return t;
    },
    sinaimgTvax: (() => {
        let e = /(?<=\/\/)wx(?=[1-4]\.sinaimg\.cn\/)/gi,
            t = (t) => t.replaceAll(e, `tvax`),
            n = (e, n) => {
                for (let r of n) e[r] && (e[r] = t(e[r]));
            },
            r = [`description`, `image`],
            i = [`description`];
        return (e) => {
            if (e && (n(e, r), e.item)) for (let t of e.item) n(t, i);
            return e;
        };
    })(),
};
var p = f;
export { p as t };
