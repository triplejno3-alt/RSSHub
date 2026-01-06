import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './invalid-parameter-DGZgOgO2.mjs';
import { load as a } from 'cheerio';
const o = new Map([
        [`xyxw`, { title: `中国科学技术大学数学科学学院 - 学院新闻`, id: `xyxw` }],
        [`tzgg`, { title: `中国科学技术大学数学科学学院 - 通知公告`, id: `tzgg` }],
        [`xsjl`, { title: `中国科学技术大学数学科学学院 - 学术交流`, id: `xsjl` }],
        [`xsbg`, { title: `中国科学技术大学数学科学学院 - 学术报告`, id: `xsbg_18822` }],
    ]),
    s = `https://math.ustc.edu.cn`,
    c = {
        path: `/math/:type?`,
        categories: [`university`],
        example: `/ustc/math/tzgg`,
        parameters: { type: `分类，见下表，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`math.ustc.edu.cn/`], target: `/math` }],
        name: `数学科学学院`,
        maintainers: [`ne0-wu`],
        handler: l,
        url: `math.ustc.edu.cn/`,
        description: `| 学院新闻 | 通知公告 | 学术交流 | 学术报告 |
| -------- | -------- | -------- | -------- |
| xyxw     | tzgg     | xsjl     | xsbg     |`,
    };
async function l(c) {
    let l = c.req.param(`type`) ?? `tzgg`,
        u = o.get(l);
    if (!u) throw new i(`invalid type`);
    let d = u.id,
        f = a((await n(`${s}/${d}/list.htm`)).data),
        p = f(`#wp_news_w6 > .wp_article_list > .list_item`)
            .toArray()
            .map((e) => {
                let n = f(e),
                    i = n.find(`.Article_Title > a`).attr(`title`).trim(),
                    a = n.find(`.Article_Title > a`).attr(`href`);
                return ((a = a.startsWith(`/`) ? s + a : a), { title: i, pubDate: r(t(n.find(`.Article_PublishDate`).text(), `YYYY-MM-DD`), -4), link: a });
            });
    return (
        (p = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = ``;
                    try {
                        ((e = a((await n(t.link)).data)(`div.wp_articlecontent`).html()), (t.description = e));
                    } catch {}
                    return t;
                })
            )
        )),
        { title: u.title, link: `${s}/${d}/list.htm`, item: p }
    );
}
export { c as route };
