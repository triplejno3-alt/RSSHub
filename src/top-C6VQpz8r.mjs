import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './outlink-BtztYN6T.mjs';
import { load as a } from 'cheerio';
const o = `https://lvv2.com`,
    s = {
        'sort-realtime': { 't-month': `24小时榜 一月内`, 't-week': `24小时榜 一周内`, 't-day': `24小时榜 一天内`, 't-hour': `24小时榜 一小时内` },
        'sort-hot': `热门`,
        'sort-new': `最新`,
        'sort-score': { 't-month': `得分 一月内`, 't-week': `得分 一周内`, 't-day': `得分 一天内`, 't-hour': `得分 一小时内` },
    },
    c = {
        path: `/top/:channel/:sort?`,
        categories: [`new-media`],
        example: `/lvv2/top/sort-score`,
        parameters: { channel: `频道，见下表`, sort: `排序方式，仅得分和24小时榜可选填该参数，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `24 小时点击排行 Top 10`,
        maintainers: [`Fatpandac`],
        handler: l,
        description: `|   热门   |   最新   |    得分    |   24 小时榜   |
| :------: | :------: | :--------: | :-----------: |
| sort-hot | sort-new | sort-score | sort-realtime |

| 排序方式 | 一小时内 | 一天内 | 一个周内 | 一个月内 |
| :------: | :------: | :----: | :------: | :------: |
|          |  t-hour  |  t-day |  t-week  |  t-month |`,
    };
async function l(c) {
    let l = c.req.param(`channel`),
        u = (l === `sort-realtime` || l === `sort-score`) && !c.req.param(`sort`) ? `t-week` : c.req.param(`sort`),
        d = `${o}/${l}/${u}`,
        f = a((await n(d)).data),
        p = f(`#top-content-news > div`)
            .toArray()
            .map((e) => ({ title: f(e).find(`div.md > a`).text(), link: new URL(f(e).find(`div.md > a`).attr(`href`), o).href.replace(/(https:\/\/lvv2\.com.*?)\/title.*/, `$1`) })),
        m = await Promise.all(
            p.map((o) =>
                e.tryGet(o.link, async () => {
                    let s = a((await n.get(o.link)).data);
                    ((o.pubDate = r(t(s(`time`).attr(`datetime`)), 8)), (o.author = s(`a.author`).text()));
                    let c = s(`h2.title > a.title`).attr(`href`);
                    return (
                        (o.description =
                            new URL(c, o.link).hostname === `instant.lvv2.com`
                                ? await e.tryGet(c, async () =>
                                      a((await n(c)).data)(`#_tl_editor`)
                                          .html()
                                          .replaceAll(/(<img.*?)data-src(.*?>)/g, `$1src$2`)
                                  )
                                : i(c)),
                        o
                    );
                })
            )
        );
    return { title: `lvv2 - ${u ? s[l][u] : s[l]} 24小时点击 Top 10`, link: d, item: m };
}
export { c as route };
