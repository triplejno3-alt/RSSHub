import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/recommend`,
    categories: [`bbs`],
    example: `/nowcoder/recommend`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`nowcoder.com/`] }],
    name: `求职推荐`,
    maintainers: [`junfengP`],
    handler: n,
    url: `nowcoder.com/`,
};
async function n() {
    let t = `https://www.nowcoder.com/recommand/activity?token=&type=3&_=${Date.now()}`,
        n = (await e.get(t)).data;
    if (n.code !== 0) throw Error(`接口错误，错误代码:${n.code},错误原因:${n.msg}`);
    return {
        title: `牛客网-推荐`,
        link: `https://www.nowcoder.com/recommend`,
        description: `牛客网-推荐`,
        item: n.data.activitys.map((e) => ({ title: e.name, description: `<img src="${e.img}">`, link: `https://www.nowcoder.com${e.url}` })),
    };
}
export { t as route };
