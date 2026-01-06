import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/patch-notes`,
    categories: [`game`],
    example: `/leagueoflegends/patch-notes`,
    radar: [{ source: [`www.leagueoflegends.com/en-us/news/tags/patch-notes/`, `www.leagueoflegends.com/en-us/news/game-updates/:postSlug`] }],
    name: `Patch Notes`,
    maintainers: [`noahm`],
    async handler() {
        let r = `https://www.leagueoflegends.com/en-us/news/tags/patch-notes/`,
            i = (await t({ method: `get`, url: r })).data,
            a = n(i)(`script[id="__NEXT_DATA__"]`).text();
        if (!a) throw Error(`missing next data`);
        return {
            title: `League of Legends Patch Notes`,
            link: r,
            item: JSON.parse(a).props.pageProps.page.blades[2].items.map((t) => ({
                title: t.title,
                description: t.description.body,
                pubDate: e(t.publishedAt),
                link: t.action.payload.url,
                guid: t.analytics.contentId,
                image: t.media.url,
                itunes_item_image: t.media.url,
            })),
        };
    },
};
export { r as route };
