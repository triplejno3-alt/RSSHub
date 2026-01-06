import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { load as i } from 'cheerio';
const a = { path: `/`, radar: [{ source: [`fishshell.com/`], target: `` }], name: `Unknown`, maintainers: [`x2cf`], handler: o, url: `fishshell.com/` };
async function o() {
    let a = `https://fishshell.com/docs/current/relnotes.html`,
        o = i(await t.tryGet(a, async () => (await r(a)).data, e.cache.contentExpire, !1));
    return {
        link: a,
        title: `Release notes — fish-shell`,
        language: `en`,
        item: o(`#release-notes > section`)
            .toArray()
            .map((e) => {
                let t = o(e).find(`h2`).contents().first().text(),
                    r = t.match(/\(released (.+?)\)/)?.[1];
                return { title: t, link: new URL(o(e).find(`a`).attr(`href`), a).href, pubDate: r ? n(r, `MMMM D, YYYY`) : void 0, description: o(e).html() };
            }),
    };
}
export { a as route };
