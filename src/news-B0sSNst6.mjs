import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = `https://rustcc.cn`,
    a = { path: `/news`, categories: [`programming`], example: `/rustcc/news`, radar: [{ source: [`rustcc.cn/`] }], name: `新闻/聚合`, maintainers: [`zhenlohuang`], handler: o, url: `rustcc.cn/` };
async function o() {
    let e = `https://rustcc.cn/section?id=f4703117-7e6b-4caf-aa22-a3ad3db6898f`;
    return {
        title: `Rust语言中文社区 | 新闻/聚合`,
        link: e,
        description: `获取Rust语言中文社区的新闻/聚合`,
        item: r((await t({ url: e, headers: { Referer: i } })).data)(`.article-list li`)
            .toArray()
            .map((e) => s(e)),
    };
}
function s(t) {
    let a = r(t),
        o = a(`.title`);
    return { title: o.text(), link: `${i}${o.attr(`href`)}`, description: a(`.info .tags`).text(), pubDate: n(e(a(`.info .timestamp`).text(), `YYYY-MM-DD hh:mm`), 8) };
}
export { a as route };
