import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
const r = `https://edu.cags.ac.cn`,
    i = { tzgg: `通知公告`, ywjx: `要闻简讯`, zs_bss: `博士生招生`, zs_sss: `硕士生招生`, zs_dxsxly: `大学生夏令营` },
    a = {
        path: `/edu/:category`,
        categories: [`university`],
        example: `/cags/edu/tzgg`,
        parameters: { category: `通知频道，可选 tzgg/ywjx/zs_bss/zs_sss/zs_dxsxly` },
        features: { antiCrawler: !1, requireConfig: !1, requirePuppeteer: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `研究生院`,
        maintainers: [`Chikit-L`],
        radar: [{ source: [`edu.cags.ac.cn/`] }],
        handler: o,
        description: `
| 通知公告 | 要闻简讯 | 博士生招生 | 硕士生招生 | 大学生夏令营 |
| -------- | -------- | ---------- | ---------- | ------------ |
| tzgg     | ywjx     | zs_bss     | zs_sss     | zs_dxsxly    |
`,
    };
async function o(a) {
    let o = a.req.param(`category`),
        s = i[o];
    if (!s) throw Error(`Invalid category: ${o}`);
    let c = (await e(`${r}/api/cms/cmsNews/pageByCmsNavBarId/${o}/1/10/0`)).data.map((e) => {
        let i = e.id,
            a = e.title,
            s = null;
        e.publishDate && ((s = t(e.publishDate, `YYYY-MM-DD`)), (s = n(s, 8)));
        let c = `${r}/#/dky/view/id=${i}/barId=${o}`;
        return { title: a, description: e.introduction, link: c, guid: c, pubDate: s };
    });
    return { title: s, link: `${r}/#/dky/list/barId=${o}/cmsNavCategory=1`, item: c };
}
export { a as route };
