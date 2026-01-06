import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/yan/:category?`,
    categories: [`university`],
    example: `/sicau/yan/xwgg`,
    parameters: { category: `分类，见下表，默认为新闻公告` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yan.sicau.edu.cn/`] }],
    name: `研究生院`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `yan.sicau.edu.cn/`,
    description: `| 新闻公告 | 学术报告 |
| -------- | -------- |
| xwgg     | xsbg     |`,
};
async function o(a) {
    let o = a.req.param(`category`) ?? `xwgg`,
        s = `https://yan.sicau.edu.cn`,
        c = `${s}/index/${o}.htm`,
        l = i((await n({ method: `get`, url: c })).data),
        u = l(`.list-4 a[title]`)
            .slice(0, 10)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.text(), link: `${s}${e.attr(`href`).replace(/\.\./, `/`)}` })),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = await n({ method: `get`, url: a.link });
                    return ((a.description = i(e.data)(`.v_news_content`).html()), (a.pubDate = r(t(e.data.match(/发布时间: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/)[1], `YYYY-MM-DD HH:mm:ss`), 8)), a);
                })
            )
        );
    return { title: l(`title`).text(), link: c, item: d };
}
export { a as route };
