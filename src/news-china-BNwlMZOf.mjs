import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './invalid-parameter-DGZgOgO2.mjs';
import { t as r } from './utils-BudhBG7e.mjs';
const i = `https://www.nintendoswitch.com.cn`,
    a = {
        path: `/news/china`,
        categories: [`game`],
        example: `/nintendo/news/china`,
        parameters: {},
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`nintendoswitch.com.cn/`] }],
        name: `首页资讯（中国）`,
        maintainers: [`NeverBehave`],
        handler: o,
        url: `nintendoswitch.com.cn/`,
    };
async function o() {
    let a = await t(i),
        o = await r.nuxtReader(a.data);
    if (!o.newsList) throw new n(`新闻信息不存在，请报告这个问题`);
    let s = o.newsList.map((e) => ({ title: e.title, description: r.generateImageLink(e.imgUrl), link: `${i}/topics/${e.jumpUrl}` }));
    return ((s = await r.ProcessNewsChina(s, e)), { title: `Nintendo（中国大陆）主页资讯`, link: `https://www.nintendoswitch.com.cn`, description: `Nintendo 中国大陆官网刊登的资讯`, item: s });
}
export { a as route };
