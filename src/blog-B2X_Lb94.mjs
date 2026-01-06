import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './rss-parser-CKuAfhVS.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/blog`,
    categories: [`new-media`],
    example: `/deepmind/blog`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`deepmind.com/blog`, `deepmind.com/`] }],
    name: `Blog`,
    maintainers: [`nczitzk`, `TonyRL`],
    handler: a,
    url: `deepmind.com/blog`,
};
async function a() {
    let i = await n.parseURL(`https://www.deepmind.com/blog/rss.xml`),
        a = await Promise.all(
            i.items.map((n) =>
                e.tryGet(n.link, async () => {
                    let { data: e } = await t(n.link);
                    return ((n.description = r(e)(`.e_container .c_rich-text__cms`).html()), delete n.content, delete n.contentSnippet, delete n.isoDate, n);
                })
            )
        );
    return { title: i.title, description: i.description, image: `https://assets-global.website-files.com/621d30e84caf0be3291dbf1c/621d336835a91420c6a8dcf2_webclip.png`, link: `${i.link}/blog`, item: a, language: `en` };
}
export { i as route };
