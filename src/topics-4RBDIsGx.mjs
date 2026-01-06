import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-VZRP2tN1.mjs';
const r = {
    path: `/topics`,
    categories: [`programming`],
    example: `/gocn/topics`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gocn.vip/`] }],
    name: `每日新闻`,
    maintainers: [`AtlanCI`, `CcccFz`],
    handler: i,
    url: `gocn.vip/`,
};
async function i() {
    let r = `https://gocn.vip/c/3lQ6GbD5ny/home`;
    return {
        title: `GoCN社区-每日新闻`,
        link: r,
        description: `获取GoCN站点每日新闻`,
        item: (await t({ url: `https://gocn.vip/api/files?spaceGuid=Gd7BTB&currentPage=1&sort=1`, headers: { Referer: r } })).data.data.list.map((t) => ({
            title: t.name,
            link: `https://gocn.vip/c/3lQ6GbD5ny/s/${t.spaceGuid}/d/${t.guid}`,
            description: n(JSON.parse(t.content)),
            pubDate: e(t.ctime, `X`),
            author: t.nickname,
        })),
    };
}
export { r as route };
