import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
const t = {
        path: `/book/latest/:type?`,
        categories: [`social-media`],
        example: `/douban/book/latest/fiction`,
        parameters: { type: '专题分类，可选，默认为 `all`' },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `新书速递`,
        maintainers: [`fengkx`, `lyqluis`],
        description: `| 文学         | 小说    | 历史文化 | 社会纪实  | 科学新知 | 艺术设计 | 商业经管 | 绘本漫画 |
| ------------ | ------- | -------- | --------- | -------- | -------- | -------- | -------- |
| prose_poetry | fiction | history  | biography | science  | art      | business | comics   |`,
        handler: r,
    },
    n = { all: `全部`, prose_poetry: `文学`, fiction: `小说`, history: `历史文化`, biography: `社会纪实`, science: `科学新知`, art: `艺术设计`, business: `商业经管`, comics: `绘本漫画` };
async function r(t) {
    let r = t.req.param(`type`) ?? `all`,
        i = `https://m.douban.com/rexxar/api/v2/subject_collection/${`new_book_${r}`}/items?start=0&count=10&mode=collection&for_mobile=1`,
        a = (await e.get(i)).data.items;
    return {
        title: `豆瓣新书速递${r === `all` ? `` : `-` + n[r]}`,
        link: `https://book.douban.com/latest${r === `all` ? `` : `?subcat=` + n[r]}`,
        item: a.map(({ title: e, url: t, card_subtitle: n, cards: r, pic: i, rating: a, null_rating_reason: o }) => {
            let s = a.value ? `${a.value}分` : o;
            return { title: e, description: `${`<img src="${i.normal}">`}<br>${e}<br><br>${n}<br><br>${r[0]?.content ?? ``}<br><br>${s}`, link: t };
        }),
    };
}
export { t as route };
