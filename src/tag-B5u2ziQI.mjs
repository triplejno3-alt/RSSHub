import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t as e } from './types-Bl_lnefZ.mjs';
import { n as t, r as n } from './utils-B52lIFEB.mjs';
const r = async (e) => {
        let r = e.req.param(`slug`),
            { id: i, name: a } = await n(r),
            o = `https://www.landiannews.com/`,
            s = await t(`${o}wp-json/wp/v2/posts?_embed=author,wp:term&tags=${i}`);
        return { title: `${a} - 蓝点网`, description: `给你感兴趣的内容!`, link: `${o}archives/tag/${r}`, item: s };
    },
    i = {
        path: `/tag/:slug`,
        name: `标签`,
        url: `www.landiannews.com`,
        maintainers: [`cscnk52`],
        handler: r,
        example: `/landiannews/tag/linux-kernel`,
        parameters: { slug: `标签名称` },
        description: void 0,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.landiannews.com/archives/tag/:slug`], target: `/tag/:slug` }],
        view: e.Articles,
    };
export { r as handler, i as route };
