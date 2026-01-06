import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/daily/:id?`,
    categories: [`programming`],
    example: `/luogu/daily`,
    parameters: { id: '年度日报所在帖子 id，可在 URL 中找到，不填默认为 `47327`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`luogu.com.cn/discuss/47327`, `luogu.com.cn/`], target: `/daily` }],
    name: `日报`,
    maintainers: [`LogicJake`, `prnake`, `nczitzk`],
    handler: i,
    url: `luogu.com.cn/discuss/47327`,
};
async function i(r) {
    let i = `https://www.luogu.com.cn/discuss/${r.req.param(`id`) ?? 47327}`,
        a = n((await t(i)).data),
        o = a(`head title`).text(),
        s = a(`head script:contains("window._feInjection")`)
            .text()
            .match(/window\._feInjection = JSON\.parse\(decodeURIComponent\("(.*?)"\)\);/)[1],
        c = JSON.parse(decodeURIComponent(s)),
        l = c.currentData.post.content.match(/<([^>]*)>/)[1],
        { data: u } = await t(l),
        d = n(u),
        f = d(`.am-article-title`).first().text().trim();
    return { title: `洛谷日报`, link: i, item: [{ title: o, description: d(`#article-content`).html(), link: i, author: c.currentData.post.author.name, guid: `${i}#${f}`, pubDate: e(c.currentData.post.time) }] };
}
export { r as route };
