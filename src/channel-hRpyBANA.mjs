import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './invalid-parameter-DGZgOgO2.mjs';
import { n, t as r } from './utils-z6Ins7W9.mjs';
const i = { calendar: `pac`, institute: `predator`, foodlab: `predator`, pretty: `beauty` },
    a = {
        path: `/column/:channel`,
        categories: [`new-media`],
        example: `/guokr/column/calendar`,
        parameters: { channel: `专栏类别` },
        radar: [{ source: [`guokr.com/:channel`] }],
        name: `果壳网专栏`,
        maintainers: [`DHPO`, `hoilc`],
        handler: o,
        url: `guokr.com/`,
        description: `| 物种日历 | 吃货研究所 | 美丽也是技术活 |
| -------- | ---------- | -------------- |
| calendar | institute  | beauty         |`,
    };
async function o(a) {
    let { data: o } = await e(`https://www.guokr.com/apis/minisite/article.json`, { searchParams: { retrieve_type: `by_wx`, channel_key: i[a.req.param(`channel`)] ?? a.req.param(`channel`), offset: 0, limit: 10 } }),
        s = n(o.result);
    if (s.length === 0) throw new t(`Unknown channel`);
    let c = s[0].channels[0].name,
        l = s[0].channels[0].url,
        u = await Promise.all(s.map((e) => r(e)));
    return { title: `果壳网 ${c}`, link: l, item: u };
}
export { a as route };
