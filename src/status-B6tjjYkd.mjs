import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { i, n as a, t as o } from './readable-social--hCfpJhv.mjs';
import s from 'node:querystring';
const c = {
        path: `/people/:userid/status/:routeParams?`,
        categories: [`social-media`],
        view: r.SocialMedia,
        example: `/douban/people/75118396/status`,
        parameters: { userid: `整数型用户 id`, routeParams: `额外参数；见下` },
        name: `用户广播`,
        maintainers: [`alfredcai`],
        handler: p,
        description: `
::: tip
-   **目前只支持整数型 id**
-   字母型的 id，可以通过头像图片链接来找到其整数型 id，图片命名规则\`ul[userid]-*.jpg\`或\`u[userid]-*.jpg\`，即取文件名中间的数字
-   例如：用户 id: \`MovieL\`他的头像图片链接：\`https://img1.doubanio.com/icon/ul1128221-98.jpg\`他的整数型 id: \`1128221\`
:::

对于豆瓣用户广播内容，在 \`routeParams\` 参数中以 query string 格式设置如下选项可以控制输出的样式

| 键                         | 含义                                                           | 接受的值       | 默认值 |
| -------------------------- | -------------------------------------------------------------- | -------------- | ------ |
| readable                   | 是否开启细节排版可读性优化                                     | 0/1/true/false | false  |
| authorNameBold             | 是否加粗作者名字                                               | 0/1/true/false | false  |
| showAuthorInTitle          | 是否在标题处显示作者                                           | 0/1/true/false | true   |
| showAuthorInDesc           | 是否在正文处显示作者                                           | 0/1/true/false | false  |
| showAuthorAvatarInDesc     | 是否在正文处显示作者头像（若阅读器会提取正文图片，不建议开启） | 0/1/true/false | false  |
| showEmojiForRetweet        | 显示 “🔁” 取代 “Fw”（转发）                                    | 0/1/true/false | false  |
| showRetweetTextInTitle     | 在标题出显示转发评论（置为 false 则在标题只显示被转发的广播）  | 0/1/true/false | false  |
| addLinkForPics             | 为图片添加可点击的链接                                         | 0/1/true/false | false  |
| showTimestampInDescription | 在正文处显示广播的时间戳                                       | 0/1/true/false | false  |
| showComments               | 在正文处显示评论                                               | 0/1/true/false | false  |
| widthOfPics                | 广播配图宽（生效取决于阅读器）                                 | 不指定 / 数字  | 不指定 |
| heightOfPics               | 广播配图高（生效取决于阅读器）                                 | 不指定 / 数字  | 不指定 |
| sizeOfAuthorAvatar         | 作者头像大小                                                   | 数字           | 48     |

  指定更多与默认值不同的参数选项可以改善 RSS 的可读性，如

  [https://rsshub.app/douban/people/113894409/status/readable=1&authorNameBold=1&showAuthorInTitle=1&showAuthorInDesc=1&showAuthorAvatarInDesc=1&showEmojiForRetweet=1&showRetweetTextInTitle=1&addLinkForPics=1&showTimestampInDescription=1&showComments=1&widthOfPics=100](https://rsshub.app/douban/people/113894409/status/readable=1&authorNameBold=1&showAuthorInTitle=1&showAuthorInDesc=1&showAuthorAvatarInDesc=1&showEmojiForRetweet=1&showRetweetTextInTitle=1&addLinkForPics=1&showTimestampInDescription=1&showComments=1&widthOfPics=100)

  的效果为

  <img loading="lazy" src="/img/readable-douban.png" alt="豆瓣读书的可读豆瓣广播 RSS" />`,
    },
    l = { Referer: `https://m.douban.com/` };
