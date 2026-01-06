import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import * as i from 'cheerio';
const a = {
    path: `/mesalab/kb`,
    categories: [`university`],
    example: `/cas/mesalab/kb`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.mesalab.cn/f/article/articleList`, `www.mesalab.cn/`] }],
    name: `信息工程研究所 第二研究室 处理架构组 知识库`,
    maintainers: [`renzhexigua`],
    handler: o,
    url: `www.mesalab.cn/f/article/articleList`,
};
async function o() {
    let a = `https://www.mesalab.cn`,
        o = `${a}/f/article/articleList?pageNo=1&pageSize=15&createTimeSort=DESC`,
        s = await n(o),
        c = i.load(s.data),
        l = c(`.aw-item`).toArray();
    return {
        title: `MESA 知识库`,
        description: `中国科学院信息工程研究所 第二研究室 处理架构组`,
        link: o,
        item: await Promise.all(
            l.map((o) => {
                let s = c(o).find(`a`).first(),
                    l = s.text().trim(),
                    u = `${a}${s.attr(`href`)}`;
                return e.tryGet(u, async () => {
                    let e = await n(u),
                        a = i.load(e.data);
                    return {
                        title: l,
                        author: a(`.user_name`).text(),
                        pubDate: r(t(a(`.link_postdate`).text().replaceAll(/\s+/g, ` `)), 8),
                        description: a(`#article_content`).html() + (a(`.attachment`).length ? a(`.attachment`).html() : ``),
                        link: u,
                        category: a(`.category .category_r span`).first().text(),
                    };
                });
            })
        ),
    };
}
export { a as route };
