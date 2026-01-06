import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import './timezone-CrV-DT8S.mjs';
import { a as r, i, n as a, r as o, t as s } from './util-Csh7ALjI.mjs';
import { load as c } from 'cheerio';
const l = {
        path: `/news/:category{.+}?`,
        categories: [`university`],
        example: `/whu/news`,
        parameters: { category: `新闻栏目，可选` },
        name: `新闻网`,
        maintainers: [],
        handler: d,
        description:
            '\ncategory 参数可选，范围如下:\n\n| 新闻栏目 | 武大资讯 | 学术动态 | 珞珈影像 | 武大视频 |\n| -------- | -------- | -------- | -------- | -------- |\n| 参数     |  0 或 `wdzx/wdyw`  | 1 或 `kydt` | 2 或 `stkj/ljyx` | 3 或 `stkj/wdsp` |\n\n此外 route 后可以加上 `?limit=n` 的查询参数，表示只获取前 n 条新闻；如果不指定默认为 10。\n',
    },
    u = (e) => {
        let t = [`wdzx/wdyw`, `kydt`, `stkj/ljyx`, `stkj/wdsp`];
        return [`0`, `1`, `2`, `3`].includes(e) ? t[e] : t.includes(e) ? e : `wdzx/wdyw`;
    };
async function d(l) {
    let { category: d } = l.req.param(),
        f = l.req.query(`limit`) ? Number.parseInt(l.req.query(`limit`), 10) : 10;
    d = u(d);
    let p = `https://news.${s}`,
        m = new URL(`${d}.htm`, p).href,
        { data: h } = await n(m),
        g = c(h),
        _ = g(`ul.wdzxList li a[title], ul.xsdtList li a, div.topPic a[title], ul.nypicList li a[title], div.topVid a[title], ul.nyvidList li a[title]`)
            .slice(0, f)
            .toArray()
            .map((e) => {
                e = g(e);
                let n = e.find(`div.img img`);
                return {
                    title: e.prop(`title`) ?? e.find(`h4.eclips`).text(),
                    link: new URL(e.prop(`href`), p).href,
                    pubDate: t(e.find(`time`).text(), [`YYYY.MM.DD`, `DDYYYY.MM`]),
                    description: r({ description: e.find(`div.txt p`).html(), image: n.prop(`src`) ? { src: new URL(n.prop(`src`), p).href, alt: n.prop(`alt`) } : void 0 }),
                };
            });
    _ = await o(_, e.tryGet, p);
    let v = i(h),
        y = a(v, `SiteName`),
        b = a(v, `ColumnName`),
        x = new URL(g(`link[rel="shortcut icon"]`).prop(`href`), p).href;
    return {
        item: _,
        title: `${y} - ${b}`,
        link: m,
        description: a(v, `description`),
        language: g(`html`).prop(`lang`),
        image: new URL(g(`div.logo img`).prop(`src`), p).href,
        icon: x,
        logo: x,
        subtitle: b,
        author: y,
        allowEmpty: !0,
    };
}
export { l as route };
