import { t as e } from './got-CKQ7C9HX.mjs';
import { n as t } from './puppeteer-BbZGb8cd.mjs';
async function n(n, r = !1) {
    if (r) {
        let e = await t();
        try {
            let t = await e.newPage();
            return (
                await t.setRequestInterception(!0),
                t.on(`request`, (e) => {
                    e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
                }),
                await t.goto(n, { waitUntil: `networkidle0` }),
                await t.content()
            );
        } finally {
            await e.close();
        }
    } else return (await e(n)).data;
}
export { n as t };
