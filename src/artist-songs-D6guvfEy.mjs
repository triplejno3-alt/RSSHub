import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './got-CKQ7C9HX.mjs';
import { t } from './playlist-BdstUPwC.mjs';
const n = {
    path: `/music/artist/songs/:id`,
    categories: [`multimedia`],
    example: `/163/music/artist/songs/2116`,
    parameters: { id: `歌手 id, 可在歌手详情页 URL 中找到` },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    name: `歌手歌曲`,
    maintainers: [`ZhongMingKun`],
    handler: r,
};
async function r(n) {
    let r = n.req.param(`id`),
        { data: i } = await e(`https://music.163.com/api/v1/artist/songs`, { headers: { Referer: `https://music.163.com/` }, searchParams: { id: r, private_cloud: `true`, work_type: 1, order: `time`, offset: 0, limit: 100 } }),
        a = i.songs.find(({ ar: e }) => e[0].id === Number.parseInt(r)).ar[0],
        o = i.songs.map((e) => ({
            title: `${e.name} - ${e.ar.map(({ name: e }) => e).join(` / `)}`,
            description: t({ singer: e.ar.map(({ name: e }) => e).join(` / `), album: e.al.name, picUrl: e.al.picUrl }),
            link: `https://music.163.com/#/song?id=${e.id}`,
        }));
    return { title: `${a.name} - 歌手歌曲`, link: `https://music.163.com/#/artist?id=${r}`, description: `网易云音乐 - 歌手歌曲 - ${a.name}`, item: o };
}
export { n as route };
