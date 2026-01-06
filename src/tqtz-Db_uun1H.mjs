import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `http://www.cqgas.cn/portal/article/page?cateId=1082&pageNo=1`,
    a = {
        path: `/tqtz`,
        categories: [`forecast`],
        example: `/cqgas/tqtz`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`cqgas.cn/`] }],
        name: `停气检修通知`,
        maintainers: [`Mai19930513`],
        handler: o,
        url: `cqgas.cn/`,
    };
async function o() {
    let { data: a } = await n(i),
        o = r(a),
        s = (e) => `http://www.cqgas.cn/portal/article/content?contentId=${e}`,
        c = o(`ul.news_list > li`)
            .toArray()
            .map((e) => {
                e = o(e);
                let n = e.find(`a`).first();
                return { title: n.text(), link: s(n.attr(`contentid`)), pubDate: t(e.find(`span.right.txt_black2`).text()) };
            });
    return {
        title: `重庆燃气——停气检修通知`,
        link: i,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let { data: e } = await n(t.link);
                    return ((t.description = r(e)(`body > div`).first().html()), t);
                })
            )
        ),
    };
}
export { a as route };
