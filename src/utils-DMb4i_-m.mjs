import { n as e, t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = (e) => (e.startsWith(`http`) ? e : `https:${e}`),
    o = (e) =>
        e(`.item`)
            .toArray()
            .map((e) => {
                let t = e.attribs.pt,
                    n = i(e)(`.news-detail`),
                    r = n
                        .find(`img`)
                        .toArray()
                        .map((e) => `<img src="${e.attribs.src.split(`?x-`)[0]}">`)
                        .join(`<br>`),
                    a = n.find(`.content a`).first().attr(`href`),
                    o = n
                        .text()
                        .trim()
                        .replace(/展开全文$/, ``);
                return { title: o, link: a.startsWith(`http`) ? a : `https:${a}`, description: [o, r].filter((e) => !!e).join(`<br>`), pubDate: new Date(t * 1e3).toUTCString() };
            }),
    s = async (n, o, s) =>
        await Promise.all(
            n(`.item`)
                .toArray()
                .map(async (n) => {
                    let l = i(n),
                        u,
                        d;
                    l(`.news-detail`).children().length <= 2 ? ((u = l(`.news-detail .content .text`)), (d = l(`.news-detail .content .op`))) : ((u = l(`.news-detail .title`)), (d = l(`.news-detail .author`)));
                    let f = u.find(`a`).text(),
                        p = a(u.find(`a`).attr(`href`)),
                        m = l(`.news-img img`)?.attr(`src`)?.split(`?x-`)[0],
                        h = d.children().first().text(),
                        g = d.find(`.time`).text(),
                        _ = /小时前/.test(g) ? e(g) : t(g, [`YYYY M D`, `M D`]),
                        v = l(`.desc`).text(),
                        y = m ? `<br><img src="${m}">` : ``;
                    return ((v += o ? await c(p, s) : y), { title: f, link: p, description: v, author: h, pubDate: r(_, 8) });
                })
        ),
    c = (e, t) =>
        t.tryGet(e, async () => {
            let { data: t } = await n(e),
                r = i(t);
            return (
                r(`img`).each((e, t) => {
                    t.attribs.src.includes(`?x-`) && (t.attribs.src = t.attribs.src.split(`?x-`)[0]);
                }),
                r(`section .article-style`).html()
            );
        });
var l = { articleListParser: s, statusListParser: o };
export { l as t };
