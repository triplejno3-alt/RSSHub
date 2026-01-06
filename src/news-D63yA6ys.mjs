import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './utils-BudhBG7e.mjs';
const i = {
    path: `/news`,
    categories: [`game`],
    example: `/nintendo/news`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`nintendo.com.hk/topics`, `nintendo.com.hk/`] }],
    name: `News（Hong Kong only）`,
    maintainers: [`HFO4`],
    handler: a,
    url: `nintendo.com.hk/topics`,
};
async function a(i) {
    let a = (await n(`https://www.nintendo.com.hk/data/json/topics.json`)).data.filter((e) => e.only_for !== `tw` && e.url.startsWith(`/topics/article/`)).slice(0, i.req.query(`limit`) ? Number(i.req.query(`limit`)) : 30);
    return {
        title: `Nintendo（香港）主页资讯`,
        link: `https://www.nintendo.com.hk/topics/`,
        description: `Nintendo 香港有限公司官网刊登的资讯`,
        item: (await r.ProcessNews(a, e)).map((e) => ({ title: e.title, description: e.content, link: `https://www.nintendo.com.hk${e.url}`, pubDate: t(e.release_date, `YYYY.M.D`) })),
    };
}
export { i as route };
