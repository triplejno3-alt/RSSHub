import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/bullets`,
    categories: [`finance`],
    view: n.Notifications,
    example: `/finology/bullets`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`insider.finology.in/bullets`] }],
    name: `Bullets`,
    maintainers: [`Rjnishant530`],
    handler: a,
    url: `insider.finology.in/bullets`,
};
async function a() {
    let n = `https://insider.finology.in/bullets`,
        i = r(await e(n));
    return {
        title: `Finology Insider Bullets`,
        link: n,
        item: i(`body > div.flex.bullettext > div.w80 > div`)
            .toArray()
            .map((e) => {
                let n = i(e),
                    r = n.find(`div.timeline-info span`).text().split(`, `)[1],
                    a = n.find(`a.timeline-title`),
                    o = n.find(`div.bullet-desc`).html();
                return { title: a.text(), link: a.attr(`href`), pubDate: t(r), description: o };
            }),
        description: `Your daily dose of crisp, spicy financial news in 80 words.`,
        logo: `https://insider.finology.in/Images/favicon/favicon.ico`,
        icon: `https://insider.finology.in/Images/favicon/favicon.ico`,
        language: `en-us`,
    };
}
export { i as route };
