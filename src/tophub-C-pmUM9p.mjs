import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/:id`,
    categories: [`new-media`],
    example: `/tophub/Om4ejxvxEN`,
    parameters: { id: `榜单id，可在 URL 中找到` },
    features: { requireConfig: [{ name: `TOPHUB_COOKIE`, optional: !0, description: `` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`tophub.today/n/:id`] }],
    name: `榜单`,
    maintainers: [`LogicJake`],
    handler: i,
};
async function i(r) {
    let i = `https://tophub.today/n/${r.req.param(`id`)}`,
        a = n(await e(i, { headers: { Referer: `https://tophub.today`, Cookie: t.tophub?.cookie ?? `` } })),
        o = a(`.tt h3`).text().trim(),
        s = a(`.rank-all-item:not(.history-content) .jc-c tr`)
            .toArray()
            .map((e) => ({ title: a(e).find(`td a`).first().text(), link: a(e).find(`td a`).first().attr(`href`), description: a(e).find(`.ws`).text().trim() }));
    return { title: o, description: a(`.tt p`).text().trim(), image: a(`.ii img`).attr(`src`), link: i, item: s };
}
export { r as route };
