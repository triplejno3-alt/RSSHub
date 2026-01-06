import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = `https://wufazhuce.com/`,
    i = `「ONE · 一个」`,
    a = {
        path: `/one`,
        categories: [`new-media`],
        example: `/wufazhuce/one`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`wufazhuce.com`], target: `/one` }],
        name: i,
        maintainers: [`sicheng1806`],
        handler: o,
    };
async function o() {
    let a = n((await t(r)).body),
        o = [
            ...a(`#carousel-one div.item`)
                .toArray()
                .map((e) => {
                    let t = a(e).find(`.fp-one-cita a`).first();
                    return { title: t.text(), link: t.attr(`href`), description: ``, category: `摄影` };
                }),
            ...a(`.fp-one-articulo a`)
                .toArray()
                .map((e) => {
                    let t = a(e);
                    return { title: t.text(), link: t.attr(`href`), description: ``, category: `文章` };
                }),
            ...a(`.fp-one-cuestion a`)
                .toArray()
                .map((e) => {
                    let t = a(e);
                    return { title: t.text(), link: t.attr(`href`), description: ``, category: `问题` };
                }),
        ];
    return (
        (o = await Promise.all(o.map((r) => e.tryGet(r.link, async () => ((r.description = n((await t(r.link)).body)(`.tab-content`).html() || ``), r))))),
        { title: i, link: r, item: o, description: `复杂世界里, 一个就够了. One is all.` }
    );
}
export { a as route };
