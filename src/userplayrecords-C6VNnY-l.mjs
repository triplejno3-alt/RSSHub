import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { Fragment as n, jsx as r, jsxs as i } from 'hono/jsx/jsx-runtime';
import { renderToString as a } from 'hono/jsx/dom/server';
const o = { cookie: e.ncm.cookies, Referer: `https://music.163.com/` },
    s = (e, t, o) =>
        a(
            i(`div`, {
                children: [
                    `排行：`,
                    o + 1,
                    ` 播放次数：`,
                    e.playCount,
                    ` 得分：`,
                    e.score,
                    r(`br`, {}),
                    `歌曲：`,
                    r(`a`, { href: `http://music.163.com/song?id=${t.id}`, children: t.name }),
                    r(`br`, {}),
                    `歌手：`,
                    t.ar.map((e, a) => i(n, { children: [r(`a`, { href: `https://music.163.com/artist?id=${e.id}`, children: e.name }), a < t.ar.length - 1 ? ` / ` : null] })),
                    r(`br`, {}),
                    t.al ? i(n, { children: [`歌曲图：`, r(`img`, { src: t.al.picUrl }), r(`br`, {})] }) : null,
                ],
            })
        );
function c(e) {
    return !e || e.length === 0
        ? [{ title: `暂无听歌排行` }]
        : e.map((e, t) => {
              let n = e.song,
                  r = n.ar.map((e) => e.name).join(`/`),
                  i = s(e, n, t);
              return { title: `[${t + 1}] ${n.name} - ${r}`, link: `http://music.163.com/song?id=${n.id}`, author: r, description: i };
          });
}
const l = {
    path: `/music/user/playrecords/:uid/:type?`,
    categories: [`multimedia`],
    example: `/163/music/user/playrecords/45441555/1`,
    parameters: { uid: `用户 uid, 可在用户主页 URL 中找到`, type: `排行榜类型，0所有时间(默认)，1最近一周` },
    features: {
        requireConfig: [{ name: `NCM_COOKIES`, optional: !0, description: '网易云音乐登陆后的 cookie 值，可在浏览器控制台通过`document.cookie`获取。' }],
        requirePuppeteer: !1,
        antiCrawler: !1,
        supportBT: !1,
        supportPodcast: !1,
        supportScihub: !1,
    },
    name: `用户听歌排行`,
    maintainers: [`alfredcai`],
    handler: u,
};
async function u(e) {
    let n = e.req.param(`uid`),
        r = Number.parseInt(e.req.param(`type`)) || 0,
        i = await t(`https://music.163.com/api/v1/play/record?uid=${n}&type=${r}`, { headers: o }),
        a = r === 1 ? i.data.weekData : i.data.allData;
    return { title: `${r === 1 ? `听歌榜单（最近一周）` : `听歌榜单（所有时间}`} - ${n}}`, link: `https://music.163.com/user/home?id=${n}`, updated: i.headers.date, item: c(a) };
}
export { l as route };
