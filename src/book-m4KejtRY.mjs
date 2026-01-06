import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
import { load as n } from 'cheerio';
const r = {
        'combined-print-and-e-book-nonfiction': `Combined Print & E-Book Nonfiction`,
        'hardcover-nonfiction': `Hardcover Nonfiction`,
        'paperback-nonfiction': `Paperback Nonfiction`,
        'advice-how-to-and-miscellaneous': `Advice, How-To & Miscellaneous`,
        'combined-print-and-e-book-fiction': `Combined Print & E-Book Fiction`,
        'hardcover-fiction': `Hardcover Fiction`,
        'trade-fiction-paperback': `Paperback Trade Fiction`,
        'childrens-middle-grade-hardcover': `Children's Middle Grade Hardcover`,
        'picture-books': `Picture Books`,
        'series-books': `Series Books`,
        'young-adult-hardcover': `Young Adult Hardcover`,
    },
    i = {
        path: `/book/:category?`,
        categories: [`traditional-media`],
        view: t.Notifications,
        example: `/nytimes/book/combined-print-and-e-book-nonfiction`,
        parameters: {
            category: {
                description: `Category, can be found on the [official page](https://www.nytimes.com/books/best-sellers/)`,
                options: Object.keys(r).map((e) => ({ value: e, label: r[e] })),
                default: `combined-print-and-e-book-nonfiction`,
            },
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`nytimes.com/`], target: `` }],
        name: `Best Seller Books`,
        maintainers: [`melvinto`, `pseudoyu`],
        handler: a,
        url: `nytimes.com/`,
    };
async function a(t) {
    let i = t.req.param(`category`) ?? `combined-print-and-e-book-nonfiction`,
        a = `https://www.nytimes.com/books/best-sellers/${i}`,
        o = [],
        s = ``;
    if (r[i]) {
        let t = (await e({ method: `get`, url: a })).data,
            r = n(t);
        ((s = r(`h1`).eq(0).text()),
            (o = r(`article[itemprop=itemListElement]`)
                .toArray()
                .map((e, t) => {
                    let n = r(e),
                        i = n.find(`p`).eq(0).text(),
                        a = n.find(`h3[itemprop=name]`),
                        o = n.find(`p[itemprop=author]`).text(),
                        s = n.find(`p[itemprop=publisher]`).text(),
                        c = n.find(`p[itemprop=description]`).text(),
                        l = n.find(`img[itemprop=image]`).attr(`src`),
                        u = n.find(`ul[aria-label="Links to Book Retailers"]`).find(`a`).toArray(),
                        d = u.length > 0 ? r(u[0]).attr(`href`) : ``;
                    for (let e of u) {
                        let t = r(e);
                        if (t.text() === `Amazon`) {
                            d = t.attr(`href`);
                            break;
                        }
                    }
                    return { title: `${t + 1}: ${a.text()}`, author: o, description: `<figure><img src="${l}" alt="test"/><figcaption><span>${c}</span></figcaption></figure><br/>${i}<br/>Author: ${o}<br/>Publisher: ${s}`, link: d };
                })));
    }
    return { title: `The New York Times Best Sellers - ${s}`, link: a, item: o };
}
export { i as route };
