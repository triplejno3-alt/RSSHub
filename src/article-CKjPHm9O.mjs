import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = `https://www.ymgal.games`,
    o = { news: `?type=NEWS&page=1`, column: `?type=COLUMN&page=1` },
    s = {
        path: `/article/:type?`,
        categories: [`anime`],
        example: `/ymgal/article`,
        parameters: { type: `文章类型` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `文章`,
        maintainers: [`SunBK201`],
        handler: c,
        description: `| 全部文章 | 资讯 | 专栏   |
| -------- | ---- | ------ |
| all      | news | column |`,
    };
async function c(s) {
    let c = s.req.param(`type`) || `all`,
        l = `${a}/co/topic/list` + o[c],
        u = [];
    c === `all`
        ? (await Promise.all(
              Object.values(o).map(async (e) => {
                  let t = await n(`${a}/co/topic/list${e}`);
                  u.push(...t.data.data);
              })
          ),
          (u = u.toSorted((e, t) => t.publishTime - e.publishTime).slice(0, 10)))
        : (u = (await n(l)).data.data);
    let d = await Promise.all(
            u.map((o) => {
                let s = a + `/co/article/` + o.topicId;
                return e.tryGet(s, async () => {
                    let e = i((await n(s)).data)(`article`)
                        .html()
                        .trim();
                    return { title: o.title, link: s, pubDate: r(t(o.publishTime), 8), description: e };
                });
            })
        ),
        f = `全部文章`;
    return (c === `news` ? (f = `资讯`) : c === `column` && (f = `专栏`), { title: `月幕 Galgame - ${f}`, link: `${a}/co/article`, description: `月幕 Galgame - ${f}`, item: d });
}
export { s as route };
