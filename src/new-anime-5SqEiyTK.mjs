import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
const i = {
    path: `/ani/new_anime`,
    categories: [`anime`],
    view: r.Videos,
    example: `/gamer/ani/new_anime`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ani.gamer.com.tw/`], target: `/new_anime` }],
    name: `動畫瘋 - 最後更新`,
    maintainers: [`maple3142`, `pseudoyu`],
    handler: a,
    url: `ani.gamer.com.tw/`,
};
async function a() {
    let r = `https://ani.gamer.com.tw`,
        { data: i } = await t(`https://api.gamer.com.tw/mobile_app/anime/v3/index.php`);
    return {
        title: `動畫瘋最後更新`,
        link: r,
        item: i.data.newAnime.date.map((t) => ({
            title: `${t.title} ${t.volume}`,
            description: `<img src="${t.cover}">`,
            link: `${r}/animeVideo.php?sn=${t.videoSn}`,
            pubDate: n(e(`${t.upTime} ${t.upTimeHours}`, `MM/DD HH:mm`), 8),
        })),
    };
}
export { i as route };
