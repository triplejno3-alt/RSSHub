import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { n as t } from './puppeteer-BbZGb8cd.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/track/:trackingNumber`,
    categories: [`other`],
    example: `/ups/track/1Z78R6790470567520`,
    parameters: { trackingNumber: `The UPS tracking number (e.g., 1Z78R6790470567520).` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Tracking`,
    maintainers: [`Aquabet`],
    handler: i,
};
async function i(r) {
    let { trackingNumber: i } = r.req.param(),
        a = `https://www.ups.com/track?loc=en_US&tracknum=${i}`,
        o = await t(),
        s = await o.newPage();
    (await s.setRequestInterception(!0),
        s.on(`request`, (e) => {
            [`image`, `stylesheet`, `font`, `ping`, `fetch`].includes(e.resourceType()) ? e.abort() : e.continue();
        }),
        await s.goto(a, { waitUntil: `domcontentloaded` }));
    let c = `#st_App_View_Details`;
    try {
        (await s.waitForSelector(c), await s.click(c));
    } catch {
        return { title: `UPS Tracking - ${i}`, link: a, item: [] };
    }
    await s.waitForSelector(`tr[id^="stApp_activitydetails_row"]`);
    let l = await s.content();
    await o.close();
    let u = n(l),
        d = u(`tr[id^="stApp_activitydetails_row"]`)
            .toArray()
            .map((t, n) => {
                let r = (u(t).find(`#stApp_activitiesdateTime${n}`).text() || `Not Provided`)
                        .trim()
                        .replace(/(\d{1,}\/\d{1,}\/\d{4})(\d{1,}:\d{1,}\s[AP]\.?M\.?)/, `$1 $2`)
                        .replaceAll(`P.M.`, `PM`)
                        .replaceAll(`A.M.`, `AM`),
                    o = e(r),
                    s = u(t)
                        .find(`#stApp_milestoneActivityLocation${n}`)
                        .text()
                        .trim()
                        .replaceAll(
                            /\s*\n+\s*/g,
                            `
`
                        )
                        .split(
                            `
`
                        )
                        .map((e) => e.trim())
                        .filter(Boolean),
                    c = s[0],
                    l = s.at(-1) || ``;
                return {
                    title: c,
                    link: a,
                    guid: `${i}-${n}`,
                    description: `
                Status: ${c} <br>
                Location: ${l} <br>
                Date and Time: ${r}
            `,
                    pubDate: o,
                };
            });
    return { title: `UPS Tracking - ${i}`, link: a, item: d };
}
export { r as route };
