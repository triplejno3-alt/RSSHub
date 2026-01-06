import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/zxdt/:id?`,
    categories: [`travel`],
    example: `/12306/zxdt`,
    parameters: { id: `铁路局id，可在 URL 中找到，不填默认显示所有铁路局动态` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.12306.cn/`, `www.12306.cn/mormhweb/1/:id/index_fl.html`], target: `/zxdt/:id` }],
    name: `最新动态`,
    maintainers: [`LogicJake`],
    handler: a,
    url: `www.12306.cn/`,
};
async function a(i) {
    let a = i.req.param(`id`) || -1,
        o = a === -1 ? `https://www.12306.cn/mormhweb/zxdt/index_zxdt.html` : `https://www.12306.cn/mormhweb/1/${a}/index_fl.html`,
        s = (await n.get(o)).data,
        c = r(s),
        l = c(`div.nav_center > a:nth-child(4)`).text(),
        u = c(`#newList > ul > li`)
            .toArray()
            .map((e) => ({ title: c(e).find(`a`).text(), link: new URL(c(e).find(`a`).attr(`href`), o).href, pubDate: t(c(e).find(`span`).text().slice(1, -1)) })),
        d = await Promise.all(
            u.map((t) =>
                e.tryGet(t.link, async () => {
                    let e = r((await n.get(t.link)).data);
                    return ((t.description = e(`.article-box`).html() || e(`.content_text`).html() || `文章已被删除`), t);
                })
            )
        );
    return { title: `${l}最新动态`, link: o, item: d };
}
export { i as route };
