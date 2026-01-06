import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { n as t, t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/qa/:category?/:state?`,
    categories: [`programming`],
    example: `/quicker/qa`,
    parameters: { category: `分类，见下表，默认为全部`, state: `状态，见下表，默认为全部` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `讨论区`,
    maintainers: [`Cesaryuan`, `nczitzk`],
    handler: s,
    description: `分类

| 使用问题 | 动作开发 | BUG 反馈 | 功能建议 |
| -------- | -------- | -------- | -------- |
| 1        | 9        | 3        | 4        |

| 动作需求 | 经验创意 | 动作推荐 | 信息发布 |
| -------- | -------- | -------- | -------- |
| 6        | 2        | 7        | 5        |

| 随便聊聊 | 异常报告 | 全部 |
| -------- | -------- | ---- |
| 8        | 10       | all  |

  状态

| 全部 | 精华   | 已归档  |
| ---- | ------ | ------- |
|      | digest | achived |`,
};
async function s(o) {
    let s = o.req.param(`category`) ?? `all`,
        c = o.req.param(`state`) ?? ``,
        l = `https://getquicker.net`,
        u = `${l}/QA${s === `all` ? `` : `?category=${s}`}${c ? `?state=${c}` : ``}`,
        d = a((await r({ method: `get`, url: u })).data),
        f = d(`a.question-title`)
            .slice(0, o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 25)
            .toArray()
            .map((e) => ((e = d(e)), { title: e.text(), link: `${l}${e.attr(`href`)}` }));
    return (
        (f = await Promise.all(
            f.map((o) =>
                e.tryGet(o.link, async () => {
                    let e = a((await r({ method: `get`, url: o.link })).data);
                    e(`div[data-note="最后更新人信息"]`).remove();
                    let s = e(`.info-text`)
                        .first()
                        .text()
                        .replace(/创建于 /, ``)
                        .trim();
                    return ((o.description = e(`.topic-body`).html()), (o.author = e(`.user-link`).first().text()), (o.pubDate = i(/-/.test(s) ? n(s) : t(s), 8)), o);
                })
            )
        )),
        { title: d(`title`).text(), link: u, item: f, allowEmpty: !0 }
    );
}
export { o as route };
