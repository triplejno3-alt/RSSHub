import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { Fragment as t, jsx as n, jsxs as r } from 'hono/jsx/jsx-runtime';
import { load as i } from 'cheerio';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
    path: `/acm/contest/:category?`,
    categories: [`university`],
    example: `/ecnu/acm/contest/public`,
    parameters: { category: 'category is optional, default is all, use `public` for public only contests' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`acm.ecnu.edu.cn/contest/`, `acm.ecnu.edu.cn/`], target: `/acm/contest/` }],
    name: `ACM Online-Judge contests list`,
    maintainers: [`a180285`],
    handler: s,
    url: `acm.ecnu.edu.cn/contest/`,
};
async function s(o) {
    let s = (o.req.param(`category`) ?? ``) === `public`,
        c = `https://acm.ecnu.edu.cn`,
        l = `${c}/contest/`,
        u = i((await e(l)).data),
        d = u(`div > div > table > tbody > tr`)
            .filter((e, t) => !s || u(t).find(`i`).attr(`class`).includes(`green`))
            .toArray()
            .map((e) => {
                let i = u(e).find(`td`),
                    o = i.eq(0).text(),
                    s = i.eq(1).text(),
                    l = i.eq(2).text(),
                    d = c + i.find(`a`).eq(0).attr(`href`);
                return { title: o, description: a(r(t, { children: [n(`p`, { children: `Title: ${o}` }), n(`p`, { children: `Time: ${s} (China time)` }), n(`p`, { children: `Duration: ${l}` })] })), link: d };
            });
    return { title: `ECNU ACM ${s ? `公开` : ``}比赛`, link: l, item: d };
}
export { o as route };
