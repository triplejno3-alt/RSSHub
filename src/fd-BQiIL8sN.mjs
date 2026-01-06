import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/fd/:type`,
    categories: [`traditional-media`],
    example: `/bjx/fd/yw`,
    parameters: { type: `文章分类，详见下表` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `风电`,
    maintainers: [`hualiong`],
    description: `\`:type\` 类型可选如下

| 要闻 | 政策 | 数据 | 市场 | 企业 | 招标 | 技术 | 报道 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| yw   | zc   | sj   | sc   | mq   | zb   | js   | bd   |`,
    handler: async (i) => {
        let a = i.req.param(`type`),
            o = r(await e(`https://fd.bjx.com.cn/${a}/`)),
            s = o(`div.box2 em:last-child`).text(),
            c = o(`div.cc-list-content ul li:nth-child(-n+20)`)
                .toArray()
                .map((e) => {
                    let t = o(e);
                    return { title: t.find(`a`).attr(`title`), link: t.find(`a`).attr(`href`), pubDate: n(t.find(`span`).text()) };
                }),
            l = await Promise.all(c.map((n) => t.tryGet(n.link, async () => ((n.description = r(await e(n.link))(`#article_cont`).html()), n))));
        return { title: `北极星风力发电网${s}`, description: o(`meta[name="Description"]`).attr(`content`), link: `https://fd.bjx.com.cn/${a}/`, item: l };
    },
};
export { i as route };
