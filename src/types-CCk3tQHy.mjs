import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/gf/:type`,
    categories: [`traditional-media`],
    example: `/bjx/gf/sc`,
    parameters: { type: '分类，北极星光伏最后的`type`字段' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `光伏`,
    maintainers: [`Sxuet`],
    handler: i,
    description: `\`:type\` 类型可选如下

| 要闻 | 政策 | 市场行情 | 企业动态 | 独家观点 | 项目工程 | 招标采购 | 财经 | 国际行情 | 价格趋势 | 技术跟踪 |
| ---- | ---- | -------- | -------- | -------- | -------- | -------- | ---- | -------- | -------- | -------- |
| yw   | zc   | sc       | mq       | dj       | xm       | zb       | cj   | gj       | sj       | js       |`,
};
async function i(r) {
    let i = r.req.param(`type`),
        a = (await t({ method: `get`, url: `https://guangfu.bjx.com.cn/${i}/` })).data,
        o = n(a),
        s = o(`div.box2 em:last`).text(),
        c = o(`div.cc-list-content ul li`);
    return {
        title: `北极星太阳能光大网${s}`,
        description: o(`meta[name="Description"]`).attr(`content`),
        link: `https://guangfu.bjx.com.cn/${i}/`,
        item: c.toArray().map((t) => ((t = o(t)), { title: t.find(`a`).attr(`title`), description: t.html(), link: t.find(`a`).attr(`href`), pubDate: e(t.find(`span`).text()) })),
    };
}
export { r as route };
