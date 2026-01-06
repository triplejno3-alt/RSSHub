import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-BYK5ZCkV.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/cover`,
    categories: [`journal`],
    example: `/science/cover`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`science.org/`] }],
    name: `Cover Story`,
    maintainers: [`y9c`, `TonyRL`],
    handler: u,
    url: `science.org/`,
    description: `Subscribe to the cover images of Science journals, and get the latest publication updates in time.

  Including 'Science', 'Science Advances', 'Science Immunology', 'Science Robotics', 'Science Signaling' and 'Science Translational Medicine'.`,
};
async function u() {
    let r = `${n}/journals`,
        { data: i } = await t(r, { headers: { cookie: `cookiePolicy=iaccept;` } }),
        a = o(i),
        s = a(`.browse-journals .browse-journals__item`)
            .not(`.partner-journals`)
            .toArray()
            .map((t) => {
                t = a(t);
                let r = t.find(`.row h2`).first().text().trim(),
                    i = t
                        .find(`.row li`)
                        .eq(0)
                        .text()
                        .trim()
                        .match(/Volume (\d+)/)[1],
                    o = t
                        .find(`.row li`)
                        .eq(1)
                        .text()
                        .trim()
                        .match(/Issue (\d+)/)[1],
                    s = t.find(`.row li`).eq(2).text().trim(),
                    c = `${n}${t.find(`.cover-image__popup-moving-cover`).attr(`data-cover-src`)}`,
                    l = a(`.cover-image__popup-view__caption-wrapper`).html(),
                    u = a(`.browse-journals__item__links a`).eq(0).attr(`href`).replace(`/current`, ``);
                return { title: `${r} | Volume ${i} Issue ${o}`, description: d(c, l), link: `${n}/${u}/${i}/${o}`, pubDate: e(s) };
            });
    return { title: a(`head title`).text(), description: a(`meta[property="og:description"]`).attr(`content`), image: `${n}/apple-touch-icon.png`, link: r, language: `en-US`, item: s };
}
const d = (e, t) => s(a(r, { children: [i(`img`, { src: e }), t ? c(t) : null] }));
export { l as route };
