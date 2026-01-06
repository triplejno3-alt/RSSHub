import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
        let { category: a = `jgzx/xwzx` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 15,
            s = `https://www.beijingprice.cn`,
            c = new URL(a.endsWith(`/`) ? a : `${a}/`, s).href,
            { data: l } = await n(c),
            u = r(l),
            d = u(`html`).prop(`lang`),
            f = u(`div.jgzx.rightcontent ul li`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = u(e);
                    let n = e.find(`a`),
                        r = n.prop(`href`),
                        i = n.prop(`msg`),
                        a = n.text()?.trim() ?? n.prop(`title`),
                        o,
                        c;
                    if (i) {
                        let e = JSON.parse(i);
                        ((o = new URL(`${e.path}${e.fileName}`, s).href), (c = `application/${e.suffix}`));
                    }
                    return { title: a, pubDate: t(e.contents().last().text()), link: o ?? (r.startsWith(`http`) ? r : new URL(r, s).href), language: d, enclosure_url: o, enclosure_type: c, enclosure_title: o ? a : void 0 };
                });
        f = await Promise.all(
            f.map((i) =>
                e.tryGet(i.link, async () => {
                    if (!i.link.includes(`www.beijingprice.cn`) || i.link.endsWith(`.pdf`)) return i;
                    let { data: e } = await n(i.link),
                        a = r(e),
                        o = a(`p.title`).text().trim(),
                        s = a(`div.news-content`).html(),
                        c = a(`p.from`)
                            .text()
                            .split(/发布时间：/);
                    return (
                        (i.title = o),
                        (i.description = s),
                        (i.pubDate = c?.length === 0 ? i.pubDate : t(c?.pop() ?? ``, `YYYY年MM月DD日`)),
                        (i.category = a(`div.map a`)
                            .toArray()
                            .map((e) => a(e).text())
                            .slice(1)),
                        (i.author = c?.[0]?.replace(/来源：/, ``) ?? void 0),
                        (i.content = { html: s, text: a(`div.news-content`).text() }),
                        (i.language = d),
                        i
                    );
                })
            )
        );
        let p = new URL(u(`a.header-logo img`).prop(`src`), s).href;
        return { title: u(`title`).text(), description: u(`meta[name="description"]`).prop(`content`), link: c, item: f, allowEmpty: !0, image: p, author: u(`meta[name="keywords"]`).prop(`content`), language: d };
    },
    a = {
        path: `/:category{.+}?`,
        name: `资讯`,
        url: `beijingprice.cn`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/beijingprice/jgzx/xwzx`,
        parameters: { category: '分类，默认为 `jgzx/xwzx` 即新闻资讯，可在对应分类页 URL 中找到' },
        description: `::: tip
  若订阅 [新闻资讯](https://www.beijingprice.cn/jgzx/xwzx/)，网址为 \`https://www.beijingprice.cn/jgzx/xwzx/\`。截取 \`https://beijingprice.cn/\` 到末尾 \`/\` 的部分 \`jgzx/xwzx\` 作为参数填入，此时路由为 [\`/beijingprice/jgzx/xwzx\`](https://rsshub.app/beijingprice/jgzx/xwzx)。
:::

#### [价格资讯](https://www.beijingprice.cn/jgzx/xwzx/)

| [新闻资讯](https://www.beijingprice.cn/jgzx/xwzx/)     | [工作动态](https://www.beijingprice.cn/jgzx/gzdt/)     | [各区动态](https://www.beijingprice.cn/jgzx/gqdt/)     | [通知公告](https://www.beijingprice.cn/jgzx/tzgg/)     | [价格早报](https://www.beijingprice.cn/jgzx/jgzb/)     |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| [jgzx/xwzx](https://rsshub.app/beijingprice/jgzx/xwzx) | [jgzx/gzdt](https://rsshub.app/beijingprice/jgzx/gzdt) | [jgzx/gqdt](https://rsshub.app/beijingprice/jgzx/gqdt) | [jgzx/tzgg](https://rsshub.app/beijingprice/jgzx/tzgg) | [jgzx/jgzb](https://rsshub.app/beijingprice/jgzx/jgzb) |

#### [综合信息](https://www.beijingprice.cn/zhxx/cbjs/)

| [价格听证](https://www.beijingprice.cn/zhxx/jgtz/)     | [价格监测定点单位名单](https://www.beijingprice.cn/zhxx/jgjcdddwmd/) | [部门预算决算](https://www.beijingprice.cn/bmys/) |
| ------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------- |
| [zhxx/jgtz](https://rsshub.app/beijingprice/zhxx/jgtz) | [zhxx/jgjcdddwmd](https://rsshub.app/beijingprice/zhxx/jgjcdddwmd)   | [bmys](https://rsshub.app/beijingprice/bmys)      |
    `,
        categories: [`government`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`beijingprice.cn/:category?`],
                target: (e) => {
                    let t = e.category;
                    return `/beijingprice${t ? `/${t}` : ``}`;
                },
            },
            { title: `价格资讯 - 新闻资讯`, source: [`beijingprice.cn/jgzx/xwzx/`], target: `/jgzx/xwzx` },
            { title: `价格资讯 - 工作动态`, source: [`beijingprice.cn/jgzx/gzdt/`], target: `/jgzx/gzdt` },
            { title: `价格资讯 - 各区动态`, source: [`beijingprice.cn/jgzx/gqdt/`], target: `/jgzx/gqdt` },
            { title: `价格资讯 - 通知公告`, source: [`beijingprice.cn/jgzx/tzgg/`], target: `/jgzx/tzgg` },
            { title: `价格资讯 - 价格早报`, source: [`beijingprice.cn/jgzx/jgzb/`], target: `/jgzx/jgzb` },
            { title: `综合信息 - 价格听证`, source: [`beijingprice.cn/zhxx/jgtz/`], target: `/zhxx/jgtz` },
            { title: `综合信息 - 价格监测定点单位名单`, source: [`beijingprice.cn/zhxx/jgjcdddwmd/`], target: `/zhxx/jgjcdddwmd` },
            { title: `综合信息 - 部门预算决算`, source: [`beijingprice.cn/bmys/`], target: `/bmys` },
        ],
    };
export { i as handler, a as route };
