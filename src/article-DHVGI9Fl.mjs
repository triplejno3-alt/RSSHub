import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = `https://yysub.net`,
    s = {
        path: `/article/:type?`,
        categories: [`multimedia`],
        view: i.Articles,
        example: `/yyets/article`,
        parameters: {
            type: {
                description: `类型`,
                options: [
                    { value: `all`, label: `全部` },
                    { value: `news`, label: `影视资讯` },
                    { value: `report`, label: `收视快报` },
                    { value: `m_review`, label: `人人影评` },
                    { value: `t_review`, label: `人人剧评` },
                    { value: `new_review`, label: `新剧评测` },
                    { value: `recom`, label: `片单推荐` },
                ],
                default: `all`,
            },
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `影视资讯`,
        maintainers: [`wb121017405`],
        handler: c,
        description: `| 全部 | 影视资讯 | 收视快报 | 人人影评  | 人人剧评  | 新剧评测    | 片单推荐 |
| ---- | -------- | -------- | --------- | --------- | ----------- | -------- |
|      | news     | report   | m_review | t_review | new_review | recom    |`,
    };
async function c(i) {
    let s = i.req.param(`type`) ?? ``,
        c = `${o}/article${s ? `?type=` + s : ``}`,
        l = a((await n(c)).data),
        u = l(`.article-list li .fl-info`)
            .toArray()
            .map((e) => ((e = l(e)), { title: e.find(`h3 a`).text(), link: `${o}${e.find(`h3 a`).attr(`href`)}`, author: e.find(`p a`).text(), pubDate: r(t(e.find(`p`).eq(2).text()), 8) }));
    return (
        (u = await Promise.all(u.map((t) => e.tryGet(t.link, async () => ((t.description = a((await n(t.link)).data)(`.information-desc`).html()), t))))),
        { title: `${l(`title`).text()} - 人人影视`, description: l(`meta[name="description"]`).attr(`content`), link: c, item: u }
    );
}
export { s as route };
