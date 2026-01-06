import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = { path: `/recommend`, categories: [`new-media`], example: `/iheima/recommend`, url: `www.iheima.com`, name: `推荐`, maintainers: [`p3psi-boo`], handler: r };
async function r() {
    let n = `https://www.iheima.com/?page=1&pagesize=20`,
        r = await t({ method: `get`, url: n, responseType: `json`, headers: { Accept: `application/json, text/javascript, */*; q=0.01`, Referer: `https://www.iheima.com/`, 'X-Requested-With': `XMLHttpRequest` } });
    return { title: `推荐`, link: n, item: JSON.parse(r.body).contents.map((t) => ({ title: t.title, link: t.url, pubDate: e(t.published), description: t.content })) };
}
export { n as route };
