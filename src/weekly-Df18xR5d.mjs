import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './types-Bl_lnefZ.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = {
    path: `/weekly`,
    categories: [`anime`],
    view: n.Articles,
    example: `/cngal/weekly`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.cngal.org/`, `www.cngal.org/weeklynews`] }],
    name: `每周速报`,
    maintainers: [`kmod-midori`],
    handler: l,
    url: `www.cngal.org/`,
};
async function l() {
    return {
        title: `CnGal - 每周速报`,
        link: `https://www.cngal.org/weeklynews`,
        item: (await t(`https://api.cngal.org/api/news/GetWeeklyNewsOverview`)).data.map((t) => ({ title: t.name, description: u(t), pubDate: e(t.lastEditTime), link: `https://www.cngal.org/articles/index/${t.id}` })),
    };
}
const u = (e) => {
    let t = e.briefIntroduction
        ? e.briefIntroduction.trim().replaceAll(
              `
`,
              `<br>`
          )
        : ``;
    return o(a(r, { children: [i(`p`, { children: t ? s(t) : null }), e.mainImage ? i(`img`, { src: e.mainImage }) : null] }));
};
export { c as route };
