import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = `https://www.newyorker.com`,
    a = {
        path: `/:category`,
        categories: [`traditional-media`],
        view: n.Articles,
        example: `/newyorker/latest`,
        parameters: { category: `tab name. can be found at url` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`newyorker.com/:category?`] }],
        name: `Articles`,
        maintainers: [`EthanWng97`, `pseudoyu`],
        handler: o,
    };
async function o(n) {
    let { category: a } = n.req.param(),
        o = r(await e(`${i}/${a}`)),
        s = JSON.parse(
            o(`script:contains("window.__PRELOADED_STATE__")`)
                .text()
                .match(/window\.__PRELOADED_STATE__ = (.*);/)?.[1] ?? `{}`
        ).transformed.bundle.containers[0].items,
        c = await Promise.all(
            s.map((n) => {
                let a = `${i}${n.url}`;
                return t.tryGet(a, async () => {
                    let t = r(await e(a))(`#main-content`);
                    return (
                        t.find(`h1`).remove(),
                        t.find(`.article-body__footer`).remove(),
                        t.find(`.social-icons`).remove(),
                        t.find(`div[class^="ActionBarWrapperContent-"]`).remove(),
                        t.find(`div[class^="ContentHeaderByline-"]`).remove(),
                        { title: n.dangerousHed, pubDate: n.pubDate, link: a, description: t.html() }
                    );
                });
            })
        );
    return { title: `The New Yorker - ${a}`, link: i, description: `Reporting, Profiles, breaking news, cultural coverage, podcasts, videos, and cartoons from The New Yorker.`, item: c };
}
export { a as route };
