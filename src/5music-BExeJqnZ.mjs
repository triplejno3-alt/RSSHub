import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/new-releases/:category?`,
    categories: [`shopping`],
    example: `/5music/new-releases`,
    parameters: { category: `Category, see below, defaults to all` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.5music.com.tw/New_releases.asp`, `www.5music.com.tw/`], target: `/new-releases` }],
    name: `新貨上架`,
    maintainers: [`gideonsenku`],
    handler: i,
    description: `Categories:
| 華語 | 西洋 | 東洋 | 韓語 | 古典 |
| ---- | ---- | ---- | ---- | ---- |
| A | B | F | M | D |`,
    url: `www.5music.com.tw/New_releases.asp`,
};
async function i(r) {
    let i = `https://www.5music.com.tw/New_releases.asp?mut=${r.req.param(`category`) ?? `A`}`,
        { data: a } = await t(i),
        o = n(a);
    return {
        title: `五大唱片 - 新货上架`,
        link: i,
        item: o(`.releases-list .tbody > .box`)
            .toArray()
            .map((t) => {
                let n = o(t).find(`.td`),
                    r = o(n[0])
                        .find(`a`)
                        .toArray()
                        .map((e) => o(e).text().trim())
                        .join(` / `),
                    a = o(n[1]),
                    s = a.find(`a`).first().text().trim(),
                    c = a.find(`a`).first().attr(`href`),
                    l = o(n[2]).text().trim(),
                    u = o(n[3]).text().trim(),
                    d = o(n[4]).text().trim();
                return {
                    title: `${r} - ${s}`,
                    description: `
                    <p>艺人: ${r}</p>
                    <p>专辑: ${s}</p>
                    <p>发行公司: ${u}</p>
                    <p>格式: ${d}</p>
                    <p>发行日期: ${l}</p>
                `,
                    link: c ? `https://www.5music.com.tw/${c}` : i,
                    pubDate: e(l),
                    category: d,
                    author: r,
                };
            }),
        language: `zh-tw`,
    };
}
export { r as route };
