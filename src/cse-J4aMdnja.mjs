import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/cse`,
    categories: [`university`],
    example: `/sysu/cse`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`cse.sysu.edu.cn/`] }],
    name: `数据科学与计算机学院动态`,
    maintainers: [],
    handler: r,
    url: `cse.sysu.edu.cn/`,
};
async function r() {
    let n = t((await e({ method: `get`, url: `http://cse.sysu.edu.cn/`, headers: { Referer: `http://cse.sysu.edu.cn/` } })).data),
        r = [
            { index: 1, description_header: `学院新闻` },
            { index: 2, description_header: `学院通知` },
            { index: 3, description_header: `人才招聘` },
            { index: 4, description_header: `学术活动` },
            { index: 5, description_header: `学工通知` },
            { index: 6, description_header: `学生活动` },
            { index: 7, description_header: `教务通知` },
            { index: 8, description_header: `科研通知` },
            { index: 9, description_header: `人事通知` },
            { index: 10, description_header: `党群工作` },
            { index: 11, description_header: `校友工作` },
            { index: 12, description_header: `社会工作` },
        ];
    function i(e, t) {
        return { title: t + `: ` + e.attribs.title, description: t + `: ` + e.attribs.title, link: e.attribs.href, category: t };
    }
    let a = [];
    for (let e of r) {
        let t = n(`#block-views-homepage-block-` + e.index + `> div > div.view-content > div > ul > li > a`);
        for (let n of t) a.push(i(n, e.description_header));
    }
    function o(e, t) {
        let n = e.link;
        n = n.slice(-4, n.length - 4 + 4);
        let r = Number.parseInt(n),
            i = t.link;
        return ((i = i.slice(-4, i.length - 4 + 4)), Number.parseInt(i) - r);
    }
    return (a.sort(o), { title: `中山大学 - 数据科学与计算机学院`, link: `http://cse.sysu.edu.cn`, description: `中山大学 - 数据科学与计算机学院`, language: `zh-cn`, item: a });
}
export { n as route };
