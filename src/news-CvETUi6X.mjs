import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/news/:type`,
    categories: [`university`],
    example: `/buaa/news/zhxw`,
    parameters: { type: `新闻版块` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `新闻网`,
    maintainers: [`AlanDecode`],
    handler: o,
    description: `| 综合新闻 | 信息公告 | 学术文化    | 校园风采 | 科教在线 | 媒体北航 | 专题新闻 | 北航人物 |
| -------- | -------- | ----------- | -------- | -------- | -------- | -------- | -------- |
| zhxw     | xxgg_new | xsjwhhd_new | xyfc_new | kjzx_new | mtbh_new | ztxw     | bhrw     |`,
};
async function o(a) {
    let o = `https://news.buaa.edu.cn`,
        { data: s, url: c } = await n(`${o}/${a.req.param(`type`)}.htm`),
        l = i(s),
        u = l(`.subnav span`).text().trim(),
        d = l(`.mainleft > .listlefttop > .listleftop1`)
            .toArray()
            .map((e) => {
                let n = l(e),
                    i = n.find(`h2 > a`);
                return { title: i.text(), link: new URL(i.attr(`href`), o).href, pubDate: r(t(n.find(`h2 em`).text(), `[YYYY-MM-DD]`), 8) };
            }),
        f = await Promise.all(
            d.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n(t.link)).data);
                    return ((t.description = e(`.v_news_content`).html() || ``), (t.author = e(`.vsbcontent_end`).text().trim()), t);
                })
            )
        );
    return { title: `北航新闻 - ${u}`, link: c, description: `北京航空航天大学新闻网 - ${u}`, language: `zh-CN`, item: f };
}
export { a as route };
