import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './description-zLmTiiTG.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/curations`,
    categories: [`traditional-media`],
    example: `/pts/curations`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`news.pts.org.tw/curations`, `news.pts.org.tw/`] }],
    name: `專題策展`,
    maintainers: [`nczitzk`],
    handler: a,
    url: `news.pts.org.tw/curations`,
};
async function a() {
    let i = `https://news.pts.org.tw/curations`,
        a = r((await t({ method: `get`, url: i })).data),
        o = a(`.project-intro`)
            .last()
            .find(`h3 a`)
            .toArray()
            .map((t) => {
                t = a(t);
                let r = t.parent().parent();
                return { title: t.text(), link: t.attr(`href`), pubDate: e(r.find(`time`).text()), description: n({ image: r.parent().find(`.cover-fit`).attr(`src`) }) };
            });
    return {
        title: a(`title`)
            .text()
            .replace(/第\d+頁 ｜ /, ``),
        link: i,
        item: o,
    };
}
export { i as route };
