import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as e, n as t, r as n, t as r } from './utils-DSPBdSqx.mjs';
const i = [
        { type: `pc`, name: `单机`, nodeId: `20465` },
        { type: `tv`, name: `电视`, nodeId: `20466` },
        { type: `indie`, name: `独立游戏`, nodeId: `20922` },
        { type: `web`, name: `网游`, nodeId: `20916` },
        { type: `mobile`, name: `手游`, nodeId: `20917` },
        { type: `all`, name: `全部评测`, nodeId: `20915` },
    ],
    a = {
        path: `/review/:type?`,
        categories: [`game`],
        example: `/gamersky/review/pc`,
        parameters: { type: '评测类型，可选值为 `pc`、`tv`、`indie`、`web`、`mobile`、`all`，默认为 `pc`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.gamersky.com/review`], target: `/review` }],
        name: `评测`,
        maintainers: [`yy4382`],
        description: n(i),
        handler: o,
    };
async function o(n) {
    let a = n.req.param(`type`) ?? `pc`,
        o = i.find((e) => e.type === a);
    if (!o) throw Error(`Invalid type: ${a}`);
    let s = e(await t(o.nodeId)),
        c = await Promise.all(s.map((e) => r(e)));
    return { title: `${o.name} - 游民星空评测`, link: `https://www.gamersky.com/review`, item: c };
}
export { a as route };
