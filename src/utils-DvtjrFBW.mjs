import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = ({ heading: e, subItems: t, articleContent: n }) =>
        a(r, { children: [e ? i(`h1`, { children: e }) : null, t ? i(r, { children: t.map((e, t) => (e?.description ? i(`span`, { children: c(e.description) }, `sub-${t}`) : null)) }) : i(r, { children: n ? c(n) : null })] }),
    u = (e) => s(i(l, { ...e })),
    d = ({ heading: e, articleContent: t }) => a(r, { children: [e ? i(`h2`, { children: e }) : null, t ? c(t) : null] }),
    f = (e) => s(i(d, { ...e })),
    p = `https://visionias.in`;
async function m(r, i) {
    return r.link === ``
        ? r
        : await t.tryGet(r.link, async () => {
              let t = o(await e(r.link || ``)),
                  a = String(t(`meta[property="article:published_time"]`).attr(`content`)),
                  s = String(t(`meta[property="article:modified_time"]`).attr(`content`)),
                  c = t(`meta[property="article:tag"]`)
                      .toArray()
                      .map((e) => t(e).attr(`content`)),
                  l = t(i),
                  d = l.find(`div.space-y-4 > h1`).text(),
                  p = l.find(`div.flex > div.w-full`),
                  m = p.find(`[x-data^="{isShortArticleOpen"]`),
                  g = p.find(`[x-data^="{isSectionOpen"]`);
              if (m.length !== 0)
                  return m.toArray().map((e) => {
                      let i = t(e),
                          o = i.find(`a > div > h2`).text().trim(),
                          s = i.find(`a`).attr(`href`),
                          c = h(i.html()),
                          l = i
                              .find(`ul > li:contains("Tags :")`)
                              ?.nextAll(`li`)
                              .toArray()
                              .map((e) => t(e).text()),
                          f = u({ heading: o, articleContent: c });
                      return { title: `${o} | ${d}`, pubDate: n(a), category: l, description: f, link: `${r.link}${s}`, author: `Vision IAS` };
                  });
              if (g.length === 0) {
                  let e = u({ heading: d, articleContent: h(p.html()) });
                  return { title: r.title, pubDate: n(a), category: c, description: e, link: r.link, updated: s ? n(s) : null, author: `Vision IAS` };
              } else {
                  let e = u({
                      heading: d,
                      subItems: g.toArray().map((e) => {
                          let n = t(e);
                          return { description: f({ heading: n.find(`a > div > h2`).text().trim(), articleContent: h(n.html(), `div.ck-content`) }) };
                      }),
                  });
                  return { title: d, pubDate: n(a), category: c, description: e, link: r.link, updated: s ? n(s) : null, author: `Vision IAS` };
              }
          });
}
function h(e, t = `div.ck-content`) {
    let n = o(e, null, !1),
        r = n(e).find(String(t));
    return (
        r.find(`figure`).each((e, t) => {
            n(t).css(`width`, ``);
        }),
        r.html()
    );
}
export { m as n, p as t };
