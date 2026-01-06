import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/blog`,
    categories: [`programming`],
    example: `/manus/blog`,
    url: `manus.im`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.manus.im`], target: `/blog` }],
    name: `Blog`,
    maintainers: [`cscnk52`],
    handler: a,
    description: `Manus Blog`,
    view: n.Notifications,
};
async function a() {
    let n = `https://manus.im/blog`,
        i = r(await e(n)),
        a = i(`div.mt-10.px-6 > a`)
            .toArray()
            .map((e) => {
                let t = i(e);
                return { link: new URL(String(t.attr(`href`)), n).href, title: String(t.find(`h2`).attr(`title`)) };
            });
    return {
        title: `Manus`,
        link: n,
        item: await Promise.all(
            a.map((n) =>
                t.tryGet(String(n.link), async () => {
                    let t = r(await e(String(n.link))),
                        i = t(`div.relative:nth-child(3)`).html() ?? ``,
                        a = t(`div.gap-3:nth-child(1) > span:nth-child(2)`).text().trim(),
                        o = new Date().getFullYear(),
                        s = new Date(`${a} ${o}`);
                    return { ...n, description: i, pubDate: s };
                })
            )
        ),
        language: `en`,
    };
}
export { i as route };
