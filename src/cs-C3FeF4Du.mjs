import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { load as i } from 'cheerio';
import a from 'iconv-lite';
const o = (e) => {
        let t = /charset="?'?gb/i.test(e.toString()) ? `gbk` : `utf-8`;
        return a.decode(e, t);
    },
    s = {
        path: `/:category{.+}?`,
        name: `栏目`,
        parameters: { category: `分类，见下表，默认为首页` },
        maintainers: [`nczitzk`],
        description: `| 要闻 | 公司 | 市场 | 基金 |
| ---- | ---- | ---- | ---- |
| xwzx | ssgs | gppd | tzjj |

| 科创 | 产经   | 期货     | 海外   |
| ---- | ------ | -------- | ------ |
| 5g   | cj2020 | zzqh2020 | hw2020 |

<details>
<summary>更多栏目</summary>

#### 要闻

| 财经要闻 | 观点评论 | 民生消费  |
| -------- | -------- | --------- |
| xwzx/hg  | xwzx/jr  | xwzx/msxf |

#### 公司

| 公司要闻  | 公司深度  | 公司巡礼  |
| --------- | --------- | --------- |
| ssgs/gsxw | ssgs/gssd | ssgs/gsxl |

#### 市场

| A 股市场  | 港股资讯  | 债市研究  | 海外报道  | 期货报道  |
| --------- | --------- | --------- | --------- | --------- |
| gppd/gsyj | gppd/ggzx | gppd/zqxw | gppd/hwbd | gppd/qhbd |

#### 基金

| 基金动态  | 基金视点  | 基金持仓  | 私募基金  | 基民学苑  |
| --------- | --------- | --------- | --------- | --------- |
| tzjj/jjdt | tzjj/jjks | tzjj/jjcs | tzjj/smjj | tzjj/tjdh |

#### 机构

| 券商 | 银行 | 保险 |
| ---- | ---- | ---- |
| qs   | yh   | bx   |

#### 其他

| 中证快讯 7x24 | IPO 鉴真 | 公司能见度 |
| ------------- | -------- | ---------- |
| sylm/jsbd     | yc/ipojz | yc/gsnjd   |
</details>`,
        handler: c,
    };
async function c(a) {
    let { category: s = `xwzx` } = a.req.param(),
        c = a.req.query(`limit`) ? Number.parseInt(a.req.query(`limit`), 10) : 30,
        l = `https://www.cs.com.cn`,
        u = new URL(s.endsWith(`/`) ? s : `${s}/`, l).href,
        { data: d } = await n(u, { responseType: `buffer` }),
        f = i(o(d)),
        p = f(`ul.ch_type3_list li a`)
            .slice(0, c)
            .toArray()
            .map((e) => ((e = f(e)), { title: e.find(`h3`).text().trim(), link: new URL(e.prop(`href`), u).href, pubDate: r(t(e.find(`em`).text()), 8) }));
    p = await Promise.all(
        p.map((a) =>
            e.tryGet(a.link, async () => {
                try {
                    let { data: e } = await n(a.link, { responseType: `buffer` }),
                        s = i(o(e));
                    ((a.title = s(`article.cont_article header h1`).text().trim()),
                        (a.description = s(`article.cont_article section`).html()),
                        (a.author = s(`div.artc_info em`).text().trim()),
                        (a.category = s(`div.artc_route div a`)
                            .slice(1)
                            .toArray()
                            .map((e) => s(e).prop(`title`) ?? s(e).text())),
                        (a.pubDate = r(t(s(`.time`).prop(`datetime`)), 8)));
                } catch {}
                return a;
            })
        )
    );
    let m = f(`title`).text(),
        h = new URL(f(`div.logo_cs a img`).prop(`src`), u).href,
        g = new URL(`favicon.ico`, l).href;
    return {
        item: p,
        title: m,
        link: u,
        description: f(`meta[name="Description"]`).prop(`content`),
        language: f(`html`).prop(`lang`),
        image: h,
        icon: g,
        logo: g,
        subtitle: f(`meta[name="Keywords"]`).prop(`content`),
        author: m.split(`-`).pop().trim(),
    };
}
export { s as route };
