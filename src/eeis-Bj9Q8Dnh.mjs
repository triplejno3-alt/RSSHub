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
        [`tzgg`, { title: `中国科学技术大学电子工程与信息科学系 - 通知公告`, id: `2702` }],
        [`xwxx`, { title: `中国科学技术大学电子工程与信息科学系 - 新闻信息`, id: `2706` }],
    ]),
    s = `https://eeis.ustc.edu.cn`,
    c = {
        path: `/eeis/:type?`,
        categories: [`university`],
        example: `/ustc/eeis/tzgg`,
        parameters: { type: `分类，见下表，默认为通知公告` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`eeis.ustc.edu.cn/`], target: `/eeis` }],
        name: `电子工程与信息科学系`,
        maintainers: [`jasongzy`],
        handler: l,
        url: `eeis.ustc.edu.cn/`,
        description: `| 通知公告 | 新闻信息 |
| -------- | -------- |
| tzgg     | xwxx     |`,
    };
async function l(c) {
    let l = c.req.param(`type`) ?? `tzgg`,
        u = o.get(l);
    if (!u) throw new i(`invalid type`);
    let d = u.id,
        f = a((await n(`${s}/${d}/list.htm`)).data),
        p = f(`div[portletmode=simpleList]`)
            .find(`article`)
            .toArray()
            .map((e) => {
                e = f(e);
                let n = e.find(`h4 > a`).eq(1).attr(`title`).trim(),
                    i = e.find(`h4 > a`).attr(`href`);
                return ((i = i.startsWith(`/`) ? s + i : i), { title: n, pubDate: r(t(e.find(`.post-date > time`).text().replace(`发布时间：`, ``), `YYYY-MM-DD`), 8), link: i });
            }),
        m = await Promise.all(
            p.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = ``;
                    try {
                        ((e = a((await n(t.link)).data)(`div.wp_articlecontent`).html()), (t.description = e));
                    } catch {}
                    return t;
                })
            )
        );
    return { title: u.title, link: `${s}/${d}/list.htm`, item: m };
}
export { c as route };
