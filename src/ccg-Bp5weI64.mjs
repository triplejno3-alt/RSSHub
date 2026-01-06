import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, intro: t, description: n }) =>
        c(
            o(i, {
                children: [
                    e?.length ? e.map((e) => (e?.src ? a(`figure`, { children: e.alt ? a(`img`, { src: e.src, alt: e.alt }) : a(`img`, { src: e.src }) }) : null)) : null,
                    t ? a(`blockquote`, { children: t }) : null,
                    n ? l(n) : null,
                ],
            })
        ),
    d = async (r) => {
        let { category: i = `news` } = r.req.param(),
            a = Number.parseInt(r.req.query(`limit`) ?? `7`, 10),
            o = `http://www.ccg.org.cn`,
            c = new URL(i, o).href,
            l = s(await e(c)),
            d = l(`html`).attr(`lang`) ?? `zh`,
            f = [];
        ((f = l(`ul.huodong-list li`)
            .slice(0, a)
            .toArray()
            .map((e) => {
                let t = l(e),
                    r = t.find(`h5`).text(),
                    i = t.find(`div.huodong-img img`).attr(`src`),
                    a = u({ images: i ? [{ src: i, alt: r }] : void 0, intro: t.find(`p`).html() || void 0 }),
                    o = t.find(`span`).text(),
                    s = t.find(`a`).attr(`href`),
                    c = o;
                return { title: r, description: a, pubDate: o ? n(o, `YYYY年M月D日`) : void 0, link: s, content: { html: a, text: a }, image: i, banner: i, updated: c ? n(c, `YYYY年M月D日`) : void 0, language: d };
            })),
            (f = await Promise.all(
                f.map((r) =>
                    r.link
                        ? t.tryGet(r.link, async () => {
                              let t = s(await e(r.link)),
                                  i = t(`div.pinpai-page h3`).text(),
                                  a = t(`span.time`).text();
                              (t(`div.pinpai-page h3`).remove(), t(`div.pinpai-page span.time`).remove());
                              let o = u({ description: t(`div.pinpai-page`).html() || void 0 }),
                                  c = a,
                                  l = { title: i, description: o, pubDate: a ? n(a, `YYYY年M月D日`) : r.pubDate, content: { html: o, text: o }, updated: c ? n(c, `YYYY年M月D日`) : r.updated, language: d };
                              return { ...r, ...l };
                          })
                        : r
                )
            )));
        let p = l(`h1.nav-logo`).first().text();
        return { title: `${p} - ${l(`title`).text()}`, link: c, item: f, allowEmpty: !0, image: new URL(`wp-content/themes/ccg/imgs/nav-logo.png`, o).href, author: p, language: d, id: c };
    },
    f = {
        path: `/:category?`,
        name: `动态`,
        url: `www.ccg.org.cn`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/ccg/news`,
        parameters: {
            category: {
                description: '分类，默认为 `news`，即新闻动态，可在对应分类页 URL 中找到',
                options: [
                    { label: `新闻动态`, value: `news` },
                    { label: `媒体报道`, value: `mtbd` },
                ],
            },
        },
        description: `::: tip
订阅 [新闻动态](http://www.ccg.org.cn/news)，其源网址为 \`http://www.ccg.org.cn/news\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/ccg/news\`](https://rsshub.app/ccg/news)。
:::

| 分类                                   | ID                                  |
| -------------------------------------- | ----------------------------------- |
| [新闻动态](http://www.ccg.org.cn/news) | [news](https://rsshub.app/ccg/news) |
| [媒体报道](http://www.ccg.org.cn/mtbd) | [mtbd](https://rsshub.app/ccg/mtbd) |
`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.ccg.org.cn/category`], target: `/:category` },
            { title: `新闻动态`, source: [`www.ccg.org.cn/news`], target: `/news` },
            { title: `媒体报道`, source: [`www.ccg.org.cn/mtbd`], target: `/mtbd` },
        ],
        view: r.Articles,
    };
export { d as handler, f as route };
