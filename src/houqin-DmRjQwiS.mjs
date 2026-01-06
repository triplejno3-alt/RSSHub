import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://houqin.qdu.edu.cn/`,
    o = {
        path: `/houqin`,
        categories: [`university`],
        example: `/qdu/houqin`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`houqin.qdu.edu.cn/tzgg.htm`, `houqin.qdu.edu.cn/`] }],
        name: `后勤管理处通知`,
        maintainers: [`abc1763613206`],
        handler: s,
        url: `houqin.qdu.edu.cn/tzgg.htm`,
    };
async function s() {
    let o = i((await n({ method: `get`, url: `${a}index/tzgg.htm` })).data),
        s = o(`.n_newslist`).children(),
        c = await Promise.all(
            s.map((s, c) => {
                c = o(c);
                let l = c.find(`a`).text(),
                    u = r(t(c.find(`span`).text()), 8),
                    d = a + c.find(`a`).attr(`href`);
                return e.tryGet(d, async () => {
                    let e = ``,
                        a = i((await n(d)).data);
                    return (
                        a(`.article_body`)
                            .find(`div > h4`)
                            .text()
                            .match(/发布时间：(.*)编辑：/) !== null &&
                            (u = r(
                                t(
                                    a(`.article_body`)
                                        .find(`div > h4`)
                                        .text()
                                        .match(/发布时间：(.*)编辑：/)[1]
                                        .trim(),
                                    `YYYY年MM月DD日 HH:mm`
                                ),
                                8
                            )),
                        (e = a(`.v_news_content`).html().trim()),
                        { title: l, link: d, pubDate: u, description: e }
                    );
                });
            })
        );
    return { title: `青岛大学 - 后勤管理处通知`, link: `${a}index/tzgg.htm`, description: `青岛大学 - 后勤管理处通知`, item: c };
}
export { o as route };
