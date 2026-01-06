import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/posts/:topic/:id`,
    categories: [`game`],
    example: `/itch/posts/9539/introduce-yourself`,
    parameters: { topic: `Topic id, can be found in URL`, id: `Topic name, can be found in URL` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`itch.io/t/:topic/:id`] }],
    name: `Posts`,
    maintainers: [`nczitzk`],
    handler: i,
};
async function i(r) {
    let i = `https://itch.io/t/${r.req.param(`topic`)}/${r.req.param(`id`)}?before=999999999`,
        a = n((await t({ method: `get`, url: i })).data),
        o = a(`.post_grid`)
            .toArray()
            .map((t) => {
                t = a(t);
                let n = t.find(`.post_author`).text(),
                    r = t.find(`.post_body`);
                return { author: n, description: r.html(), title: `${n}: ${r.text()}`, link: t.find(`.post_date a`).attr(`href`), pubDate: e(t.find(`.post_date`).attr(`title`)) };
            });
    return { title: a(`title`).text(), link: i, item: o };
}
export { r as route };
