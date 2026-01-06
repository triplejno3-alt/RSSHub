import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './utils-BkyY0ser.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/dean/:code`,
    categories: [`university`],
    example: `/swpu/dean/tzgg`,
    parameters: { code: `栏目代码` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`swpu.edu.cn/`], target: `` }],
    name: `教务处`,
    maintainers: [`CYTMWIA`],
    handler: s,
    url: `swpu.edu.cn/`,
    description: `| 栏目 | 通知公告 | 新闻报道 | 视点声音 |
| ---- | -------- | -------- | -------- |
| 代码 | tzgg     | xwbd     | sdsy     |`,
};
async function s(o) {
    let s = `https://www.swpu.edu.cn/dean/${o.req.param(`code`)}.htm`,
        c = a((await n.get(s)).data),
        l = c(`.r_list > h3`).text();
    l = l.slice(l.indexOf(`：`) + 1);
    let u = c(`.r_list > ul > li`)
            .toArray()
            .map((e) => ({ title: c(`label:eq(0)`, e).text().trim(), link: i(`https://www.swpu.edu.cn/dean/`, c(`a`, e).attr(`href`)) })),
        d = await Promise.all(
            u.map(
                async (i) =>
                    await e.tryGet(i.link, async () => {
                        let e = a((await n.get(i.link)).data);
                        if (e(`title`).text().startsWith(`系统提示`)) ((i.author = `系统`), (i.description = `无权访问`));
                        else {
                            ((i.author = `教务处`), (i.description = e(`.v_news_content`).html()), (i.pubDate = r(t(e(`#lbDate`).text(), `更新时间：YYYY年MM月DD日`), 8)));
                            for (let t of e(`.v_news_content p`))
                                if (e(t).css(`text-align`) === `right`) {
                                    i.author = e(t).text();
                                    break;
                                }
                        }
                        return i;
                    })
            )
        );
    return { title: `西南石油大学教务处 ${l}`, link: s, description: `西南石油大学教务处 ${l}`, language: `zh-CN`, item: d };
}
export { o as route };
