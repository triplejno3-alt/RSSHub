import { t as e } from './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = (e, t) =>
        o(
            a(r, {
                children: [
                    i(`a`, { href: t, title: `点击进入官网查看`, children: i(`img`, { src: e.mainCoverUrl, alt: e.title }) }),
                    a(`h1`, { children: [e.title, ` `, i(`span`, { style: `font-size: 0.6em; color: darkred;`, children: e.source_id })] }),
                    a(`p`, { children: [i(`b`, { children: `发布者：` }), e.name] }),
                    a(`p`, {
                        children: [
                            i(`b`, { children: `评分：` }),
                            e.rate_average_2dp,
                            ` | `,
                            i(`b`, { children: `评论数：` }),
                            e.review_count,
                            ` | `,
                            i(`b`, { children: `总时长：` }),
                            e.duration,
                            ` | `,
                            i(`b`, { children: `音频来源：` }),
                            e.source_type,
                        ],
                    }),
                    a(`p`, { children: [i(`b`, { children: `价格：` }), a(`span`, { style: `color: #f44336`, children: [e.price, ` JPY`] }), ` | `, i(`b`, { children: `销量：` }), e.dl_count] }),
                    a(`p`, { children: [i(`b`, { children: `分类：` }), e.category] }),
                    a(`p`, { children: [i(`b`, { children: `声优：` }), e.cv] }),
                ],
            })
        ),
    c = {
        path: `/works/:order?/:subtitle?/:sort?`,
        categories: [`multimedia`],
        example: `/asmr-200/works`,
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        parameters: { order: `排序字段，默认按照资源的收录日期来排序，详见下表`, sort: '排序方式，可选 `asc` 和 `desc` ，默认倒序', subtitle: '筛选带字幕音频，可选 `0` 和 `1` ，默认关闭' },
        radar: [{ source: [`asmr-200.com`], target: `asmr-200/works` }],
        name: `最新收录`,
        maintainers: [`hualiong`],
        url: `asmr-200.com`,
        description: `| 发售日期 | 收录日期 | 销量 | 价格 | 评价 | 随机 | RJ号 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| release | create_date | dl_count | price | rate_average_2dp | random | id |`,
        handler: async (r) => {
            let { order: i = `create_date`, sort: a = `desc`, subtitle: o = `0` } = r.req.param();
            return {
                title: `最新收录 - ASMR Online`,
                link: `https://asmr-200.com/`,
                item: (await e(`https://api.asmr-200.com/api/works`, { query: { order: i, sort: a, page: 1, subtitle: o } })).works.map((e) => {
                    let r = e.tags.map((e) => e.name);
                    return (
                        (e.category = r.join(`，`)),
                        (e.cv = e.vas.map((e) => e.name).join(`，`)),
                        {
                            title: e.title,
                            image: e.mainCoverUrl,
                            author: e.name,
                            link: `https://asmr-200.com/work/${e.source_id}`,
                            pubDate: n(t(e.release, `YYYY-MM-DD`), 8),
                            category: r,
                            description: s(e, `https://asmr-200.com/work/${e.source_id}`),
                        }
                    );
                }),
            };
        },
    };
export { c as route };
