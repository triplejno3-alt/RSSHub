import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { n } from './puppeteer-BbZGb8cd.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/versions/:pkg/:region?`,
    categories: [`program-update`],
    example: `/apkpure/versions/jp.co.craftegg.band/jp`,
    parameters: { pkg: `Package name`, region: 'Region code, `en` by default' },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Versions`,
    maintainers: [`maple3142`],
    handler: a,
};
async function a(i) {
    let { pkg: a, region: o = `en` } = i.req.param(),
        s = `https://apkpure.com`,
        c = `${s}/${o}/${a}/versions`,
        l = await n(),
        u = await l.newPage();
    (await u.setRequestInterception(!0),
        u.on(`request`, (e) => {
            e.resourceType() === `document` ? e.continue() : e.abort();
        }),
        e.http(`Requesting ${c}`),
        await u.goto(c, { waitUntil: `domcontentloaded` }));
    let d = await u.evaluate(() => document.documentElement.innerHTML);
    await l.close();
    let f = r(d),
        p = new URL(f(`.ver-top img`).attr(`src`));
    p.searchParams.delete(`w`);
    let m = f(`.ver li`)
        .toArray()
        .map((e) => ((e = f(e)), { title: e.find(`.ver-item-n`).text(), description: e.html(), link: `${s}${e.find(`a`).attr(`href`)}`, pubDate: t(e.find(`.update-on`).text().replaceAll(/年|月/g, `-`).replace(`日`, ``)) }));
    return { title: f(`.ver-top-h1`).text(), description: f(`.ver-top-title p`).text(), image: p.href, language: o ?? `en`, link: c, item: m };
}
export { i as route };
