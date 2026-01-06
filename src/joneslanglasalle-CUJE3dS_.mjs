import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, videos: t, intro: n, description: r }) =>
        c(
            o(i, {
                children: [
                    e?.length ? e.map((e) => (!t?.[0]?.src && e?.src ? a(`figure`, { children: e.alt ? a(`img`, { src: e.src, alt: e.alt }) : a(`img`, { src: e.src }) }) : null)) : null,
                    n ? a(`blockquote`, { children: n }) : null,
                    r ? l(r) : null,
                ],
            })
        ),
    d = (e, t) => {
        let n = s(e);
        return (
            n(`div.informationbox`).remove(),
            n(`div.contributors`).remove(),
            n(`*`)
                .not(t.join(`, `))
                .contents()
                .filter((e, t) => t.type === `text`)
                .remove(),
            n(`*`)
                .not(t.join(`, `))
                .filter((e, t) => n(t).children().length === 0)
                .remove(),
            n.html() || ``
        );
    },
    f = async (r) => {
        let { language: i = `zh`, category: a = `trends-and-insights` } = r.req.param(),
            o = Number.parseInt(r.req.query(`limit`) ?? `12`, 10),
            c = `https://www.joneslanglasalle.com.cn`,
            l = new URL(`${i}/${a}`, c).href,
            f = s(await e(l)),
            p = f(`html`).prop(`lang`) ?? `en`,
            m = f(`div.ti-title`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    let t = f(e),
                        r = t.closest(`a`),
                        i = t.text(),
                        a = r.prop(`href`),
                        o = u({ intro: r.find(`p.ti-teaser`).text() }),
                        s = r.find(`div.ti-image-container img`).prop(`src`) ? new URL(r.find(`div.ti-image-container img`).prop(`src`), c).href : void 0;
                    return {
                        title: i,
                        description: o,
                        pubDate: n(r.find(`span.ti-date`).text(), [`MM月DD日`, `MMMM DD`]),
                        link: a ? new URL(a, c).href : void 0,
                        category: [r.find(`span.ti-type`).text()].filter(Boolean),
                        content: { html: o, text: r.find(`p.ti-teaser`).text() },
                        image: s,
                        banner: s,
                        language: p,
                    };
                });
        m = (
            await Promise.all(
                m.map((r) =>
                    !r.link && typeof r.link != `string`
                        ? r
                        : t.tryGet(r.link, async () => {
                              try {
                                  let t = s(await e(r.link)),
                                      i = t(`meta[property="og:title"]`).prop(`content`),
                                      a = t(`meta[property="og:url"]`).prop(`content`),
                                      o = t(`meta[property="og:image"]`).prop(`content`),
                                      l = n(t(`div.publicationdate`).text().trim(), [`YYYY 年MM 月DD 日`, `MMMM DD, YYYY`]),
                                      f = t(`div.contributors ul li`)
                                          .toArray()
                                          .map((e) => ({ name: t(e).text() })),
                                      m = {};
                                  t(`picture`).each((e, n) => {
                                      let r = t(n),
                                          i = r.find(`source`).last().prop(`srcset`) ? new URL(r.find(`source`).last().prop(`srcset`), c).href : void 0;
                                      if (i) {
                                          r.replaceWith(u({ images: [{ src: i }] }));
                                          let e = i.split(/\./).pop();
                                          e && (m[e] = { url: i });
                                      }
                                  });
                                  let h = t(`div.related-content a.content-card`)
                                          .toArray()
                                          .map((e) => {
                                              let n = t(e);
                                              return { url: new URL(n.prop(`href`), c).href, type: `related`, content_html: n.find(`div.content-card__body`).html() };
                                          })
                                          .filter((e) => !0),
                                      g = u({ description: d(t(`div.page-section`).eq(1).html() ?? t(`div.copy-block`).html() ?? ``, [`div.richtext p`, `h3`, `h4`, `h5`, `h6`, `figure`, `img`, `ul`, `li`, `span`, `b`]) });
                                  return {
                                      title: i,
                                      description: g,
                                      pubDate: l,
                                      category: t(`meta[property="article:tag"]`).prop(`content`).split(/,\s/),
                                      author: f,
                                      guid: a,
                                      id: a,
                                      content: { html: g, text: g },
                                      image: o,
                                      banner: o,
                                      language: p,
                                      media: Object.keys(m).length > 0 ? m : void 0,
                                      _extra: { links: h.length > 0 ? h : void 0 },
                                  };
                              } catch {
                                  return r;
                              }
                          })
                )
            )
        ).filter((e) => !0);
        let h = f(`title`).text(),
            g = f(`img.logo`).prop(`src`) ? new URL(f(`img.logo`).prop(`src`), c).href : void 0;
        return { title: h, description: f(`meta[property="og:description"]`).prop(`content`), link: l, item: m, allowEmpty: !0, image: g, author: h.split(/\|/).pop(), language: p, id: f(`meta[property="og:url"]`).prop(`content`) };
    },
    p = {
        path: `/:language?/:category{.+}?`,
        name: `Trends & Insights`,
        url: `joneslanglasalle.com.cn`,
        maintainers: [`nczitzk`, `pseudoyu`],
        handler: f,
        example: `/joneslanglasalle/en/trends-and-insights`,
        parameters: { language: 'Language, `zh` by default', category: 'Category, `trends-and-insights` by default' },
        description: `::: tip
If you subscribe to [Trends & Insights](https://www.joneslanglasalle.com.cn/en/trends-and-insights)，where the URL is \`https://www.joneslanglasalle.com.cn/en/trends-and-insights\`, extract the part \`https://joneslanglasalle.com.cn/\` to the end. Use \`zh\` and \`trends-and-insights\` as the parameters to fill in. Therefore, the route will be [\`/joneslanglasalle/en/trends-and-insights\`](https://rsshub.app/joneslanglasalle/en/trends-and-insights).
:::

| Category  | ID                            |
| --------- | ----------------------------- |
| Latest    | trends-and-insights           |
| Workplace | trends-and-insights/workplace |
| Investor  | trends-and-insights/investor  |
| Cities    | trends-and-insights/cities    |
| Research  | trends-and-insights/research  |
`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`joneslanglasalle.com.cn/:language/:category`],
                target: (e) => {
                    let t = e.language,
                        n = e.category;
                    return t ? `/${t}${n ? `/${n}` : ``}` : ``;
                },
            },
            { title: `Latest`, source: [`joneslanglasalle.com.cn/en/trends-and-insights`], target: `/en/trends-and-insights` },
            { title: `Workplace`, source: [`joneslanglasalle.com.cn/en/trends-and-insights/workplace`], target: `/en/trends-and-insights/workplace` },
            { title: `Investor`, source: [`joneslanglasalle.com.cn/en/trends-and-insights/investor`], target: `/en/trends-and-insights/investor` },
            { title: `Cities`, source: [`joneslanglasalle.com.cn/en/trends-and-insights/cities`], target: `/en/trends-and-insights/cities` },
            { title: `Research`, source: [`joneslanglasalle.com.cn/en/trends-and-insights/research`], target: `/en/trends-and-insights/research` },
            { title: `房地产趋势与洞察`, source: [`joneslanglasalle.com.cn/zh/trends-and-insights`], target: `/zh/trends-and-insights` },
            { title: `办公空间`, source: [`joneslanglasalle.com.cn/zh/trends-and-insights/workplace`], target: `/zh/trends-and-insights/workplace` },
            { title: `投资者`, source: [`joneslanglasalle.com.cn/zh/trends-and-insights/investor`], target: `/zh/trends-and-insights/investor` },
            { title: `城市`, source: [`joneslanglasalle.com.cn/zh/trends-and-insights/cities`], target: `/zh/trends-and-insights/cities` },
            { title: `研究报告`, source: [`joneslanglasalle.com.cn/zh/trends-and-insights/research`], target: `/zh/trends-and-insights/research` },
        ],
        view: r.Articles,
        zh: {
            path: `/:language?/:category{.+}?`,
            name: `房地产趋势与洞察`,
            url: `joneslanglasalle.com.cn`,
            maintainers: [`nczitzk`],
            handler: f,
            example: `/joneslanglasalle/zh/trends-and-insights`,
            parameters: { language: '语言，默认为 `zh`，可在对应分类页 URL 中找到', category: '分类，默认为 `trends-and-insights`，可在对应分类页 URL 中找到' },
            description:
                '::: tip\n若订阅 [房地产趋势与洞察](https://www.joneslanglasalle.com.cn/zh/trends-and-insights)，网址为 `https://www.joneslanglasalle.com.cn/zh/trends-and-insights`，请截取 `https://joneslanglasalle.com.cn/` 到末尾的部分 `zh` 和 `trends-and-insights` 作为 `language` 和 `category` 参数填入，此时目标路由为 [`/joneslanglasalle/zh/trends-and-insights`](https://rsshub.app/joneslanglasalle/zh/trends-and-insights)。\n:::\n\n| 分类名称   | 分类 ID                       |\n| ---------- | ----------------------------- |\n| 趋势及洞察 | trends-and-insights           |\n| 办公空间   | trends-and-insights/workplace |\n| 投资者     | trends-and-insights/investor  |\n| 城市       | trends-and-insights/cities    |\n| 研究报告   | trends-and-insights/research  |\n',
        },
    };
export { f as handler, p as route };
