import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { i as t, t as n } from './readable-social--hCfpJhv.mjs';
import { t as r } from './list-description-gNPp-xjC.mjs';
const i = {
    path: `/recommended/:type?/:routeParams?`,
    categories: [`social-media`],
    example: `/douban/recommended/tv`,
    parameters: { type: `片单类型剧集/电影，tv或movie，默认为tv`, routeParams: `额外参数；请参阅以下说明和表格` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `豆瓣每月推荐片单`,
    maintainers: [`honue`],
    handler: a,
    description: `| 额外参数 | 含义                   | 接受的值 | 默认值 |
| -------- | ---------------------- | -------- | ------ |
| playable | 仅看有可播放片源的影片 | 0/1      | 0      |
| score    | 筛选评分               | 0-10     | 0      |

  用例：\`/douban/recommended/tv/playable=0&score=8\`

::: tip
  整合了 /douban/list/ 路由，省去每月手动更新 id 参数，因为当月推荐剧集片单中，会有还未播出 / 开评分剧集、海外平台播出剧集，请自行考虑是否使用额外参数。
:::`,
};
async function a(i) {
    let a = `https://frodo.douban.com/api/v2/skynet/new_playlists?apikey=0ac44ae016490db2204ce0a042db2916&subject_type=${i.req.param(`type`) || `tv`}`,
        o = await e({ method: `get`, url: a, headers: { 'User-Agent': `MicroMessenger/`, Referer: `https://servicewechat.com/wx2f9b06c1de1ccfca/91/page-frame.html` } }),
        s = new Date(),
        c = s.getFullYear(),
        l = s.getMonth() + 1,
        u = l < 10 ? `0` + l : l.toString(),
        d = o.data.data[0].items,
        f = d.find((e) => e.title.startsWith(`${c}年${u}月`)).id,
        p = Object.fromEntries(new URLSearchParams(i.req.param(`routeParams`))),
        m = n(void 0, t(p.playable), 0),
        h = n(void 0, t(p.score), 0);
    ((a = `https://m.douban.com/rexxar/api/v2/subject_collection/${f}/items?playable=${m}`), (o = await e({ method: `get`, url: a, headers: { Referer: `https://m.douban.com/subject_collection/${f}` } })));
    let g = o.data.subject_collection.description;
    return (
        (d = o.data.subject_collection_items
            .filter((e) => (e.rating ? e.rating.value : 0) >= h)
            .map((e) => {
                let t = e.title;
                return {
                    title: t,
                    link: e.url,
                    description: r({
                        ranking_value: e.ranking_value,
                        title: t,
                        original_title: e.original_title,
                        rate: e.rating ? e.rating.value : null,
                        card_subtitle: e.card_subtitle,
                        description: e.cards ? e.cards[0].content : e.abstract,
                        cover: e.cover_url || e.cover?.url,
                    }),
                };
            })),
        { title: `豆瓣 - ${o.data.subject_collection.name}`, link: `https://m.douban.com/subject_collection/${f}`, item: d, description: g }
    );
}
export { i as route };
