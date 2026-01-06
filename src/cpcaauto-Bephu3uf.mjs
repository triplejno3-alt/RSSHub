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
        let { type: o = `news`, id: s } = a.req.param(),
            c = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 20,
            l = `http://cpcaauto.com`,
            u = new URL(`news.php${o ? `?types=${o}${s ? `&anid=${s}` : ``}` : ``}`, l).href,
            { data: d } = await n(u),
            f = i(d),
            p = f(`div.list_d ul li.q`)
                .slice(0, c)
                .toArray()
                .map((e) => ((e = f(e)), { title: e.find(`a`).text(), pubDate: t(e.find(`span`).text().trim()), link: new URL(e.find(`a`).prop(`href`), l).href }));
        p = await Promise.all(
            p.map((a) =>
                e.tryGet(a.link, async () => {
                    let { data: e } = await n(a.link),
                        o = i(e),
                        s = o(`div.tit`).text(),
                        c = o(`div.text`).html();
                    return ((a.title = s), (a.description = c), (a.pubDate = r(t(o(`div.view span`).first().text().split(/：/).pop()), 8)), (a.content = { html: c, text: o(`div.text`).text() }), (a.language = `zh`), a);
                })
            )
        );
        let m = new URL(f(`meta[property="og:image"]`).prop(`content`), l).href;
        return {
            title: `${f(`title`).text()} - ${f(`span.main_color`)
                .toArray()
                .map((e) => f(e).text())
                .join(` - `)}`,
            description: f(`META[name="description"]`).prop(`content`),
            link: u,
            item: p,
            allowEmpty: !0,
            image: m,
            author: f(`meta[name="keywords"]`).prop(`content`),
            language: `zh`,
        };
    },
    o = {
        path: `/news/:type?/:id?`,
        name: `文章`,
        url: `cpcaauto.com`,
        maintainers: [`nczitzk`],
        handler: a,
        example: `/cpcaauto/news/news`,
        parameters: { type: `分类，默认为 news，可在对应分类页 URL 中找到`, id: `id，默认为 news，可在对应分类页 URL 中找到` },
        description: `::: tip
  若订阅 [行业新闻 > 国内乘用车](http://cpcaauto.com/news.php?types=news&anid=10)，网址为 \`http://cpcaauto.com/news.php?types=news&anid=10\`。截取 \`types\` 和 \`anid\` 的部分 \`\` 作为参数填入，此时路由为 [\`/cpcaauto/news/news/10\`](https://rsshub.app/cpcaauto/news/news/10)。
:::

#### [行业新闻](http://cpcaauto.com/news.php?types=news)

| [国内乘用车](http://cpcaauto.com/news.php?types=news&anid=10) | [进口及国外乘用车](http://cpcaauto.com/news.php?types=news&anid=64) | [后市场](http://cpcaauto.com/news.php?types=news&anid=44) | [商用车](http://cpcaauto.com/news.php?types=news&anid=62) |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| [news/10](https://rsshub.app/cpcaauto/news/news/10)              | [news/64](https://rsshub.app/cpcaauto/news/news/64)                    | [news/44](https://rsshub.app/cpcaauto/news/news/44)          | [news/62](https://rsshub.app/cpcaauto/news/news/62)          |

#### [车市解读](http://cpcaauto.com/news.php?types=csjd)

| [周度](http://cpcaauto.com/news.php?types=csjd&anid=128) | [月度](http://cpcaauto.com/news.php?types=csjd&anid=129) | [指数](http://cpcaauto.com/news.php?types=csjd&anid=130) | [预测](http://cpcaauto.com/news.php?types=csjd&anid=131) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [csjd/128](https://rsshub.app/cpcaauto/news/csjd/128)       | [csjd/129](https://rsshub.app/cpcaauto/news/csjd/129)       | [csjd/130](https://rsshub.app/cpcaauto/news/csjd/130)       | [csjd/131](https://rsshub.app/cpcaauto/news/csjd/131)       |

#### [发布会报告](http://cpcaauto.com/news.php?types=bgzl)

| [上海市场上牌数](http://cpcaauto.com/news.php?types=bgzl&anid=119) | [京城车市](http://cpcaauto.com/news.php?types=bgzl&anid=122) | [进口车市场分析](http://cpcaauto.com/news.php?types=bgzl&anid=120) | [二手车市场分析](http://cpcaauto.com/news.php?types=bgzl&anid=121) | [价格指数](http://cpcaauto.com/news.php?types=bgzl&anid=124) |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [bgzl/119](https://rsshub.app/cpcaauto/news/bgzl/119)                 | [bgzl/122](https://rsshub.app/cpcaauto/news/bgzl/122)           | [bgzl/120](https://rsshub.app/cpcaauto/news/bgzl/120)                 | [bgzl/121](https://rsshub.app/cpcaauto/news/bgzl/121)                 | [bgzl/124](https://rsshub.app/cpcaauto/news/bgzl/124)           |

| [热点评述](http://cpcaauto.com/news.php?types=bgzl&anid=125) | [新能源月报](http://cpcaauto.com/news.php?types=bgzl&anid=126) | [商用车月报](http://cpcaauto.com/news.php?types=bgzl&anid=127) | [政策分析](http://cpcaauto.com/news.php?types=bgzl&anid=123) |
| ---------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [bgzl/125](https://rsshub.app/cpcaauto/news/bgzl/125)           | [bgzl/126](https://rsshub.app/cpcaauto/news/bgzl/126)             | [bgzl/127](https://rsshub.app/cpcaauto/news/bgzl/127)             | [bgzl/123](https://rsshub.app/cpcaauto/news/bgzl/123)           |

#### [经济与政策](http://cpcaauto.com/news.php?types=meeting)

| [一周经济](http://cpcaauto.com/news.php?types=meeting&anid=46) | [一周政策](http://cpcaauto.com/news.php?types=meeting&anid=47) |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [meeting/46](https://rsshub.app/cpcaauto/news/meeting/46)         | [meeting/47](https://rsshub.app/cpcaauto/news/meeting/47)         |

#### [乘联会论坛](http://cpcaauto.com/news.php?types=yjsy)

| [论坛文章](http://cpcaauto.com/news.php?types=yjsy&anid=49) | [两会](http://cpcaauto.com/news.php?types=yjsy&anid=111) | [车展看点](http://cpcaauto.com/news.php?types=yjsy&anid=113) |
| --------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| [yjsy/49](https://rsshub.app/cpcaauto/news/yjsy/49)            | [yjsy/111](https://rsshub.app/cpcaauto/news/yjsy/111)       | [yjsy/113](https://rsshub.app/cpcaauto/news/yjsy/113)           |
  `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`cpcaauto.com/news.php`],
                target: (e, t) => {
                    t = new URL(t);
                    let n = t.searchParams.get(`types`),
                        r = t.searchParams.get(`id`);
                    return n ? `/${n}${r ? `/${r}` : ``}` : ``;
                },
            },
            { title: `行业新闻 - 国内乘用车`, source: [`cpcaauto.com/news.php`], target: `/news/news/10` },
            { title: `行业新闻 - 进口及国外乘用车`, source: [`cpcaauto.com/news.php`], target: `/news/news/64` },
            { title: `行业新闻 - 后市场`, source: [`cpcaauto.com/news.php`], target: `/news/news/44` },
            { title: `行业新闻 - 商用车`, source: [`cpcaauto.com/news.php`], target: `/news/news/62` },
            { title: `车市解读 - 周度`, source: [`cpcaauto.com/news.php`], target: `/news/csjd/128` },
            { title: `车市解读 - 月度`, source: [`cpcaauto.com/news.php`], target: `/news/csjd/129` },
            { title: `车市解读 - 指数`, source: [`cpcaauto.com/news.php`], target: `/news/csjd/130` },
            { title: `车市解读 - 预测`, source: [`cpcaauto.com/news.php`], target: `/news/csjd/131` },
            { title: `发布会报告 - 上海市场上牌数`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/119` },
            { title: `发布会报告 - 京城车市`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/122` },
            { title: `发布会报告 - 进口车市场分析`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/120` },
            { title: `发布会报告 - 二手车市场分析`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/121` },
            { title: `发布会报告 - 价格指数`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/124` },
            { title: `发布会报告 - 热点评述`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/125` },
            { title: `发布会报告 - 新能源月报`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/126` },
            { title: `发布会报告 - 商用车月报`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/127` },
            { title: `发布会报告 - 政策分析`, source: [`cpcaauto.com/news.php`], target: `/news/bgzl/123` },
            { title: `经济与政策 - 一周经济`, source: [`cpcaauto.com/news.php`], target: `/news/meeting/46` },
            { title: `经济与政策 - 一周政策`, source: [`cpcaauto.com/news.php`], target: `/news/meeting/47` },
            { title: `乘联会论坛 - 论坛文章`, source: [`cpcaauto.com/news.php`], target: `/news/yjsy/49` },
            { title: `乘联会论坛 - 两会`, source: [`cpcaauto.com/news.php`], target: `/news/yjsy/111` },
            { title: `乘联会论坛 - 车展看点`, source: [`cpcaauto.com/news.php`], target: `/news/yjsy/113` },
        ],
    };
export { a as handler, o as route };
