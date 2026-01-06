import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
    path: `/search/:type?/:caty?/:period?/:order?/:rating?/:keyword?`,
    categories: [`picture`],
    view: r.Pictures,
    example: `/fantia/search/posts/all/daily`,
    parameters: {
        type: {
            description: 'Type, see the table below, `posts` by default',
            options: [
                { value: `fanclubs`, label: `クリエイター` },
                { value: `posts`, label: `投稿` },
                { value: `products`, label: `商品` },
                { value: `commissions`, label: `コミッション` },
            ],
            default: `posts`,
        },
        caty: {
            description: 'Category, see the table below, can also be found in search page URL, `すべてのクリエイター` by default',
            options: [
                { value: `all`, label: `すべてのクリエイター` },
                { value: `illust`, label: `イラスト` },
                { value: `comic`, label: `漫画` },
                { value: `cosplay`, label: `コスプレ` },
                { value: `youtuber`, label: `YouTuber・配信者` },
                { value: `vtuber`, label: `Vtuber` },
                { value: `voice`, label: `音声作品・ASMR` },
                { value: `voiceactor`, label: `声優・歌い手` },
                { value: `idol`, label: `アイドル` },
                { value: `anime`, label: `アニメ・映像・写真` },
                { value: `3d`, label: `3D` },
                { value: `game`, label: `ゲーム制作` },
                { value: `music`, label: `音楽` },
                { value: `novel`, label: `小説` },
                { value: `doll`, label: `ドール` },
                { value: `art`, label: `アート・デザイン` },
                { value: `program`, label: `プログラム` },
                { value: `handmade`, label: `創作・ハンドメイド` },
                { value: `history`, label: `歴史・評論・情報` },
                { value: `railroad`, label: `鉄道・旅行・ミリタリー` },
                { value: `shop`, label: `ショップ` },
                { value: `other`, label: `その他` },
            ],
            default: `all`,
        },
        period: {
            description: `Ranking period, see the table below, empty by default`,
            options: [
                { value: `daily`, label: `デイリー` },
                { value: `weekly`, label: `ウィークリー` },
                { value: `monthly`, label: `マンスリー` },
                { value: `all`, label: `全期間` },
            ],
            default: ``,
        },
        order: {
            description: 'Sorting, see the table below, `更新の新しい順` by default',
            options: [
                { value: `updater`, label: `更新の新しい順` },
                { value: `update_old`, label: `更新の古い順` },
                { value: `newer`, label: `投稿の新しい順` },
                { value: `create_old`, label: `投稿の古い順` },
                { value: `popular`, label: `お気に入り数順` },
            ],
            default: `updater`,
        },
        rating: {
            description: 'Rating, see the table below, `すべて` by default',
            options: [
                { value: `all`, label: `すべて` },
                { value: `general`, label: `一般のみ` },
                { value: `adult`, label: `R18 のみ` },
            ],
            default: `all`,
        },
        keyword: `Keyword, empty by default`,
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `Search`,
    maintainers: [`nczitzk`],
    handler: a,
    description: `Type

| クリエイター | 投稿  | 商品     | コミッション |
| ------------ | ----- | -------- | ------------ |
| fanclubs     | posts | products | commissions  |

  Category

| 分类                   | 分类名     |
| ---------------------- | ---------- |
| イラスト               | illust     |
| 漫画                   | comic      |
| コスプレ               | cosplay    |
| YouTuber・配信者       | youtuber   |
| Vtuber                 | vtuber     |
| 音声作品・ASMR         | voice      |
| 声優・歌い手           | voiceactor |
| アイドル               | idol       |
| アニメ・映像・写真     | anime      |
| 3D                     | 3d         |
| ゲーム制作             | game       |
| 音楽                   | music      |
| 小説                   | novel      |
| ドール                 | doll       |
| アート・デザイン       | art        |
| プログラム             | program    |
| 創作・ハンドメイド     | handmade   |
| 歴史・評論・情報       | history    |
| 鉄道・旅行・ミリタリー | railroad   |
| ショップ               | shop       |
| その他                 | other      |

  Ranking period

| デイリー | ウィークリー | マンスリー | 全期間 |
| -------- | ------------ | ---------- | ------ |
| daily    | weekly       | monthly    | all    |

  Sorting

| 更新の新しい順 | 更新の古い順 | 投稿の新しい順 | 投稿の古い順 | お気に入り数順 |
| -------------- | ------------ | -------------- | ------------ | -------------- |
| updater        | update_old  | newer          | create_old  | popular        |

  Rating

| すべて | 一般のみ | R18 のみ |
| ------ | -------- | -------- |
| all    | general  | adult    |`,
};
async function a(r) {
    let i = r.req.param(`type`) || `posts`,
        a = r.req.param(`caty`) || ``,
        o = r.req.param(`order`) || `updater`,
        s = r.req.param(`rating`) || `all`,
        c = r.req.param(`keyword`) || ``,
        l = r.req.param(`period`) || ``,
        u = `https://fantia.jp`,
        d = `${u}/api/v1/search/${i}?keyword=${c}&peroid=${l}&brand_type=0&category=${a === `all` ? `` : a}&order=${o}${s === `all` ? `` : s === `general` ? `&rating=general` : `&adult=1`}&per_page=30`,
        f = await n({ method: `get`, url: d, headers: { Cookie: e.fantia.cookies ?? `` } }),
        p = {};
    switch (i) {
        case `fanclubs`:
            p = f.data.fanclubs.map((e) => ({ title: e.fanclub_name_with_creator_name, link: `${u}/fanclubs/${e.id}`, description: `${e.icon ? `<img src="${e.icon.main}">` : ``}"><p>${e.title}</p>` }));
            break;
        case `posts`:
            p = f.data.posts.map((e) => ({
                title: e.title,
                link: `${u}/posts/${e.id}`,
                pubDate: t(e.posted_at),
                author: e.fanclub.fanclub_name_with_creator_name,
                description: `${e.comment ? `<p>${e.comment}</p>` : ``}<img src="${e.thumb ? e.thumb.main : e.thumb_micro}">`,
            }));
            break;
        case `products`:
            p = f.data.products.map((e) => ({
                title: e.name,
                link: `${u}/products/${e.id}`,
                author: e.fanclub.fanclub_name_with_creator_name,
                description: `${e.buyable_lowest_plan.description ? `<p>${e.buyable_lowest_plan.description}</p>` : ``}<img src="${e.thumb ? e.thumb.main : e.thumb_micro}">`,
            }));
            break;
        case `commissions`:
            p = f.data.commissions.map((e) => ({
                title: e.name,
                link: `${u}/commissions/${e.id}`,
                author: e.fanclub.fanclub_name_with_creator_name,
                description: `${e.buyable_lowest_plan.description ? `<p>${e.buyable_lowest_plan.description}</p>` : ``}<img src="${e.thumb ? e.thumb.main : e.thumb_micro}">`,
            }));
            break;
    }
    return { title: `Fantia - Search ${i}`, link: d.replace(`api/v1/search/`, ``), item: p };
}
export { i as route };
