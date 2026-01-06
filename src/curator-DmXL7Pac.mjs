import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
        path: `/curator/:id/:routeParams?`,
        categories: [`game`],
        example: `/steam/curator/34646096-80-Days`,
        parameters: {
            id: `Steam curator id. It usually consists of a series of numbers and the curator's name.`,
            routeParams: {
                description:
                    'Extra parameters to filter the reviews. The following parameters are supported:\n| Key             | Description                                                                                   | Accepts                                    | Defaults to |\n| --------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |\n| `curations`   | Review type to filter by. `0`: Recommended, `1`: Not Recommended, `2`: Informational    | `0`/`1`/`2`/`0,1`/`0,2`/`1,2`  |             |\n| `tagids`      | Tag to filter by. Details are provided below.                                                 | use comma to separate multiple tagid       |             |\n\nNote: There is a [‘Popular Tags’](https://store.steampowered.com/tag/browse) page where you can find many but not all of the tags. The tag’s ID is in the `data-tagid` attribute of the element.Steam does not currently provide a page that comprehensively lists all tags, and you may need to explore alternative ways to find them.\n\nExamples:\n* `/steam/curator/34646096-80-Days/curations=&tagids=`\n* `/steam/curator/34646096-80-Days/curations=0&tagids=19`\n* `/steam/curator/34646096-80-Days/curations=0,2&tagids=19,21`\n',
            },
        },
        radar: [{ title: `Latest Curator Reviews`, source: [`store.steampowered.com/curator/:id`], target: `/curator/:id` }],
        description: `The Latest reviews from a Steam Curator.`,
        name: `Latest Curator Reviews`,
        maintainers: [`naremloa`, `fenxer`],
        handler: async (n) => {
            let { id: i, routeParams: s } = n.req.param(),
                l = new URLSearchParams(s),
                u = new URL(`https://store.steampowered.com/curator/${i}/ajaxgetfilteredrecommendations/?query&start=0&count=10&dynamic_data=&sort=recent&app_types=&reset=false&curations=&tagids=`);
            for (let [e, t] of l) [`curations`, `tagids`].includes(e) && u.searchParams.set(e, t || ``);
            let d = a((await e(u.toString())).results_html ?? ``),
                f = d(`.recommendation`)
                    .toArray()
                    .map((e) => {
                        let n = d(e),
                            i = n.find(`a.store_capsule img`),
                            a = i.attr(`alt`),
                            s = i.attr(`src`) ?? ``,
                            l = n.find(`.recommendation_link`).first().attr(`href`),
                            u = n.find(`.recommendation_desc`).text().trim(),
                            f = n.find(`.curator_review_date`).text().trim(),
                            p = /,\s\b\d{4}\b$/.test(f) ? t(f) : t(`${f}, ${new Date().getFullYear()}`);
                        return { title: a, link: l, description: o(r(c, { image: s, description: u })), pubDate: p, media: { content: { url: s, medium: `image` } } };
                    });
            return { title: `Steam Curator ${i} Reviews`, link: u.toString(), item: f };
        },
    },
    c = ({ image: e, description: t }) => i(n, { children: [e ? r(`img`, { src: e }) : null, r(`p`, { children: t })] });
export { s as route };
