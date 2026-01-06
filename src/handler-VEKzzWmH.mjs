import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
import r from 'p-map';
const i = {
        notice: { title: `通知公告`, baseUrl: `http://www.cpta.com.cn/notice.html`, description: `中国人事考试网 考试通知公告汇总` },
        performance: { title: `成绩公布`, baseUrl: `http://www.cpta.com.cn/performance.html`, description: `中国人事考试网 考试成绩公布汇总` },
    },
    a = {
        path: `/:category`,
        name: `中国人事考试网发布`,
        maintainers: [`PrinOrange`],
        parameters: { category: `栏目参数，可见下表描述。` },
        description: `
| Category    | Title     | Description                         |
|-------------|-----------|-------------------------------------|
| notice      | 通知公告  | 中国人事考试网 考试通知公告汇总    |
| performance | 成绩公布  | 中国人事考试网 考试成绩公布汇总    |
`,
        handler: async (a) => {
            let o = a.req.param(`category`),
                s = i[o].baseUrl,
                { data: c } = await t(s),
                l = n(c),
                u = await r(
                    l(`ul[class*="list_14"] > li:has(*)`)
                        .toArray()
                        .map((e) => {
                            let t = l(e).find(`a`).attr(`title`),
                                n = l(e).find(`i`).text().replaceAll(/[[\]]/g, ``),
                                r = l(e).find(`a`).attr(`href`);
                            return { title: t, date: n, link: new URL(r, `http://www.cpta.com.cn`).href };
                        })
                        .toSorted((e, t) => new Date(t.date).getTime() - new Date(e.date).getTime())
                        .slice(0, 10),
                    (r) =>
                        e.tryGet(r.link, async () => {
                            let { data: e } = await t(r.link),
                                i = n(e)(`#p_content`).html() || ``;
                            return {
                                title: r.title,
                                pubDate: r.date,
                                link: r.link,
                                description: i,
                                category: [`study`],
                                guid: r.link,
                                id: r.link,
                                image: `https://www.gov.cn/images/gtrs_logo_lt.png`,
                                content: { html: i, text: i },
                                updated: r.date,
                                language: `zh-CN`,
                            };
                        }),
                    { concurrency: 1 }
                );
            return {
                title: `中国人事考试网-${i[o].title}`,
                description: i[o].description,
                link: s,
                image: `https://www.gov.cn/images/gtrs_logo_lt.png`,
                item: u,
                allowEmpty: !0,
                language: `zh-CN`,
                feedLink: `https://rsshub.app/cpta/${o}`,
                id: `https://rsshub.app/cpta/${o}`,
            };
        },
        categories: [`study`],
        features: { requireConfig: !1, requirePuppeteer: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, supportRadar: !0, antiCrawler: !0 },
        radar: [
            { title: `中国人事考试网通知公告`, source: [`www.cpta.com.cn/notice.html`, `www.cpta.com.cn`], target: `/notice` },
            { title: `中国人事考试网成绩发布`, source: [`www.cpta.com.cn/performance.html`, `www.cpta.com.cn`], target: `/performance` },
        ],
        example: `/cpta/notice`,
    };
export { a as route };
