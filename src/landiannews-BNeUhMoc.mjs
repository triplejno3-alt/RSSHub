import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t } from './utils-B52lIFEB.mjs';
const n = async () => {
        let e = `https://www.landiannews.com/`;
        return { title: `蓝点网`, description: `给你感兴趣的内容!`, link: e, item: await t(`${e}wp-json/wp/v2/posts?_embed=author,wp:term`) };
    },
    r = {
        path: `/`,
        name: `首页`,
        url: `www.landiannews.com`,
        maintainers: [`nczitzk`, `cscnk52`],
        handler: n,
        example: `/landiannews`,
        parameters: void 0,
        description: void 0,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.landiannews.com`], target: `/` }],
        view: e.Articles,
    };
export { n as handler, r as route };
