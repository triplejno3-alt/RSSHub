import { t as e } from './parse-date-DjdQS_Nt.mjs';
import t from 'google-play-scraper';
const n = {
        name: `Play Store Update`,
        path: `/play/:id/:lang?`,
        categories: [`program-update`],
        example: `/google/play/net.dinglisch.android.taskerm`,
        parameters: {
            id: `Package id, can be found in url`,
            lang: {
                description: `language`,
                options: [
                    { value: `en-us`, label: `English` },
                    { value: `zh-cn`, label: `简体中文` },
                ],
                default: `en-us`,
            },
        },
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`play.google.com/store/apps/details?id=:id`] }],
        maintainers: [`surwall`],
        handler: i,
    },
    r = {
        aboutThisAppButton: { 'en-us': `See more information on About this app`, 'zh-cn': `查看“关于此应用”的更多相关信息` },
        whatsNew: { 'en-us': `What’s new`, 'zh-cn': `新变化` },
        updatedOn: { 'en-us': `Updated on`, 'zh-cn': `更新日期` },
        updatedOnFormat: { 'en-us': [`MMM D, YYYY`, `en`], 'zh-cn': [`YYYY年M月D日`] },
        version: { 'en-us': `Version`, 'zh-cn': `版本` },
        offeredBy: { 'en-us': `Offered by`, 'zh-cn': `提供方` },
    };
async function i(n) {
    let i = n.req.param(`id`),
        s = n.req.param(`lang`) ?? `en-us`,
        c = s.split(`-`)[0].toLowerCase(),
        l = s.split(`-`)[1].toLowerCase(),
        u = `https://play.google.com/store/apps/details?id=${i}&hl=${c}&gl=${l}`,
        d = await t.app({ appId: i, lang: c, country: l }),
        f = d.title,
        p = d.icon,
        m = d.version,
        h = d.developer || d.developerLegalName,
        g = e(d.updated),
        _ = d.recentChanges,
        v = `
            <h2>${r.whatsNew[s]}</h2>
            <p>${_ ?? `No release notes`}</p>
        `;
    return { title: f + ` - Google Play`, link: u, image: p, item: [{ title: a(m, g), description: v, link: u, pubDate: g, guid: o(m, g), author: h }] };
}
function a(e, t) {
    return /^\d/.test(e) ? e : t.toISOString().slice(0, 10);
}
function o(e, t) {
    return t.getTime().toString() + `-` + e;
}
export { n as route };
