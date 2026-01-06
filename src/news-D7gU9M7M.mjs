import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
import { raw as o } from 'hono/html';
const s = {
        focus: { tc: `要聞`, sc: `要闻` },
        instant: { tc: `快訊`, sc: `快讯` },
        local: { tc: `港澳`, sc: `港澳` },
        greaterchina: { tc: `兩岸`, sc: `两岸` },
        world: { tc: `國際`, sc: `国际` },
        finance: { tc: `財經`, sc: `财经` },
        sports: { tc: `體育`, sc: `体育` },
        parliament: { tc: `法庭`, sc: `法庭` },
        weather: { tc: `天氣`, sc: `天气` },
    },
    c = {
        path: `/news/:category?/:language?`,
        categories: [`traditional-media`],
        example: `/tvb/news`,
        parameters: { category: `分类，见下表，默认为要聞`, language: `语言，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [{ source: [`tvb.com/:language/:category`, `tvb.com/`] }],
        name: `新闻`,
        maintainers: [`nczitzk`],
        handler: l,
        description: `分类

| 要聞  | 快訊    | 港澳  | 兩岸         | 國際  | 財經    | 體育   | 法庭       | 天氣    |
| ----- | ------- | ----- | ------------ | ----- | ------- | ------ | ---------- | ------- |
| focus | instant | local | greaterchina | world | finance | sports | parliament | weather |

  语言

| 繁 | 简 |
| -- | -- |
| tc | sc |`,
    };
async function l(c) {
    let l = c.req.param(`category`) ?? `focus`,
        u = c.req.param(`language`) ?? `tc`,
        d = `https://inews-api.tvb.com`,
        f = `${d}/news/entry/category`,
        p = `${d}/${u}/${l}`,
        m = await t({ method: `get`, url: f, searchParams: { id: l, lang: u, page: 1, limit: c.req.query(`limit`) ?? 50, country: `HK` } }),
        h = m.data.content.map((t) => ({
            title: t.title,
            link: `https://news.tvb.com/${u}/${l}/${t.id}`,
            pubDate: e(t.publish_datetime),
            category: [...t.category.map((e) => e.title), ...t.tags],
            description: a(i(n, { children: [t.desc ? o(t.desc) : null, t.media.image?.map((e) => r(`img`, { src: e.thumbnail.replace(/_\\d+x\\d+\\./, `.`) })) ?? null] })),
        }));
    return { title: `${m.data.meta.title} - ${s[l][u]}`, link: p, item: h };
}
export { c as route };
