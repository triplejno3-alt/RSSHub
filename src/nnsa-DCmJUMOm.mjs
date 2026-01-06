import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { load as a } from 'cheerio';
const o = async (i) => {
        let { category: o = `ywdt/hjyw` } = i.req.param(),
            s = Number.parseInt(i.req.query(`limit`) ?? `15`, 10),
            c = `https://nnsa.mee.gov.cn`,
            l = new URL(o.endsWith(`/`) ? o : `${o}/`, c).href,
            u = a(await e(l)),
            d = u(`html`).attr(`lang`) ?? `zh`,
            f = [];
        return (
            (f = u(`a.cjcx_biaob, ul#div li a`)
                .slice(0, s)
                .toArray()
                .map((e) => {
                    let t = u(e),
                        n = t.text(),
                        r = t.attr(`href`);
                    return { title: n, link: r ? (r.startsWith(`http`) ? r : new URL(r, c).href) : void 0, language: d };
                })),
            (f = await Promise.all(
                f.map((i) =>
                    i.link
                        ? t.tryGet(i.link, async () => {
                              let t = a(await e(i.link)),
                                  o = t(`meta[name="ArticleTitle"]`).attr(`content`) ?? i.title,
                                  s = t(`div.Custom_UnionStyle`).html() ?? void 0,
                                  c = t(`meta[name="PubDate"]`).attr(`content`),
                                  l = [t(`meta[name="ColumnName"]`), t(`meta[name="ColumnType"]`), t(`meta[name="ContentSource"]`), t(`meta[name="source"]`)],
                                  u = [...new Set(l.map((e) => t(e)?.attr(`content`) ?? ``).filter(Boolean))],
                                  f = [t(`meta[name="Author"]`), t(`meta[name="author"]`), t(`meta[name="source"]`)].filter((e) => t(e).attr(`content`)).map((e) => ({ name: t(e).attr(`content`) ?? `` })),
                                  p = c,
                                  m = { title: o, description: s, pubDate: c ? r(n(c), 8) : i.pubDate, category: u, author: f, content: { html: s, text: s }, updated: p ? r(n(p), 8) : i.updated, language: d };
                              return { ...i, ...m };
                          })
                        : i
                )
            )),
            {
                title: u(`title`).text(),
                description: u(`meta[name="description"]`).attr(`content`),
                link: l,
                item: f,
                allowEmpty: !0,
                image: u(`a.logo img`).attr(`src`) ? new URL(u(`a.logo img`).attr(`src`), c).href : void 0,
                author: u(`meta[name="SiteName"]`).attr(`content`),
                language: d,
                id: l,
            }
        );
    },
    s = {
        path: `/mee/nnsa/:category{.+}?`,
        name: `国家核安全局`,
        url: `nnsa.mee.gov.cn`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/gov/mee/nnsa/ywdt/hjyw`,
        parameters: {
            category: {
                description: '分类，默认为 `ywdt/hjyw`，即环境要闻，可在对应分类页 URL 中找到',
                options: [
                    { label: `要闻动态 - 时政要闻`, value: `ywdt/szyw` },
                    { label: `要闻动态 - 环境要闻`, value: `ywdt/hjyw` },
                    { label: `要闻动态 - 监管动态`, value: `ywdt/gzdt` },
                    { label: `要闻动态 - 行业资讯`, value: `ywdt/hyzx` },
                    { label: `要闻动态 - 国际资讯`, value: `ywdt/gjzx` },
                    { label: `要闻动态 - 公示公告`, value: `ywdt/gsqg` },
                    { label: `要闻动态 - 曝光台`, value: `ywdt/bgt` },
                    { label: `政策文件 - 中央有关文件`, value: `zcwj/zyygwj` },
                    { label: `政策文件 - 国务院有关文件`, value: `zcwj/gwyygwj` },
                    { label: `政策文件 - 部文件`, value: `zcwj/bwj` },
                    { label: `政策文件 - 核安全局文件`, value: `zcwj/haqjwj` },
                    { label: `政策文件 - 其他`, value: `zcwj/qt` },
                    { label: `政策文件 - 解读`, value: `zcwj/jd` },
                    { label: `业务工作 - 核动力厂和研究堆`, value: `ywdh/fyd` },
                    { label: `业务工作 - 核燃料、放废`, value: `ywdh/hrlff` },
                    { label: `业务工作 - 核技术、电磁、矿冶`, value: `ywdh/hjsdcky` },
                    { label: `业务工作 - 监测与应急`, value: `ywdh/jcyj_1` },
                    { label: `业务工作 - 核安全设备与人员`, value: `ywdh/haqsbry` },
                    { label: `业务工作 - 国际合作`, value: `ywdh/gjhz` },
                ],
            },
        },
        description: `:::tip
订阅 [环境要闻](https://nnsa.mee.gov.cn/ywdt/hjyw/)，其源网址为 \`https://nnsa.mee.gov.cn/ywdt/hjyw/\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/gov/mee/nnsa/ywdt/hjyw\`](https://rsshub.app/gov/mee/nnsa/ywdt/hjyw)。
:::

<details>
  <summary>更多分类</summary>

  #### [要闻动态](https://nnsa.mee.gov.cn/ywdt/)

  | 分类                                           | ID                                                     |
  | ---------------------------------------------- | ------------------------------------------------------ |
  | [时政要闻](https://nnsa.mee.gov.cn/ywdt/szyw/) | [ywdt/szyw](https://rsshub.app/gov/mee/nnsa/ywdt/szyw) |
  | [环境要闻](https://nnsa.mee.gov.cn/ywdt/hjyw/) | [ywdt/hjyw](https://rsshub.app/gov/mee/nnsa/ywdt/hjyw) |
  | [监管动态](https://nnsa.mee.gov.cn/ywdt/gzdt/) | [ywdt/gzdt](https://rsshub.app/gov/mee/nnsa/ywdt/gzdt) |
  | [行业资讯](https://nnsa.mee.gov.cn/ywdt/hyzx/) | [ywdt/hyzx](https://rsshub.app/gov/mee/nnsa/ywdt/hyzx) |
  | [国际资讯](https://nnsa.mee.gov.cn/ywdt/gjzx/) | [ywdt/gjzx](https://rsshub.app/gov/mee/nnsa/ywdt/gjzx) |
  | [公示公告](https://nnsa.mee.gov.cn/ywdt/gsqg/) | [ywdt/gsqg](https://rsshub.app/gov/mee/nnsa/ywdt/gsqg) |
  | [曝光台](https://nnsa.mee.gov.cn/ywdt/bgt/)    | [ywdt/bgt](https://rsshub.app/gov/mee/nnsa/ywdt/bgt)   |

  #### [政策文件](https://nnsa.mee.gov.cn/zcwj/)

  | 分类                                                    | ID                                                           |
  | ------------------------------------------------------- | ------------------------------------------------------------ |
  | [中央有关文件](https://nnsa.mee.gov.cn/zcwj/zyygwj/)    | [zcwj/zyygwj](https://rsshub.app/gov/mee/nnsa/zcwj/zyygwj)   |
  | [国务院有关文件](https://nnsa.mee.gov.cn/zcwj/gwyygwj/) | [zcwj/gwyygwj](https://rsshub.app/gov/mee/nnsa/zcwj/gwyygwj) |
  | [部文件](https://nnsa.mee.gov.cn/zcwj/bwj/)             | [zcwj/bwj](https://rsshub.app/gov/mee/nnsa/zcwj/bwj)         |
  | [核安全局文件](https://nnsa.mee.gov.cn/zcwj/haqjwj/)    | [zcwj/haqjwj](https://rsshub.app/gov/mee/nnsa/zcwj/haqjwj)   |
  | [其他](https://nnsa.mee.gov.cn/zcwj/qt/)                | [zcwj/qt](https://rsshub.app/gov/mee/nnsa/zcwj/qt)           |
  | [解读](https://nnsa.mee.gov.cn/zcwj/jd/)                | [zcwj/jd](https://rsshub.app/gov/mee/nnsa/zcwj/jd)           |

  #### [业务工作](https://nnsa.mee.gov.cn/ywdh/)

  | 分类                                                        | ID                                                           |
  | ----------------------------------------------------------- | ------------------------------------------------------------ |
  | [核动力厂和研究堆](https://nnsa.mee.gov.cn/ywdh/fyd/)       | [ywdh/fyd](https://rsshub.app/gov/mee/nnsa/ywdh/fyd)         |
  | [核燃料、放废](https://nnsa.mee.gov.cn/ywdh/hrlff/)         | [ywdh/hrlff](https://rsshub.app/gov/mee/nnsa/ywdh/hrlff)     |
  | [核技术、电磁、矿冶](https://nnsa.mee.gov.cn/ywdh/hjsdcky/) | [ywdh/hjsdcky](https://rsshub.app/gov/mee/nnsa/ywdh/hjsdcky) |
  | [监测与应急](https://nnsa.mee.gov.cn/ywdh/jcyj_1/)          | [ywdh/jcyj_1](https://rsshub.app/gov/mee/nnsa/ywdh/jcyj_1)   |
  | [核安全设备与人员](https://nnsa.mee.gov.cn/ywdh/haqsbry/)   | [ywdh/haqsbry](https://rsshub.app/gov/mee/nnsa/ywdh/haqsbry) |
  | [国际合作](https://nnsa.mee.gov.cn/ywdh/gjhz/)              | [ywdh/gjhz](https://rsshub.app/gov/mee/nnsa/ywdh/gjhz)       |

</details>
`,
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`nnsa.mee.gov.cn/:category`], target: `/mee/nnsa/:category` },
            { title: `要闻动态 - 时政要闻`, source: [`nnsa.mee.gov.cn/ywdt/szyw/`], target: `/mee/nnsa/ywdt/szyw` },
            { title: `要闻动态 - 环境要闻`, source: [`nnsa.mee.gov.cn/ywdt/hjyw/`], target: `/mee/nnsa/ywdt/hjyw` },
            { title: `要闻动态 - 监管动态`, source: [`nnsa.mee.gov.cn/ywdt/gzdt/`], target: `/mee/nnsa/ywdt/gzdt` },
            { title: `要闻动态 - 行业资讯`, source: [`nnsa.mee.gov.cn/ywdt/hyzx/`], target: `/mee/nnsa/ywdt/hyzx` },
            { title: `要闻动态 - 国际资讯`, source: [`nnsa.mee.gov.cn/ywdt/gjzx/`], target: `/mee/nnsa/ywdt/gjzx` },
            { title: `要闻动态 - 公示公告`, source: [`nnsa.mee.gov.cn/ywdt/gsqg/`], target: `/mee/nnsa/ywdt/gsqg` },
            { title: `要闻动态 - 曝光台`, source: [`nnsa.mee.gov.cn/ywdt/bgt/`], target: `/mee/nnsa/ywdt/bgt` },
            { title: `政策文件 - 中央有关文件`, source: [`nnsa.mee.gov.cn/zcwj/zyygwj/`], target: `/mee/nnsa/zcwj/zyygwj` },
            { title: `政策文件 - 国务院有关文件`, source: [`nnsa.mee.gov.cn/zcwj/gwyygwj/`], target: `/mee/nnsa/zcwj/gwyygwj` },
            { title: `政策文件 - 部文件`, source: [`nnsa.mee.gov.cn/zcwj/bwj/`], target: `/mee/nnsa/zcwj/bwj` },
            { title: `政策文件 - 核安全局文件`, source: [`nnsa.mee.gov.cn/zcwj/haqjwj/`], target: `/mee/nnsa/zcwj/haqjwj` },
            { title: `政策文件 - 其他`, source: [`nnsa.mee.gov.cn/zcwj/qt/`], target: `/mee/nnsa/zcwj/qt` },
            { title: `政策文件 - 解读`, source: [`nnsa.mee.gov.cn/zcwj/jd/`], target: `/mee/nnsa/zcwj/jd` },
            { title: `业务工作 - 核动力厂和研究堆`, source: [`nnsa.mee.gov.cn/ywdh/fyd/`], target: `/mee/nnsa/ywdh/fyd` },
            { title: `业务工作 - 核燃料、放废`, source: [`nnsa.mee.gov.cn/ywdh/hrlff/`], target: `/mee/nnsa/ywdh/hrlff` },
            { title: `业务工作 - 核技术、电磁、矿冶`, source: [`nnsa.mee.gov.cn/ywdh/hjsdcky/`], target: `/mee/nnsa/ywdh/hjsdcky` },
            { title: `业务工作 - 监测与应急`, source: [`nnsa.mee.gov.cn/ywdh/jcyj_1/`], target: `/mee/nnsa/ywdh/jcyj_1` },
            { title: `业务工作 - 核安全设备与人员`, source: [`nnsa.mee.gov.cn/ywdh/haqsbry/`], target: `/mee/nnsa/ywdh/haqsbry` },
            { title: `业务工作 - 国际合作`, source: [`nnsa.mee.gov.cn/ywdh/gjhz/`], target: `/mee/nnsa/ywdh/gjhz` },
        ],
        view: i.Articles,
    };
export { o as handler, s as route };
