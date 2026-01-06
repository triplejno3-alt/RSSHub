import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { t as a } from './types-Bl_lnefZ.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as o, t as s } from './readable-social--hCfpJhv.mjs';
import { t as c } from './utils-CU9nJ7uH.mjs';
import l from 'node:querystring';
const u = {
    path: `/user/:uid/:routeParams?`,
    categories: [`social-media`],
    view: a.SocialMedia,
    example: `/weibo/user/1195230310`,
    parameters: { uid: '用户 id, 博主主页打开控制台执行 `$CONFIG.oid` 获取', routeParams: '额外参数；请参阅上面的说明和表格；特别地，当 `routeParams=1` 时开启微博视频显示' },
    features: { requireConfig: [{ name: `WEIBO_COOKIES`, optional: !0, description: `` }], requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [
        { source: [`m.weibo.cn/u/:uid`, `m.weibo.cn/profile/:uid`], target: `/user/:uid` },
        { source: [`weibo.com/u/:uid`], target: `/user/:uid` },
        { source: [`www.weibo.com/u/:uid`], target: `/user/:uid` },
    ],
    name: `博主`,
    maintainers: [`DIYgod`, `iplusx`, `Rongronggg9`, `Konano`],
    handler: d,
    description: `::: warning
  部分博主仅登录可见，未提供 Cookie 的情况下不支持订阅，可以通过打开 \`https://m.weibo.cn/u/:uid\` 验证
:::`,
};
async function d(a) {
    let u = a.req.param(`uid`),
        d = `1`,
        f = `0`,
        p = `0`,
        m = `1`,
        h = `0`;
    if (a.req.param(`routeParams`))
        if (a.req.param(`routeParams`) === `1` || a.req.param(`routeParams`) === `0`) d = a.req.param(`routeParams`);
        else {
            let e = l.parse(a.req.param(`routeParams`));
            ((d = s(void 0, o(e.displayVideo), !0) ? `1` : `0`),
                (f = s(void 0, o(e.displayArticle), !1) ? `1` : `0`),
                (p = s(void 0, o(e.displayComments), !1) ? `1` : `0`),
                (m = s(void 0, o(e.showRetweeted), !1) ? `1` : `0`),
                (h = s(void 0, o(e.showBloggerIcons), !1) ? `1` : `0`));
        }
    let g = await c.tryWithCookies((n, i) =>
            t.tryGet(
                `weibo:user:index:${u}`,
                async () => {
                    let e = await r({ method: `get`, url: `https://m.weibo.cn/api/container/getIndex?type=uid&value=${u}`, headers: { Referer: `https://m.weibo.cn/u/${u}`, Cookie: n, ...c.apiHeaders } });
                    return (i(e), e.data);
                },
                e.cache.routeExpire,
                !1
            )
        ),
        _ = g.data.userInfo.screen_name,
        v = g.data.userInfo.description,
        y = g.data.userInfo.profile_image_url,
        b = g.data.tabsInfo.tabs.find((e) => e.tab_type === `weibo`).containerid,
        x = await c.tryWithCookies((n, i) =>
            t.tryGet(
                `weibo:user:cards:${u}:${b}`,
                async () => {
                    let e = await r({ method: `get`, url: `https://m.weibo.cn/api/container/getIndex?type=uid&value=${u}&containerid=${b}`, headers: { Referer: `https://m.weibo.cn/u/${u}`, Cookie: n, ...c.apiHeaders } });
                    return (i(e), e.data.data.cards);
                },
                e.cache.routeExpire,
                !1
            )
        ),
        S = await Promise.all(
            x
                .filter((e) => !(e.mblog === void 0 || (m === `0` && e.mblog.retweeted_status)))
                .map(async (e) => {
                    let { bid: r } = e.mblog,
                        { retweeted_status: o, created_at: s } = e.mblog;
                    r === `` && ((r = new URL(e.scheme).searchParams.get(`mblogid`)), (e.mblog.bid = r));
                    let l = `weibo:user:${r}`,
                        m = await t.tryGet(l, () => c.getShowData(u, r));
                    m && m.text ? ((e.mblog.text = m.text), (e.mblog.created_at = n(m.created_at)), (e.mblog.pics = m.pics), o && m.retweeted_status && (o.created_at = m.retweeted_status.created_at)) : (e.mblog.created_at = i(s, 8));
                    let g = o;
                    if (g && g.isLongText) {
                        let e = await t.tryGet(`weibo:retweeted:${g.user.id}:${g.bid}`, () => c.getShowData(g.user.id, g.bid));
                        e !== void 0 && e.text && (o.text = e.text);
                    }
                    let _ = c.formatExtended(a, e.mblog, u),
                        v = _.description;
                    return (
                        d === `1` && (v = o ? c.formatVideo(v, o) : c.formatVideo(v, e.mblog)),
                        p === `1` && (v = await c.formatComments(a, v, e.mblog, h)),
                        f === `1` && (v = await (o ? c.formatArticle(a, v, o) : c.formatArticle(a, v, e.mblog))),
                        { ..._, description: v, isPinned: e.profile_type_id?.startsWith(`proweibotop`) }
                    );
                })
        ),
        C = S.filter((e) => e.isPinned),
        w = S.filter((e) => !e.isPinned);
    if (C.length > 0 && w.length > 0) {
        let e = Math.min(...w.map((e) => e.pubDate).filter(Boolean));
        S = w;
        for (let t of C) t.pubDate > e && S.unshift(t);
    }
    return c.sinaimgTvax({ title: `${_}的微博`, link: `https://weibo.com/${u}/`, description: v, image: y, item: S, allowEmpty: !0 });
}
export { u as route };
