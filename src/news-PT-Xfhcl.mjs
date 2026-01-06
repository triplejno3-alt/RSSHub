import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/news`,
    categories: [`programming`],
    example: `/bbcnewslabs/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`bbcnewslabs.co.uk/`] }],
    name: `News`,
    maintainers: [`elxy`],
    handler: i,
    url: `bbcnewslabs.co.uk/`,
};
async function i() {
    let r = `https://bbcnewslabs.co.uk`,
        i = n((await t({ method: `get`, url: `${r}/news` })).data);
    return {
        title: `News - BBC News Labs`,
        link: r,
        item: i(`a[href^="/news/20"]`)
            .toArray()
            .map(
                (t) => (
                    (t = i(t)),
                    {
                        title: t.find(`h3[class^="thumbnail-module--thumbnailTitle--"]`).text(),
                        description: t.find(`span[class^="thumbnail-module--thumbnailDescription--"]`).text(),
                        pubDate: e(t.find(`span[class^="thumbnail-module--thumbnailType--"]`).text()),
                        link: r + t.attr(`href`),
                    }
                )
            ),
    };
}
export { r as route };
