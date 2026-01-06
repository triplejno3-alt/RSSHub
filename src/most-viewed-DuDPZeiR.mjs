import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t as e } from './category-DHnRz8Bi.mjs';
const t = {
    path: `/most-viewed`,
    categories: [`finance`],
    example: `/finology/most-viewed`,
    radar: [{ source: [`insider.finology.in/most-viewed`], target: `/most-viewed` }],
    name: `Most Viewed`,
    maintainers: [`Rjnishant530`],
    handler: n,
    url: `insider.finology.in/most-viewed`,
};
async function n() {
    return await e(`https://insider.finology.in`, `/most-viewed`, { description: (e) => `Check out the most talked-about articles among our readers! ${e}`, date: !1, selector: `div.card` });
}
export { t as route };
