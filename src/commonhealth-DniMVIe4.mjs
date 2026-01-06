import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = {
    path: `/`,
    name: `最新內容`,
    url: `commonhealth.com.tw`,
    maintainers: [`johan456789`],
    example: `/commonhealth`,
    categories: [`traditional-media`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.commonhealth.com.tw/`], target: `/` }],
    handler: s,
};
async function s() {
    return {
        title: `康健`,
        link: `https://www.commonhealth.com.tw`,
        language: `zh-TW`,
        item: (await e(`https://api-ch.commonhealth.com.tw/api/v3.0/latest_article/channel/focus/list`, { headers: { accept: `application/json`, 'api-key': `Cah2snYi52eJjpshbIfof1Tpx8ZhzXqh` }, query: { page: 1 } })).items.list.map(
            (e) => {
                let n = c(e.image, e.preface);
                return { title: e.title, link: e.link, pubDate: t(e.item_datetime), description: n };
            }
        ),
    };
}
const c = (e, t) => a(i(n, { children: [r(`img`, { src: e, alt: `article image` }), r(`p`, { children: t })] }));
export { o as route };
