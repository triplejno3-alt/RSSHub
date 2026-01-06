import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { t as r } from './invalid-parameter-DGZgOgO2.mjs';
import { t as i } from './utils-BudhBG7e.mjs';
const a = `https://www.nintendoswitch.com.cn/software/`,
    o = { path: `/eshop/cn`, radar: [{ source: [`nintendoswitch.com.cn/software`, `nintendoswitch.com.cn/`] }], name: `Unknown`, maintainers: [], handler: s, url: `nintendoswitch.com.cn/software` };
async function s() {
    let o = await n(a),
        s = await i.nuxtReader(o.data);
    if (!s.recentSoftwareList) throw new r(`软件信息不存在，请报告这个问题`);
    let c = s.recentSoftwareList.map((e) => ({ title: e.title, description: i.generateImageLink(e.imgUrl), link: e.jumpUrl.startsWith(`http`) ? e.jumpUrl : `${a}${e.jumpUrl}`, pubDate: t(e.publishTime, `YYYY.MM.DD`) }));
    return ((c = await i.ProcessItemChina(c, e)), { title: `Nintendo eShop（国服）新游戏`, link: `https://www.nintendoswitch.com.cn/software`, description: `Nintendo（国服）新上架的游戏`, item: c });
}
export { o as route };
