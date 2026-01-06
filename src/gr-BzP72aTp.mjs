import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/gr/:type`,
    categories: [`university`],
    example: `/buct/gr/jzml`,
    parameters: {
        type: {
            description: `信息类型，可选值：tzgg（通知公告），jzml（简章目录），xgzc（相关政策）`,
            options: [
                { value: `tzgg`, label: `通知公告` },
                { value: `jzml`, label: `简章目录` },
                { value: `xgzc`, label: `相关政策` },
            ],
        },
    },
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [
        { source: [`graduate.buct.edu.cn/1392/list.htm`], target: `/gr/tzgg` },
        { source: [`graduate.buct.edu.cn/jzml/list.htm`], target: `/gr/jzml` },
        { source: [`graduate.buct.edu.cn/1393/list.htm`], target: `/gr/xgzc` },
    ],
    name: `研究生院`,
    maintainers: [`Epic-Creeper`],
    handler: i,
    url: `buct.edu.cn/`,
};
async function i(r) {
    let i = r.req.param(`type`),
        a = `https://graduate.buct.edu.cn`,
        o;
    switch (i) {
        case `tzgg`:
            o = `${a}/1392/list.htm`;
            break;
        case `jzml`:
            o = `${a}/jzml/list.htm`;
            break;
        case `xgzc`:
            o = `${a}/1393/list.htm`;
            break;
        default:
            throw Error(`Invalid type parameter`);
    }
    let s = n((await t.get(o)).data),
        c = s(`ul.wp_article_list > li.list_item`)
            .toArray()
            .map((e) => ({ pubDate: s(e).find(`.Article_PublishDate`).text(), title: s(e).find(`a`).attr(`title`), link: `${a}${s(e).find(`a`).attr(`href`)}` })),
        l = await Promise.all(c.map((r) => e.tryGet(r.link, async () => ((r.description = n((await t.get(r.link)).data)(`.wp_articlecontent`).html()), r))));
    return { title: s(`title`).text(), link: o, item: l };
}
export { r as route };
