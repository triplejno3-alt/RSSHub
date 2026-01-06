import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = async (n) => {
        let i = Number.parseInt(n.req.query(`limit`) ?? `30`, 10),
            a = `https://download.lineageos.org`,
            o = new URL(`changes`, a).href,
            s = new URL(`api/v2/changes`, a).href,
            c = r(await e(o)),
            l = c(`html`).attr(`lang`) ?? `en`,
            u = (await e(s)).slice(0, i).map((e) => {
                let n = e.subject,
                    r = e.submitted,
                    i = e.url,
                    a = [e.type, e.branch, e.repository],
                    o = e.updated;
                return { title: n, pubDate: r ? t(r, `X`) : void 0, link: i, category: a, updated: o ? t(o, `X`) : void 0, language: l };
            });
        return { title: `${c(`title`).text()} - Downloads`, description: void 0, link: o, item: u, allowEmpty: !0, author: c(`title`).text(), language: l, id: o };
    },
    a = {
        path: `/changes`,
        name: `Changes`,
        url: `download.lineageos.org`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/lineageos/changes`,
        parameters: void 0,
        description: void 0,
        categories: [`program-update`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`download.lineageos.org/changes`], target: `/changes` }],
        view: n.Notifications,
    };
export { i as handler, a as route };
