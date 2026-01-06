import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { n as e } from './utils-C9EYn6aX.mjs';
const t = {
    path: `/`,
    categories: [`multimedia`],
    example: `/chikubi`,
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
    name: `最新記事`,
    maintainers: [`SnowAgar25`],
    handler: n,
    radar: [
        { title: `最新記事`, source: [`chikubi.jp/`], target: `/` },
        { title: `殿堂`, source: [`chikubi.jp/best-nipple-article`], target: `/best` },
        { title: `動畫`, source: [`chikubi.jp/nipple-video`], target: `/video` },
        { title: `VR`, source: [`chikubi.jp/nipple-video-category/cat-nipple-video-vr`], target: `/vr` },
        { title: `漫畫`, source: [`chikubi.jp/comic`], target: `/comic` },
        { title: `音聲`, source: [`chikubi.jp/voice`], target: `/voice` },
        { title: `CG・イラスト`, source: [`chikubi.jp/cg`], target: `/cg` },
    ],
};
async function n() {
    return { title: `最新記事 - chikubi.jp`, link: `https://chikubi.jp`, item: await e() };
}
export { t as route };
