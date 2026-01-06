import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import o from 'dayjs';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
import l from 'dayjs/plugin/localizedFormat.js';
import { JSDOM as u } from 'jsdom';
import 'dayjs/locale/zh-cn.js';
const d = ({ item: e, software: t, releaseDatetime: a }) => {
    let o = t.normalPlayersNum ? (t.normalPlayersNum.max === t.normalPlayersNum.min ? t.normalPlayersNum.max : `${t.normalPlayersNum.min}-${t.normalPlayersNum.max}`) : void 0;
    return s(
        i(n, {
            children: [
                t.coverImage ? r(`img`, { src: `https:${t.coverImage}` }) : e.description ? r(n, { children: c(e.description) }) : null,
                r(`h1`, { children: t.descriptionTitle }),
                t.descriptionContent
                    ? i(n, {
                          children: [
                              c(
                                  t.descriptionContent.replaceAll(
                                      `
`,
                                      `<br>`
                                  )
                              ),
                              r(`br`, {}),
                              r(`br`, {}),
                          ],
                      })
                    : null,
                i(`table`, {
                    children: [
                        t.price ? i(`tr`, { children: [r(`th`, { children: `建议零售价` }), i(`td`, { children: [t.price, ` `, t.currency] })] }) : null,
                        t.sizeNum ? i(`tr`, { children: [r(`th`, { children: `游戏大小` }), i(`td`, { children: [t.sizeNum, ` `, t.sizeUnit] })] }) : null,
                        t.playMode ? i(`tr`, { children: [r(`th`, { children: `游戏模式` }), r(`td`, { children: t.playMode.join(`, `) })] }) : null,
                        o ? i(`tr`, { children: [r(`th`, { children: `游戏人数` }), r(`td`, { children: o })] }) : null,
                        t.handleSupport ? i(`tr`, { children: [r(`th`, { children: `手柄支持` }), r(`td`, { children: t.handleSupport })] }) : null,
                        t.platform ? i(`tr`, { children: [r(`th`, { children: `平台` }), r(`td`, { children: t.platform })] }) : null,
                        t.publisher ? i(`tr`, { children: [r(`th`, { children: `发行商` }), r(`td`, { children: t.publisher })] }) : null,
                        t.genre ? i(`tr`, { children: [r(`th`, { children: `类型` }), r(`td`, { children: t.genre.join(`/`) })] }) : null,
                        a ? i(`tr`, { children: [r(`th`, { children: `发售日` }), r(`td`, { children: a })] }) : null,
                        t.supportLanguages ? i(`tr`, { children: [r(`th`, { children: `支持语言` }), r(`td`, { children: t.supportLanguages.join(`/`) })] }) : null,
                        t.ageAppropriateInfo
                            ? i(`tr`, {
                                  children: [
                                      r(`th`, { children: `适龄信息` }),
                                      r(`td`, {
                                          children: t.ageAppropriateInfo.text
                                              ? c(
                                                    t.ageAppropriateInfo.text.replaceAll(
                                                        `
`,
                                                        `<br>`
                                                    )
                                                )
                                              : null,
                                      }),
                                  ],
                              })
                            : null,
                    ],
                }),
                r(`br`, {}),
                t.images?.length ? t.images.slice(1).map((e, t) => r(`img`, { src: `https:${e}` }, `${e}-${t}`)) : null,
            ],
        })
    );
};
o.extend(l);
function f(e) {
    let t = {};
    try {
        t = new u(e, { runScripts: `dangerously` }).window.__NUXT__.data[0];
    } catch {
        throw Error(`Nuxt 框架信息提取失败，请报告这个问题`);
    }
    return t;
}
function p(e) {
    return `<img src="${e}"><br/>`;
}
async function m(e) {
    let n = (await t(e)).data;
    return { content: a(n)(`.description`).html() };
}
async function h(n) {
    let r = (await t(n)).data,
        i = a(r),
        o = i(`.detail-body-container`).html(),
        s = i(`.topics-articleHead__date`).text();
    return ((o = o.replaceAll(`src="/topics/`, `src="https://www.nintendo.com.hk/topics/`)), { content: o, pubDate: e(s, `YYYY.M.D`) });
}
var g = {
    ProcessItem: (e, t) =>
        Promise.all(
            e.map(async (e) => {
                let n = await t.tryGet(e.link, () => m(e.link));
                return { ...e, ...n };
            })
        ),
    ProcessNews: (e, t) =>
        Promise.all(
            e.map(async (e) => {
                let n = await t.tryGet(e.url, () => h(`https://www.nintendo.com.hk` + e.url));
                return { ...e, ...n };
            })
        ),
    ProcessNewsChina: (n, r) =>
        Promise.all(
            n.map(async (n) => {
                let i = await r.tryGet(n.link, async () => f((await t(n.link)).data));
                return { ...n, description: n.description + i.newsData.content, category: i.newsData.category, pubDate: e(i.newsData.releaseTime, `x`) };
            })
        ),
    ProcessItemChina: (e, n) =>
        Promise.all(
            e.map(async (e) => {
                if (!e.link.startsWith(`https://www.nintendoswitch.com.cn/software/`)) return e;
                let r = (await n.tryGet(e.link, async () => f((await t(e.link)).data))).data;
                return { ...e, category: [...r.supportLanguages, ...r.genre, ...r.playMode], description: d({ item: e, software: r, releaseDatetime: o(r.releaseDatetime).locale(`zh-cn`).format(`lll`) }) };
            })
        ),
    nuxtReader: f,
    generateImageLink: p,
};
export { g as t };
