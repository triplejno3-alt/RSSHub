import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { load as r } from 'cheerio';
const i = { local: 119, international: 120, entertainment: 500, life: 501, technology: 502, finance: 121 },
    a = { tracker: 123, feature: 124, opinion: 125 },
    o = {
        path: `/news/:category?/:id?`,
        categories: [`traditional-media`],
        example: `/now/news`,
        parameters: { category: `分类，见下表，默认为首页`, id: `编号，可在对应专题/节目页 URL 中找到 topicId` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`news.now.com/home/:category?`, `news.now.com/`], target: `/news/:category?` }],
        name: `新聞`,
        maintainers: [`nczitzk`],
        handler: s,
        url: `news.now.com/`,
        description: `::: tip
  **编号** 仅对事件追蹤、評論節目、新聞專題三个分类起作用，例子如下：

  对于 [事件追蹤](https://news.now.com/home/tracker) 中的 [塔利班奪權](https://news.now.com/home/tracker/detail?catCode=123&topicId=1056) 话题，其网址为 \`https://news.now.com/home/tracker/detail?catCode=123&topicId=1056\`，其中 \`topicId\` 为 1056，则对应路由为 [\`/now/news/tracker/1056\`](https://rsshub.app/now/news/tracker/1056)
:::

| 首頁 | 港聞  | 兩岸國際      | 娛樂          |
| ---- | ----- | ------------- | ------------- |
|      | local | international | entertainment |

| 生活 | 科技       | 財經    | 體育   |
| ---- | ---------- | ------- | ------ |
| life | technology | finance | sports |

| 事件追蹤 | 評論節目 | 新聞專題 |
| -------- | -------- | -------- |
| tracker  | feature  | opinion  |`,
    };
async function s(o) {
    let { category: s = ``, id: c = `` } = o.req.param(),
        l = Number.parseInt(o.req.query(`limit`) || `20`, 10),
        u = c && Object.hasOwn(a, s),
        d = `https://news.now.com`,
        f = u ? `${d}/home/${s}/detail?catCode=${a[s]}&topicId=${c}` : `${d}/home${s ? `/${s}` : ``}`,
        p;
    p = u
        ? f
        : s === `sports`
          ? `https://sportsapi.now.com/api/getNewsList?pageSize=${l}&pageNo=1&searchTagsKey=allSportsSearchTags`
          : s
            ? `https://d3sli7vh0lsda4.cloudfront.net/api/getNewsList?category=${i[s]}&pageNo=1&pageSize=${l}`
            : f;
    let m = await e(p),
        h = typeof m == `object` && Array.isArray(m),
        g = r(m),
        _;
    _ = h
        ? s === `sports`
            ? m.map((e) => {
                  let t = e.newsPhotos
                      ?.filter((e) => e.sizeType === `3`)
                      ?.map((e) => `<img src="${e.imageFileUrl}">`)
                      .join(``);
                  return {
                      title: e.headlineChi,
                      description: t,
                      link: `https://news.now.com/home/${s}/player?newsId=${e.newsId}`,
                      pubDate: n(e.publishDate, `x`),
                      category: [...e.sportTypes.map((e) => e.sportTypeNameChi), ...e.players.map((e) => e.playerFullNameChi), ...e.teams.map((e) => e.teamCodeChi)],
                      image: e.newsPhotos?.find((e) => e.sizeType === `3`)?.imageUrl,
                      newsId: e.newsId,
                  };
              })
            : m.map((e) => {
                  let t = e.image2Url ?? e.imageUrl ?? e.image3Url;
                  return {
                      title: e.title,
                      description: (t ? `<img src="${t}">` : ``) + e.leading + e.summary,
                      link: `https://news.now.com/home/${s}/player?newsId=${e.newsId}`,
                      pubDate: n(e.publishDate, `x`),
                      updated: n(e.lastModifyDate, `x`),
                      category: e.newsTags.map((e) => e.tag),
                      image: t,
                  };
              })
        : g(`${s === `` ? `.homeFeaturedNews ` : `.newsCategoryColLeft `}.newsTitle`)
              .toArray()
              .slice(0, l)
              .map((e) => ((e = g(e)), { title: e.text(), link: `${d}${e.parent().parent().attr(`href`)}` }));
    let v = await Promise.all(
        _.map((i) =>
            t.tryGet(i.link, async () => {
                if (!i.pubDate || i.newsId) {
                    let t = r(await e(i.link)),
                        a = JSON.parse(
                            t(`script:contains("var newsData")`)
                                .text()
                                .match(/var newsData = (.*?);/)?.[1] || `{}`
                        ),
                        o = a.imageList ? a.imageList.map((e) => `<img src="${e.image2Url}">`).join(``) : ``;
                    ((i.description = i.description ? i.description + (t(`.img_caption`).prop(`outerHTML`) ?? ``) + t(`.newsLeading`).html() : o + t(`.newsLeading`).html()),
                        (i.pubDate ||= n(a.publishDate, `x`)),
                        (i.updated ||= n(a.lastModifyDate, `x`)),
                        (i.category ||= [...new Set([a.categoryName, ...a.newsTags.map((e) => e.tag), ...a.newsTopics.map((e) => e.topicName)])]));
                }
                return i;
            })
        )
    );
    return { title: Object.hasOwn(a, s) ? g(`title`).text() : (g(`.smallSpace.active`).text() || `首頁`) + ` | Now 新聞`, link: f, item: v };
}
export { o as route };
