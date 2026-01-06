import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-WI9NnzyQ.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/changelog`,
    categories: [`programming`],
    example: `/gitpod/changelog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`gitpod.io/changelog`, `gitpod.io/`] }],
    name: `Changelog`,
    maintainers: [`TonyRL`],
    handler: a,
    url: `gitpod.io/changelog`,
};
async function a() {
    let i = r((await t(n + `/changelog`)).data),
        a = i(`div[class^=changelog-entry]`)
            .toArray()
            .map(
                (t) => (
                    (t = i(t)),
                    {
                        title: t.find(`h2`).text(),
                        link: n + t.find(`a`).attr(`href`),
                        description: t.find(`div[class^=content-docs]`).html(),
                        pubDate: e(t.find(`a[class*=mb-xx-small]`).text()),
                        author: t
                            .find(`span[class^=flex-shrink-0]`)
                            .eq(0)
                            .find(`img`)
                            .toArray()
                            .map((e) => i(e).attr(`alt`).replace(`Avatar of `, ``))
                            .join(`, `),
                    }
                )
            );
    return { title: i(`title`).text(), link: n + `/changelog`, description: i(`meta[name="description"]`).attr(`content`), language: `en-US`, item: a };
}
export { i as route };
