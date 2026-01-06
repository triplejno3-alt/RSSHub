import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './playlist-BdstUPwC.mjs';
const r = {
    path: `/music/playlist/:id`,
    categories: [`multimedia`],
    example: `/163/music/playlist/35798529`,
    parameters: { id: `歌单 id, 可在歌单页 URL 中找到` },
    features: {
        requireConfig: [{ name: `NCM_COOKIES`, optional: !0, description: '网易云音乐登陆后的 cookie 值，可在浏览器控制台通过`document.cookie`获取。' }],
        requirePuppeteer: !1,
        antiCrawler: !0,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `歌单歌曲`,
    maintainers: [`DIYgod`],
    handler: i,
};
async function i(r) {
    let i = r.req.param(`id`),
        a = (await t.get(`https://music.163.com/api/v3/playlist/detail?id=${i}`, { headers: { Referer: `https://music.163.com/`, Cookie: e.ncm.cookies } })).data.playlist,
        o = (await t(`https://music.163.com/api/song/detail`, { headers: { Referer: `https://music.163.com` }, searchParams: { ids: `[${a.trackIds.slice(0, 201).map((e) => e.id)}]` } })).data.songs;
    return {
        title: a.name,
        link: `https://music.163.com/#/playlist?id=${i}`,
        description: `网易云音乐歌单 - ${a.name}`,
        item: a.trackIds.slice(0, 201).map((e) => {
            let t = o.find((t) => t.id === e.id),
                r = t.artists.length === 1 ? t.artists[0].name : t.artists.reduce((e, t) => (e.name || e) + `/` + t.name);
            return {
                title: `${t.name} - ${r}`,
                description: n({ singer: r, album: t.album.name, date: new Date(t.album.publishTime).toLocaleDateString(), picUrl: t.album.picUrl }),
                link: `https://music.163.com/song?id=${e.id}`,
                guid: `https://music.163.com/#/song?id=${e.id}`,
                pubDate: new Date(e.at),
                author: r,
            };
        }),
    };
}
export { r as route };
