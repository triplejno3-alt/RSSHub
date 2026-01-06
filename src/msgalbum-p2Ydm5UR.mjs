import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { n as t } from './wechat-mp-HNgcLN2K.mjs';
import { load as n } from 'cheerio';
import r from 'dayjs';
const i = {
    path: `/mp/msgalbum/:biz/:aid`,
    categories: [`new-media`],
    example: `/wechat/mp/msgalbum/MzA3MDM3NjE5NQ==/1375870284640911361`,
    parameters: { biz: `公众号id`, aid: `Tag id` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `公众号文章话题 Tag`,
    maintainers: [`MisteryMonster`],
    handler: a,
    description:
        '一些公众号（如看理想）会在微信文章里添加 Tag ，点入 Tag 的链接如 `https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzA3MDM3NjE5NQ==&action=getalbum&album_id=1375870284640911361`，其中`biz` 为 `MzA3MDM3NjE5NQ==`，`aid` 为 `1375870284640911361`。',
};
async function a(i) {
    let { biz: a, aid: o } = i.req.param(),
        s = `&album_id=${o}`,
        c = n((await e({ method: `get`, url: `https://mp.weixin.qq.com/mp/appmsgalbum?__biz=${a}&action=getalbum${s}` })).data),
        l = c(`li`).toArray(),
        u = c(`.album__author-name`).text() + `|` + c(`.album__label-title`).text(),
        d = await Promise.all(
            l.map((e) => {
                let n = c(e).attr(`data-link`).replace(`http://`, `https://`);
                return t({ title: c(e).attr(`data-title`), link: n, guid: n });
            })
        );
    return {
        title: u,
        link: `https://mp.weixin.qq.com/mp/appmsgalbum?__biz=${a}&action=getalbum${s}`,
        item: l.map((e, t) => ({
            title: d[t].title,
            description: c(e).find(`.album__item-img`).html() + `<br><br>${d[t].description}`,
            link: d[t].link,
            guid: d[t].guid,
            author: d[t].author,
            pubDate: r.unix(c(e).find(`.js_article_create_time`).text()).format(),
        })),
    };
}
export { i as route };
