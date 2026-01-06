import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as t, t as n } from './utils-CFw6PWc9.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/platform/:name/:routeParams?`,
    categories: [`programming`],
    example: `/alternativeto/platform/firefox`,
    parameters: { name: `Platform name`, routeParams: `Filters of software type` },
    features: { requireConfig: !1, requirePuppeteer: !0, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.alternativeto.net/platform/:name`], target: `/platform/:name` }],
    name: `Platform Software`,
    maintainers: [`JimenezLi`],
    handler: a,
    description: '> routeParms can be copied from original site URL, example: `/alternativeto/platform/firefox/license=free`',
};
async function a(i) {
    let a = `https://alternativeto.net/platform/${i.req.param(`name`)}/?${new URLSearchParams(i.req.param(`routeParams`)).toString()}`,
        o = r(await t(a, e));
    return {
        title: o(`.Heading_h1___Cf5Y`).text().trim(),
        description: o(`.intro-text`).text().trim(),
        link: a,
        item: o(`.AppListItem_appInfo__h9cWP`)
            .toArray()
            .map((e) => {
                let t = o(e);
                return { title: t.find(`.Heading_h2___LwQD`).text().trim(), link: `${n}${t.find(`.Heading_h2___LwQD a`).attr(`href`)}`, description: t.find(`.AppListItem_description__wtODK`).text().trim() };
            }),
    };
}
export { i as route };
