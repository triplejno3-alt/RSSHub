import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/news/author/:mid`,
    categories: [`new-media`],
    example: `/tencent/news/author/5933889`,
    parameters: { mid: `企鹅号 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ title: `当前作者文章`, source: [`news.qq.com/omn/author/:mid`] }],
    name: `作者`,
    maintainers: [`LogicJake`, `miles170`],
    handler: c,
};
async function c(s) {
    let c = s.req.param(`mid`),
        l = `https://i.news.qq.com/i/getUserHomepageInfo?${/^\d+$/.test(c) ? `chlid` : `guestSuid`}=${c}`,
        u = await t.tryGet(l, async () => (await r(l)).data.userinfo),
        d = u.nick,
        f = u.user_desc,
        p = `https://i.news.qq.com/getSubNewsMixedList?guestSuid=${encodeURIComponent(u.suid)}&tabId=om_index`,
        m = await t.tryGet(p, async () => (await r(p)).data.newslist, e.cache.routeExpire, !1),
        h = await Promise.all(
            m.map((e) => {
                let s = e.title,
                    c = n(e.timestamp, `X`),
                    l = e.url,
                    u = e.source,
                    d = e.abstract;
                return e.articletype === `4` || e.articletype === `118`
                    ? { title: s, description: `<a href=${e.url}><img src="${e.articletype === `4` ? e.miniProShareImage : e.miniVideoPic}" style="width: 100%"></a>`, link: l, author: u, pubDate: c }
                    : t.tryGet(l, async () => {
                          let e = a((await r(l)).data),
                              t = JSON.parse(
                                  e(`script:contains("window.DATA")`)
                                      .text()
                                      .match(/window\.DATA = ({.+});/)[1]
                              ),
                              n = a(t.originContent?.text || ``, null, !1);
                          return (
                              n &&
                                  n(`*`)
                                      .contents()
                                      .filter((e, t) => t.type === `comment`)
                                      .replaceWith((e, n) => {
                                          let r = n.data.trim(),
                                              a = r?.startsWith(`IMG`) ? t.originAttribute[r] : void 0;
                                          return o(a ? i(`img`, { src: a.imgurl0, style: a.style }) : null);
                                      }),
                              { title: s, description: n.html() || d, link: l, author: u, pubDate: c }
                          );
                      });
            })
        );
    return { title: d, description: f, link: `https://new.qq.com/omn/author/${c}`, item: h, image: u?.shareImg };
}
export { s as route };
