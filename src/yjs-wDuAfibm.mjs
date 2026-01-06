import './ofetch-uhy-qh6X.mjs';
import './config-Cc-zZ5p-.mjs';
import './logger-_vmdpChp.mjs';
import { t as e } from './cache-DLkCV5c7.mjs';
import './helpers-C9wXLK0V.mjs';
import { t } from './parse-date-DjdQS_Nt.mjs';
import { t as n } from './got-CKQ7C9HX.mjs';
import { load as r } from 'cheerio';
const i = {
    path: `/yjs`,
    categories: [`university`],
    example: `/ecnu/yjs`,
    parameters: {},
    features: { requireConfig: !1, requirePuppeteer: !1, antiCrawler: !1, supportBT: !1, supportPodcast: !1, supportScihub: !1 },
    radar: [{ source: [`yz.kaoyan.com/ecnu/tiaoji`, `yz.kaoyan.com/`] }],
    name: `研究生院`,
    maintainers: [`shengmaosu`],
    handler: a,
    url: `yz.kaoyan.com/ecnu/tiaoji`,
};
async function a() {
    let i = `https://yz.kaoyan.com/ecnu/tiaoji/`,
        a = r((await n(i)).data),
        o = a(`.subList li`)
            .toArray()
            .map((e) => ((e = a(e)), { title: e.find(`li a`).text(), link: e.find(`li a`).attr(`href`).replace(`http:`, `https:`) }));
    return {
        title: `华东师范大学研究生院`,
        link: i,
        description: `华东师范大学研究生调剂信息`,
        item: await Promise.all(
            o.map((i) =>
                e.tryGet(i.link, async () => {
                    let { data: e } = await n(i.link),
                        a = r(e);
                    return ((i.description = a(`.articleCon`).html()), (i.pubDate = t(a(`.outer_utime`).text())), i);
                })
            )
        ),
    };
}
export { i as route };
