import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { t as a } from './config-not-found-DGyG6Tbz.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as o, t as s } from './readable-social--hCfpJhv.mjs';
import { t as c } from './utils-CU9nJ7uH.mjs';
import l from 'node:querystring';
const u = {
    path: `/user_bookmarks/:uid/:routeParams?`,
    categories: [`social-media`],
    example: `/weibo/user_bookmarks/1195230310`,
    parameters: { uid: '用户 id, 博主主页打开控制台执行 `$CONFIG.oid` 获取', routeParams: '额外参数；请参阅上面的说明和表格；特别地，当 `routeParams=1` 时开启微博视频显示' },
    features: { requireConfig: [{ name: `WEIBO_COOKIES`, optional: !0, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`weibo.com/`], target: `/user_bookmarks/:uid` }],
    name: `用户收藏动态`,
    maintainers: [`cztchoice`],
    handler: d,
    url: `weibo.com/`,
    description: `::: warning
  此方案必须使用用户\`Cookie\`进行抓取，只可以获取本人的收藏动态

  因微博 cookies 的过期与更新方案未经验证，部署一次 Cookie 的有效时长未知

  微博用户 Cookie 的配置可参照部署文档
:::`,
};
async function d(u) {
    if (!e.weibo.cookies) throw new a(`Weibo user bookmarks is not available due to the absense of [Weibo Cookies]. Check <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config tutorial</a>`);
    let d = `1`,
        f = `0`,
        p = `0`;
    if (u.req.param(`routeParams`))
        if (u.req.param(`routeParams`) === `1` || u.req.param(`routeParams`) === `0`) d = u.req.param(`routeParams`);
        else {
            let e = l.parse(u.req.param(`routeParams`));
            ((d = s(void 0, o(e.displayVideo), !0) ? `1` : `0`), (f = s(void 0, o(e.displayArticle), !1) ? `1` : `0`), (p = s(void 0, o(e.displayComments), !1) ? `1` : `0`));
        }
    let m = await t.tryGet(
            `weibo:user_bookmarks:login-user`,
            async () => (await r({ method: `get`, url: `https://m.weibo.cn/api/config`, headers: { Referer: `https://m.weibo.cn/`, Cookie: e.weibo.cookies, ...c.apiHeaders } })).data.data.uid,
            e.cache.routeExpire,
            !1
        ),
        h = await t.tryGet(
            `weibo:user_bookmarks:index:${m}`,
            async () => (await r({ method: `get`, url: `https://m.weibo.cn/api/container/getIndex?type=uid&value=${m}`, headers: { Referer: `https://m.weibo.cn/u/${m}`, Cookie: e.weibo.cookies, ...c.apiHeaders } })).data,
            e.cache.routeExpire,
            !1
        ),
        g = `${h.data.userInfo.screen_name} 的 最新收藏时间线`,
        _ = h.data.scheme,
        v = new URL(`http://example.com/${_.replace(`://`, `?`)}`),
        y = new URLSearchParams(v.search).get(`lfid`),
        b = await t.tryGet(
            `weibo:user_bookmarks:cards:${m}`,
            async () => (await r({ method: `get`, url: `https://m.weibo.cn/api/container/getIndex?containerid=${y}&openApp=0`, headers: { Referer: `https://m.weibo.cn/`, Cookie: e.weibo.cookies, ...c.apiHeaders } })).data.data.cards,
            e.cache.routeExpire,
            !1
        ),
        x = await Promise.all(
            b
                .filter((e) => e.mblog)
                .map(async (e) => {
                    let r = `weibo:user_bookmarks:` + e.mblog.bid,
                        a = await t.tryGet(r, () => c.getShowData(m, e.mblog.bid));
                    a?.text
                        ? ((e.mblog.text = a.text),
                          (e.mblog.created_at = n(a.created_at)),
                          (e.mblog.pics = a.pics),
                          e.mblog.retweeted_status && a.retweeted_status && (e.mblog.retweeted_status.created_at = a.retweeted_status.created_at))
                        : (e.mblog.created_at = i(e.mblog.created_at, 8));
                    let o = e.mblog.retweeted_status;
                    if (o?.isLongText) {
                        let n = await t.tryGet(`weibo:retweeted:${o.user.id}:${o.bid}`, () => c.getShowData(o.user.id, o.bid));
                        n !== void 0 && n.text && (e.mblog.retweeted_status.text = n.text);
                    }
                    let s = c.formatExtended(u, e.mblog, m),
                        l = s.description;
                    return (
                        d === `1` && (l = e.mblog.retweeted_status ? c.formatVideo(l, e.mblog.retweeted_status) : c.formatVideo(l, e.mblog)),
                        p === `1` && (l = await c.formatComments(u, l, e.mblog, `0`)),
                        f === `1` && (l = await (e.mblog.retweeted_status ? c.formatArticle(u, l, e.mblog.retweeted_status) : c.formatArticle(u, l, e.mblog))),
                        { ...s, description: l }
                    );
                })
        );
    return c.sinaimgTvax({ title: g, link: `https://weibo.com`, item: x });
}
export { u as route };
