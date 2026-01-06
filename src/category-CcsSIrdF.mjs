import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
const t = {
    path: `/weread/:category`,
    categories: [`new-media`],
    example: `/qq/weread/newbook`,
    parameters: { category: `榜单名，见下表` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `微信读书榜单`,
    maintainers: [`gogo-100`],
    handler: n,
    description: `| 榜单                  | 榜单名     |
| ---------------------- | ---------- |
| Top50飙升榜           | rising     |
| Top50热搜榜           | hot_search |
| Top50新书榜           | newbook    |
| Top50小说榜           | general_novel_rising |
| Top200总榜            | all        |
| 神作榜                 | newrating_publish |
| 神作潜力榜            | newrating_potential_publish |
| 精品小说              | 100000     |
| 历史                  | 200000     |
| 文学                  | 300000     |
| 艺术                  | 400000     |
| 人物传记              | 500000     |
| 哲学宗教              | 600000     |
| 计算机                | 700000     |
| 心理                  | 800000     |
| 社会文化              | 900000     |
| 个人成长              | 1000000    |
| 经济理财              | 1100000    |
| 政治军事              | 1200000    |
| 童书                  | 1300000    |
| 教育学习              | 1400000    |
| 科学技术              | 1500000    |
| 生活百科              | 1600000    |
| 期刊杂志              | 1700000    |
| 原版书                | 1800000    |
| 男生小说              | 1900000    |
| 女生小说              | 2000000    |
| 医学健康              | 2100000    |

还可以分得更细 见 https://weread.qq.com/web/category/100000 的小标题栏
`,
};
async function n(t) {
    let n = t.req.param(`category`),
        i = /^\d+$/.test(n) ? 0 : 1,
        a = n === `all` ? 180 : 40,
        o = Array.from({ length: Math.ceil((a + 1) / 20) }, (e, t) => `https://weread.qq.com/web/bookListInCategory/${n}?maxIndex=${t * 20}&rank=${i}`),
        s = (await Promise.all(o.map((t) => e(t)))).flatMap((e) =>
            e.books.map((e) => {
                let t = e.bookInfo;
                return { title: t.title, description: `推荐值 ${t.newRating / 10}% ${t.newRatingDetail.title}|| ` + t.intro, author: t.author, guid: t.bookId, itunes_item_image: t.cover };
            })
        );
    return { title: `微信读书 - ` + (r[n] || `书籍列表`), link: `https://weread.qq.com/web/category/${n}`, item: s };
}
const r = {
    rising: `Top50飙升榜`,
    hot_search: `Top50热搜榜`,
    newbook: `Top50新书榜`,
    general_novel_rising: `Top50小说榜`,
    all: `Top200总榜`,
    newrating_publish: `神作榜`,
    newrating_potential_publish: `神作潜力榜`,
    1e5: `精品小说`,
    2e5: `历史`,
    3e5: `文学`,
    4e5: `艺术`,
    5e5: `人物传记`,
    6e5: `哲学宗教`,
    7e5: `计算机`,
    8e5: `心理`,
    9e5: `社会文化`,
    1e6: `个人成长`,
    11e5: `经济理财`,
    12e5: `政治军事`,
    13e5: `童书`,
    14e5: `教育学习`,
    15e5: `科学技术`,
    16e5: `生活百科`,
    17e5: `期刊杂志`,
    18e5: `原版书`,
    19e5: `男生小说`,
    2e6: `女生小说`,
    21e5: `医学健康`,
};
export { t as route };
