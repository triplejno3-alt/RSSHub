import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './utils-AQwzBfkP.mjs';
const a = {
    path: `/home/:tag?`,
    categories: [`finance`],
    view: r.Articles,
    example: `/gelonghui/home`,
    parameters: {
        tag: {
            description: '分类标签，见下表，默认为 `web_home_page`',
            options: [
                { value: `web_home_page`, label: `推荐` },
                { value: `stock`, label: `股票` },
                { value: `fund`, label: `基金` },
                { value: `new_stock`, label: `新股` },
                { value: `research`, label: `研报` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `首页`,
    maintainers: [`TonyRL`],
    handler: o,
    description: `| 推荐            | 股票  | 基金 | 新股       | 研报     |
| --------------- | ----- | ---- | ---------- | -------- |
| web_home_page | stock | fund | new_stock | research |`,
};
async function o(r) {
    let { tag: a = `web_home_page` } = r.req.param(),
        { data: o } = await n(`https://www.gelonghui.com/api/channels/${a}/articles/v8`),
        s = o.result.map((e) => ((e = e.data), { title: e.title, description: e.summary, link: e.link, author: e.nick, category: e.source, pubDate: t(e.timestamp, `X`) }));
    return {
        title: `格隆汇-财经资讯动态-股市行情`,
        description: `格隆汇为中国投资者出海投资及中国公司出海融资,提供海外投资,港股开户行情,科创板股票发行数据、资讯、研究、交易等一站式服务,目前业务范围主要涉及港股与美股两大市场,未来将陆续开通台湾、日本、印度、欧洲等市场.`,
        image: `https://cdn.gelonghui.com/static/web/www.ico.la.ico`,
        link: `https://www.gelonghui.com`,
        item: await Promise.all(s.map((t) => i(t, e.tryGet))),
    };
}
export { a as route };
