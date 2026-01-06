import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n, t as r } from './utils-Dz-9q79D.mjs';
import * as i from 'cheerio';
const a = {
        toutiao: { title: `头条`, url: `${r}/v9zhuanqu/toutiao/index.htm` },
        qswp: { title: `网评`, url: `${r}/qswp.htm` },
        qssp: { title: `视频`, url: `${r}/qssp/index.htm` },
        qslgxd: { title: `原创`, url: `${r}/qslgxd/index.htm` },
        economy: { title: `经济`, url: `${r}/economy/index.htm` },
        politics: { title: `政治`, url: `${r}/politics/index.htm` },
        culture: { title: `文化`, url: `${r}/culture/index.htm` },
        society: { title: `社会`, url: `${r}/society/index.htm` },
        cpc: { title: `党建`, url: `${r}/cpc/index.htm` },
        science: { title: `科教`, url: `${r}/science/index.htm` },
        zoology: { title: `生态`, url: `${r}/zoology/index.htm` },
        defense: { title: `国防`, url: `${r}/defense/index.htm` },
        international: { title: `国际`, url: `${r}/international/index.htm` },
        books: { title: `图书`, url: `${r}/books/index.htm` },
        xxbj: { title: `学习笔记`, url: `${r}/qszq/xxbj/index.htm` },
        llwx: { title: `理论文选`, url: `${r}/qszq/llwx/index.htm` },
    },
    o = {
        path: `/:category?`,
        categories: [`traditional-media`],
        example: `/qstheory`,
        parameters: { industry: `分类，见下表` },
        radar: [{ source: [`www.qstheory.cn/v9zhuanqu/:category/index.htm`, `www.qstheory.cn/qszq/:category/index.htm`, `www.qstheory.cn/:category/index.htm`] }],
        name: `分类`,
        maintainers: [`nczitzk`],
        handler: s,
        description: `
| 头条    | 网评 | 视频 | 原创   | 经济    | 政治     | 文化    | 社会    | 党建 | 科教    | 生态    | 国防    | 国际          | 图书  | 学习笔记 | 理论文选 |
| ------- | ---- | ---- | ------ | ------- | -------- | ------- | ------- | ---- | ------- | ------- | ------- | ------------- | ----- | -------- | -------- |
| toutiao | qswp | qssp | qslgxd | economy | politics | culture | society | cpc  | science | zoology | defense | international | books | xxbj     | llwx     |`,
    };
async function s(r) {
    let { category: o = `toutiao` } = r.req.param(),
        s = Number.parseInt(r.req.query(`limit`)) || 50,
        c = a[o].url,
        l = await e(c),
        u = i.load(l),
        d = u(`.list-style1 ul li a, .text h2 a, .no-pic ul li a`)
            .slice(0, s)
            .toArray()
            .map((e) => {
                let t = u(e);
                return { title: t.text(), link: t.attr(`href`) };
            }),
        f = await Promise.all(d.map((e) => t.tryGet(e.link, () => n(e))));
    return { title: u(`title`).text(), link: c, item: f };
}
export { o as route };
