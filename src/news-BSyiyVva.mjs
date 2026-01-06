import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as n } from './cache-DLkCV5c7.mjs';
import { n as r, t as i } from './parse-date-DjdQS_Nt.mjs';
import { t as a } from './timezone-CrV-DT8S.mjs';
import { t as o } from './wechat-mp-HNgcLN2K.mjs';
import { load as s } from 'cheerio';
const c = {
        all: { name: `最新资讯`, link: `https://www.oschina.net/news/project`, ajaxUrl: `https://www.oschina.net/news/widgets/_news_index_all_list?p=1&type=ajax` },
        industry: { name: `综合资讯`, link: `https://www.oschina.net/news/industry`, ajaxUrl: `https://www.oschina.net/news/widgets/_news_index_generic_list?p=1&type=ajax` },
        project: { name: `软件更新资讯`, link: `https://www.oschina.net/news/project`, ajaxUrl: `https://www.oschina.net/news/widgets/_news_index_project_list?p=1&type=ajax` },
        'industry-news': { name: `行业资讯`, link: `https://www.oschina.net/news/industry-news`, ajaxUrl: `https://www.oschina.net/news/widgets/_news_index_industry_list?p=1&type=ajax` },
        programming: { name: `编程语言资讯`, link: `https://www.oschina.net/news/programming`, ajaxUrl: `https://www.oschina.net/news/widgets/_news_index_programming_language_list?p=1&type=ajax` },
    },
    l = {
        path: `/news/:category?`,
        categories: [`programming`],
        example: `/oschina/news/project`,
        parameters: { category: `板块名` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`oschina.net/news/:category`], target: `/news/:category` }],
        name: `资讯`,
        maintainers: [`tgly307`, `zengxs`],
        handler: d,
        description: `| [综合资讯][osc_gen] | [软件更新资讯][osc_proj] | [行业资讯][osc_ind] | [编程语言资讯][osc_pl] |
| ------------------- | ------------------------ | ------------------- | ---------------------- |
| industry            | project                  | industry-news       | programming            |

  订阅 [全部板块资讯][osc_all] 可以使用 [https://rsshub.app/oschina/news](https://rsshub.app/oschina/news)

  [osc_all]: https://www.oschina.net/news "开源中国 - 全部资讯"

  [osc_gen]: https://www.oschina.net/news/industry "开源中国 - 综合资讯"

  [osc_proj]: https://www.oschina.net/news/project "开源中国 - 软件更新资讯"

  [osc_ind]: https://www.oschina.net/news/industry-news "开源中国 - 行业资讯"

  [osc_pl]: https://www.oschina.net/news/programming "开源中国 - 编程语言资讯"`,
    },
    u = () =>
        n.tryGet(
            `oschina:cookie`,
            async () =>
                (await e.raw(`https://www.oschina.net/news`)).headers
                    .getSetCookie()
                    .map((e) => e.split(`;`)[0])
                    .join(`; `),
            t.cache.routeExpire,
            !1
        );
async function d(t) {
    let l = c[t.req.param(`category`) ?? `all`],
        d = await u(),
        f = s(await e(l.ajaxUrl, { headers: { Referer: l.link, 'X-Requested-With': `XMLHttpRequest`, Cookie: d } }));
    f(`.ad-wrap`).remove();
    let p = f(`.items .news-item`)
            .toArray()
            .map((e) => {
                e = f(e);
                let t = e.find(`.extra > .list > .item:nth-of-type(2)`).text();
                return { title: e.find(`h3 a`).attr(`title`), description: e.find(`.description p`).text(), link: e.find(`h3 a`).attr(`href`), pubDate: a(/\//.test(t) ? i(t, [`YYYY/MM/DD HH:mm`, `MM/DD HH:mm`]) : r(t), 8) };
            }),
        m = await Promise.all(
            p.map((t) =>
                n.tryGet(t.link, async () => {
                    if (/^https?:\/\/(my|www)\.oschina.net\/.*$/.test(t.link)) {
                        let n = s(await e(t.link, { headers: { Referer: l.link, Cookie: d } }));
                        (n(`.ad-wrap`).remove(), (t.description = n(`.article-detail`).html()), (t.author = n(`.article-box__meta .item`).first().text()));
                    } else if (/^https?:\/\/gitee\.com\/.*$/.test(t.link)) t.description = s(await e(t.link, { headers: { Referer: l.link } }))(`.file_content`).html();
                    else if (/^https?:\/\/osc\.cool\/.*$/.test(t.link)) return o(t.link, !0);
                    return t;
                })
            )
        );
    return { title: `开源中国-${l.name}`, link: l.link, item: m };
}
export { l as route };
