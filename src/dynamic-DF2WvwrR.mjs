import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { i as n } from './helpers-C9wXLK0V.mjs';
import { t as r } from './parse-date-DjdQS_Nt.mjs';
import { t as i } from './got-CKQ7C9HX.mjs';
import { t as a } from './types-Bl_lnefZ.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as o, t as s } from './readable-social--hCfpJhv.mjs';
import { n as c, r as l, t as u } from './utils-Bu8-ZFdB.mjs';
import { t as d } from './cache-BV7o58Cb.mjs';
import { t as f } from './captcha-BgQBnnqm.mjs';
import p from 'json-bigint';
const m = {
        path: `/user/dynamic/:uid/:routeParams?`,
        categories: [`social-media`],
        view: a.SocialMedia,
        example: `/bilibili/user/dynamic/2267573`,
        parameters: {
            uid: `用户 id, 可在 UP 主主页中找到`,
            routeParams: `
| 键         | 含义                              | 接受的值       | 默认值 |
| ---------- | --------------------------------- | -------------- | ------ |
| showEmoji  | 显示或隐藏表情图片                | 0/1/true/false | false  |
| embed      | 默认开启内嵌视频                  | 0/1/true/false |  true  |
| useAvid    | 视频链接使用 AV 号 (默认为 BV 号) | 0/1/true/false | false  |
| directLink | 使用内容直链                      | 0/1/true/false | false  |
| hideGoods  | 隐藏带货动态                      | 0/1/true/false | false  |
| offset     | 偏移状态                         | string         | ""  |

用例：\`/bilibili/user/dynamic/2267573/showEmoji=1&embed=0&useAvid=1\``,
        },
        features: {
            requireConfig: [
                {
                    name: `BILIBILI_COOKIE_*`,
                    optional: !0,
                    description:
                        '如果没有此配置，那么必须开启 puppeteer 支持；BILIBILI_COOKIE_{uid}: 用于用户关注动态系列路由，对应 uid 的 b 站用户登录后的 Cookie 值，`{uid}` 替换为 uid，如 `BILIBILI_COOKIE_2267573`，获取方式：\n1.  打开 [https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=0&type=8](https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=0&type=8)\n2.  打开控制台，切换到 Network 面板，刷新\n3.  点击 dynamic_new 请求，找到 Cookie\n4.  视频和专栏，UP 主粉丝及关注只要求 `SESSDATA` 字段，动态需复制整段 Cookie',
                },
            ],
            requirePuppeteer: !1,
            antiCrawler: !1,
            supportBT: !1,
            supportPodcast: !1,
            supportScihub: !1,
        },
        radar: [{ source: [`space.bilibili.com/:uid`], target: `/user/dynamic/:uid` }],
        name: `UP 主动态`,
        maintainers: [`DIYgod`, `zytomorrow`, `CaoMeiYouRen`, `JimenezLi`],
        handler: C,
    },
    h = (e) => {
        let t = e.module_dynamic?.major;
        return t
            ? t.none
                ? t.none.tips
                : t.courses
                  ? `${t.courses?.title} - ${t.courses?.sub_title}`
                  : t.live_rcmd?.content
                    ? JSON.parse(t.live_rcmd.content)?.live_play_info?.title
                    : t[t.type.replace(`MAJOR_TYPE_`, ``).toLowerCase()]?.title
            : ``;
    },
    g = (e) => {
        let t = ``;
        e.module_dynamic?.desc?.text && (t += e.module_dynamic.desc.text);
        let n = e.module_dynamic?.major;
        if (!n) return t;
        if (n?.common?.desc) return ((t += t ? `<br>//转发自: ${n.common.desc}` : n.common.desc), t);
        if (n?.live) return `${n.live?.desc_first}<br>${n.live?.desc_second}`;
        if (n.live_rcmd?.content) {
            let e = JSON.parse(n.live_rcmd.content)?.live_play_info;
            return `${e?.area_name}·${e?.watched_show?.text_large}`;
        }
        return n?.opus ? n?.opus?.summary?.text : n[n.type.replace(`MAJOR_TYPE_`, ``).toLowerCase()]?.desc;
    },
    _ = (e) => e && h(e),
    v = (e) => e && g(e),
    y = (e) => e?.module_author?.name,
    b = (e, t = !0) => {
        if (!t) return ``;
        let n = e?.module_dynamic?.major?.archive?.aid,
            r = e?.module_dynamic?.major?.archive?.bvid;
        return n === void 0 && r === void 0 ? `` : l.renderUGCDescription(t, ``, ``, n, void 0, r);
    },
    x = (e) => {
        let t = [],
            n = e?.module_dynamic?.major;
        if (!n) return ``;
        (n.opus?.pics?.length && t.push(...n.opus.pics.map((e) => ({ url: e.url, width: e.width, height: e.height }))),
            n.article?.covers?.length && t.push(...n.article.covers.map((e) => ({ url: e }))),
            n.draw?.items?.length && t.push(...n.draw.items.map((e) => ({ url: e.src, width: e.width, height: e.height }))),
            n.live_rcmd?.content && t.push({ url: JSON.parse(n.live_rcmd.content)?.live_play_info?.cover }));
        let r = n.type.replace(`MAJOR_TYPE_`, ``).toLowerCase();
        return (
            n[r]?.cover && t.push({ url: n[r]?.cover }),
            t
                .filter(Boolean)
                .map((e) => `<img src="${e.url}" ${e.width ? `width="${e.width}"` : ``} ${e.height ? `height="${e.height}"` : ``}>`)
                .join(``)
        );
    },
    S = (e, t = !1) => {
        let n = e?.modules;
        if (!n) return null;
        let r = ``,
            i = ``,
            a,
            o = n.module_dynamic?.major;
        if (!o) return null;
        switch (o?.type) {
            case `MAJOR_TYPE_UGC_SEASON`:
                ((r = o?.ugc_season?.jump_url || ``), (i = `合集地址：<a href=${r}>${r}</a>`));
                break;
            case `MAJOR_TYPE_ARTICLE`:
                ((r = `https://www.bilibili.com/read/cv${o?.article?.id}`), (i = `专栏地址：<a href=${r}>${r}</a>`));
                break;
            case `MAJOR_TYPE_ARCHIVE`: {
                let e = o?.archive;
                ((r = `https://www.bilibili.com/video/${t ? `av${e?.aid}` : e?.bvid}`), (i = `视频地址：<a href=${r}>${r}</a>`), (a = c(e?.bvid)));
                break;
            }
            case `MAJOR_TYPE_COMMON`:
                ((r = o?.common?.jump_url || ``), (i = `地址：<a href=${r}>${r}</a>`));
                break;
            case `MAJOR_TYPE_OPUS`:
                e?.type === `DYNAMIC_TYPE_ARTICLE`
                    ? ((r = `https:${o?.opus?.jump_url}`), (i = `专栏地址：<a href=${r}>${r}</a>`))
                    : e?.type === `DYNAMIC_TYPE_DRAW` && ((r = `https:${o?.opus?.jump_url}`), (i = `图文地址：<a href=${r}>${r}</a>`));
                break;
            case `MAJOR_TYPE_PGC`: {
                let e = o?.pgc;
                ((r = `https://www.bilibili.com/bangumi/play/ep${e?.epid}&season_id=${e?.season_id}`), (i = `剧集地址：<a href=${r}>${r}</a>`));
                break;
            }
            case `MAJOR_TYPE_COURSES`:
                ((r = `https://www.bilibili.com/cheese/play/ss${o?.courses?.id}`), (i = `课程地址：<a href=${r}>${r}</a>`));
                break;
            case `MAJOR_TYPE_MUSIC`:
                ((r = `https://www.bilibili.com/audio/au${o?.music?.id}`), (i = `音频地址：<a href=${r}>${r}</a>`));
                break;
            case `MAJOR_TYPE_LIVE`:
                ((r = `https://live.bilibili.com/${o?.live?.id}`), (i = `直播间地址：<a href=${r}>${r}</a>`));
                break;
            case `MAJOR_TYPE_LIVE_RCMD`: {
                let e = JSON.parse(o.live_rcmd?.content || `{}`)?.live_play_info;
                ((r = `https://live.bilibili.com/${e?.room_id}`), (a = u(e?.room_id)), (i = `直播间地址：<a href=${r}>${r}</a>`));
                break;
            }
            default:
                return null;
        }
        return { url: r, text: i, videoPageUrl: a };
    };
