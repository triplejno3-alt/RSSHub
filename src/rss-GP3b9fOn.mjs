import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = { path: `/`, categories: [`blog`], example: `/playpcesor`, radar: [{ source: [`playpcesor.com/`] }], name: `每日精选文章`, maintainers: [`cnkmmk`], handler: i, url: `playpcesor.com/` };
async function i() {
    let r = `https://www.playpcesor.com/`,
        i = n((await t({ method: `get`, url: r })).data);
    return {
        title: `电脑玩物`,
        link: r,
        item: i(`article[class='post-outer-container']`)
            .toArray()
            .map((t) => {
                let n = i(t),
                    r = n.find(`h3 > a`).text(),
                    a = n.find(`h3 > a`).attr(`href`);
                return { title: r, description: n.find(`div[class="snippet-item r-snippetized"]`).text(), link: a, pubDate: e(n.find(`time`).attr(`datetime`), `YYYY-MM-DDTHH:mm:ss+08:00`) };
            }),
    };
}
export { r as route };
