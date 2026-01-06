import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/desktop`,
    categories: [`program-update`],
    example: `/tradingview/desktop`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`tradingview.com/support/solutions/43000673888-tradingview-desktop-releases-and-release-notes/`] }],
    name: `Desktop releases and release notes`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `tradingview.com/support/solutions/43000673888-tradingview-desktop-releases-and-release-notes/`,
};
async function a(i) {
    let a = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 50,
        o = `https://www.tradingview.com`,
        s = new URL(`/support/solutions/43000673888-tradingview-desktop-releases-and-release-notes/`, o).href,
        { data: c } = await t(s),
        l = r(c);
    l(`h4[data-identifyelement]`).each((e, t) => {
        ((t = l(t)), t.text().trim() === `` && t.remove());
    });
    let u = l(`h4[data-identifyelement]`)
            .toArray()
            .slice(0, a)
            .map((t) => {
                t = l(t);
                let i = t.text(),
                    a = l.html(t.nextUntil(`h4`));
                return {
                    title: i,
                    link: s,
                    description: a,
                    category: r(a)(`h5`)
                        .toArray()
                        .map((e) => l(e).text()),
                    guid: `tradingview-desktop#${i.split(/versions?\s/).pop()}`,
                    pubDate: n(e(i.split(/\./)[0], `MMMM D, YYYY`), 8),
                };
            }),
        d = l(`title`).text(),
        f = d.split(/—/),
        p = new URL(l(`link[rel="icon"]`).prop(`href`), o).href;
    return { item: u, title: d, link: s, description: f[0], language: l(`html`).prop(`lang`), icon: p, logo: p, subtitle: f[0], author: f.pop() };
}
export { i as route };
