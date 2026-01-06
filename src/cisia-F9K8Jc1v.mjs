import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
        let { id: a = `9` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 20,
            s = `http://www.cisia.org`,
            c = new URL(`site/term/${a}.html`, s).href,
            { data: l } = await n(c),
            u = r(l),
            d = u(`ul.list_first li`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = u(e);
                    let n = e.find(`a`);
                    return { title: n.text(), pubDate: t(e.find(`span.time`).text()), link: new URL(n.prop(`href`), s).href };
                });
        d = await Promise.all(
            d.map((i) =>
                e.tryGet(i.link, async () => {
                    if (!/^https?:\/\/www\.cisia\.org(\/[^\s]*)?$/.test(i.link)) return i;
                    let { data: e } = await n(i.link),
                        a = r(e),
                        o = a(`div.TextTitle`).text(),
                        s = a(`div.NewsText`).html(),
                        c = a(`div.shar`)
                            .text()
                            .match(/(\d{4}-\d{2}-\d{2})/)?.[1];
                    return ((i.title = o), (i.description = s), (i.pubDate = c ? t(c) : i.pubDate), (i.author = a(`meta[name="Description"]`).prop(`content`)), (i.content = { html: s, text: a(`div.NewsText`).text() }), i);
                })
            )
        );
        let f = new URL(u(`div.logo img`).prop(`src`), s).href;
        return { title: u(`title`).text(), description: u(`meta[name="Description"]`).prop(`content`), link: c, item: d, allowEmpty: !0, image: f, author: u(`meta[name="Keywords"]`).prop(`content`) };
    },
    a = {
        path: `/:id?`,
        name: `栏目`,
        url: `www.cisia.org`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/cisia/9`,
        parameters: { id: '栏目 id，默认为 `9`，即协会动态，可在对应分类页 URL 中找到' },
        description: `::: tip
  若订阅 [市场信息](http://www.cisia.org/site/term/12.html)，网址为 \`http://www.cisia.org/site/term/12.html\`。截取 \`https://www.cisia.org/site/term/\` 到末尾 \`.html\` 的部分 \`12\` 作为参数填入，此时路由为 [\`/cisia/12\`](https://rsshub.app/cisia/12)。
:::

<details>
<summary>更多分类</summary>

#### [分支机构信息](http://www.cisia.org/site/term/14.html)

| [企业动态](http://www.cisia.org/site/term/17.html) | [产品展示](http://www.cisia.org/site/term/18.html) |
| -------------------------------------------------- | -------------------------------------------------- |
| [17](https://rsshub.app/cisia/17)                  | [18](https://rsshub.app/cisia/18)                  |

#### [新闻中心](http://www.cisia.org/site/term/8.html)

| [协会动态](http://www.cisia.org/site/term/9.html) | [行业新闻](http://www.cisia.org/site/term/10.html) | [通知公告](http://www.cisia.org/site/term/11.html) | [市场信息](http://www.cisia.org/site/term/12.html) |
| ------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| [9](https://rsshub.app/cisia/9)                   | [10](https://rsshub.app/cisia/10)                  | [11](https://rsshub.app/cisia/11)                  | [12](https://rsshub.app/cisia/12)                  |

#### [政策法规](http://www.cisia.org/site/term/19.html)

| [宏观聚焦](http://www.cisia.org/site/term/20.html) | [技术园区](http://www.cisia.org/site/term/396.html) |
| -------------------------------------------------- | --------------------------------------------------- |
| [20](https://rsshub.app/cisia/20)                  | [396](https://rsshub.app/cisia/396)                 |

#### [合作交流](http://www.cisia.org/site/term/22.html)

| [国际交流](http://www.cisia.org/site/term/23.html) | [行业交流](http://www.cisia.org/site/term/24.html) | [企业调研](http://www.cisia.org/site/term/25.html) | [会展信息](http://www.cisia.org/site/term/84.html) | [宣传专题](http://www.cisia.org/site/term/430.html) |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| [23](https://rsshub.app/cisia/23)                  | [24](https://rsshub.app/cisia/24)                  | [25](https://rsshub.app/cisia/25)                  | [84](https://rsshub.app/cisia/84)                  | [430](https://rsshub.app/cisia/430)                 |

#### [党建工作](http://www.cisia.org/site/term/26.html)

| [党委文件](http://www.cisia.org/site/term/27.html) | [学习园地](http://www.cisia.org/site/term/28.html) | [两会专题](http://www.cisia.org/site/term/443.html) |
| -------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| [27](https://rsshub.app/cisia/27)                  | [28](https://rsshub.app/cisia/28)                  | [443](https://rsshub.app/cisia/443)                 |

#### [网上服务平台](http://www.cisia.org/site/term/29.html)

| [前沿科技](http://www.cisia.org/site/term/31.html) | [新材料新技术](http://www.cisia.org/site/term/133.html) | [文件共享](http://www.cisia.org/site/term/30.html) |
| -------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| [31](https://rsshub.app/cisia/31)                  | [133](https://rsshub.app/cisia/133)                     | [30](https://rsshub.app/cisia/30)                  |

#### [会员社区](http://www.cisia.org/site/term/34.html)

| [会员分布](http://www.cisia.org/site/term/35.html) | [会员风采](http://www.cisia.org/site/term/68.html) |
| -------------------------------------------------- | -------------------------------------------------- |
| [35](https://rsshub.app/cisia/35)                  | [68](https://rsshub.app/cisia/68)                  |

</details>
    `,
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.cisia.org/site/term/:id`],
                target: (e) => {
                    let t = e.id.replace(/\.html/, ``);
                    return t ? `/${t}` : ``;
                },
            },
            { title: `分支机构信息 - 企业动态`, source: [`www.cisia.org/site/term/17.html`], target: `/17` },
            { title: `分支机构信息 - 产品展示`, source: [`www.cisia.org/site/term/18.html`], target: `/18` },
            { title: `新闻中心 - 协会动态`, source: [`www.cisia.org/site/term/9.html`], target: `/9` },
            { title: `新闻中心 - 行业新闻`, source: [`www.cisia.org/site/term/10.html`], target: `/10` },
            { title: `新闻中心 - 通知公告`, source: [`www.cisia.org/site/term/11.html`], target: `/11` },
            { title: `新闻中心 - 市场信息`, source: [`www.cisia.org/site/term/12.html`], target: `/12` },
            { title: `政策法规 - 宏观聚焦`, source: [`www.cisia.org/site/term/20.html`], target: `/20` },
            { title: `政策法规 - 技术园区`, source: [`www.cisia.org/site/term/396.html`], target: `/396` },
            { title: `合作交流 - 国际交流`, source: [`www.cisia.org/site/term/23.html`], target: `/23` },
            { title: `合作交流 - 行业交流`, source: [`www.cisia.org/site/term/24.html`], target: `/24` },
            { title: `合作交流 - 企业调研`, source: [`www.cisia.org/site/term/25.html`], target: `/25` },
            { title: `合作交流 - 会展信息`, source: [`www.cisia.org/site/term/84.html`], target: `/84` },
            { title: `合作交流 - 宣传专题`, source: [`www.cisia.org/site/term/430.html`], target: `/430` },
            { title: `党建工作 - 党委文件`, source: [`www.cisia.org/site/term/27.html`], target: `/27` },
            { title: `党建工作 - 学习园地`, source: [`www.cisia.org/site/term/28.html`], target: `/28` },
            { title: `党建工作 - 两会专题`, source: [`www.cisia.org/site/term/443.html`], target: `/443` },
            { title: `网上服务平台 - 前沿科技`, source: [`www.cisia.org/site/term/31.html`], target: `/31` },
            { title: `网上服务平台 - 新材料新技术`, source: [`www.cisia.org/site/term/133.html`], target: `/133` },
            { title: `网上服务平台 - 文件共享`, source: [`www.cisia.org/site/term/30.html`], target: `/30` },
            { title: `会员社区 - 会员分布`, source: [`www.cisia.org/site/term/35.html`], target: `/35` },
            { title: `会员社区 - 会员风采`, source: [`www.cisia.org/site/term/68.html`], target: `/68` },
        ],
    };
export { i as handler, a as route };
