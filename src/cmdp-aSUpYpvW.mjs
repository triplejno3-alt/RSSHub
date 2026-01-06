import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { jsx as n } from 'hono/jsx/jsx-runtime';
import { load as r } from 'cheerio';
import { renderToString as i } from 'hono/jsx/dom/server';
import a from 'iconv-lite';
const o = async (o) => {
        let { id: s = `RPJQWQYZ` } = o.req.param(),
            c = o.req.query(`limit`) ? Number.parseInt(o.req.query(`limit`), 10) : 30,
            l = s?.split(/\//) ?? [],
            u = [],
            d = new URL(`cn/index.htm`, `http://cmdp.ncc-cma.net`).href,
            { data: f } = await t(d, { responseType: `buffer` }),
            p = r(a.decode(f, `gbk`)),
            m = `国家气候中心`,
            h = p(`ul.img-con-new-con li img[id]`)
                .toArray()
                .filter((e) => l.length === 0 || l.includes(p(e).prop(`id`)))
                .slice(0, c)
                .map((t) => {
                    t = p(t);
                    let r = t.prop(`id`),
                        a = p(`li[data-id="${r}"]`).text() || void 0,
                        o = new URL(t.prop(`src`), d).href,
                        s =
                            o
                                .match(/_(\d{4})(\d{2})(\d{2})_/)
                                ?.slice(1, 4)
                                .join(`-`) ?? new Date().toISOString().slice(0, 10);
                    l.length !== 0 && a && u.push(a);
                    let c = i(o ? n(`figure`, { children: n(`img`, { alt: `${a} ${s}`, src: o }) }) : null),
                        f = `ncc-cma#${r}#${s}`;
                    return {
                        title: `${a} ${s}`,
                        description: c,
                        pubDate: e(s),
                        link: d,
                        category: [a],
                        author: m,
                        guid: f,
                        id: f,
                        content: { html: c, text: c },
                        image: o,
                        banner: o,
                        language: `zh`,
                        enclosure_url: o,
                        enclosure_type: `image/${o.split(/\./).pop()}`,
                        enclosure_title: `${a} ${s}`,
                    };
                }),
            g = p(`h1`).last().text(),
            _ = p(`img.logo`).prop(`src`);
        return { title: `${m} - ${g}${u.length === 0 ? `` : ` - ${u.join(`|`)}`}`, description: p(`title`).text(), link: d, item: h, allowEmpty: !0, image: _, author: m, language: `zh` };
    },
    s = {
        path: `/cmdp/image/:id{.+}?`,
        name: `最新监测`,
        url: `cmdp.ncc-cma.net`,
        maintainers: [`nczitzk`],
        handler: o,
        example: `/ncc-cma/cmdp/image/RPJQWQYZ`,
        parameters: { category: `图片，默认为 RPJQWQYZ，即日平均气温距平，可在对应列表项 data-id 属性中找到` },
        description: `::: tip
  若订阅日平均气温距平，将其 data-id \`RPJQWQYZ\` 作为参数填入，此时路由为 [\`/ncc-cma/cmdp/image/RPJQWQYZ\`](https://rsshub.app/ncc-cma/cmdp/image/RPJQWQYZ)。

  若同时订阅日平均气温距平、近5天平均气温距和近10天平均气温距平，将其 data-id \`RPJQWQYZ\`、\`ZJ5TPJQWJP\` 和 \`ZJ10TQWJP\` 作为参数填入，此时路由为 [\`/ncc-cma/cmdp/image/RPJQWQYZ/ZJ5TPJQWJP/ZJ10TQWJP\`](https://rsshub.app/ncc-cma/cmdp/image/RPJQWQYZ/ZJ5TPJQWJP/ZJ10TQWJP)。
:::

| 日平均气温距平                                              | 近5天平均气温距平                                               | 近10天平均气温距平                                            | 近20天平均气温距平                                            | 近30天平均气温距平                                            |
| ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| [RPJQWQYZ](https://rsshub.app/ncc-cma/cmdp/image/RPJQWQYZ) | [ZJ5TPJQWJP](https://rsshub.app/ncc-cma/cmdp/image/ZJ5TPJQWJP) | [ZJ10TQWJP](https://rsshub.app/ncc-cma/cmdp/image/ZJ10TQWJP) | [ZJ20TQWJP](https://rsshub.app/ncc-cma/cmdp/image/ZJ20TQWJP) | [ZJ30TQWJP](https://rsshub.app/ncc-cma/cmdp/image/ZJ30TQWJP) |

| 本月以来气温距平                                            | 本季以来气温距平                                            | 本年以来气温距平                                            |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| [BYYLQWJP](https://rsshub.app/ncc-cma/cmdp/image/BYYLQWJP) | [BJYLQWJP](https://rsshub.app/ncc-cma/cmdp/image/BJYLQWJP) | [BNYLQWJP](https://rsshub.app/ncc-cma/cmdp/image/BNYLQWJP) |

| 日降水量分布                                                            | 近5天降水量                                                     | 近10天降水量                                                | 近20天降水量                                                | 近30天降水量                                                |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| [QGRJSLFBT0808S](https://rsshub.app/ncc-cma/cmdp/image/QGRJSLFBT0808S) | [ZJ5TJSLFBT](https://rsshub.app/ncc-cma/cmdp/image/ZJ5TJSLFBT) | [ZJ10TJSL](https://rsshub.app/ncc-cma/cmdp/image/ZJ10TJSL) | [ZJ20TJSL](https://rsshub.app/ncc-cma/cmdp/image/ZJ20TJSL) | [ZJ30TJSL](https://rsshub.app/ncc-cma/cmdp/image/ZJ30TJSL) |

| 本月以来降水量                                            | 本季以来降水量                                            | 近10天降水量距平百分率                                          | 近20天降水量距平百分率                                          | 近30天降水量距平百分率                                          |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| [BYYLJSL](https://rsshub.app/ncc-cma/cmdp/image/BYYLJSL) | [BJYLJSL](https://rsshub.app/ncc-cma/cmdp/image/BJYLJSL) | [ZJ10TJSLJP](https://rsshub.app/ncc-cma/cmdp/image/ZJ10TJSLJP) | [ZJ20TJSLJP](https://rsshub.app/ncc-cma/cmdp/image/ZJ20TJSLJP) | [ZJ30TJSLJP](https://rsshub.app/ncc-cma/cmdp/image/ZJ30TJSLJP) |

| 本月以来降水量距平百分率                                                | 本季以来降水量距平百分率                                                | 本年以来降水量距平百分率                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| [BYYLJSLJPZYQHZ](https://rsshub.app/ncc-cma/cmdp/image/BYYLJSLJPZYQHZ) | [BJYLJSLJPZJQHZ](https://rsshub.app/ncc-cma/cmdp/image/BJYLJSLJPZJQHZ) | [BNYLJSLJP](https://rsshub.app/ncc-cma/cmdp/image/BNYLJSLJP) |

| 气温距平（最近10天）                                                 | 气温距平（最近20天）                                                 | 气温距平（最近30天）                                                 | 气温距平（最近90天）                                                 | 最低气温距平（最近30天）                                           |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [glbtmeana10_](https://rsshub.app/ncc-cma/cmdp/image/glbtmeana10_) | [glbtmeana20_](https://rsshub.app/ncc-cma/cmdp/image/glbtmeana20_) | [glbtmeana30_](https://rsshub.app/ncc-cma/cmdp/image/glbtmeana30_) | [glbtmeana90_](https://rsshub.app/ncc-cma/cmdp/image/glbtmeana90_) | [glbtmina30_](https://rsshub.app/ncc-cma/cmdp/image/glbtmina30_) |

| 最低气温距平（最近90天）                                           | 最高气温距平（最近30天）                                           | 最高气温距平（最近90天）                                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [glbtmina90_](https://rsshub.app/ncc-cma/cmdp/image/glbtmina90_) | [glbtmaxa30_](https://rsshub.app/ncc-cma/cmdp/image/glbtmaxa30_) | [glbtmaxa90_](https://rsshub.app/ncc-cma/cmdp/image/glbtmaxa90_) |

| 降水量（最近10天）                                               | 降水量（最近20天）                                               | 降水量（最近30天）                                               | 降水量（最近90天）                                               | 降水距平百分率（最近10天）                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| [glbrain10_](https://rsshub.app/ncc-cma/cmdp/image/glbrain10_) | [glbrain20_](https://rsshub.app/ncc-cma/cmdp/image/glbrain20_) | [glbrain30_](https://rsshub.app/ncc-cma/cmdp/image/glbrain30_) | [glbrain90_](https://rsshub.app/ncc-cma/cmdp/image/glbrain90_) | [glbraina10_](https://rsshub.app/ncc-cma/cmdp/image/glbraina10_) |

| 降水距平百分率（最近20天）                                         | 降水距平百分率（最近30天）                                         | 降水距平百分率（最近90天）                                         |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [glbraina20_](https://rsshub.app/ncc-cma/cmdp/image/glbraina20_) | [glbraina30_](https://rsshub.app/ncc-cma/cmdp/image/glbraina30_) | [glbraina90_](https://rsshub.app/ncc-cma/cmdp/image/glbraina90_) |

    `,
        categories: [`forecast`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            { title: `日平均气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/RPJQWQYZ` },
            { title: `近5天平均气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ5TPJQWJP` },
            { title: `近10天平均气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ10TQWJP` },
            { title: `近20天平均气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ20TQWJP` },
            { title: `近30天平均气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ30TQWJP` },
            { title: `本月以来气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/BYYLQWJP` },
            { title: `本季以来气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/BJYLQWJP` },
            { title: `本年以来气温距平`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/BNYLQWJP` },
            { title: `日降水量分布`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/QGRJSLFBT0808S` },
            { title: `近5天降水量`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ5TJSLFBT` },
            { title: `近10天降水量`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ10TJSL` },
            { title: `近20天降水量`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ20TJSL` },
            { title: `近30天降水量`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ30TJSL` },
            { title: `本月以来降水量`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/ncc-cma/cmdp/image/BYYLJSL` },
            { title: `本季以来降水量`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/BJYLJSL` },
            { title: `近10天降水量距平百分率`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ10TJSLJP` },
            { title: `近20天降水量距平百分率`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ20TJSLJP` },
            { title: `近30天降水量距平百分率`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/ZJ30TJSLJP` },
            { title: `本月以来降水量距平百分率`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/BYYLJSLJPZYQHZ` },
            { title: `本季以来降水量距平百分率`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/BJYLJSLJPZJQHZ` },
            { title: `本年以来降水量距平百分率`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/BNYLJSLJP` },
            { title: `气温距平（最近10天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmeana10_` },
            { title: `气温距平（最近20天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmeana20_` },
            { title: `气温距平（最近30天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmeana30_` },
            { title: `气温距平（最近90天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmeana90_` },
            { title: `最低气温距平（最近30天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmina30_` },
            { title: `最低气温距平（最近90天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmina90_` },
            { title: `最高气温距平（最近30天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmaxa30_` },
            { title: `最高气温距平（最近90天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbtmaxa90_` },
            { title: `降水量（最近10天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbrain10_` },
            { title: `降水量（最近20天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbrain20_` },
            { title: `降水量（最近30天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbrain30_` },
            { title: `降水量（最近90天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbrain90_` },
            { title: `降水距平百分率（最近10天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbraina10_` },
            { title: `降水距平百分率（最近20天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbraina20_` },
            { title: `降水距平百分率（最近30天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbraina30_` },
            { title: `降水距平百分率（最近90天）`, source: [`cmdp.ncc-cma.net/cn/index.htm`], target: `/cmdp/image/glbraina90_` },
        ],
    };
export { o as handler, s as route };
