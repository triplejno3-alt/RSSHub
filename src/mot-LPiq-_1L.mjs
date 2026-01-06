import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = async (r) => {
        let { category: a = `jiaotongyaowen` } = r.req.param(),
            o = Number.parseInt(r.req.query(`limit`) ?? `30`, 10),
            s = `https://www.mot.gov.cn`,
            c = new URL(a.endsWith(`/`) ? a : `${a}/`, s).href,
            l = i(await e(c)),
            u = l(`html`).attr(`lang`) ?? `zh`,
            d = [];
        return (
            (d = l(`div.tab-pane a`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    let t = l(e),
                        r = t.attr(`title`) ?? t.find(`span`).first().text(),
                        i = t.find(`span.badge`).text(),
                        a = t.attr(`href`),
                        o = t.find(`.time`).text() || i;
                    return { title: r, pubDate: i ? n(i) : void 0, link: a ? (a.startsWith(`http`) ? a : new URL(a, c).href) : void 0, updated: o ? n(o) : void 0, language: u };
                })),
            (d = await Promise.all(
                d.map((r) =>
                    !r.link || !/mot\.gov\.cn/.test(r.link) || !r.link.endsWith(`.html`)
                        ? r
                        : t.tryGet(r.link, async () => {
                              let t = i(await e(r.link)),
                                  a = t(`h1`).first().text(),
                                  o = t(`div.TRS_UEDITOR`).html() ?? void 0,
                                  c = t(`meta[name="PubDate"]`).attr(`content`),
                                  l = [
                                      ...new Set(
                                          [
                                              t(`meta[name="ColumnName"]`).attr(`content`),
                                              t(`meta[name="ColumnType"]`).attr(`content`),
                                              t(`meta[name="ContentSource"]`).attr(`content`),
                                              ...(t(`meta[name="Keywords"]`).attr(`content`)?.split(`;`) ?? []),
                                          ].filter(Boolean)
                                      ),
                                  ],
                                  d = [t(`meta[name="ColumnSource"]`).attr(`content`), t(`meta[name="Author"]`).attr(`content`)].filter(Boolean).map((e) => ({ name: e, url: void 0, avatar: void 0 })),
                                  f = t(`a.navbar-brand img`).attr(`src`) ? new URL(t(`a.navbar-brand img`).attr(`src`), s).href : void 0,
                                  p = c,
                                  m = { title: a, description: o, pubDate: c ? n(c) : r.pubDate, category: l, author: d, content: { html: o, text: o }, image: f, banner: f, updated: p ? n(p) : r.updated, language: u };
                              return { ...r, ...m };
                          })
                )
            )),
            {
                title: l(`title`).text(),
                description: l(`meta[name="ColumnDescription"]`).attr(`content`),
                link: c,
                item: d,
                allowEmpty: !0,
                image: l(`a.navbar-brand img`).attr(`src`) ? new URL(l(`a.navbar-brand img`).attr(`src`), s).href : void 0,
                author: l(`meta[name="SiteName"]`).attr(`content`),
                language: u,
                id: c,
            }
        );
    },
    o = {
        path: `/mot/:category{.+}?`,
        name: `中华人民共和国交通运输部`,
        url: `www.mot.gov.cn`,
        maintainers: [`ladeng07`, `nczitzk`],
        handler: a,
        example: `/gov/mot/jiaotongyaowen`,
        parameters: {
            category: {
                description: '分类，默认为 `jiaotongyaowen`，即交通要闻，可在对应分类页 URL 中找到',
                options: [
                    { label: `交通要闻`, value: `jiaotongyaowen` },
                    { label: `时政要闻`, value: `shizhengyaowen` },
                    { label: `重要会议`, value: `zhongyaohuiyi` },
                ],
            },
        },
        description:
            '::: tip\n若订阅 [重要会议](https://www.mot.gov.cn/zhongyaohuiyi/)，网址为 `https://www.mot.gov.cn/zhongyaohuiyi/`，请截取 `https://www.mot.gov.cn/` 到末尾 `/` 的部分 `zhongyaohuiyi` 作为 `category` 参数填入，此时目标路由为 [`/gov/mot/zhongyaohuiyi`](https://rsshub.app/gov/mot/zhongyaohuiyi)。\n:::',
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.mot.gov.cn/:category`],
                target: (e) => {
                    let t = e.category;
                    return `/mot${t ? `/${t}` : ``}`;
                },
            },
            { title: `交通要闻`, source: [`www.mot.gov.cn/jiaotongyaowen/`], target: `/mot/jiaotongyaowen` },
            { title: `时政要闻`, source: [`www.mot.gov.cn/shizhengyaowen/`], target: `/mot/shizhengyaowen` },
            { title: `重要会议`, source: [`www.mot.gov.cn/zhongyaohuiyi/`], target: `/mot/zhongyaohuiyi` },
        ],
        view: r.Articles,
    };
export { a as handler, o as route };
