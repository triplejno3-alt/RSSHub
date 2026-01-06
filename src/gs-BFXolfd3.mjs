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
        [`tzgg`, { title: `中国科学技术大学研究生院 - 通知公告`, id: `9` }],
        [`xwdt`, { title: `中国科学技术大学研究生院 - 新闻动态`, id: `10` }],
    ]),
    s = `https://gradschool.ustc.edu.cn`,
    c = {
        path: `/gs/:type?`,
        categories: [`university`],
        example: `/ustc/gs/tzgg`,
        parameters: { type: `分类，见下表，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`gradschool.ustc.edu.cn/`], target: `/gs` }],
        name: `研究生院`,
        maintainers: [`jasongzy`],
        handler: l,
        url: `gradschool.ustc.edu.cn/`,
        description: `| 通知公告 | 新闻动态 |
| -------- | -------- |
| tzgg     | xwdt     |`,
    };
async function l(c) {
    let l = c.req.param(`type`) ?? `tzgg`,
        u = o.get(l);
    if (!u) throw new i(`invalid type`);
    let d = u.id,
        f = a((await n(`${s}/column/${d}`)).data),
        p = f(`div.r-box > ul`)
            .find(`li`)
            .toArray()
            .map((e) => {
                e = f(e);
                let n = e.find(`a`).text().trim(),
                    i = e.find(`a`).attr(`href`).startsWith(`/article`) ? s + e.find(`a`).attr(`href`) : e.find(`a`).attr(`href`);
                return { title: n, pubDate: r(t(e.find(`time`).text(), `YYYY-MM-DD`), 8), link: i };
            });
    return (
        (p = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = ``;
                    try {
                        ((e = a((await n(t.link)).data)(`article.article`).html()), (t.description = e));
                    } catch {}
                    return t;
                })
            )
        )),
        { title: u.title, link: `${s}/column/${d}`, item: p }
    );
}
export { c as route };
