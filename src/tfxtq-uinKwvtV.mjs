import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { jsx as n } from 'hono/jsx/jsx-runtime';
import { renderToString as r } from 'hono/jsx/dom/server';
const i = {
    path: `/guangdong/tqyb/tfxtq`,
    categories: [`forecast`],
    example: `/gov/guangdong/tqyb/tfxtq`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.tqyb.com.cn/gz/weatherAlarm/suddenWeather/`] }],
    name: `突发性天气提示`,
    maintainers: [`Fatpandac`],
    handler: a,
    url: `www.tqyb.com.cn/gz/weatherAlarm/suddenWeather/`,
};
async function a() {
    let i = await t.get(`http://www.tqyb.com.cn/data/gzWeather/weatherTips.js`);
    return {
        title: `突发性天气提示`,
        link: `http://www.tqyb.com.cn/gz/weatherAlarm/suddenWeather/`,
        item: JSON.parse(`[{${i.data.match(/Tips = {(.*?)}/)[1]}}]`).map((t) => ({
            title: t.title,
            link: `http://www.tqyb.com.cn/gz/weatherAlarm/suddenWeather/`,
            author: t.issuer,
            description: r(n(`p`, { children: t.content })),
            pubDate: e(t.ddate),
            guid: e(t.ddate) + t.title,
        })),
    };
}
export { i as route };
