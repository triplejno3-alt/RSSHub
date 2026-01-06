import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { Fragment as r, jsx as i } from 'hono/jsx/jsx-runtime';
import { load as a } from 'cheerio';
import { renderToString as o } from 'hono/jsx/dom/server';
const s = (e) => o(i(r, { children: e?.src ? i(`figure`, { children: i(`img`, { src: e.src, alt: e.alt ?? void 0 }) }) : null })),
    c = {
        path: `/news/:category?`,
        categories: [`new-media`],
        example: `/kamen-rider-official/news`,
        parameters: { category: `Category, see below, すべて by default` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `最新情報`,
        maintainers: [`nczitzk`],
        handler: l,
        description: `| Category                               |
| -------------------------------------- |
| すべて                                 |
| テレビ                                 |
| 映画・V シネマ等                       |
| Blu-ray・DVD、配信等                   |
| 20 作記念グッズ・東映 EC 商品          |
| 石ノ森章太郎生誕 80 周年記念商品       |
| 玩具・カード                           |
| 食品・飲料・菓子                       |
| 子供生活雑貨                           |
| アパレル・大人向け雑貨                 |
| フィギュア・ホビー・一番くじ・プライズ |
| ゲーム・デジタル                       |
| 雑誌・書籍・漫画                       |
| 音楽                                   |
| 映像                                   |
| イベント                               |
| ホテル・レストラン等                   |
| キャンペーン・タイアップ等             |
| その他                                 |
| KAMEN RIDER STORE                      |
| THE 鎧武祭り                           |
| 鎧武外伝                               |
| 仮面ライダーリバイス                   |
| ファイナルステージ                     |
| THE50 周年展                           |
| 風都探偵                               |
| 仮面ライダーギーツ                     |
| 仮面ライダーアウトサイダーズ           |
| 仮面ライダーガッチャード               |
| 仮面ライダー BLACK SUN                 |`,
    };
async function l(r) {
    let i = r.req.param(`category`),
        o = r.req.query(`limit`) ? Number.parseInt(r.req.query(`limit`), 10) : 50,
        c = `https://www.kamen-rider-official.com`,
        l = new URL(`api/v1/news_articles`, c).href,
        u = new URL(`news_articles/${i ? `?category=${i}` : ``}`, c).href,
        { data: d } = await n(u),
        f = d.match(/"buildId":"(.*?)"/)[1],
        p = new URL(`_next/data/${f}/news_articles.json`, c).href,
        { data: m } = await n(p),
        h = m.pageProps.categoryIds[i],
        { data: g } = await n(l, { searchParams: { category_id: h, limit: o, offset: 0 } }),
        _ = g.news_articles
            .slice(0, o)
            .map((e) => ({
                title: e.list_title,
                link: new URL(e.path, c).href,
                description: s(e.list_image_path ? { src: new URL(e.list_image_path, c).href, alt: e.list_title } : void 0),
                author: e.author,
                category: [e.category_name, e.category_2_name].filter(Boolean),
                guid: `kamen-rider-official-${e.id}`,
                pubDate: t(e.release_date),
            }));
    _ = await Promise.all(
        _.map((t) =>
            e.tryGet(t.link, async () => {
                let { data: e } = await n(t.link),
                    r = a(e);
                return (
                    r(`a.c-button`).each(function () {
                        r(this).parent().remove();
                    }),
                    r(`img`).each(function () {
                        r(this).replaceWith(s({ src: r(this).prop(`src`) }));
                    }),
                    (t.title = r(`h1.p-post__title`).text() || t.title),
                    (t.description = r(`main.p-post__main`).html()),
                    (t.author = r(`div.p-post__responsibility p`)
                        .toArray()
                        .map((e) => r(e).text())
                        .join(` / `)),
                    (t.category = [
                        ...new Set(
                            [
                                ...t.category,
                                ...r(`ul.p-post__categories li a.p-post__category`)
                                    .toArray()
                                    .map((e) => r(e).text().trim()),
                            ].filter(Boolean)
                        ),
                    ]),
                    t
                );
            })
        )
    );
    let v = a(d),
        y = new URL(v(`link[rel="icon"]`).prop(`href`), c).href;
    return {
        item: _,
        title: `${v(`title`).text().split(/ー/)[0]}${i ? ` - ${i}` : ``}`,
        link: u,
        description: v(`meta[property="og:description"]`).prop(`content`),
        language: v(`html`).prop(`lang`),
        image: v(`meta[property="og:image"]`).prop(`content`),
        icon: y,
        logo: y,
        subtitle: v(`meta[property="keywords"]`).prop(`content`),
        author: v(`meta[property="og:site_name"]`).prop(`content`),
        allowEmpty: !0,
    };
}
export { c as route };
