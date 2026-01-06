import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { t as a } from './description-BoDJvvso.mjs';
import { load as o } from 'cheerio';
const s = async (i) => {
        let { id: s } = i.req.param(),
            c = Number.parseInt(i.req.query(`limit`) ?? `10`, 10),
            l = `https://www.oschina.net`,
            u = String.raw`https://my\.oschina\.net`,
            d = new URL(`news/column?columnId=${s}`, l).href,
            f = o(await e(d)),
            p = f(`html`).attr(`lang`) ?? `zh-CN`,
            m = [];
        ((m = f(`div.news-item`)
            .slice(0, c)
            .toArray()
            .map((e) => {
                let t = f(e),
                    i = t.find(`div.title`).text(),
                    o = a({ intro: t.find(`div.description p.line-clamp`).text() }),
                    s = t.find(`inddiv.item`).contents().last().text().trim(),
                    c = t.attr(`data-url`),
                    l = t
                        .find(`inddiv.item a`)
                        .toArray()
                        .map((e) => {
                            let t = f(e);
                            return { name: t.text(), url: t.attr(`href`) };
                        }),
                    u = t.find(`img`).attr(`src`),
                    d = s;
                return { title: i, description: o, pubDate: s ? r(n(s), 8) : void 0, link: c, author: l, content: { html: o, text: o }, image: u, banner: u, updated: d ? r(n(d), 8) : void 0, language: p };
            })),
            (m = (
                await Promise.all(
                    m.map((i) =>
                        i.link
                            ? t.tryGet(i.link, async () => {
                                  let t = o(await e(i.link));
                                  t(`.ad-wrap`).remove();
                                  let s = t(`h1.article-box__title`).text(),
                                      c = a({ description: t(`div.content`).html() }),
                                      d = t(`div.article-box__meta div.item-list div.item`)
                                          .toArray()
                                          .find((e) => /\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(t(e).text())),
                                      f = d ? t(d).text() : void 0,
                                      m = t(`val[data-name="shareUrl"]`).attr(`data-value`),
                                      h = [...t(`div.breadcrumb-box a.item`).toArray().slice(0, -1), ...t(`div.article-box__meta div.item-list div.item span.label`).toArray(), ...t(`div.tags-box a.tag-item`).toArray()],
                                      g = [...new Set(h.map((e) => t(e).text()).filter(Boolean))],
                                      _ = t(`div.article-box__meta div.item-list div.item a`)
                                          .toArray()
                                          .filter((e) => (t(e).attr(`href`) ? new RegExp(String.raw`^${u}/u/\d+$`).test(t(e).attr(`href`)) : !1))
                                          .map((e) => {
                                              let n = t(e);
                                              return { name: n.text(), url: n.attr(`href`) };
                                          }),
                                      v = `oschina-${t(`val[data-name="objId"]`).attr(`data-value`)}`,
                                      y = t(`val[data-name="sharePic"]`).attr(`data-value`),
                                      b = t(`meta[property="bytedance:updated_time"]`).attr(`content`) || f,
                                      x = {
                                          title: s,
                                          description: c,
                                          pubDate: f ? r(n(f), 8) : i.pubDate,
                                          link: m ? new URL(m, l).href : i.link,
                                          category: g,
                                          author: _,
                                          guid: v,
                                          id: v,
                                          content: { html: c, text: c },
                                          image: y,
                                          banner: y,
                                          updated: b ? n(b) : i.updated,
                                          language: p,
                                      },
                                      S = t(`div.related-links-box ul.link-list li a`)
                                          .toArray()
                                          .map((e) => {
                                              let n = t(e);
                                              return { url: n.attr(`href`), type: `related`, content_html: n.parent().html() };
                                          })
                                          .filter((e) => !0);
                                  return (S && (x = { ...x, _extra: { links: S } }), { ...i, ...x });
                              })
                            : i
                    )
                )
            ).filter((e) => !0)));
        let h = f(`a.logo`).attr(`title`);
        return {
            title: `${h} - ${f(`div#tabDropdownListOpen a.selected`).text()}`,
            description: f(`meta[name="description"]`).attr(`content`),
            link: d,
            item: m,
            allowEmpty: !0,
            image: f(`a.logo img`).attr(`src`),
            author: h,
            language: p,
            id: f(`val[data-name="weixinShareUrl"]`).attr(`data-value`),
        };
    },
    c = {
        path: `/column/:id`,
        name: `专栏`,
        url: `www.oschina.net`,
        maintainers: [`nczitzk`],
        handler: s,
        example: `/oschina/column/14`,
        parameters: { id: `专栏 id，可在对应专栏页 URL 中找到` },
        description: `::: tip
若订阅 [开源安全专栏](https://www.oschina.net/news/column?columnId=14)，网址为 \`https://www.oschina.net/news/column?columnId=14\`，请截取 \`https://www.oschina.net/news/column?columnId=\` 到末尾的部分 \`14\` 作为 \`id\` 参数填入，此时目标路由为 [\`/oschina/column/14\`](https://rsshub.app/oschina/column/14)。
:::

<details>
<summary>更多专栏</summary>

| 名称            | ID  |
| --------------- | --- |
| 古典主义 Debian | 4   |
| 自由&开源       | 5   |
| 溯源            | 6   |
| 开源先懂协议    | 7   |
| 开源变局        | 8   |
| 创造者说        | 9   |
| 精英主义 BSD    | 10  |
| 苹果有开源      | 11  |
| 开源访谈        | 12  |
| 抱团找组织      | 13  |
| 开源安全        | 14  |
| OSPO            | 15  |
| 创业小辑        | 16  |
| 星推荐          | 17  |
| 单口开源        | 18  |
| 编辑部观察直播  | 19  |
| 开源商业化      | 20  |
| ChatGPT 专题    | 21  |
| 开源新思        | 24  |
| 开源日报        | 25  |
| 大模型思辨      | 26  |
| 家里有个程序员  | 27  |
| 开源漫谈        | 23  |

</details>
`,
        categories: [`programming`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`www.oschina.net`], target: (e, t) => `/oschina/column/${new URL(t).searchParams.get(`id`) ?? void 0}` }],
        view: i.Articles,
    };
export { s as handler, c as route };
