import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { t as r } from './rss-parser-CKuAfhVS.mjs';
import { load as i } from 'cheerio';
const a = `https://www.magnumphotos.com`,
    o = {
        path: `/magazine`,
        categories: [`picture`],
        view: n.Pictures,
        example: `/magnumphotos/magazine`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`magnumphotos.com/`] }],
        name: `Magazine`,
        maintainers: [`EthanWng97`],
        handler: s,
        url: `magnumphotos.com/`,
    };
async function s() {
    let n = `${a}/feed/`,
        o = await r.parseURL(n);
    return {
        title: `Magnum Photos`,
        link: a,
        description: `Magnum is a community of thought, a shared human quality, a curiosity about what is going on in the world, a respect for what is going on and a desire to transcribe it visually`,
        item: await Promise.all(
            o.items.map((n) =>
                t.tryGet(n.link, async () => {
                    if (!n.link) return;
                    let t = i(await e(n.link))(`#content`);
                    return (t.find(`ul.share`).remove(), t.find(`h1`).remove(), { title: n.title, pubDate: n.pubDate, link: n.link, category: n.categories, description: t.html() });
                })
            )
        ),
    };
}
export { o as route };
