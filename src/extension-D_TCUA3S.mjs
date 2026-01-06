import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/chrome/extension/:id`,
    categories: [`program-update`],
    example: `/google/chrome/extension/kefjpfngnndepjbopdmoebkipbgkggaa`,
    parameters: { id: `Extension id, can be found in extension url` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`chromewebstore.google.com/detail/:name/:id`] }],
    name: `Extension Update`,
    maintainers: [`DIYgod`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`id`),
        a = n(await e(`https://chrome.google.com/webstore/detail/${i}?hl=en`)),
        o = `v` + a(`.nBZElf`).text();
    return {
        title: a(`.Pa2dE`).text() + ` - Google Chrome Extension`,
        link: `https://chrome.google.com/webstore/detail/${i}`,
        image: a(`.rBxtY`).attr(`src`),
        item: [{ title: o, description: a(`.JJ3H1e`).html(), link: `https://chrome.google.com/webstore/detail/${i}`, pubDate: t(a(`.uBIrad div`).last().text()), guid: o, author: a(`.cJI8ee`).text() }],
    };
}
export { r as route };
