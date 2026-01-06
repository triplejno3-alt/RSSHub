import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { load as n } from 'cheerio';
const r = { path: `/blog`, categories: [`blog`], example: `/njuferret/blog`, radar: [{ source: [`njuferret.github.io`] }], name: `Blogs`, maintainers: [`tyl0622`], handler: i };
async function i() {
    let r = `https://njuferret.github.io`,
        i = n(await e(r));
    return {
        title: `njuferret - blog`,
        item: i(`div.post-block`)
            .toArray()
            .map((e) => {
                e = i(e);
                let n = e.find(`a`).first();
                return { title: n.text(), link: `${r}${n.attr(`href`)}`, pubDate: t(e.find(`time`).attr(`datetime`)) };
            }),
    };
}
export { r as route };
