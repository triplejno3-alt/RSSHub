import { n as e } from './puppeteer-BbZGb8cd.mjs';
const t = `https://alternativeto.net`,
    n = (t, n) =>
        n.tryGet(t, async () => {
            let n = await e(),
                r = await n.newPage();
            (await r.setRequestInterception(!0),
                r.on(`request`, (e) => {
                    e.resourceType() === `document` ? e.continue() : e.abort();
                }),
                await r.goto(t, { waitUntil: `domcontentloaded` }));
            let i = await r.evaluate(() => document.documentElement.innerHTML);
            return (await n.close(), i);
        });
export { n, t };
