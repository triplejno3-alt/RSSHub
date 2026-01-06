import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n as e, r as t, s as n } from './common-CeVXaBVy.mjs';
const r = {
    ...t,
    name: `Search Keyword Posts`,
    path: `/search/:keyword`,
    radar: [{ source: [`www.voronoiapp.com/explore`], target: (e, t) => `/voronoiapp/search/${new URL(t).searchParams.get(`search`)}` }],
    example: `/voronoiapp/search/china`,
    parameters: { keyword: `The keyword to search for` },
    handler: async (t) => {
        let { keyword: r } = t.req.param(),
            i = await n({ search: r });
        return { ...e, title: `Voronoi Posts for "${r}"`, link: `https://www.voronoiapp.com/explore?search=${encodeURIComponent(r)}`, item: i };
    },
};
export { r as route };
