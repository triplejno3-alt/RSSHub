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
const l = `https://hk.on.cc`,
    u = { 'zh-hans': `_cn`, 'zh-hant': `` },
    d = {
        news: { 'zh-hans': `港澳`, 'zh-hant': `港澳` },
        cnnews: { 'zh-hans': `两岸`, 'zh-hant': `兩岸` },
        intnews: { 'zh-hans': `国际`, 'zh-hant': `國際` },
        commentary: { 'zh-hans': `评论`, 'zh-hant': `評論` },
        finance: { 'zh-hans': `产经`, 'zh-hant': `產經` },
    },
    f = {
        path: `/:language/:channel?`,
        categories: [`traditional-media`],
        example: `/oncc/zh-hant/news`,
        parameters: { language: '`zh-hans` 为简体，`zh-hant` 为繁体', channel: `频道，默认为港澳` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `即時新聞`,
        maintainers: [`Fatpandac`],
        handler: p,
        description: '频道参数可以从官网的地址中获取，如：\n\n  `https://hk.on.cc/hk/finance/index_cn.html` 对应 `/oncc/zh-hans/finance`\n\n  `https://hk.on.cc/hk/finance/index.html` 对应 `/oncc/zh-hant/finance`',
    };
async function p(r) {
    let i = r.req.param(`language`),
        a = r.req.param(`channel`) ?? `news`,
        s = `${l}/hk/${a}/index${u[i]}.html`,
        c = o((await n.get(s)).data),
        f = c(`#focusNews > div.focusItem[type=article]`)
            .toArray()
            .map((e) => ({ title: c(e).find(`div.focusTitle > span`).text(), link: l + c(e).find(`a:nth-child(1)`).attr(`href`), pubDate: t(c(e).attr(`edittime`), `YYYYMMDDHHmmss`) })),
        p = await Promise.all(
            f.map(
                async (t) => (
                    (t.description = await e.tryGet(t.link, async () => {
                        let e = o((await n.get(t.link)).data);
                        return m({ imageUrl: l + e(`img`).eq(0).attr(`src`), content: e(`div.breakingNewsContent`).html() });
                    })),
                    t
                )
            )
        );
    return { title: `東網 - ${d[a][i]}`, link: s, item: p };
}
const m = ({ imageUrl: e, content: t }) => s(a(r, { children: [i(`img`, { src: e }), t ? c(t) : null] }));
export { f as route };
