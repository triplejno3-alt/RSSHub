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
const d = ({ images: e, description: t }) => s(a, { children: [e?.map((e, t) => (e?.src ? o(`figure`, { children: o(`img`, { src: e.src, alt: e.alt }) }, `${e.src}-${t}`) : null)), t ? o(a, { children: u(t) }) : null] }),
    f = (e) => l(o(d, { ...e })),
    p = async (i) => {
        let { category: a } = i.req.param(),
            o = Number.parseInt(i.req.query(`limit`) ?? `30`, 10),
            s = `http://www.duozhi.com`,
            l = new URL(a && a.endsWith(`/`) ? a : a ? `${a}/` : ``, s).href,
            u = c(await e(l)),
            d = u(`html`).attr(`lang`) ?? `zh`,
            p = [];
        return (
            (p = u(`div.post-item`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    let t = u(e),
                        r = t.find(`a.post-title`),
                        i = r.text(),
                        a = t
                            .find(`a.post-img`)
                            .attr(`style`)
                            ?.match(/url\(['"]?(.*?)['"]?\)?/)?.[1],
                        o = f({ images: a ? [{ src: a, alt: i }] : void 0 }),
                        s = t.find(`div.post-attr`).text().split(/\|/)[0]?.trim(),
                        c = r.attr(`href`),
                        l = t.find(`span.post-tag a.link-tag`).toArray(),
                        p = [...new Set(l.map((e) => u(e).text()).filter(Boolean))],
                        m = t
                            .find(`div.post-attr`)
                            .text()
                            .split(/by/)
                            ?.pop()
                            ?.split(/\s+/)
                            .filter(Boolean)
                            .map((e) => ({ name: e, url: void 0, avatar: void 0 })),
                        h = s;
                    return { title: i, description: o, pubDate: s ? n(s) : void 0, link: c, category: p, author: m, content: { html: o, text: o }, image: a, banner: a, updated: h ? n(h) : void 0, language: d };
                })),
            (p = await Promise.all(
                p.map((i) =>
                    i.link
                        ? t.tryGet(i.link, async () => {
                              let t = c(await e(i.link)),
                                  a = t(`h1.subject-title`).text(),
                                  o = t(`div.subject-banner img`).attr(`src`),
                                  s = f({ images: o ? [{ src: o, alt: a }] : void 0, intro: t(`div.subject-desc`).text(), description: t(`div.subject-content`).html() }),
                                  l = t(`div.subject-meta`).text()?.split(/发布/)[0],
                                  u = [
                                      ...new Set([
                                          ...(i.category ?? []),
                                          ...(t(`meta[name="keywords"]`)
                                              .attr(`content`)
                                              ?.split(`,`)
                                              .map((e) => e.trim()) ?? []),
                                      ]),
                                  ],
                                  p = t(`div.subject-meta`)
                                      .text()
                                      .split(/作者：/)
                                      ?.pop()
                                      ?.split(/\s+/)
                                      .filter(Boolean)
                                      .map((e) => ({ name: e, url: void 0, avatar: void 0 })),
                                  m = l,
                                  h = { title: a, description: s, pubDate: l ? r(n(l), 8) : i.pubDate, category: u, author: p, content: { html: s, text: s }, image: o, banner: o, updated: m ? r(n(m), 8) : i.updated, language: d };
                              return { ...i, ...h };
                          })
                        : i
                )
            )),
            {
                title: u(`title`).text(),
                description: u(`meta[name="description"]`).attr(`content`),
                link: l,
                item: p,
                allowEmpty: !0,
                image: new URL(`static/images/logo.png`, s).href,
                author: u(`meta[property="og:site_name"]`).attr(`content`),
                language: d,
                id: l,
            }
        );
    },
    m = {
        path: `/:category{.+}?`,
        name: `分类`,
        url: `www.duozhi.com`,
        maintainers: [`nczitzk`],
        handler: p,
        example: `/duozhi/industry`,
        parameters: {
            category: {
                description: '分类，默认为 `industry`，即行业，可在对应分类页 URL 中找到',
                options: [
                    { label: `行业`, value: `industry` },
                    { label: `多知商学院`, value: `DBS` },
                    { label: `OpenTalk`, value: `opentalk` },
                    { label: `行业 - 观察`, value: `industry/insight` },
                    { label: `行业 - 早幼教`, value: `industry/preschool` },
                    { label: `行业 - 家庭教育`, value: `industry/jiatingjiaoyu` },
                    { label: `行业 - K12`, value: `industry/K12` },
                    { label: `行业 - 素质教育`, value: `industry/qualityedu` },
                    { label: `行业 - 职教/大学生`, value: `industry/adult` },
                    { label: `行业 - 教育信息化`, value: `industry/EduInformatization` },
                    { label: `行业 - 财报`, value: `industry/earnings` },
                    { label: `行业 - 民办学校`, value: `industry/privateschools` },
                    { label: `行业 - 留学`, value: `industry/overseas` },
                ],
            },
        },
        description: `:::tip
订阅 [行业](http://www.duozhi.com/industry/)，其源网址为 \`http://www.duozhi.com/industry/\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/duozhi/industry\`](http://rsshub.app/duozhi/industry)。
:::

  | [行业](http://www.duozhi.com/industry/)        | [多知商学院](http://www.duozhi.com/DBS/) | [OpenTalk](http://www.duozhi.com/opentalk/)    |
  | ---------------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
  | [industry](https://rsshub.app/duozhi/industry) | [DBS](https://rsshub.app/duozhi/DBS)     | [opentalk](https://rsshub.app/duozhi/opentalk) |

  #### [行业](http://www.duozhi.com/industry/)

  | [观察](http://www.duozhi.com/industry/insight/)                | [早幼教](http://www.duozhi.com/industry/preschool/)                | [家庭教育](http://www.duozhi.com/industry/jiatingjiaoyu/)                  | [K12](http://www.duozhi.com/industry/K12/)             | [素质教育](http://www.duozhi.com/industry/qualityedu/)               |
  | -------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------- |
  | [industry/insight](https://rsshub.app/duozhi/industry/insight) | [industry/preschool](https://rsshub.app/duozhi/industry/preschool) | [industry/jiatingjiaoyu](https://rsshub.app/duozhi/industry/jiatingjiaoyu) | [industry/K12](https://rsshub.app/duozhi/industry/K12) | [industry/qualityedu](https://rsshub.app/duozhi/industry/qualityedu) |

  | [职教/大学生](http://www.duozhi.com/industry/adult/)       | [教育信息化](http://www.duozhi.com/industry/EduInformatization/)                     | [财报](http://www.duozhi.com/industry/earnings/)                 | [民办学校](http://www.duozhi.com/industry/privateschools/)                   | [留学](http://www.duozhi.com/industry/overseas/)                 |
  | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------- |
  | [industry/adult](https://rsshub.app/duozhi/industry/adult) | [industry/EduInformatization](https://rsshub.app/duozhi/industry/EduInformatization) | [industry/earnings](https://rsshub.app/duozhi/industry/earnings) | [industry/privateschools](https://rsshub.app/duozhi/industry/privateschools) | [industry/overseas](https://rsshub.app/duozhi/industry/overseas) |

`,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.duozhi.com/:category`], target: `/:category` },
            { title: `行业`, source: [`www.duozhi.com/industry/`], target: `/industry` },
            { title: `多知商学院`, source: [`www.duozhi.com/DBS/`], target: `/DBS` },
            { title: `OpenTalk`, source: [`www.duozhi.com/opentalk/`], target: `/opentalk` },
            { title: `行业 - 观察`, source: [`www.duozhi.com/industry/insight/`], target: `/industry/insight` },
            { title: `行业 - 早幼教`, source: [`www.duozhi.com/industry/preschool/`], target: `/industry/preschool` },
            { title: `行业 - 家庭教育`, source: [`www.duozhi.com/industry/jiatingjiaoyu/`], target: `/industry/jiatingjiaoyu` },
            { title: `行业 - K12`, source: [`www.duozhi.com/industry/K12/`], target: `/industry/K12` },
            { title: `行业 - 素质教育`, source: [`www.duozhi.com/industry/qualityedu/`], target: `/industry/qualityedu` },
            { title: `行业 - 职教/大学生`, source: [`www.duozhi.com/industry/adult/`], target: `/industry/adult` },
            { title: `行业 - 教育信息化`, source: [`www.duozhi.com/industry/EduInformatization/`], target: `/industry/EduInformatization` },
            { title: `行业 - 财报`, source: [`www.duozhi.com/industry/earnings/`], target: `/industry/earnings` },
            { title: `行业 - 民办学校`, source: [`www.duozhi.com/industry/privateschools/`], target: `/industry/privateschools` },
            { title: `行业 - 留学`, source: [`www.duozhi.com/industry/overseas/`], target: `/industry/overseas` },
        ],
        view: i.Articles,
    };
export { p as handler, m as route };
