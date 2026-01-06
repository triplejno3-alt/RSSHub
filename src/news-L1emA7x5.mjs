import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import { t as e } from './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { Fragment as i, jsx as a, jsxs as o } from 'hono/jsx/jsx-runtime';
import { renderToString as s } from 'hono/jsx/dom/server';
import { raw as c } from 'hono/html';
const l = `https://bbs-api-os.hoyolab.com`,
    u = `https://www.hoyolab.com`,
    d = { 2: 27, 6: 39, 8: 47, 1: 31, 4: 35, 5: 43 },
    f = (e) =>
        e(`hoyolab:gameNameList`, async () => {
            let { data: e } = await r(`https://bbs-api-os-static.hoyolab.com/community/apihub/static/api/getAppConfig`);
            return JSON.parse(e.data.config.hoyolab_game_info_list);
        }),
    p = async (e, t, n) => {
        let r = (await f(n)).find((t) => t.game_id === Number.parseInt(e, 10));
        return { name: r?.game_name_list.find((e) => e.locale === t)?.raw_name ?? r?.game_name_list.find((e) => e.locale === `en-us`)?.raw_name, icon: r?.game_icon };
    },
    m = (e, t) =>
        t(`hoyolab:type:${e}`, async () => {
            let { data: t } = await r(`https://webstatic.hoyoverse.com/admin/mi18n/bbs_oversea/m07281525151831/m07281525151831-${e}.json`);
            return { 1: { title: t.official_notify, sort: `notices` }, 2: { title: t.official_activity, sort: `events` }, 3: { title: t.official_info, sort: `news` } };
        }),
    h = async ({ type: e, gids: t, size: n, language: i }) =>
        (await r({ method: `get`, url: `${l}/community/post/wapi/getNewsList?${new URLSearchParams({ type: e, gids: t, page_size: n }).toString()}`, headers: { 'X-Rpc-Language': i } }))?.data?.data?.list || [],
    g = (e) => e.replaceAll(`<img src="https://hoyolab-upload-private.hoyolab.com/upload`, `<img src="https://upload-os-bbs.hoyolab.com/upload`),
    _ = (e, { language: i }) =>
        Promise.all(
            e.map(async (e) => {
                let a = e.post,
                    o = a.post_id,
                    s = `${l}/community/post/wapi/getPostFull?${new URLSearchParams({ post_id: o, language: i }).toString()}`;
                return await t.tryGet(s, async () => {
                    let t = await r({ method: `get`, url: s, headers: { 'X-Rpc-Language': i } }),
                        c = t?.data?.data?.post?.user?.nickname || ``,
                        l = t?.data?.data?.post?.post?.content || ``;
                    (l === i || !l) && (l = a.content);
                    let d = b({ hasCover: a.has_cover, coverList: e.cover_list, content: g(l) });
                    return { title: a.subject, link: `${u}/article/${o}`, description: d, pubDate: n(a.created_at * 1e3), author: c };
                });
            })
        ),
    v = {
        path: `/news/:language/:gids/:type`,
        categories: [`game`],
        example: `/hoyolab/news/zh-cn/2/2`,
        parameters: { language: `Language`, gids: `Game ID`, type: `Announcement type` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `Official Announcement`,
        maintainers: [`ZenoTian`],
        handler: y,
        description: `| Language         | Code  |
| ---------------- | ----- |
| 简体中文         | zh-cn |
| 繁體中文         | zh-tw |
| 日本語           | ja-jp |
| 한국어           | ko-kr |
| English (US)     | en-us |
| Español (EU)     | es-es |
| Français         | fr-fr |
| Deutsch          | de-de |
| Русский          | ru-ru |
| Português        | pt-pt |
| Español (Latino) | es-mx |
| Indonesia        | id-id |
| Tiếng Việt       | vi-vn |
| ภาษาไทย          | th-th |

| Honkai Impact 3rd | Genshin Impact | Tears of Themis | HoYoLAB | Honkai: Star Rail | Zenless Zone Zero |
| ----------------- | -------------- | --------------- | ------- | ----------------- | ----------------- |
| 1                 | 2              | 4               | 5       | 6                 | 8                 |

| Notices | Events | Info |
| ------- | ------ | ---- |
| 1       | 2      | 3    |`,
    };
async function y(n) {
    try {
        let { type: e, gids: r, language: i } = n.req.param(),
            a = { type: e, gids: r, language: i, size: Number.parseInt(n.req.query(`limit`)) || 15 },
            o = await p(r, i, t.tryGet),
            s = await m(i, t.tryGet),
            c = await _(await h(a), a);
        return { title: `HoYoLAB-${o.name}-${s[e].title}`, link: `${u}/circles/${r}/${d[r]}/official?page_type=${d[r]}&page_sort=${s[e].sort}`, item: c, image: o.icon, icon: o.icon, logo: o.icon };
    } catch (t) {
        e.error(t);
    }
}
const b = ({ hasCover: e, coverList: t, content: n }) => s(o(i, { children: [e ? t?.map((e) => o(i, { children: [a(`img`, { src: e.url }), a(`br`, {})] })) : null, c(n)] }));
export { v as route };
