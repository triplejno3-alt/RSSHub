import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = async (i) => {
        let { category: a = `xwdt` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 20,
            s = `https://mba.bnu.edu.cn`,
            c = new URL(`${a.replace(/\/$/, ``)}/`, s).href,
            { data: l } = await n(c),
            u = r(l),
            d = u(`html`).prop(`lang`),
            f = u(`ul.concrcc li`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = u(e);
                    let n = e.find(`a.listlj`);
                    return { title: n.text(), pubDate: t(e.find(`div.crq`).text()), link: new URL(n.prop(`href`), c).href, language: d };
                });
        f = await Promise.all(
            f.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = r(e),
                        o = a(`div.connewst`).text(),
                        s = a(`div.concrczw`).html(),
                        c = a(`div.concrczw img`).first().prop(`src`);
                    return (
                        (i.title = o),
                        (i.description = s),
                        (i.pubDate = t(a(`div.connewstis-time`).text().split(/：/).pop())),
                        (i.content = { html: s, text: a(`div.concrczw`).text() }),
                        (i.image = c),
                        (i.banner = c),
                        (i.language = d),
                        i
                    );
                })
            )
        );
        let p = u(`title`).text(),
            m = new URL(`images/logo5.png`, s).href;
        return { title: `${p} - ${u(`div.concrchbt`).text()}`, link: c, item: f, allowEmpty: !0, image: m, author: p, language: d };
    },
    a = {
        path: `/mba/:category{.+}?`,
        name: `经济与工商管理学院MBA`,
        url: `mba.bnu.edu.cn`,
        maintainers: [`nczitzk`],
        handler: i,
        example: `/bnu/mba/xwdt`,
        parameters: { category: `分类，默认为 xwdt，即新闻聚焦` },
        description: `::: tip
  若订阅 [新闻聚焦](https://mba.bnu.edu.cn/xwdt/index.html)，网址为 \`https://mba.bnu.edu.cn/xwdt/index.html\`。截取 \`https://mba.bnu.edu.cn/\` 到末尾 \`/index.html\` 的部分 \`xwdt\` 作为参数填入，此时路由为 [\`/bnu/mba/xwdt\`](https://rsshub.app/bnu/mba/xwdt)。
:::

#### [主页](https://mba.bnu.edu.cn)

| [新闻聚焦](https://mba.bnu.edu.cn/xwdt/index.html) | [通知公告](https://mba.bnu.edu.cn/tzgg/index.html) | [MBA 系列讲座](https://mba.bnu.edu.cn/mbaxljz/index.html) |
| -------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------- |
| [xwdt](https://rsshub.app/bnu/mba/xwdt)            | [tzgg](https://rsshub.app/bnu/mba/tzgg)            | [mbaxljz](https://rsshub.app/bnu/mba/mbaxljz)             |

#### [招生动态](https://mba.bnu.edu.cn/zsdt/zsjz/index.html)

| [下载专区](https://mba.bnu.edu.cn/zsdt/cjwt/index.html) |
| ------------------------------------------------------- |
| [zsdt/cjwt](https://rsshub.app/bnu/mba/zsdt/cjwt)       |

#### [国际视野](https://mba.bnu.edu.cn/gjhz/hwjd/index.html)

| [海外基地](https://mba.bnu.edu.cn/gjhz/hwjd/index.html) | [学位合作](https://mba.bnu.edu.cn/gjhz/xwhz/index.html) | [长期交换](https://mba.bnu.edu.cn/gjhz/zqjh/index.html) | [短期项目](https://mba.bnu.edu.cn/gjhz/dqxm/index.html) |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| [gjhz/hwjd](https://rsshub.app/bnu/mba/gjhz/hwjd)       | [gjhz/xwhz](https://rsshub.app/bnu/mba/gjhz/xwhz)       | [gjhz/zqjh](https://rsshub.app/bnu/mba/gjhz/zqjh)       | [gjhz/dqxm](https://rsshub.app/bnu/mba/gjhz/dqxm)       |

#### [校园生活](https://mba.bnu.edu.cn/xysh/xszz/index.html)

| [学生组织](https://mba.bnu.edu.cn/xysh/xszz/index.html) |
| ------------------------------------------------------- |
| [xysh/xszz](https://rsshub.app/bnu/mba/xysh/xszz)       |

#### [职业发展](https://mba.bnu.edu.cn/zyfz/xwds/index.html)

| [校外导师](https://mba.bnu.edu.cn/zyfz/xwds/index.html) | [企业实践](https://mba.bnu.edu.cn/zyfz/zycp/index.html) | [就业创业](https://mba.bnu.edu.cn/zyfz/jycy/index.html) |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| [zyfz/xwds](https://rsshub.app/bnu/mba/zyfz/xwds)       | [zyfz/zycp](https://rsshub.app/bnu/mba/zyfz/zycp)       | [zyfz/jycy](https://rsshub.app/bnu/mba/zyfz/jycy)       |
  `,
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`mba.bnu.edu.cn/:category?`],
                target: (e) => {
                    let t = e.category;
                    return t ? `/${t.replace(/\/index\.html$/, ``)}` : ``;
                },
            },
            { title: `新闻聚焦`, source: [`mba.bnu.edu.cn/xwdt/index.html`], target: `/mba/xwdt` },
            { title: `通知公告`, source: [`mba.bnu.edu.cn/tzgg/index.html`], target: `/mba/tzgg` },
            { title: `MBA系列讲座`, source: [`mba.bnu.edu.cn/mbaxljz/index.html`], target: `/mba/mbaxljz` },
            { title: `招生动态 - 下载专区`, source: [`mba.bnu.edu.cn/zsdt/cjwt/index.html`], target: `/mba/zsdt/cjwt` },
            { title: `国际视野 - 海外基地`, source: [`mba.bnu.edu.cn/gjhz/hwjd/index.html`], target: `/mba/gjhz/hwjd` },
            { title: `国际视野 - 学位合作`, source: [`mba.bnu.edu.cn/gjhz/xwhz/index.html`], target: `/mba/gjhz/xwhz` },
            { title: `国际视野 - 长期交换`, source: [`mba.bnu.edu.cn/gjhz/zqjh/index.html`], target: `/mba/gjhz/zqjh` },
            { title: `国际视野 - 短期项目`, source: [`mba.bnu.edu.cn/gjhz/dqxm/index.html`], target: `/mba/gjhz/dqxm` },
            { title: `校园生活 - 学生组织`, source: [`mba.bnu.edu.cn/xysh/xszz/index.html`], target: `/mba/xysh/xszz` },
            { title: `职业发展 - 校外导师`, source: [`mba.bnu.edu.cn/zyfz/xwds/index.html`], target: `/mba/zyfz/xwds` },
            { title: `职业发展 - 企业实践`, source: [`mba.bnu.edu.cn/zyfz/zycp/index.html`], target: `/mba/zyfz/zycp` },
            { title: `职业发展 - 就业创业`, source: [`mba.bnu.edu.cn/zyfz/jycy/index.html`], target: `/mba/zyfz/jycy` },
        ],
    };
export { i as handler, a as route };
