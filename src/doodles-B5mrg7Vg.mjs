import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
const n = {
    path: `/doodles/:language?`,
    categories: [`picture`],
    view: t.Pictures,
    example: `/google/doodles/zh-CN`,
    parameters: { language: 'Language, default to `zh-CN`, for other language values, you can get it from [Google Doodles official website](https://www.google.com/doodles)' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `Update`,
    maintainers: [`xyqfer`],
    handler: r,
};
async function r(t) {
    let { language: n = `zh-CN` } = t.req.param(),
        r = new Date(),
        i = r.getFullYear(),
        a = r.getMonth() + 1,
        o = `https://www.google.com/doodles?hl=${n}`,
        { data: s } = await e({ method: `get`, url: `https://www.google.com/doodles/json/${i}/${a}?hl=${n}`, headers: { Referer: o } });
    return {
        title: `Google Doodles`,
        link: o,
        item:
            s &&
            s.map((e) => {
                let t = `${e.run_date_array[0]}-${e.run_date_array[1]}-${e.run_date_array[2]}`;
                return { title: e.title, description: `<img src="https:${e.url}" /><br>${e.share_text}`, pubDate: new Date(t).toUTCString(), guid: e.url, link: `https://www.google.com/search?q=${encodeURIComponent(e.query)}` };
            }),
    };
}
export { n as route };
