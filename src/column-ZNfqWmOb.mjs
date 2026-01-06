import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './utils-D3R77wdc.mjs';
const i = {
    path: `/column/:column`,
    categories: [`traditional-media`],
    example: `/bjnews/column/204`,
    parameters: { column: `栏目ID, 可从手机版网页URL中找到` },
    features: {},
    radar: [{ source: [`m.bjnews.com.cn/column/:column.htm`] }],
    name: `分类`,
    maintainers: [`dzx-dzx`],
    handler: a,
    url: `www.bjnews.com.cn`,
};
async function a(i) {
    let a = i.req.param(`column`),
        o = await e(`https://api.bjnews.com.cn/api/v101/news/column_news.php?column_id=${a}`),
        s = o.data
            .slice(0, i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`)) : 15)
            .map((e) => ({ title: e.row.title, guid: e.uuid, pubDate: n(t(e.row.publish_time), 8), updated: n(t(e.row.update_time), 8), link: `https://www.bjnews.com.cn/detail/${e.uuid}.html` })),
        c = await Promise.all(s.map((e) => r(e)));
    return { title: `新京报 - 栏目 - ${o.data[0].row.column_info[0].column_name}`, link: `https://m.bjnews.com.cn/column/${a}.html`, item: c };
}
export { i as route };
