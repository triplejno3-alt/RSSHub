import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://neunews.neu.edu.cn`,
    a = {
        path: `/news/:type`,
        categories: [`university`],
        example: `/neu/news/ddyw`,
        parameters: { type: `种类名，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`neunews.neu.edu.cn/:type/list.htm`] }],
        name: `新闻网`,
        maintainers: [`JeasonLau`],
        handler: o,
        description: `| 种类名   | 参数 |
| -------- | ---- |
| 东大要闻 | ddyw |
| 媒体东大 | mtdd |
| 通知公告 | tzgg |
| 新闻纵横 | xwzh |
| 人才培养 | rcpy |
| 学术科研 | xsky |
| 英文新闻 | 217  |
| 招生就业 | zsjy |
| 考研出国 | kycg |
| 校园文学 | xywx |
| 校友风采 | xyfc |
| 时事热点 | ssrd |
| 教育前沿 | jyqy |
| 文化体育 | whty |
| 最新科技 | zxkj |`,
    };
async function o(a) {
    let o = `${i}/${a.req.param(`type`)}/list.htm`,
        s = (await n(o)).data,
        c = r(s),
        l = c(`.column-news-list > .news_list > .news`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.find(`a`).attr(`title`), link: new URL(e.find(`a`).attr(`href`), i).href, pubDate: t(e.find(`.news_meta`).text(), `YYYY-MM-DD`) })),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n(t.link)).data);
                    return ((t.author = e(`.arti-metas`).text().split(`更新日期`)[0]), (t.description = e(`.article_content`).html()), t);
                })
            )
        );
    return { title: `东北大学新闻网-${c(`head title`).text()}`, link: o, item: u };
}
export { a as route };
