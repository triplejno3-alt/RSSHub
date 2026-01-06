import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/changelog/dev`,
    categories: [`program-update`],
    example: `/typora/changelog/dev`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`support.typora.io/`], target: `/changelog` }],
    name: `Dev Release Changelog`,
    maintainers: [`nczitzk`],
    handler: r,
    url: `support.typora.io/`,
};
async function r() {
    let n = `https://typora.io/releases/dev`,
        r = t((await e(n)).data);
    return {
        title: `Typora Changelog - Dev`,
        link: n,
        description: `Typora Changelog`,
        item: r(`h2`)
            .toArray()
            .map(
                (e) => (
                    (e = r(e)),
                    {
                        title: e.text(),
                        link: `${n}#${e.text()}`,
                        description: e
                            .nextUntil(`h2`)
                            .toArray()
                            .map((e) => r(e).html())
                            .join(``),
                    }
                )
            ),
    };
}
export { n as route };
