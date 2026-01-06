import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = { notice: `tzgg`, scholar: `xsdt` },
    o = { notice: `通知公告`, scholar: `学术动态` },
    s = {
        path: `/main/:type`,
        categories: [`university`],
        example: `/upc/main/notice`,
        parameters: { type: `分类，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `主页`,
        maintainers: [`Veagau`],
        handler: c,
        description: `| 通知公告 | 学术动态 |
| -------- | -------- |
| notice   | scholar  |`,
    };
async function c(s) {
    let c = `https://news.upc.edu.cn`,
        l = s.req.param(`type`),
        u = `${c}/${a[l]}.htm`,
        d = i((await n({ method: `get`, url: u })).data),
        f = d(`.main-list-box-left li`)
            .toArray()
            .map((e) => {
                e = d(e);
                let n = e.find(`.li-right-bt a`),
                    r = n.attr(`href`);
                return { title: n.text(), description: e.find(`.li-right-zy a`).text(), link: r.startsWith(`http`) ? r : `${c}/${r}`, pubDate: t(e.find(`.li-left`).text(), `DDYYYY-MM`) };
            }),
        p = await Promise.all(
            f.map((a) =>
                e.tryGet(a.link, async () => {
                    if (!a.link.startsWith(`${c}/`) || a.link.includes(`content.jsp`)) return a;
                    let e = i((await n({ method: `get`, url: a.link })).data);
                    return ((a.description = e(`.v_news_content`).html()), (a.pubDate = r(t(e(`.nr-xinxi i`).first().text(), `YYYY-MM-DD HH:mm:ss`), 8)), a);
                })
            )
        );
    return { title: o[l] + `-中国石油大学（华东）`, link: u, description: o[l] + `-中国石油大学（华东）`, item: p };
}
export { s as route };
