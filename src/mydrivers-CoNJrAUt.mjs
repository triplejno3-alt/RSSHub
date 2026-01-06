import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { i as r, n as i, o as a, r as o, s, t as c } from './util-Dq2Dir9E.mjs';
import { Fragment as l, jsx as u } from 'hono/jsx/jsx-runtime';
import { load as d } from 'cheerio';
import { renderToString as f } from 'hono/jsx/dom/server';
const p = {
    path: `/:category{.+}?`,
    name: `分类`,
    parameters: { category: `分类，见下表，默认为最新` },
    example: `/mydrivers/bcid/801`,
    maintainers: [`kt286`, `nczitzk`],
    handler: m,
    radar: [{ source: [`m.mydrivers.com/`], target: `/zhibo` }],
    description: `
#### 板块

| 电脑     | 手机     | 汽车     | 业界     | 游戏     |
| -------- | -------- | -------- | -------- | -------- |
| bcid/801 | bcid/802 | bcid/807 | bcid/803 | bcid/806 |

#### 话题

| 科学     | 排行     | 评测     | 一图     |
| -------- | -------- | -------- | -------- |
| tid/1000 | tid/1001 | tid/1002 | tid/1003 |

#### 品牌

| 安卓     | 阿里     | 微软    | 百度    | PS5       | Xbox     | 华为     |
| -------- | -------- | ------- | ------- | --------- | -------- | -------- |
| icid/121 | icid/270 | icid/90 | icid/67 | icid/6950 | icid/194 | icid/136 |

| 小米      | VIVO     | 三星     | 魅族     | 一加     | 比亚迪   | 小鹏      |
| --------- | -------- | -------- | -------- | -------- | -------- | --------- |
| icid/9355 | icid/288 | icid/154 | icid/140 | icid/385 | icid/770 | icid/7259 |

| 蔚来      | 理想       | 奔驰     | 宝马     | 大众     |
| --------- | ---------- | -------- | -------- | -------- |
| icid/7318 | icid/12947 | icid/429 | icid/461 | icid/481 |
`,
};
async function m(p) {
    let { category: m = `new` } = p.req.param(),
        h = ``;
    /^(\w+\/\w+)$/.test(m) || ((h = `${s} - ${Object.hasOwn(c, m) ? c[m] : c[Object.keys(c)[0]]}`), (m = `ac/${m}`));
    let g = p.req.query(`limit`) ? Number.parseInt(p.req.query(`limit`), 10) : 20,
        _ = i(m),
        v = new URL(`newsclass.aspx${_}`, a).href,
        y = new URL(`m/newslist.ashx${_}`, a).href,
        { data: b } = await t(y),
        x = d(b),
        S = x(`li[data-id]`)
            .slice(0, g)
            .toArray()
            .map(
                (t) => (
                    (t = x(t)),
                    {
                        title: t.find(`div.news_title`).text(),
                        link: new URL(t.find(`div.news_title span.newst a`).prop(`href`), a).href,
                        description: f(u(l, { children: t.find(`a.newsimg img`).prop(`src`) ? u(`figure`, { children: u(`img`, { src: t.find(`a.newsimg img`).prop(`src`) }) }) : null })),
                        author: t.find(`p.tname`).text(),
                        guid: t.prop(`data-id`),
                        pubDate: n(e(t.find(`p.ttime`).text()), 8),
                        comments: t.find(`a.tpinglun`).text() ? Number.parseInt(t.find(`a.tpinglun`).text(), 10) : 0,
                    }
                )
            );
    return ((S = await r(S)), { ...(await o(v)), ...(h ? { title: h } : {}), item: S });
}
export { p as route };
