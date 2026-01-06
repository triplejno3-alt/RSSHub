import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t } from './utils-DRKqjD-M.mjs';
const n = { path: `/hot`, parameters: {}, categories: [`traditional-media`], example: `/infzm/hot`, radar: [{ source: [`infzm.com/`] }], name: `热门文章`, maintainers: [`KarasuShin`, `ranpox`, `xyqfer`], handler: r };
async function r() {
    let n = `https://www.infzm.com/`,
        { data: r } = await e({ method: `get`, url: `https://www.infzm.com/hot_contents`, headers: { Referer: n } });
    return { title: `南方周末-热门文章`, link: n, image: `https://www.infzm.com/favicon.ico`, item: await t(r.data.hot_contents) };
}
export { n as route };
