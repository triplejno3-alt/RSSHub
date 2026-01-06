import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { Fragment as a, jsx as o, jsxs as s } from 'hono/jsx/jsx-runtime';
import { load as c } from 'cheerio';
import { renderToString as l } from 'hono/jsx/dom/server';
import { raw as u } from 'hono/html';
const d = ({ images: e, intro: t, description: n }) =>
        l(s(a, { children: [e?.map((e) => (e?.src ? o(`figure`, { children: o(`img`, { src: e.src, alt: e.alt }) }) : null)), t ? o(`blockquote`, { children: t }) : null, n ? u(n) : null] })),
    f = async (i) => {
        let { id: a = `9` } = i.req.param(),
            o = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            s = new URL(`news-${a}-1.html`, `https://dbaplus.cn`).href,
            l = c(await e(s)),
            u = l(`html`).attr(`lang`) ?? `zh`,
            f = [];
        ((f = l(`ul.media-list li.media`)
            .slice(0, o)
            .toArray()
            .map((e) => {
                let t = l(e),
                    r = t.find(`h3.media-heading a`),
                    i = r.text(),
                    a = t.find(`img.media-object`).attr(`src`),
                    o = d({ images: a ? [{ src: a, alt: i }] : void 0, intro: t.find(`div.mt10`).html() }),
                    s = t
                        .find(`span.time`)
                        .text()
                        .replaceAll(/(年|月)/g, `-`)
                        .replace(`日`, ``),
                    c = r.attr(`href`),
                    f = t
                        .find(`span.user`)
                        .toArray()
                        .map((e) => ({ name: l(e).text(), url: void 0, avatar: void 0 })),
                    p = s;
                return { title: i, description: o, pubDate: s ? n(s) : void 0, link: c, author: f, content: { html: o, text: o }, image: a, banner: a, updated: p ? n(p) : void 0, language: u };
            })),
            (f = await Promise.all(
                f.map((i) =>
                    i.link
                        ? t.tryGet(i.link, async () => {
                              let t = c(await e(i.link)),
                                  a = t(`h2.title`).text(),
                                  o = i.description + d({ description: t(`div.new-detailed`).html() }),
                                  s = t(`span.time`).first().text(),
                                  l = t(`meta[name="keywords"]`).attr(`content`)?.split(`,`) ?? [],
                                  f = t(`span.user`)
                                      .toArray()
                                      .map((e) => ({ name: t(e).text(), url: void 0, avatar: void 0 })),
                                  p = s,
                                  m = { title: a, description: o, pubDate: s ? r(n(s), 8) : i.pubDate, category: l, author: f, content: { html: o, text: o }, updated: p ? r(n(p), 8) : i.updated, language: u };
                              return { ...i, ...m };
                          })
                        : i
                )
            )));
        let p = l(`meta[name="description"]`).attr(`content`) ?? ``;
        return { title: l(`title`).text().split(/：/)[0], description: p, link: s, item: f, allowEmpty: !0, image: l(`div.navbar-header img`).attr(`src`), author: p.split(/：/)[0], language: u, id: s };
    },
    p = {
        path: `/news/:id?`,
        name: `资讯`,
        url: `dbaplus.cn`,
        maintainers: [`nczitzk`],
        handler: f,
        example: `/dbaplus/news/9`,
        parameters: {
            category: {
                description: '分类，默认为 `9`，即全部，可在对应分类页 URL 中找到',
                options: [
                    { label: `全部`, value: `9` },
                    { label: `数据库`, value: `153` },
                    { label: `国产数据库`, value: `217` },
                    { label: `ORACLE`, value: `10` },
                    { label: `MySQL`, value: `11` },
                    { label: `SQL优化`, value: `155` },
                    { label: `Newsletter`, value: `156` },
                    { label: `其它`, value: `154` },
                    { label: `运维`, value: `134` },
                    { label: `大数据`, value: `73` },
                    { label: `架构`, value: `141` },
                    { label: `PaaS云`, value: `72` },
                    { label: `职场生涯`, value: `149` },
                    { label: `标准评估`, value: `248` },
                    { label: `这里有毒`, value: `21` },
                    { label: `最新活动`, value: `152` },
                    { label: `往期干货`, value: `148` },
                    { label: `特别策划`, value: `150` },
                    { label: `荐书`, value: `151` },
                ],
            },
        },
        description: `::: tip
订阅 [资讯](https://dbaplus.cn/news-9-1.html)，其源网址为 \`https://dbaplus.cn/news-9-1.html\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/dbaplus/news/9\`](https://rsshub.app/dbaplus/news/9)。
:::

<details>
  <summary>更多分类</summary>

  | [全部](https://dbaplus.cn/news-9-1.html) | [数据库](https://dbaplus.cn/news-153-1.html) | [运维](https://dbaplus.cn/news-134-1.html) | [大数据](https://dbaplus.cn/news-73-1.html) | [架构](https://dbaplus.cn/news-141-1.html) |
  | ---------------------------------------- | -------------------------------------------- | ------------------------------------------ | ------------------------------------------- | ------------------------------------------ |
  | [9](https://rsshub.app/dbaplus/news/9)   | [153](https://rsshub.app/dbaplus/news/153)   | [134](https://rsshub.app/dbaplus/news/134) | [73](https://rsshub.app/dbaplus/news/73)    | [141](https://rsshub.app/dbaplus/news/141) |

  | [PaaS云](https://dbaplus.cn/news-72-1.html) | [职场生涯](https://dbaplus.cn/news-149-1.html) | [标准评估](https://dbaplus.cn/news-248-1.html) | [这里有毒](https://dbaplus.cn/news-21-1.html) |
  | ------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
  | [72](https://rsshub.app/dbaplus/news/72)    | [149](https://rsshub.app/dbaplus/news/149)     | [248](https://rsshub.app/dbaplus/news/248)     | [21](https://rsshub.app/dbaplus/news/21)      |

  #### [数据库](https://dbaplus.cn/news-153-1.html)

  | [国产数据库](https://dbaplus.cn/news-217-1.html) | [ORACLE](https://dbaplus.cn/news-10-1.html) | [MySQL](https://dbaplus.cn/news-11-1.html) | [SQL优化](https://dbaplus.cn/news-155-1.html) | [Newsletter](https://dbaplus.cn/news-156-1.html) |
  | ------------------------------------------------ | ------------------------------------------- | ------------------------------------------ | --------------------------------------------- | ------------------------------------------------ |
  | [217](https://rsshub.app/dbaplus/news/217)       | [10](https://rsshub.app/dbaplus/news/10)    | [11](https://rsshub.app/dbaplus/news/11)   | [155](https://rsshub.app/dbaplus/news/155)    | [156](https://rsshub.app/dbaplus/news/156)       |

  | [其它](https://dbaplus.cn/news-154-1.html) |
  | ------------------------------------------ |
  | [154](https://rsshub.app/dbaplus/news/154) |

  #### [这里有毒](https://dbaplus.cn/news-21-1.html)

  | [最新活动](https://dbaplus.cn/news-152-1.html) | [往期干货](https://dbaplus.cn/news-148-1.html) | [特别策划](https://dbaplus.cn/news-150-1.html) | [荐书](https://dbaplus.cn/news-151-1.html) |
  | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ------------------------------------------ |
  | [152](https://rsshub.app/dbaplus/news/152)     | [148](https://rsshub.app/dbaplus/news/148)     | [150](https://rsshub.app/dbaplus/news/150)     | [151](https://rsshub.app/dbaplus/news/151) |

</details>
`,
        categories: [`programming`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`dbaplus.cn/news*`],
                target: (e, t) => {
                    let n = new URL(t).href.match(/-(\d+)-\.html/)?.[1];
                    return `/dbaplus/news${n ? `/${n}` : ``}`;
                },
            },
            { title: `全部`, source: [`dbaplus.cn/news-9-1.html`], target: `/news/9` },
            { title: `数据库`, source: [`dbaplus.cn/news-153-1.html`], target: `/news/153` },
            { title: `国产数据库`, source: [`dbaplus.cn/news-217-1.html`], target: `/news/217` },
            { title: `ORACLE`, source: [`dbaplus.cn/news-10-1.html`], target: `/news/10` },
            { title: `MySQL`, source: [`dbaplus.cn/news-11-1.html`], target: `/news/11` },
            { title: `SQL优化`, source: [`dbaplus.cn/news-155-1.html`], target: `/news/155` },
            { title: `Newsletter`, source: [`dbaplus.cn/news-156-1.html`], target: `/news/156` },
            { title: `其它`, source: [`dbaplus.cn/news-154-1.html`], target: `/news/154` },
            { title: `运维`, source: [`dbaplus.cn/news-134-1.html`], target: `/news/134` },
            { title: `大数据`, source: [`dbaplus.cn/news-73-1.html`], target: `/news/73` },
            { title: `架构`, source: [`dbaplus.cn/news-141-1.html`], target: `/news/141` },
            { title: `PaaS云`, source: [`dbaplus.cn/news-72-1.html`], target: `/news/72` },
            { title: `职场生涯`, source: [`dbaplus.cn/news-149-1.html`], target: `/news/149` },
            { title: `标准评估`, source: [`dbaplus.cn/news-248-1.html`], target: `/news/248` },
            { title: `这里有毒`, source: [`dbaplus.cn/news-21-1.html`], target: `/news/21` },
            { title: `最新活动`, source: [`dbaplus.cn/news-152-1.html`], target: `/news/152` },
            { title: `往期干货`, source: [`dbaplus.cn/news-148-1.html`], target: `/news/148` },
            { title: `特别策划`, source: [`dbaplus.cn/news-150-1.html`], target: `/news/150` },
            { title: `荐书`, source: [`dbaplus.cn/news-151-1.html`], target: `/news/151` },
        ],
        view: i.Articles,
    };
export { f as handler, p as route };
