import { n as e } from './puppeteer-BbZGb8cd.mjs';
import { t } from './puppeteer-utils-BhPB3ohS.mjs';
async function n(n) {
    let r = await e(),
        i = await r.newPage();
    (await i.setRequestInterception(!0),
        i.on(`request`, (e) => {
            e.resourceType() === `document` || e.resourceType() === `script` ? e.continue() : e.abort();
        }),
        await i.goto(n, { waitUntil: `networkidle0` }));
    let a = await t(i);
    return (await r.close(), a);
}
export { n as t };
