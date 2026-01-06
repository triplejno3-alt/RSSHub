import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './goods-C9IfyBuQ.mjs';
const n = (e, t) => e.find((e) => e.module_key === t),
    r = (e) =>
        e.data.items.map((e) => {
            let n = e.item;
            return { title: n.name, link: n.jump_url, guid: `xiaomiyoupin:${n.gid}`, description: t(n), pubDate: (n.start || n.start_time) * 1e3 };
        }),
    i = {
        path: `/latest`,
        categories: [`shopping`],
        example: `/xiaomiyoupin/latest`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`xiaomiyoupin.com/`] }],
        name: `小米有品每日上新`,
        maintainers: [`xyqfer`, `DIYgod`, `bigfei`],
        handler: a,
        url: `xiaomiyoupin.com/`,
    };
async function a() {
    return {
        title: `小米有品每日上新`,
        link: `https://m.xiaomiyoupin.com/w/newproduct?pageid=1605`,
        description: `小米有品每日上新`,
        item: r(n((await e(`https://m.xiaomiyoupin.com/homepage/main/v1005`)).data.data.homepage.floors, `product_hot`)),
    };
}
export { i as route };
