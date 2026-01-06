import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = {
    path: `/yjs`,
    categories: [`university`],
    example: `/sustech/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gs.sustech.edu.cn/`] }],
    name: `研究生网通知公告`,
    maintainers: [`shengmaosu`],
    handler: r,
    url: `gs.sustech.edu.cn/`,
};
async function r() {
    let n = `https://gs.sustech.edu.cn`;
    return {
        title: `南方科技大学研究生院`,
        link: `${n}/#/common/index?current_id=99&id=99`,
        description: `南方科技大学研招网通知公告`,
        item: (await t(`${n}/api/www/v1/article/list`, { searchParams: { page: 1, pageSize: 20, kw: ``, sort_id: 99, cas_sort_id: 99 } })).data.data.items.map((t) => ({
            title: t.title,
            link: `${n}/#/common/detail?current_id=99&id=99&article_id=${t.id}`,
            pubDate: e(t.published_at, `YYYY-MM-DD`),
        })),
    };
}
export { n as route };
