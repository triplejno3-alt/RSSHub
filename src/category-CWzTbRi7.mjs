import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { t as r } from './valid-host-Bsy2BS2p.mjs';
import { t as i } from './rss-parser-CKuAfhVS.mjs';
import { load as a } from 'cheerio';
const o = { path: `/:domain/:category?`, name: `Unknown`, maintainers: [], handler: s };
async function s(o) {
    let { domain: s = `news`, category: c } = o.req.param();
    if (!r(s)) throw new n(`Invalid domain`);
    let l = `https://${s}.gamme.com.tw`,
        u = await i.parseURL(`${l + (c ? `/category/${c}` : ``)}/feed`),
        d = await Promise.all(
            u.items.map((n) =>
                e.tryGet(n.link, async () => {
                    let { data: e } = await t(n.link),
                        r = a(e);
                    return (
                        r(`.entry img`).each((e, t) => {
                            (t.attribs[`data-original`] || t.attribs[`data-src`]) && ((t.attribs.src = t.attribs[`data-original`] || t.attribs[`data-src`]), delete t.attribs[`data-original`], delete t.attribs[`data-src`]);
                        }),
                        (n.author = r(`.author_name`).text().trim()),
                        (n.category = r(`.tags a`)
                            .toArray()
                            .map((e) => r(e).text())),
                        r(`.social_block, .tags`).remove(),
                        (n.description = r(`.entry`).html()),
                        delete n.content,
                        delete n.contentSnippet,
                        delete n.isoDate,
                        n
                    );
                })
            )
        );
    return { title: u.title, link: u.link, image: s === `news` ? `${l}/blogico.ico` : `${l}/favicon.ico`, description: u.description, item: d };
}
export { o as route };
