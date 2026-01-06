import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import './helpers-C9wXLK0V.mjs';
import { t as e } from './parse-date-DjdQS_Nt.mjs';
import { t } from './got-CKQ7C9HX.mjs';
import { t as n } from './timezone-CrV-DT8S.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/itsc`,
    categories: [`university`],
    example: `/nju/itsc`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`itsc.nju.edu.cn/tzgg/list.htm`] }],
    name: `ITSC 信息中心`,
    maintainers: [`ret-1`],
    handler: a,
    url: `itsc.nju.edu.cn/tzgg/list.htm`,
};
async function a() {
    let i = { tzgg: `通知公告` };
    return {
        title: `ITSC-公告通知`,
        link: `https://itsc.nju.edu.cn/tzgg/list.htm`,
        item: (
            await Promise.all(
                Object.keys(i).map(async () => {
                    let a = (await t(`https://itsc.nju.edu.cn/tzgg/list.htm`)).data,
                        o = r(a),
                        s = o(`.list2`)[0].children,
                        c = [];
                    for (let e of s) e.children && c.push(e);
                    return c.map(
                        (t) => (
                            (t = o(t)),
                            {
                                title: t.find(`a`).attr(`title`),
                                description: t.find(`a`).attr(`title`),
                                link: `https://itsc.nju.edu.cn` + t.find(`a`).attr(`href`),
                                pubDate: n(e(t.find(`.news_meta`).text(), `YYYY-MM-DD`), 8),
                                category: i[0],
                            }
                        )
                    );
                })
            )
        )[0],
    };
}
export { i as route };
