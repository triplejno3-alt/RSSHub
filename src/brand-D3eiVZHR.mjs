import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { d as e, f as t, n } from './service-8NkLHBf0.mjs';
const r = {
    path: `/brand/:id`,
    categories: [`shopping`],
    example: `/showstart/brand/34707`,
    parameters: { id: `厂牌 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.showstart.com/host/:id`] }],
    name: `按厂牌 - 演出更新`,
    maintainers: [`lchtao26`],
    handler: i,
    description: `::: tip
厂牌 ID 查询: \`/showstart/search/brand/:keyword\`，如: [https://rsshub.app/showstart/search/brand/声场](https://rsshub.app/showstart/search/brand/声场)
:::`,
};
async function i(r) {
    let i = await n({ brandId: r.req.param(`id`) });
    return { title: `${t} - ${i.name}`, description: i.content, link: `${e}/host/${i.id}`, item: i.activityList };
}
export { r as route };
