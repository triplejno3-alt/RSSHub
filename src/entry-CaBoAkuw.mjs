import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = {
    path: `/entry/:id`,
    categories: [`anime`],
    example: `/cngal/entry/2693`,
    parameters: { id: `词条ID，游戏或制作者页面URL的最后一串数字` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.cngal.org/entries/index/:id`] }],
    name: `制作者 / 游戏新闻`,
    maintainers: [`kmod-midori`],
    handler: c,
};
async function c(r) {
    let i = r.req.param(`id`),
        a = await t(`https://api.cngal.org/api/entries/GetEntryView/${i}`),
        o = a.data;
    return (
        r.set(`json`, a.data),
        { title: `CnGal - ${o.name} 的动态`, link: `https://www.cngal.org/entries/index/${i}`, item: o.newsOfEntry.map((t) => ({ title: t.title, description: l(t), pubDate: n(e(t.happenedTime), 8), link: t.link })) }
    );
}
const l = (e) => o(a(r, { children: [i(`p`, { children: e.briefIntroduction }), e.image ? i(`img`, { src: e.image }) : null] }));
export { s as route };
