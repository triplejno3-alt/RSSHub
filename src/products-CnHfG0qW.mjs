import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://www.resonac.com`,
    i = {
        path: `/products`,
        categories: [`other`],
        example: `/resonac/products`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Products`,
        maintainers: [`valuex`],
        handler: a,
        description: ``,
    };
async function a() {
    let i = (await t(`https://www.resonac.com/products?intcid=glnavi_products`)).data,
        a = n(i),
        o = a(`div.m-panel-card-link ul li`)
            .toArray()
            .map((e) => ({ groupName: a(`a`, e).text().trim(), groupURL: r + a(`a`, e).attr(`href`) })),
        s = (
            await Promise.all(
                o.map((i) =>
                    e.tryGet(i.groupURL, async () => {
                        let e = i.groupURL,
                            a = n((await t(e)).data);
                        return a(`dt.m-toggle__title div span a`)
                            .toArray()
                            .map((e) => ({ title: a(`b`, e).text().trim(), link: r + a(e).attr(`href`), group: i.groupName }));
                    })
                )
            )
        ).flat();
    return {
        title: `Resonac_Products`,
        link: r,
        description: `Resonac_Products`,
        item: await Promise.all(
            s.map((r) =>
                e.tryGet(r.link, async () => {
                    try {
                        let e = n((await t(r.link)).data);
                        return ((r.title = r.title + ` | ` + r.group), (r.description = e(`main div.str-section`).html()), r);
                    } catch (e) {
                        return e.message;
                    }
                })
            )
        ),
    };
}
export { i as route };
