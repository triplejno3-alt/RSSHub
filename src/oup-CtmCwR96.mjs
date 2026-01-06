import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = `https://academic.oup.com`,
    l = {
        path: `/journals/:name`,
        categories: [`journal`],
        example: `/oup/journals/adaptation`,
        parameters: { name: `short name for a journal, can be found in URL` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`academic.oup.com/`, `academic.oup.com/:name/issue`] }],
        name: `Oxford Academic - Journal`,
        maintainers: [`Fatpandac`],
        handler: u,
        url: `academic.oup.com/`,
    };
async function u(l) {
    let u = l.req.param(`name`),
        d = `${c}/${u}/issue`,
        f = await e.raw(d),
        p = f.headers
            .getSetCookie()
            .map((e) => e.split(`;`)[0])
            .join(`;`),
        m = o(f._data),
        h = m(`div.al-article-items`)
            .toArray()
            .map((e) => ({ title: m(e).find(`a.at-articleLink`).text(), link: new URL(m(e).find(`a.at-articleLink`).attr(`href`), c).href })),
        g = await Promise.all(
            h.map((c) =>
                t.tryGet(c.link, async () => {
                    let t = o(await e(c.link, { headers: { Cookie: p } }));
                    return (
                        (c.author = t(`.al-authors-list button`).text()),
                        (c.description = s(a(r, { children: [i(`h2`, { children: `Abstract` }), i(`p`, { children: t(`section.abstract > p.chapter-para`).text() })] }))),
                        (c.pubDate = n(t(`div.citation-date`).text())),
                        (c.category = t(`div.kwd-group > a`)
                            .toArray()
                            .map((e) => t(e).text())),
                        c
                    );
                })
            )
        );
    return { title: `OUP - ${u}`, link: d, item: g, language: m(`html`).attr(`lang`) };
}
export { l as route };
