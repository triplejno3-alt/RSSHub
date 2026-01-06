import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './description-r10Hlsjc.mjs';
const i = {
    path: [`/zh/:type?`, `/ff14_zh/:type?`],
    categories: [`game`],
    example: `/ff14/zh/news`,
    parameters: { type: '分类名，预设为 `all`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ff.web.sdo.com/web8/index.html`], target: `/zh` }],
    name: `最终幻想 14 国服`,
    maintainers: [`Kiotlin`, `ZeroClad`, `15x15G`],
    handler: a,
    url: `ff.web.sdo.com/web8/index.html`,
    description: `| 新闻 | 公告     | 活动   | 广告      | 所有 |
| ---- | -------- | ------ | --------- | ---- |
| news | announce | events | advertise | all  |`,
};
async function a(i) {
    let a = `https://ff.sdo.com/web8/index.html`,
        o = (
            await t({
                method: `get`,
                url: `http://api.act.sdo.com/UnionNews/List?gameCode=ff&category=${{ news: `5310`, announce: `5312`, events: `5311`, advertise: `5313`, all: `5310,5312,5311,5313,5309` }[i.req.param(`type`) ?? `all`]}&pageIndex=0&pageSize=50`,
                headers: { Referer: a },
            })
        ).data.Data;
    return {
        title: `最终幻想14（国服）新闻中心`,
        link: a + `#/newstab/newslist`,
        description: `《最终幻想14》是史克威尔艾尼克斯出品的全球经典游戏品牌FINAL FANTASY系列的最新作品，IGN获得9.2高分！全球累计用户突破1600万！`,
        item: o.map(({ Title: t, Summary: i, Author: a, PublishDate: o, HomeImagePath: s, Id: c }) => ({
            title: t,
            link: a || `https://ff.web.sdo.com/web8/index.html#/newstab/newscont/${c}`,
            description: r({ image: s, description: i }),
            pubDate: n(e(o), 8),
        })),
    };
}
export { i as route };
