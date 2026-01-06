import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import * as s from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = (e) =>
        c(
            a(i, {
                children: e?.map((e, t) =>
                    e.video
                        ? a(`video`, { controls: !0, preload: `metadata`, poster: e.video.replace(`.mp4`, `.jpg`), children: a(`source`, { src: e.video, type: `video/mp4` }) }, `video-${t}`)
                        : o(`figure`, { children: [a(`img`, { src: e.href, alt: e.title }), a(`figcaption`, { children: e.title })] }, `image-${t}`)
                ),
            })
        ),
    d = (e, t) => c(o(i, { children: [l(u(e)), l(t)] })),
    f = (e, t) => {
        let n = t(e),
            r = new URL(n.attr(`href`)),
            i;
        return (r.hostname === `videop.mingpao.com` && ((i = new URL(r.searchParams.get(`file`))), (i.hostname = `cfrvideo.mingpao.com`), (i = i.href)), { href: r.href, title: n.attr(`title`), video: i });
    },
    p = {
        path: `/:type?/:category?`,
        name: `新聞`,
        example: `/mingpao/ins/all`,
        parameters: {
            type: {
                description: `新聞類型`,
                default: `ins`,
                options: [
                    { value: `ins`, label: `即時新聞` },
                    { value: `pns`, label: `每日明報` },
                ],
            },
            category: `頻道，見下表`,
        },
        radar: [
            { title: `即時新聞`, source: [`news.mingpao.com/ins/:categoryName/section/:date/:category`], target: `/mingpao/ins/:category` },
            { title: `每日明報`, source: [`news.mingpao.com/pns/:categoryName/section/:date/:category`], target: `/mingpao/pns/:category` },
        ],
        maintainers: [`TonyRL`],
        handler: m,
        description: `| category | 即時新聞頻道 |
| -------- | ------------ |
| all      | 總目錄       |
| s00001   | 港聞         |
| s00002   | 經濟         |
| s00003   | 地產         |
| s00004   | 兩岸         |
| s00005   | 國際         |
| s00006   | 體育         |
| s00007   | 娛樂         |
| s00022   | 文摘         |
| s00024   | 熱點         |

| category | 每日明報頻道 |
| -------- | ------------ |
| s00001   | 要聞         |
| s00002   | 港聞         |
| s00003   | 社評         |
| s00004   | 經濟         |
| s00005   | 副刊         |
| s00011   | 教育         |
| s00012   | 觀點         |
| s00013   | 中國         |
| s00014   | 國際         |
| s00015   | 體育         |
| s00016   | 娛樂         |
| s00017   | English      |
| s00018   | 作家專欄     |`,
    };
async function m(i) {
    let a = i.req.param(`type`) ?? `ins`,
        o = `https://news.mingpao.com/rss/${a}/${i.req.param(`category`) ?? (a === `ins` ? `all` : `s00001`)}.xml`,
        c = await r.parseURL(o),
        l = await Promise.all(
            c.items.map((r) =>
                t.tryGet(r.link, async () => {
                    let t = await e(r.link, { headers: { Referer: `https://news.mingpao.com/` } }),
                        i = s.load(t),
                        a = i(`#topvideo`).length
                            ? i(`#topvideo iframe`)
                                  .toArray()
                                  .map((e) => i(e).attr(`href`, i(e).attr(`src`)))
                                  .map((e) => f(e, i))
                            : [],
                        o = i(`a.fancybox`).length ? i(`a.fancybox`) : i(`a.fancybox-buttons`);
                    (i(`div.ad300ins_m`).remove(), i(`div.clear, div.inReadLrecGroup, div.clr`).remove(), i(`div#ssm2`).remove(), i(`iframe`).remove(), i(`p[dir=ltr]`).remove(), (r.category = r.categories));
                    let c = [...a, ...o.toArray().map((e) => f(e, i))],
                        l = i(`script`)
                            .toArray()
                            .find((e) => i(e).text()?.includes(`$('#lower').prepend('`)),
                        u = l
                            ? i(l)
                                  .text()
                                  ?.match(/\$\('#lower'\)\.prepend\('(.*)'\);/)?.[1]
                                  ?.replaceAll(String.raw`\"`, `"`)
                            : ``;
                    if (u) {
                        let e = s.load(u, null, !1);
                        c = [
                            ...c,
                            ...e(`a.fancybox`)
                                .toArray()
                                .map((t) => f(t, e)),
                        ];
                    }
                    return (
                        delete r.categories,
                        delete r.content,
                        delete r.contentSnippet,
                        delete r.creator,
                        delete r.isoDate,
                        (r.description = d(c, i(`.txt4`).html() ?? i(`.article_content.line_1_5em`).html() ?? i(`.txt3`).html())),
                        (r.pubDate = n(r.pubDate)),
                        (r.guid = r.link.includes(`?`) ? r.link : r.link.slice(0, r.link.lastIndexOf(`/`))),
                        r
                    );
                })
            )
        );
    return { title: c.title, link: c.link, description: c.description, item: l, image: c.image.url, language: c.language };
}
export { p as route };
