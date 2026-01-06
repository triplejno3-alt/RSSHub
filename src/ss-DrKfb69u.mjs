import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/ss`,
    categories: [`university`],
    example: `/scnu/ss`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ss.scnu.edu.cn/tongzhigonggao`, `ss.scnu.edu.cn/`] }],
    name: `软件学院通知公告`,
    maintainers: [`shengmaosu`],
    handler: i,
    url: `ss.scnu.edu.cn/tongzhigonggao`,
};
async function i() {
    let r = `http://ss.scnu.edu.cn/tongzhigonggao/`,
        i = n((await t(r)).data),
        a = i(`.listshow li a`);
    return {
        title: `华南师范大学软件学院`,
        link: r,
        item:
            a &&
            a.toArray().map(
                (t) => (
                    (t = i(t)),
                    {
                        title: t
                            .contents()
                            .filter((e, t) => t.type === `text`)
                            .text(),
                        link: t.attr(`href`),
                        pubDate: e(t.find(`.time`).text()),
                    }
                )
            ),
    };
}
export { r as route };
