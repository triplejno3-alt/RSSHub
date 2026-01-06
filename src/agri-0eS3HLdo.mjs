import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, intro: t, description: n }) =>
        c(
            o(i, {
                children: [
                    e?.length ? e.map((e) => (e?.src ? a(`figure`, { children: e.alt ? a(`img`, { src: e.src, alt: e.alt }) : a(`img`, { src: e.src }) }) : null)) : null,
                    t ? a(`blockquote`, { children: t }) : null,
                    n ? l(n) : null,
                ],
            })
        ),
    d = async (i) => {
        let { category: a = `zx/zxfb/` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10,
            c = `http://www.agri.cn`,
            l = new URL(a.endsWith(`/`) ? a : `${a}/`, c).href,
            { data: d } = await n(l),
            f = s(d),
            p = f(`html`).prop(`lang`),
            m = f(`div.list_li_con, div.nxw_video_com`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = f(e);
                    let n = e.find(`a`).first(),
                        r = n.text(),
                        i = e.find(`img`).first().prop(`src`) ? new URL(e.find(`img`).first().prop(`src`), c).href : void 0,
                        a = u({ intro: e.find(`p.con_text`).text() || void 0, images: i ? [{ src: i, alt: r }] : void 0 });
                    return {
                        title: r,
                        description: a,
                        pubDate: t(e.find(`span.con_date_span`).text() || `${e.find(`div.com_time_p2`).text().trim()}${e.find(`div.com_time_p1`).text()}`, [`YYYY-MM-DD`, `YYYY.MM.DD`]),
                        link: new URL(n.prop(`href`), l).href,
                        content: { html: a, text: e.find(`p.con_text`).text() || void 0 },
                        image: i,
                        banner: i,
                        language: p,
                    };
                });
        m = await Promise.all(
            m.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = s(e),
                        o = a(`div.detailCon_info_tit`).text().trim(),
                        c = u({ description: a(`div.content_body_box`).html() || void 0 });
                    return (
                        (i.title = o),
                        (i.description = c),
                        (i.pubDate = r(t(a(`meta[name="publishdate"]`).prop(`content`)), 8)),
                        (i.author = a(`meta[name="author"]`).prop(`content`) || a(`meta[name="source"]`).prop(`content`)),
                        (i.content = { html: c, text: a(`div.content_body_box`).text() }),
                        (i.language = p),
                        (i.enclosure_url = a(`div.content_body_box video`).prop(`src`) ?? void 0),
                        (i.enclosure_type = i.enclosure_url ? `video/mp4` : void 0),
                        (i.enclosure_title = i.enclosure_url ? o : void 0),
                        i
                    );
                })
            )
        );
        let h = new URL(f(`div.logo img`).prop(`src`), c).href;
        return { title: f(`title`).text(), link: l, item: m, allowEmpty: !0, image: h, language: p };
    },
    f = {
        path: `/:category{.+}?`,
        name: `分类`,
        url: `www.agri.cn`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/agri/zx/zxfb`,
        parameters: { category: '分类，默认为 `zx/zxfb`，即最新发布，可在对应分类页 URL 中找到' },
        description: `::: tip
  若订阅 [最新发布](http://www.agri.cn/zx/zxfb/)，网址为 \`http://www.agri.cn/zx/zxfb/\`。截取 \`https://www.agri.cn/\` 到末尾的部分 \`zx/zxfb\` 作为参数填入，此时路由为 [\`/agri/zx/zxfb\`](https://rsshub.app/agri/zx/zxfb)。
:::

#### [机构](http://www.agri.cn/jg/)

| 分类                                    | ID                                         |
| --------------------------------------- | ------------------------------------------ |
| [成果展示](http://www.agri.cn/jg/cgzs/) | [jg/cgzs](https://rsshub.app/agri/jg/cgzs) |

#### [资讯](http://www.agri.cn/zx/)

| 分类                                        | ID                                         |
| ------------------------------------------- | ------------------------------------------ |
| [最新发布](http://www.agri.cn/zx/zxfb/)     | [zx/zxfb](https://rsshub.app/agri/zx/zxfb) |
| [农业要闻](http://www.agri.cn/zx/nyyw/)     | [zx/nyyw](https://rsshub.app/agri/zx/nyyw) |
| [中心动态](http://www.agri.cn/zx/zxdt/)     | [zx/zxdt](https://rsshub.app/agri/zx/zxdt) |
| [通知公告](http://www.agri.cn/zx/hxgg/)     | [zx/hxgg](https://rsshub.app/agri/zx/hxgg) |
| [全国信息联播](http://www.agri.cn/zx/xxlb/) | [zx/xxlb](https://rsshub.app/agri/zx/xxlb) |

#### [生产](http://www.agri.cn/sc/)

| 分类                                    | ID                                         |
| --------------------------------------- | ------------------------------------------ |
| [生产动态](http://www.agri.cn/sc/scdt/) | [sc/scdt](https://rsshub.app/agri/sc/scdt) |
| [农业品种](http://www.agri.cn/sc/nypz/) | [sc/nypz](https://rsshub.app/agri/sc/nypz) |
| [农事指导](http://www.agri.cn/sc/nszd/) | [sc/nszd](https://rsshub.app/agri/sc/nszd) |
| [农业气象](http://www.agri.cn/sc/nyqx/) | [sc/nyqx](https://rsshub.app/agri/sc/nyqx) |
| [专项监测](http://www.agri.cn/sc/zxjc/) | [sc/zxjc](https://rsshub.app/agri/sc/zxjc) |

#### [数据](http://www.agri.cn/sj/)

| 分类                                    | ID                                         |
| --------------------------------------- | ------------------------------------------ |
| [市场动态](http://www.agri.cn/sj/scdt/) | [sj/scdt](https://rsshub.app/agri/sj/scdt) |
| [供需形势](http://www.agri.cn/sj/gxxs/) | [sj/gxxs](https://rsshub.app/agri/sj/gxxs) |
| [监测预警](http://www.agri.cn/sj/jcyj/) | [sj/jcyj](https://rsshub.app/agri/sj/jcyj) |

#### [信息化](http://www.agri.cn/xxh/)

| 分类                                           | ID                                               |
| ---------------------------------------------- | ------------------------------------------------ |
| [智慧农业](http://www.agri.cn/xxh/zhny/)       | [xxh/zhny](https://rsshub.app/agri/xxh/zhny)     |
| [信息化标准](http://www.agri.cn/xxh/xxhbz/)    | [xxh/xxhbz](https://rsshub.app/agri/xxh/xxhbz)   |
| [中国乡村资讯](http://www.agri.cn/xxh/zgxczx/) | [xxh/zgxczx](https://rsshub.app/agri/xxh/zgxczx) |

#### [视频](http://www.agri.cn/video/)

| 分类                                               | ID                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| [新闻资讯](http://www.agri.cn/video/xwzx/nyxw/)    | [video/xwzx/nyxw](https://rsshub.app/agri/video/xwzx/nyxw)       |
| [致富天地](http://www.agri.cn/video/zftd/)         | [video/zftd](https://rsshub.app/agri/video/zftd)                 |
| [地方农业](http://www.agri.cn/video/dfny/beijing/) | [video/dfny/beijing](https://rsshub.app/agri/video/dfny/beijing) |
| [气象农业](http://www.agri.cn/video/qxny/)         | [video/qxny](https://rsshub.app/agri/video/qxny)                 |
| [讲座培训](http://www.agri.cn/video/jzpx/)         | [video/jzpx](https://rsshub.app/agri/video/jzpx)                 |
| [文化生活](http://www.agri.cn/video/whsh/)         | [video/whsh](https://rsshub.app/agri/video/whsh)                 |
  `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.agri.cn/:category?`],
                target: (e) => {
                    let t = e.category;
                    return t ? `/${t}` : ``;
                },
            },
            { title: `机构 - 成果展示`, source: [`www.agri.cn/jg/cgzs/`], target: `/jg/cgzs` },
            { title: `资讯 - 最新发布`, source: [`www.agri.cn/zx/zxfb/`], target: `/zx/zxfb` },
            { title: `资讯 - 农业要闻`, source: [`www.agri.cn/zx/nyyw/`], target: `/zx/nyyw` },
            { title: `资讯 - 中心动态`, source: [`www.agri.cn/zx/zxdt/`], target: `/zx/zxdt` },
            { title: `资讯 - 通知公告`, source: [`www.agri.cn/zx/hxgg/`], target: `/zx/hxgg` },
            { title: `资讯 - 全国信息联播`, source: [`www.agri.cn/zx/xxlb/`], target: `/zx/xxlb` },
            { title: `生产 - 生产动态`, source: [`www.agri.cn/sc/scdt/`], target: `/sc/scdt` },
            { title: `生产 - 农业品种`, source: [`www.agri.cn/sc/nypz/`], target: `/sc/nypz` },
            { title: `生产 - 农事指导`, source: [`www.agri.cn/sc/nszd/`], target: `/sc/nszd` },
            { title: `生产 - 农业气象`, source: [`www.agri.cn/sc/nyqx/`], target: `/sc/nyqx` },
            { title: `生产 - 专项监测`, source: [`www.agri.cn/sc/zxjc/`], target: `/sc/zxjc` },
            { title: `数据 - 市场动态`, source: [`www.agri.cn/sj/scdt/`], target: `/sj/scdt` },
            { title: `数据 - 供需形势`, source: [`www.agri.cn/sj/gxxs/`], target: `/sj/gxxs` },
            { title: `数据 - 监测预警`, source: [`www.agri.cn/sj/jcyj/`], target: `/sj/jcyj` },
            { title: `信息化 - 智慧农业`, source: [`www.agri.cn/xxh/zhny/`], target: `/xxh/zhny` },
            { title: `信息化 - 信息化标准`, source: [`www.agri.cn/xxh/xxhbz/`], target: `/xxh/xxhbz` },
            { title: `信息化 - 中国乡村资讯`, source: [`www.agri.cn/xxh/zgxczx/`], target: `/xxh/zgxczx` },
            { title: `视频 - 新闻资讯`, source: [`www.agri.cn/video/xwzx/nyxw/`], target: `/video/xwzx/nyxw` },
            { title: `视频 - 致富天地`, source: [`www.agri.cn/video/zftd/`], target: `/video/zftd` },
            { title: `视频 - 地方农业`, source: [`www.agri.cn/video/dfny/beijing/`], target: `/video/dfny/beijing` },
            { title: `视频 - 气象农业`, source: [`www.agri.cn/video/qxny/`], target: `/video/qxny` },
            { title: `视频 - 讲座培训`, source: [`www.agri.cn/video/jzpx/`], target: `/video/jzpx` },
            { title: `视频 - 文化生活`, source: [`www.agri.cn/video/whsh/`], target: `/video/whsh` },
        ],
    };
export { d as handler, f as route };
