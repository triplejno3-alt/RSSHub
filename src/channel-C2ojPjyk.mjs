import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './timezone-CrV-DT8S.mjs';
import { i as t, n, r, t as i } from './utils-DnCBP1jc.mjs';
import * as a from 'cheerio';
import o from 'p-map';
const s = {
    path: `/channel/:id?`,
    parameters: { id: '分类 ID，可在 URL 中找到，默认为 `1`' },
    radar: [{ source: [`www.myzaker.com/channel/:id`], target: `/channel/:id` }],
    name: `分类`,
    example: `/zaker/channel/13`,
    maintainers: [`LogicJake`, `kt286`, `TonyRL`],
    handler: c,
};
async function c(s) {
    let c = `${i}/channel/${s.req.param(`id`) ?? 1}`,
        { cookie: l, data: u } = await r(c),
        d = a.load(u);
    return { title: d(`head title`).text(), link: c, item: await o(t(d), (t) => e.tryGet(t.link, () => n(t, l)), { concurrency: 2 }) };
}
export { s as route };
