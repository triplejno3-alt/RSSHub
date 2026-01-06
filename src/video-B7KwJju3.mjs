import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import './description-UqFyTtWs.mjs';
import { r as n, t as r } from './utils-B0h5xX5T.mjs';
const i = {
    path: `/video/:id?`,
    categories: [`traditional-media`],
    example: `/yicai/video`,
    parameters: { id: `分类 id，见下表，可在对应分类页中找到，默认为视听` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yicai.com/video/:id`, `yicai.com/video`], target: `/video/:id` }],
    name: `视听`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `| Id                   | 名称                         |
| -------------------- | ---------------------------- |
| youliao              | 有料                         |
| appshipin            | 此刻                         |
| yicaisudi            | 速递                         |
| caishang             | 财商                         |
| shiji                | 史记                         |
| jinrigushi           | 今日股市                     |
| tangulunjin          | 谈股论金                     |
| gongsiyuhangye       | 公司与行业                   |
| cjyxx                | 财经夜行线                   |
| 6thtradingday        | 第六交易日                   |
| cjfw                 | 财经风味                     |
| chuangshidai         | 创时代                       |
| weilaiyaoqinghan     | 未来邀请函                   |
| tounaofengbao        | 头脑风暴                     |
| zhongguojingyingzhe  | 中国经营者                   |
| shichanglingjuli     | 市场零距离                   |
| huanqiucaijing       | 环球财经视界                 |
| zgjcqyjglsxftl       | 中国杰出企业家管理思想访谈录 |
| jiemacaishang        | 解码财商                     |
| sxpl                 | 首席评论                     |
| zhongguojingjiluntan | 中国经济论坛                 |
| opinionleader        | 意见领袖                     |
| xinjinrong           | 解码新金融                   |
| diyidichan           | 第一地产                     |
| zhichedaren          | 智车达人                     |
| chuangtoufengyun     | 创投风云                     |
| chunxiangrensheng    | 醇享人生                     |
| diyishengyin         | 第一声音                     |
| sanliangboqianjin    | 财智双全                     |
| weilaiyaoqinghan     | 未来邀请函                   |
| zjdy                 | 主角 ▪ 大医                 |
| leye                 | 乐业之城                     |
| sanrenxing           | 价值三人行                   |
| yuandongli           | 中国源动力                   |
| pioneerzone          | 直击引领区                   |`,
};
async function a(i) {
    let a = i.req.param(`id`) ?? ``,
        o;
    if (a) {
        let e = await t({ method: `get`, url: `${n}/api/ajax/getnavs` });
        for (let t of e.data.header.video)
            if (t.EnglishName === a || t.ChannelID === a) {
                o = { id: t.ChannelID, name: t.ChannelName, slug: t.EnglishName };
                break;
            }
    }
    let s = `${n}/video${a ? `/${o.slug}` : ``}`,
        c = await r(`${n}/api/ajax/${a ? `getlistbycid?cid=${o.id}` : `getjuhelist?action=video`}&page=1&pagesize=${i.req.query(`limit`) ?? 30}`, e.tryGet);
    return { title: `第一财经 - ${o?.name ?? `视听`}`, link: s, item: c };
}
export { i as route };
