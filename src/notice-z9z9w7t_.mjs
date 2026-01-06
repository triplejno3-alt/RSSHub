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
        2834: { title: `最新 - 外汇市场公告 - 市场公告`, urlPath: `/chinese/scgg-whscgg/` },
        2835: { title: `市场公告通知 - 外汇市场公告 - 市场公告`, urlPath: `/chinese/scgg-whscgg/` },
        2836: { title: `中心会员公告 - 外汇市场公告 - 市场公告`, urlPath: `/chinese/scgg-whscgg/` },
        2837: { title: `会员信息公告 - 外汇市场公告 - 市场公告`, urlPath: `/chinese/scgg-whscgg/` },
        '2839,2840,2841': { title: `最新 - 本币市场公告 - 市场公告`, urlPath: `/chinese/scggbbscgg/` },
        2839: { title: `市场公告通知 - 本币市场公告 - 市场公告`, urlPath: `/chinese/scggbbscgg/` },
        2840: { title: `中心成员公告 - 本币市场公告 - 市场公告`, urlPath: `/chinese/scggbbscgg/` },
        2841: { title: `成员信息公告 - 本币市场公告 - 市场公告`, urlPath: `/chinese/scggbbscgg/` },
        '2845,2846': { title: `最新 - 央行业务公告 - 市场公告`, urlPath: `/chinese/scggyhywgg/` },
        2845: { title: `公开市场操作 - 央行业务公告 - 市场公告`, urlPath: `/chinese/scggyhywgg/` },
        2846: { title: `中央国库现金管理 - 央行业务公告 - 市场公告`, urlPath: `/chinese/scggyhywgg/` },
        3686: { title: `LPR市场公告 - 贷款市场报价利率 - 本币市场`, urlPath: `/chinese/bklpr/` },
    },
    o = {
        path: `/:channelId?`,
        categories: [`finance`],
        example: `/chinamoney`,
        parameters: { channelId: '分类，见下表，默认为 `2834`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `公告`,
        maintainers: [`TonyRL`],
        handler: s,
        description: `<details>
<summary>市场公告</summary>

    外汇市场公告

| 最新 | 市场公告通知 | 中心会员公告 | 会员信息公告 |
| ---- | ------------ | ------------ | ------------ |
| 2834 | 2835         | 2836         | 2837         |

    本币市场公告

| 最新           | 市场公告通知 | 中心会员公告 | 会员信息公告 |
| -------------- | ------------ | ------------ | ------------ |
| 2839,2840,2841 | 2839         | 2840         | 2841         |

    央行业务公告

| 最新      | 公开市场操作 | 中央国库现金管理 |
| --------- | ------------ | ---------------- |
| 2845,2846 | 2845         | 2846             |
</details>

<details>
<summary>本币市场</summary>

    贷款市场报价利率

| LPR 市场公告 |
| ------------ |
| 3686         |
</details>`,
    };
async function s(o) {
    let { channelId: s = 2834 } = o.req.param(),
        c = `https://www.chinamoney.com.cn`,
        { data: l } = await n.post(`${c}/ags/ms/cm-s-notice-query/contents`, { form: { pageNo: 1, pageSize: 15, channelId: s } }),
        u = l.records.map((e) => ({ title: e.title, link: `${c}${e.draftPath}`, pubDate: r(t(e.releaseDate, `YYYY-MM-DD`), 8), contentId: e.contentId })),
        d = await Promise.all(
            u.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e),
                        s = o(`.article-a-body`);
                    return (
                        s.find(`*`).removeAttr(`style`),
                        s.find(`font`).each((e, t) => {
                            o(t).replaceWith(o(t).html());
                        }),
                        s.find(`span`).each((e, t) => {
                            o(t).replaceWith(o(t).html());
                        }),
                        s.find(`.article-a-attach-body a`).each((e, t) => {
                            ((t = o(t)),
                                t.attr(`onclick`)?.startsWith(`location.href=encodeURI($('#fileDownUrl').val()+'fileDownLoad.do`) &&
                                    (t.attr(`href`, `${c}/dqs/cm-s-notice-query/fileDownLoad.do?mode=open&contentId=${a.contentId}&priority=${e}`), t.removeAttr(`onclick`)));
                        }),
                        (a.description = s.html()),
                        (a.pubDate = r(t(o(`.AC-l span`).text().trim(), `YYYY-MM-DD HH:mm`), 8)),
                        a
                    );
                })
            )
        );
    return { title: `${a[s] ? a[s].title + ` - ` : ``}中国货币网`, link: `${c}${a[s]?.urlPath ?? ``}`, item: d };
}
export { o as route };
