import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { i as n, n as r, r as i, t as a } from './utils-fhcja1zS.mjs';
const o = {
    path: `/topic/:topic?`,
    categories: [`new-media`],
    example: `/utgd/topic/在线阅读专栏`,
    parameters: { topic: `专题，默认为在线阅读专栏` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`utgd.net/topic`, `utgd.net/`], target: `/topic/:topic` }],
    name: `专题`,
    maintainers: [`nczitzk`],
    handler: s,
    url: `utgd.net/topic`,
    description: `| 在线阅读专栏 | 卡片笔记专题 |
| ------------ | ------------ |

  更多专栏请见 [专题广场](https://utgd.net/topic)`,
};
async function s(o) {
    let s = o.req.param(`topic`) ?? `在线阅读专栏`,
        c = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`)) : 20,
        l = `${n}/topic`,
        u = await e(`${a}/api/v2/topic/`),
        d = u.find((e) => e.title === s);
    if (!d) throw new t(`No topic named ${s}`);
    u = await e(`${n}/api/v2/topic/${d.id}/article/`);
    let f = i(u.results, c),
        p = await Promise.all(f.map((e) => r(e)));
    return { title: `UNTAG - ${d.title}`, link: l, item: p, description: d.summary };
}
export { o as route };
