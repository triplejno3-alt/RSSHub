import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = (e, t) => s(a(r, { children: [e ? c(e) : null, t?.map((e) => i(`img`, { src: e }))] })),
    u = {
        path: `/search/:keyword`,
        categories: [`other`],
        example: `/baidu/search/rss`,
        parameters: { keyword: `搜索关键词` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `搜索`,
        maintainers: [`CaoMeiYouRen`],
        handler: d,
    };
async function d(r) {
    let i = r.req.param(`keyword`),
        a = `https://www.baidu.com/s?wd=${encodeURIComponent(i)}`,
        s = `baidu-search:${a}`,
        c = await t.tryGet(
            s,
            async () => {
                let e = (await n(a)).data,
                    t = new Set(),
                    r = o(e);
                return r(`#content_left`)
                    .find(`.c-container`)
                    .toArray()
                    .map((e) => {
                        let n = r(e),
                            i = n.find(`h3 a`).first().attr(`href`);
                        if (i && !t.has(i)) {
                            t.add(i);
                            let e = n
                                    .find(`img`)
                                    .toArray()
                                    .map((e) => r(e).attr(`src`)),
                                a = n.find(`.c-gap-top-small [class^="content-right_"]`).first().text() || n.find(`.c-row`).first().text() || n.find(`.cos-row`).first().text();
                            return { title: n.find(`h3`).first().text(), description: l(a, e), link: n.find(`h3 a`).first().attr(`href`), author: n.find(`.c-row .c-color-gray`).first().text() || `` };
                        }
                        return null;
                    })
                    .filter((e) => e?.link);
            },
            e.cache.routeExpire,
            !1
        );
    return { title: `${i} - 百度搜索`, description: `${i} - 百度搜索`, link: a, item: c };
}
export { u as route };
