import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = { path: `/`, categories: [`blog`], example: `/pianyivps`, radar: [{ source: [`pianyivps.com/`] }], name: `最新发布`, maintainers: [`cnkmmk`], handler: r, url: `pianyivps.com/` };
async function r() {
    let n = `https://www.pianyivps.com`;
    return {
        title: `便宜VPS网`,
        link: n,
        description: `便宜VPS网 - 最新发布`,
        item: (await t(`${n}/wp-json/wp/v2/posts`)).data.map((t) => ({ title: t.title.rendered, link: t.link, pubDate: e(t.date_gmt), description: t.content.rendered })),
    };
}
export { n as route };
