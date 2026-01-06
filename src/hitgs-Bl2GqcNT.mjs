import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ intro: e, description: t }) => o(i, { children: [e ? a(`blockquote`, { children: e }) : null, t ? l(t) : null] }),
    d = (e) => c(a(u, { ...e })),
    f = async (r) => {
        let { id: i = `tzgg` } = r.req.param(),
            a = Number.parseInt(r.req.query(`limit`) ?? `10`, 10),
            o = `https://hitgs.hit.edu.cn`,
            c = new URL(`${i}/list.htm`, o).href,
            l = s(await e(c)),
            u = l(`html`).attr(`lang`) ?? `zh`,
            f = [];
        ((f = l(`li.news, div.tbt17`)
            .slice(0, a)
            .toArray()
            .map((e) => {
                let t = l(e),
                    r = t.find(`div.news_title, span.div.news_title, div.bttb2`).text(),
                    i = d({ intro: t.find(`div.news_text, div.jj5`).text() }),
                    a = l(`span.news_meta`).text() || (l(`span.news_days`).text() ? `${l(`span.news_days`).text()}-${l(`span.news_year`).text()}` : `${l(`div.tm-3`).text()}-${l(`div.tm-1`).text()}`),
                    s = t.find(`div.news_title a`).attr(`href`) ?? t.find(`div.bttb2 a`).attr(`href`) ?? t.find(`a`).attr(`href`),
                    c = a;
                return { title: r, description: i, pubDate: n(a), link: s ? new URL(s, o).href : void 0, content: { html: i, text: i }, updated: n(c), language: u };
            })),
            (f = await Promise.all(
                f.map((r) =>
                    r.link
                        ? t.tryGet(r.link, async () => {
                              let t = s(await e(r.link)),
                                  i = t(`h1.arti_title`).text() + t(`h2.arti_title`).text(),
                                  a = d({ description: t(`div.wp_articlecontent`).html() }),
                                  c = t(`span.arti_update`).text().split(/：/).pop()?.trim(),
                                  l = c,
                                  f = { title: i, description: a, pubDate: c ? n(c) : r.pubDate, content: { html: a, text: a }, updated: l ? n(l) : r.updated, language: u },
                                  p = t(`a[sudyfile-attr]`)
                                      .filter((e, n) => !t(n).attr(`href`)?.endsWith(`htm`))
                                      .first(),
                                  m = p.attr(`href`);
                              if (m) {
                                  let e = `application/${m.split(/\./).pop() || `octet-stream`}`,
                                      t = p.attr(`sudyfile-attr`)?.match(/'title':'(.*?)'/)?.[1];
                                  f = { ...f, enclosure_url: new URL(m, o).href, enclosure_type: e, enclosure_title: t || i };
                              }
                              return { ...r, ...f };
                          })
                        : r
                )
            )));
        let p = l(`title`).text(),
            m = l(`p.copyright span`).first().text().split(/©/).pop() ?? ``;
        return { title: `${m ? `${m} - ` : ``}${p}`, description: p, link: c, item: f, allowEmpty: !0, image: l(`div.foot-logo img`).attr(`src`), author: m, language: u, id: c };
    },
    p = {
        path: `/hitgs/:id?`,
        name: `研究生院`,
        url: `hitgs.hit.edu.cn`,
        maintainers: [`hlmu`, `nczitzk`],
        handler: f,
        example: `/hit/hitgs/tzgg`,
        parameters: {
            category: {
                description: '分类，默认为 `tzgg`，即通知公告，可在对应分类页 URL 中找到',
                options: [
                    { label: `通知公告`, value: `tzgg` },
                    { label: `综合新闻`, value: `zhxw` },
                    { label: `高水平课程与学术交流`, value: `gspkcyxsjl` },
                    { label: `国家政策`, value: `gjzc` },
                    { label: `规章制度`, value: `17546` },
                    { label: `办事流程`, value: `17547` },
                    { label: `常见问题`, value: `17548` },
                    { label: `常见下载`, value: `17549` },
                ],
            },
        },
        description: `::: tip
订阅 [通知公告](https://hitgs.hit.edu.cn/tzgg/list.htm)，其源网址为 \`https://hitgs.hit.edu.cn/tzgg/list.htm\`，请参考该 URL 指定部分构成参数，此时路由为 [\`/hit/hitgs/tzgg\`](https://rsshub.app/hit/hitgs/tzgg)。
:::

<details>
  <summary>更多栏目</summary>

| 栏目 | ID |
| - | - |
| [通知公告](https://hitgs.hit.edu.cn/tzgg/list.htm) | [tzgg](https://rsshub.app/hit/hitgs/tzgg) |
| [综合新闻](https://hitgs.hit.edu.cn/zhxw/list.htm) | [zhxw](https://rsshub.app/hit/hitgs/zhxw) |
| [高水平课程与学术交流](https://hitgs.hit.edu.cn/gspkcyxsjl/list.htm) | [gspkcyxsjl](https://rsshub.app/hit/hitgs/gspkcyxsjl) |
| [国家政策](https://hitgs.hit.edu.cn/gjzc/list.htm) | [gjzc](https://rsshub.app/hit/hitgs/gjzc) |
| [规章制度](https://hitgs.hit.edu.cn/17546/list.htm) | [17546](https://rsshub.app/hit/hitgs/17546) |
| [办事流程](https://hitgs.hit.edu.cn/17547/list.htm) | [17547](https://rsshub.app/hit/hitgs/17547) |
| [常见问题](https://hitgs.hit.edu.cn/17548/list.htm) | [17548](https://rsshub.app/hit/hitgs/17548) |
| [常见下载](https://hitgs.hit.edu.cn/17549/list.htm) | [17549](https://rsshub.app/hit/hitgs/17549) |

</details>
`,
        categories: [`university`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`hitgs.hit.edu.cn`, `hitgs.hit.edu.cn/:id/list.htm`],
                target: (e) => {
                    let t = e.id;
                    return `/hit/hitgs${t ? `/${t}` : ``}`;
                },
            },
            { title: `通知公告`, source: [`hitgs.hit.edu.cn/tzgg/list.htm`], target: `/hitgs/tzgg` },
            { title: `综合新闻`, source: [`hitgs.hit.edu.cn/zhxw/list.htm`], target: `/hitgs/zhxw` },
            { title: `高水平课程与学术交流`, source: [`hitgs.hit.edu.cn/gspkcyxsjl/list.htm`], target: `/hitgs/gspkcyxsjl` },
            { title: `国家政策`, source: [`hitgs.hit.edu.cn/gjzc/list.htm`], target: `/hitgs/gjzc` },
            { title: `规章制度`, source: [`hitgs.hit.edu.cn/17546/list.htm`], target: `/hitgs/17546` },
            { title: `办事流程`, source: [`hitgs.hit.edu.cn/17547/list.htm`], target: `/hitgs/17547` },
            { title: `常见问题`, source: [`hitgs.hit.edu.cn/17548/list.htm`], target: `/hitgs/17548` },
            { title: `常见下载`, source: [`hitgs.hit.edu.cn/17549/list.htm`], target: `/hitgs/17549` },
        ],
        view: r.Articles,
    };
export { f as handler, p as route };
