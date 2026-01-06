import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/ota`,
    categories: [`program-update`],
    example: `/notateslaapp/ota`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`notateslaapp.com/software-updates/history`, `notateslaapp.com/software-updates`, `notateslaapp.com/`] }],
    name: `Tesla Software Updates`,
    maintainers: [`mrbruce516`],
    handler: r,
    url: `notateslaapp.com/software-updates/history`,
};
async function r() {
    let n = (await e({ method: `get`, url: `https://www.notateslaapp.com/software-updates/history/`, headers: { Referer: `https://www.notateslaapp.com/software-updates/history/` } })).data,
        r = t(n);
    return {
        title: `特斯拉系统更新`,
        link: `https://www.notateslaapp.com/software-updates/history/`,
        description: `特斯拉系统更新 - 最新发布`,
        item: r(`article[id]`)
            .toArray()
            .map((e) => ((e = r(e)), { title: e.find(`.container h1`).text(), description: e.find(`.notes-container`).text(), pubDate: null, link: e.find(`.notes-container > .button-container > a`).attr(`href`) })),
    };
}
export { n as route };
