import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/commercialpress/latest`,
    categories: [`social-media`],
    example: `/douban/commercialpress/latest`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `商务印书馆新书速递`,
    maintainers: [`xyqfer`],
    handler: r,
};
async function r() {
    let n = `https://site.douban.com/commercialpress/room/827243/`,
        { data: r } = await e({ method: `get`, url: n, headers: { Referer: `https://site.douban.com/commercialpress/` } }),
        i = t(r),
        a = i(`.mod`).eq(0),
        o = a.find(`.hd > h2 span`).eq(0).text();
    i = t((await e({ method: `get`, url: `${(await e({ method: `get`, url: a.find(`.pl a`).attr(`href`), headers: { Referer: n } })).request.options.url.href}?sort=time&sub_type=`, headers: { Referer: n } })).data);
    let s = i(`.doulist-item`)
        .toArray()
        .map((e) => {
            let t = i(e);
            return {
                title: t.find(`.title > a`).text(),
                link: t.find(`.title > a`).attr(`href`),
                description: `<img src="${t.find(`.post img`).attr(`src`)}" /><br>${t.find(`.abstract`).html()}`,
                pubDate: new Date(t.find(`.time > span`).attr(`title`)).toUTCString(),
            };
        });
    return { title: `商务印书馆-${o}`, link: n, item: s };
}
export { n as route };
