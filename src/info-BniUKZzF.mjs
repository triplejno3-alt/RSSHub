import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/info/:type?/:catType?`,
    categories: [`anime`],
    example: `/hpoi/info/all/hobby|model`,
    parameters: {
        type: {
            description: `情报类型`,
            options: [
                { value: `all`, label: `全部` },
                { value: `confirm`, label: `制作` },
                { value: `official_pic`, label: `官图更新` },
                { value: `preorder`, label: `开订` },
                { value: `delay`, label: `延期` },
                { value: `release`, label: `出荷` },
                { value: `reorder`, label: `再版` },
                { value: `hobby`, label: `手办(拟废弃, 无效果)` },
                { value: `model`, label: `动漫模型(拟废弃, 无效果)` },
            ],
            default: `all`,
        },
        catType: { description: `手办分类过滤, 使用|分割, 支持的分类见下表`, default: `all` },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `情报`,
    maintainers: [`sanmmm DIYgod`],
    description: `::: tip
  情报类型中的*手办*、*模型*只是为了兼容, 实际效果等同于**全部**, 如果只需要**手办**类型的情报, 可以使用参数*catType*, e.g. /hpoi/info/all/hobby
:::

|  手办   | 动漫模型 | 真实模型 | 毛绒布偶 | doll娃娃 | GK/其他 |
| ------ | ------- | ------- | ------- | ------- | ------ |
| hobby  |  model  |  real   | moppet  |  doll   | gkdiy  |`,
    handler: i,
};
async function i(r) {
    let { type: i = `all`, catType: a = `all` } = r.req.param(),
        o = `https://www.hpoi.net`,
        s = `${o}/user/home/ajax`,
        c = { all: `全部`, hobby: `手办`, model: `动漫模型`, real: `真实模型`, moppet: `毛绒布偶`, doll: `doll娃娃`, gkdiy: `GK/其他` },
        l = a.split(`|`).toSorted(),
        u = new Set(l.map((e) => c[e]));
    a.includes(`all`) && u.clear();
    let d = i;
    [`hobby`, `model`].includes(i) && (d = `all`);
    let f = `${s}?page=1&type=info&subType=${d}`,
        p = n((await t.post(f)).data)(`.home-info`)
            .toArray()
            .map((t) => {
                let r = n(t),
                    i = r(`.overlay-container`),
                    a = i.find(`a`).first().attr(`href`),
                    s = i.find(`.type-name`).first().text().trim(),
                    c = i.find(`img`).first().attr(`src`),
                    l = r(`.home-info-content`),
                    u = l.find(`.user-name`).contents()[0].data.trim(),
                    d = l.find(`.user-content`).text();
                return { title: d, pubDate: e(l.find(`.type-time`).text()), link: `${o}/${a}`, category: u, typeName: s, description: [`类型:${s}`, d, `更新内容: ${u}`, `<img src="${c}"/>`].join(`<br/>`) };
            }),
        m = u.size > 0 ? p.filter((e) => u.has(e.typeName)) : p,
        h = `手办维基 - 情报 - ${{ all: `全部`, confirm: `制作`, official_pic: `官图更新`, preorder: `开订`, delay: `延期`, release: `出荷`, reorder: `再版` }[d]}`;
    return { title: h, link: `${o}/user/home?type=info&subType=${i}&catType=${u.size > 0 ? l.join(`|`) : `all`}`, description: h, item: m, allowEmpty: !0 };
}
export { r as route };
