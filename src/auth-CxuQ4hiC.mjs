import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './cache-DLkCV5c7.mjs';
var n = {
    getCookie: () =>
        t.tryGet(`zhihu-xhu-cookie`, async () => {
            let t = (await e.raw(`https://api.zhihuvvv.workers.dev/appcloud/v1/device`, { method: `get`, headers: { Referer: `https://api.zhihuvvv.workers.dev` } })).headers.getSetCookie(),
                n = t.join(`; `);
            return [...(await e.raw(`https://api.zhihuvvv.workers.dev/guests/token`, { method: `get`, headers: { Referer: `https://api.zhihuvvv.workers.dev`, Cookie: n } })).headers.getSetCookie(), ...t].join(`; `);
        }),
};
export { n as t };
