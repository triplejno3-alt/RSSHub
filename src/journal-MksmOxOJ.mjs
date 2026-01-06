import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/journal/:journal`,
    categories: [`journal`],
    example: `/springer/journal/10450`,
    parameters: { journal: `Journal Code, the number in the URL from the journal homepage` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.springer.com/journal/:journal/*`] }],
    name: `Journal`,
    maintainers: [`Derekmini`, `TonyRL`, `xiahaoyun`],
    handler: c,
};
async function c(s) {
    let c = `https://link.springer.com`,
        l = `${c}/journal/${s.req.param(`journal`)}/volumes-and-issues`,
        u = await e.raw(`https://idp.springer.com/authorize`, { query: { response_type: `cookie`, client_id: `springerlink`, redirect_uri: l }, redirect: `manual` }),
        d = u.headers
            .getSetCookie()
            .map((e) => e.split(`;`)[0])
            .join(`; `);
    await e(u.headers.get(`location`), { headers: { cookie: d }, redirect: `manual` });
    let f = a(await e(l, { headers: { cookie: d } })),
        p = f(`span.app-journal-masthead__title`).text().trim(),
        m = a(await e(`${c}${f(`li.c-list-group__item:first-of-type`).find(`a`).attr(`href`)}`, { headers: { cookie: d } })),
        h = m(`h2.app-journal-latest-issue__heading`).text(),
        g = m(`ol.u-list-reset > li`)
            .toArray()
            .map((e) => {
                let t = f(e).find(`h3.app-card-open__heading`).find(`a`).text().trim(),
                    n = f(e).find(`h3.app-card-open__heading`).find(`a`).attr(`href`),
                    r = n.replace(`https://link.springer.com/article/`, ``),
                    i = f(e).find(`img`).attr(`src`),
                    a = f(e)
                        .find(`li`)
                        .toArray()
                        .map((e) => f(e).text().trim())
                        .join(`; `);
                return { title: t, link: n.startsWith(`http`) ? n : `${c}${n}`, doi: r, issue: h, img: i, authors: a };
            }),
        _ = (e) =>
            o(
                i(n, {
                    children: [
                        i(`p`, { children: [r(`span`, { children: r(`big`, { children: e.title }) }), r(`br`, {})] }),
                        i(`p`, {
                            children: [
                                r(`span`, { children: r(`small`, { children: r(`i`, { children: e.authors }) }) }),
                                r(`br`, {}),
                                r(`span`, { children: r(`small`, { children: i(`i`, { children: [`https://doi.org/`, e.doi] }) }) }),
                                r(`br`, {}),
                                r(`span`, { children: r(`small`, { children: r(`i`, { children: e.issue }) }) }),
                                r(`br`, {}),
                                r(`img`, { src: e.img }),
                            ],
                        }),
                        i(`p`, { children: [r(`span`, { children: e.abstract }), r(`br`, {})] }),
                    ],
                })
            );
    return {
        title: p,
        link: l,
        item: await Promise.all(g.map((n) => t.tryGet(n.link, async () => ((n.abstract = a(await e(n.link, { headers: { cookie: d } }))(`div#Abs1-content > p:first-of-type`).text()), (n.description = _(n)), n)))),
    };
}
export { s as route };
