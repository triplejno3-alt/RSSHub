import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { tuijian: `tuijian`, TMT: `TMT`, jinrong: `jinrong`, dichan: `dichan`, xiaofei: `xiaofei`, yiyao: `yiyao`, wine: `wine`, IPO: `IPO` },
    o = {
        path: `/finance/:category?`,
        categories: [`new-media`],
        example: `/china/finance`,
        parameters: { category: `Category of news. See the form below for details, default is suggest news.` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`finance.china.com/:category`] }],
        name: `Finance News 财经 - 财经新闻`,
        maintainers: [`KingJem`],
        handler: s,
        description: `| 推荐    | TMT | 金融    | 地产   | 消费    | 医药  | 酒业 | IPO 观察 |
| ------- | --- | ------- | ------ | ------- | ----- | ---- | -------- |
| tuijian | TMT | jinrong | dichan | xiaofei | yiyao | wine | IPO      |

  > Note: The default news num is \`30\`.

  > 注意：默认新闻条数是 \`30\`。`,
    };
async function s(o) {
    let s = `https://finance.china.com/${a[o.req.param(`category`)] ?? a.tuijian}`,
        c = (await n(s)).data,
        l = i(c),
        u = `中华网-财经-${l(`.list-hd strong`).text()}新闻`,
        d = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 30,
        f = l(`.item-con-inner`)
            .toArray()
            .map((e) => ((e = l(e)), { link: e.find(`.tit>a`).attr(`href`) }))
            .filter((e) => e.link !== void 0)
            .slice(0, d),
        p = await Promise.all(
            f.map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n(a.link)).data);
                    return {
                        title: e(`.article_title`).text(),
                        link: a.link,
                        description: e(`#js_article_content`).html(),
                        pubDate: r(t(e(`.article_info>span.time`).text()), 8),
                        author: e(` div.article_info > span.source`).text(),
                        category: u,
                    };
                })
            )
        );
    return { title: l(`head title`).text(), link: s, category: u, item: p };
}
export { o as route };
