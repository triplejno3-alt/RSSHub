import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: `/channel/:id?`,
    categories: [`forecast`],
    example: `/cma/channel/380`,
    parameters: { id: `分类，见下表，可在对应频道页 URL 中找到，默认为 380，即每日天气提示` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `天气预报频道`,
    maintainers: [`nczitzk`],
    handler: u,
    description: `#### 天气实况

| 频道名称 | 频道 id                          |
| -------- | -------------------------------- |
| 卫星云图 | d3236549863e453aab0ccc4027105bad |
| 单站雷达 | 103                              |
| 降水量   | 18                               |
| 气温     | 32                               |
| 土壤水分 | 45                               |

#### 气象公报

| 频道名称       | 频道 id                          |
| -------------- | -------------------------------- |
| 每日天气提示   | 380                              |
| 重要天气提示   | da5d55817ad5430fb9796a0780178533 |
| 天气公报       | 3780                             |
| 强对流天气预报 | 383                              |
| 交通气象预报   | 423                              |
| 森林火险预报   | 424                              |
| 海洋天气公报   | 452                              |
| 环境气象公报   | 467                              |

::: tip
  订阅更多细分频道，请前往对应上级频道页，使用下拉菜单选择项目后跳转到目标频道页，查看其 URL 找到对应频道 id
:::`,
};
async function u(l) {
    let { id: u = `380` } = l.req.param(),
        d = `中国气象局·天气预报`,
        f = `https://weather.cma.cn`,
        p = new URL(`api/channel`, f).href,
        m = new URL(`web/channel-${u}.html`, f).href,
        { data: h } = await t(p, { searchParams: { id: u } }),
        g = h?.data?.pop() ?? {};
    g.image = g.image?.replace(/\?.*$/, ``) ?? void 0;
    let { data: _ } = await t(m),
        v = o(_),
        y = [
            ...new Set(
                v(`ol#breadcrumb li`)
                    .slice(1)
                    .toArray()
                    .map((e) => v(e).text())
            ),
        ].join(` > `),
        b = v(`div.xml`).html(),
        x = new URL(v(`li.active a img`).prop(`src`), f).href,
        S = new URL(v(`link[rel="shortcut icon"]`).prop(`href`), f).href;
    return {
        item: g
            ? [
                  {
                      title: `${g.title} ${g.releaseTime}`,
                      link: new URL(g.link, f).href,
                      description: s(a(r, { children: [g.image ? i(`figure`, { children: i(`img`, { src: new URL(g.image, f).href, alt: g.title }) }) : null, b ? c(b) : null] })),
                      author:
                          v(
                              v(`div.col-xs-8 span`)
                                  .toArray()
                                  .filter((e) => v(e).text().startsWith(`来源`))
                                  ?.pop()
                          )
                              ?.text()
                              ?.split(/：/)
                              ?.pop() || d,
                      guid: `cma${g.link}#${g.releaseTime.replaceAll(/\s/g, `-`)}`,
                      pubDate: n(e(g.releaseTime), 8),
                      enclosure_url: new URL(g.image, f).href,
                      enclosure_type: g.image ? `image/${g.image.split(/\./).pop()}` : void 0,
                  },
              ]
            : [],
        title: `${d} - ${y}`,
        link: m,
        description: v(`meta[name="description"]`).prop(`content`),
        language: `zh`,
        image: x,
        icon: S,
        logo: S,
        subtitle: v(`meta[name="keywords"]`).prop(`content`),
        author: d,
        allowEmpty: !0,
    };
}
export { l as route };
