import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { a as e, r as t, t as n } from './utils-BDg5Lhsa.mjs';
const r = {
    path: `/:category?/:time?/:order?/:keyword?`,
    categories: [`anime`],
    example: `/18comic`,
    parameters: { category: '分类，见下表，默认为 `all` 即全部', time: '时间范围，见下表，默认为 `a` 即全部', order: '排列顺序，见下表，默认为 `mr` 即最新', keyword: `关键字，见下表，默认为空` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    radar: [{ source: [`jmcomic.group/`] }],
    name: `成人 A 漫`,
    maintainers: [`nczitzk`],
    handler: i,
    url: `jmcomic.group/`,
    description: `分类

| 全部 | 其他漫畫 | 同人   | 韓漫   | 美漫   | 短篇  | 单本   |
| ---- | -------- | ------ | ------ | ------ | ----- | ------ |
| all  | another  | doujin | hanman | meiman | short | single |

  时间范围

| 全部 | 今天 | 这周 | 本月 |
| ---- | ---- | ---- | ---- |
| a    | t    | w    | m    |

  排列顺序

| 最新 | 最多点阅的 | 最多图片 | 最高评分 | 最多评论 | 最多爱心 |
| ---- | ---------- | -------- | -------- | -------- | -------- |
| mr   | mv         | mp       | tr       | md       | tf       |

  关键字（供参考）

| YAOI | 女性向 | NTR | 非 H | 3D | 獵奇 |
| ---- | ------ | --- | ---- | -- | ---- |`,
};
async function i(r) {
    let i = r.req.param(`category`) ?? `all`,
        a = r.req.param(`keyword`) ?? ``,
        o = r.req.param(`time`) ?? `a`,
        s = r.req.param(`order`) ?? `mr`,
        { domain: c = t } = r.req.query(),
        l = e(c);
    return await n(r, `${l}/albums${i === `all` ? `` : `/${i}`}${a ? `?screen=${a}` : `?`}${o === `a` ? `` : `&t=${o}`}${s === `mr` ? `` : `&o=${s}`}`, l);
}
export { r as route };
