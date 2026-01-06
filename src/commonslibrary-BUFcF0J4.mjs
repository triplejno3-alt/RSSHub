import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './timezone-CrV-DT8S.mjs';
import { n as t } from './puppeteer-BbZGb8cd.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/commonslibrary/type/:topic?`,
    categories: [`government`],
    example: `/parliament.uk/commonslibrary/type/research-briefing`,
    parameters: { topic: `research by topic, string, example: [research-briefing|data-dashboard]` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Commonlibrary`,
    maintainers: [`AntiKnot`],
    handler: i,
};
async function i(r) {
    let { topic: i } = r.req.param(),
        a = `https://commonslibrary.parliament.uk/type/${i}/`,
        o = await t(),
        s = await o.newPage();
    (await s.setRequestInterception(!0),
        s.on(`request`, (e) => {
            e.resourceType() === `document` ? e.continue() : e.abort();
        }),
        await s.goto(a, { waitUntil: `domcontentloaded` }));
    let c = await s.evaluate(() => document.documentElement.innerHTML);
    await s.close();
    let l = n(c),
        u = l(`div.l-box.l-box--no-border.card__text`)
            .toArray()
            .map((t) => ({
                title: l(t).find(`.card__text a`).text().trim(),
                link: l(t).find(`.card__text a`).attr(`href`),
                description: l(t).find(`p`).last().text().trim(),
                pubDate: e(l(t).find(`.card__date time`).attr(`datetime`)),
            }));
    return (await o.close(), { title: `parliament - lordslibrary - ${i}`, link: a, item: u });
}
export { r as route };
