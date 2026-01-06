import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const n = { path: `/check-cookie`, description: `检查 zhihu cookie 是否有效`, maintainers: [`DIYgod`], handler: r };
async function r() {
    let n = t.zhihu.cookies;
    return n ? { code: (await e(`https://www.zhihu.com/api/v4/me?include=is_realname`, { headers: { Referer: `https://www.zhihu.com/`, Cookie: n } })).name ? 0 : -1 } : { code: -1 };
}
export { n as apiRoute };
