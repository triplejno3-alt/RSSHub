import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
const n = {
    path: `/readlist/:listid`,
    categories: [`social-media`],
    view: t.Articles,
    example: `/bilibili/readlist/25611`,
    parameters: { listid: `文集 id, 可在专栏文集 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `专栏文集`,
    maintainers: [`hoilc`],
    handler: r,
};
async function r(t) {
    let n = t.req.param(`listid`),
        r = `https://www.bilibili.com/read/readlist/rl${n}`,
        i = (await e({ method: `get`, url: `https://api.bilibili.com/x/article/list/web/articles?id=${n}&jsonp=jsonp`, headers: { Referer: r } })).data.data;
    return {
        title: `bilibili 专栏文集 - ${i.list.name}`,
        link: r,
        image: i.list.image_url,
        description: i.list.summary ?? `作者很懒，还木有写简介.....((/- -)/`,
        item:
            i.articles &&
            i.articles.map((e) => ({
                title: e.title,
                author: i.author.name,
                description: `${e.summary}…<br><img src="${e.image_urls[0]}">`,
                pubDate: new Date(e.publish_time * 1e3).toUTCString(),
                link: `https://www.bilibili.com/read/cv${e.id}/?from=readlist`,
            })),
    };
}
export { n as route };
