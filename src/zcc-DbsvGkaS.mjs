import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { load as n } from 'cheerio';
const r = {
    path: `/zcc`,
    categories: [`university`],
    example: `/nju/zcc`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`zcc.nju.edu.cn/tzgg/gyfytdglk/index.html`, `zcc.nju.edu.cn/tzgg/index.html`, `zcc.nju.edu.cn/`] }],
    name: `资产管理处`,
    maintainers: [`ret-1`],
    handler: i,
    url: `zcc.nju.edu.cn/tzgg/gyfytdglk/index.html`,
};
async function i() {
    return {
        title: `资产管理处-公告通知`,
        link: `https://zcc.nju.edu.cn/sy/tzzhxx/index.html`,
        item: (
            await Promise.all(
                Object.keys({ ggtz: `公告通知` }).map(async () => {
                    let r = (await t(`https://zcc.nju.edu.cn/sy/tzzhxx/index.html`)).data,
                        i = n(r)(`ul.clearfix`).find(`script`);
                    i = i[1].children[0].data;
                    let a = i.indexOf(`[`),
                        o = i.lastIndexOf(`]`);
                    return JSON.parse(i.substring(a, o + 1))[0].infolist.map((t) => ({ title: t.title, description: t.summary, link: t.url, author: t.username, pubDate: e(t.releasetime, `x`) }));
                })
            )
        )[0],
    };
}
export { r as route };
