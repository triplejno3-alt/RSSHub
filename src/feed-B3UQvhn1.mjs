import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import './description-CN05cUaw.mjs';
import { r as n, t as r } from './util-pFc_biuX.mjs';
import { load as i } from 'cheerio';
const a = async (t) => {
        let a = Number.parseInt(t.req.query(`limit`) ?? `30`, 10),
            o = new URL(`feed`, n).href,
            s = new URL(`feed/getHotDynamic`, n).href,
            c = await e(s, { query: { last_id: 0 } }),
            l = i(await e(o)),
            u = l(`html`).attr(`lang`) ?? `zh-CN`,
            d = r(a, c.data.dataList, l);
        return {
            title: l(`title`).text(),
            description: l(`meta[name="description"]`).attr(`content`),
            link: o,
            item: d,
            allowEmpty: !0,
            author: l(`meta[name="keywords"]`).attr(`content`)?.split(/,/)[0] ?? void 0,
            language: u,
            id: o,
        };
    },
    o = {
        path: `/feed`,
        name: `兴趣`,
        url: `www.dgtle.com`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/dgtle/feed`,
        parameters: void 0,
        description: void 0,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.dgtle.com/feed`], target: `/feed` }],
        view: t.Articles,
    };
export { a as handler, o as route };
