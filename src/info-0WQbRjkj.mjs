import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './jsonp-helper-CoFLhxde.mjs';
import { Fragment as r, jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { renderToString as o } from 'hono/jsx/dom/server';
import { raw as s } from 'hono/html';
const c = {
    path: `/info/:category?`,
    categories: [`live`],
    example: `/yoasobi-music/info/news`,
    parameters: { category: '`news`, `biography`' },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`www.yoasobi-music.jp/`, `www.yoasobi-music.jp/:category`], target: `/info/:category` }],
    name: `News & Biography`,
    maintainers: [],
    handler: l,
    url: `www.yoasobi-music.jp/`,
};
async function l(r) {
    let i = r.req.param(`category`),
        a = i === `news` ? `start/0/count/-1` : `start/0/count/-1/callback/hotCallback`,
        o = `https://www.yoasobi-music.jp/${i}`,
        s = `https://www.sonymusic.co.jp/json/v2/artist/YOASOBI/${i === `news` ? `information` : `hottopic`}/${a}`,
        c = `LATEST ${i.toUpperCase()}`,
        l = n((await t({ method: `get`, url: s })).data).items.map((e) => {
            let t = i === `biography`,
                n = (() => {
                    let e = [`㊗️`, `🎉`, `🎊`, `🎈`, `🎁`, `🎂`, `🎀`, `🎗`, `🎆`, `🎇`, `🎐`, `🎑`, `🎃`];
                    return e[Math.floor(Math.random() * e.length)];
                })();
            return {
                id: t ? null : e.id,
                guid: t ? `bio:${e.url}` : `news:${e.title}${e.date}`,
                title: t ? `${n} ${e.url}` : e.title,
                category: e.category ?? `Achievement`,
                date: t ? e.url : e.date,
                description: t ? e.kiji : e.article,
                image: t ? (e.image_url === `` ? null : `https://www.sonymusic.co.jp${e.image_url}`) : null,
            };
        });
    return {
        title: c,
        link: o,
        description: `Yoasobi's latest ${i}`,
        item: l.map((t) => ({
            title: t.title,
            description: u(
                t.image,
                t.category,
                t.description.replaceAll(
                    `
`,
                    `<br>`
                )
            ),
            pubDate: e(t.date),
            guid: t.guid,
            link: t.id ? `${o}/${t.id}` : o,
            category: t.category,
        })),
    };
}
const u = (e, t, n) => o(a(r, { children: [e ? i(`img`, { src: e }) : null, t ? a(`p`, { children: [`Category: `, t] }) : null, s(n)] }));
export { c as route };
