import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
async function o(t, n = 0, r = 5) {
    if (n > r) return [await e(t), t];
    let i = await e(t),
        a = i.match(/(?:location\.href|window\.location\.replace)\s*=\s*['"](.*?)['"];/i)?.[1];
    return a ? o(a, n + 1, r) : [i, t];
}
const s = async (i) => {
        let s = i.req.param(),
            c,
            l,
            u = Object.keys(s);
        (u.length === 2 ? ((c = s[u[0]]), (l = s[u[1]])) : u.length === 1 ? ((c = ``), (l = s[u[0]])) : ((c = `news`), (l = `2121t76`)), (c = c.replaceAll(/[^a-zA-Z0-9-]/g, ``)));
        let d = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            f = `https://${c ? `${c}.` : ``}ynet.com`,
            p = new URL(`list/${l}.html`, f).href,
            m = a(await e(p)),
            h = m(`html`).attr(`lang`) ?? `zh`,
            g = [];
        return (
            (g = m(`li.cfix`)
                .slice(0, d)
                .toArray()
                .map((e) => {
                    let t = m(e),
                        i = t.find(`h2 a`),
                        a = i.text(),
                        o = t.find(`em.fRight`).text() || void 0,
                        s = i.attr(`href`),
                        c = o;
                    return { title: a, pubDate: o ? r(n(o), 8) : void 0, link: s, updated: c ? r(n(c), 8) : void 0, language: h };
                })),
            (g = await Promise.all(
                g.map((e) =>
                    e.link
                        ? t.tryGet(e.link, async () => {
                              let [t, i] = await o(e.link),
                                  s = a(t);
                              e.link = i;
                              let c = s(`div.articleTitle h1`).text(),
                                  l = s(`div#articleBox`).html() ?? void 0,
                                  u = s(`span.yearMsg`).text() && s(`span.timeMsg`).text() ? `${s(`span.yearMsg`).text()} ${s(`span.timeMsg`).text()}` : void 0,
                                  d = s(`spna.sourceMsg`).text(),
                                  f = u,
                                  p = { title: c, description: l, pubDate: u ? r(n(u), 8) : e.pubDate, author: d, content: { html: l, text: l }, updated: f ? r(n(f), 8) : e.updated, language: h };
                              return { ...e, ...p };
                          })
                        : e
                )
            )),
            {
                title: m(`title`).text(),
                description: m(`meta[property="og:description"]`).attr(`content`),
                link: p,
                item: g,
                allowEmpty: !0,
                image: m(`div.cul_logo img`).attr(`src`) ? `https:${m(`div.cul_logo img`).attr(`src`)}` : void 0,
                author: m(`meta[property="og:site_name"]`).attr(`content`),
                language: h,
                id: p,
            }
        );
    },
    c = {
        path: `/list/:category?/:id?`,
        name: `列表`,
        url: `ynet.com`,
        maintainers: [`nczitzk`],
        handler: s,
        example: `/ynet/list/news/2121t76`,
        parameters: { category: { description: '分类，默认为 `news`，可在对应分类页 URL 中找到' }, id: { description: `列表 ID，可在对应列表页 URL 中找到` } },
        description:
            ':::tip\n订阅 [北青快讯](https://news.ynet.com/list/2121t76.html)，其源网址为 `https://news.ynet.com/list/2121t76.html`，请参考该 URL 指定部分构成参数，此时路由为 [`/ynet/list/news/2121t76`](https://rsshub.app/ynet/list/news/2121t76)。\n:::\n',
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`ynet.com`],
                target: (e, t) => {
                    let n = new URL(t),
                        r = n.hostname.split(`.`),
                        i = ``;
                    if (r.length > 2) {
                        let e = r.slice(0, -2).filter((e) => e !== `www`);
                        e.length > 0 && (i = e[0]);
                    }
                    let a = n.pathname.match(/\/list\/(.+)\.html/),
                        o = a ? a[1] : ``;
                    return `/ynet/list${i ? `/${i}` : ``}${o ? `/${o}` : ``}`;
                },
            },
        ],
        view: i.Articles,
    };
export { s as handler, c as route };
