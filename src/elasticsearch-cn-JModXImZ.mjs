import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t, t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/:params?`,
    categories: [`bbs`],
    example: `/elasticsearch-cn`,
    parameters: { params: `分类，可在对应分类页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`elasticsearch.cn/:params`, `elasticsearch.cn/`], target: `/:params` }],
    name: `发现`,
    maintainers: [`nczitzk`],
    handler: s,
    description:
        '如 [Elasticsearch 最新](https://elasticsearch.cn/category-2) 的 URL 为 `https://elasticsearch.cn/category-2`，则分类参数处填写 `category-2`，最后得到路由地址 [`/elasticsearch-cn/category-2`](https://rsshub.app/elasticsearch-cn/category-2)。\n\n  又如 [求职招聘 30 天热门](https://elasticsearch.cn/sort_type-hot____category-12__day-30) 的 URL 为 `https://elasticsearch.cn/sort_type-hot____category-12__day-30`，则分类参数处填写 `sort_type-hot____category-12__day-30`，最后得到路由地址 [`/elasticsearch-cn/sort_type-hot____category-12__day-30`](https://rsshub.app/elasticsearch-cn/sort_type-hot____category-12__day-30)。',
};
async function s(o) {
    let s = o.req.param(`params`) ?? ``,
        c = `https://elasticsearch.cn${s ? `/${s}` : ``}`,
        l = a((await r({ method: `get`, url: c })).data),
        u = l(`.aw-question-content`)
            .toArray()
            .map((e) => {
                e = l(e);
                let r = e.find(`h4 a`),
                    a = e.find(`span.text-color-999`).not(`.pull-right`).first().text().split(`•`).pop().trim();
                return { title: r.text(), link: r.attr(`href`), author: e.find(`.aw-user-name`).text(), pubDate: i(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(a) ? n(a) : t(a), 8) };
            });
    return (
        (u = await Promise.all(
            u.map((t) =>
                e.tryGet(
                    t.link,
                    async () => (
                        (t.description = a((await r({ method: `get`, url: t.link })).data)(`.markitup-box`)
                            .first()
                            .html()),
                        t
                    )
                )
            )
        )),
        { title: l(`title`).text(), link: c, item: u }
    );
}
export { o as route };
