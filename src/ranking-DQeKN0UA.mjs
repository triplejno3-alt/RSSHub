import './ofetch-uhy-qh6X.mjs';
import { t as e } from './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { t as r } from './types-Bl_lnefZ.mjs';
import { t as i } from './config-not-found-DGyG6Tbz.mjs';
import { t as a } from './utils-Br3UwJrQ.mjs';
const o = (e, t, n) => {
        let r = [`11`, `17`, `28`, `29`],
            i = [`12`, `13`, `14`, `15`, `17`, `74`, `75`, `71`, `25`];
        return [`pinlei`, `dianshang`].includes(e) && [...r, ...i].includes(t) && n === `3` ? (r.includes(t) ? `2` : `4`) : n;
    },
    s = [
        { value: `pinlei`, label: `好价品类榜` },
        { value: `dianshang`, label: `好价电商榜` },
        { value: `haitao`, label: `海淘 TOP 榜` },
        { value: `haowen`, label: `好文排行榜` },
        { value: `haowu`, label: `好物排行榜` },
    ],
    c = [
        { label: `好价品类榜-全部`, value: `11` },
        { label: `好价品类榜-食品生鲜`, value: `12` },
        { label: `好价品类榜-电脑数码`, value: `13` },
        { label: `好价品类榜-运动户外`, value: `14` },
        { label: `好价品类榜-家用电器`, value: `15` },
        { label: `好价品类榜-白菜`, value: `17` },
        { label: `好价品类榜-服饰鞋包`, value: `74` },
        { label: `好价品类榜-日用百货`, value: `75` },
        { label: `好价电商榜-券活动`, value: `24` },
        { label: `好价电商榜-京东`, value: `23` },
        { label: `好价电商榜-天猫`, value: `25` },
        { label: `好价电商榜-亚马逊中国`, value: `26` },
        { label: `好价电商榜-国美在线`, value: `27` },
        { label: `好价电商榜-苏宁易购`, value: `28` },
        { label: `好价电商榜-网易`, value: `29` },
        { label: `好价电商榜-西集网`, value: `30` },
        { label: `好价电商榜-美国亚马逊`, value: `31` },
        { label: `好价电商榜-日本亚马逊`, value: `32` },
        { label: `好价电商榜-ebay`, value: `33` },
        { label: `海淘 TOP 榜-全部`, value: `39` },
        { label: `海淘 TOP 榜-海外直邮`, value: `34` },
        { label: `海淘 TOP 榜-美国榜`, value: `35` },
        { label: `海淘 TOP 榜-欧洲榜`, value: `36` },
        { label: `海淘 TOP 榜-澳新榜`, value: `37` },
        { label: `海淘 TOP 榜-亚洲榜`, value: `38` },
        { label: `海淘 TOP 榜-晒物榜`, value: `hsw` },
        { label: `好文排行榜-原创`, value: `yc` },
        { label: `好文排行榜-资讯`, value: `zx` },
        { label: `好物排行榜-新晋榜`, value: `hwall` },
        { label: `好物排行榜-消费众测`, value: `zc` },
        { label: `好物排行榜-新锐品牌`, value: `nb` },
        { label: `好物排行榜-好物榜单`, value: `hw` },
    ],
    l = {
        path: `/ranking/:rank_type/:rank_id/:hour`,
        categories: [`shopping`],
        view: r.Notifications,
        example: `/smzdm/ranking/pinlei/11/3`,
        parameters: {
            rank_type: { description: `榜单类型`, options: s },
            rank_id: { description: `榜单ID`, options: c },
            hour: {
                description: `时间跨度`,
                options: [
                    { value: `3`, label: `3 小时` },
                    { value: `12`, label: `12 小时` },
                    { value: `24`, label: `24 小时` },
                ],
            },
        },
        features: { requireConfig: [{ name: `SMZDM_COOKIE`, description: `什么值得买登录后的 Cookie 值` }], requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `排行榜`,
        maintainers: [`DIYgod`],
        handler: u,
    };
async function u(r) {
    if (!e.smzdm.cookie) throw new i(`什么值得买排行榜 is disabled due to the lack of SMZDM_COOKIE`);
    let { rank_type: l, rank_id: u, hour: d } = r.req.param(),
        f = o(l, u, d),
        p = (await t(`https://www.smzdm.com/top/json_more`, { headers: { Referer: `https://www.smzdm.com/top`, ...a() }, searchParams: { rank_type: l, rank_id: u, hour: f } })).data.data.list,
        m = [],
        h = [];
    for (let e = 0; e < Math.min(6, p.length); e++) (p[e][0].length !== 0 && m.push(p[e][0]), p[e][1].length !== 0 && h.push(p[e][1]));
    let g = [...m, ...h];
    return {
        title: `什么值得买${s.find((e) => e.value === l)?.label}-${c.find((e) => e.value === u)?.label}-${d}小时`,
        link: `https://www.smzdm.com/top/`,
        allowEmpty: !0,
        item: g.map((e) => ({ title: `${e.article_title} - ${e.article_price}`, description: `${e.article_title} - ${e.article_price}<br><img src="${e.article_pic}">`, pubDate: n(e.article_pubdate, 8), link: e.article_url })),
    };
}
export { l as route };
