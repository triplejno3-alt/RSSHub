import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, t as n } from './util-BzQaJ-Iy.mjs';
const r = async (e) => {
        let r = Number.parseInt(e.req.query(`limit`) ?? `30`, 10),
            i = new URL(`videos`, n).href,
            a = new URL(`gapi/v1/videos`, n).href;
        return await t(r, { 'page[limit]': r, sort: `-published-at`, include: `category,user,media`, 'filter[list-all]': 1 }, a, i);
    },
    i = {
        path: `/videos`,
        name: `视频`,
        url: `www.gcores.com`,
        maintainers: [`nczitzk`],
        handler: r,
        example: `/gcores/videos`,
        parameters: void 0,
        description: void 0,
        categories: [`game`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.gcores.com/videos`], target: `/gcores/videos` }],
        view: e.Videos,
    };
export { r as handler, i as route };
