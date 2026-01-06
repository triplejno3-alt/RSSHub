import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './utils-VZRP2tN1.mjs';
const r = { path: [`/`, `/news`], name: `Unknown`, maintainers: [`AtlanCI`, `CcccFz`], handler: i, url: `gocn.vip/` };
async function i() {
    let r = `https://gocn.vip/c/3lQ6GbD5ny/home`;
    return {
        title: `GoCN社区-最新动态`,
        link: r,
        description: `获取GoCN站点最新动态`,
        item: (await t({ url: `https://gocn.vip/api/home/page`, headers: { Referer: r } })).data.data.articlePageList.list.map((t) => ({
            title: t.name,
            link: `https://gocn.vip/c/3lQ6GbD5ny/s/${t.spaceGuid}/d/${t.guid}`,
            description: n(JSON.parse(t.content)),
            pubDate: e(t.ctime, `X`),
            author: t.nickname,
        })),
    };
}
export { r as route };
