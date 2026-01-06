import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './utils-BZuxbJRH.mjs';
import { load as a } from 'cheerio';
const o = { path: `/:type/:name`, name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let { type: s, name: c, sort: l = `new` } = o.req.param(),
        { data: u } = await t(`${i}/ajax/${s}/${c}${l === `default` || s === `tag` ? `` : `/${l}`}`),
        d = u.data.stories.map((t) => {
            let i = a(t.html, null, !1),
                o = JSON.parse(i(`script[type="application/ld+json"]`).text()),
                s = i(`.story__main`);
            return (
                n(s),
                s.find(`.player`).each((e, t) => {
                    ((t = i(t)), r(t));
                }),
                { title: o.name, description: s.find(`.story__content-inner`).html(), pubDate: e(o.dateCreated), author: o.author.name, link: o.url }
            );
        });
    return { title: u.data.title, link: `${i}/${s}/${c}`, language: `ru-RU`, item: d };
}
export { o as route };
