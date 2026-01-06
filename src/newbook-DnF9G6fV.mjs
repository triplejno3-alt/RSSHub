import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = {
    path: String.raw`/lib/space/:path{newbook.*}`,
    name: `图书馆 - 新书速递`,
    url: `space.lib.buaa.edu.cn/mspace/newBook`,
    maintainers: [`OverflowCat`],
    example: `/buaa/lib/space/newbook/`,
    handler: u,
    description:
        '可通过参数进行筛选：`/buaa/lib/space/newbook/key1=value1&key2=value2...`\n- `dcpCode`：学科分类代码\n  - 例：\n    - 工学：`08`\n    - 工学 > 计算机 > 计算机科学与技术：`080901`\n  - 默认值：`nolimit`\n  - 注意事项：不可与 `clsNo` 同时使用。\n- `clsNo`：中图分类号\n  - 例：\n    - 计算机科学：`TP3`\n  - 默认值：无\n  - 注意事项\n    - 不可与 `dcpCode` 同时使用。\n    - 此模式下获取不到上架日期。\n- `libCode`：图书馆代码\n  - 例：\n    - 本馆：`00000`\n  - 默认值：无\n  - 注意事项：只有本馆一个可选值。\n- `locaCode`：馆藏地代码\n  - 例：\n    - 五层西-中文新书借阅室(A-Z类)：`02503`\n  - 默认值：无\n  - 注意事项：必须与 `libCode` 同时使用。\n\n示例：\n- `buaa/lib/space/newbook` 为所有新书\n- `buaa/lib/space/newbook/clsNo=U&libCode=00000&locaCode=60001` 为沙河教2图书馆所有中图分类号为 U（交通运输）的书籍\n',
    categories: [`university`],
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
};
async function u(e) {
    let t = e.req.param(`path`),
        r = t.indexOf(`/`),
        i = r === -1 ? `` : t.slice(r + 1),
        a = new URLSearchParams(i),
        o = a.get(`dcpCode`),
        s = a.get(`clsNo`);
    if (o && s) throw Error(`dcpCode and clsNo cannot be used at the same time`);
    (a.set(`pageSize`, `100`), a.set(`page`, `1`), !o && !s && a.set(`dcpCode`, `nolimit`));
    let { data: c } = await n(`https://space.lib.buaa.edu.cn/meta-local/opac/new/100/${s ? `byclass` : `bysubject`}?${a.toString()}`),
        l = c?.data?.dataList || [];
    return {
        title: `北航图书馆 - 新书速递`,
        item: await Promise.all(l.map(async (e) => await d(e))),
        description: `北京航空航天大学图书馆新书速递`,
        language: `zh-CN`,
        link: `https://space.lib.buaa.edu.cn/space/newBook`,
        author: `北京航空航天大学图书馆`,
        allowEmpty: !0,
        image: `https://lib.buaa.edu.cn/apple-touch-icon.png`,
    };
}
async function d(n) {
    return await e.tryGet(n.isbn, async () => {
        let e = await f(n.isbn),
            l = JSON.parse(n.holdings),
            u = `https://space.lib.buaa.edu.cn/space/searchDetailLocal/${n.bibId}`,
            d = s(
                o(i, {
                    children: [
                        e?.imageUrl ? a(`aside`, { children: a(`img`, { src: e.imageUrl, alt: `封面` }) }) : null,
                        a(`h2`, { children: `书籍信息` }),
                        o(`div`, {
                            children: [
                                a(`span`, { class: `call-no`, style: `font-family: JetBrainsMono, monospace; font-style: italic; font-weight: 700; color: #458f57;`, children: n.callno?.at(0) || `无` }),
                                ` `,
                                `/ `,
                                a(`span`, { class: `author`, children: n.author }),
                                ` / `,
                                a(`span`, { class: `publisher`, children: n.publisher }),
                                ` / `,
                                a(`span`, { class: `pub-year`, children: n.pub_year }),
                            ],
                        }),
                        a(`h3`, { children: `简介` }),
                        a(`div`, { itemprop: `description`, children: e?.content }),
                        a(`table`, {
                            children: o(`tbody`, {
                                children: [
                                    o(`tr`, { children: [a(`th`, { children: `ISBN` }), a(`td`, { itemprop: `isbn`, children: n.isbn })] }),
                                    o(`tr`, { children: [a(`th`, { children: `语言` }), a(`td`, { itemprop: `language`, children: n.language })] }),
                                    o(`tr`, { children: [a(`th`, { children: `类型` }), a(`td`, { itemprop: `docType`, children: n.docTypeDesc })] }),
                                ],
                            }),
                        }),
                        e?.authorInfo ? o(i, { children: [a(`h3`, { children: `作者简介` }), a(`div`, { itemprop: `authorInfo`, children: e.authorInfo })] }) : null,
                        a(`h2`, { children: `馆藏信息` }),
                        n.onSelfDate ? o(i, { children: [a(`strong`, { children: `上架时间` }), `：`, a(`date`, { datetime: n.onSelfDate, children: n.onSelfDate })] }) : null,
                        a(`br`, {}),
                        a(`h3`, { children: `馆藏地点` }),
                        a(`table`, {
                            children: a(`tbody`, {
                                children: l.map((e) =>
                                    o(i, {
                                        children: [
                                            o(`tr`, { children: [a(`th`, { children: `所属馆藏地` }), a(`td`, { children: e.location })] }),
                                            o(`tr`, { children: [a(`th`, { children: `索书号` }), a(`td`, { children: e.callNo })] }),
                                            o(`tr`, { children: [a(`th`, { children: `条码号` }), a(`td`, { children: e.barCode })] }),
                                            o(`tr`, { children: [a(`th`, { children: `编号` }), a(`td`, { children: e.itemId })] }),
                                            o(`tr`, { children: [a(`th`, { children: `书刊状态` }), a(`td`, { style: `color: ${e.status === `可借` ? `#458f57` : `#d86d02`}`, children: e.status })] }),
                                        ],
                                    })
                                ),
                            }),
                        }),
                        e?.catalog ? o(i, { children: [a(`h2`, { children: `目录` }), a(`div`, { itemprop: `catalog`, children: c(e.catalog) })] }) : null,
                    ],
                })
            );
        return { language: n.language === `eng` ? `en` : `zh-CN`, title: n.title, pubDate: n.onSelfDate ? r(t(n.onSelfDate), 8) : void 0, description: d, link: u };
    });
}
async function f(e) {
    let t = await n(`https://space.lib.buaa.edu.cn/meta-local/opac/third_api/douban/${e}/info`);
    return JSON.parse(t.body).data;
}
export { l as route };
