import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/bookstore`,
    categories: [`social-media`],
    example: `/douban/bookstore`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `豆瓣书店`,
    maintainers: [`xyqfer`],
    handler: n,
};
async function n() {
    let t = `https://market.douban.com/book/`;
    return {
        title: `豆瓣书店`,
        link: t,
        description: `在豆瓣书店，遇见美好·書生活`,
        item: (await e({ method: `get`, url: `https://market.douban.com/api/freyr/books?page=1&page_size=20&type=book`, headers: { Referer: t } })).data.data.map(
            ({ title: e, url: t, price: n, square_pic: r, rectangle_pic: i, desc: a }) => ({
                title: e,
                link: t,
                description: `
        <img src="${i}"><br>
        <img src="${r}"><br>
        ${a}<br>
        <strong>价格:</strong> ${n}元
      `,
            })
        ),
    };
}
export { t as route };
