import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/packs/:type?`,
    categories: [`game`],
    example: `/osu/packs`,
    parameters: { type: 'pack type, default to `standard`, can choose from `featured`, `tournament`, `loved`, `chart`, `theme` and `artist`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Beatmap Packs`,
    maintainers: [`JimenezLi`],
    handler: i,
};
async function i(r) {
    let { type: i = `standard` } = r.req.param(),
        a = `https://osu.ppy.sh/beatmaps/packs?type=${i}`,
        o = n((await t.get(a)).data),
        s = o(`.beatmap-pack`);
    return {
        title: `osu! Beatmap Pack - ${i}`,
        link: a,
        item: s.toArray().map((t) => {
            let n = o(t);
            return {
                title: n.find(`.beatmap-pack__name`).text().trim(),
                link: n.find(`.beatmap-pack__header`).attr(`href`),
                description: n.find(`.beatmap-pack__body`).html(),
                pubDate: e(n.find(`.beatmap-pack__date`).text(), `YYYY-MM-DD`),
                author: n.find(`.beatmap-pack__author--bold`).text().trim(),
            };
        }),
    };
}
export { r as route };
