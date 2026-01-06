import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './md5-DQN6cWFb.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/pulse/:user/:repo/:period?`,
    categories: [`programming`],
    example: `/github/pulse/DIYgod/RSSHub`,
    parameters: {
        user: `User name`,
        repo: `Repo name`,
        period: "Time frame, selected from a repository's Pulse/Insights page. Possible values are: `daily`, `halfweekly`, `weekly`, or `monthly`. Default: `weekly`. If your RSS client supports it, consider aligning the polling frequency of the feed to the period.",
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`github.com/:user/:repo/pulse`, `github.com/:user/:repo/pulse/:period`] }],
    name: `Repo Pulse`,
    maintainers: [`jameschensmith`],
    handler: u,
};
async function u(l) {
    let { user: u, repo: d, period: f } = l.req.param(),
        p = [`daily`, `halfweekly`, `weekly`, `monthly`],
        m = p.includes(f) ? f : p[2],
        h = `https://github.com/${u}/${d}/pulse/${m}`,
        { data: g } = await n(h),
        _ = o(g),
        v = _(`main .Layout-main`).children(),
        [y, b] = v.eq(0).find(`h2`).text().split(`–`),
        x = v
            .eq(1)
            .find(`ul ul li`)
            .toArray()
            .map((e) => _(e).text()),
        S = v.eq(2),
        C,
        w = S.find(`.js-pulse-contribution-data`);
    C = w.length ? (await n(`https://github.com${w.attr(`data-pulse-diffstat-summary-url`)}`)).data : S.text();
    let T = v.eq(3),
        E,
        D = T.find(`h3`);
    return (
        D.length &&
            (E = D.toArray().map((e) => {
                let t = _(e),
                    n = t.nextUntil(`h3`),
                    r = t.nextUntil(`ul`),
                    i = n.last();
                return {
                    heading: t.text(),
                    paragraph: r.length > 0 ? r.text() : void 0,
                    items: i
                        .children()
                        .toArray()
                        .map((e) => {
                            let t = _(e),
                                n = t.find(`a`),
                                r = t.find(`p`),
                                i = r.find(`relative-time`);
                            return (i.replaceWith(i.attr(`datetime`)), { link: { text: n.text(), url: n.attr(`href`) }, details: r.text() });
                        }),
                };
            })),
        {
            title: `${u}/${d} ${m} Pulse`,
            link: h,
            item: [
                {
                    guid: e(`${u}${d}${f}${y}${b}`),
                    title: `${y} - ${b}`,
                    description: s(
                        a(r, {
                            children: [
                                i(`h2`, { children: `Overview` }),
                                i(`ul`, { children: x.map((e) => i(`li`, { children: e })) }),
                                C ? c(C) : null,
                                (E ?? []).map((e) =>
                                    a(r, {
                                        children: [
                                            i(`h2`, { children: e.heading }),
                                            e.paragraph ? i(`p`, { children: e.paragraph }) : null,
                                            i(`ul`, { children: e.items.map((e) => a(`li`, { children: [i(`a`, { href: e.link.url, children: e.link.text }), i(`p`, { children: e.details })] })) }),
                                        ],
                                    })
                                ),
                            ],
                        })
                    ),
                    pubDate: t(b),
                },
            ],
        }
    );
}
export { l as route };
