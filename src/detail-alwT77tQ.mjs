import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/detail/:name`,
    categories: [`multimedia`],
    example: `/btbtla/detail/雍正王朝`,
    parameters: { name: `电影 | 电视剧名称` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !0, supportPodcast: !1, supportScihub: !1 },
    name: `BTBTLA | 指定剧名`,
    maintainers: [`Hermes1030`],
    handler: i,
};
async function i(r) {
    let i = await a(r.req.param(`name`));
    if (!i) return null;
    let s = `https://www.btbtla.com` + i,
        c = n(await e(s)),
        l = c(`div[name=download-list] .module-downlist.selected .module-row-one.active .module-row-info`).toArray(),
        u = await Promise.all(
            l.map(async (e) => {
                let n = c(e),
                    r = n.find(`.module-row-title h4`).text().trim(),
                    i = n.find(`.module-row-text`).attr(`href`);
                return { title: r, link: i, enclosure_url: await t.tryGet(`btbtla:magnet:${i}`, async () => (i ? await o(`https://www.btbtla.com` + i) : ``)), enclosure_type: `application/x-bittorrent` };
            })
        ),
        d = `BTBTLA | ` + c(`.page-title`).text();
    return { title: d, link: s, description: d, item: u };
}
async function a(t) {
    return n(await e(`https://www.btbtla.com/search/` + t))(`.module-items .module-item-titlebox a[title="${t}"]`).attr(`href`);
}
async function o(t) {
    return t ? n(await e(t))(`.btn-important`).attr(`href`) : null;
}
export { r as route };
