import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = { path: `/index`, name: `Home`, example: `/nikkei/index`, maintainers: [`zjysdhr`], handler: r, url: `www.nikkei.com` };
async function r() {
    let n = `https://www.nikkei.com`,
        r = t((await e(n)).data);
    return {
        title: `日本経済新聞`,
        link: n,
        item: r(`a[data-rn-inview-track-value]`)
            .toArray()
            .map((e) => {
                e = r(e);
                let t = e.data(`rn-track-value`),
                    i = t.title,
                    a = `${n}/article/${t.kiji_id_raw}/`,
                    o = e.parent(),
                    s = o.find(`img[class^=image_]`);
                return { title: i, description: `<img src="${s.attr(`src`)}" alt="${s.attr(`alt`)}">` + (o.find(`[class^=excerptContainer]`).length ? o.find(`[class^=excerptContainer]`).html() : ``), link: a };
            }),
    };
}
export { n as route };
