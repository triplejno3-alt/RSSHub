import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './utils-3_CTTXEb.mjs';
const a = {
    path: `/dy/:id`,
    categories: [`new-media`],
    example: `/163/dy/W4983108759592548559`,
    parameters: { id: `网易号 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `更新`,
    maintainers: [`HendricksZheng`],
    handler: o,
    description:
        '1.  在[网易号搜索页面](https://dy.163.com/v2/media/tosearch.html) 搜索想要订阅的网易号。\n  2.  打开网易号的任意文章。\n  3.  查看源代码，搜索 `data-wemediaid`，查看紧随其后的引号内的属性值（类似 `W1966190042455428950`）即为网易号 ID。',
};
async function o(a) {
    let o = (await n(`https://dy.163.com/v2/article/list.do?pageNo=1&wemediaId=${a.req.param(`id`)}&size=10`)).data.data.list.map((e) => ({
            title: e.title,
            link: `https://www.163.com/dy/article/` + e.docid + `.html`,
            pubDate: r(t(e.ptime), 8),
            author: e.source,
            imgsrc: e.imgsrc,
        })),
        s = await Promise.all(o.map((t) => i(t, e.tryGet)));
    return { title: `网易号 - ${o[0].author}`, link: s[0].feedLink, description: s[0].feedDescription, image: s[0].feedImage, item: s };
}
export { a as route };
