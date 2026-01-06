import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = { tzgg: { link: `tzgg/`, title: `通知公告` } },
    o = {
        path: `/shenzhen/zjj/xxgk/:caty`,
        categories: [`government`],
        example: `/gov/shenzhen/zjj/xxgk/tzgg`,
        parameters: { caty: `信息类别` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`zjj.sz.gov.cn/xxgk/:caty`] }],
        name: `深圳市住房和建设局`,
        maintainers: [`lonn`],
        handler: s,
        description: `| 通知公告 |
| :------: |
|   tzgg   |`,
    };
async function s(o) {
    let s = a[o.req.param(`caty`)];
    if (!s) throw new r(`Bad category. See <a href="https://docs.rsshub.app/routes/government#guang-dong-sheng-ren-min-zheng-fu-shen-zhen-shi-zhu-fang-he-jian-she-ju">docs</a>`);
    let c = new URL(s.link, `http://zjj.sz.gov.cn/xxgk/`).href,
        { data: l } = await t(c),
        u = i(l),
        d = u(`div.listcontent_right ul li`)
            .toArray()
            .map((t) => {
                t = u(t);
                let r = t.find(`a`).first();
                return { title: r.text(), link: r.attr(`href`), pubDate: n(e(t.find(`span`).first().text(), `YY-MM-DD`), 0) };
            });
    return { title: `深圳市住房和建设局 - ` + s.title, link: c, item: d };
}
export { o as route };
