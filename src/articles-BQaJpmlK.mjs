import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './utils-BsyXyXnz.mjs';
const t = { path: `/articles`, categories: [`programming`], example: `/web/articles`, radar: [{ source: [`web.dev/articles`] }], name: `Articles`, maintainers: [`KarasuShin`], handler: n };
async function n() {
    return { title: `Articles`, link: `https://web.dev/articles`, image: `https://web.dev/_pwa/web/icons/icon-144x144.png`, item: await e(`family_url:/articles`) };
}
export { t as route };
