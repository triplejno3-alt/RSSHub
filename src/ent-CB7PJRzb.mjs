import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as e, n as t, r as n, t as r } from './utils-DSPBdSqx.mjs';
const i = new Map([
        [`all`, { title: `热点图文`, suffix: `ent`, nodeId: `20107` }],
        [`qw`, { title: `趣囧时间`, suffix: `ent/qw`, nodeId: `20113` }],
        [`movie`, { title: `游民影院`, suffix: `wenku/movie`, nodeId: `20111` }],
        [`discovery`, { title: `游观天下`, suffix: `ent/discovery`, nodeId: `20114` }],
        [`wp`, { title: `壁纸图库`, suffix: `ent/wp`, nodeId: `20117` }],
        [`wenku`, { title: `游民盘点`, suffix: `wenku`, nodeId: `20106` }],
        [`xz`, { title: `游民福利`, suffix: `ent/xz`, nodeId: `20119` }],
    ]),
    a = {
        path: `/ent/:category?`,
        categories: [`game`],
        example: `/gamersky/ent/xz`,
        parameters: { type: '分类类型，留空为 `all`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: Object.entries(i).map(([e, { title: t, suffix: n }]) => ({ title: t, source: [`www.gamersky.com/${n}`], target: `/ent/${e}` })),
        name: `娱乐`,
        maintainers: [`LogicJake`],
        description: n(Object.entries(i).map(([e, { title: t, nodeId: n }]) => ({ type: e, name: t, nodeId: n }))),
        handler: o,
    };
async function o(n) {
    let a = n.req.param(`category`) ?? `all`,
        o = i.get(a);
    if (!o) throw Error(`Invalid type: ${a}`);
    let s = e(await t(o.nodeId)),
        c = await Promise.all(s.map((e) => r(e)));
    return { title: `${o.title} - 游民娱乐`, link: `https://www.gamersky.com/${o.suffix}`, item: c };
}
export { a as route };
