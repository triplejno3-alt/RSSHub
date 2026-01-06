import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/weekly`,
    categories: [`social-media`],
    example: `/zhihu/weekly`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.zhihu.com/pub/weekly`] }],
    name: `知乎书店 - 知乎周刊`,
    maintainers: [`LogicJake`],
    handler: r,
    url: `www.zhihu.com/pub/weekly`,
};
async function r() {
    let n = `https://www.zhihu.com/pub/weekly`,
        r = t((await e(n)).data);
    return {
        title: `知乎周刊`,
        link: n,
        description: r(`p.Weekly-description`).text(),
        item: r(`div.Card-section.PubBookListItem`)
            .slice(0, 10)
            .toArray()
            .map((e) => ({
                title: r(e).find(`span.PubBookListItem-title`).text(),
                link: new URL(r(e).find(`a.PubBookListItem-buttonWrapper`).attr(`href`), `https://www.zhihu.com`).href,
                description: r(e).find(`div.PubBookListItem-description`).text(),
                author: r(e).find(`span.PubBookListItem-author`).text(),
            })),
    };
}
export { n as route };
