import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://www.bmie.neu.edu.cn`,
    a = {
        news: 561,
        academic: 562,
        talent_development: 563,
        international_exchange: `gjjl3`,
        announcement: 564,
        undergraduate_dev: 573,
        postgraduate_dev: 574,
        undergraduate_recruit: `bks`,
        postgraduate_recruit: 574,
        CPC_build: 556,
        CPC_work: 576,
        union_work: 577,
        CYL_work: `gqtgz`,
        security_management: 569,
        alumni_style: 557,
    },
    o = {
        path: `/bmie/:type`,
        categories: [`university`],
        example: `/neu/bmie/news`,
        parameters: { type: `分类 id 见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `医学与生物信息工程学院`,
        maintainers: [`tennousuathena`],
        handler: s,
        description: `| Id                      | 名称       |
| ----------------------- | ---------- |
| news                    | 学院新闻   |
| academic                | 学术科研   |
| talent_development     | 人才培养   |
| international_exchange | 国际交流   |
| announcement            | 通知公告   |
| undergraduate_dev      | 本科生培养 |
| postgraduate_dev       | 研究生培养 |
| undergraduate_recruit  | 本科生招募 |
| postgraduate_recruit   | 研究生招募 |
| CPC_build              | 党的建设   |
| CPC_work               | 党委工作   |
| union_work             | 工会工作   |
| CYL_work               | 共青团工作 |
| security_management    | 安全管理   |
| alumni_style           | 校友风采   |`,
    };
async function s(o) {
    let s = o.req.param(`type`);
    a[s] !== void 0 && (s = a[s]);
    let c = `${i}/${s}/list.htm`,
        l = (await n(c)).data,
        u = r(l),
        d = u(`title`).text(),
        f = u(`#subIndex > div.main_frame_sub > div.detail_sub > div > div > div > ul > li`).slice(0, 7).toArray(),
        p = await Promise.all(
            f.map(async (a) => {
                let o = r(a),
                    s = o(`a`).attr(`title`),
                    c = i + o(`a`).attr(`href`),
                    l = await e.tryGet(c, async () => {
                        let e = r((await n(c)).data),
                            t = e(e(`.ny_con p`)[1]).text(),
                            i = t.search(/\d{4}-\d{2}-\d{2}/),
                            a = t.substring(i, i + 10),
                            o = t.indexOf(`作者：`) + 3,
                            s = t.lastIndexOf(`|`),
                            l = t.substring(o, s).trim();
                        return (
                            e(`.entry`)
                                .find(`span`)
                                .each(function () {
                                    let t = e(this).text();
                                    e(this).replaceWith(t);
                                }),
                            e(`.entry`)
                                .find(`div`)
                                .each(function () {
                                    let t = e(this).html();
                                    e(this).replaceWith(t);
                                }),
                            e(`.entry`).find(`a`).remove(),
                            e(`.entry`)
                                .find(`p`)
                                .each(function () {
                                    (e(this).removeAttr(`style`), e(this).removeAttr(`class`));
                                }),
                            e(`.wp_art_adjoin`).remove(),
                            { description: e(`.entry`).html(), date: a, author: l }
                        );
                    });
                return { title: s, description: l.description, link: c, pubDate: t(l.date), author: l.author };
            })
        );
    return { title: `东北大学 医学与生物信息工程学院 ${d}`, link: c, item: p };
}
export { o as route };
