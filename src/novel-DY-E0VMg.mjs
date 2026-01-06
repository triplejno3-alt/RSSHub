import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/novel/:id`,
    categories: [`reading`],
    example: `/linovelib/novel/2547`,
    parameters: { id: `小说 id，对应书架开始阅读 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `小说更新`,
    maintainers: [`misakicoca`],
    handler: r,
};
async function r(n) {
    let r = t((await e(`https://www.linovelib.com/novel/${n.req.param(`id`)}/catalog`)).data),
        i = r(`.book-meta`),
        a = i.children().first().text(),
        o = i.find(`p > span > a`).text(),
        s = r(`.chapter-list`)
            .find(`li`)
            .find(`a`)
            .toArray()
            .filter((e) => r(e).attr(`href`).startsWith(`/novel/`))
            .map((e) => ({ title: r(e).text(), author: o, description: r(e).text(), link: `https://www.linovelib.com${r(e).attr(`href`)}` }));
    return (s.reverse(), { title: `哩哔轻小说 - ${a}`, link: `https://www.linovelib.com/novel/${n.req.param(`id`)}/catalog`, description: a, language: `zh`, item: s });
}
export { n as route };
