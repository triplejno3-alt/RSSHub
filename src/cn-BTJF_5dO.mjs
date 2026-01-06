import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { r } from './common-utils-uYpL50sT.mjs';
import { t as i } from './got-CKQ7C9HX.mjs';
import { t as a } from './timezone-CrV-DT8S.mjs';
import { load as o } from 'cheerio';
import s from 'rss-parser';
const c = new s({ customFields: { item: [`magnet`] }, headers: { 'User-Agent': e.ua }, defaultRSS: 0.9 }),
    l = {
        path: `/cn/*`,
        name: `中文版新闻`,
        example: `/nikkei/cn`,
        maintainers: [`nczitzk`],
        handler: u,
        description:
            '::: tip\n  如 [中国 经济 日经中文网](https://cn.nikkei.com/china/ceconomy.html) 的 URL 为 `https://cn.nikkei.com/china/ceconomy.html` 对应路由为 [`/nikkei/cn/cn/china/ceconomy`](https://rsshub.app/nikkei/cn/cn/china/ceconomy)\n\n  如 [中國 經濟 日經中文網](https://zh.cn.nikkei.com/china/ceconomy.html) 的 URL 为 `https://zh.cn.nikkei.com/china/ceconomy.html` 对应路由为 [`/nikkei/cn/zh/china/ceconomy`](https://rsshub.app/nikkei/cn/zh/china/ceconomy)\n\n  特别地，当 `path` 填入 `rss` 后（如路由为 [`/nikkei/cn/cn/rss`](https://rsshub.app/nikkei/cn/cn/rss)），此时返回的是 [官方 RSS 的内容](https://cn.nikkei.com/rss.html)\n:::',
        radar: [
            {
                title: `中文版新闻`,
                source: [`cn.nikkei.com/:category/:type`, `cn.nikkei.com/:category`, `cn.nikkei.com/`],
                target: (e) => (e.category && e.type ? `/nikkei/cn/cn/${e.category}/${e.type.replace(`.html`, ``)}` : e.category && !e.type ? `/nikkei/cn/cn/${e.category.replace(`.html`, ``)}` : `/nikkei/cn/cn`),
            },
            {
                title: `中文版新聞`,
                source: [`zh.cn.nikkei.com/:category/:type`, `zh.cn.nikkei.com/:category`, `zh.cn.nikkei.com/`],
                target: (e) => (e.category && e.type ? `/nikkei/cn/zh/${e.category}/${e.type.replace(`.html`, ``)}` : e.category && !e.type ? `/nikkei/cn/zh/${e.category.replace(`.html`, ``)}` : `/nikkei/cn/zh`),
            },
        ],
    };
async function u(e) {
    let s = ``,
        l = r(e);
    /^\/cn\/(cn|zh)/.test(l) ? ((s = l.match(/^\/cn\/(cn|zh)/)[1]), (l = l.match(RegExp(String.raw`\/cn\/` + s + `(.*)`))[1])) : (s = `cn`);
    let u = e.req.query(`limit`) ? Number.parseInt(e.req.query(`limit`)) : 25,
        d = `https://${s === `zh` ? `zh.` : ``}cn.nikkei.com`,
        f = l === `/rss`,
        p = `${d}${l}${f ? `.html` : ``}`,
        m,
        h = [],
        g;
    if (f) ((m = await c.parseURL(p)), (h = m.items.slice(0, u).map((e) => ({ title: e.title, link: new URL(e.link, d).href }))));
    else {
        g = o((await i({ method: `get`, url: p })).data);
        let e = new Set();
        h = g(`dt a`)
            .toArray()
            .map((e) => ((e = g(e)), { title: e.text(), link: new URL(e.attr(`href`), p).href }))
            .filter((t) => (e.has(t.link) ? !1 : (e.add(t.link), !0)))
            .slice(0, u);
    }
    return (
        (h = await Promise.all(
            h.map((e) =>
                t.tryGet(e.link, async () => {
                    let t = o((await i({ method: `get`, url: `${e.link}?print=1` })).data),
                        r = t(`#contentDiv div`);
                    return (
                        r.first().remove(),
                        r.last().remove(),
                        (e.pubDate = a(n(e.link.match(/\/\d+-(.*?)\.html/)[1], `YYYY-MM-DD-HH-mm-ss`), 9)),
                        (e.author = t(`meta[name="author"]`).attr(`content`)),
                        (e.title = e.title ?? t(`meta[name="twitter:title"]`).attr(`content`)),
                        (e.description = t(`#contentDiv`).html()?.replaceAll(`&nbsp;`, ``).replaceAll(`<p></p>`, ``)),
                        e
                    );
                })
            )
        )),
        { title: f ? m.title : g(`title`).first().text(), description: f ? m.description : ``, link: p, item: h }
    );
}
export { l as route };
