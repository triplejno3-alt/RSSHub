import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
        let { category: a = `xiehuidongtai/xiehuitongzhi` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 25,
            s = `https://www.chinania.org.cn`,
            c = new URL(`html/${a.endsWith(`/`) ? a : `${a}/`}`, s).href,
            { data: l } = await n(c),
            u = r(l),
            d = u(`html`).prop(`lang`),
            f = u(`ul.notice_list_ul li`)
                .slice(0, o)
                .toArray()
                .map((e) => ((e = u(e)), { title: e.find(`p`).first().text(), pubDate: t(e.find(`p`).last().text()), link: e.find(`a`).prop(`href`), language: d }));
        f = await Promise.all(
            f.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = r(e),
                        o = a(`div.article_title p`).first().text(),
                        s = a(`div.article_content`).html();
                    return (
                        (i.title = o),
                        (i.description = s),
                        (i.pubDate = t(a(`div.article_title p`).last().text().split(`：`))),
                        (i.author = a(`meta[name='keywords']`).prop(`content`)),
                        (i.content = { html: s, text: a(`div.article_content`).text() }),
                        (i.language = d),
                        i
                    );
                })
            )
        );
        let p = u(`title`).text(),
            m = new URL(u(`img.logo`).prop(`src`), s).href;
        return { title: p, description: p.split(/-/)[0]?.trim(), link: c, item: f, allowEmpty: !0, image: m, author: u(`meta[name='keywords']`).prop(`content`), language: d };
    },
    a = {
        path: `/:category{.+}?`,
        name: `分类`,
        url: `www.chinania.org.cn`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/chinania/xiehuidongtai/xiehuitongzhi`,
        parameters: { category: '分类，默认为 `xiehuidongtai/xiehuitongzhi`，即协会通知，可在对应分类页 URL 中找到' },
        description: `::: tip
  若订阅 [协会通知](https://www.chinania.org.cn/html/xiehuidongtai/xiehuitongzhi/)，网址为 \`https://www.chinania.org.cn/html/xiehuidongtai/xiehuitongzhi/\`。截取 \`https://www.chinania.org.cn/html\` 到末尾 \`/\` 的部分 \`xiehuidongtai/xiehuitongzhi\` 作为参数填入，此时路由为 [\`/chinania/xiehuidongtai/xiehuitongzhi\`](https://rsshub.app/chinania/xiehuidongtai/xiehuitongzhi)。
:::

<details>
<summary>更多分类</summary>

#### [协会动态](https://www.chinania.org.cn/html/xiehuidongtai/)

| [协会动态](https://www.chinania.org.cn/html/xiehuidongtai/xiehuidongtai/)              | [协会通知](https://www.chinania.org.cn/html/xiehuidongtai/xiehuitongzhi/)              | [有色企业50强](https://www.chinania.org.cn/html/xiehuidongtai/youseqiye50qiang/)             |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [xiehuidongtai/xiehuidongtai](https://rsshub.app/chinania/xiehuidongtai/xiehuidongtai) | [xiehuidongtai/xiehuitongzhi](https://rsshub.app/chinania/xiehuidongtai/xiehuitongzhi) | [xiehuidongtai/youseqiye50qiang](https://rsshub.app/chinania/xiehuidongtai/youseqiye50qiang) |

#### [党建工作](https://www.chinania.org.cn/html/djgz/)

| [协会党建](https://www.chinania.org.cn/html/djgz/xiehuidangjian/)      | [行业党建](https://www.chinania.org.cn/html/djgz/hangyedangjian/)      |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [djgz/xiehuidangjian](https://rsshub.app/chinania/djgz/xiehuidangjian) | [djgz/hangyedangjian](https://rsshub.app/chinania/djgz/hangyedangjian) |

#### [行业新闻](https://www.chinania.org.cn/html/hangyexinwen/)

| [时政要闻](https://www.chinania.org.cn/html/hangyexinwen/shizhengyaowen/)              | [要闻](https://www.chinania.org.cn/html/hangyexinwen/yaowen/)          | [行业新闻](https://www.chinania.org.cn/html/hangyexinwen/guoneixinwen/)            | [资讯](https://www.chinania.org.cn/html/hangyexinwen/zixun/)         |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [hangyexinwen/shizhengyaowen](https://rsshub.app/chinania/hangyexinwen/shizhengyaowen) | [hangyexinwen/yaowen](https://rsshub.app/chinania/hangyexinwen/yaowen) | [hangyexinwen/guoneixinwen](https://rsshub.app/chinania/hangyexinwen/guoneixinwen) | [hangyexinwen/zixun](https://rsshub.app/chinania/hangyexinwen/zixun) |

#### [人力资源](https://www.chinania.org.cn/html/renliziyuan/)

| [相关通知](https://www.chinania.org.cn/html/renliziyuan/xiangguantongzhi/)               | [人事招聘](https://www.chinania.org.cn/html/renliziyuan/renshizhaopin/)            |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [renliziyuan/xiangguantongzhi](https://rsshub.app/chinania/renliziyuan/xiangguantongzhi) | [renliziyuan/renshizhaopin](https://rsshub.app/chinania/renliziyuan/renshizhaopin) |

#### [行业统计](https://www.chinania.org.cn/html/hangyetongji/jqzs/)

| [行业分析](https://www.chinania.org.cn/html/hangyetongji/tongji/)      | [数据统计](https://www.chinania.org.cn/html/hangyetongji/chanyeshuju/)           | [景气指数](https://www.chinania.org.cn/html/hangyetongji/jqzs/)    |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [hangyetongji/tongji](https://rsshub.app/chinania/hangyetongji/tongji) | [hangyetongji/chanyeshuju](https://rsshub.app/chinania/hangyetongji/chanyeshuju) | [hangyetongji/jqzs](https://rsshub.app/chinania/hangyetongji/jqzs) |

#### [政策法规](https://www.chinania.org.cn/html/zcfg/zhengcefagui/)

| [政策法规](https://www.chinania.org.cn/html/zcfg/zhengcefagui/)    |
| ------------------------------------------------------------------ |
| [zcfg/zhengcefagui](https://rsshub.app/chinania/zcfg/zhengcefagui) |

#### [会议展览](https://www.chinania.org.cn/html/hyzl/huiyizhanlan/)

| [会展通知](https://www.chinania.org.cn/html/hyzl/huiyizhanlan/)    | [会展报道](https://www.chinania.org.cn/html/hyzl/huizhanbaodao/)     |
| ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| [hyzl/huiyizhanlan](https://rsshub.app/chinania/hyzl/huiyizhanlan) | [hyzl/huizhanbaodao](https://rsshub.app/chinania/hyzl/huizhanbaodao) |

</details>
    `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.chinania.org.cn/html/:category`],
                target: (e) => {
                    let t = e.category;
                    return t ? `/${t}` : ``;
                },
            },
            { title: `协会动态 - 协会动态`, source: [`www.chinania.org.cn/html/xiehuidongtai/xiehuidongtai/`], target: `/xiehuidongtai/xiehuidongtai` },
            { title: `协会动态 - 协会通知`, source: [`www.chinania.org.cn/html/xiehuidongtai/xiehuitongzhi/`], target: `/xiehuidongtai/xiehuitongzhi` },
            { title: `协会动态 - 有色企业50强`, source: [`www.chinania.org.cn/html/xiehuidongtai/youseqiye50qiang/`], target: `/xiehuidongtai/youseqiye50qiang` },
            { title: `党建工作 - 协会党建`, source: [`www.chinania.org.cn/html/djgz/xiehuidangjian/`], target: `/djgz/xiehuidangjian` },
            { title: `党建工作 - 行业党建`, source: [`www.chinania.org.cn/html/djgz/hangyedangjian/`], target: `/djgz/hangyedangjian` },
            { title: `会议展览 - 会展通知`, source: [`www.chinania.org.cn/html/hyzl/huiyizhanlan/`], target: `/hyzl/huiyizhanlan` },
            { title: `会议展览 - 会展报道`, source: [`www.chinania.org.cn/html/hyzl/huizhanbaodao/`], target: `/hyzl/huizhanbaodao` },
            { title: `行业新闻 - 时政要闻`, source: [`www.chinania.org.cn/html/hangyexinwen/shizhengyaowen/`], target: `/hangyexinwen/shizhengyaowen` },
            { title: `行业新闻 - 要闻`, source: [`www.chinania.org.cn/html/hangyexinwen/yaowen/`], target: `/hangyexinwen/yaowen` },
            { title: `行业新闻 - 行业新闻`, source: [`www.chinania.org.cn/html/hangyexinwen/guoneixinwen/`], target: `/hangyexinwen/guoneixinwen` },
            { title: `行业新闻 - 资讯`, source: [`www.chinania.org.cn/html/hangyexinwen/zixun/`], target: `/hangyexinwen/zixun` },
            { title: `行业统计 - 行业分析`, source: [`www.chinania.org.cn/html/hangyetongji/tongji/`], target: `/hangyetongji/tongji` },
            { title: `行业统计 - 数据统计`, source: [`www.chinania.org.cn/html/hangyetongji/chanyeshuju/`], target: `/hangyetongji/chanyeshuju` },
            { title: `行业统计 - 景气指数`, source: [`www.chinania.org.cn/html/hangyetongji/jqzs/`], target: `/hangyetongji/jqzs` },
            { title: `人力资源 - 相关通知`, source: [`www.chinania.org.cn/html/renliziyuan/xiangguantongzhi/`], target: `/renliziyuan/xiangguantongzhi` },
            { title: `人力资源 - 人事招聘`, source: [`www.chinania.org.cn/html/renliziyuan/renshizhaopin/`], target: `/renliziyuan/renshizhaopin` },
            { title: `政策法规 - 政策法规`, source: [`www.chinania.org.cn/html/zcfg/zhengcefagui/`], target: `/zcfg/zhengcefagui` },
        ],
    };
export { i as handler, a as route };
