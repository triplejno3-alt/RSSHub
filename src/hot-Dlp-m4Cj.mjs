import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as i } from './utils-CU9nJ7uH.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
let d = `false`,
    f = `false`;
const p = {
    path: `/search/hot/:fulltext?`,
    categories: [`social-media`],
    view: r.SocialMedia,
    example: `/weibo/search/hot`,
    parameters: {
        fulltext: {
            description:
                '\n-   使用`/weibo/search/hot`可以获取热搜条目列表；\n-   使用`/weibo/search/hot/fulltext`可以进一步获取热搜条目下的摘要信息（不含图片视频）；\n-   使用`/weibo/search/hot/fulltext?pic=true`可以获取图片缩略（但需要配合额外的手段，例如浏览器上的 Header Editor 等来修改 referer 参数为`https://weibo.com`，以规避微博的外链限制，否则图片无法显示。）\n-   使用`/weibo/search/hot/fulltext?pic=true&fullpic=true`可以获取 Original 图片（但需要配合额外的手段，例如浏览器上的 Header Editor 等来修改 referer 参数为`https://weibo.com`，以规避微博的外链限制，否则图片无法显示。）',
        },
    },
    features: { requireConfig: [{ name: `WEIBO_COOKIES`, optional: !0, description: `` }], requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`s.weibo.com/top/summary`] }],
    name: `热搜榜`,
    maintainers: [`xyqfer`, `shinemoon`],
    handler: m,
    url: `s.weibo.com/top/summary`,
};
async function m(e) {
    ((d = e.req.query(`pic`) ?? `false`), (f = e.req.query(`fullpic`) ?? `false`));
    let {
            data: { data: r },
        } = await i.tryWithCookies(async (e, t) => {
            let r = await n({
                method: `get`,
                url: `https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&title=%E5%BE%AE%E5%8D%9A%E7%83%AD%E6%90%9C&extparam=filter_type%3Drealtimehot%26mi_cid%3D100103%26pos%3D0_0%26c_type%3D30%26display_time%3D1540538388&luicode=10000011&lfid=231583`,
                headers: { Referer: `https://s.weibo.com/top/summary?cate=realtimehot`, Cookie: e, ...i.apiHeaders },
            });
            return (t(r), r);
        }),
        a = null;
    if (e.req.param(`fulltext`) === `fulltext`) {
        let e = r.cards[0].card_group.map((e) => ({
            title: e.desc,
            link: `https://m.weibo.cn/search?containerid=100103type%3D1%26q%3D${encodeURIComponent(e.desc)}`,
            plink: `https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D${encodeURIComponent(e.desc)}`,
        }));
        a = await Promise.all(e.map((e) => t.tryGet(e.plink, async () => ((e.description = (await h(e.plink)).content), e))));
    } else
        a = r.cards[0].card_group.map((e) => {
            let t = e.desc,
                n = `https://m.weibo.cn/search?containerid=100103type%3D1%26q%3D${encodeURIComponent(e.desc)}`;
            return { title: t, description: e.desc, link: n };
        });
    return { title: `微博热搜榜`, link: `https://s.weibo.com/top/summary?cate=realtimehot`, description: `实时热点，每分钟更新一次`, item: a };
}
async function h(t) {
    let r = await n(t, { headers: { Cookie: e.weibo.cookies ?? `` } }),
        i = ``;
    try {
        let e = r.data.data.cards;
        i = g(e);
    } catch {}
    return { content: i };
}
function g(e) {
    let t = c(`<div id="wbcontent"></div>`)(`#wbcontent`),
        n = ({ author: e, msg: t, link: n, postinfo: r, pics: i }) =>
            l(
                s(a, {
                    children: [
                        s(`div`, { class: `quoted`, children: [o(`a`, { style: `text-decoration: none;`, href: e.link, children: e.name }), o(`span`, { children: o(`a`, { href: n, children: ` | ${r} ` }) })] }),
                        o(`div`, { class: `content`, children: t ? u(t) : null }),
                        i.length ? s(a, { children: [o(`br`, {}), o(`div`, { class: `pic-row`, children: i.map((e) => o(`a`, { href: e.rurl, children: o(`img`, { src: e.url }) })) })] }) : null,
                        o(`hr`, {}),
                    ],
                })
            );
    for (let r of e) {
        if (r.card_type === 9) {
            let e = r.mblog.thumbnail_pic ?? ``,
                i = e.lastIndexOf(`/`),
                a = e.slice(0, i + 1),
                o = c(r.mblog.text);
            d === `true` ? o(`img`).attr(`width`, `1em`).attr(`height`, `1em`) : o(`img`).remove();
            let s = n({
                author: { link: r.mblog.user.profile_url, name: r.mblog.user.screen_name },
                msg: o.html(),
                link: r.scheme,
                postinfo: r.mblog.created_at,
                pics:
                    d === `true` && r.mblog.pic_num > 0
                        ? r.mblog.pics.map((e) => {
                              let t = e.pid;
                              return f === `false` ? { url: a + t + `.jpg`, rurl: e.url } : { url: e.url, rurl: e.url };
                          })
                        : [],
            });
            t.append(s);
        }
        r.card_type === 11 && t.append(g(r.card_group));
    }
    return t.html();
}
export { p as route };
