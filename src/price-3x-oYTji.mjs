import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = {
    path: `/price/:id`,
    categories: [`shopping`],
    example: `/jd/price/526835`,
    parameters: { id: `商品 id，可在商品详情页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `商品价格`,
    maintainers: [`nczitzk`],
    handler: o,
    description: '::: tip\n  如商品 `https://item.jd.com/526835.html` 中的 id 为 `526835`，所以路由为 [`/jd/price/526835`](https://rsshub.app/jd/price/526835)\n:::',
};
async function o(a) {
    let o = a.req.param(`id`),
        s = `https://item.jd.com/${o}.html`,
        c = (await e({ method: `get`, url: `http://p.3.cn/prices/mgets?skuIds=J_${o}` })).data[0];
    return {
        title: `京东商品价格 - ${(await e({ method: `get`, url: s })).data.match(/name: '(.*?)'/)[1]}`,
        link: s,
        item: [
            {
                guid: c.p,
                title: c.p,
                link: s,
                description: i(
                    r(t, { children: [r(`p`, { children: [`目前价格：`, n(`b`, { children: c.p })] }), r(`p`, { children: [`指导价：`, n(`b`, { children: c.op })] }), r(`p`, { children: [`最高价：`, n(`b`, { children: c.m })] })] })
                ),
            },
        ],
    };
}
export { a as route };
