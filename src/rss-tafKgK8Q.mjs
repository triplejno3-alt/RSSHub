import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { path: `/`, categories: [`blog`], example: `/bulianglin`, radar: [{ source: [`bulianglin.com/`] }], name: `全部文章`, maintainers: [`cnkmmk`], handler: i, url: `bulianglin.com/` };
async function i() {
    let r = `https://bulianglin.com/`,
        i = n((await t({ method: `get`, url: r })).data);
    return {
        title: `不良林`,
        link: r,
        item: i(`div.single-post`)
            .toArray()
            .map((t) => {
                let n = i(t),
                    r = n.find(`h2 > a`).text(),
                    a = n.find(`h2 > a`).attr(`href`);
                return { title: r, description: n.find(`p.summary`).text(), link: a, pubDate: e(n.find(`div.text-muted`).find(`li`).eq(1).text(), `YYYY 年 MM 月 DD 日`) };
            }),
    };
}
export { r as route };
