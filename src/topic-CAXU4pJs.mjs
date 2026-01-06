import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n, t as r } from './utils-BbpL-vaf.mjs';
import { load as i } from 'cheerio';
const a = { path: `/topic/:topic`, radar: [{ source: [`pincong.rocks/topic/:topic`] }], name: `Unknown`, maintainers: [`zphw`], handler: o };
async function o(a) {
    let o = `${r}/topic/${a.req.param(`topic`)}`,
        s = i(await n(o, e)),
        c = s(`div.aw-item`);
    return { title: `品葱 - ${a.req.param(`topic`)}`, link: o, item: c.toArray().map((e) => ({ title: s(e).find(`h4 a`).text().trim(), link: r + s(e).find(`h4 a`).attr(`href`), pubDate: t(s(e).attr(`data-created-at`) * 1e3) })) };
}
export { a as route };
