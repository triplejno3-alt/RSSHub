import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/tab/:tabid`,
    categories: [`bbs`],
    view: n.Articles,
    example: `/v2ex/tab/hot`,
    parameters: { tabid: `tab标签ID,在 URL 可以找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `标签`,
    maintainers: [`liyefox`],
    handler: a,
};
async function a(n) {
    let i = n.req.param(`tabid`),
        a = `https://v2ex.com`,
        o = `${a}/?tab=${i}`,
        s = r((await t({ method: `get`, url: o })).data),
        c = s(`span.item_title > a`)
            .toArray()
            .slice(0, n.req.query(`limit`) ? Number.parseInt(n.req.query(`limit`)) : 10)
            .map((e) => `${a}${s(e).attr(`href`).replace(/#.*$/, ``)}`),
        l = await Promise.all(
            c.map((n) =>
                e.tryGet(`v2ex-${n}`, async () => {
                    let e = r((await t({ method: `get`, url: n })).data),
                        i = e(`[id^="r_"]`)
                            .toArray()
                            .map((t) => {
                                let n = e(t),
                                    r = n.find(`.reply_content`).html(),
                                    i = n.find(`.dark`).first().text();
                                return `<p><div>#${n.find(`.no`).text()}: <i>${i}</i></div><div>${r}</div></p>`;
                            })
                            .join(``);
                    return { title: e(`.header h1`).text(), link: n, description: `${e(`div.topic_content`).html()}<div>${i}</div>`, author: e(`div.header > small > a`).text() };
                })
            )
        );
    return { title: `V2EX-${i}`, link: o, description: `V2EX-tab-${i}`, item: l };
}
export { i as route };
