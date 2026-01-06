import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { i as a, n as o, r as s, t as c } from './utils-BI_C1viF.mjs';
import l from 'node:assert';
import u from 'query-string';
const d = new Set([`day`, `week`, `month`, `day_male`, `day_female`, `day_ai`, `week_original`, `week_rookie`, `day_r18`, `day_r18_ai`, `day_male_r18`, `day_female_r18`, `week_r18`, `week_r18g`]);
function f(e, t, n) {
    return (
        l.ok(d.has(e), `Mode not allow.`),
        s(`https://app-api.pixiv.net/v1/illust/ranking`, {
            headers: { ...a, Authorization: `Bearer ` + n },
            searchParams: u.stringify({ mode: e, filter: `for_ios`, ...(t && { date: `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}` }) }),
        })
    );
}
const p = {
        day: `pixiv 日排行`,
        week: `pixiv 周排行`,
        month: `pixiv 月排行`,
        day_male: `pixiv 受男性欢迎排行`,
        day_female: `pixiv 受女性欢迎排行`,
        week_original: `pixiv 原创作品排行`,
        week_rookie: `pixiv 新人排行`,
        day_r18: `pixiv R-18 日排行`,
        day_r18_ai: `pixiv R-18 AI生成作品排行`,
        day_male_r18: `pixiv R-18 受男性欢迎排行`,
        day_female_r18: `pixiv R-18 受女性欢迎排行`,
        week_r18: `pixiv R-18 周排行`,
        week_r18g: `pixiv R-18G 排行`,
        day_ai: `AI 生成作品排行榜`,
    },
    m = {
        day: `https://www.pixiv.net/ranking.php?mode=daily`,
        week: `https://www.pixiv.net/ranking.php?mode=weekly`,
        month: `https://www.pixiv.net/ranking.php?mode=monthly`,
        day_male: `https://www.pixiv.net/ranking.php?mode=male`,
        day_female: `https://www.pixiv.net/ranking.php?mode=female`,
        day_ai: `https://www.pixiv.net/ranking.php?mode=daily_ai`,
        week_original: `https://www.pixiv.net/ranking.php?mode=original`,
        week_rookie: `https://www.pixiv.net/ranking.php?mode=rookie`,
        day_r18: `https://www.pixiv.net/ranking.php?mode=daily_r18`,
        day_r18_ai: `https://www.pixiv.net/ranking.php?mode=daily_r18_ai`,
        day_male_r18: `https://www.pixiv.net/ranking.php?mode=male_r18`,
        day_female_r18: `https://www.pixiv.net/ranking.php?mode=female_r18`,
        week_r18: `https://www.pixiv.net/ranking.php?mode=weekly_r18`,
        week_r18g: `https://www.pixiv.net/ranking.php?mode=r18g`,
    },
    h = {
        daily: `day`,
        weekly: `week`,
        monthly: `month`,
        male: `day_male`,
        female: `day_female`,
        daily_ai: `day_ai`,
        original: `week_original`,
        rookie: `week_rookie`,
        daily_r18: `day_r18`,
        daily_r18_ai: `day_r18_ai`,
        male_r18: `day_male_r18`,
        female_r18: `day_female_r18`,
        weekly_r18: `week_r18`,
        r18g: `week_r18g`,
    },
    g = {
        path: `/ranking/:mode/:date?`,
        categories: [`social-media`],
        view: r.Pictures,
        example: `/pixiv/ranking/week`,
        parameters: {
            mode: {
                description: `rank type`,
                options: [
                    { value: `day`, label: `daily rank` },
                    { value: `week`, label: `weekly rank` },
                    { value: `month`, label: `monthly rank` },
                    { value: `day_male`, label: `male rank` },
                    { value: `day_felame`, label: `female rank` },
                    { value: `day_ai`, label: `AI-generated work Rankings` },
                    { value: `week_original`, label: `original rank` },
                    { value: `week_rookie`, label: `rookie user rank` },
                    { value: `day_r18`, label: `R-18 daily rank` },
                    { value: `day_r18_ai`, label: `R-18 AI-generated work` },
                    { value: `day_male_r18`, label: `R-18 male rank` },
                    { value: `day_female_r18`, label: `R-18 female rank` },
                    { value: `week_r18`, label: `R-18 weekly rank` },
                    { value: `week_r18g`, label: `R-18G rank` },
                ],
                default: `day`,
            },
            date: 'format: `2018-4-25`',
        },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        name: `Rankings`,
        maintainers: [`EYHN`],
        handler: _,
    };
async function _(r) {
    if (!e.pixiv || !e.pixiv.refreshToken) throw new i(`pixiv RSS is disabled due to the lack of <a href="https://docs.rsshub.app/deploy/config#route-specific-configurations">relevant config</a>`);
    let a = h[r.req.param(`mode`)] ?? r.req.param(`mode`),
        s = r.req.param(`date`) ? new Date(r.req.param(`date`)) : new Date(),
        l = await o(t.tryGet);
    if (!l) throw new i(`pixiv not login`);
    let u = (await f(a, r.req.param(`date`) && s, l)).data.illusts,
        d = `${s.getFullYear()}年${s.getMonth() + 1}月${s.getDate()}日 `;
    return {
        title: (r.req.param(`date`) ? d : ``) + p[a],
        link: m[a],
        description: d + p[a],
        item: u.map((e, t) => {
            let r = c.getImgs(e);
            return {
                title: `#${t + 1} ${e.title}`,
                pubDate: n(e.create_date),
                description: `${e.caption}<br><p>画师：${e.user.name} - 阅览数：${e.total_view} - 收藏数：${e.total_bookmarks}</p><br>${r.join(``)}`,
                link: `https://www.pixiv.net/artworks/${e.id}`,
                author: [{ name: e.user.name, url: `https://www.pixiv.net/users/${e.user.id}`, avatar: e.user.profile_image_urls.medium }],
                category: e.tags.map((e) => e.name),
            };
        }),
    };
}
export { g as route };
