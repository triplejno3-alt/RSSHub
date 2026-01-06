import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = {
    path: `/www/:category?`,
    categories: [`university`],
    example: `/sqmc/www/3157`,
    parameters: { category: '分类ID，默认为`3157`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`sqmc.edu.cn/:category/list.htm`] }],
    name: `官网信息`,
    maintainers: [`nyaShine`],
    handler: o,
    description: `| 学校要闻 | 通知 | 学术讲座 | 基层风采书院 | 基层风采院系 | 外媒报道 | 三全学院报 |
| -------- | ---- | -------- | ------------ | ------------ | -------- | ---------- |
| 3157     | 3187 | 3188     | 3185         | 3186         | 3199     | 3200       |`,
};
async function o(a) {
    let o = a.req.param(`category`) || `3157`,
        s = `https://www.sqmc.edu.cn`,
        c = `${s}/${o}/list.htm`,
        l = i((await n({ method: `get`, url: c })).data),
        u = l(`div#wp_news_w9 ul li`).toArray();
    return {
        title: `新乡医学院三全学院官网信息${l(`title`).text()}`,
        link: c,
        item: await Promise.all(
            u.map(async (a) => {
                a = l(a);
                let o = new URL(a.find(`dt a`).attr(`href`), s).href,
                    c = t(a.find(`dd`).eq(0).text(), `YYYY-MM-DD`);
                return await e.tryGet(o, async () => {
                    let e = i((await n({ method: `get`, url: o })).data);
                    return { title: a.find(`dt a`).text(), description: e(`div.Tr_Detail`).html(), link: o, pubDate: r(c, 8) };
                });
            })
        ),
    };
}
export { a as route };
