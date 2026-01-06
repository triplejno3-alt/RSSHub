import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/yjs`,
    categories: [`university`],
    example: `/scnu/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yz.scnu.edu.cn/tongzhigonggao/ssgg`, `yz.scnu.edu.cn/`] }],
    name: `研究生院通知公告`,
    maintainers: [`shengmaosu`],
    handler: r,
    url: `yz.scnu.edu.cn/tongzhigonggao/ssgg`,
};
async function r() {
    let n = `https://yz.scnu.edu.cn/tongzhigonggao/ssgg/`,
        r = t((await e(n)).data),
        i = r(`.listmod div a`);
    return { title: `华南师范大学研究生院`, link: n, description: `华南师范大学研究生院通知公告`, item: i && i.toArray().map((e) => ((e = r(e)), { title: e.text(), link: e.attr(`href`) })) };
}
export { n as route };
