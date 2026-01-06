import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { load as i } from 'cheerio';
const a = { 1: `轻松一刻`, 2: `槽值`, 3: `人间`, 4: `大国小民`, 5: `三三有梗`, 6: `数读`, 7: `看客`, 8: `下划线`, 9: `谈心社`, 10: `哒哒`, 11: `胖编怪聊`, 12: `曲一刀`, 13: `今日之声`, 14: `浪潮`, 15: `沸点` },
    o = {
        path: `/news/special/:type?`,
        categories: [`new-media`],
        example: `/163/news/special/1`,
        parameters: { type: `栏目` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `专栏`,
        maintainers: [`nczitzk`],
        handler: s,
        description: `| 轻松一刻 | 槽值 | 人间 | 大国小民 | 三三有梗 | 数读 | 看客 | 下划线 | 谈心社 | 哒哒 | 胖编怪聊 | 曲一刀 | 今日之声 | 浪潮 | 沸点 |
| -------- | ---- | ---- | -------- | -------- | ---- | ---- | ------ | ------ | ---- | -------- | ------ | -------- | ---- | ---- |
| 1        | 2    | 3    | 4        | 5        | 6    | 7    | 8      | 9      | 10   | 11       | 12     | 13       | 14   | 15   |`,
    };
async function s(o) {
    if (!o.req.param(`type`)) throw new r(`Bad parameter. See <a href="https://docs.rsshub.app/routes/game#wang-yi-da-shen">https://docs.rsshub.app/routes/game#wang-yi-da-shen</a>`);
    let s = Number.parseInt(o.req.param(`type`)),
        c;
    switch (s) {
        case 1:
            c = `BD21K0DLwangning`;
            break;
        case 2:
            c = `CICMICLUwangning`;
            break;
        case 3:
            c = `CICMOMBLwangning`;
            break;
        case 4:
            c = `CICMPVC5wangning`;
            break;
        case 5:
            c = `CICMLCOUwangning`;
            break;
        case 6:
            c = `D551V75Cwangning`;
            break;
        case 7:
            c = `D55253RHwangning`;
            break;
        case 8:
            c = `D553A53Lwangning`;
            break;
        case 9:
            c = `D553PGHQwangning`;
            break;
        case 10:
            c = `CICMS5BIwangning`;
            break;
        case 11:
            c = `CQ9UDVKOwangning`;
            break;
        case 12:
            c = `CQ9UJIJNwangning`;
            break;
        case 13:
            c = `BD284UM8wangning`;
            break;
        case 14:
            c = `CICMMGBHwangning`;
            break;
        case 15:
            c = `D5543R68wangning`;
            break;
        default:
            break;
    }
    let l =
            (await n(`https://3g.163.com/touch/reconstruct/article/list/${c}/0-20.html`)).data
                .replaceAll(/\s/g, ``)
                .match(/artiList\((.*?)]}\)/)[1]
                .replace(/".*?wangning/, `"articles`) + `]}`,
        u = JSON.parse(l).articles,
        d = await Promise.all(
            u.map((r) => {
                let a = r.url;
                if (a === null || r.skipType === `video`) {
                    let e = r.skipURL.match(/vid=(.*?)$/);
                    e !== null && (a = `https://3g.163.com/exclusive/video/${e[1]}.html`);
                }
                return e.tryGet(a, async () => {
                    let e = i((await n(a)).data);
                    return ((r.link = a), (r.description = e(`.article-body`).html() || e(`div[class="video"]`).html()), (r.pubDate = t(r.ptime)), r);
                });
            })
        ),
        f = a[s];
    return { title: f ? `${f} - 网易专栏` : `网易专栏`, link: `https://3g.163.com/touch/exclusive/?referFrom=163`, item: d };
}
export { o as route };
