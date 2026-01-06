import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
const a = async (a) => {
        let { bigId: o = `2`, smallId: s = `11` } = a.req.param(),
            c = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 15,
            l = `https://www.cbpanet.com`,
            u = new URL(`dzp_news.aspx?bigid=${o}&smallid=${s}`, l).href,
            { data: d } = await n(u),
            f = i(d),
            p = f(`html`).prop(`lang`),
            m = f(`div.divmore ul li`)
                .slice(0, c)
                .toArray()
                .map((e) => {
                    e = f(e);
                    let n = e.find(`div.zxcont1 a`);
                    return { title: n.text(), pubDate: t(e.find(`div.zxtime1`).text(), `YY/MM/DD`), link: new URL(n.prop(`href`), l).href };
                });
        m = await Promise.all(
            m.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e),
                        s = o(`div.newscont`).html();
                    return (
                        (a.title = o(`div.newstlt`).text()),
                        (a.description = s),
                        (a.pubDate = r(
                            t(
                                o(`div.newstime`)
                                    .text()
                                    .replace(/发布时间:/, ``),
                                `YYYY/M/D HH:mm:ss`
                            ),
                            8
                        )),
                        (a.content = { html: s, text: o(`div.newscont`).text() }),
                        a
                    );
                })
            )
        );
        let h = f(`title`).text(),
            g = new URL(f(`div#logo img`).prop(`src`), l).href;
        return { title: h, description: h.split(/-/).pop(), link: u, item: m, allowEmpty: !0, image: g, author: h.split(/-/)[0], language: p };
    },
    o = {
        path: `/dzp_news/:bigId?/:smallId?`,
        name: `资讯`,
        url: `cbpanet.com`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/cbpanet/dzp_news/2/11`,
        parameters: { bigId: '分类 id，默认为 `2`，即行业资讯，可在对应分类页 URL 中找到', smallId: '子分类 id，默认为 `11`，即行业资讯，可在对应分类页 URL 中找到' },
        description: `::: tip
  若订阅 [行业资讯](https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=11)，网址为 \`https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=11\`。截取 \`https://www.cbpanet.com/\` 的 \`bigid\` 和 \`smallid\` 的部分作为参数填入，此时路由为 [\`/cbpanet/dzp_news/4/15\`](https://rsshub.app/cbpanet/dzp_news/4/15)。
:::

<details>
<summary>更多分类</summary>

#### [协会](https://www.cbpanet.com/dzp_xiehui.aspx)

| [协会介绍](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=1) | [协会章程](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=2) | [理事会](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=3) | [内设机构](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=4) | [协会通知](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=5) | [协会活动](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=6) |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [1/1](https://rsshub.app/cbpanet/dzp_news/1/1)                     | [1/2](https://rsshub.app/cbpanet/dzp_news/1/2)                     | [1/3](https://rsshub.app/cbpanet/dzp_news/1/3)                   | [1/4](https://rsshub.app/cbpanet/dzp_news/1/4)                     | [1/5](https://rsshub.app/cbpanet/dzp_news/1/5)                     | [1/6](https://rsshub.app/cbpanet/dzp_news/1/6)                     |

| [出版物](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=7) | [会员权利与义务](https://www.cbpanet.com/dzp_news.aspx?bigid=1&smallid=30) |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [1/7](https://rsshub.app/cbpanet/dzp_news/1/7)                   | [1/30](https://rsshub.app/cbpanet/dzp_news/1/30)                          |

#### [行业资讯](https://www.cbpanet.com/dzp_news_list.aspx)

| [国内资讯](https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=8) | [海外资讯](https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=9) | [企业新闻](https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=10) | [行业资讯](https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=11) | [热点聚焦](https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=43) | [今日推荐](https://www.cbpanet.com/dzp_news.aspx?bigid=2&smallid=44) |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [2/8](https://rsshub.app/cbpanet/dzp_news/2/8)                     | [2/9](https://rsshub.app/cbpanet/dzp_news/2/9)                     | [2/10](https://rsshub.app/cbpanet/dzp_news/2/10)                    | [2/11](https://rsshub.app/cbpanet/dzp_news/2/11)                    | [2/43](https://rsshub.app/cbpanet/dzp_news/2/43)                    | [2/44](https://rsshub.app/cbpanet/dzp_news/2/44)                    |

#### [原料信息](https://www.cbpanet.com/dzp_yuanliao.aspx)

| [价格行情](https://www.cbpanet.com/dzp_news.aspx?bigid=3&smallid=12) | [分析预测](https://www.cbpanet.com/dzp_news.aspx?bigid=3&smallid=13) | [原料信息](https://www.cbpanet.com/dzp_news.aspx?bigid=3&smallid=40) | [热点聚焦](https://www.cbpanet.com/dzp_news.aspx?bigid=3&smallid=45) |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [3/12](https://rsshub.app/cbpanet/dzp_news/3/12)                    | [3/13](https://rsshub.app/cbpanet/dzp_news/3/13)                    | [3/40](https://rsshub.app/cbpanet/dzp_news/3/40)                    | [3/45](https://rsshub.app/cbpanet/dzp_news/3/45)                    |

#### [法规标准](https://www.cbpanet.com/dzp_fagui.aspx)

| [法规资讯](https://www.cbpanet.com/dzp_news.aspx?bigid=4&smallid=15) | [法律法规](https://www.cbpanet.com/dzp_news.aspx?bigid=4&smallid=16) | [国内标准](https://www.cbpanet.com/dzp_news.aspx?bigid=4&smallid=14) | [国外标准](https://www.cbpanet.com/dzp_news.aspx?bigid=4&smallid=17) | [法规聚焦](https://www.cbpanet.com/dzp_news.aspx?bigid=4&smallid=46) | [今日推荐](https://www.cbpanet.com/dzp_news.aspx?bigid=4&smallid=47) |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [4/15](https://rsshub.app/cbpanet/dzp_news/4/15)                    | [4/16](https://rsshub.app/cbpanet/dzp_news/4/16)                    | [4/14](https://rsshub.app/cbpanet/dzp_news/4/14)                    | [4/17](https://rsshub.app/cbpanet/dzp_news/4/17)                    | [4/46](https://rsshub.app/cbpanet/dzp_news/4/46)                    | [4/47](https://rsshub.app/cbpanet/dzp_news/4/47)                    |

#### [技术专区](https://www.cbpanet.com/dzp_jishu.aspx)

| [产品介绍](https://www.cbpanet.com/dzp_news.aspx?bigid=5&smallid=18) | [科技成果](https://www.cbpanet.com/dzp_news.aspx?bigid=5&smallid=19) | [学术论文](https://www.cbpanet.com/dzp_news.aspx?bigid=5&smallid=20) | [资料下载](https://www.cbpanet.com/dzp_news.aspx?bigid=5&smallid=21) | [专家](https://www.cbpanet.com/dzp_news.aspx?bigid=5&smallid=50) | [民间智库](https://www.cbpanet.com/dzp_news.aspx?bigid=5&smallid=57) |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| [5/18](https://rsshub.app/cbpanet/dzp_news/5/18)                    | [5/19](https://rsshub.app/cbpanet/dzp_news/5/19)                    | [5/20](https://rsshub.app/cbpanet/dzp_news/5/20)                    | [5/21](https://rsshub.app/cbpanet/dzp_news/5/21)                    | [5/50](https://rsshub.app/cbpanet/dzp_news/5/50)                | [5/57](https://rsshub.app/cbpanet/dzp_news/5/57)                    |

#### [豆制品消费指南](https://www.cbpanet.com/dzp_zhinan.aspx)

| [膳食指南](https://www.cbpanet.com/dzp_news.aspx?bigid=6&smallid=22) | [营养成分](https://www.cbpanet.com/dzp_news.aspx?bigid=6&smallid=23) | [豆食菜谱](https://www.cbpanet.com/dzp_news.aspx?bigid=6&smallid=24) | [问与答](https://www.cbpanet.com/dzp_news.aspx?bigid=6&smallid=31) | [今日推荐](https://www.cbpanet.com/dzp_news.aspx?bigid=6&smallid=48) | [消费热点](https://www.cbpanet.com/dzp_news.aspx?bigid=6&smallid=53) |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [6/22](https://rsshub.app/cbpanet/dzp_news/6/22)                    | [6/23](https://rsshub.app/cbpanet/dzp_news/6/23)                    | [6/24](https://rsshub.app/cbpanet/dzp_news/6/24)                    | [6/31](https://rsshub.app/cbpanet/dzp_news/6/31)                  | [6/48](https://rsshub.app/cbpanet/dzp_news/6/48)                    | [6/53](https://rsshub.app/cbpanet/dzp_news/6/53)                    |

#### [营养与健康](https://www.cbpanet.com/dzp_yingyang.aspx)

| [大豆营养概况](https://www.cbpanet.com/dzp_news.aspx?bigid=7&smallid=25) | [大豆食品和人类健康](https://www.cbpanet.com/dzp_news.aspx?bigid=7&smallid=26) | [世界豆类日，爱豆大行动](https://www.cbpanet.com/dzp_news.aspx?bigid=7&smallid=27) | [谣言粉碎机](https://www.cbpanet.com/dzp_news.aspx?bigid=7&smallid=29) | [最新资讯](https://www.cbpanet.com/dzp_news.aspx?bigid=7&smallid=41) | [专家视点](https://www.cbpanet.com/dzp_news.aspx?bigid=7&smallid=49) |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [7/25](https://rsshub.app/cbpanet/dzp_news/7/25)                        | [7/26](https://rsshub.app/cbpanet/dzp_news/7/26)                              | [7/27](https://rsshub.app/cbpanet/dzp_news/7/27)                                  | [7/29](https://rsshub.app/cbpanet/dzp_news/7/29)                      | [7/41](https://rsshub.app/cbpanet/dzp_news/7/41)                    | [7/49](https://rsshub.app/cbpanet/dzp_news/7/49)                    |

</details>
    `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.cbpanet.com/dzp_news.aspx`],
                target: (e, t) => {
                    t = new URL(t);
                    let n = t.searchParams.get(`bigid`),
                        r = t.searchParams.get(`smallid`);
                    return `/dzp_news${n ? `/${n}${r ? `/${r}` : ``}` : ``}`;
                },
            },
            { title: `协会 - 协会介绍`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/1` },
            { title: `协会 - 协会章程`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/2` },
            { title: `协会 - 理事会`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/3` },
            { title: `协会 - 内设机构`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/4` },
            { title: `协会 - 协会通知`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/5` },
            { title: `协会 - 协会活动`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/6` },
            { title: `协会 - 出版物`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/7` },
            { title: `协会 - 会员权利与义务`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/1/30` },
            { title: `行业资讯 - 国内资讯`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/2/8` },
            { title: `行业资讯 - 海外资讯`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/2/9` },
            { title: `行业资讯 - 企业新闻`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/2/10` },
            { title: `行业资讯 - 行业资讯`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/2/11` },
            { title: `行业资讯 - 热点聚焦`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/2/43` },
            { title: `行业资讯 - 今日推荐`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/2/44` },
            { title: `原料信息 - 价格行情`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/3/12` },
            { title: `原料信息 - 分析预测`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/3/13` },
            { title: `原料信息 - 原料信息`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/3/40` },
            { title: `原料信息 - 热点聚焦`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/3/45` },
            { title: `法规标准 - 法规资讯`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/4/15` },
            { title: `法规标准 - 法律法规`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/4/16` },
            { title: `法规标准 - 国内标准`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/4/14` },
            { title: `法规标准 - 国外标准`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/4/17` },
            { title: `法规标准 - 法规聚焦`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/4/46` },
            { title: `法规标准 - 今日推荐`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/4/47` },
            { title: `技术专区 - 产品介绍`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/5/18` },
            { title: `技术专区 - 科技成果`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/5/19` },
            { title: `技术专区 - 学术论文`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/5/20` },
            { title: `技术专区 - 资料下载`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/5/21` },
            { title: `技术专区 - 专家`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/5/50` },
            { title: `技术专区 - 民间智库`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/5/57` },
            { title: `豆制品消费指南 - 膳食指南`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/6/22` },
            { title: `豆制品消费指南 - 营养成分`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/6/23` },
            { title: `豆制品消费指南 - 豆食菜谱`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/6/24` },
            { title: `豆制品消费指南 - 问与答`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/6/31` },
            { title: `豆制品消费指南 - 今日推荐`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/6/48` },
            { title: `豆制品消费指南 - 消费热点`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/6/53` },
            { title: `营养与健康 - 大豆营养概况`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/7/25` },
            { title: `营养与健康 - 大豆食品和人类健康`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/7/26` },
            { title: `营养与健康 - 世界豆类日，爱豆大行动`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/7/27` },
            { title: `营养与健康 - 谣言粉碎机`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/7/29` },
            { title: `营养与健康 - 最新资讯`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/7/41` },
            { title: `营养与健康 - 专家视点`, source: [`www.cbpanet.com/dzp_news.aspx`], target: `/dzp_news/7/49` },
        ],
    };
export { a as handler, o as route };
