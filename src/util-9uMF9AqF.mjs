import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import a from 'dayjs';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = ({ description: e, news: t, timeline: s, rootUrl: c }) =>
        o(
            i(n, {
                children: [
                    e ? r(`p`, { children: e }) : null,
                    t
                        ? i(n, {
                              children: [
                                  r(`h3`, { children: `媒体报道` }),
                                  r(`table`, {
                                      cellspacing: `8`,
                                      children: r(`tbody`, {
                                          children: t.map((e, t) =>
                                              i(
                                                  `tr`,
                                                  { children: [r(`td`, { children: r(`a`, { href: e.url, children: e.title }) }), r(`th`, { align: `left`, children: r(`small`, { children: e.siteNameDisplay }) })] },
                                                  String(e.url ?? e.title ?? t)
                                              )
                                          ),
                                      }),
                                  }),
                              ],
                          })
                        : null,
                    s
                        ? i(n, {
                              children: [
                                  r(`h3`, { children: `事件追踪` }),
                                  r(`table`, {
                                      cellspacing: `10`,
                                      children: r(`tbody`, {
                                          children: s.topics?.map((e, t) =>
                                              i(
                                                  `tr`,
                                                  {
                                                      children: [
                                                          r(`th`, { align: `left`, children: r(`small`, { children: e.publishDate ? a(e.publishDate).format(`YYYY-MM-DD HH:mm:ss`) : `` }) }),
                                                          r(`td`, { children: r(`a`, { href: e.uid ? new URL(`topic/${e.uid}`, c).href : void 0, children: e.title }) }),
                                                      ],
                                                  },
                                                  String(e.uid ?? e.title ?? t)
                                              )
                                          ),
                                      }),
                                  }),
                              ],
                          })
                        : null,
                ],
            })
        ),
    c = `readhub.cn`,
    l = `https://${c}`,
    u = `https://api.${c}`,
    d = new URL(`topic/list`, u).href,
    f = async (n, r) =>
        await Promise.all(
            n.map((n) =>
                r(n.link, async () => {
                    try {
                        if (!n.link.startsWith(l)) throw Error(`"${n.link}" is an external URL`);
                        let { data: r } = await t(n.link),
                            i = JSON.parse(r.match(/{\\"topic\\":(.*?)}]\\n"]\)<\/script>/)[1].replaceAll(String.raw`\"`, `"`));
                        ((n.title = i.title),
                            (n.link = i.url ?? new URL(`topic/${i.uid}`, l).href),
                            (n.description = s({ description: i.summary, news: i.newsAggList, timeline: i.timeline, rootUrl: l })),
                            (n.author = i.siteNameDisplay),
                            (n.category = [...(i.entityList.map((e) => e.name) ?? []), ...(i.tagList.map((e) => e.name) ?? [])]),
                            (n.guid = `readhub-${i.uid}`),
                            (n.pubDate = e(i.publishDate.replaceAll(/\s/g, ``))));
                    } catch {
                        n.guid = `readhub-${n.guid}`;
                    }
                    return n;
                })
            )
        );
export { s as a, l as i, d as n, f as r, u as t };
