import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
const n = {
    path: `/books`,
    categories: [`programming`],
    example: `/juejin/books`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`juejin.cn/books`] }],
    name: `小册`,
    maintainers: [`xyqfer`],
    handler: r,
    url: `juejin.cn/books`,
    description: `> 掘金小册需要付费订阅，RSS 仅做更新提醒，不含付费内容.`,
};
async function r() {
    return {
        title: `掘金小册`,
        link: `https://juejin.cn/books`,
        item: (await e(`https://api.juejin.cn/booklet_api/v1/booklet/listbycategory`, { method: `POST`, body: { category_id: `0`, cursor: `0`, limit: 20 } })).data.map(({ base_info: e }) => ({
            title: e.title,
            link: `https://juejin.cn/book/${e.booklet_id}`,
            description: `
            <img src="${e.cover_img}"><br>
            <strong>${e.title}</strong><br><br>
            ${e.summary}<br>
            <strong>价格:</strong> ${e.price / 100}元
        `,
            pubDate: t(e.ctime * 1e3),
            guid: e.booklet_id,
        })),
    };
}
export { n as route };
