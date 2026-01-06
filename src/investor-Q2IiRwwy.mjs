import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { load as i } from 'cheerio';
const a = async (r) => {
        let { id: a = `home/zxdt` } = r.req.param(),
            o = Number.parseInt(r.req.query(`limit`) ?? `20`, 10),
            s = `https://www.investor.org.cn`,
            c = new URL(a.endsWith(`/`) ? a : `${a}/`, s).href,
            l = i(await e(c)),
            u = l(`html`).attr(`lang`) ?? `zh`,
            d = [];
        ((d = l(`div.right_content_item a`)
            .slice(0, o)
            .toArray()
            .map((e) => {
                let t = l(e),
                    r = t.find(`div.title`).text(),
                    i = t.find(`div.date`).text(),
                    a = t.attr(`href`),
                    o = i;
                return { title: r, pubDate: i ? n(i) : void 0, link: a ? new URL(a, c).href : void 0, updated: o ? n(o) : void 0, language: u };
            })),
            (d = await Promise.all(
                d.map((r) =>
                    !r.link || r.link.endsWith(`.pdf`)
                        ? r
                        : t.tryGet(r.link, async () => {
                              let t = i(await e(r.link)),
                                  a = t(`div.text_content_detail_title h1`).text() ?? r.title,
                                  o = t(`div.trs_editor_view`).html() ?? void 0,
                                  s = t(`div.base_info_left span`)
                                      .toArray()
                                      .some((e) => t(e).text().includes(`时间`))
                                      ? t(
                                            t(`div.base_info_left span`)
                                                .toArray()
                                                .find((e) => t(e).text().includes(`时间`))
                                        )
                                            .text()
                                            .split(/：/)
                                            .pop()
                                            ?.trim()
                                      : void 0,
                                  c = s,
                                  l = { title: a, description: o, pubDate: s ? n(s) : r.pubDate, content: { html: o, text: o }, updated: c ? n(c) : r.updated, language: u };
                              return { ...r, ...l };
                          })
                )
            )));
        let f = l(`title`).text();
        return {
            title: f,
            description: f.split(/\|/)?.[0],
            link: c,
            item: d,
            allowEmpty: !0,
            image: l(`div.fl a img`).attr(`src`) ? new URL(l(`div.fl a img`).attr(`src`), s).href : void 0,
            author: f.split(/\|/).pop(),
            language: u,
            id: c,
        };
    },
    o = {
        path: `/:id{.+}?`,
        name: `栏目`,
        url: `www.investor.org.cn`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/investor/home/zxdt`,
        parameters: {
            id: {
                description: '分类，默认为 `home/zxdt`，即最新动态，可在对应栏目页 URL 中找到',
                options: [
                    { label: `最新动态`, value: `home/zxdt` },
                    { label: `政策资讯 - 政策资讯`, value: `zczx` },
                    { label: `政策资讯 - 权威资讯`, value: `zczx/qwzx` },
                    { label: `政策资讯 - 证监会发布`, value: `zczx/qwzx/zjhfb` },
                    { label: `政策资讯 - 证券交易所发布`, value: `zczx/qwzx/hsjysfb` },
                    { label: `政策资讯 - 期货交易所发布`, value: `zczx/qwzx/qhjysfb_1` },
                    { label: `政策资讯 - 协会发布`, value: `zczx/qwzx/hyxhfb` },
                    { label: `政策资讯 - 市场资讯`, value: `zczx/market_news` },
                    { label: `政策资讯 - 政策解读`, value: `zczx/policy_interpretation` },
                    { label: `政策资讯 - 法律法规`, value: `zczx/flfg` },
                    { label: `政策资讯 - 法律`, value: `zczx/flfg/fljsfjs` },
                    { label: `政策资讯 - 行政法规及司法解释`, value: `zczx/flfg/xzfg` },
                    { label: `政策资讯 - 部门规章及规范性文件`, value: `zczx/flfg/bmgz` },
                    { label: `政策资讯 - 投服中心业务规则`, value: `zczx/flfg/tfzxzd` },
                    { label: `政策资讯 - 工作交流`, value: `zczx/gzjl` },
                    { label: `投保动态 - 投保动态`, value: `qybh` },
                    { label: `投保动态 - 持股行权`, value: `qybh/cgxq` },
                    { label: `投保动态 - 行权动态`, value: `qybh/cgxq/xqdt` },
                    { label: `投保动态 - 个案行权`, value: `qybh/cgxq/gaxq` },
                    { label: `投保动态 - 典型案例`, value: `qybh/cgxq/xqal` },
                    { label: `投保动态 - 维权诉讼`, value: `qybh/wqfw` },
                    { label: `投保动态 - 投服中心维权`, value: `qybh/wqfw/tfzxwq` },
                    { label: `投保动态 - 维权路径与机构`, value: `qybh/wqfw/wqljyjg` },
                    { label: `投保动态 - 纠纷调解`, value: `qybh/tjfw` },
                    { label: `投保动态 - 调解动态`, value: `qybh/tjfw/tjdt` },
                    { label: `投保动态 - 调解组织`, value: `qybh/tjfw/tjzz` },
                    { label: `投保动态 - 调解案例`, value: `qybh/tjfw/tjal` },
                ],
            },
        },
        description: `::: tip
订阅 [最新动态](https://www.investor.org.cn/home/zxdt/)，其源网址为 \`https://www.investor.org.cn/home/zxdt/\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/investor/home/zxdt\`](https://rsshub.app/investor/home/zxdt)。
:::

<details>
  <summary>更多分类</summary>

  #### [政策资讯](https://www.investor.org.cn/zczx/)

  | 栏目                                                                | ID                                                                                   |
  | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
  | [政策资讯](https://www.investor.org.cn/zczx/)                       | [zczx](https://rsshub.app/investor/zczx)                                             |
  | [权威资讯](https://www.investor.org.cn/zczx/qwzx/)                  | [zczx/qwzx](https://rsshub.app/investor/zczx/qwzx)                                   |
  | [证监会发布](https://www.investor.org.cn/zczx/qwzx/zjhfb/)          | [zczx/qwzx/zjhfb](https://rsshub.app/investor/zczx/qwzx/zjhfb)                       |
  | [证券交易所发布](https://www.investor.org.cn/zczx/qwzx/hsjysfb/)    | [zczx/qwzx/hsjysfb](https://rsshub.app/investor/zczx/qwzx/hsjysfb)                   |
  | [期货交易所发布](https://www.investor.org.cn/zczx/qwzx/qhjysfb_1/)  | [zczx/qwzx/qhjysfb_1](https://rsshub.app/investor/zczx/qwzx/qhjysfb_1)               |
  | [协会发布](https://www.investor.org.cn/zczx/qwzx/hyxhfb/)           | [zczx/qwzx/hyxhfb](https://rsshub.app/investor/zczx/qwzx/hyxhfb)                     |
  | [市场资讯](https://www.investor.org.cn/zczx/market_news/)           | [zczx/market_news](https://rsshub.app/investor/zczx/market_news)                     |
  | [政策解读](https://www.investor.org.cn/zczx/policy_interpretation/) | [zczx/policy_interpretation](https://rsshub.app/investor/zczx/policy_interpretation) |
  | [法律法规](https://www.investor.org.cn/zczx/flfg/)                  | [zczx/flfg](https://rsshub.app/investor/zczx/flfg)                                   |
  | [法律](https://www.investor.org.cn/zczx/flfg/fljsfjs/)              | [zczx/flfg/fljsfjs](https://rsshub.app/investor/zczx/flfg/fljsfjs)                   |
  | [行政法规及司法解释](https://www.investor.org.cn/zczx/flfg/xzfg/)   | [zczx/flfg/xzfg](https://rsshub.app/investor/zczx/flfg/xzfg)                         |
  | [部门规章及规范性文件](https://www.investor.org.cn/zczx/flfg/bmgz/) | [zczx/flfg/bmgz](https://rsshub.app/investor/zczx/flfg/bmgz)                         |
  | [投服中心业务规则](https://www.investor.org.cn/zczx/flfg/tfzxzd/)   | [zczx/flfg/tfzxzd](https://rsshub.app/investor/zczx/flfg/tfzxzd)                     |
  | [工作交流](https://www.investor.org.cn/zczx/gzjl/)                  | [zczx/gzjl](https://rsshub.app/investor/zczx/gzjl)                                   |

  #### [投保动态](https://www.investor.org.cn/qybh/)

  | 栏目                                                             | ID                                                                 |
  | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
  | [投保动态](https://www.investor.org.cn/qybh/)                    | [qybh](https://rsshub.app/investor/qybh)                           |
  | [持股行权](https://www.investor.org.cn/qybh/cgxq/)               | [qybh/cgxq](https://rsshub.app/investor/qybh/cgxq)                 |
  | [行权动态](https://www.investor.org.cn/qybh/cgxq/xqdt/)          | [qybh/cgxq/xqdt](https://rsshub.app/investor/qybh/cgxq/xqdt)       |
  | [个案行权](https://www.investor.org.cn/qybh/cgxq/gaxq/)          | [qybh/cgxq/gaxq](https://rsshub.app/investor/qybh/cgxq/gaxq)       |
  | [典型案例](https://www.investor.org.cn/qybh/cgxq/xqal/)          | [qybh/cgxq/xqal](https://rsshub.app/investor/qybh/cgxq/xqal)       |
  | [维权诉讼](https://www.investor.org.cn/qybh/wqfw/)               | [qybh/wqfw](https://rsshub.app/investor/qybh/wqfw)                 |
  | [投服中心维权](https://www.investor.org.cn/qybh/wqfw/tfzxwq/)    | [qybh/wqfw/tfzxwq](https://rsshub.app/investor/qybh/wqfw/tfzxwq)   |
  | [维权路径与机构](https://www.investor.org.cn/qybh/wqfw/wqljyjg/) | [qybh/wqfw/wqljyjg](https://rsshub.app/investor/qybh/wqfw/wqljyjg) |
  | [纠纷调解](https://www.investor.org.cn/qybh/tjfw/)               | [qybh/tjfw](https://rsshub.app/investor/qybh/tjfw)                 |
  | [调解动态](https://www.investor.org.cn/qybh/tjfw/tjdt/)          | [qybh/tjfw/tjdt](https://rsshub.app/investor/qybh/tjfw/tjdt)       |
  | [调解组织](https://www.investor.org.cn/qybh/tjfw/tjzz/)          | [qybh/tjfw/tjzz](https://rsshub.app/investor/qybh/tjfw/tjzz)       |
  | [调解案例](https://www.investor.org.cn/qybh/tjfw/tjal/)          | [qybh/tjfw/tjal](https://rsshub.app/investor/qybh/tjfw/tjal)       |

</details>
`,
        categories: [`finance`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { source: [`www.investor.org.cn/:id`], target: `/:id` },
            { title: `最新动态`, source: [`https://www.investor.org.cn/home/zxdt/`], target: `/home/zxdt` },
            { title: `政策资讯 - 政策资讯`, source: [`www.investor.org.cn/zczx/`], target: `/zczx` },
            { title: `政策资讯 - 权威资讯`, source: [`www.investor.org.cn/zczx/qwzx/`], target: `/zczx/qwzx` },
            { title: `政策资讯 - 证监会发布`, source: [`www.investor.org.cn/zczx/qwzx/zjhfb/`], target: `/zczx/qwzx/zjhfb` },
            { title: `政策资讯 - 证券交易所发布`, source: [`www.investor.org.cn/zczx/qwzx/hsjysfb/`], target: `/zczx/qwzx/hsjysfb` },
            { title: `政策资讯 - 期货交易所发布`, source: [`www.investor.org.cn/zczx/qwzx/qhjysfb_1/`], target: `/zczx/qwzx/qhjysfb_1` },
            { title: `政策资讯 - 协会发布`, source: [`www.investor.org.cn/zczx/qwzx/hyxhfb/`], target: `/zczx/qwzx/hyxhfb` },
            { title: `政策资讯 - 市场资讯`, source: [`www.investor.org.cn/zczx/market_news/`], target: `/zczx/market_news` },
            { title: `政策资讯 - 政策解读`, source: [`www.investor.org.cn/zczx/policy_interpretation/`], target: `/zczx/policy_interpretation` },
            { title: `政策资讯 - 法律法规`, source: [`www.investor.org.cn/zczx/flfg/`], target: `/zczx/flfg` },
            { title: `政策资讯 - 法律`, source: [`www.investor.org.cn/zczx/flfg/fljsfjs/`], target: `/zczx/flfg/fljsfjs` },
            { title: `政策资讯 - 行政法规及司法解释`, source: [`www.investor.org.cn/zczx/flfg/xzfg/`], target: `/zczx/flfg/xzfg` },
            { title: `政策资讯 - 部门规章及规范性文件`, source: [`www.investor.org.cn/zczx/flfg/bmgz/`], target: `/zczx/flfg/bmgz` },
            { title: `政策资讯 - 投服中心业务规则`, source: [`www.investor.org.cn/zczx/flfg/tfzxzd/`], target: `/zczx/flfg/tfzxzd` },
            { title: `政策资讯 - 工作交流`, source: [`www.investor.org.cn/zczx/gzjl/`], target: `/zczx/gzjl` },
            { title: `投保动态 - 投保动态`, source: [`www.investor.org.cn/qybh/`], target: `/qybh` },
            { title: `投保动态 - 持股行权`, source: [`www.investor.org.cn/qybh/cgxq/`], target: `/qybh/cgxq` },
            { title: `投保动态 - 行权动态`, source: [`www.investor.org.cn/qybh/cgxq/xqdt/`], target: `/qybh/cgxq/xqdt` },
            { title: `投保动态 - 个案行权`, source: [`www.investor.org.cn/qybh/cgxq/gaxq/`], target: `/qybh/cgxq/gaxq` },
            { title: `投保动态 - 典型案例`, source: [`www.investor.org.cn/qybh/cgxq/xqal/`], target: `/qybh/cgxq/xqal` },
            { title: `投保动态 - 维权诉讼`, source: [`www.investor.org.cn/qybh/wqfw/`], target: `/qybh/wqfw` },
            { title: `投保动态 - 投服中心维权`, source: [`www.investor.org.cn/qybh/wqfw/tfzxwq/`], target: `/qybh/wqfw/tfzxwq` },
            { title: `投保动态 - 维权路径与机构`, source: [`www.investor.org.cn/qybh/wqfw/wqljyjg/`], target: `/qybh/wqfw/wqljyjg` },
            { title: `投保动态 - 纠纷调解`, source: [`www.investor.org.cn/qybh/tjfw/`], target: `/qybh/tjfw` },
            { title: `投保动态 - 调解动态`, source: [`www.investor.org.cn/qybh/tjfw/tjdt/`], target: `/qybh/tjfw/tjdt` },
            { title: `投保动态 - 调解组织`, source: [`www.investor.org.cn/qybh/tjfw/tjzz/`], target: `/qybh/tjfw/tjzz` },
            { title: `投保动态 - 调解案例`, source: [`www.investor.org.cn/qybh/tjfw/tjal/`], target: `/qybh/tjfw/tjal` },
        ],
        view: r.Articles,
    };
export { a as handler, o as route };
