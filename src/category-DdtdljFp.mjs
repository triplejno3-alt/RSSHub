import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './description-CIM84RRv.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/category/:category/:staffpicks?`,
    categories: [`social-media`],
    view: r.Videos,
    example: `/vimeo/category/documentary/staffpicks`,
    parameters: {
        category: 'Category name can get from url like `documentary` in [https://vimeo.com/categories/documentary/videos](https://vimeo.com/categories/documentary/videos) ',
        staffpicks: 'type `staffpicks` to sort with staffpicks',
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Category`,
    maintainers: [`MisteryMonster`],
    handler: s,
};
async function s(r) {
    let { category: o, staffpicks: s } = r.req.param(),
        c = o,
        l = `&direction=desc&sort=date`,
        u = o;
    if (s && s !== `staffpicks`) return;
    s && ((l += `&filter=conditional_featured`), (u += `: ${o} staffpicks`));
    let d = `https://api.vimeo.com/categories/${c}/videos?page=1&per_page=18${l}`,
        f = (await n({ method: `get`, url: `https://vimeo.com/_rv/viewer` })).data.jwt,
        p = (await n({ method: `get`, url: d, headers: { Authorization: `jwt ${f}` } })).data.data,
        m = `https://vimeo.com/categories/${o}/videos/sort:latest`,
        h = `?staffpicked=true`,
        g = await e.tryGet(m + (s ? h : ``), async () => a((await n({ url: m + (s ? h : ``) })).data)(`meta[name="description"]`).attr(`content`));
    return {
        title: `${u} | Vimeo category`,
        link: m + (s ? h : ``),
        description: g,
        item: p.map((e) => ({ title: e.name, description: i({ videoUrl: e.uri.replace(`/videos`, ``), vdescription: e.description || `` }), pubDate: t(e.created_time), link: e.link, author: e.user.name })),
    };
}
export { o as route };
