import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './const-vX7QVsvf.mjs';
import { load as a } from 'cheerio';
const o = { path: `/cat/:cat{.+}?`, radar: [{ source: [`8kcosplay.com/`], target: `` }], name: `Unknown`, maintainers: [], handler: s, url: `8kcosplay.com/`, features: { nsfw: !0 } };
async function s(o) {
    let s = Number.parseInt(o.req.query(`limit`)),
        { cat: c = `8kasianidol` } = o.req.param(),
        l = `${n}category/${c}/`,
        u = a((await t(l)).body),
        d = u(`li.item`).toArray();
    return {
        title: `${i}-${u(`span[property=name]:not(.hide)`).text()}`,
        link: l,
        item: await Promise.all(
            (s ? d.slice(0, s) : d).map((t) => {
                let { href: n } = a(t)(`h2 > a`)[0].attribs;
                return e.tryGet(n, () => r(n));
            })
        ),
    };
}
export { o as route };
