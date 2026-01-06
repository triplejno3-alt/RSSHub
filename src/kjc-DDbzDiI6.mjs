import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/kjc`,
    categories: [`university`],
    example: `/bjfu/kjc`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`kyc.bjfu.edu.cn/`] }],
    name: `科技处通知公告`,
    maintainers: [`markmingjie`],
    handler: o,
    url: `kyc.bjfu.edu.cn/`,
};
async function o() {
    let a = `http://kyc.bjfu.edu.cn/tztg/index.html`,
        o = (await n.get(a)).data,
        s = i(o),
        c = s(`.ll_con_r_b li`)
            .slice(0, 15)
            .toArray()
            .map((e) => {
                let n = s(e),
                    i = n.find(`.ll_con_r_b_title a`).text(),
                    a = n.find(`a`).attr(`href`),
                    o = r(
                        t(
                            n
                                .find(`.ll_con_r_b_time`)
                                .text()
                                .match(/\d{4}-\d{2}-\d{2}/)
                        ),
                        8
                    );
                return { title: i, link: `http://kyc.bjfu.edu.cn/tztg/` + a, author: `北京林业大学科技处通知公告`, pubDate: o };
            });
    return {
        title: `北林科技处通知`,
        link: a,
        item: await Promise.all(
            c.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = (await n.get(t.link)).data,
                        r = i(e);
                    return ((t.description = r(`#a_con_l_con`).html()), (t.title = t.title.includes(`...`) ? r(`#a_con_l_title`).text() : t.title), t);
                })
            )
        ),
    };
}
export { a as route };
