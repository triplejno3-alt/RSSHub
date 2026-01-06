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
    path: `/cjxy/:code`,
    categories: [`university`],
    example: `/swpu/cjxy/xyxw`,
    parameters: { code: `栏目代码` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`swpu.edu.cn/`], target: `` }],
    name: `财经学院`,
    maintainers: [`RiverTwilight`],
    handler: o,
    url: `swpu.edu.cn/`,
    description: `| 栏目 | 学院新闻 | 学院通知 |
| ---- | -------- | -------- |
| 代码 | xyxw     | xytz     |`,
};
async function o(a) {
    let o = `https://www.swpu.edu.cn/nccjxy/xydt/${a.req.param(`code`)}.htm`,
        s = i((await n(o)).data),
        c = s(`title`).text();
    c = c.slice(0, c.indexOf(`-`));
    let l = s(`.main_conRCb > ul > li`)
            .toArray()
            .map((e) => ({ title: s(`a[href]`, e).text().trim(), pubDate: r(t(s(`span`, e).text(), `YYYY年MM月DD日`), 8), link: `https://www.swpu.edu.cn/nccjxy/${s(`a[href]`, e).attr(`href`).split(`../`)[1]}` })),
        u = await Promise.all(
            l.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = i((await n(t.link)).data);
                    if (e(`title`).text().startsWith(`系统提示`)) ((t.author = `系统`), (t.description = `无权访问`));
                    else {
                        ((t.author = `财经学院`), (t.description = e(`.v_news_content`).html()));
                        for (let n of e(`.v_news_content p`))
                            if (e(n).css(`text-align`) === `right`) {
                                t.author = e(n).text();
                                break;
                            }
                    }
                    return t;
                })
            )
        );
    return { title: `西南石油大学财经学院 ${c}`, link: o, description: `西南石油大学财经学院 ${c}`, language: `zh-CN`, item: u };
}
export { a as route };
