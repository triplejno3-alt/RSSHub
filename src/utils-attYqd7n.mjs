import { t as e } from './md5-DQN6cWFb.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { renderToString as i } from 'hono/jsx/dom/server';
const a = () => {
        let t = Math.round(Date.now() / 1e3);
        return { 'X-Client-Platform': `WechatMiniprogram`, 'X-Client-DeviceId': e(t.toString()) };
    },
    o = (e) => {
        let {
                productFullId: a,
                name: o,
                productType: s,
                measureText: c,
                priceDisplay: { currentPrice: l, originalPrice: u },
                images: d,
            } = e,
            f = l && u;
        return {
            title: `${o} ${s} - \u{000A5}${l}`,
            description: i(
                r(t, {
                    children: [
                        r(`p`, { children: [`名称：`, o] }),
                        r(`p`, { children: [`类型：`, s] }),
                        r(`p`, { children: [`尺寸：`, c] }),
                        f ? r(t, { children: [r(`p`, { children: [`会员价格：\\u00A5`, l] }), r(`p`, { children: [`非会员价格：\\u00A5`, u] })] }) : r(`p`, { children: [`价格：\\u00A5`, l] }),
                        n(`p`, { children: d.map((e) => n(`img`, { src: e.url })) }),
                    ],
                })
            ),
            link: `https://www.ikea.cn/cn/zh/p/${a}`,
        };
    };
export { a as n, o as t };
