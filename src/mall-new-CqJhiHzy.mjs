import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/mall/new/:category?`,
    categories: [`social-media`],
    example: `/bilibili/mall/new/1`,
    parameters: { category: `分类，默认全部，见下表` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `会员购新品上架`,
    maintainers: [`DIYgod`],
    handler: n,
    description: `| 全部 | 手办 | 魔力赏 | 周边 | 游戏 |
| ---- | ---- | ------ | ---- | ---- |
| 0    | 1    | 7      | 3    | 6    |`,
};
async function n(t) {
    let n = await e({
            method: `get`,
            url: `https://mall.bilibili.com/mall-c-search/home/new_items/list?pageNum=1&pageSize=20&version=1.0&cityId=0&cateType=${t.req.param(`category`) || 0}`,
            headers: { Referer: `https://mall.bilibili.com/newdate.html?noTitleBar=1&page=new&from=new_product&loadingShow=1` },
        }),
        r = n.data.data.vo.days,
        i = [];
    for (let e of r) i.push(...e.presaleItems);
    return {
        title: `会员购新品上架-${n.data.data.vo.cateTabs.find((e) => e.cateType === n.data.data.vo.currentCateType).cateName}`,
        link: `https://mall.bilibili.com/newdate.html?noTitleBar=1&page=new&from=new_product&loadingShow=1`,
        item: i.map((e) => ({
            title: e.name,
            description: `${e.name}<br>${e.priceDesc ? `${e.pricePrefix}${e.priceSymbol}${e.priceDesc[0]}` : ``}<br><img src="https:${e.img}"><br><a href="${e.itemUrl}">APP 内打开</a>`,
            link: e.itemUrlForH5,
        })),
    };
}
export { t as route };
