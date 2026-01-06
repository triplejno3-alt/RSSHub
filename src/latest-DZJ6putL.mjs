import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { n as e, r as t, s as n, t as r } from './common-CeVXaBVy.mjs';
const i = {
    ...t,
    name: `Latest Posts`,
    path: `/latest/:category?`,
    radar: [{ source: [`www.voronoiapp.com/posts/latest`], target: `/latest` }],
    example: `/voronoiapp/latest`,
    parameters: { category: r },
    handler: async (t) => {
        let { category: r = `` } = t.req.param(),
            i = await n({ swimlane: `LATEST`, category: r === `` ? void 0 : r });
        return { ...e, title: `Voronoi Latest Posts${r ? ` - ${r}` : ``}`, link: `https://www.voronoiapp.com/latest`, item: i };
    },
};
export { i as route };
