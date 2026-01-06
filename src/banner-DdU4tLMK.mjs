import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
const r = {
    path: `/banner`,
    categories: [`new-media`],
    example: `/chaping/banner`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`chaping.cn/`] }],
    name: `图片墙`,
    maintainers: [`nczitzk`],
    handler: i,
    url: `chaping.cn/`,
};
async function i() {
    let r = `https://chaping.cn/`,
        i = await n({ method: `get`, url: r }),
        a = JSON.parse(i.data.match(/"bannerList":(.*?),"menu":/)[1]).map((e) => ({ title: e.news_title, link: `https://chaping.cn/news/${e.news_id}` }));
    return {
        title: `差评 - 首页图片墙`,
        link: r,
        item: await Promise.all(
            a.map((r) =>
                e.tryGet(r.link, async () => {
                    let e = await n({ method: `get`, url: r.link }),
                        i = JSON.parse(e.data.match(/"current":(.*?),"optionsList":/)[1]);
                    return ((r.description = i.content), (r.author = i.article_author.name), (r.pubDate = t(i.time_publish_timestamp * 1e3)), r);
                })
            )
        ),
    };
}
export { r as route };
