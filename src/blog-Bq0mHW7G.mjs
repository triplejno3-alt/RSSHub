import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/blog`,
    categories: [`game`],
    example: `/devolverdigital/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`devolverdigital.com/blog`] }],
    name: `Official Blogs`,
    maintainers: [`XXY233`],
    handler: r,
    url: `devolverdigital.com/blog`,
};
async function r() {
    return { title: `DevolverDigital Blog`, language: `en-us`, link: `https://www.devolverdigital.com/blog`, item: await i() };
}
async function i() {
    let n = t(await e(`https://www.devolverdigital.com/blog`), { scriptingEnabled: !1 }),
        r = n(`div.w-full.flex.justify-center.py-4.bg-red-400.undefined`),
        i = n(`div.bg-gray-800.flex.justify-center.font-sm.py-4`);
    return r.toArray().map((e, t) => {
        let r = i[t],
            c = a(n, e),
            l = o(n, e),
            u = n(e).find(`h1`).text(),
            d = n(r).find(`div.ml-auto.flex.items-center a`).attr(`href`);
        return (s(n, r), { title: u, link: d, author: c, pubDate: l, description: n.html(n(r).find(`div.cms-content`)) });
    });
}
function a(e, t) {
    return e(t).find(`div.font-xs.leading-none.mb-1`).text().replace(`By `, ``) || `Devolver Digital`;
}
function o(e, t) {
    let n = e(t)
        .find(`div.font-2xs.leading-none.mb-1`)
        .text()
        .replace(/(\d+)(st|nd|rd|th)/, `$1`);
    return new Date(n);
}
function s(e, t) {
    e(t)
        .find(`img`)
        .each((t, n) => {
            let r = e(n),
                i = r.attr(`src`) || ``;
            if (i.startsWith(`/_next/image`)) {
                let e = (r.attr(`srcset`) || ``).split(`,`).pop()?.split(` `)[0] || i;
                r.attr(`src`, e);
            }
            r.removeAttr(`loading`).removeAttr(`decoding`).removeAttr(`data-nimg`).removeAttr(`style`).removeAttr(`sizes`).removeAttr(`srcset`).removeAttr(`referrerpolicy`);
        });
}
export { n as route };
