import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { load as t } from 'cheerio';
const n = {
    path: `/volume/:id`,
    categories: [`reading`],
    example: `/linovelib/volume/8`,
    parameters: { id: `小说 ID，可在小说页 URL 中找到` },
    radar: [{ source: [`www.linovelib.com/novel/:id/catalog`] }],
    name: `卷`,
    maintainers: [`rkscv`],
    handler: r,
};
async function r(n) {
    let { id: r } = n.req.param(),
        i = `https://www.linovelib.com/novel/${r}/catalog`,
        a = t((await e(i)).data);
    return {
        title: `${a(`.book-meta h1`).text()} - 哔哩轻小说`,
        link: i,
        item: a(`.volume`)
            .toArray()
            .map((e) => ({ title: a(e).find(`h2`).text(), link: a(e).find(`.volume-cover`).attr(`href`) }))
            .toReversed(),
    };
}
export { n as route };
