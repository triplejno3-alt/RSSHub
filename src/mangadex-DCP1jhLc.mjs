import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './got-CKQ7C9HX.mjs';
import { n as e } from './_feed-DYR6QwZn.mjs';
const t = {
    path: `/manga/:id/:lang?`,
    radar: [{ source: [`mangadex.org/title/:id/:suffix`, `mangadex.org/title/:id`], target: `/manga/:id` }],
    name: `Single Manga Feed`,
    maintainers: [`vzz64`, `chrisis58`],
    example: `/mangadex/manga/f98660a1-d2e2-461c-960d-7bd13df8b76d/en`,
    handler: n,
    features: { nsfw: !0 },
};
async function n(t) {
    let { id: n, lang: r } = t.req.param(),
        i = await e(n, r);
    return { title: i.title, link: `https://mangadex.org/title/${n}`, description: i.description, item: i.chapters.map((e) => ({ title: e.title, link: e.link, pubDate: e.pubDate, image: i.cover })) };
}
export { t as route };
