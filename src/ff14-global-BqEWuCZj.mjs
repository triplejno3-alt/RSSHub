import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { t as r } from './valid-host-Bsy2BS2p.mjs';
import { t as i } from './description-r10Hlsjc.mjs';
const a = {
    path: [`/global/:lang/:type?`, `/ff14_global/:lang/:type?`],
    categories: [`game`],
    example: `/ff14/global/na/all`,
    parameters: { lang: `Region`, type: 'Category, `all` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `FINAL FANTASY XIV (The Lodestone)`,
    maintainers: [`kmod-midori`],
    handler: o,
    description: `Region

| North Ameria | Europe | France | Germany | Japan |
| ------------ | ------ | ------ | ------- | ----- |
| na           | eu     | fr     | de      | jp    |

  Category

| all | topics | notices | maintenance | updates | status | developers |
| --- | ------ | ------- | ----------- | ------- | ------ | ---------- |`,
};
async function o(a) {
    let o = a.req.param(`lang`),
        s = a.req.param(`type`) ?? `all`;
    if (!r(o)) throw new n(`Invalid lang`);
    let c = await t({ method: `get`, url: `https://lodestonenews.com/news/${s}?locale=${o}` }),
        l;
    if (s === `all`) {
        l = [];
        for (let e of Object.values(c.data)) l = [...l, ...e];
    } else l = c.data;
    return {
        title: `FFXIV Lodestone updates (${s})`,
        link: `https://${o}.finalfantasyxiv.com/lodestone/news/`,
        item: l.map(({ id: t, url: n, title: r, time: a, description: o, image: s }) => ({ title: r, link: n, description: i({ image: s, description: o }), pubDate: e(a), guid: t })),
    };
}
export { a as route };
