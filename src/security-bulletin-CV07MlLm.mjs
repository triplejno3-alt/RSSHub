import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/security-bulletin`,
    categories: [`program-update`],
    example: `/android/security-bulletin`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`source.android.com/docs/security/bulletin`, `source.android.com/docs/security/bulletin/asb-overview`, `source.android.com/`] }],
    name: `Security Bulletins`,
    maintainers: [`TonyRL`],
    handler: i,
    url: `source.android.com/docs/security/bulletin/asb-overview`,
};
async function i() {
    let r = `https://source.android.com`,
        i = `${r}/docs/security/bulletin/asb-overview`,
        a = n(await e(i, { headers: { Cookie: `signin=autosignin; cookies_accepted=true; django_language=en;` } })),
        o = a(`table tr`)
            .slice(1)
            .toArray()
            .map((e) => {
                let n = a(e),
                    i = n.find(`td:nth-child(1) a`);
                return { title: `Bulletin ${i.text()}`, description: n.find(`td:nth-child(2)`).html(), link: `${r}${i.attr(`href`)}`, pubDate: t(n.find(`td:nth-child(3)`).text()) };
            });
    return { title: a(`title`).text(), link: i, image: a(`link[rel="apple-touch-icon"]`).attr(`href`), item: o };
}
export { r as route };
