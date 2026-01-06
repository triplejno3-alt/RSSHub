import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://cline.bot`,
    i = `${r}/blog`;
function a(t) {
    return t(`article.group`)
        .toArray()
        .map((n) => {
            let i = t(n),
                a = i.find(`h2`).text().trim(),
                o = i.find(`a`).first().attr(`href`),
                s = o ? (o.startsWith(`http`) ? o : `${r}${o.startsWith(`/`) ? o : `/${o}`}`) : ``,
                c = i
                    .find(`.text-sm.text-slate-500`)
                    .text()
                    .trim()
                    .match(/^([^•]+)\s*•\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/),
                l = c ? c[1].trim() : `Cline Team`,
                u = c ? e(c[2]) : void 0,
                d = i.find(`p.text-slate-600`).text().trim(),
                f = i.find(`img`).attr(`src`) || ``;
            return a && o ? { title: a, link: s, pubDate: u, author: l, description: f ? `<img src="${f}" alt="${a}" /><p>${d}</p>` : `<p>${d}</p>` } : null;
        })
        .filter(Boolean);
}
async function o() {
    let e = a(n((await t({ method: `get`, url: `${r}/blog/archive` })).data));
    if (e.length === 0) throw Error(`No articles found.`);
    return { title: `Cline Official Blog`, link: i, item: e, description: `Cline Official Blog - AI Coding Assistant`, language: `en` };
}
const s = {
    path: `/blog`,
    categories: [`blog`],
    example: `/cline/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cline.bot/blog/archive`, `cline.bot/blog`], target: `/blog` }],
    name: `Blog`,
    maintainers: [`yeshan333`],
    description: `Cline Official Blog articles`,
    handler: o,
    url: `cline.bot/blog`,
};
export { s as route };
