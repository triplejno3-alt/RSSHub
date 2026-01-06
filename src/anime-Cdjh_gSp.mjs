import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './types-Bl_lnefZ.mjs';
const n = {
    path: `/ani/anime/:sn`,
    categories: [`anime`],
    view: t.Videos,
    example: `/gamer/ani/anime/36868`,
    parameters: { sn: `動畫 sn，在 URL 可以找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`ani.gamer.com.tw/`], target: `/anime/:sn` }],
    name: `動畫瘋 - 動畫`,
    maintainers: [`maple3142`, `pseudoyu`],
    handler: r,
};
async function r(t) {
    let { sn: n } = t.req.param(),
        { data: r } = await e(`https://api.gamer.com.tw/mobile_app/anime/v3/video.php`, { searchParams: { sn: n } });
    if (r.error) throw Error(r.error.message);
    let i = r.data.anime,
        a = i.title.replaceAll(/\[\d+?]$/g, ``).trim(),
        o = i.volumes[0].map((e) => ({ title: `${a} 第 ${e.volume} 集`, description: `<img src="${e.cover}">`, link: `https://ani.gamer.com.tw/animeVideo.php?sn=${e.video_sn}` })).toReversed();
    return { title: a, link: `https://ani.gamer.com.tw/animeRef.php?sn=${i.anime_sn}`, description: i.content?.trim(), item: o };
}
export { n as route };
