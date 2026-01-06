import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.teach.ustc.edu.cn/category/notice`,
    o = { teaching: `教学`, info: `信息`, exam: `考试`, exchange: `交流` },
    s = {
        path: `/jwc/:type?`,
        categories: [`university`],
        example: `/ustc/jwc/info`,
        parameters: { type: `分类，默认显示所有种类` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.teach.ustc.edu.cn/`], target: `/jwc` }],
        name: `教务处通知新闻`,
        maintainers: [`hang333`],
        handler: c,
        url: `www.teach.ustc.edu.cn/`,
        description: `| 信息 | 教学     | 考试 | 交流     |
| ---- | -------- | ---- | -------- |
| info | teaching | exam | exchange |`,
    };
async function c(s) {
    let c = s.req.param(`type`) ?? ``,
        l = i((await n({ method: `get`, url: `${a}${c === `` ? `` : `-` + c}` })).data),
        u = l(c === `` ? `ul[class="article-list with-tag"] > li` : `ul[class=article-list] > li`)
            .toArray()
            .map((e) => {
                let n = l(e).children();
                return {
                    title: c === `` ? l(n[0]).find(`a`).text() + ` - ` + l(n[1]).find(`a`).text() : l(n[0]).find(`a`).text(),
                    link: c === `` ? l(n[1]).find(`a`).attr(`href`) : l(n[0]).find(`a`).attr(`href`),
                    pubDate: r(t(l(e).find(`.date`).text().trim(), `YYYY-MM-DD`), 8),
                };
            });
    u = await Promise.all(
        u
            .filter((e) => e.link)
            .map((a) =>
                e.tryGet(a.link, async () => {
                    let e = i((await n(a.link)).data);
                    return (
                        (a.description = e(`main[class=single]`).html() ?? e(`.card-footer`).html() ?? e(`.v_news_content`).html()),
                        (a.pubDate = e(`li[class=meta-date]`).text() ? r(t(e(`li[class=meta-date]`).text(), `YYYY-MM-DD HH:mm`), 8) : a.pubDate),
                        a
                    );
                })
            )
    );
    let d = c === `` ? `中国科学技术大学教务处 - 通知新闻` : `中国科学技术大学教务处 - ${o[c]}类通知`;
    return { title: d, description: d, link: `${a}${c === `` ? `` : `-` + c}`, item: u };
}
export { s as route };
