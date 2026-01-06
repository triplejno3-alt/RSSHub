import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/ele`,
    categories: [`university`],
    example: `/cau/ele`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ciee.cau.edu.cn/col/col26712/index.html`, `ciee.cau.edu.cn/`] }],
    name: `研招网通知公告`,
    maintainers: [`shengmaosu`],
    handler: i,
    url: `ciee.cau.edu.cn/col/col26712/index.html`,
    description: `#### 信电学院 {#zhong-guo-nong-ye-da-xue-yan-zhao-wang-tong-zhi-gong-gao-xin-dian-xue-yuan}`,
};
async function i() {
    let r = `https://ciee.cau.edu.cn`,
        i = `${r}/col/col26712/index.html`,
        a = n((await t(`${r}/module/web/jpage/dataproxy.jsp`, { searchParams: { page: 1, appid: 1, webid: 107, path: `/`, columnid: 26712, unitid: 38467, webname: `信息与电气工程学院`, permissiontype: 0 } })).data),
        o = a(`recordset record`);
    return {
        title: `中国农业大学信电学院`,
        link: i,
        description: `中国农业大学信电学院通知公告`,
        item:
            o &&
            o.toArray().map((t) => {
                t = a(t);
                let n = t.find(`a`),
                    i = n.attr(`title`),
                    o = `${r}${n.attr(`href`)}`;
                return { title: i, link: o, pubDate: e(t.find(`.col-lg-1`).text()), guid: `${o}#${i}` };
            }),
    };
}
export { r as route };
