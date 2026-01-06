import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/topic/:interest`,
    example: `/academia/topic/Urban_History`,
    parameters: { interest: `interest` },
    radar: [{ source: [`academia.edu/Documents/in/:interest`], target: `/topic/:interest` }],
    name: `interest`,
    maintainers: [`K33k0`, `cscnk52`],
    categories: [`journal`],
    handler: r,
    url: `academia.edu`,
};
async function r(n) {
    let r = n.req.param(`interest`),
        i = t(await e(`https://www.academia.edu/Documents/in/${r}`)),
        a = i(`.works > .div`)
            .toArray()
            .map((e) => ({ title: i(e).find(`.title`).text(), link: i(e).find(`.title > a`).attr(`href`), author: i(e).find(`.authors`).text().replace(`by`, ``).trim(), description: i(e).find(`.summarized`).text() }));
    return { title: `academia.edu | ${r} documents`, link: `https://academia.edu/Documents/in/${r}`, item: a };
}
export { n as route };
