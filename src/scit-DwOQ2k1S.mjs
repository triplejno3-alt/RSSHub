import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/scit/:type`,
    categories: [`university`],
    example: `/nju/scit/tzgg`,
    parameters: { type: `分类名` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `科学技术处`,
    maintainers: [`ret-1`],
    handler: a,
    description: `| 通知公告 | 科研动态 |
| -------- | -------- |
| tzgg     | kydt     |`,
};
async function a(i) {
    let a = i.req.param(`type`),
        o = { tzgg: [`https://scit.nju.edu.cn/10916/list.htm`, `通知公告`], kydt: [`https://scit.nju.edu.cn/11003/list.htm`, `科研动态`] },
        s = (await t({ method: `get`, url: o[a][0] })).data,
        c = r(s),
        l = c(`li.list_item`);
    return {
        title: `科学技术处-${o[a][1]}`,
        link: o[a][0],
        item: l.toArray().map((t) => ((t = c(t)), { title: t.find(`a`).attr(`title`), link: `https://scit.nju.edu.cn` + t.find(`a`).attr(`href`), pubDate: n(e(t.find(`.Article_PublishDate`).first().text(), `YYYY-MM-DD`), 8) })),
    };
}
export { i as route };
