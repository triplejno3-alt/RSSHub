import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://jwc.qdu.edu.cn/`,
    o = {
        path: `/jwc`,
        categories: [`university`],
        example: `/qdu/jwc`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`jwc.qdu.edu.cn/jwtz.htm`, `jwc.qdu.edu.cn/`] }],
        name: `教务处通知`,
        maintainers: [`abc1763613206`],
        handler: s,
        url: `jwc.qdu.edu.cn/jwtz.htm`,
    };
async function s() {
    let o = i((await n({ method: `get`, url: `${a}jwtz.htm` })).data),
        s = o(`.notice_item`).children(),
        c = await Promise.all(
            s.map((s, c) => {
                c = o(c);
                let l = c.find(`.active`).text(),
                    u = c.find(`span`).text(),
                    d = c.find(`.active`).attr(`href`),
                    f = ``;
                return (
                    (f = d.startsWith(`http`) ? d : a + d),
                    e.tryGet(f, async () => {
                        let e = ``;
                        if (d.startsWith(`http`)) e = l;
                        else {
                            let t = i((await n(f)).data);
                            e = t(`title`).text() === `系统提示` ? l : t(`.v_news_content`).html().trim();
                        }
                        return { title: l, link: f, pubDate: r(t(u), 8), description: e };
                    })
                );
            })
        );
    return { title: `青岛大学 - 教务处通知`, link: `${a}jwtz.htm`, description: `青岛大学 - 教务处通知`, item: c };
}
export { o as route };
