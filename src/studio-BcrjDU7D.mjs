import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = { path: `/839studio`, name: `澎湃美数课作品集`, maintainers: [`umm233`], handler: r };
async function r() {
    let n = (await e({ method: `get`, url: `http://projects.thepaper.cn/thepaper-cases/839studio/?lang=zh` })).data,
        r = t(n);
    return {
        title: `澎湃美数课作品集`,
        link: `http://projects.thepaper.cn/thepaper-cases/839studio/`,
        item: r(`div[class=imgtext]`)
            .toArray()
            .map((e) => ((e = r(e)), { title: e.find(`.imgup a`).first().text(), description: `描述：${e.find(`.imgdown p`).text()}`, link: e.find(`.imgup a`).attr(`href`) })),
    };
}
export { n as route };
