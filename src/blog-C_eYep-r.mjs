import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './utils-BsyXyXnz.mjs';
const t = { path: `/blog`, categories: [`programming`], example: `/web/blog`, radar: [{ source: [`web.dev/blog`] }], name: `Blog`, maintainers: [`KarasuShin`], handler: n };
async function n() {
    return { title: `Blog`, link: `https://web.dev/blog`, image: `https://web.dev/_pwa/web/icons/icon-144x144.png`, item: await e(`type:blog`) };
}
export { t as route };
