import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './description-BZOcVPIx.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/books/:language`,
    categories: [`design`],
    view: r.Articles,
    example: `/jimmyspa/books/tw`,
    parameters: {
        language: {
            description: `语言`,
            options: [
                { value: `tw`, label: `臺灣正體` },
                { value: `en`, label: `English` },
                { value: `jp`, label: `日本語` },
            ],
        },
    },
    radar: [{ source: [`www.jimmyspa.com/:language/Books`] }],
    name: `Books`,
    description: `
| language | Description |
| ---   | ---   |
| tw | 臺灣正體 |
| en | English |
| jp | 日本語 |
    `,
    maintainers: [`Cedaric`],
    handler: s,
};
async function s(r) {
    let o = r.req.param(`language`),
        s = `https://www.jimmyspa.com`,
        c = new URL(`/${o}/Books/Ajax/changeList?year=&keyword=&categoryId=0&page=1`, s).href,
        l = a((await n(c)).data.view)(`ul#appendWork li.work_block`)
            .toArray()
            .map(async (r) => {
                let o = a(r),
                    c = o(`p.tit`).text(),
                    l = o(`div.work_img img`).prop(`src`) || ``,
                    u = l ? s + l : ``,
                    d = o(`li.work_block`).prop(`data-route`),
                    { renderedDescription: f, publishDate: p } = await e.tryGet(d, async () => {
                        let e = a((await n(d)).data),
                            r = e(`article.intro_cont`).html() || ``,
                            o = e(`div.info_wrap`).html() || ``,
                            l = r.replaceAll(/<img\b[^>]*>/g, (e) => e.replaceAll(/\b(src|data-src)="(?!http|https|\/\/)([^"]*)"/g, (e, t, n) => `${t}="${new URL(n, s).href}"`)),
                            f = o.match(/<span>(首次出版|First Published|初版)<\/span>\s*<span class="num">([^<]+)<\/span>/),
                            p = f ? t(f[2] + `-02`) : ``;
                        return { renderedDescription: i({ images: u ? [{ src: u, alt: c }] : void 0, description: l }), publishDate: p };
                    });
                return { title: c, link: d, description: f, pubDate: p, content: { html: f, text: c } };
            });
    return { title: `幾米 - 幾米創作(${o})`, link: `${s}/${o}/Books`, allowEmpty: !0, item: await Promise.all(l) };
}
export { o as route };
