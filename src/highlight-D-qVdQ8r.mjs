import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { i as t, n, r, t as i } from './utils-DAZORnRC.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/highlight/:journal?`,
    categories: [`journal`],
    example: `/nature/highlight`,
    parameters: { journal: 'short name for a journal, `nature` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !0 },
    radar: [{ source: [`nature.com/:journal/articles`, `nature.com/:journal`, `nature.com/`], target: `/highlight/:journal` }],
    name: `Research Highlight`,
    maintainers: [],
    handler: s,
    description: `::: warning
  Only some journals are supported.
:::`,
};
async function s(o) {
    let { journal: s = `nature` } = o.req.param(),
        c = `${i}/${s}/articles?type=research-highlight`,
        l = a((await e(c, { cookieJar: n })).data),
        u = t(l);
    return ((u = await Promise.all(u.map((e) => r(e)))), { title: l(`title`).text().trim(), description: l(`meta[name=description]`).attr(`content`), link: c, item: u });
}
export { o as route };
