import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `https://www.joshwcomeau.com`;
async function a(t, n) {
    let i = r(await e(t));
    return {
        heading: i(`header>h1`).text(),
        urls: i(n)
            .toArray()
            .map((e) => ({ url: i(e).attr(`href`), cardTitle: i(e).find(`span`).text() })),
    };
}
async function o(e) {
    return (await Promise.allSettled(e.map(async (e) => await t.tryGet(`joshwcomeau:${e.url}`, async () => await s(e))))).map((t, n) =>
        t.status === `fulfilled` ? t.value : { title: `Error Reading Item`, link: `${i}${e[n]?.url}` }
    );
}
async function s({ url: t, cardTitle: n }) {
    if (t.startsWith(`https`)) return { title: n ?? `External Content`, description: `Read it on external Site`, link: t };
    let a = r(await e(`${i}${t}`)),
        o = a(`meta[property="og:title"]`).attr(`content`)?.replace(`• Josh W. Comeau`, ``),
        s = a(`meta[property="og:description"]`).attr(`content`),
        l = a(`meta[name="author"]`).attr(`content`),
        u = a(`div[data-parent-layout]`),
        d = u.find(`dl:first-child > dd > a`).text(),
        f = u.find(`dl:first-child > dd:has(span):not(:last-child)`).text(),
        p = u.find(`dl:last-child > dd:has(span):not(:last-child)`).text(),
        m = a(`main > article`).html();
    return { title: o, description: m, author: l, pubDate: c(f), updated: c(p), link: `${i}${t}`, content: { html: m, text: s }, category: [d] };
}
function c(e) {
    return n(e.trim().replaceAll(` `, `/`).replace(`,`, ``), `MMMM/Do/YYYY`, `en`);
}
export { o as n, i as r, a as t };
