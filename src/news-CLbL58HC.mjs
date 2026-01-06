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
    path: `/:category?`,
    categories: [`traditional-media`],
    example: `/yomiuri/news`,
    parameters: { category: 'Category, `news` by default' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.yomiuri.co.jp/:category?`] }],
    name: `News`,
    maintainers: [`Arracc`],
    handler: o,
    description: `Free articles only.

| Category       | Parameter |
| -------------- | --------- |
| 新着・速報     | news      |
| 社会           | national  |
| 政治           | politics  |
| 経済           | economy   |
| スポーツ       | sports    |
| 国際           | world     |
| 地域           | local     |
| 科学・ＩＴ     | science   |
| エンタメ・文化 | culture   |
| ライフ         | life      |
| 医療・健康     | medical   |
| 教育・就活     | kyoiku    |
| 選挙・世論調査 | election  |
| 囲碁・将棋     | igoshougi |
| 社説           | editorial |
| 皇室           | koushitsu |`,
};
async function o(a) {
    let { category: o = `news` } = a.req.param(),
        s = `https://www.yomiuri.co.jp/${o}`,
        c = (await n(s)).data,
        l = i(c),
        u;
    o === `news`
        ? (u = l(`.news-top-latest__list .news-top-latest__list-item__inner`)
              .toArray()
              .map((e) => {
                  e = l(e);
                  let n = e.find(`h3 a`);
                  return { title: n.text(), link: n.attr(`href`), pubDate: r(t(e.find(`time`).attr(`datetime`)), 9), locked: e.find(`.icon-locked`).length };
              }))
        : (l(`.p-category-reading-recommend`).remove(),
          (u = l(`.layout-contents__main .c-list-title`)
              .toArray()
              .map((e) => {
                  e = l(e);
                  let n = e.find(`h3 a`),
                      i = e.parent();
                  return { title: n.text(), link: n.attr(`href`), pubDate: r(t(i.find(`time`).attr(`datetime`)), 9), locked: i.find(`.c-list-member-only`).length };
              })));
    let d = await Promise.all(
        u.map((r) =>
            e.tryGet(r.link, async () => {
                if (r.locked) return r;
                let e = i((await n(r.link)).data),
                    a = e(`.p-main-contents`);
                (a.find(`[class^=ev-article], svg`).remove(),
                    a.find(`img`).each((e, t) => {
                        t.attribs.src = t.attribs.src.split(`?`)[0];
                    }),
                    (r.description = a.html()),
                    (r.pubDate = t(e(`meta[property="article:published_time"]`).attr(`content`))),
                    (r.updated = t(e(`meta[property="article:modified_time"]`).attr(`content`))));
                let o = e(`.p-header-category-breadcrumbs li a`).last().text();
                return ((r.category = o), (r.title = `[${o}] ${r.title}`), r);
            })
        )
    );
    return { title: l(`head title`).text(), link: s, image: `https://www.yomiuri.co.jp/apple-touch-icon.png`, item: d };
}
export { a as route };
