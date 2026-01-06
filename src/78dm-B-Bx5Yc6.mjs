import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './timezone-CrV-DT8S.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { load as s } from 'cheerio';
import { renderToString as c } from 'hono/jsx/dom/server';
import { raw as l } from 'hono/html';
const u = ({ images: e, description: t }) =>
        c(o(i, { children: [e?.length ? e.map((e) => (e?.src ? a(`figure`, { children: e.alt ? a(`img`, { src: e.src, alt: e.alt }) : a(`img`, { src: e.src }) }) : null)) : null, t ? l(t) : null] })),
    d = async (i) => {
        let { category: a = `news` } = i.req.param(),
            o = i.req.query(`limit`) ? Number.parseInt(i.req.query(`limit`), 10) : 10,
            c = `https://www.78dm.net`,
            l = new URL(a.includes(`/`) ? `${a}.html` : a, c).href,
            { data: d } = await n(l),
            f = s(d),
            p = f(`html`).prop(`lang`),
            m = f(`section.box-content div.card a.card-title`)
                .slice(0, o)
                .toArray()
                .map((e) => {
                    e = f(e).parent();
                    let n = e.find(`a.card-title`).text(),
                        i = e.find(`a.card-image img`).prop(`data-src`),
                        a = i?.startsWith(`//`) ? `https:${i}` : i,
                        o = u({ images: a ? [{ src: a, alt: n }] : void 0 }),
                        s = e.find(`div.card-info span.item`).last().text(),
                        c = e.find(`a.card-title`).prop(`href`);
                    return {
                        title: n,
                        description: o,
                        pubDate: s && /\d{4}(?:\.\d{2}){2}\s\d{2}:\d{2}/.test(s) ? r(t(s, `YYYY.MM.DD HH:mm`), 8) : void 0,
                        link: c?.startsWith(`//`) ? `https:${c}` : c,
                        category: [
                            ...new Set([
                                ...e
                                    .find(`span.tag-title`)
                                    .toArray()
                                    .map((e) => f(e).text()),
                                e.find(`div.card-info span.item`).first().text(),
                            ]),
                        ].filter(Boolean),
                        image: a,
                        banner: a,
                        language: p,
                    };
                });
        m = await Promise.all(
            m.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = s(e);
                    (a(`i.p-status`).remove(),
                        a(`div.image-text-content p img.lazy`).each((e, t) => {
                            t = a(t);
                            let n = t.prop(`data-src`),
                                r = n?.startsWith(`//`) ? `https:${n}` : n;
                            t.parent().replaceWith(u({ images: r ? [{ src: r, alt: t.prop(`title`) ?? `` }] : void 0 }));
                        }));
                    let o = a(`h2.title`).text(),
                        c = i.description + u({ description: a(`div.image-text-content`).first().html() || void 0 });
                    return (
                        (i.title = o),
                        (i.description = c),
                        (i.pubDate = r(t(a(`p.push-time`).text().split(/：/).pop()), 8)),
                        (i.author = a(`a.push-username`).contents().first().text()),
                        (i.content = { html: c, text: a(`div.image-text-content`).first().text() }),
                        (i.language = p),
                        i
                    );
                })
            )
        );
        let h = f(`title`).text(),
            g = new URL(f(`a.logo img`).prop(`src`), c).href;
        return {
            title: `${h} | ${f(`div.actived`).text()}`,
            description: f(`meta[name="description"]`).prop(`content`),
            link: l,
            item: m,
            allowEmpty: !0,
            image: g,
            author: f(`meta[property="og:site_name"]`).prop(`content`),
            language: p,
        };
    },
    f = {
        path: `/:category{.+}?`,
        name: `分类`,
        url: `78dm.net`,
        maintainers: [`nczitzk`],
        handler: d,
        example: `/78dm/news`,
        parameters: { category: '分类，默认为 `news`，即新品速递，可在对应分类页 URL 中找到' },
        description: `::: tip
  若订阅 [新品速递](https://www.78dm.net/news)，网址为 \`https://www.78dm.net/news\`。截取 \`https://www.78dm.net/\` 到末尾的部分 \`news\` 作为参数填入，此时路由为 [\`/78dm/news\`](https://rsshub.app/78dm/news)。

  若订阅 [精彩评测 - 变形金刚](https://www.78dm.net/eval_list/109/0/0/1.html)，网址为 \`https://www.78dm.net/eval_list/109/0/0/1.html\`。截取 \`https://www.78dm.net/\` 到末尾 \`.html\` 的部分 \`eval_list/109/0/0/1\` 作为参数填入，此时路由为 [\`/78dm/eval_list/109/0/0/1\`](https://rsshub.app/78dm/eval_list/109/0/0/1)。
:::

<details>
<summary>更多分类</summary>

#### [新品速递](https://www.78dm.net/news)

| 分类                                                           | ID                                                                     |
| -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [全部](https://www.78dm.net/news/0/0/0/0/0/0/0/1.html)         | [news/0/0/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/0/0/0/0/0/0/1)   |
| [变形金刚](https://www.78dm.net/news/3/0/0/0/0/0/0/1.html)     | [news/3/0/0/0/0/0/0/1](https://rsshub.app/78dm/news/3/0/0/0/0/0/0/1)   |
| [高达](https://www.78dm.net/news/4/0/0/0/0/0/0/1.html)         | [news/4/0/0/0/0/0/0/1](https://rsshub.app/78dm/news/4/0/0/0/0/0/0/1)   |
| [圣斗士](https://www.78dm.net/news/2/0/0/0/0/0/0/1.html)       | [news/2/0/0/0/0/0/0/1](https://rsshub.app/78dm/news/2/0/0/0/0/0/0/1)   |
| [海贼王](https://www.78dm.net/news/8/0/0/0/0/0/0/1.html)       | [news/8/0/0/0/0/0/0/1](https://rsshub.app/78dm/news/8/0/0/0/0/0/0/1)   |
| [PVC 手办](https://www.78dm.net/news/0/5/0/0/0/0/0/1.html)     | [news/0/5/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/5/0/0/0/0/0/1)   |
| [拼装模型](https://www.78dm.net/news/0/1/0/0/0/0/0/1.html)     | [news/0/1/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/1/0/0/0/0/0/1)   |
| [机甲成品](https://www.78dm.net/news/0/2/0/0/0/0/0/1.html)     | [news/0/2/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/2/0/0/0/0/0/1)   |
| [特摄](https://www.78dm.net/news/0/3/0/0/0/0/0/1.html)         | [news/0/3/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/3/0/0/0/0/0/1)   |
| [美系](https://www.78dm.net/news/0/4/0/0/0/0/0/1.html)         | [news/0/4/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/4/0/0/0/0/0/1)   |
| [GK](https://www.78dm.net/news/0/6/0/0/0/0/0/1.html)           | [news/0/6/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/6/0/0/0/0/0/1)   |
| [扭蛋盒蛋食玩](https://www.78dm.net/news/0/7/0/0/0/0/0/1.html) | [news/0/7/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/7/0/0/0/0/0/1)   |
| [其他](https://www.78dm.net/news/0/8/0/0/0/0/0/1.html)         | [news/0/8/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/8/0/0/0/0/0/1)   |
| [综合](https://www.78dm.net/news/0/9/0/0/0/0/0/1.html)         | [news/0/9/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/9/0/0/0/0/0/1)   |
| [军模](https://www.78dm.net/news/0/10/0/0/0/0/0/1.html)        | [news/0/10/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/10/0/0/0/0/0/1) |
| [民用](https://www.78dm.net/news/0/11/0/0/0/0/0/1.html)        | [news/0/11/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/11/0/0/0/0/0/1) |
| [配件](https://www.78dm.net/news/0/12/0/0/0/0/0/1.html)        | [news/0/12/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/12/0/0/0/0/0/1) |
| [工具](https://www.78dm.net/news/0/13/0/0/0/0/0/1.html)        | [news/0/13/0/0/0/0/0/1](https://rsshub.app/78dm/news/0/13/0/0/0/0/0/1) |

#### [精彩评测](https://www.78dm.net/eval_list)

| 分类                                                      | ID                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| [全部](https://www.78dm.net/eval_list/0/0/0/1.html)       | [eval_list/0/0/0/1](https://rsshub.app/78dm/eval_list/0/0/0/1)     |
| [变形金刚](https://www.78dm.net/eval_list/109/0/0/1.html) | [eval_list/109/0/0/1](https://rsshub.app/78dm/eval_list/109/0/0/1) |
| [高达](https://www.78dm.net/eval_list/110/0/0/1.html)     | [eval_list/110/0/0/1](https://rsshub.app/78dm/eval_list/110/0/0/1) |
| [圣斗士](https://www.78dm.net/eval_list/111/0/0/1.html)   | [eval_list/111/0/0/1](https://rsshub.app/78dm/eval_list/111/0/0/1) |
| [海贼王](https://www.78dm.net/eval_list/112/0/0/1.html)   | [eval_list/112/0/0/1](https://rsshub.app/78dm/eval_list/112/0/0/1) |
| [PVC 手办](https://www.78dm.net/eval_list/115/0/0/1.html) | [eval_list/115/0/0/1](https://rsshub.app/78dm/eval_list/115/0/0/1) |
| [拼装模型](https://www.78dm.net/eval_list/113/0/0/1.html) | [eval_list/113/0/0/1](https://rsshub.app/78dm/eval_list/113/0/0/1) |
| [机甲成品](https://www.78dm.net/eval_list/114/0/0/1.html) | [eval_list/114/0/0/1](https://rsshub.app/78dm/eval_list/114/0/0/1) |
| [特摄](https://www.78dm.net/eval_list/116/0/0/1.html)     | [eval_list/116/0/0/1](https://rsshub.app/78dm/eval_list/116/0/0/1) |
| [美系](https://www.78dm.net/eval_list/117/0/0/1.html)     | [eval_list/117/0/0/1](https://rsshub.app/78dm/eval_list/117/0/0/1) |
| [GK](https://www.78dm.net/eval_list/118/0/0/1.html)       | [eval_list/118/0/0/1](https://rsshub.app/78dm/eval_list/118/0/0/1) |
| [综合](https://www.78dm.net/eval_list/120/0/0/1.html)     | [eval_list/120/0/0/1](https://rsshub.app/78dm/eval_list/120/0/0/1) |

#### [好贴推荐](https://www.78dm.net/ht_list)

| 分类                                                    | ID                                                             |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| [全部](https://www.78dm.net/ht_list/0/0/0/1.html)       | [ht_list/0/0/0/1](https://rsshub.app/78dm/ht_list/0/0/0/1)     |
| [变形金刚](https://www.78dm.net/ht_list/95/0/0/1.html)  | [ht_list/95/0/0/1](https://rsshub.app/78dm/ht_list/95/0/0/1)   |
| [高达](https://www.78dm.net/ht_list/96/0/0/1.html)      | [ht_list/96/0/0/1](https://rsshub.app/78dm/ht_list/96/0/0/1)   |
| [圣斗士](https://www.78dm.net/ht_list/98/0/0/1.html)    | [ht_list/98/0/0/1](https://rsshub.app/78dm/ht_list/98/0/0/1)   |
| [海贼王](https://www.78dm.net/ht_list/99/0/0/1.html)    | [ht_list/99/0/0/1](https://rsshub.app/78dm/ht_list/99/0/0/1)   |
| [PVC 手办](https://www.78dm.net/ht_list/100/0/0/1.html) | [ht_list/100/0/0/1](https://rsshub.app/78dm/ht_list/100/0/0/1) |
| [拼装模型](https://www.78dm.net/ht_list/101/0/0/1.html) | [ht_list/101/0/0/1](https://rsshub.app/78dm/ht_list/101/0/0/1) |
| [机甲成品](https://www.78dm.net/ht_list/102/0/0/1.html) | [ht_list/102/0/0/1](https://rsshub.app/78dm/ht_list/102/0/0/1) |
| [特摄](https://www.78dm.net/ht_list/103/0/0/1.html)     | [ht_list/103/0/0/1](https://rsshub.app/78dm/ht_list/103/0/0/1) |
| [美系](https://www.78dm.net/ht_list/104/0/0/1.html)     | [ht_list/104/0/0/1](https://rsshub.app/78dm/ht_list/104/0/0/1) |
| [GK](https://www.78dm.net/ht_list/105/0/0/1.html)       | [ht_list/105/0/0/1](https://rsshub.app/78dm/ht_list/105/0/0/1) |
| [综合](https://www.78dm.net/ht_list/107/0/0/1.html)     | [ht_list/107/0/0/1](https://rsshub.app/78dm/ht_list/107/0/0/1) |
| [装甲战车](https://www.78dm.net/ht_list/131/0/0/1.html) | [ht_list/131/0/0/1](https://rsshub.app/78dm/ht_list/131/0/0/1) |
| [舰船模型](https://www.78dm.net/ht_list/132/0/0/1.html) | [ht_list/132/0/0/1](https://rsshub.app/78dm/ht_list/132/0/0/1) |
| [飞机模型](https://www.78dm.net/ht_list/133/0/0/1.html) | [ht_list/133/0/0/1](https://rsshub.app/78dm/ht_list/133/0/0/1) |
| [民用模型](https://www.78dm.net/ht_list/134/0/0/1.html) | [ht_list/134/0/0/1](https://rsshub.app/78dm/ht_list/134/0/0/1) |
| [兵人模型](https://www.78dm.net/ht_list/135/0/0/1.html) | [ht_list/135/0/0/1](https://rsshub.app/78dm/ht_list/135/0/0/1) |
</details>
  `,
        categories: [`new-media`],
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportRadar: !0, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        radar: [
            {
                source: [`www.78dm.net/:category?`],
                target: (e) => {
                    let t = e.category?.replace(/\.html$/, ``);
                    return `/78dm${t ? `/${t}` : ``}`;
                },
            },
            { title: `新品速递 - 全部`, source: [`www.78dm.net/news/0/0/0/0/0/0/0/1.html`], target: `/news/0/0/0/0/0/0/0/1` },
            { title: `新品速递 - 变形金刚`, source: [`www.78dm.net/news/3/0/0/0/0/0/0/1.html`], target: `/news/3/0/0/0/0/0/0/1` },
            { title: `新品速递 - 高达`, source: [`www.78dm.net/news/4/0/0/0/0/0/0/1.html`], target: `/news/4/0/0/0/0/0/0/1` },
            { title: `新品速递 - 圣斗士`, source: [`www.78dm.net/news/2/0/0/0/0/0/0/1.html`], target: `/news/2/0/0/0/0/0/0/1` },
            { title: `新品速递 - 海贼王`, source: [`www.78dm.net/news/8/0/0/0/0/0/0/1.html`], target: `/news/8/0/0/0/0/0/0/1` },
            { title: `新品速递 - PVC手办`, source: [`www.78dm.net/news/0/5/0/0/0/0/0/1.html`], target: `/news/0/5/0/0/0/0/0/1` },
            { title: `新品速递 - 拼装模型`, source: [`www.78dm.net/news/0/1/0/0/0/0/0/1.html`], target: `/news/0/1/0/0/0/0/0/1` },
            { title: `新品速递 - 机甲成品`, source: [`www.78dm.net/news/0/2/0/0/0/0/0/1.html`], target: `/news/0/2/0/0/0/0/0/1` },
            { title: `新品速递 - 特摄`, source: [`www.78dm.net/news/0/3/0/0/0/0/0/1.html`], target: `/news/0/3/0/0/0/0/0/1` },
            { title: `新品速递 - 美系`, source: [`www.78dm.net/news/0/4/0/0/0/0/0/1.html`], target: `/news/0/4/0/0/0/0/0/1` },
            { title: `新品速递 - GK`, source: [`www.78dm.net/news/0/6/0/0/0/0/0/1.html`], target: `/news/0/6/0/0/0/0/0/1` },
            { title: `新品速递 - 扭蛋盒蛋食玩`, source: [`www.78dm.net/news/0/7/0/0/0/0/0/1.html`], target: `/news/0/7/0/0/0/0/0/1` },
            { title: `新品速递 - 其他`, source: [`www.78dm.net/news/0/8/0/0/0/0/0/1.html`], target: `/news/0/8/0/0/0/0/0/1` },
            { title: `新品速递 - 综合`, source: [`www.78dm.net/news/0/9/0/0/0/0/0/1.html`], target: `/news/0/9/0/0/0/0/0/1` },
            { title: `新品速递 - 军模`, source: [`www.78dm.net/news/0/10/0/0/0/0/0/1.html`], target: `/news/0/10/0/0/0/0/0/1` },
            { title: `新品速递 - 民用`, source: [`www.78dm.net/news/0/11/0/0/0/0/0/1.html`], target: `/news/0/11/0/0/0/0/0/1` },
            { title: `新品速递 - 配件`, source: [`www.78dm.net/news/0/12/0/0/0/0/0/1.html`], target: `/news/0/12/0/0/0/0/0/1` },
            { title: `新品速递 - 工具`, source: [`www.78dm.net/news/0/13/0/0/0/0/0/1.html`], target: `/news/0/13/0/0/0/0/0/1` },
            { title: `精彩评测 - 全部`, source: [`www.78dm.net/eval_list/0/0/0/1.html`], target: `/eval_list/0/0/0/1` },
            { title: `精彩评测 - 变形金刚`, source: [`www.78dm.net/eval_list/109/0/0/1.html`], target: `/eval_list/109/0/0/1` },
            { title: `精彩评测 - 高达`, source: [`www.78dm.net/eval_list/110/0/0/1.html`], target: `/eval_list/110/0/0/1` },
            { title: `精彩评测 - 圣斗士`, source: [`www.78dm.net/eval_list/111/0/0/1.html`], target: `/eval_list/111/0/0/1` },
            { title: `精彩评测 - 海贼王`, source: [`www.78dm.net/eval_list/112/0/0/1.html`], target: `/eval_list/112/0/0/1` },
            { title: `精彩评测 - PVC手办`, source: [`www.78dm.net/eval_list/115/0/0/1.html`], target: `/eval_list/115/0/0/1` },
            { title: `精彩评测 - 拼装模型`, source: [`www.78dm.net/eval_list/113/0/0/1.html`], target: `/eval_list/113/0/0/1` },
            { title: `精彩评测 - 机甲成品`, source: [`www.78dm.net/eval_list/114/0/0/1.html`], target: `/eval_list/114/0/0/1` },
            { title: `精彩评测 - 特摄`, source: [`www.78dm.net/eval_list/116/0/0/1.html`], target: `/eval_list/116/0/0/1` },
            { title: `精彩评测 - 美系`, source: [`www.78dm.net/eval_list/117/0/0/1.html`], target: `/eval_list/117/0/0/1` },
            { title: `精彩评测 - GK`, source: [`www.78dm.net/eval_list/118/0/0/1.html`], target: `/eval_list/118/0/0/1` },
            { title: `精彩评测 - 综合`, source: [`www.78dm.net/eval_list/120/0/0/1.html`], target: `/eval_list/120/0/0/1` },
            { title: `好贴推荐 - 全部`, source: [`www.78dm.net/ht_list/0/0/0/1.html`], target: `/ht_list/0/0/0/1` },
            { title: `好贴推荐 - 变形金刚`, source: [`www.78dm.net/ht_list/95/0/0/1.html`], target: `/ht_list/95/0/0/1` },
            { title: `好贴推荐 - 高达`, source: [`www.78dm.net/ht_list/96/0/0/1.html`], target: `/ht_list/96/0/0/1` },
            { title: `好贴推荐 - 圣斗士`, source: [`www.78dm.net/ht_list/98/0/0/1.html`], target: `/ht_list/98/0/0/1` },
            { title: `好贴推荐 - 海贼王`, source: [`www.78dm.net/ht_list/99/0/0/1.html`], target: `/ht_list/99/0/0/1` },
            { title: `好贴推荐 - PVC手办`, source: [`www.78dm.net/ht_list/100/0/0/1.html`], target: `/ht_list/100/0/0/1` },
            { title: `好贴推荐 - 拼装模型`, source: [`www.78dm.net/ht_list/101/0/0/1.html`], target: `/ht_list/101/0/0/1` },
            { title: `好贴推荐 - 机甲成品`, source: [`www.78dm.net/ht_list/102/0/0/1.html`], target: `/ht_list/102/0/0/1` },
            { title: `好贴推荐 - 特摄`, source: [`www.78dm.net/ht_list/103/0/0/1.html`], target: `/ht_list/103/0/0/1` },
            { title: `好贴推荐 - 美系`, source: [`www.78dm.net/ht_list/104/0/0/1.html`], target: `/ht_list/104/0/0/1` },
            { title: `好贴推荐 - GK`, source: [`www.78dm.net/ht_list/105/0/0/1.html`], target: `/ht_list/105/0/0/1` },
            { title: `好贴推荐 - 综合`, source: [`www.78dm.net/ht_list/107/0/0/1.html`], target: `/ht_list/107/0/0/1` },
            { title: `好贴推荐 - 装甲战车`, source: [`www.78dm.net/ht_list/131/0/0/1.html`], target: `/ht_list/131/0/0/1` },
            { title: `好贴推荐 - 舰船模型`, source: [`www.78dm.net/ht_list/132/0/0/1.html`], target: `/ht_list/132/0/0/1` },
            { title: `好贴推荐 - 飞机模型`, source: [`www.78dm.net/ht_list/133/0/0/1.html`], target: `/ht_list/133/0/0/1` },
            { title: `好贴推荐 - 民用模型`, source: [`www.78dm.net/ht_list/134/0/0/1.html`], target: `/ht_list/134/0/0/1` },
            { title: `好贴推荐 - 兵人模型`, source: [`www.78dm.net/ht_list/135/0/0/1.html`], target: `/ht_list/135/0/0/1` },
        ],
    };
export { d as handler, f as route };
