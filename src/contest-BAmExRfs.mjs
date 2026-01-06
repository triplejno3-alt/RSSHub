import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
import i from 'markdown-it';
import a from 'p-map';
const o = i(),
    s = `https://www.luogu.com.cn`,
    c = { ruleType: { 1: `OI`, 2: `ACM`, 3: `乐多`, 4: `IOI` }, visibilityType: { 1: `官方比赛`, 2: `团队公开赛`, 4: `个人公开赛` } },
    l = {
        path: `/contest`,
        categories: [`programming`],
        example: `/luogu/contest`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`luogu.com.cn/contest/list`, `luogu.com.cn/`] }],
        name: `比赛列表`,
        maintainers: [`prnake`],
        handler: u,
        url: `luogu.com.cn/contest/list`,
    };
async function u() {
    let i = `${s}/contest/list`,
        { data: l } = await n(i),
        u = r(l),
        d = await a(
            JSON.parse(
                decodeURIComponent(
                    u(`script`)
                        .text()
                        .match(/decodeURIComponent\("(.*)"\)/)[1]
                )
            ).currentData.contests.result,
            (i) =>
                e.tryGet(`${s}/contest/${i.id}`, async () => {
                    let { data: e } = await n(`${s}/contest/${i.id}`),
                        a = r(e),
                        l = JSON.parse(
                            decodeURIComponent(
                                a(`script`)
                                    .text()
                                    .match(/decodeURIComponent\("(.*)"\)/)[1]
                            )
                        );
                    return {
                        title: i.name,
                        description: o.render(l.currentData.contest.description),
                        link: `${s}/contest/${i.id}`,
                        author: i.host.name,
                        pubDate: t(i.startTime, `X`),
                        category: [i.rated ? `Rated` : null, c.ruleType[i.ruleType], c.visibilityType[i.visibilityType]].filter(Boolean),
                    };
                }),
            { concurrency: 4 }
        );
    return { title: u(`head title`).text(), link: i, image: `https://www.luogu.com.cn/favicon.ico`, item: d };
}
export { l as route };
