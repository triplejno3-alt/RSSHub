import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './invalid-parameter-DGZgOgO2.mjs';
import './wechat-mp-HNgcLN2K.mjs';
import { t } from './utils-DtKQmsNv.mjs';
const n = {
    path: `/dc/:type`,
    categories: [`university`],
    example: `/nua/dc/news`,
    parameters: { type: `News Type` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`dc.nua.edu.cn/:type/list.htm`] }],
    name: `School of Design`,
    maintainers: [`evnydd0sf`],
    handler: r,
    description: `| News Type                | Parameters |
| ------------------------ | ---------- |
| 学院新闻 NEWS            | news       |
| 展览 EXHIBITION          | exhibition |
| 研创 RESEARCH & CREATION | rc         |
| 项目 PROJECT             | project    |
| 党团 PARTY               | party      |
| 后浪 YOUTH               | youth      |`,
};
async function r(n) {
    let r = n.req.param(`type`),
        i = `https://dc.nua.edu.cn`,
        a,
        o,
        s,
        c;
    switch (r) {
        case `news`:
            ((a = `li.pre35.left li.news_list`), (o = `.date`), (s = `.article`), (c = `li.pre35.left .big_title`));
            break;
        case `exhibition`:
            ((a = `li.pre65.right li.effects`), (o = `.date`), (s = `.article`), (c = `li.pre65.right .big_title`));
            break;
        case `project`:
            ((a = `ul.center div.center_list_img`), (o = `.date`), (s = `.article`), (c = `ul.center .big_title`));
            break;
        case `rc`:
            ((a = `div.pre65.left p.small_content_2`), (o = `.date`), (s = `.article`), (c = `div.pre65.left.is-inview .big_title`));
            break;
        case `party`:
            ((a = `div.pre35.right li.party_list`), (o = `.date`), (s = `.article`), (c = `div.pre35.right .big_title`));
            break;
        case `youth`:
            ((a = `ul.works_list p.small_content_2.viewpoint`), (o = `.date`), (s = `.article`), (c = `ul.screen_4 .big_title`));
            break;
        default:
            throw new e(`暂不支持对${r}的订阅`);
    }
    let l = await t.ProcessList(i, i, a, o, c),
        u = await t.ProcessFeed(l[0], s);
    return { title: `NUA-设计学院-` + l[1], link: i, description: `南京艺术学院 设计学院 ` + l[1], item: u };
}
export { n as route };