async function C(a) {
    let c = a.req.query(`format`) === `json`,
        u = a.req.param(`uid`),
        m = Object.fromEntries(new URLSearchParams(a.req.param(`routeParams`))),
        C = s(void 0, o(m.showEmoji), !1),
        w = s(void 0, o(m.embed), !1),
        T = a.req.query(`mode`) === `fulltext`,
        E = s(void 0, m.offset, ``),
        D = s(void 0, o(m.useAvid), !1),
        O = s(void 0, o(m.directLink), !1),
        k = s(void 0, o(m.hideGoods), !1),
        A = async (e) => {
            let t = await i(
                `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?${l.addDmVerifyInfo(`offset=${E}&host_mid=${u}&platform=web&features=itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote`, l.getDmImgList())}`,
                { headers: { Referer: `https://space.bilibili.com/${u}/`, Cookie: e } }
            );
            return p.parse(t.body);
        },
        j;
    if (((j = await A(await d.getCookie())), j?.code === -352 && ((j = await A(await d.getCookie(!0))), j?.code === -352))) throw (t.set(`bili-cookie`, ``), new f(`遇到源站风控校验，请稍后再试`));
    let M = j?.data?.items,
        N = M[0]?.modules?.module_author?.name,
        P = M[0]?.modules?.module_author?.face;
    if (!P || !N) {
        let e = await d.getUsernameAndFaceFromUID(u);
        ((N = e[0] || M[0]?.modules?.module_author?.name), (P = e[1] || M[0]?.modules?.module_author?.face));
    } else (t.set(`bili-username-from-uid-${u}`, N), t.set(`bili-userface-from-uid-${u}`, P));
    let F = await Promise.all(
        M.filter((e) => (k ? e.modules.module_dynamic?.additional?.type !== `ADDITIONAL_TYPE_GOODS` : !0)).map(async (t) => {
            let i = t.modules,
                a = t?.orig?.modules,
                o = i?.module_dynamic?.major?.archive?.bvid,
                s = ``;
            t.id_str && (s = `https://t.bilibili.com/${t.id_str}`);
            let l = g(i) || ``,
                f = l,
                p = h(i),
                m = [];
            if (i.module_dynamic?.desc?.rich_text_nodes?.length) {
                let e = i.module_dynamic.desc.rich_text_nodes;
                for (let t of e) {
                    if (C && t?.emoji) {
                        let e = t.emoji;
                        f = f.replaceAll(
                            e.text,
                            `<img alt="${e.text}" src="${e.icon_url}" style="margin: -1px 1px 0px; display: inline-block; width: 20px; height: 20px; vertical-align: text-bottom;" title="" referrerpolicy="no-referrer">`
                        );
                    }
                    if (t?.pics?.length) {
                        let { pics: e, text: n } = t;
                        f = f.replaceAll(
                            n,
                            e
                                .map(
                                    (e) =>
                                        `<img alt="${n}" src="${e.src}" style="margin: 0px 0px 0px; display: inline-block; width: ${e.width}px; height: ${e.height}px; vertical-align: text-bottom;" title="" referrerpolicy="no-referrer">`
                                )
                                .join(`<br>`)
                        );
                    }
                    t?.type === `RICH_TEXT_NODE_TYPE_TOPIC` && m.push(t.text.match(/#(\S+)#/)?.[1] || ``);
                }
            }
            if (i.module_dynamic?.major?.opus?.summary?.rich_text_nodes?.length) {
                let e = i.module_dynamic.major.opus.summary.rich_text_nodes;
                for (let t of e) t?.type === `RICH_TEXT_NODE_TYPE_TOPIC` && m.push(t.text.match(/#(\S+)#/)?.[1] || ``);
            }
            if ((i.module_dynamic?.topic?.name && m.push(i.module_dynamic.topic.name), t.type === `DYNAMIC_TYPE_ARTICLE` && T)) {
                let e = i.module_dynamic?.major?.opus?.jump_url?.match?.(/cv(\d+)/)?.[0];
                e && (f = (await d.getArticleDataFromCvid(e, u)).description || ``);
            }
            let E = S(t, D),
                k = E?.text;
            E && O && (s = E.url);
            let A = S(t?.orig, D),
                j = A?.text;
            A && O && (s = A.url);
            let M = ``,
                P = y(a),
                F = _(a),
                I = v(a);
            (P && (M += `//转发自: @${y(a)}: `),
                F && (M += F),
                I && (M += `<br>${I}`),
                (f = f
                    .replaceAll(
                        `\r
`,
                        `<br>`
                    )
                    .replaceAll(
                        `
`,
                        `<br>`
                    )),
                (M = M.replaceAll(
                    `\r
`,
                    `<br>`
                ).replaceAll(
                    `
`,
                    `<br>`
                )));
            let L = [p, f, b(i, w), x(i), k, M, b(a, w), x(a), j]
                    .map((e) => e?.trim())
                    .filter(Boolean)
                    .join(`<br>`),
                R = c && !e.bilibili.excludeSubtitles && o ? await d.getVideoSubtitleAttachment(o) : [];
            return {
                title: p || l,
                description: L,
                pubDate: i.module_author?.pub_ts ? r(i.module_author.pub_ts, `X`) : void 0,
                link: s,
                author: N,
                category: m.length ? [...new Set(m)] : void 0,
                attachments:
                    E?.videoPageUrl || A?.videoPageUrl
                        ? [{ url: E?.videoPageUrl || A?.videoPageUrl, mime_type: `text/html`, duration_in_seconds: i.module_dynamic?.major?.archive?.duration_text ? n(i.module_dynamic.major.archive.duration_text) : void 0 }, ...R]
                        : void 0,
            };
        })
    );
    return { title: `${N} 的 bilibili 动态`, link: `https://space.bilibili.com/${u}/dynamic`, description: `${N} 的 bilibili 动态`, image: P, logo: P, icon: P, item: F };
}
export { m as route };