function u(e) {
    let t = { isFixSuccess: !0, why: `` },
        n = new Date();
    return (
        e
            ? e.deleted
                ? (t = { isFixSuccess: !1, why: e.msg ?? `[ 内容已被删除 ]` })
                : e.hidden
                  ? (t = { isFixSuccess: !1, why: e.msg ?? `[ 内容已被设为不可见 ]` })
                  : e.text === void 0 || e.text === null || !e.uri
                    ? (t = { isFixSuccess: !1, why: e.msg ?? `[ 内容已不可访问 ]` })
                    : ((e.author ||= {}),
                      e.author.url || (e.author.url = `https://www.douban.com/people/1/`),
                      e.author.name || (e.author.name = `[作者不可见]`),
                      e.author.avatar || (e.author.avatar = `https://img1.doubanio.com/icon/user_normal.jpg`),
                      (e.create_time ||= n.toLocaleString()),
                      (e.entities ||= []))
            : ((t = { isFixSuccess: !1, why: `[ 无内容 ]` }), (e = {})),
        (e.sharing_url &&= e.sharing_url.split(`&`)[0]),
        t.isFixSuccess || ((e.sharing_url = `https://www.douban.com?rsshub_failed=` + n.getTime().toString()), (e.create_time ||= n.toLocaleString())),
        t
    );
}
function d(e, t, n = {}, r = []) {
    let c = s.parse(e.req.param(`routeParams`));
    n = {
        readable: o(n.readable, a(c.readable), !1),
        authorNameBold: o(n.authorNameBold, a(c.authorNameBold), !1),
        showAuthorInTitle: o(n.showAuthorInTitle, a(c.showAuthorInTitle), !0),
        showAuthorInDesc: o(n.showAuthorInDesc, a(c.showAuthorInDesc), !1),
        showAuthorAvatarInDesc: o(n.showAuthorAvatarInDesc, a(c.showAuthorAvatarInDesc), !1),
        showEmojiForRetweet: o(n.showEmojiForRetweet, a(c.showEmojiForRetweet), !1),
        showRetweetTextInTitle: o(n.showRetweetTextInTitle, a(c.showRetweetTextInTitle), !1),
        addLinkForPics: o(n.addLinkForPics, a(c.addLinkForPics), !1),
        showTimestampInDescription: o(n.showTimestampInDescription, a(c.showTimestampInDescription), !1),
        showComments: o(n.showComments, a(c.showComments), !1),
        showColonInDesc: o(n.showColonInDesc, null, !1),
        widthOfPics: o(n.widthOfPics, i(c.widthOfPics), -1),
        heightOfPics: o(n.heightOfPics, i(c.heightOfPics), -1),
        sizeOfAuthorAvatar: o(n.sizeOfAuthorAvatar, i(c.sizeOfAuthorAvatar), 48),
    };
    let {
            readable: l,
            authorNameBold: f,
            showAuthorInTitle: p,
            showAuthorInDesc: m,
            showAuthorAvatarInDesc: h,
            showEmojiForRetweet: g,
            showRetweetTextInTitle: _,
            addLinkForPics: v,
            showTimestampInDescription: y,
            showComments: b,
            showColonInDesc: x,
            widthOfPics: S,
            heightOfPics: C,
            sizeOfAuthorAvatar: w,
        } = n,
        { status: T, comments: E } = t,
        { isFixSuccess: D, why: O } = u(T);
    if (!D) return { title: O, description: O };
    let k = ``,
        A = ``,
        j,
        M,
        { isFixSuccess: N, why: P } = u(T.reshared_status);
    if (
        (T.activity === `转发`
            ? N
                ? ((j = `转发 `),
                  l && (j += `<a href="${T.reshared_status.author.url}" target="_blank" rel="noopener noreferrer">`),
                  f && (j += `<strong>`),
                  (j += T.reshared_status.author.name),
                  f && (j += `</strong>`),
                  l && (j += `</a>`),
                  (j += ` 的广播`),
                  (M = `转发 ${T.reshared_status.author.name} 的广播`))
                : ((j = `转发广播`), (M = `转发广播`))
            : ((j = T.activity), (M = T.activity)),
        m)
    ) {
        let e = ``;
        (l && (e += `<a href="${T.author.url}" target="_blank" rel="noopener noreferrer">`),
            h && (e += `<img width="${w}" height="${w}" src="${T.author.avatar}" ${l ? `hspace="8" vspace="8" align="left"` : ``} />`),
            f && (e += `<strong>`),
            (e += T.author.name),
            f && (e += `</strong>`),
            l && (e += `</a>`),
            (e += `&ensp;`),
            (k += e + j + (x ? `: ` : ``)));
    }
    (p && (A += `${T.author.name} `), (A += `${M}: `), y && (k += `<br><small>${T.create_time}</small><br>`));
    let F = T.text,
        I = 0,
        L = [];
    for (let e of T.entities) (L.push(F.slice(I, e.start), `<a href="${e.uri.replace(`douban://douban.com`, `https://www.douban.com/doubanapp/dispatch?uri=`)}" target="_blank" rel="noopener noreferrer">${e.title}</a>`), (I = e.end));
    if (
        (L.push(F.slice(I)),
        (F = L.join(``)),
        (k += F),
        T.card && (A += T.card.rating ? `《${T.card.title}》` : `「${T.card.title}」`),
        (T.activity !== `转发` || _) &&
            (A += T.text.replace(
                `
`,
                ``
            )),
        T.images && T.images.length)
    ) {
        k += l ? `<br clear="both" /><div style="clear: both"></div>` : `<br>`;
        let e = ``;
        for (let t of T.images) t.large && t.large.url && (e += `<img width="0" height="0" hidden="true" src="${t.large.url}">`);
        r.push(e);
        for (let e of T.images) {
            if (!(e.large && e.large.url)) {
                k += `[无法显示的图片]`;
                continue;
            }
            (v && (k += `<a href="` + e.large.url + `" target="_blank" rel="noopener noreferrer">`), l || (k += `<br>`));
            let t = ``;
            ((k += `<img `),
                S >= 0 && ((k += ` width="${S}"`), (t += `width: ${S}px;`)),
                C >= 0 && ((k += `height="${C}" `), (t += `height: ${C}px;`)),
                (k += ` style="${t}" ` + (l ? `vspace="8" hspace="4" ` : ``) + ` src="` + e.large.url + `">`),
                v && (k += `</a>`));
        }
    }
    if (T.video_info) {
        k += l ? `<br clear="both" /><div style="clear: both"></div>` : `<br>`;
        let e = T.video_info.cover_url,
            t = T.video_info.video_url;
        t &&
            (k = `
                ${k}
                <video
                    src="${t}"
                    ${e ? `poster="${e}"` : ``}
                >
                </video>
            `);
    }
    if (T.parent_status) {
        ((k += g ? ` 🔁 ` : ` Fw: `), _ && (A += g ? ` 🔁 ` : ` Fw: `));
        let { isFixSuccess: e, why: t } = u(T.parent_status);
        if (e) {
            let e = ``;
            (l && (e += `<a href="${T.parent_status.author.url}">`),
                f && (e += `<strong>`),
                (e += T.parent_status.author.name),
                f && (e += `</strong>`),
                l && (e += `</a>`),
                (e += `:&ensp;`),
                (k += e + T.parent_status.text),
                _ && (A += T.parent_status.author.name + `: ` + T.parent_status.text));
        } else ((k += t), _ && (A += t));
    }
    if (T.card) {
        let e;
        (T.card.image && (T.card.image.large || T.card.image.normal) && (e = T.card.image.large || T.card.image.normal),
            (k += l ? `<br clear="both" /><div style="clear: both"></div><blockquote style="background: #80808010;border-top:1px solid #80808030;border-bottom:1px solid #80808030;margin:0;padding:5px 20px;">` : `<br>`),
            e && (k += `<img src="${e.url}" ${l ? `vspace="0" hspace="12" align="left" height="75" style="height: 75px;"` : ``} />`),
            T.card.title || (T.card.title = `[空]`),
            T.card.subtitle || (T.card.subtitle = `[空]`),
            T.card.url || (T.card.url = `https://www.douban.com`),
            (k += `<a href="${T.card.url}" target="_blank" rel="noopener noreferrer"><strong>${T.card.title}</strong><br><small>${T.card.subtitle}</small>`),
            T.card.rating && (k += `<br><small>评分：${T.card.rating.value}</small>`),
            (k += `</a>`),
            l && (k += `<br clear="both" /><div style="clear: both"></div></blockquote>`));
    }
    if (T.video_card) {
        k += l ? `<br clear="both" /><div style="clear: both"></div><blockquote style="background: #80808010;border-top:1px solid #80808030;border-bottom:1px solid #80808030;margin:0;padding:5px 20px;">` : `<br>`;
        let e = T.video_card.video_info && T.video_card.video_info.cover_url,
            t = T.video_card.video_info && T.video_card.video_info.video_url;
        (T.video_card.url || (T.video_card.url = `https://www.douban.com`),
            (k += `${t ? `<video src="${t}" ${e ? `poster="${e}"` : ``}></video>` : ``}<br>${T.video_card.title ? `<a href="${T.video_card.url}">${T.video_card.title}</a>` : ``}`),
            l && (k += `</blockquote>`));
    }
    if (T.reshared_status)
        if (
            ((k += l ? `<br clear="both" /><div style="clear: both"></div><blockquote style="background: #80808010;border-top:1px solid #80808030;border-bottom:1px solid #80808030;margin:0;padding:5px 20px;">` : `<br>`),
            _ && (A += ` | `),
            N)
        ) {
            ((k += d(e, { status: T.reshared_status, comments: [] }, { showAuthorInDesc: !0, showAuthorAvatarInDesc: !1, showComments: !1, showColonInDesc: !0 }, r).description), (A += T.reshared_status.text));
            let t = T.reshared_status.uri.replace(`douban://douban.com`, `https://www.douban.com/doubanapp/dispatch?uri=`);
            l && (k += `<br><small>原动态：<a href="${t}" target="_blank" rel="noopener noreferrer">${t}</a></small><br clear="both" /><div style="clear: both"></div></blockquote>`);
        } else ((k += P), (A += P));
    if (b) {
        E.length > 0 && (k += `<hr>`);
        for (let e of E) k += `<br>${e.text} - <a href="${e.author.url}" target="_blank" rel="noopener noreferrer">${e.author.name}</a>`;
    }
    return (
        m && h && (k = r.join(``) + k),
        (k = k.trim().replaceAll(
            `
`,
            `<br>`
        )),
        { title: A, description: k }
    );
}
async function f(e) {
    let r = `https://m.douban.com/rexxar/api/v2/status/`;
    await Promise.all(
        e.map(async (e) => {
            let i = r + e.status.id,
                a = await t.get(i);
            if (a) e.status.text = a;
            else {
                let {
                    data: { text: r },
                } = await n({ url: i, headers: l });
                (t.set(i, r), (e.status.text = r));
            }
            if (e.status.reshared_status) {
                if (((i = r + e.status.reshared_status.id), (a = await t.get(i)), a)) e.status.reshared_status.text = a;
                else if (u(e.status.reshared_status).isFixSuccess)
                    try {
                        let {
                            data: { text: r },
                        } = await n({ url: i, headers: l });
                        (t.set(i, r), (e.status.reshared_status.text = r));
                    } catch {
                        e.status.reshared_status.text += `
[获取原动态失败]`;
                    }
            }
        })
    );
}
async function p(r) {
    let i = r.req.param(`userid`),
        a = `https://m.douban.com/rexxar/api/v2/status/user_timeline/${i}`,
        o = await t.tryGet(a, async () => (await n({ url: a, headers: l })).data.items, e.cache.routeExpire, !1);
    return (
        o && (await f(o)),
        {
            title: `豆瓣广播 - ${o ? o[0].status.author.name : i}`,
            link: `https://m.douban.com/people/${i}/statuses`,
            item:
                o &&
                o
                    .filter((e) => !e.deleted)
                    .map((e) => {
                        let t = d(r, e);
                        return { title: t.title, link: e.status.sharing_url.replace(/\?_i=(.*)/, ``), pubDate: new Date(Date.parse(e.status.create_time + ` GMT+0800`)).toUTCString(), description: t.description };
                    }),
        }
    );
}
export { c as route };
