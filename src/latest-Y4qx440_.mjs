import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/latest`,
    categories: [`program-update`],
    example: `/brave/latest`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`brave.com/latest`, `brave.com/`] }],
    name: `Release Notes`,
    maintainers: [`nczitzk`],
    handler: i,
    url: `brave.com/latest`,
};
async function i() {
    let r = `https://brave.com/latest`,
        i = n((await t({ method: `get`, url: r })).data),
        a = i(`.box h3`)
            .toArray()
            .map((t) => {
                t = i(t);
                let n = t.text(),
                    a = t.parent().find(`h2`).text(),
                    o = n.match(/(v[\d.]+)/),
                    s = n.match(/\((.*?)\)/);
                return { title: `[${a}] ${n}`, link: r, guid: `${r}#${a}-${o?.[1] ?? n}`, description: t.next().html(), pubDate: e(s?.[1].replace(/(st|nd|rd|th)?,/, ``), [`MMMM D YYYY`, `MMM D YYYY`]) };
            });
    return { title: i(`title`).text(), link: r, item: a };
}
export { r as route };
