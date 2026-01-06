import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = { name: `科技大觀園`, url: `scitechvista.nat.gov.tw`, lang: `zh-TW` },
    u = `https://${l.url}`;
function d(e) {
    if (!e) return;
    let n = e.trim().split(`/`);
    if (n.length !== 3) return;
    let [r, i, a] = n;
    return t(`${Number.parseInt(r, 10) + 1911}-${i}-${a}`, `YYYY-MM-DD`);
}
const f = {
    path: `/`,
    categories: [`government`],
    example: `/scitechvista`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`scitechvista.nat.gov.tw/`] }],
    name: `最新文章`,
    maintainers: [`johan456789`],
    handler: p,
    url: l.url,
};
async function p() {
    let t = `${u}/Article/C000003/new`,
        f = o(await e(t)),
        p = f(`html`).attr(`lang`) || `zh-TW`,
        m = f(`div.kf-diagramtext-list > div.kf-diagramtext-col`)
            .toArray()
            .map((e) => {
                let t = f(e),
                    o = t.find(`a[href*="/Article/C000003/detail"]`).first().attr(`href`),
                    l = o ? new URL(o, u).href : void 0,
                    p = t.find(`div.kf-title`).first().text().trim(),
                    m = t.find(`div.kf-date > span`).first().text().trim() || void 0,
                    h = m ? n(d(m), 8) : void 0,
                    g = t.find(`img`).attr(`src`),
                    _ = g ? new URL(g, u).href : void 0,
                    v = t.find(`div.kf-txt`).first().text().trim() || void 0;
                return { title: p, description: s(a(r, { children: [_ ? i(`p`, { children: i(`img`, { src: _, alt: `` }) }) : null, v ? i(`p`, { children: c(v) }) : null] })), link: l, pubDate: h, image: _ };
            })
            .filter(Boolean);
    return { title: `${l.name} - 最新文章`, link: t, language: p, item: m };
}
export { f as route };
