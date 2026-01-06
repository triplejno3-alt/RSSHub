import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
const n = { path: `/add2cart/:platform`, categories: [`game`], example: `/xiaoheihe/add2cart/epic`, parameters: { platform: `平台名：epic、steam或gog` }, name: `喜加一`, maintainers: [`ladeng07`], handler: r };
async function r(n) {
    let r = n.req.param(`platform`),
        i = await t(`https://api.xiaoheihe.cn/mall/add_to_cart/?platform=${r}`),
        a = i.data.result.games.map((t) => {
            let n = `${t.type === `dlc` ? `[DLC]` : ``}${t.name}${t.name_en ? `/` + t.name_en : ``}`,
                i = `<img src="${t.image}"/> <br/>`;
            ((i += t.type === `dlc` ? `本体: ` + t.product_home_name + `<br/>` : ``),
                t.price && (i += `原价: ${t.price.initial_amount}<br/>`),
                t.score && (i += `评分: ${t.score}<br/>`),
                (i += `支持中文: ${t.chinese_support ? `是` : `否`}<br/>`),
                (i += `截止时间: ${e(t.end_time * 1e3).toLocaleString(`zh-CN`)}<br/>`),
                (i += `<br/>`));
            let a = `https://api.xiaoheihe.cn/game/share_game_detail?appid=${t.steam_appid}`;
            return (r === `steam` && (a = `https://store.steampowered.com/app/${t.steam_appid}`), { title: n, description: i, link: a, pubDate: e(t.end_time * 1e3) });
        });
    return (a.length === 0 && (a = [{ title: `${r.toUpperCase()}最近没有喜加一(悲`, pubDate: e(i.data.result.weixindata.timestamp * 1e3) }]), { title: `小黑盒 ${r.toUpperCase()} 喜加一`, link: `https://xiaoheihe.cn`, item: a });
}
export { n as route };
