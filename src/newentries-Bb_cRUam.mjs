import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { o as t, r as n, t as r } from './utils-UGcwE5N1.mjs';
const i = { path: [`/videos/newentries/:language?`, `/newentries/:language?`], name: `Unknown`, maintainers: [], handler: a, features: { nsfw: !0 } };
async function a(i) {
    let a = i.req.param(`language`) ?? n;
    return await r(a, `${t}/${a}/vl_newentries.php?list`, e.tryGet);
}
export { i as route };
