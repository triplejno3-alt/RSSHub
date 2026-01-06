import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = `https://yzxc.ustb.edu.cn`,
    a = `${i}/tzgg/index.htm`,
    o = {
        path: `/yzxc/tzgg`,
        categories: [`university`],
        example: `/ustb/yzxc/tzgg`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`yzxc.ustb.edu.cn/`] }],
        name: `研究生招生信息网`,
        maintainers: [`yanbot-team`],
        handler: s,
        url: `yzxc.ustb.edu.cn/`,
    };
async function s() {
    let o = r((await n(a)).data),
        s = o(`.page_content .ul-inline .box`);
    return {
        title: `北京科技大学研究生招生信息网 - 通知公告`,
        link: a,
        description: `北京科技大学研究生招生信息网 - 通知公告`,
        item: await Promise.all(
            s.map((a, s) => {
                let c = o(s),
                    l = c.find(`.time`).text(),
                    u = c.find(`.title a`),
                    d = u.text(),
                    f = u.last().attr(`href`),
                    p = ``;
                return (
                    (p = f.startsWith(`http`) ? f : f.startsWith(`..`) ? f.replaceAll(`..`, i) : i + f),
                    e.tryGet(p, async () => {
                        let e = d,
                            i = r((await n(p)).data);
                        return (i(`.article`) && i(`.article`).html() && (e = i(`.article`).html().trim()), { title: d, link: p, pubDate: t(l), description: e });
                    })
                );
            })
        ),
    };
}
export { o as route };
