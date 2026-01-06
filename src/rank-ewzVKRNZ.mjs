import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as t, o as n, r } from './util-Dq2Dir9E.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/rank/:range?`,
    categories: [`new-media`],
    example: `/mydrivers/rank`,
    parameters: { range: `时间范围，见下表，默认为24小时最热` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`m.mydrivers.com/newsclass.aspx`], target: `/rank` }],
    name: `排行`,
    maintainers: [`nczitzk`],
    handler: o,
    url: `m.mydrivers.com/newsclass.aspx`,
    description: `| 24 小时最热 | 本周最热 | 本月最热 |
| ----------- | -------- | -------- |
| 0           | 1        | 2        |`,
};
async function o(a) {
    let { range: o = `0` } = a.req.param(),
        s = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 10,
        c = new URL(`newsclass.aspx?tid=1001`, n).href,
        l = new URL(`m/newslist.ashx?ac=rank&tid=${o}`, n).href,
        { data: u } = await e(l),
        d = i(u),
        f = d(`a`)
            .toArray()
            .filter((e) => /\/(\d+)\.html?/.test(d(e).prop(`href`)))
            .slice(0, s)
            .map((e) => {
                e = d(e);
                let t = e.prop(`href`);
                return { title: e.text(), link: new URL(t, n).href, guid: t.match(/\/(\d+)\.html?/)[1] };
            });
    return ((f = await t(f)), { item: f, ...(await r(c, Number.parseInt(o, 10))) });
}
export { a as route };
