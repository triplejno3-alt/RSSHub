import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as i, t as a } from './readable-social--hCfpJhv.mjs';
import { t as o } from './utils-CU9nJ7uH.mjs';
import s from 'node:querystring';
const c = {
    path: `/timeline/:uid/:feature?/:routeParams?`,
    categories: [`social-media`],
    example: `/weibo/timeline/3306934123`,
    parameters: { uid: `用户的uid`, feature: `过滤类型ID，0：全部、1：原创、2：图片、3：视频、4：音乐，默认为0。`, routeParams: `额外参数；请参阅上面的说明和表格` },
    features: {
        requireConfig: [
            { name: `WEIBO_APP_KEY`, description: `` },
            { name: `WEIBO_REDIRECT_URL`, description: `` },
        ],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `个人时间线`,
    maintainers: [`zytomorrow`, `DIYgod`, `Rongronggg9`],
    handler: l,
    description: `::: warning
  需要对应用户打开页面进行授权生成 token 才能生成内容

  自部署需要申请并配置微博 key，具体见部署文档
:::`,
};
async function l(c) {
    let l = c.req.param(`uid`),
        u = c.req.param(`feature`) || 0,
        d = c.req.param(`routeParams`) || void 0,
        f = await t.get(`weibotimelineuid` + l, !1),
        p = `1`,
        m = `0`,
        h = `0`,
        g = `0`;
    if (d)
        if (d === `1` || d === `0`) p = d;
        else {
            let e = s.parse(c.req.param(`routeParams`));
            ((p = a(void 0, i(e.displayVideo), !0) ? `1` : `0`), (m = a(void 0, i(e.displayArticle), !1) ? `1` : `0`), (h = a(void 0, i(e.displayComments), !1) ? `1` : `0`), (g = a(void 0, i(e.showBloggerIcons), !1) ? `1` : `0`));
        }
    if (f) {
        let i = await t.tryGet(
                `weibo:timeline:userInfo:${l}`,
                async () => (await r({ method: `get`, url: `https://m.weibo.cn/api/container/getIndex?type=uid&value=${l}`, headers: { Referer: `https://m.weibo.cn/` } })).data.data.userInfo,
                e.cache.routeExpire,
                !1
            ),
            a = i.screen_name,
            s = i.description,
            _ = i.profile_image_url,
            v = await t.tryGet(`weibo:timeline:${l}`, async () => (await r(`https://api.weibo.com/2/statuses/home_timeline.json?access_token=${f}&count=100&feature=${u}`)).data, e.cache.routeExpire, !1);
        if (v.error !== void 0) {
            let { app_key: t = ``, redirect_url: n = c.req.origin + `/weibo/timeline/0` } = e.weibo;
            ((c.status = 302), c.set({ 'Cache-Control': `no-cache` }), c.set(`redirect`, `https://api.weibo.com/oauth2/authorize?client_id=${t}&redirect_uri=${n}${d ? `&state=${d}` : ``}`));
            return;
        }
        let y = await Promise.all(
            v.statuses.map(async (e) => {
                let r = `weibotimelineurl${e.user.id}${e.id}`,
                    i = await t.tryGet(r, () => o.getShowData(l, e.id)),
                    a = i?.text;
                a && (e = i);
                let s = e.retweeted_status;
                if (s?.isLongText) {
                    let n = await t.tryGet(`weibo:retweeted:${s.user.id}:${s.id}`, () => o.getShowData(s.user.id, s.id));
                    n?.text && (e.retweeted_status.text = n.text);
                }
                let u = `https://weibo.com/${l}/${e.id}`,
                    d = o.formatExtended(c, e, l),
                    f = d.description,
                    _ = n(a ? i.created_at : e.created_at);
                return (
                    p === `1` && (f = e.retweeted_status ? o.formatVideo(f, e.retweeted_status) : o.formatVideo(f, e)),
                    h === `1` && (f = await o.formatComments(c, f, e, g)),
                    m === `1` && (f = await (e.retweeted_status ? o.formatArticle(c, f, e.retweeted_status) : o.formatArticle(c, f, e))),
                    { ...d, guid: u, description: f, pubDate: _, author: e.user.screen_name }
                );
            })
        );
        return o.sinaimgTvax({ title: `个人微博时间线--${a}`, link: `http://weibo.com/${l}/`, description: s, image: _, item: y });
    } else if (l === `0` || c.req.query()) {
        let { app_key: n = ``, redirect_url: i = c.req.origin + `/weibo/timeline/0`, app_secret: a = `` } = e.weibo,
            o = c.req.query(`code`),
            s = c.req.query(`state`);
        if (o) {
            let e = await r.post(`https://api.weibo.com/oauth2/access_token?client_id=${n}&client_secret=${a}&code=${o}&redirect_uri=${i}&grant_type=authorization_code`),
                l = e.data.access_token,
                u = e.data.uid,
                d = e.data.expires_in;
            (await t.set(`weibotimelineuid` + u, l, d), c.set({ 'Content-Type': `text/html; charset=UTF-8`, 'Cache-Control': `no-cache` }), c.html(`<script>window.location = '/weibo/timeline/${u}${s ? `/${s}` : ``}'<\/script>`));
        }
    } else {
        let { app_key: t = ``, redirect_url: n = c.req.origin + `/weibo/timeline/0` } = e.weibo;
        ((c.status = 302), c.set({ 'Cache-Control': `no-cache` }), c.set(`redirect`, `https://api.weibo.com/oauth2/authorize?client_id=${t}&redirect_uri=${n}${d ? `&state=${u}/${d.replaceAll(`&`, `%26`)}` : ``}`));
    }
}
export { c as route };
