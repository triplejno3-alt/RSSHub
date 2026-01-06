import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
const i = { 0: `全部`, 1: `其他`, 2: `规则变更` },
    a = {
        path: `/notice/:type?`,
        categories: [`programming`],
        example: `/dangdang/notice/1`,
        parameters: { type: `公告分类，默认为全部` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `公告`,
        maintainers: [`353325487`],
        handler: o,
        description: `| 类型     | type |
| -------- | ---- |
| 全部      | 0    |
| 其他      | 1    |
| 规则变更   | 2    |`,
    };
async function o(a) {
    let o = a.req.param(`type`),
        s = (await n({ method: `get`, url: `https://open.dangdang.com/op-api/developer-platform/document/menu/list?categoryId=3&type=${o > 0 ? i[o] : ``}` })).data.data.documentMenu.map((e) => ({
            title: e.title,
            description: e.type,
            documentId: e.documentId,
            source: `https://open.dangdang.com/op-api/developer-platform/document/info/get?document_id=${e.documentId}`,
            link: `https://open.dangdang.com/home/notice/message/1/${e.documentId}`,
            pubDate: r(t(e.modifyTime), 8),
        })),
        c = await Promise.all(s.map((t) => e.tryGet(t.source, async () => ((t.description = (await n(t.source)).data.data.documentContentList[0].content), t))));
    return { title: `当当开放平台 - ${i[o] || i[0]}`, link: `https://open.dangdang.com/home/notice/message/1`, item: c };
}
export { a as route };
