import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { jsx as i, jsxs as a } from 'hono/jsx/jsx-runtime';
import { load as o } from 'cheerio';
import { renderToString as s } from 'hono/jsx/dom/server';
const c = {
    path: `/news/breakingnews/:id`,
    categories: [`traditional-media`],
    example: `/udn/news/breakingnews/99`,
    parameters: { id: `类别` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`udn.com/news/breaknews/1/:id`, `udn.com/`] }],
    name: `即時新聞`,
    maintainers: [`miles170`],
    handler: l,
    description: `| 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 11   | 12   | 13   | 99     |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ------ |
| 精選 | 要聞 | 社會 | 地方 | 兩岸 | 國際 | 財經 | 運動 | 娛樂 | 生活 | 股市 | 文教 | 數位 | 不分類 |`,
};
async function l(c) {
    let l = c.req.param(`id`),
        d = `/news/breaknews/1/${l}#breaknews`,
        f = await u(d),
        p = `https://udn.com`,
        m = await n(`${p}/api/more?page=1&channelId=1&cate_id=${l}&type=breaknews`),
        h = await Promise.all(
            m.data.lists.map((c) => {
                let l = c.titleLink.startsWith(`http`) ? c.titleLink : `${p}${c.titleLink}`,
                    u = new URL(l);
                return (
                    (u.query = u.search = ``),
                    (l = u.toString()),
                    e.tryGet(l, async () => {
                        let e = await n(l),
                            u = e.data.match(/<script language=javascript>window\.location\.href="(https?:\/\/[^"]+)"/);
                        u && (e = await n(u[1]));
                        let d = o(e.data),
                            f = d(`script[type="application/ld+json"]`)
                                .eq(0)
                                .text()
                                .trim()
                                .replaceAll(/[\b\t\n]/g, ``),
                            p = f.startsWith(`[`) ? JSON.parse(f)[0] : JSON.parse(f),
                            m = d(`.article-content__editor`),
                            h = d(`.article-body__editor`),
                            g = ``;
                        return (
                            p.image && (g += s(a(`figure`, { children: [i(`picture`, { children: i(`img`, { src: p.image.contentUrl, alt: p.image.name }) }), i(`figurecaption`, { children: p.image.name })] }))),
                            m.length ? (g += m.html()) : h.length && (g += h.html()),
                            p.publisher.name.includes(`轉角國際 udn Global`) &&
                                (g = d(`.story_body_content`)
                                    .html()
                                    .split(/<!--\d+?-->/g)
                                    .slice(1, -1)
                                    .join(``)),
                            {
                                title: c.title,
                                author: [{ name: d(`.article-content__author`).text().match(`中央社`)?.at(0) }, { name: p.publisher.name.match(`轉角國際 udn Global`)?.at(0) }, p.author].filter((e) => !!e.name),
                                description: g,
                                pubDate: r(t(c.time.date, `YYYY-MM-DD HH:mm`), 8),
                                category: [p.articleSection, u ? d(`.article-head li.breadcrumb__item:last > b`).text() : d(`meta[name='subsection']`).attr(`content`), ...p.keywords.split(`,`)],
                                link: l,
                            }
                        );
                    })
                );
            })
        );
    return {
        title: `即時${f} - 聯合新聞網`,
        link: `${p}${d}`,
        description: `udn.com 提供即時新聞以及豐富的政治、社會、地方、兩岸、國際、財經、數位、運動、NBA、娛樂、生活、健康、旅遊新聞，以最即時、多元的內容，滿足行動世代的需求`,
        item: h,
    };
}
const u = async (t) => {
    let r = `https://udn.com/news/breaknews`,
        i = await e.tryGet(r, async () => {
            let e = o((await n(r)).data),
                t = e(`.cate-list__subheader a`)
                    .toArray()
                    .map((t) => ((t = e(t)), [t.attr(`href`), t.text().trim()]));
            return Object.fromEntries(t);
        });
    return t in i ? i[t] : `列表`;
};
export { c as route };
