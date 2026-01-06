import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/news/:category?`,
    categories: [`study`],
    example: `/ccf/news`,
    parameters: { category: `分类，见下表，默认为 CCF 新闻` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ccf.org.cn/:category`, `ccf.org.cn/`], target: `/news/:category` }],
    name: `新闻`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| CCF 新闻    | CCF 聚焦 | ACM 信息  |
| ----------- | -------- | --------- |
| Media_list | Focus    | ACM_News |`,
};
async function a(i) {
    let a = i.req.param(`category`) || `Media_list`,
        o = `https://www.ccf.org.cn`,
        s = `${o}/${a}/`,
        c = r((await n(s)).data),
        l = c(`.tit a`)
            .toArray()
            .map((e) => ((e = c(e)), { title: e.text(), link: `${o}${e.attr(`href`)}` })),
        u = await Promise.all(
            l.map((i) =>
                e.tryGet(i.link, async () => {
                    let e = r((await n(i.link)).data);
                    return (e(`.new_info .num`).remove(), (i.description = e(`.txt`).html()), (i.pubDate = t(e(`.new_info span`).text())), i);
                })
            )
        );
    return { title: c(`title`).text(), link: s, item: u };
}
export { i as route };
