import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { 112: `总局要闻`, 113: `公告公示`, 114: `工作动态` },
    o = {
        path: `/nrta/news/:category?`,
        categories: [`government`],
        example: `/gov/nrta/news`,
        parameters: { category: `资讯类别，可从地址中获取，默认为总局要闻` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `分类`,
        maintainers: [`yuxinliu-alex`],
        handler: s,
        description: `| 总局要闻 | 公告公示 | 工作动态 | 其他 |
| -------- | -------- | -------- | ---- |
| 112      | 113      | 114      |      |`,
    };
async function s(o) {
    let s = o.req.param(`category`) ?? 112,
        c = i((await n({ method: `get`, url: `http://www.nrta.gov.cn/col/col${s}/index.html` })).data.replaceAll(/<!\[cdata\[([\S\s]*?)]]>(?=\s*<)/gi, `$1`), { xmlMode: !0 }),
        l = c(`a`, `record`)
            .toArray()
            .map((e) => ((e = c(e)), { link: e.attr(`href`) })),
        u = await Promise.all(
            l.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return (
                        (a.title = e(`td[id="artTitMob"]`).text()),
                        (a.description = e(`div[id="c"]`).html()),
                        (a.pubDate = r(t(e(`.mobile_time.shareWarpTime`).text().trim()), 8)),
                        (a.author = e(`.mobile_time.shareFromz`).text()),
                        a
                    );
                })
            )
        );
    return { title: s in a ? a[s] : `其他`, link: `http://www.nrta.gov.cn/col/col${s}/index.html`, description: `国家广播电视总局`, language: `zh-cn`, item: u };
}
export { o as route };
