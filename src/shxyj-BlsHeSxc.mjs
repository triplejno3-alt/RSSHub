import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/shxyj/:year?/:issue?`,
    categories: [`journal`],
    example: `/ajcass/shxyj/2024/1`,
    parameters: { year: 'Year of the issue, `null` for the lastest', issue: 'Issue number, `null` for the lastest' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `社会学研究`,
    maintainers: [`CNYoki`],
    handler: i,
};
async function i(r) {
    let { year: i, issue: a } = r.req.param();
    if (!i) {
        let e = n((await t(`https://shxyj.ajcass.com/`)).body)(`p.hod.pop`)
            .first()
            .text()
            .match(/(\d{4}) Vol\.(\d+):/);
        if (e) ((i = e[1]), (a = e[2]));
        else throw Error(`无法获取最新的 year 和 issue`);
    }
    let o = `https://shxyj.ajcass.com/Magazine/?Year=${i}&Issue=${a}`,
        s = n((await t(o)).body),
        c = s(`#tab tr`)
            .toArray()
            .map((t) => {
                let n = s(t),
                    r = n.find(`a`).first().text().trim(),
                    o = n.find(`a`).first().attr(`href`),
                    c = n.find(`li`).eq(1).text().replace(`[摘要]`, ``).trim(),
                    l = n.find(`li`).eq(2).text().replace(`作者：`, ``).trim(),
                    u = e(`${i}-${Number.parseInt(a) * 2}`);
                return r && o ? { title: r, link: `https://shxyj.ajcass.com${o}`, description: c, author: l, pubDate: u } : null;
            })
            .filter((e) => e !== null);
    return { title: `社会学研究 ${i}年第${a}期`, link: o, item: c };
}
export { r as route };
