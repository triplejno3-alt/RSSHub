import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import { t as r } from './got-CKQ7C9HX.mjs';
import { t as i } from './types-Bl_lnefZ.mjs';
import { t as a } from './invalid-parameter-DGZgOgO2.mjs';
import { t as o } from './config-not-found-DGyG6Tbz.mjs';
import { n as s, t as c } from './readable-social--hCfpJhv.mjs';
import { i as l, n as u, r as d, t as f } from './utils-BI_C1viF.mjs';
import { n as p, r as m, t as h } from './sfw-DmO1rDIf.mjs';
import g from 'query-string';
function _(e, t) {
    return d(`https://app-api.pixiv.net/v1/user/novels`, { headers: { ...l, Authorization: `Bearer ` + t }, searchParams: g.stringify({ user_id: e, filter: `for_ios` }) });
}
async function v(r, i = !1, s = 100) {
    if (!e.pixiv || !e.pixiv.refreshToken)
        throw new o(`This user is an R18 creator, PIXIV_REFRESHTOKEN is required.
pixiv RSS is disabled due to the lack of relevant config.
該用戶爲 R18 創作者，需要 PIXIV_REFRESHTOKEN。`);
    let c = await u(t.tryGet);
    if (!c) throw new o(`pixiv not login`);
    let l = await _(r, c),
        d = s ? l.data.novels.slice(0, s) : l.data.novels;
    if (d.length === 0) throw new a(`${r} is not a valid user ID, or the user has no novels.\n${r} 不是有效的用戶 ID，或者該用戶沒有小說作品。`);
    let h = d[0].user.name,
        g = await Promise.all(
            d.map(async (e) => {
                let t = {
                    title: e.series?.title ? `${e.series.title} - ${e.title}` : e.title,
                    description: `
                    <img src="${f.getProxiedImageUrl(e.image_urls.large)}" />
                    <div>
                    <p>${m(e.caption)}</p>
                    </div>`,
                    author: e.user.name,
                    pubDate: n(e.create_date),
                    link: `https://www.pixiv.net/novel/show.php?id=${e.id}`,
                    category: e.tags.map((e) => e.name),
                };
                if (!i) return t;
                let { content: r } = await p(e.id, c);
                return { ...t, description: `${t.description}<hr>${r}` };
            })
        );
    return { title: `${h}'s novels - pixiv`, description: `${h} 的 pixiv 最新小说`, image: f.getProxiedImageUrl(d[0].user.profile_image_urls.medium), link: `https://www.pixiv.net/users/${r}/novels`, item: g };
}
const y = `https://www.pixiv.net`;
async function b(e, t = !1, i = 100) {
    let a = `${y}/users/${e}/novels`,
        { data: o } = await r(`${y}/ajax/user/${e}/profile/all`, { headers: { referer: a } }),
        s = Object.keys(o.body.novels)
            .toSorted((e, t) => Number(t) - Number(e))
            .slice(0, Number.parseInt(String(i), 10));
    if (s.length === 0) throw Error(`No novels found for this user, or is an R18 creator, fallback to ConfigNotFoundError`);
    let c = new URLSearchParams();
    for (let e of s) c.append(`ids[]`, e);
    let { data: l } = await r(`${y}/ajax/user/${e}/profile/novels`, { headers: { referer: a }, searchParams: c }),
        u = await Promise.all(
            Object.values(l.body.works).map(async (e) => {
                let r = {
                    title: e.title,
                    description: `
                    <img src=${f.getProxiedImageUrl(e.url)} />
                    <div>
                    <p>${e.description}</p>
                    </div>
                `,
                    link: `${y}/novel/show.php?id=${e.id}`,
                    author: e.userName,
                    pubDate: n(e.createDate),
                    updated: n(e.updateDate),
                    category: e.tags,
                };
                if (!t) return r;
                let { content: i } = await h(e.id);
                return { ...r, description: `${r.description}<hr>${i}` };
            })
        );
    return { title: l.body.extraData.meta.title, description: l.body.extraData.meta.ogp.description, image: f.getProxiedImageUrl(Object.values(l.body.works)[0].profileImageUrl), link: a, item: u };
}
const x = {
        path: `/user/novels/:id/:full_content?`,
        categories: [`social-media`],
        view: i.Articles,
        example: `/pixiv/user/novels/27104704`,
        parameters: {
            id: `User id, available in user's homepage URL`,
            full_content: {
                description: `Enable or disable the display of full content. `,
                options: [
                    { value: `true`, label: `true` },
                    { value: `false`, label: `false` },
                ],
                default: `false`,
            },
        },
        features: {
            requireConfig: [
                {
                    name: `PIXIV_REFRESHTOKEN`,
                    optional: !0,
                    description: `
Pixiv 登錄後的 refresh_token，用於獲取 R18 小說
refresh_token after Pixiv login, required for accessing R18 novels
[https://docs.rsshub.app/deploy/config#pixiv](https://docs.rsshub.app/deploy/config#pixiv)`,
                },
            ],
            requirePuppeteer: !1,
            antiCrawler: !1,
            supportBT: !1,
            supportPodcast: !1,
            supportScihub: !1,
            nsfw: !0,
        },
        radar: [
            { title: `User Novels (簡介 Basic info)`, source: [`www.pixiv.net/users/:id/novels`, `www.pixiv.net/users/:id`, `www.pixiv.net/en/users/:id/novels`, `www.pixiv.net/en/users/:id`], target: `/user/novels/:id` },
            { title: `User Novels (全文 Full text)`, source: [`www.pixiv.net/users/:id/novels`, `www.pixiv.net/users/:id`, `www.pixiv.net/en/users/:id/novels`, `www.pixiv.net/en/users/:id`], target: `/user/novels/:id/true` },
        ],
        name: `User Novels`,
        maintainers: [`TonyRL`, `SnowAgar25`],
        handler: C,
        description: `
| 小說類型 Novel Type | full_content | PIXIV_REFRESHTOKEN | 返回內容 Content |
|-------------------|--------------|-------------------|-----------------|
| Non R18           | false        | 不需要 Not Required  | 簡介 Basic info |
| Non R18           | true         | 不需要 Not Required  | 全文 Full text  |
| R18               | false        | 需要 Required       | 簡介 Basic info |
| R18               | true         | 需要 Required       | 全文 Full text  |

Default value for \`full_content\` is \`false\` if not specified.

Example:
- \`/pixiv/user/novels/79603797\` → 簡介 Basic info
- \`/pixiv/user/novels/79603797/true\` → 全文 Full text`,
    },
    S = () => !!(e.pixiv && e.pixiv.refreshToken);
async function C(e) {
    let t = e.req.param(`id`),
        n = c(void 0, s(e.req.param(`full_content`)), !1),
        { limit: r } = e.req.query();
    if (S()) return await v(t, n, r);
    let i = await b(t, n, r).catch((e) => {
        if (e.name === `Error`) return null;
        throw e;
    });
    if (i) return i;
    throw new o(`This user may not have any novel works, or is an R18 creator, PIXIV_REFRESHTOKEN is required.
pixiv RSS is disabled due to the lack of relevant config.
該用戶可能沒有小說作品，或者該用戶爲 R18 創作者，需要 PIXIV_REFRESHTOKEN。`);
}
export { x as route };
