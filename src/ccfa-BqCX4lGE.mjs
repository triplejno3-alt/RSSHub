import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = async (l) => {
        let { type: u = `1` } = l.req.param(),
            d = l.req.query(`limit`) ? Number.parseInt(l.req.query(`limit`), 10) : 30,
            f = `http://www.ccfa.org.cn`,
            p = new URL(`portal/cn/xiehui_list.jsp?type=${u}`, f).href,
            { data: m } = await n(p),
            h = o(m),
            g = h(`div.page_right ul li`)
                .slice(0, d)
                .toArray()
                .map((e) => {
                    e = h(e);
                    let n = e.find(`a`);
                    return { title: n.text(), pubDate: t(e.find(`span.list_time`).text(), `YYYY/MM/DD`), link: new URL(n.prop(`href`), p).href };
                });
        g = await Promise.all(
            g.map((l) =>
                e.tryGet(l.link, async () => {
                    if (!l.link.includes(`ccfa.org.cn`)) return l;
                    let { data: e } = await n(l.link),
                        u = o(e),
                        d = u(`h2#title`).text(),
                        p = u(`div.artical_info_jianjie`).html(),
                        m = u(`div.news_artical_txt`).html(),
                        h = s(a(r, { children: [p ? i(`blockquote`, { children: p }) : null, m ? c(m) : null] })),
                        g =
                            u(`div.artical_info_left`)
                                .text()
                                .match(/(\d{4}(?:\/\d{2}){2})/)?.[1] ?? void 0;
                    ((l.title = d),
                        (l.description = h),
                        (l.pubDate = g ? t(g, `YYYY/MM/DD`) : l.pubDate),
                        (l.author = u(`div.artical_info_left`)
                            .text()
                            .split(/来源：/)
                            .pop()),
                        (l.content = { html: h, text: u(`div.news_artical_txt`).text() }));
                    let _ =
                        u(`p.download`).length === 0
                            ? void 0
                            : u(`div.news_artical_txt a`)
                                  .toArray()
                                  .find((e) => u(e).prop(`href`)?.includes(`downFiles.do`));
                    return ((l.enclosure_url = _ ? new URL(u(_).prop(`href`), f) : void 0), (l.enclosure_title = _ ? u(_).text() : void 0), l);
                })
            )
        );
        let _ = h(`li.page_tit`).contents().last().text().split(/>/).pop(),
            v = new URL(h(`div.logo img`).prop(`src`), p).href;
        return { title: `${h(`title`).text()} - ${_}`, description: _, link: p, item: g, allowEmpty: !0, image: v, author: h(`meta[property="og:site_name"]`).prop(`content`) };
    },
    u = {
        path: `/:type?`,
        name: `分类`,
        url: `www.ccfa.org.cn`,
        maintainers: [`nczitzk`],
        handler: l,
        example: `/ccfa/1`,
        parameters: { category: '分类，默认为 `1`，即协会动态，可在对应分类页 URL 中找到' },
        description: `::: tip
  若订阅 [协会动态](https://www.ccfa.org.cn/portal/cn/xiehui_list.jsp?type=1)，网址为 \`https://www.ccfa.org.cn/portal/cn/xiehui_list.jsp?type=1\`。截取 \`https://www.ccfa.org.cn/portal/cn/xiehui_list.jsp?type=\` 到末尾的部分 \`1\` 作为参数填入，此时路由为 [\`/ccfa/1\`](https://rsshub.app/ccfa/1)。
:::

| 分类                                                                      | ID                                     |
| ------------------------------------------------------------------------- | -------------------------------------- |
| [协会动态](http://www.ccfa.org.cn/portal/cn/xiehui_list.jsp?type=1)       | [1](https://rsshub.app/ccfa/1)         |
| [行业动态](http://www.ccfa.org.cn/portal/cn/xiehui_list.jsp?type=2)       | [2](https://rsshub.app/ccfa/2)         |
| [政策/报告/标准](http://www.ccfa.org.cn/portal/cn/hybz_list.jsp?type=33)  | [33](https://rsshub.app/ccfa/33)       |
| [行业统计](http://www.ccfa.org.cn/portal/cn/lsbq.jsp?type=10003)          | [10003](https://rsshub.app/ccfa/10003) |
| [创新案例](http://www.ccfa.org.cn/portal/cn/hybzs_list.jsp?type=10004)    | [10004](https://rsshub.app/ccfa/10004) |
| [党建工作](http://www.ccfa.org.cn/portal/cn/xiehui_list.jsp?type=7)       | [7](https://rsshub.app/ccfa/7)         |
| [新消费论坛](http://www.ccfa.org.cn/portal/cn/xiehui_list.jsp?type=10005) | [10005](https://rsshub.app/ccfa/10005) |

#### [政策/报告/标准](http://www.ccfa.org.cn/portal/cn/hybz_list.jsp?type=33)

| 分类                                                                            | ID                               |
| ------------------------------------------------------------------------------- | -------------------------------- |
| [行业报告](http://www.ccfa.org.cn/portal/cn/hybz_list.jsp?type=33)              | [33](https://rsshub.app/ccfa/33) |
| [行业标准](http://www.ccfa.org.cn/portal/cn/hybz_list.jsp?type=34)              | [34](https://rsshub.app/ccfa/34) |
| [行业政策](http://www.ccfa.org.cn/portal/cn/fangyizhuanqu_list.jsp?type=39)     | [39](https://rsshub.app/ccfa/39) |
| [政策权威解读](http://www.ccfa.org.cn/portal/cn/fangyizhuanqu_list.jsp?type=40) | [40](https://rsshub.app/ccfa/40) |
    `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [
                    `www.ccfa.org.cn/portal/cn/xiehui_list.jsp`,
                    `www.ccfa.org.cn/portal/cn/hybz_list.jsp`,
                    `www.ccfa.org.cn/portal/cn/lsbq.jsp`,
                    `www.ccfa.org.cn/portal/cn/hybzs_list.jsp`,
                    `www.ccfa.org.cn/portal/cn/fangyizhuanqu_list.jsp`,
                ],
                target: (e, t) => {
                    t = new URL(t);
                    let n = t.searchParams.get(`type`);
                    return n ? `/${n}` : ``;
                },
            },
            { title: `协会动态`, source: [`www.ccfa.org.cn/portal/cn/xiehui_list.jsp`], target: `/1` },
            { title: `行业动态`, source: [`www.ccfa.org.cn/portal/cn/xiehui_list.jsp`], target: `/2` },
            { title: `政策/报告/标准`, source: [`www.ccfa.org.cn/portal/cn/hybz_list.jsp`], target: `/33` },
            { title: `行业统计`, source: [`www.ccfa.org.cn/portal/cn/lsbq.jsp`], target: `/10003` },
            { title: `创新案例`, source: [`www.ccfa.org.cn/portal/cn/hybzs_list.jsp`], target: `/10004` },
            { title: `党建工作`, source: [`www.ccfa.org.cn/portal/cn/xiehui_list.jsp`], target: `/7` },
            { title: `新消费论坛`, source: [`www.ccfa.org.cn/portal/cn/xiehui_list.jsp`], target: `/10005` },
            { title: `政策/报告/标准 - 行业报告`, source: [`www.ccfa.org.cn/portal/cn/hybz_list.jsp`], target: `/33` },
            { title: `政策/报告/标准 - 行业标准`, source: [`www.ccfa.org.cn/portal/cn/hybz_list.jsp`], target: `/34` },
            { title: `政策/报告/标准 - 行业政策`, source: [`www.ccfa.org.cn/portal/cn/fangyizhuanqu_list.jsp`], target: `/39` },
            { title: `政策/报告/标准 - 政策权威解读`, source: [`www.ccfa.org.cn/portal/cn/fangyizhuanqu_list.jsp`], target: `/40` },
        ],
    };
export { l as handler, u as route };
