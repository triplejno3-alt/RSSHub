import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
    path: `/channel/:id/subject/:nav`,
    categories: [`social-media`],
    example: `/douban/channel/30168934/subject/0`,
    parameters: { id: `频道id`, nav: `书影音分类` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `频道书影音`,
    maintainers: [`umm233`],
    handler: n,
    description: `| 电影 | 电视剧 | 图书 | 唱片 |
| ---- | ------ | ---- | ---- |
| 0    | 1      | 2    | 3    |`,
};
async function n(t) {
    let n = t.req.param(`id`),
        r = t.req.param(`nav`),
        i = `https://www.douban.com/subject/${n}`,
        a = await e({ method: `get`, url: `https://m.douban.com/rexxar/api/v2/elessar/channel/${n}`, headers: { Referer: i } }),
        o = await e({ method: `get`, url: `https://m.douban.com/rexxar/api/v2/elessar/channel/${n}/subjects?ck=null&for_mobile=1`, headers: { Referer: i } }),
        s = a.data.title,
        c = o.data.modules[r].payload.subjects,
        l = ``;
    switch (r) {
        case `0`:
            l = `电影`;
            break;
        case `1`:
            l = `电视剧`;
            break;
        case `2`:
            l = `书籍`;
            break;
        case `3`:
            l = `唱片`;
            break;
    }
    return {
        title: `豆瓣${s}频道-${l}推荐`,
        link: i,
        description: `豆瓣${s}频道书影音下的${l}推荐`,
        item: c.map(({ title: e, extra: t, cover_img: n, url: r }) => {
            let i = t.rating_group.rating ? `${t.rating_group.rating.value.toFixed(1)}分` : t.rating_group.null_rating_reason;
            return { title: e, description: `标题：${e} <br> 信息：${t.short_info} <br> 评分：${i} <br> <img src="${n.url}">`, link: r };
        }),
    };
}
export { t as route };
