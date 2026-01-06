import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { n, r, t as i } from './utils-D9Vetn_z.mjs';
const a = { path: `/channel/:id?`, radar: [{ source: [`hk01.com/channel/:id`, `hk01.com/`] }], name: `Unknown`, maintainers: [], handler: o };
async function o(a) {
    let o = a.req.param(`id`) ?? `1`,
        s = `${r}/channel/${o}`,
        c = await t({ method: `get`, url: `${n}/v2/feed/category/${o}` }),
        l = await i(c.data.items, a.req.query(`limit`), e.tryGet);
    return { title: c.data.category ? `${c.data.category.publishName} | 香港01` : `Channel: ${o} | 香港01`, link: s, item: l, image: c.data.category ? c.data.category.icon : null };
}
export { a as route };
