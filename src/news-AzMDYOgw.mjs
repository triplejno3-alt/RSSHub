import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { r as n } from './common-utils-uYpL50sT.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = { path: `/news/*`, name: `Unknown`, maintainers: [], handler: f };
async function f(d) {
    let f = d.req.query(`limit`) ? Number.parseInt(d.req.query(`limit`)) : 20,
        p = `https://news.ifeng.com${n(d).replace(/^\/news/, ``)}`,
        m = await r({ method: `get`, url: p }),
        h = c(m.data),
        g = JSON.parse(m.data.match(/"newsstream":(\[.*?]),"cooperation"/)[1])
            .slice(0, f)
            .map((e) => ({ title: e.title, link: e.url, pubDate: i(t(e.newsTime), 8), description: e.thumbnails.image.pop() }));
    return (
        (g = await Promise.all(
            g.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = await r({ method: `get`, url: t.link });
                    ((t.author = e.data.match(/"editorName":"(.*?)",/)[1]), (t.category = e.data.match(/},"keywords":"(.*?)",/)[1].split(`,`)));
                    let n = t.description,
                        i = JSON.parse(e.data.match(/"contentList":(\[.*?]),/)[1]).map((e) => e.data);
                    return (
                        (t.description = l(
                            s(a, {
                                children: [
                                    n ? o(`figure`, { children: o(`img`, { src: n.url, height: n.height, width: n.width }) }) : null,
                                    i?.length
                                        ? i.map((e) =>
                                              e?.attachmentType === `video`
                                                  ? o(`video`, { controls: !0, poster: e.bigPosterUrl, children: o(`source`, { src: e.playUrl }) })
                                                  : typeof e == `string`
                                                    ? o(a, { children: u(e.replaceAll(`data-lazyload=`, `src=`)) })
                                                    : null
                                          )
                                        : null,
                                ],
                            })
                        )),
                        t
                    );
                })
            )
        )),
        { title: h(`title`).text(), link: p, item: g }
    );
}
export { d as route };
