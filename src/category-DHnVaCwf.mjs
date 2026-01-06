import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { i as n, n as r, r as i, t as a } from './util-xG_rBmHY.mjs';
const o = async (t) => {
        let { id: o } = t.req.param(),
            s = Number.parseInt(t.req.query(`limit`) ?? `30`, 10),
            c = n,
            l = new URL(`api/articles/${o ? `categoryId` : `all`}`, n).href,
            u = new URL(`api/categories/all`, n).href,
            d = await e(l, { query: { datasrc: o ? `categoriesall` : `articles`, current: 1, size: s, categoryId: o } }),
            f = (await e(u, { query: { datasrc: `categories` } })).data.find((e) => e.categoryid === o)?.category,
            p = i(d.data.records, s);
        return { title: `${a}${f ? ` - ${f}` : ``}`, description: f, link: c, item: p, allowEmpty: !0, author: a, language: r };
    },
    s = {
        path: `/n/category/:id?`,
        name: `盐选故事分类`,
        url: `n.ifun.cool`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/ifun/n/category`,
        parameters: { id: `分类 id，默认为空，即全部，见下表` },
        description: `
| 名称     | ID  |
| -------- | --- |
| 全部     |     |
| 通告     | 1   |
| 故事盐选 | 2   |
| 趣集精选 | 3   |
    `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`n.ifun.cool`], target: `/n/category/:id?` },
            { title: `全部`, source: [`n.ifun.cool`], target: `/n/category` },
            { title: `通告`, source: [`n.ifun.cool`], target: `/n/category/1` },
            { title: `盐选故事`, source: [`n.ifun.cool`], target: `/n/category/2` },
            { title: `趣集精选`, source: [`n.ifun.cool`], target: `/n/category/3` },
        ],
        view: t.Articles,
    };
export { o as handler, s as route };
