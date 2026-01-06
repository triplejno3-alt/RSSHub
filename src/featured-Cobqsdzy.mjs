import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { n, t as r } from './utils-BlcnbfaZ.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/featured`,
    categories: [`new-media`],
    example: `/grist/featured`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`grist.org/`] }],
    name: `Featured`,
    maintainers: [`Rjnishant530`],
    handler: o,
    url: `grist.org/`,
};
async function o() {
    let a = `https://grist.org/`,
        { data: o } = await t(a),
        s = i(o),
        c = s(`li.hp-featured__tease`)
            .toArray()
            .map((e) => ((e = s(e)), { link: e.find(`.small-tease__link`).attr(`href`).split(`/`).at(-2) }));
    return {
        title: `Gist Featured Articles`,
        link: a,
        item: await n(await Promise.all(c.map((t) => e.tryGet(t.link, async () => (await r(`https://grist.org/wp-json/wp/v2/posts?slug='${t.link}'&_embed`))[0])))),
        description: `Featured Articles on Grist.org`,
        logo: `https://grist.org/wp-content/uploads/2021/03/cropped-Grist-Favicon.png?w=192`,
        icon: `https://grist.org/wp-content/uploads/2021/03/cropped-Grist-Favicon.png?w=32`,
        language: `en-us`,
    };
}
export { a as route };
