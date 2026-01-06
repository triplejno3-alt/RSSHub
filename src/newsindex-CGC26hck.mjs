import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = new Map([
        [`rm`, { name: `热门`, channelid: 1760 }],
        [`xw`, { name: `新闻`, channelid: 1761 }],
        [`gg`, { name: `公告`, channelid: 1762 }],
        [`hd`, { name: `活动`, channelid: 1763 }],
        [`ss`, { name: `赛事`, channelid: 1764 }],
        [`yh`, { name: `优化`, channelid: 1769 }],
        [`all`, { name: `全部`, channelid: 0 }],
    ]),
    r = `https://pvp.qq.com/web201706/newsindex.shtml`,
    i = async (n, i) => {
        let a = await t(`https://apps.game.qq.com/wmp/v3.1/?p0=18&p1=searchNewsKeywordsList&order=sIdxTime&r0=cors&type=iTarget&source=app_news_search&pagesize=12&page=1&id=` + n, { headers: { Referer: r } });
        return Promise.all(
            a.data.msg.result.map(async (n) => {
                let r = await t(`https://apps.game.qq.com/wmp/v3.1/public/searchNews.php?p0=18&source=web_pc&id=${n.iNewsId}`);
                return (
                    (r = JSON.parse(r.data.match(/(?<=var searchObj=).*(?<!;)/g))),
                    { title: `【${i}】` + n.sTitle, link: `https://pvp.qq.com/web201706/newsdetail.shtml?tid=` + n.iNewsId, pubDate: e(n.sTargetIdxTime), description: r.msg.sContent }
                );
            })
        );
    },
    a = {
        path: `/pvp/newsindex/:type`,
        categories: [`game`],
        example: `/tencent/pvp/newsindex/all`,
        parameters: { type: `栏目分类，见下表` },
        features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
        name: `新闻中心`,
        maintainers: [`Jeason0228`, `HenryQW`],
        handler: o,
        description: `| 全部 | 热门 | 新闻 | 公告 | 活动 | 赛事 | 优化 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| all  | rm   | xw   | gg   | hd   | ss   | yh   |`,
    };
async function o(e) {
    let t = e.req.param(`type`),
        a = n.get(t).name,
        o = n.get(t).channelid,
        s = [];
    if (t === `all`) {
        let e = await Promise.all([...n].map(async (e) => await i(e[1].channelid, e[1].name)));
        for (let t of e) s = [...s, ...t];
    } else s = await i(o, a);
    return {
        title: `【${a}】 - 王者荣耀 - 新闻列表`,
        link: r,
        description: `《王者荣耀》是腾讯天美工作室历时3年推出的东方英雄即时对战手游大作，抗塔强杀、团灭超神，领略爽热血竞技的酣畅淋漓！1v1、3v3、闯关等丰富游戏模式，随时战，更自由！跨服匹配秒开局，好友组队战排位，不靠装备、没有等级，更公平、更爽快的无差异对战！`,
        item: s,
    };
}
export { a as route };
