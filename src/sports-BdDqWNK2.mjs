import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = `https://sports.swjtu.edu.cn`,
    a = `${i}/xwzx.htm`,
    o = {
        path: `/sports`,
        categories: [`university`],
        example: `/swjtu/sports`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`sports.swjtu.edu.cn/`] }],
        name: `体育学院`,
        description: `新闻资讯`,
        maintainers: [`AzureG03`],
        handler: c,
    },
    s = (t, a) => {
        let o = t.find(`p.toe`).text(),
            s = `${i}/${t.find(`a`).attr(`href`)}`;
        return a.tryGet(s, async () => {
            let t = r(await e(s));
            return {
                title: o,
                pubDate: n(
                    t(`div.info span:nth-of-type(3)`)
                        .text()
                        .slice(3)
                        .match(/\d{4}(-|\/|.)\d{1,2}\1\d{1,2}/)?.[0]
                ),
                link: s,
                description: t(`div.detail-wrap`).html(),
            };
        });
    };
async function c() {
    let n = r(await e(a)),
        i = n(`div.news-list > ul > li`);
    return { title: `西南交大体院-新闻资讯`, link: a, item: await Promise.all(i.toArray().map((e) => s(n(e), t))), allowEmpty: !0 };
}
export { o as route };
