import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { a as t, o as n, r, t as i } from './utils-UGcwE5N1.mjs';
const a = {
    path: [`/videos/newrelease/:language?/:mode?`, `/newrelease/:language?/:mode?`],
    name: `Unknown`,
    maintainers: [],
    handler: o,
    description: `| videos with comments (by date) | everything (by date) |
| ------------------------------ | -------------------- |
| 1                              | 2                    |`,
    features: { nsfw: !0 },
};
async function o(a) {
    let o = a.req.param(`mode`) ?? t,
        s = a.req.param(`language`) ?? r;
    return await i(s, `${n}/${s}/vl_newrelease.php?list&mode=${o}`, e.tryGet);
}
export { a as route };
