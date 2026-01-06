import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
async function r(r) {
    let i = n((await t(r)).body),
        a = i(`div.entry-content`).children(),
        o = a
            .find(`noscript`)
            .toArray()
            .map((e) => e.children[0].data),
        s = a
            .slice(2)
            .toArray()
            .map((e) => n(e).html());
    return { title: i(`.entry-title`).text(), description: [...o, ...s].join(``), pubDate: e(i(`time`)[0].attribs.datetime), link: r };
}
var i = r;
const a = `8KCosplay`,
    o = `https://www.8kcosplay.com/`;
export { o as n, i as r, a as t };
