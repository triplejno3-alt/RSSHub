import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { d as e, f as t, o as n } from './service-8NkLHBf0.mjs';
const r = {
    path: `/artist/:id`,
    categories: [`shopping`],
    example: `/showstart/artist/301783`,
    parameters: { id: `音乐人 ID` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.showstart.com/artist/:id`] }],
    name: `按音乐人 - 演出更新`,
    maintainers: [`lchtao26`],
    handler: i,
    description: `::: tip
音乐人 ID 查询: \`/showstart/search/artist/:keyword\`，如: [https://rsshub.app/showstart/search/artist/周杰伦](https://rsshub.app/showstart/search/artist/周杰伦)
:::`,
};
async function i(r) {
    let i = await n({ performerId: r.req.param(`id`) });
    return { title: `${t} - ${i.name}`, description: i.content, link: `${e}/artist/${i.id}`, item: i.activityList };
}
export { r as route };
