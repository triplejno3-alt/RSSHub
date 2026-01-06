import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = (e) => s(i(r, { children: e.list?.map((e) => a(r, { children: [i(`a`, { href: e.link, children: e.title }), i(`br`, {})] })) })),
    l = {
        path: `/zjxwlb/daily`,
        categories: [`traditional-media`],
        example: `/cztv/zjxwlb/daily`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`cztv.com/videos/zjxwlb`, `cztv.com/`] }],
        name: `浙江新闻联播 - 每日合集`,
        maintainers: [`yhkang`],
        handler: u,
        url: `cztv.com/videos/zjxwlb`,
    };
async function u() {
    let r = `http://www.cztv.com/videos/zjxwlb`,
        { data: i } = await t(r),
        a = o(i),
        s = a(`#videolistss li`)
            .toArray()
            .map((t) => ((t = a(t)), { title: t.find(`span.t1`).text(), link: t.find(`input[name=data-url]`).attr(`value`), pubDate: n(e(t.find(`span.t2`).text() + ` 16:30`, `YYYY-MM-DD hh:mm`), 8) }));
    return { title: `浙江新闻联播-每日合集`, link: r, item: [{ title: s[0].title, link: s[0].link, pubDate: s[0].pubDate, description: c({ list: s.slice(1) }) }] };
}
export { l as route };
