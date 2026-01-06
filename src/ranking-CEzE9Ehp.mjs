import { t as e } from './ofetch-uhy-qh6X.mjs';
import { t } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './proxy-6vblFdo1.mjs';
import './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as n } from './parse-date-DjdQS_Nt.mjs';
import './got-CKQ7C9HX.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import './puppeteer-BbZGb8cd.mjs';
import { n as i, r as a } from './utils-Bu8-ZFdB.mjs';
import { t as o } from './cache-BV7o58Cb.mjs';
const s = {
        0: { chinese: `全站`, english: `all`, type: `x/rid` },
        1: { chinese: `番剧`, english: `bangumi`, type: `pgc/web` },
        4: { chinese: `国创`, english: `guochuang`, type: `pgc/season` },
        3: { chinese: `纪录片`, english: `documentary`, type: `pgc/season` },
        2: { chinese: `电影`, english: `movie`, type: `pgc/season` },
        5: { chinese: `电视剧`, english: `tv`, type: `pgc/season` },
        7: { chinese: `综艺`, english: `variety`, type: `pgc/season` },
        1005: { chinese: `动画`, english: `douga`, type: `x/rid` },
        1008: { chinese: `游戏`, english: `game`, type: `x/rid` },
        1007: { chinese: `鬼畜`, english: `kichiku`, type: `x/rid` },
        1003: { chinese: `音乐`, english: `music`, type: `x/rid` },
        1004: { chinese: `舞蹈`, english: `dance`, type: `x/rid` },
        1001: { chinese: `影视`, english: `cinephile`, type: `x/rid` },
        1002: { chinese: `娱乐`, english: `ent`, type: `x/rid` },
        1010: { chinese: `知识`, english: `knowledge`, type: `x/rid` },
        1012: { chinese: `科技数码`, english: `tech`, type: `x/rid` },
        1020: { chinese: `美食`, english: `food`, type: `x/rid` },
        1013: { chinese: `汽车`, english: `car`, type: `x/rid` },
        1014: { chinese: `时尚美妆`, english: `fashion`, type: `x/rid` },
        1018: { chinese: `体育运动`, english: `sports`, type: `x/rid` },
        1024: { chinese: `动物`, english: `animal`, type: `x/rid` },
    },
    c = {
        path: `/ranking/:rid?/:embed?/:redirect1?/:redirect2?`,
        name: `排行榜`,
        maintainers: [`DIYgod`, `hyoban`],
        categories: [`social-media`],
        view: r.Videos,
        example: `/bilibili/ranking/all`,
        parameters: {
            rid: {
                description: `排行榜分区代号或 rid，可在 URL 中找到`,
                default: `all`,
                options: Object.values(s)
                    .filter((e) => !e.type.startsWith(`pgc/`))
                    .map((e) => ({ value: e.english, label: e.chinese })),
            },
            embed: `默认为开启内嵌视频，任意值为关闭`,
            redirect1: `留空，用于兼容之前的路由`,
            redirect2: `留空，用于兼容之前的路由`,
        },
        radar: [{ source: [`www.bilibili.com/v/popular/rank/:rid`], target: `/ranking/:rid` }],
        handler: u,
    };
function l(e, t) {
    if (e) {
        let e = s[t];
        return {
            apiBase: `https://api.bilibili.com/x/web-interface/ranking/v2`,
            apiParams: `rid=${t}&type=all&web_location=333.934`,
            referer: `https://www.bilibili.com/v/popular/rank/all`,
            ridChinese: e?.chinese ?? ``,
            ridType: `x/rid`,
            link: `https://www.bilibili.com/v/popular/rank/all`,
        };
    }
    let n = Object.entries(s).find(([e, n]) => n.english === t);
    if (!n) throw Error(`Invalid rid`);
    let r = n[0],
        i = n[1].type,
        a = n[1].chinese,
        o = n[1].english,
        c = `https://api.bilibili.com/x/web-interface/ranking/v2`,
        l = ``;
    switch (i) {
        case `x/rid`:
            l = `rid=${r}&type=all&web_location=333.934`;
            break;
        case `pgc/web`:
            ((c = `https://api.bilibili.com/pgc/web/rank/list`), (l = `day=3&season_type=${r}&web_location=333.934`));
            break;
        case `pgc/season`:
            ((c = `https://api.bilibili.com/pgc/season/rank/web/list`), (l = `day=3&season_type=${r}&web_location=333.934`));
            break;
        default:
            throw Error(`Invalid rid type`);
    }
    return { apiBase: c, apiParams: l, referer: `https://www.bilibili.com/v/popular/rank/${o}`, ridChinese: a, ridType: i, link: `https://www.bilibili.com/v/popular/rank/${o}` };
}
async function u(r) {
    let s = r.req.query(`format`) === `json`,
        c = r.req.param();
    if (c.redirect1 || c.redirect2) {
        let e = c.redirect2 ? `/` + c.redirect2 : ``;
        return (r.set(`redirect`, `/bilibili/ranking/${c.rid}${e}`), null);
    }
    let u = r.req.param(`rid`) || `all`,
        d = !r.req.param(`embed`),
        { apiBase: f, apiParams: p, referer: m, ridChinese: h, link: g, ridType: _ } = l(/^\d+$/.test(u), u);
    if (_.startsWith(`pgc/`)) throw Error(`This type of ranking is not supported yet`);
    let v = await e(`${f}?${p}`, { headers: { Referer: m, origin: `https://www.bilibili.com` } });
    if (v.code !== 0) throw Error(v.message);
    let y = (v.data || v.result).list || [];
    return {
        title: `bilibili 排行榜-${h}`,
        link: g,
        item: await Promise.all(
            y.map(async (e) => {
                let r = s && !t.bilibili.excludeSubtitles && e.bvid ? await o.getVideoSubtitleAttachment(e.bvid) : [];
                return {
                    title: e.title,
                    description: a.renderUGCDescription(d, e.pic, e.desc || e.title, e.aid, void 0, e.bvid),
                    pubDate: e.ctime && n(e.ctime, `X`),
                    author: e.owner.name,
                    link: !e.ctime || (e.ctime > a.bvidTime && e.bvid) ? `https://www.bilibili.com/video/${e.bvid}` : `https://www.bilibili.com/video/av${e.aid}`,
                    image: e.pic,
                    attachments: e.bvid ? [{ url: i(e.bvid), mime_type: `text/html`, duration_in_seconds: e.duration }, ...r] : void 0,
                };
            })
        ),
    };
}
export { c as route };
