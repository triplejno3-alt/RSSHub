import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import * as a from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = (e) => {
        let t = {
                cover: e.posterImages?.full?.href || e.posterImages?.default?.href,
                src: e.links?.source.mezzanine?.href || e.links?.source.HD?.href || e.links?.source.full?.href || e.links?.source.href,
                title: e.title,
                description: e.description,
            },
            a = { src: e.url, alt: e.alt, caption: e.caption, credit: e.credit };
        return o(
            i(n, {
                children: [
                    t.src
                        ? i(n, {
                              children: [
                                  r(`video`, { controls: !0, preload: `metadata`, width: `100%`, height: `auto`, cover: t.cover, children: r(`source`, { src: t.src, type: `video/mp4` }) }),
                                  t.title || t.description ? i(`div`, { children: [t.title ? r(`div`, { children: r(`b`, { children: t.title }) }) : null, t.description ? r(`p`, { children: t.description }) : null] }) : null,
                              ],
                          })
                        : null,
                    a.src
                        ? i(`figure`, {
                              children: [a.alt ? r(`img`, { src: a.src, alt: a.alt }) : r(`img`, { src: a.src }), a.caption ? r(`figcaption`, { children: a.caption }) : null, a.credit ? r(`cite`, { children: a.credit }) : null],
                          })
                        : null,
                ],
            })
        );
    },
    c = /inline\d+|alsosee/,
    l = /(photo|video)(\d+)/,
    u = {
        path: `/news/:sport`,
        name: `News`,
        maintainers: [`weijianduan0302`],
        example: `/espn/news/nba`,
        categories: [`traditional-media`],
        parameters: { sport: `sport category, can be nba, nfl, mlb, nhl etc.` },
        description: `Get the news feed of the sport you love on ESPN.
| Sport                |  sport  |  Sport         |  sport  |
|----------------------|---------|----------------|---------|
| 🏀 NBA                | nba     | 🎾 Tennis       | tennis  |
| 🏀 WNBA               | wnba    | ⛳️ Golf         | golf    |
| 🏈 NFL                | nfl     | 🏏 Cricket      | cricket |
| ⚾️ MLB                | mlb     | ⚽️ Soccer       | soccer  |
| 🏒 NHL                | nhl     | 🏎️ F1           | f1      |
| ⛹️ College Basketball | ncb      | 🥊 MMA          | mma     |
| 🏟️️ College Football   | ncf     | 🏈 UFL          | ufl     |
| 🏉 Rugby              | rugby   | 🃏 Poker        | poker   |`,
        radar: [{ source: [`espn.com/:sport*`], target: `/news/:sport` }],
        handler: async (n) => {
            let { sport: r = `nba` } = n.req.param(),
                i = await e(`https://onefeed.fan.api.espn.com/apis/v3/cached/contentEngine/oneFeed/leagues/${r}?offset=0`, { headers: { accept: `application/json` } }),
                o = new Set([`HeadlineNews`, `Story`, `Media`, `Shortstop`]),
                u = i.feed
                    .filter((e) => o.has(e.data.now[0].type))
                    .map((e) => {
                        let t = e.data.now[0],
                            n = t.type;
                        return { title: t.headline, link: t.links.web.href, author: t.byline, pubDate: e.date, description: n === `Media` ? s(t.video[0]) : n === `Shortstop` ? t.headline : `` };
                    }),
                d = await Promise.all(
                    u.map((n) =>
                        t.tryGet(n.link, async () => {
                            if (n.description === ``) {
                                let t = await e(`${n.link}?xhr=1`, { headers: { accept: `application/json` } }),
                                    r = a.load(t.content.story, null, !1);
                                (r(`*`).each((e, n) => {
                                    if ((c.test(n.name) && r(n).remove(), l.test(n.name))) {
                                        let e = n.name.match(l)[1] === `photo` ? `images` : `video`,
                                            i = Number.parseInt(n.name.match(l)[2]) - 1,
                                            a = t.content[e][i];
                                        a ? r(n).replaceWith(s(a)) : r(n).remove();
                                    }
                                }),
                                    (n.description = r.html()));
                            }
                            return n;
                        })
                    )
                );
            return { title: `ESPN ${r.toUpperCase()} News`, link: `https://www.espn.com/espn/rss/${r}/news`, item: d };
        },
    };
export { u as route };
