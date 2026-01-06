import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { n, r, t as i } from './util-DF_VKGsl.mjs';
const a = new Set([`parody`, `character`, `tag`, `artist`, `group`, `language`, `category`]),
    o = {
        path: `/index/:key/:keyword/:mode?`,
        example: `/nhentai/index/language/chinese`,
        parameters: {
            key: 'Filter term, can be: `parody`, `character`, `tag`, `artist`, `group`, `language` or `category`',
            keyword: `Filter value`,
            mode: 'mode, `simple` to only show cover, `detail` to show all pages, `torrent` to include Magnet URI, need login, refer to [Route-specific Configurations](https://docs.rsshub.app/deploy/config#route-specific-configurations), default to `simple`',
        },
        features: { antiCrawler: !0, supportBT: !0, nsfw: !0 },
        radar: [{ source: [`nhentai.net/:key/:keyword`], target: `/index/:key/:keyword` }],
        name: `Filter`,
        maintainers: [`MegrezZhu`, `hoilc`],
        handler: s,
    };
async function s(o) {
    let { key: s, keyword: c, mode: l } = o.req.param();
    if (!a.has(s)) throw new t(`Unsupported key`);
    let u = `https://nhentai.net/${s}/${c.toLowerCase().replace(` `, `-`)}/`,
        d = await n(u),
        f = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 5,
        p = d;
    return (l === `detail` ? (p = await i(e, d, f)) : l === `torrent` && (p = await r(e, d, f)), { title: `nhentai - ${s} - ${c}`, link: u, description: `hentai`, item: p });
}
export { o as route };
