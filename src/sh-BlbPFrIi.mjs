import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './timezone-CrV-DT8S.mjs';
import { load as a } from 'cheerio';
const o = {
    path: `/sh`,
    categories: [`traditional-media`],
    example: `/eastday/sh`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sh.eastday.com/`] }],
    name: `上海新闻`,
    maintainers: [`saury`],
    handler: s,
    url: `sh.eastday.com/`,
};
async function s() {
    let o = await r({ method: `get`, url: `https://apin.eastday.com/apiplus/special/specialnewslistbyurl?specialUrl=1632798465040016&skipCount=0&limitCount=20` });
    return {
        title: `东方网-上海`,
        link: `http://wap.eastday.com/wap/sh.html`,
        item: await Promise.all(
            o.data.data.list.map(async (o) => {
                let s = o.url,
                    c = { title: o.title, description: o.abstracts, pubDate: i(n(o.time), 8), link: s };
                try {
                    let e = `eastday_sh_${s}`;
                    c.description = await t.tryGet(e, async () => {
                        let e = a((await r({ method: `get`, url: s })).body);
                        return e(`.article_wrapper .mainLayer .content`).html() || e(`.contentBox .article .detail`).html();
                    });
                } catch (t) {
                    e.error(t);
                }
                return c;
            })
        ),
    };
}
export { o as route };
