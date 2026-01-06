import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { JSDOM as t } from 'jsdom';
const n = {
    path: `/hottest`,
    categories: [`shopping`],
    example: `/hotukdeals/hottest`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.hotukdeals.com/`] }],
    name: `hottest`,
    maintainers: [`DIYgod`],
    handler: r,
    url: `www.hotukdeals.com/`,
};
async function r() {
    return {
        title: `hotukdeals hottest`,
        link: `https://www.hotukdeals.com/`,
        item: new t((await e.get(`https://www.hotukdeals.com/`, { headers: { Referer: `https://www.hotukdeals.com/` } })).data, { runScripts: `dangerously` }).window.__INITIAL_STATE__.widgets.hottestWidget.threads.map((e) => ({
            title: e.title,
            description: `<img src="https://images.hotukdeals.com/${e.mainImage.path}/${e.mainImage.name}/re/768x768/qt/60/${e.mainImage.name}.jpg"><br>${e.temperature}° ${e.title}<br>${e.displayPrice}`,
            link: e.url,
        })),
    };
}
export { n as route };
