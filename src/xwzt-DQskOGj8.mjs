import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/zx/xwzt`,
    categories: [`travel`],
    example: `/zx/xwzt`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`chnmuseum.cn/zx/xwzt`], target: `/zx/xwzt` }],
    name: `资讯专题`,
    maintainers: [`ShabbyWhineYear`],
    handler: async () => {
        let n = t(await e(`https://www.chnmuseum.cn/zx/xwzt/`));
        return {
            title: `中国国家博物馆资讯专题`,
            link: `https://www.chnmuseum.cn/zx/xwzt/`,
            item: n(`ul.cj_hd_zhanh li`)
                .toArray()
                .map((e) => {
                    e = n(e);
                    let t = e.find(`div.cj_hd_biaoti a`).first();
                    return { title: t.attr(`title`) || t.text(), link: new URL(t.attr(`href`), `https://www.chnmuseum.cn`).href };
                }),
        };
    },
};
export { n as route };
