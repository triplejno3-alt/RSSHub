import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { t as e } from './util-D4gWpswK.mjs';
const t = { path: `/check-cookie`, description: `检查小红书 cookie 是否有效`, maintainers: [`DIYgod`], handler: n };
async function n() {
    return { code: (await e()) ? 0 : -1 };
}
export { t as apiRoute };
