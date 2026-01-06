import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = `http://www.caai.cn`;
var u = {
    BASE: l,
    urlBase: (e) => `http://www.caai.cn/index.php?s=/home/article/index/id/${e}.html`,
    fetchAllArticles: (e) => {
        let n = o(e);
        return n(`div.article-list > ul > li`)
            .toArray()
            .map((e) => {
                let i = n(e);
                return { title: i.find(`h3 a[href]`).text().trim(), link: l + i.find(`h3 a[href]`).attr(`href`), pubDate: r(t(i.find(`h4`).text().trim(), `YYYY-MM-DD`), 8) };
            });
    },
    detailPage: (e, t) => t.tryGet(e.link, async () => ((e.description = o((await n(e.link)).data)(`div.article`).html()), e)),
    renderDesc: (e) => s(a(i, { children: e ? c(e) : null })),
};
const d = {
    path: `/:caty`,
    categories: [`study`],
    example: `/caai/45`,
    parameters: { caty: `分类 ID，可在 URL 找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `学会动态`,
    maintainers: [`tudou027`],
    handler: f,
};
async function f(t) {
    let r = u.urlBase(t.req.param(`caty`)),
        i = await n(r),
        a = u.fetchAllArticles(i.data),
        s = o(i.data),
        c = await Promise.all(a.map((t) => u.detailPage(t, e)));
    return (t.set(`json`, { info: a }), { title: `中国人工智能学会 - ` + s(`.article-list h1`).text(), link: r, item: c });
}
export { d as route };
