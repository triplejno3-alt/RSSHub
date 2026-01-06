import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as e } from './rss-parser-CKuAfhVS.mjs';
import { i as t, r as n, t as r } from './utils-C9EYn6aX.mjs';
const i = {
        path: `/:keyword`,
        categories: [`multimedia`],
        example: `/chikubi`,
        parameters: { keyword: `導覽列，見下表，默認爲最新` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1, nsfw: !0 },
        name: `Navigation`,
        maintainers: [`SnowAgar25`],
        handler: o,
        description: `| 殿堂 | 動畫 | VR | 漫畫 | 音聲 | CG・イラスト |
| ---- | ----- | -- | ----- | ----- | -- |
| best | video | vr | comic | voice | cg |`,
    },
    a = {
        video: { url: `/nipple-video`, title: `動畫` },
        vr: { url: `/nipple-video-category/cat-nipple-video-vr`, title: `VR` },
        comic: { url: `/comic`, title: `漫畫` },
        voice: { url: `/voice`, title: `音聲` },
        cg: { url: `/cg`, title: `CG` },
    };
async function o(i) {
    let o = i.req.param(`keyword`) ?? ``,
        s = `https://chikubi.jp`;
    if (o === `best`) {
        let { id: e } = await r(`category`, `nipple-best`),
            t = await n(`category`, e);
        return { title: `殿堂 - chikubi.jp`, link: `${s}/best-nipple-article`, item: t };
    } else {
        let { url: n, title: r } = a[o],
            i = await t((await e.parseURL(`${s}${n}/feed`)).items.map((e) => ({ title: e.title, link: e.link })));
        return { title: `${r} - chikubi.jp`, link: `${s}${n}`, item: i };
    }
}
export { i as route };
